'use strict';

const treinamentoColaborador = require('../models/define/treinamentoColaborador')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(treinamentoColaborador.nameTable, treinamentoColaborador.attributes);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(treinamentoColaborador.nameTable);
  }
};
