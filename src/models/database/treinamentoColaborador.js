const database = require('../../database/init');
const treinamentoColaborador = require('../../../models/define/treinamentoColaborador');
const Colaborador = require('./colaborador');
const Treinamento = require('./treinamento');
const Status = require('./status');

const TreinamentosColaborador = database.define(treinamentoColaborador.modelName, treinamentoColaborador.attributes, {tableName: treinamentoColaborador.nameTable});


Colaborador.hasMany(TreinamentosColaborador, { foreignKey: 'colaborador' });
Treinamento.hasMany(TreinamentosColaborador, { foreignKey: 'treinamento' });
Status.hasMany(TreinamentosColaborador, { foreignKey: 'status' });

TreinamentosColaborador.belongsTo(Colaborador, { foreignKey: 'colaborador' });
TreinamentosColaborador.belongsTo(Treinamento, { foreignKey: 'treinamento' });
TreinamentosColaborador.belongsTo(Status, { foreignKey: 'status' });


module.exports = TreinamentosColaborador