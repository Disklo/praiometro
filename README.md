# Praiômetro - Frontend

Este projeto é o frontend do aplicativo Praiômetro.

## Como Configurar e Rodar o Projeto

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento.

### 1. Instalação das Dependências

Certifique-se de ter o Node.js e o npm (ou yarn) instalados. Em seguida, instale as dependências do projeto:

```bash
npm install
# ou
yarn install
```

### 2. Configuração da Chave da API do Google Maps

Para que o aplicativo funcione corretamente, você precisa inserir sua chave da API do Google Maps.

1.  Localize o arquivo `exemplo.env.base` na pasta do frontend.
2.  Abra o arquivo e substitua TODAS instâncias `INSERT_KEY_HERE` pela sua chave da API do Google Maps. Faça o mesmo para o Web Client ID. 
4.  Renomeie o arquivo `exemplo.eas.json.base` para `eas.json`.

    ```bash
    mv exemplo.eas.json.base eas.json
    ```

    No Windows, você pode usar:

    ```bash
    ren exemplo.eas.json.base eas.json
    ```

### 3. Renomear app.json

1.  Localize o arquivo `exemplo.app.base` na pasta do frontend.
2.  Abra o arquivo e substitua TODAS instâncias `INSERT_KEY_HERE` pela sua chave da API do Google Maps. Faça o mesmo para o Web Client ID. 
4.  Renomeie o arquivo `exemplo.app.json.base` para `eas.json`.

1.  Renomeie o arquivo `exemplo.app.json.base` para `app.json`.

    ```bash
    mv exemplo.app.json.base app.json
    ```

    No Windows, você pode usar:

    ```bash
    ren exemplo.app.json.base app.json
    ```

### 4. Fazer git restore de ambos arquivos

Para evitar que você sem querer apague os templates de app.json e eas.json num commit, faça git restore de ambos

    ```bash
    git restore exemplo.app.json.base
    git restore exemplo.eas.json.base
    ```

## Como Gerar um APK (Android)

Para gerar um arquivo APK para distribuição, você pode usar o Expo Application Services (EAS).

### 1. Instalar o EAS CLI

Se você ainda não tem o EAS CLI instalado globalmente, instale-o:

```bash
npm install -g eas-cli
```

### 2. Inicializar o Projeto EAS

Se esta for a primeira vez que você está usando o EAS neste projeto, você precisará inicializá-lo. Siga as instruções no terminal:

```bash
eas init
```

### 3. Gerar o APK

Após a inicialização do EAS, você pode construir o APK. Este comando enviará seu projeto para os servidores da Expo para a construção:

```bash
eas build --platform android --profile production
```

Após a conclusão da construção, você receberá um link para baixar o arquivo APK.

### 4. Rodando o Aplicativo em Desenvolvimento

Para iniciar o aplicativo em modo de desenvolvimento:

```bash
npx expo start
# ou
npm start
# ou
yarn start
```
