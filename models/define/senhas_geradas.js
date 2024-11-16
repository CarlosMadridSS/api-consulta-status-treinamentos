const Sequelize = require('sequelize')

const senhasGeradas = {
    modelName: 'SenhasGeradas', nameTable: 'senhas_geradas', attributes: {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        senhaTemp: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        data: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        admin_colaborador: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'admin_colaborador', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }
}


module.exports = senhasGeradas