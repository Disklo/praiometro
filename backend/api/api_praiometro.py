import os
import json
import asyncio
import hashlib
from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, Literal

# Configurações
PONTOS_FILE = os.getenv("PONTOS_FILE", "pontos.json")  # arquivo gerado pelo praiômetro
CACHE = {}  # cache em memória dos pontos
FILE_HASH = None  # hash MD5 do arquivo carregado

# Inicializa FastAPI
app = FastAPI(
    title="Praio API",
    description="API para fornecer dados meteorológicos e marítimos de pontos de coleta de praias com cache eficiente",
    version="1.2.0"
)

# Permite chamadas do app React Native
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["*"],
)

async def compute_file_hash() -> str:
    #Calcula o hash MD5 do arquivo de pontos.
    try:
        with open(PONTOS_FILE, 'rb') as f:
            data = f.read()
        return hashlib.md5(data).hexdigest()
    except Exception as e:
        print(f"[Hash] Erro ao ler {PONTOS_FILE}: {e}")
        return ''

async def load_cache():
    #Carrega o conteúdo de pontos.json no CACHE e atualiza FILE_HASH.
    global CACHE, FILE_HASH
    try:
        new_hash = await compute_file_hash()
        with open(PONTOS_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
        CACHE = data
        FILE_HASH = new_hash
        print(f"[Cache] Carregado com sucesso em {PONTOS_FILE}, hash {FILE_HASH}")
    except Exception as e:
        print(f"[Cache] Erro ao carregar {PONTOS_FILE}: {e}")

async def schedule_cache_refresh():
    #Atualiza o cache sempre que o relógio marcar X:02, verificando mudança de hash.
    #Se não mudou, tenta a cada 1 minuto até 5 vezes antes de desistir.
    while True:
        # calcula segundos até próxima hora em minuto 2
        utcnow = datetime.utcnow()
        next_time = (utcnow + timedelta(hours=1)).replace(minute=2, second=0, microsecond=0)
        delta = (next_time - utcnow).total_seconds()
        await asyncio.sleep(delta)

        # tentativa inicial
        old_hash = FILE_HASH
        new_hash = await compute_file_hash()
        if new_hash and new_hash != old_hash:
            await load_cache()
        else:
            # retentativas a cada minuto, até 5
            for attempt in range(1, 6):
                print(f"[Cache] Sem mudança detectada, tentativa {attempt} de 5 em 1 minuto")
                await asyncio.sleep(60)
                new_hash = await compute_file_hash()
                if new_hash and new_hash != old_hash:
                    await load_cache()
                    break
            else:
                print(f"[Cache] Desistindo após 5 tentativas, mantendo cache atual")

@app.on_event("startup")
async def on_startup():
    # Carrega cache inicialmente e agenda atualização
    await load_cache()
    asyncio.create_task(schedule_cache_refresh())

# Endpoints usando cache em memória
@app.get("/pontos", summary="Lista todos os pontos de coleta")
def listar_pontos():
    if not CACHE:
        raise HTTPException(status_code=503, detail="Cache não está disponível")
    return {
        "pontos": [
            {
                "codigo": codigo,
                "nome": info.get("nome"),
                "coordenadas": info.get("coordenadas_decimais"),
                "ultima_leitura": info.get("leitura_atual", {}).get("timestamp"),
                "specific_location": info.get("specific_location")
            }
            for codigo, info in CACHE.items()
        ]
    }

@app.get("/pontos/{codigo}", summary="Detalha um ponto de coleta específico")
def obter_ponto(codigo: str):
    if codigo not in CACHE:
        raise HTTPException(status_code=404, detail="Ponto não encontrado")
    return CACHE[codigo]

@app.get("/pontos/{codigo}/dados", summary="Dados meteorológicos e/ou marítimos do ponto")
def obter_dados(
    codigo: str,
    tipo: Optional[Literal['meteo', 'marine', 'ambos']] = Query('ambos', description="Filtrar por 'meteo', 'marine' ou 'ambos'.")
):
    #Retorna os dados do último timestamp para o ponto:
    #- 'meteo': apenas dados meteorológicos
    #- 'marine': apenas dados marítimos
    #- 'ambos': todos os dados
    if codigo not in CACHE:
        raise HTTPException(status_code=404, detail="Ponto não encontrado")
    leitura = CACHE[codigo].get("leitura_atual") or {}

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
            "weather_code",
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

# Execução via Uvicorn/Gunicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
# Para executar via Gunicorn, use o comando:
# gunicorn -w 4 -k uvicorn.workers.UvicornWorker api_praiometro:app --bind