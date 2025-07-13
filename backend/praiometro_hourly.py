import json
import sys
import datetime
import time
import requests
import pdfplumber
import schedule

# Arquivos de configuração
CAMINHO_PONTOS = "pontos.json"          # arquivo de pontos estáticos
CAMINHO_PDF = "niteroi_historico.pdf"  # PDF com histórico de balneabilidade

# Mapeamento de status para booleano
MAPA_STATUS = {
    "Própria": True,
    "Imprópria": False
}

# Carrega pontos estáticos (nomes, coordenadas e histórico de balneabilidade)
def carregar_pontos(caminho=CAMINHO_PONTOS):
    try:
        with open(caminho, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"Erro ao carregar pontos: {e}")
        sys.exit(1)

# Extrai status de balneabilidade mais recente do PDF
def extrair_balneabilidade(caminho_pdf=CAMINHO_PDF):
    resultado = {}
    try:
        with pdfplumber.open(caminho_pdf) as pdf:
            for pagina in pdf.pages:
                for tabela in pagina.extract_tables():
                    for linha in tabela:
                        if not linha or len(linha) < 4:
                            continue
                        codigo = (linha[1] or '').strip()
                        if not codigo:
                            continue
                        medicoes = [m for m in linha[3:] if m]
                        if not medicoes:
                            continue
                        ultimo = medicoes[-1].strip()
                        resultado[codigo] = MAPA_STATUS.get(ultimo)
    except FileNotFoundError:
        print(f"Aviso: PDF '{caminho_pdf}' não encontrado.")
    except Exception as e:
        print(f"Erro ao processar PDF: {e}")
    return resultado

# Função que busca dados meteorológicos e marinhos para uma coordenada
def buscar_dados(lat, lon):
    br_timezone = datetime.timezone(datetime.timedelta(hours=-3))
    agora = datetime.datetime.now(br_timezone)
    ts_hour = agora.replace(minute=0, second=0, microsecond=0)
    date_start = ts_hour.strftime("%Y-%m-%d")
    date_end = (ts_hour + datetime.timedelta(days=1)).strftime("%Y-%m-%d")

    # parâmetros adicionais
    met_params = {
        "latitude": lat,
        "longitude": lon,
        "hourly": ",".join([
            "temperature_2m",
            "precipitation",
            "precipitation_probability",
            "rain",
            "relative_humidity_2m",
            "apparent_temperature",
            "wind_speed_10m",
            "wind_direction_10m",
            "uv_index",
            "weather_code"
        ]),
        "timezone": "auto",
        "start_date": date_start,
        "end_date": date_end
    }
    marine_params = {
        "latitude": lat,
        "longitude": lon,
        "hourly": "wave_height,wave_period",
        "timezone": "auto",
        "start_date": date_start,
        "end_date": date_end
    }
    # requisição meteorológica
    try:
        r_met = requests.get("https://api.open-meteo.com/v1/forecast", params=met_params)
        data_met = r_met.json().get("hourly", {})
    except Exception as e:
        print(f"Erro API meteo: {e}")
        data_met = {}
    # requisição marinha
    try:
        r_mar = requests.get("https://marine-api.open-meteo.com/v1/marine", params=marine_params)
        data_mar = r_mar.json().get("hourly", {})
    except Exception as e:
        print(f"Erro API marinha: {e}")
        data_mar = {}

    # busca índice do timestamp
    time_list = data_met.get("time", [])
    key = ts_hour.strftime("%Y-%m-%dT%H:%M")
    if key in time_list:
        idx = time_list.index(key)
        # verifica se choveu nas últimas 8 horas
        choveu_8_horas = False
        if "precipitation" in data_met and "time" in data_met:
            now_idx = None
            for i, t in enumerate(data_met["time"]):
                if t == key:
                    now_idx = i
                    break
            if now_idx is not None and now_idx >= 8:
                ult_precip = data_met["precipitation"][now_idx-8:now_idx]
                choveu_8_horas = any(p > 0 for p in ult_precip)
        # coleta valores
        return {
            "timestamp": key,
            "temperature_2m": data_met.get("temperature_2m", [None])[idx],
            "precipitation": data_met.get("precipitation", [None])[idx],
            "precipitation_probability": data_met.get("precipitation_probability", [None])[idx],
            "rain": data_met.get("rain", [None])[idx],
            "relative_humidity_2m": data_met.get("relative_humidity_2m", [None])[idx],
            "apparent_temperature": data_met.get("apparent_temperature", [None])[idx],
            "wind_speed_10m": data_met.get("wind_speed_10m", [None])[idx],
            "wind_direction_10m": data_met.get("wind_direction_10m", [None])[idx],
            "uv_index": data_met.get("uv_index", [None])[idx],
            "wave_height": data_mar.get("wave_height", [None])[idx],
            "wave_period": data_mar.get("wave_period", [None])[idx],
            "weather_code": data_met.get("weather_code", [None])[idx],
            "choveu_8_horas": choveu_8_horas
        }
    else:
        print(f"Hora {key} não encontrada nos dados.")
        return {"timestamp": key}

# Tarefa agendada: atualizar pontos.json
def atualizar():
    # carrega pontos estáticos e balneabilidade
    pontos = carregar_pontos()
    bal = extrair_balneabilidade()

    # prepara saída
    out = {}
    for codigo, info in pontos.items():
        lat, lon = info.get("coordenadas_decimais", [None, None])
        leitura = buscar_dados(lat, lon)
        leitura["balneabilidade"] = bal.get(codigo)
        # une informações estáticas + leitura
        out[codigo] = {
            **info,
            "leitura_atual": leitura
        }
    # salva resultado
    with open(CAMINHO_PONTOS, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=4)
    br_timezone = datetime.timezone(datetime.timedelta(hours=-3))
    print(f"Atualização realizada em {datetime.datetime.now(br_timezone).isoformat()}")
    # notificar API após atualização do pontos.json
    try:
        resposta = requests.post("http://localhost:8000/notificar-atualizacao")  # Altere se necessário
        print("Notificação enviada:", resposta.json())
    except Exception as e:
        print("Erro ao notificar API:", e)

# Executa atualização imediata ao iniciar
atualizar()

# configura agendamento a cada hora
schedule.every().hour.at(":00").do(atualizar)

print("Iniciando praiômetro programado. Pressione Ctrl+C para sair.")
# execução contínua
while True:
    schedule.run_pending()
    time.sleep(30)
