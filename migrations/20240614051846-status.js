'use strict';

const status = require('../models/define/status')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(status.nameTable, status.attributes);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(status.nameTable);
  }
};
