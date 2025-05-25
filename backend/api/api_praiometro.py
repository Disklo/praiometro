from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, Literal
import json
import os

# Configurações
PONTOS_FILE = os.getenv("PONTOS_FILE", "pontos.json")  # caminho para o arquivo gerado pelo praiômetro

# Inicializa FastAPI
app = FastAPI(
    title="Praio API",
    description="API para fornecer dados meteorológicos e marítimos de pontos de coleta de praias",
    version="1.0.0"
)

# Permite chamadas do app React Native
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
)

# Função utilitária: carrega o JSON dos pontos na hora da requisição
def carregar_pontos():
    try:
        with open(PONTOS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail=f"Arquivo '{PONTOS_FILE}' não encontrado")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail=f"Arquivo '{PONTOS_FILE}' contém JSON inválido")

@app.get("/pontos", summary="Lista todos os pontos de coleta")
def listar_pontos():
    #Retorna uma lista dos pontos de coleta com informações estáticas e último timestamp.
    pontos = carregar_pontos()
    # Para cada ponto, devolve código, nome e coordenadas
    lista = [
        {
            "codigo": codigo,
            "nome": info.get("nome"),
            "coordenadas": info.get("coordenadas_decimais"),
            "ultima_leitura": info.get("leitura_atual", {}).get("timestamp")
        }
        for codigo, info in pontos.items()
    ]
    return {"pontos": lista}

@app.get("/pontos/{codigo}", summary="Detalha um ponto de coleta específico")
def obter_ponto(codigo: str):
    #Retorna todas as informações de um ponto, incluindo dados estáticos e a última leitura completa.
    pontos = carregar_pontos()
    if codigo not in pontos:
        raise HTTPException(status_code=404, detail="Ponto não encontrado")
    return pontos[codigo]

@app.get("/pontos/{codigo}/dados", summary="Dados meteorológicos e/ou marítimos do ponto")
def obter_dados(
    codigo: str,
    tipo: Optional[Literal['meteo', 'marine', 'ambos']] = Query('ambos', description="Filtrar por 'meteo', 'marine' ou 'ambos'."),
):
    #Retorna os dados do último timestamp para o ponto:
    #- 'meteo': apenas dados meteorológicos
    #- 'marine': apenas dados marítimos
    #- 'ambos': todos os dados
    pontos = carregar_pontos()
    if codigo not in pontos:
        raise HTTPException(status_code=404, detail="Ponto não encontrado")
    leitura = pontos[codigo].get("leitura_atual") or {}

    dados = {}
    if tipo in ('meteo', 'ambos'):
        # Indicadores meteorológicos
        for chave in [
            "temperature_2m",
            "precipitation",
            "precipitation_probability",
            "rain",
            "relative_humidity_2m",
            "apparent_temperature",
            "wind_speed_10m",
            "wind_direction_10m",
            "uv_index",
        ]:
            if chave in leitura:
                dados[chave] = leitura[chave]
    if tipo in ('marine', 'ambos'):
        # Indicadores marítimos
        for chave in ["wave_height", "wave_period"]:
            if chave in leitura:
                dados[chave] = leitura[chave]

    if not dados:
        raise HTTPException(status_code=204, detail="Nenhum dado disponível para o filtro solicitado")

    return {"codigo": codigo, "timestamp": leitura.get("timestamp"), "dados": dados}

# Ponto de entrada para execução via 'uvicorn'
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
