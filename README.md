# Dependências do Computador
  - Node.js (v20.14.0 ou superior)
  - Docker (certificar instalação de docker-compose)
  - Git

# Inicializando pela primeira vez

  # // ---acessar acessar ou criar planilha—
  
  |Não possui uma conta de serviço Google Sheets API?|
  
  Logue em 
  
    https://console.cloud.google.com/
  
  e crie uma conta de serviços para o serviço de API “Google Sheets API”. Após criar a conta, baixe as credenciais e renomeie o arquivo (json) para ‘credentials.json’ e cole na pasta do projeto ‘planilha_google’. Feito isso, insira o e-mail criado nas contas de serviço do Google Cloud na planilha configurada. Por último, copie o ID da planilha e cole no campo SHEET_ID do arquivo .env presente no projeto.
    
  Download de planilha modelo:
  
    https://docs.google.com/spreadsheets/d/1leCvngjDKF5W5CrpzLvzQXGwEA_M3T5y/edit?usp=drive_link&ouid=116816249699102537188&rtpof=true&sd=true

# //------------No projeto------------------
  # Diretório: /docker
  
  // 1- Subir containers (banco de dados e SGBD):
  
    docker-compose -f docker-compose-postgres.yaml up -d

  // Acessar pgadmin:
  
    http://localhost:5050/

  // Inserir credenciais
  
  usuario
  
    admin@root.com

  senha

    123456

  //Criar novo servidor

  General
  
  - definir nome

  Connection

  - host name: inserir nome do container do postgres
  - port: 5432 (padrão)
  - maintenance database: postgres
  - username: postgres

  # Diretório: /src/planilha_google/

  Colar arquivo credentials.json (com as credenciais disponibilizadas no Google Cloud -> Google Sheets API)

  # Diretório: / (raíz)
  
  // 2- Instalar dependências:
    
    npm install --save-dev
    
  // 3 - Criar banco de dados (apenas se o banco de dados não estiver sido criado automaticamente pelo pgadmin):
    
    npx sequelize-cli db:create
    
  //4 - Migrar tabelas:
  
    npx sequelize-cli db:migrate
    
  //5 - Inicializar projeto:
    
    npm run dev

# ----------------Testar API---------------------

    acessar http://localhost:3030/

# Modo de Uso

Recomendação
  
  Antes de realizar quaisquer requisições, deve-se conferir a disponibilidade na rota:

    http://localhost:3030/disponibilidade

  se disponível, podem ser realizadas as requisiçoes.

# ---------------Observação---------------------

  A API faz uma sincronização com a planilha a cada 5 minutos.
