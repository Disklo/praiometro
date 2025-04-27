import json
import sys
import datetime
import requests
from tabulate import tabulate
from termcolor import colored
import pdfplumber

# Caminhos para os arquivos
CAMINHO_PONTOS = "pontos.json"
CAMINHO_PDF = "niteroi_historico.pdf"

# Mapeamento de status para booleano
MAPA_STATUS = {
    "Própria": True,
    "Imprópria": False
}

# Carregar dados das praias
def carregar_praias(caminho=CAMINHO_PONTOS):
    try:
        with open(caminho, "r", encoding="utf-8") as arquivo:
            return json.load(arquivo)
    except FileNotFoundError:
        print(f"Erro: Arquivo '{caminho}' não encontrado.")
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"Erro: Formato JSON inválido em '{caminho}'.")
        sys.exit(1)

# Extrair balneabilidade do PDF
def extrair_balneabilidade(caminho_pdf=CAMINHO_PDF):
    resultado = {}
    try:
        with pdfplumber.open(caminho_pdf) as pdf:
            for pagina in pdf.pages:
                tabelas = pagina.extract_tables()
                for tabela in tabelas:
                    for linha in tabela:
                        if not linha or len(linha) < 4:
                            continue
                        codigo = linha[1].strip() if linha[1] else None
                        if not codigo:
                            continue
                        medicoes = [m for m in linha[3:] if m]
                        if not medicoes:
                            continue
                        ultima = medicoes[-1].strip()
                        if ultima in MAPA_STATUS:
                            resultado[codigo] = MAPA_STATUS[ultima]
                        else:
                            resultado[codigo] = None
    except FileNotFoundError:
        print(f"Erro: Arquivo PDF '{caminho_pdf}' não encontrado.")
    except Exception as e:
        print(f"Erro ao processar PDF: {e}")
    return resultado

# Buscar dados meteorológicos
def buscar_dados_meteorologicos(latitude, longitude):
    agora = datetime.datetime.now()
    hora_atual = agora.hour
    data_inicio = agora.strftime("%Y-%m-%d")
    data_fim = (agora + datetime.timedelta(days=1)).strftime("%Y-%m-%d")

    url_tempo = "https://api.open-meteo.com/v1/forecast"
    parametros_tempo = {
        "latitude": latitude,
        "longitude": longitude,
        "hourly": "temperature_2m,precipitation,precipitation_probability,rain",
        "timezone": "auto",
        "start_date": data_inicio,
        "end_date": data_fim
    }

    resultado = {
        "hora": agora.replace(minute=0, second=0, microsecond=0),
        "temperatura_2m": None,
        "precipitacao": None,
        "probabilidade_precipitacao": None,
        "chuva": None,
        "altura_onda": None,
        "periodo_onda": None,
    }

    try:
        resposta = requests.get(url_tempo, params=parametros_tempo)
        dados = resposta.json()
        if "hourly" in dados and "time" in dados["hourly"]:
            idx = dados["hourly"]["time"].index(resultado["hora"].strftime("%Y-%m-%dT%H:%M"))
            resultado["temperatura_2m"] = dados["hourly"].get("temperature_2m", [None])[idx]
            resultado["precipitacao"] = dados["hourly"].get("precipitation", [None])[idx]
            resultado["probabilidade_precipitacao"] = dados["hourly"].get("precipitation_probability", [None])[idx]
            resultado["chuva"] = dados["hourly"].get("rain", [None])[idx]
    except Exception as e:
        print(f"Aviso: Não foi possível buscar dados meteorológicos: {e}")

    try:
        url_marinho = "https://marine-api.open-meteo.com/v1/marine"
        parametros_marinho = {
            "latitude": latitude,
            "longitude": longitude,
            "hourly": "wave_height,wave_period",
            "timezone": "auto",
            "start_date": data_inicio,
            "end_date": data_fim
        }
        resposta = requests.get(url_marinho, params=parametros_marinho)
        dados = resposta.json()
        if "hourly" in dados and "time" in dados["hourly"]:
            idx = dados["hourly"]["time"].index(resultado["hora"].strftime("%Y-%m-%dT%H:%M"))
            resultado["altura_onda"] = dados["hourly"].get("wave_height", [None])[idx]
            resultado["periodo_onda"] = dados["hourly"].get("wave_period", [None])[idx]
    except Exception as e:
        print(f"Aviso: Não foi possível buscar dados marinhos: {e}")

    return resultado

