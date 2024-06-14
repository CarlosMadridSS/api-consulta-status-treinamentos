const sequelize = require("../database/init");
const feedbackMessage = require("../functions/resMsg");




const updateDatabase = (dataArray, model, res) => {
 sequelize.transaction(async () => {


        try {
            await model.destroy({truncate: true, restartIdenty: true, force: true})

            const sequenceName = await model.getTableName() + "_id_seq";
    
    
            await sequelize.query(`ALTER SEQUENCE "${sequenceName}" RESTART WITH 1;`)

            await model.bulkCreate(dataArray)

            await feedbackMessage('Tabela atualizada!', res)
        } catch (error) {
            console.log(`Erro ao atualizar a tabela: ${error}`)
        }

    })
}


module.exports = updateDatabase