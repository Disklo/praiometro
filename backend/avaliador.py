import json
import os
import time
from pymongo import MongoClient
from collections import defaultdict
from schedule import every, run_pending
from datetime import datetime

# Configurações
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
PONTOS_PATH = os.getenv("PONTOS_PATH", "pontos.json")

client = MongoClient(MONGO_URI)
db = client["praio"]
colecao_votos = db["votos"]

CRITERIOS = ["limpeza", "acessibilidade", "infraestrutura", "seguranca", "tranquilidade"]

def arredondar_estrelas(valor: float) -> int:
    """Arredonda para inteiro entre 1 e 5."""
    return max(1, min(5, round(valor)))

def calcular_e_atualizar_medias():
    print(f"[{datetime.utcnow().isoformat()}] Atualizando médias...")

    # Carregar pontos.json
    try:
        with open(PONTOS_PATH, "r", encoding="utf-8") as f:
            pontos = json.load(f)
    except Exception as e:
        print(f"Erro ao carregar {PONTOS_PATH}: {e}")
        return

    # Agrupar votos por praia
    votos_agrupados = defaultdict(lambda: defaultdict(list))

    for voto in colecao_votos.find():
        praia_id = voto.get("praia_id")
        votos = voto.get("votos", {})
        if praia_id and all(k in votos for k in CRITERIOS):
            for crit in CRITERIOS:
                votos_agrupados[praia_id][crit].append(votos[crit])

    # Atualizar pontos com as médias
    total_atualizados = 0
    for praia_id, criterios in votos_agrupados.items():
        if praia_id not in pontos:
            print(f"[!] Praia {praia_id} não encontrada em pontos.json. Pulando.")
            continue

        media = {}
        for crit in CRITERIOS:
            valores = criterios.get(crit, [])
            if valores:
                media[crit] = arredondar_estrelas(sum(valores) / len(valores))
        if media:
            pontos[praia_id]["avaliacao_media"] = media
            total_atualizados += 1

    # Salvar de volta
    try:
        with open(PONTOS_PATH, "w", encoding="utf-8") as f:
            json.dump(pontos, f, ensure_ascii=False, indent=4)
        print(f"{total_atualizados} praias atualizadas em {PONTOS_PATH}.")
    except Exception as e:
        print(f"Erro ao salvar {PONTOS_PATH}: {e}")

# Roda na inicialização
calcular_e_atualizar_medias()

# Agendamento a cada hora
every().hour.at(":00").do(calcular_e_atualizar_medias)

print("Avaliador rodando. Pressione Ctrl+C para sair.")
while True:
    run_pending()
    time.sleep(30)
