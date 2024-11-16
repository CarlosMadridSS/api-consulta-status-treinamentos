const database = require('../../database/init')
const status = require('../../../models/define/status');

const Status = database.define(status.modelName, status.attributes, {tableName: status.nameTable});

module.exports = Status