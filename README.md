# Dependências do Computador
  - Node.js (v20.18.0 LTS)
    - npm (v10.9.0 ou superior)
    - npx (v10.9.0 ou superior) 
  - Docker (certificar instalação de docker-compose)
  - Git

# Inicializando pela primeira vez

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
  - password: 123456

  # Diretório: / (raíz)
  
  // 1- Instalar dependências:
    
    npm install --save-dev

  *Caso apareça algum aviso de vulnerabilidade, use:

    npm update

  e depois:

    npm audit fix
    
  //2 - Criar tabelas:
  
    npx sequelize-cli db:create

  //3 - Migrar tabelas:
  
    npx sequelize-cli db:migrate
    
  //4 - Inicializar projeto:
  
  Modo desenvolvimento:
    
    npm run dev

# ----------------Teste de Funcionalidades---------------------
  Antes de começar a utilizar o sistema, teste as funcionalidades com:

    npm run test:cypress

  Caso prefira utilizar a interface gráfica do Cypress, para visualizar os testes nas specs específicas, use:

    npm run test:cypress:open

  //Em caso de falhas

  Você poderá analisar os relatórios com mais calma em: ~/cypress/results e analisar as capturas de tela que referenciam o momento das falhas em ~/cypress/screenshots

# ----------------Utilização da API---------------------
  Para visualizar os end-points, autentique-se como 'master' e acesse:

    http://localhost:3030/


# --------------Rotas da Aplicação---------------

  Para efetuar o login e começar a utilizar a aplicação, acesse:

  http://localhost:3030/admin/login

# ----------Informações de Ambiente--------------

  Caso precise encontrar ou alterar alguma informação específica, acesse o arquivo '.env'

  Isso incluirá a senha do usuário master.

# ----------------Funcionamento------------------

  //Desenvolvimento

  Para testar a importação dos dados, acesse a secção 'Baixar Modelos' depois acesse a secção 'Importar Dados' insira os modelos nos seus respectivos campos.

  // Em uso geral

  Para começar a adicionar dados no gerenciamento nas planilhas, você pode começar selecionando-as e adicionando os dados, um a um.

  Se você possuir dados em outras planilhas e desejar enquadrar na aplicação, baixe os modelos de planilha, em formato CSV, através da secção 'Baixar Modelos' e converta para o formato do seu gerenciador de planilhas.

  Após adicionar os dados, conforme organizados nos modelos, converta novamente para CSV e importe-os na secção 'Importar Dados'.

  Atente-se que as estruturas dos modelos não devem ser alteradas, pois o sistema não aceitará mudanças de estrutura e tipos de dados.

  Ao fazer o processo de importação, todos os dados das planilhas serão sobrescritos.

  Você também pode adicionar os dados através do sistema e exportá-los através da secção 'Exportar Dados'

# ---------------Observações---------------------

De aplicação:

- O usuário master não pode trocar a sua própria senha por meio desta aplicação.
- Usuários não poderão alterar usuários que sejam de mesmo nível.
- Se você efetuar uma busca, para um campo numérico, como a matrícula, a busca será literal.

- A aplicação está sendo executada em modo de desenvolvimento. Fica a critério de quem implementar para fazer as modificações necessárias para a produção.

  Basta modificar a variável de ambiente .env->NODE_ENV para:
  
      production

  E inicializar a aplicação com:

      npm run start


# ---------------Erros Comuns---------------------

  //Banco de Dados
  Se seu computador estiver rodando um servidor postgres e você subir o container para esta aplicação, na criação do banco de dados e na migração das tabelas, ocorrerá um erro. Desinstale o postgres ou derrube todos os serviços que estejam utilizando a porta 5432 e reinicialize o container do postgres da aplicação.