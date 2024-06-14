const Sequelize = require('sequelize')

const treinamentoColaborador = {nameTable: 'treinamentos_colaborador', attributes: {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    matricula: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type:Sequelize.STRING(50),
        allowNull: false
    },
    treinamento: {
        type:Sequelize.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE

}}

module.exports = treinamentoColaborador