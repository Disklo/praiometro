import os
import shutil
import json
import socket
import re

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
        with open(config_file_path, 'r', encoding='utf-8-sig') as f:
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

        with open(config_file_path, 'w', encoding='utf-8-sig') as f:
            f.write(modified_content)
        
        print(f"Sucesso ao adicionar {ip_address} em {config_file_path}")

    except FileNotFoundError:
        print(f"Erro: {config_file_path} não encontrado.")
    except Exception as e:
        print(f"Um erro inesperado ocorreu: {e}")

def handle_api_ip(frontend_dir):
    api_js_path = os.path.join(frontend_dir, "src", "api", "api.js")
    exemplo_api_js_path = os.path.join(frontend_dir, "src", "api", "exemplo_api.js")

    if not os.path.exists(api_js_path) and os.path.exists(exemplo_api_js_path):
        shutil.copy(exemplo_api_js_path, api_js_path)
        print(f"'{os.path.basename(exemplo_api_js_path)}' foi copiado para '{os.path.basename(api_js_path)}'")
    
    try:
        with open(api_js_path, 'r', encoding='utf-8-sig') as f:
            content = f.read()

        match = re.search(r"const API_URL = 'http://([^:]+):8000';", content)
        if not match:
            print("Não foi possível encontrar o padrão de URL da API em api.js.")
            return None
        
        current_ip = match.group(1)
        ip_to_use = current_ip
        
        should_ask_for_ip = False
        if current_ip in ["INSIRA_IP_DA_API_AQUI", "INSIRA_IP_DA_API_DO_BACKEND_AQUI"]:
            print("O IP da API do backend ainda não foi configurado.")
            should_ask_for_ip = True
        else:
            change_ip_response = input(f"O IP da API está configurado como '{current_ip}'. Deseja alterá-lo? (s/n): ")
            if change_ip_response.lower() == 's':
                should_ask_for_ip = True

        if should_ask_for_ip:
            ip_input = input('Por favor, insira o IP da API do backend (ou digite "local" para usar o IP da LAN): ')
            if ip_input.lower() == 'local':
                new_ip = obter_ip_lan()
            else:
                new_ip = ip_input
            
            new_content = content.replace(current_ip, new_ip)
            with open(api_js_path, 'w', encoding='utf-8-sig') as f:
                f.write(new_content)
            print(f"O arquivo 'api.js' foi atualizado com o IP: {new_ip}")
            ip_to_use = new_ip

        if ip_to_use in ["INSIRA_IP_DA_API_AQUI", "INSIRA_IP_DA_API_DO_BACKEND_AQUI"]:
            return None
        
        return ip_to_use

    except FileNotFoundError:
        print(f"Erro: {api_js_path} não encontrado.")
        return None
    except Exception as e:
        print(f"Um erro inesperado ocorreu ao manusear api.js: {e}")
        return None

def main():
    frontend_dir = "frontend"
    app_json_path = os.path.join(frontend_dir, "app.json")
    eas_json_path = os.path.join(frontend_dir, "eas.json")
    android_manifest_path = os.path.join(frontend_dir, "android", "app", "src", "main", "AndroidManifest.xml")

    eas_json_created = False
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
        exemplo_path = os.path.join(frontend_dir, "android", "app", "src", "main", "res", "xml", "exemplo_network_security_config.xml")
        if os.path.exists(exemplo_path):
            shutil.copy(exemplo_path, network_security_config_path)
            print("network_security_config.xml criado.")
        else:
            print(f"Arquivo de exemplo não encontrado em {exemplo_path}, pulando a criação de network_security_config.xml.")
    else:
        print("network_security_config.xml já existe.")

    # Terceiro: Lida com o IP da API e atualiza os arquivos necessários
    api_ip = handle_api_ip(frontend_dir)
    config_file = os.path.join(frontend_dir, "android", "app", "src", "main", "res", "xml", "network_security_config.xml")

    if not os.path.exists(config_file):
        print(f"Arquivo de configuração de segurança de rede não encontrado em {config_file}, pulando a atualização.")
    else:
        if api_ip:
            print(f"Endereço de IP da API a ser usado: {api_ip}")
            update_network_security_config(api_ip, config_file)
        
        lan_ip = obter_ip_lan()
        print(f"Endereço de IP da LAN obtido: {lan_ip}")
        update_network_security_config(lan_ip, config_file)


    # Quarto: Verificar e pedir as chaves se necessário
    with open(app_json_path, 'r+', encoding='utf-8-sig') as f:
        app_json = json.load(f)
        if app_json["expo"]["extra"]["GOOGLE_CLIENT_ID"] == "INSERT_ID_HERE":
            client_id = input("Por favor, insira o Web Client ID: ")
            app_json["expo"]["extra"]["GOOGLE_CLIENT_ID"] = client_id
        
        if client_id:
            f.seek(0)
            json.dump(app_json, f, indent=2)
            f.truncate()
            print("app.json atualizado.")

    with open(eas_json_path, 'r+', encoding='utf-8-sig') as f:
        eas_json = json.load(f)
        needs_update = False
        for build_profile in eas_json["build"]:
            if "env" in eas_json["build"][build_profile]:
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

    # Quinto: Lembrar o usuário sobre npm install e eas init
    if eas_json_created:
        print("\nLembrete: execute 'npm install' e 'eas init' dentro da pasta frontend.")


if __name__ == "__main__":
    main()