const Sequelize = require('sequelize')

const adminColaborador = {
    modelName: 'AdminColaborador', nameTable: 'admin_colaborador', attributes: {
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
        sobrenome: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        matricula: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        privilegios: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        senha_temp: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }
}


module.exports = adminColaborador