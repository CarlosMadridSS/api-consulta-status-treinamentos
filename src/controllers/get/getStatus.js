const Status = require('../../models/database/status')
const StatusClasse = require('../../models/generalClass/status')

const getStatus = async () => {
    try {
        const data = await Status.findAll()

        let dataArray = []

        data.forEach(item => {
            dataArray.push(new StatusClasse().makeTransportObj(item.dataValues.id, item.dataValues.status))
        })

        return dataArray
        
    } catch (error) {
        const msgErr = 'Erro ao capturar lista de status'
        console.log(`${msgErr}: ${error}`)
    }
}




module.exports = getStatus