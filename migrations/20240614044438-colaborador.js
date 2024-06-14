'use strict';

const colaborador = require('../models/define/colaborador')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(colaborador.nameTable, colaborador.attributes);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(colaborador.nameTable);
  }
};
