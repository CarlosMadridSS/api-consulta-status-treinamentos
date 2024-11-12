(async () => {

    const { Sequelize } = require('sequelize');
    const dotenv = require('dotenv');
    dotenv.config();

    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: 'mysql'
    });

    module.exports = sequelize;

    //const Status = require('../models/status')

    //Testando conexão
    try {
        sequelize.authenticate();
        console.log('Sucesso ao conectar ao banco de dados.');
      } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
      }

      //await sequelize.sync().then(() => console.log('Banco de dados sincronizado com sucesso!')).catch(err => console.log(`Erro ao sincronizar banco de dados: ${err}`))

  
      // Criando novo registro na tabela Status
      /*
        await Status.create({
          status: 'Status 2'
        })      
      */

})()