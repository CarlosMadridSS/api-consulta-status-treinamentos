const Sequelize = require('sequelize')


const status = {
    modelName: 'Status', nameTable: 'status', attributes: {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }
}


module.exports = status