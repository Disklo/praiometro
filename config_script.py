
import os
import shutil
import json
import socket

def obter_ip_lan():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"
    finally:
        s.close()

def update_network_security_config(ip_address, config_file_path):
    try:
        with open(config_file_path, 'r') as f:
            content = f.read()

        if f'<domain includeSubdomains="true">{ip_address}</domain>' in content:
            print(f"O endereço de IP {ip_address} já existe em {config_file_path}")
            return

        closing_tag_with_indent = "    </domain-config>"
        if closing_tag_with_indent not in content:
            print(f"Erro: {closing_tag_with_indent} não encontrado em {config_file_path}")
            return

        new_domain_entry = f"        <domain includeSubdomains=\"true\">{ip_address}</domain>\n"
        modified_content = content.replace(closing_tag_with_indent, new_domain_entry + closing_tag_with_indent)

        with open(config_file_path, 'w') as f:
            f.write(modified_content)
        
        print(f"Sucesso ao adicionar {ip_address} em {config_file_path}")

    except FileNotFoundError:
        print(f"Erro: {config_file_path} não encontrado.")
    except Exception as e:
        print(f"Um erro inesperado ocorreu: {e}")

def main():
    frontend_dir = "frontend"
    app_json_path = os.path.join(frontend_dir, "app.json")
    eas_json_path = os.path.join(frontend_dir, "eas.json")
    android_manifest_path = os.path.join(frontend_dir, "android", "app", "src", "main", "AndroidManifest.xml")

    eas_json_created = False
    api_key = None
    client_id = None

    # Primeiro: Criar app.json e eas.json se não existirem
    if not os.path.exists(app_json_path):
        shutil.copy(os.path.join(frontend_dir, "exemplo.app.json.base"), app_json_path)
        print("app.json criado.")
    else:
        print("app.json já existe.")

    if not os.path.exists(eas_json_path):
        shutil.copy(os.path.join(frontend_dir, "exemplo.eas.json.base"), eas_json_path)
        print("eas.json criado.")
        eas_json_created = True
    else:
        print("eas.json já existe.")

    # Segundo: Criar AndroidManifest.xml e network_security_config.xml se não existirem
    if not os.path.exists(android_manifest_path):
        shutil.copy(os.path.join(frontend_dir, "android", "app", "src", "main", "exemplo.AndroidManifest.xml"), android_manifest_path)
        print("AndroidManifest.xml criado.")
    else:
        print("AndroidManifest.xml já existe.")

    network_security_config_path = os.path.join(frontend_dir, "android", "app", "src", "main", "res", "xml", "network_security_config.xml")
    if not os.path.exists(network_security_config_path):
        exemplo_path = os.path.join(frontend_dir, "android", "app", "src", "main", "res", "xml", "exemplo.network_security_config.xml")
        if os.path.exists(exemplo_path):
            shutil.copy(exemplo_path, network_security_config_path)
            print("network_security_config.xml criado.")
        else:
            print(f"Arquivo de exemplo não encontrado em {exemplo_path}, pulando a criação de network_security_config.xml.")
    else:
        print("network_security_config.xml já existe.")

    # Terceiro: Verificar e pedir as chaves se necessário
    with open(app_json_path, 'r+') as f:
        app_json = json.load(f)
        if app_json["expo"]["android"]["config"]["googleMaps"]["apiKey"] == "INSERT_KEY_HERE":
            api_key = input("Por favor, insira a chave da API do Google Maps: ")
            app_json["expo"]["android"]["config"]["googleMaps"]["apiKey"] = api_key
        if app_json["expo"]["extra"]["GOOGLE_CLIENT_ID"] == "INSERT_ID_HERE":
            client_id = input("Por favor, insira o Web Client ID: ")
            app_json["expo"]["extra"]["GOOGLE_CLIENT_ID"] = client_id
        
        if api_key or client_id:
            f.seek(0)
            json.dump(app_json, f, indent=2)
            f.truncate()
            print("app.json atualizado.")

    with open(eas_json_path, 'r+') as f:
        eas_json = json.load(f)
        needs_update = False
        for build_profile in eas_json["build"]:
            if "env" in eas_json["build"][build_profile]:
                if eas_json["build"][build_profile]["env"]["GOOGLE_MAPS_API_KEY"] == "INSERT_KEY_HERE":
                    if not api_key:
                        api_key = input("Por favor, insira a chave da API do Google Maps: ")
                    eas_json["build"][build_profile]["env"]["GOOGLE_MAPS_API_KEY"] = api_key
                    needs_update = True
                if eas_json["build"][build_profile]["env"]["GOOGLE_CLIENT_ID"] == "INSERT_ID_HERE":
                    if not client_id:
                        client_id = input("Por favor, insira o Web Client ID: ")
                    eas_json["build"][build_profile]["env"]["GOOGLE_CLIENT_ID"] = client_id
                    needs_update = True
        if needs_update:
            f.seek(0)
            json.dump(eas_json, f, indent=2)
            f.truncate()
            print("eas.json atualizado.")

    # Quarto: Roda a mesma função que get_ip.py
    ip = obter_ip_lan()
    print(f"Endereço de IP obtido: {ip}")
    config_file = os.path.join(frontend_dir, "android", "app", "src", "main", "res", "xml", "network_security_config.xml")
    if not os.path.exists(config_file):
        print(f"Arquivo de configuração de segurança de rede não encontrado em {config_file}, pulando a atualização.")
    else:
        update_network_security_config(ip, config_file)

    # Quinto: Pergunta sobre o AndroidManifest.xml
    with open(android_manifest_path, 'r') as f:
        manifest_content = f.read()

    api_key_placeholder = '@string/google_maps_api_key'
    meta_data_line = '<meta-data\n                android:name="com.google.android.geo.API_KEY"\n                android:value="@string/google_maps_api_key" />'

    if api_key_placeholder in manifest_content:
        resposta = input(f"Deseja substituir '{api_key_placeholder}' pela chave da API em AndroidManifest.xml? (s/n): ")
        if resposta.lower() == 's':
            if not api_key:
                api_key = input("Por favor, insira a chave da API do Google Maps para o AndroidManifest.xml: ")
            manifest_content = manifest_content.replace(api_key_placeholder, api_key)
            with open(android_manifest_path, 'w') as f:
                f.write(manifest_content)
            print("AndroidManifest.xml atualizado.")
    else:
        resposta = input("A chave da API já está em AndroidManifest.xml. Deseja reverter para '@string/google_maps_api_key'? (s/n): ")
        if resposta.lower() == 's':
            # Encontra a linha do meta-data e extrai a chave atual
            import re
            match = re.search(r'android:value="(.*?)"', manifest_content)
            if match:
                current_api_key = match.group(1)
                manifest_content = manifest_content.replace(current_api_key, api_key_placeholder)
                with open(android_manifest_path, 'w') as f:
                    f.write(manifest_content)
                print("AndroidManifest.xml revertido.")
            else:
                print("Não foi possível encontrar a chave da API no AndroidManifest.xml para reverter.")


    # Sexto: Lembrar o usuário sobre npm install e eas init
    if eas_json_created:
        print("\nLembrete: execute 'npm install' e 'eas init' dentro da pasta frontend.")


if __name__ == "__main__":
    main()
