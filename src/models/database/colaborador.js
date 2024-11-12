const database = require('../../database/init')
const colaborador = require('../../../models/define/colaborador');

const Colaborador = database.define(colaborador.modelName, colaborador.attributes, {tableName: colaborador.nameTable});

module.exports = Colaborador