const database = require('../../database/init');
const treinamentoColaborador = require('../../../models/define/treinamentoColaborador')

const TreinamentosColaborador = database.define(treinamentoColaborador.nameTable, treinamentoColaborador.attributes, {tableName: treinamentoColaborador.nameTable});



module.exports = TreinamentosColaborador