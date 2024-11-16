const database = require('../../database/init')
const senhasGeradas = require('../../../models/define/senhas_geradas');

const AdminColaborador = require('../database/admin_colaborador')

const SenhasGeradas = database.define(senhasGeradas.modelName, senhasGeradas.attributes, {tableName: senhasGeradas.nameTable});


AdminColaborador.hasMany(SenhasGeradas, { foreignKey: 'admin_colaborador' });
SenhasGeradas.belongsTo(AdminColaborador, { foreignKey: 'admin_colaborador' });

module.exports = SenhasGeradas