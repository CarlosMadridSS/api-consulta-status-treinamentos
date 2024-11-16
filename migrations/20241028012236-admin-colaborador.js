'use strict';
const dotenv = require('dotenv')
const generateHashPass = require('../src/controllers/generateHashPass')
const adminColaborador = require('../models/define/admin_colaborador')

dotenv.config()
const user = process.env.USER_MASTER
const pass = process.env.USER_MASTER_PASSWORD



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(adminColaborador.nameTable, adminColaborador.attributes);

    await queryInterface.bulkInsert(adminColaborador.nameTable, [{
      id: 1,
      nome: '',
      sobrenome: '',
      matricula: Number(user),
      privilegios: 'master',
      senha: await generateHashPass(pass),
      senha_temp: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(adminColaborador.nameTable);
  }
};