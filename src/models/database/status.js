const database = require('../../database/init')
const status =require('../../../models/define/status');

const Status = database.define(status.nameTable, status.attributes, {tableName: status.nameTable});

module.exports = Status