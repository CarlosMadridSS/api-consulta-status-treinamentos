const Sequelize = require('sequelize')

const colaborador = {
    modelName: 'Colaborador', nameTable: 'colaborador', attributes: {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        matricula: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }
}


module.exports = colaborador