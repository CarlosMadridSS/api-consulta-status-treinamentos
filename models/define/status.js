const Sequelize = require('sequelize')


const status = {nameTable: 'status', attributes: {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type:Sequelize.STRING(50),
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}}


module.exports =status