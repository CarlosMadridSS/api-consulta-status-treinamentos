const Sequelize = require('sequelize')

const treinamento = {
    modelName: 'Treinamento', nameTable: 'treinamento', attributes: {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        treinamento: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }
}


module.exports = treinamento