# Dependências do Computador
  - Node.js v20.18.0 (LTS)
    - npm (v10.7.0 ou superior)
    - npx (v10.7.0 ou superior) 
  - Git

# Recomendações de SGBDS
  - Dbeaver
  - MySQL Workbench

# //------------No projeto-----------------

  # Banco de dados (MySQL)

  Defina/crie o seu usuário como:

    root

  Defina a sua senha como:

    123456
  

  Após fazer a sua conexão, com seu SGBD de preferência, crie um banco de dados chamado:

    treinamentos


  # Diretório: /src/planilha_google/

  Colar arquivo credentials.json (com as credenciais disponibilizadas no Google Cloud -> Google Sheets API)

  # Diretório: / (raíz)
  
  // 1- Instalar dependências:
    
    npm install --save-dev

  *Caso apareça algum aviso de vulnerabilidade, use:

    npm update

  e depois:

    npm audit fix
    
  //2 - Migrar tabelas:
  
    npx sequelize-cli db:migrate
    
  //3 - Inicializar projeto:
    
    npm run dev

# ----------------Testar API---------------------

    acessar http://localhost:3030/

# Modo de Uso

Recomendação
  
  Antes de realizar quaisquer requisições, deve-se conferir a disponibilidade na rota:

    http://localhost:3030/disponibilidade

  se disponível, podem ser realizadas as requisiçoes.

# ---------------Observações---------------------

De uso: 

  - A API faz uma sincronização com a planilha a cada 5 minutos.

De aplicação:

- A aplicação está sendo executada em modo de desenvolvimento. Fica a critério de quem implementar para fazer as modificações necessárias para a produção.

  Basta modificar a variável de ambiente .env->NODE_ENV para:
  
      production

  E inicializar a aplicação com:

      npm run start
