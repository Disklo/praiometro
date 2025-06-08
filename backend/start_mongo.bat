@echo off
REM Cria o diretório de dados se não existir
if not exist "data\db" (
    mkdir data\db
)

REM Caminho para mongod.exe (ajuste se necessário)
set MONGOD_PATH="C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe"

REM Inicia o servidor Mongo com o diretório local
echo Iniciando MongoDB local com dados em data\db...
%MONGOD_PATH% --dbpath=.\data\db