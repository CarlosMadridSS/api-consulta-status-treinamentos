const database = require('../../database/init')
const adminColaborador = require('../../../models/define/admin_colaborador');

const AdminColaborador = database.define(adminColaborador.modelName, adminColaborador.attributes, {tableName: adminColaborador.nameTable});

module.exports = AdminColaborador