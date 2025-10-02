# <img width="1189" height="452" alt="praiometro" src="https://github.com/user-attachments/assets/13010574-ca6a-40fe-9dfd-db9b9e97063b" />

https://github.com/user-attachments/assets/b718cb31-5ac5-40ae-a22f-d65cb5077dcb

https://youtu.be/DLOMGoQEr1I

Este projeto fez parte da disciplina Computação e Meio Ambiente ministrada pelo professor José Raphael Bokehi na Universidade Federal Fluminense (UFF).

## Como Configurar e Rodar o Projeto

Para o front-end, assume-se que você possui Python 3, JDK 17, Android Studio, Node-JS e NPM instalados. Para o back-end, assume-se que você possui Python 3 e MongoDB instalados.

### Back-end

1. Instale as dependências com `pip install -r requirements.txt`
2. Na máquina que deseja usar como servidor, rode o script `start_mongo.bat` (Windows) ou `start_mongo.sh` (Linux).
3. Rode `api_praiometro.py`
4. Rode `praiometro_hourly.py`
5. Rode `avaliador.py`
6. No front-end, altere `frontend/src/api/api.js` com o IP da máquina que usará como servidor.
7. No front-end, altere `frontend/android/app/src/main/res/xml/network_security_config.xml` para incluir o IP da máquina que será usada como servidor.

### Front-end

> [!TIP]
> Você pode executar `config_script.py` para configurar automaticamente e pular para **"Como Gerar um APK ou rodar em modo de desenvolvimento"**. No entanto, caso queira configurar manualmente, abra a aba **"Configuração manual"** a seguir.

<details>
    <summary>Configuração manual</summary>
    
    ### 1. Configuração da Chave da API do Google Maps
    
    Para que o aplicativo funcione corretamente, você precisa inserir sua chave da API do Google Maps.
    
    1.  Localize o arquivo `exemplo.env.base` na pasta do frontend.
    2.  Abra o arquivo e substitua TODAS instâncias `INSERT_KEY_HERE` pela sua chave da API do Google Maps. Faça o mesmo para o Web Client ID. 
    4.  Renomeie o arquivo `exemplo.eas.json.base` para `eas.json`.
    
    ### 2. Renomear app.json
    
    1.  Localize o arquivo `exemplo.app.base` na pasta do frontend.
    2.  Abra o arquivo e substitua TODAS instâncias `INSERT_KEY_HERE` pela sua chave da API do Google Maps. Faça o mesmo para o Web Client ID. 
    3.  Renomeie o arquivo `exemplo.app.json.base` para `eas.json`.
    
    
    ### 3. Renomear exemplo.AndroidManifest.xml
    
    1.  Localize o arquivo `exemplo.AndroidManifest.xml` na pasta frontend\android\app\src\main.
    2.  Caso você vá fazer uma prebuild, substitua `@string/google_maps_api_key` pela sua key da API do Google Maps. Caso vá fazer build com `eas build`, mantenha do jeito que está. Lembre-se de mudar esse valor a depender de se você vai fazer build do APK ou prebuild.
    3.  Renomeie o arquivo `exemplo.AndroidManifest.xml` para `AndroidManifest.xml`.
    
    
    ### 4. Fazer git restore de ambos arquivos
    
    Para evitar que você sem querer apague os templates de app.json e eas.json num commit, faça git restore dos arquivos
    
    ```bash
        git restore exemplo.app.json.base
        git restore exemplo.eas.json.base
        git restore android\app\src\main\exemplo.AndroidManifest.xml
    ```

    ### 5. Colocar o IP da máquina nas configurações de rede.

    Na pasta-raíz do projeto, rode o script Python `get_ip.py` para adicionar o IP de sua máquina nas configurações de rede do app:

    ```bash
    python get_ip.py
    ```
</details>

### Como Gerar um APK ou rodar em modo de desenvolvimento (prebuild)

Para gerar um arquivo APK para distribuição, você pode usar o Expo Application Services (EAS).

#### 1. Instalar o EAS CLI

Se você ainda não tem o EAS CLI instalado globalmente, instale-o:

```bash
npm install -g eas-cli
```

#### 2. Instalação das Dependências

Certifique-se de ter o Node.js e o npm instalados. Em seguida, instale as dependências do projeto:

```bash
npm install
```

#### 3. Inicializar o Projeto EAS

Se esta for a primeira vez que você está usando o EAS neste projeto, você precisará inicializá-lo. Siga as instruções no terminal:

```bash
eas init
```

#### 4. Rodando o Aplicativo em Desenvolvimento (Caso só queira buildar o APK, pule esta etapa)

Para iniciar o aplicativo em modo de desenvolvimento, volte para a pasta do frontend e rode:

```bash
npx expo run:android
```

Isso abrirá um app para se conectar ao servidor de desenvolvimento, mas antes disso você precisa logar na sua conta Expo (clicando no ícone de pessoa no canto superior direito da tela). Após conectar na sua conta, selecione o servidor de desenvolvimento para entrar na prebuild do app.
> [!IMPORTANT]
> No app, ao invés de selecionar o servidor, escreva o endereço manualmente, substituindo "localhost" pelo endereço da sua máquina na LAN (`get_ip.py` na raíz do projeto imprime o IP, assim como `config_script.py`). A porta deve ser a mesma que a mostrada, então fica assim: `http://IP:PORTA`.

> [!WARNING]
> Caso você tenha mudado de rede desde a última vez que executou `npx expo run:android`, rode `get_ip.py` e execute `npx expo run:android` novamente. 

#### 5. Gerar o APK

Antes de executar esse comando, lembre-se de verificar se a key da API do Google Maps em `AndroidManifest.xml` está escrita como `@string/google_maps_api_ke`. Este comando enviará seu projeto para os servidores da Expo para a build:

```bash
eas build --platform android --profile production
```

Após a conclusão, você receberá um link para baixar o arquivo APK. 

> [!TIP]
> Você pode executar `config_script.py` para reverter o campo da key em Android `AndroidManifest.xml`

#### 6. Executando APK no emulador

Após buildar o APK, execute o seguinte comando para executá-lo no emulador:

```bash
eas build:run --platform android
```

O comando vai retornar uma lista das builds que vocCê fez, então escolha a mais recente. Você precisa ter Android Studio instalado, e também precisa ter `ANDROID_HOME` e `ANDROID_SDK_ROOT` nas suas variáveis de ambiente.

## Autoria
Criado por:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Disklo" title="Rafael Lucio">
        <img src="https://avatars.githubusercontent.com/u/24628410?v=4" width="100px;" alt="Foto de perfil de Rafael"/><br>
        <sub>
          <b>Disklo (Rafael Lucio)</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/joaopiller" title="João Piller">
        <img src="https://avatars.githubusercontent.com/u/174753035?v=4" width="100px;" alt="Foto de João"/><br>
        <sub>
          <b>joaopiller (João Piller)</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/lucasilvr" title="Lucas Silveira">
        <img src="https://avatars.githubusercontent.com/u/128090148?v=4" width="100px;" alt="Foto de Lucas"/><br>
        <sub>
          <b>lucasilvr (Lucas Silveira)</b>
        </sub>
      </a>
    </td>
    </td>
    <td align="center">
      <a href="https://github.com/azevedxpam" title="Pâmella de Azevedo">
        <img src="https://avatars.githubusercontent.com/u/198846109?v=4" width="100px;" alt="Foto de Pâmella"/><br>
        <sub>
          <b>azevedxpam (Pâmella de Azevedo)</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## Licença
Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
