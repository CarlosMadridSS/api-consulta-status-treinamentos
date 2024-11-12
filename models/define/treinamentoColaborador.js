const Sequelize = require('sequelize');

const treinamentoColaborador = {
    modelName: 'TreinamentoColaborador', nameTable: 'treinamentos_colaborador', attributes: {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        colaborador: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'colaborador', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        status: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'status', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        treinamento: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'treinamento', key: 'id' },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        inicio:{
            type: Sequelize.DataTypes.DATE,
            allowNull: true
        },
        termino:{
            type: Sequelize.DataTypes.DATE,
            allowNull: true
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE

    }
}


module.exports = treinamentoColaborador





