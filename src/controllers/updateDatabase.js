const sequelize = require("../database/init");



const updateDatabase = async (dataArray, model) => {
 await sequelize.transaction(async () => {
        try {
           
            await model.drop({ where: {}, force: true });
            await model.sync();

            //const sequenceName = await model.getTableName() + "_id_seq";
            //await sequelize.query(``)

            console.log(dataArray)

            await model.bulkCreate(dataArray)

            console.log('Tabela atualizada!')

        } catch (error) {
            console.log(`Erro ao atualizar a tabela: ${error}`)
        }

    })
}


module.exports = updateDatabase