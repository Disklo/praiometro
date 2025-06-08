import json
import random
from datetime import datetime, timedelta
from pymongo import MongoClient

# Configurações
MONGO_URI = "mongodb://localhost:27017"  # ou sua URI do Atlas
PONTOS_PATH = "pontos.json"
NUM_USUARIOS = 20  # total de usuários simulados
VOTOS_POR_USUARIO = 5  # número de praias que cada usuário vota

CRITERIOS = ["limpeza", "acessibilidade", "infraestrutura", "seguranca", "tranquilidade"]

# Conecta ao banco
client = MongoClient(MONGO_URI)
db = client["praio"]
colecao = db["votos"]

# Carrega as praias existentes
with open(PONTOS_PATH, "r", encoding="utf-8") as f:
    praias = list(json.load(f).keys())

def gerar_voto_aleatorio():
    return {criterio: random.randint(1, 5) for criterio in CRITERIOS}

def gerar_data_aleatoria():
    dias_atras = random.randint(0, 30)
    return (datetime.utcnow() - timedelta(days=dias_atras)).isoformat()

def popular_mock():
    colecao.delete_many({})  # limpa coleção (opcional)

    for i in range(NUM_USUARIOS):
        user_id = f"mock_user_{i}"
        praias_votadas = random.sample(praias, min(VOTOS_POR_USUARIO, len(praias)))
        for praia_id in praias_votadas:
            doc = {
                "user_id": user_id,
                "praia_id": praia_id,
                "votos": gerar_voto_aleatorio(),
                "timestamp": gerar_data_aleatoria()
            }
            colecao.insert_one(doc)

    print(f"Inseridos {NUM_USUARIOS * VOTOS_POR_USUARIO} votos mockados com sucesso.")

if __name__ == "__main__":
    popular_mock()
