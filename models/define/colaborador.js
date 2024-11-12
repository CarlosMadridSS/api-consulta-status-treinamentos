const Sequelize = require('sequelize')

const colaborador = {
    nameTable: 'colaborador',
    attributes: {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        matricula: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }
}

module.exports = colaborador