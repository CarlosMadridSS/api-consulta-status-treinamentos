const database = require('../../database/init')
const treinamento = require('../../../models/define/treinamento')

const Treinamento = database.define(treinamento.nameTable, treinamento.attributes, {tableName: treinamento.nameTable});


module.exports = Treinamento