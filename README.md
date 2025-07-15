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

1.  Localize o arquivo `exemplo.env.base` na raiz do projeto.
2.  Abra o arquivo e substitua `YOUR_GOOGLE_MAPS_API_KEY_HERE` pela sua chave da API do Google Maps.
3.  Renomeie o arquivo `exemplo.env.base` para `.env`.

    ```bash
    mv exemplo.env.base .env
    ```

    No Windows, você pode usar:

    ```bash
    ren exemplo.env.base .env
    ```

### 3. Rodando o Aplicativo em Desenvolvimento

Para iniciar o aplicativo em modo de desenvolvimento:

```bash
npm start
# ou
yarn start
```

Isso geralmente abrirá o Expo Developer Tools em seu navegador, onde você pode escolher rodar o aplicativo em um emulador, dispositivo físico ou no navegador.

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
