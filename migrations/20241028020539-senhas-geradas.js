'use strict';

const senhasGeradas = require('../models/define/senhas_geradas')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(senhasGeradas.nameTable, senhasGeradas.attributes);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(senhasGeradas.nameTable);
  }
};