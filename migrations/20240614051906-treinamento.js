'use strict';

const treinamento = require('../models/define/treinamento')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(treinamento.nameTable, treinamento.attributes);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(treinamento.nameTable);
  }
};
