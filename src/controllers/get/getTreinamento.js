const Treinamento = require('../../models/database/treinamento')
const TreinamentoClasse = require('../../models/generalClass/treinamento')

const getTreinamento = async () => {
    try {
        const data = await Treinamento.findAll()

        let dataArray = []

        data.forEach(item => {
            dataArray.push(new TreinamentoClasse().makeTransportObj(item.dataValues.id, item.dataValues.treinamento, item.dataValues.treinamento))
        })
    
        return dataArray
        

    } catch (error) {
        const msgErr = 'Erro ao capturar lista de Treinamento'
        console.log(`${msgErr}: ${error}`)
    }
}





module.exports = getTreinamento