# Verificar se as condições são seguras
def condicao_segura(parametro, valor):
    if valor is None:
        return True
    limites = {
        "temperatura_2m": (20, 30),
        "precipitacao": (0, 0.5),
        "probabilidade_precipitacao": (0, 30),
        "chuva": (0, 0.5),
        "altura_onda": (0, 1.5),
        "periodo_onda": (5, 15)
    }
    if parametro in limites:
        minimo, maximo = limites[parametro]
        return minimo <= valor <= maximo
    return True

# Formatar saída no terminal
def formatar_saida(dados, qualidade_praia=None):
    saida = []
    if qualidade_praia is True:
        valor_colorido = colored("Própria para banho", "green")
    elif qualidade_praia is False:
        valor_colorido = colored("Imprópria para banho", "red")
    else:
        valor_colorido = colored("Sem dados disponíveis", "yellow")
    saida.append(["Qualidade da Água", valor_colorido])

    for chave, valor in dados.items():
        if chave == "hora":
            saida.append(["Hora", valor.strftime("%Y-%m-%d %H:%M")])
            continue
        if valor is None:
            saida.append([chave.replace("_", " ").title(), "Dado não disponível"])
            continue
        if chave == "temperatura_2m":
            exibicao = f"{valor:.1f}°C"
        elif chave in ["precipitacao", "chuva"]:
            exibicao = f"{valor:.1f}mm"
        elif chave == "probabilidade_precipitacao":
            exibicao = f"{valor:.0f}%"
        elif chave == "altura_onda":
            exibicao = f"{valor:.1f}m"
        elif chave == "periodo_onda":
            exibicao = f"{valor:.1f}s"
        else:
            exibicao = str(valor)
        cor = "green" if condicao_segura(chave, valor) else "red"
        saida.append([chave.replace("_", " ").title(), colored(exibicao, cor)])
    return saida

# Função principal
def principal():
    dados_praias = carregar_praias()
    dados_bal = extrair_balneabilidade()
    for codigo, entrada in dados_praias.items():
        entrada["balneabilidade"] = dados_bal.get(codigo, None)
    with open(CAMINHO_PONTOS, "w", encoding="utf-8") as f:
        json.dump(dados_praias, f, ensure_ascii=False, indent=4)

    praias = []
    ids_praias = []
    for id_praia, info in dados_praias.items():
        nome = info["nomes"][0]
        if info.get("especificidades"):
            nome += info["especificidades"][0]
        praias.append(nome)
        ids_praias.append(id_praia)

    print("Praias disponíveis:")
    for i, praia in enumerate(praias, 1):
        print(f"{i}. {praia}")

    try:
        selecao = int(input("\nSelecione uma praia (número): "))
        if selecao < 1 or selecao > len(praias):
            raise ValueError
    except ValueError:
        print("Seleção inválida.")
        sys.exit(1)

    id_selecionado = ids_praias[selecao - 1]
    info_selecionada = dados_praias[id_selecionado]
    nome_praia = info_selecionada["nomes"][0] + (info_selecionada.get("especificidades")[0] if info_selecionada.get("especificidades") else "")
    latitude, longitude = info_selecionada["coordenadas_decimais"]

    print(f"\nBuscando dados para {nome_praia}...")
    try:
        tempo = buscar_dados_meteorologicos(latitude, longitude)
        qualidade = info_selecionada.get("balneabilidade")
        formatado = formatar_saida(tempo, qualidade)
        print(f"\nCondições atuais para {nome_praia}:")
        print(f"Coordenadas: {latitude:.6f}, {longitude:.6f}")
        print(tabulate(formatado, tablefmt="grid"))
        print("\nValores verdes indicam condições seguras para banho.")
        print("Valores vermelhos indicam condições potencialmente inseguras.")
    except Exception as e:
        print(f"Erro: {e}")

if __name__ == "__main__":
    principal()
