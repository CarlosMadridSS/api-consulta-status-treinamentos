const Sequelize = require('sequelize')

const treinamento = {nameTable: 'treinamento', attributes: {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    treinamento: {
        type:Sequelize.STRING,
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}}


module.exports = treinamento