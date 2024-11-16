(async () => {

    const database = require('./init')
    //const Status = require('../models/status')

    //Testando conexão
    try {
        database.authenticate();
        console.log('Sucesso ao conectar ao banco de dados.');
      } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
      }

      //await database.sync({force:true}).then(() => console.log('Banco de dados sincronizado com sucesso!')).catch(err => console.log(`Erro ao sincronizar banco de dados: ${err}`))


})()