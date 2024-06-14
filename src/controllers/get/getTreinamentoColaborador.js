const TreinamentoColaborador = require('../../models/database/treinamentoColaborador')
const TreinamentoColaboradorClasse = require('../../models/generalClass/treinamentoColaborador')

const getTreinamentoColaborador = async () => {

    try {
        const data = await TreinamentoColaborador.findAll()

        let dataArray = []

        data.forEach(item => {
            dataArray.push(new TreinamentoColaboradorClasse().makeTransportObj(item.dataValues.id, item.dataValues.matricula, item.dataValues.status, item.dataValues.treinamento))
        })

        return dataArray

    } catch (error) {
        const msgErr = 'Erro ao capturar lista "treinamentos_colaborador"'
        console.log(`${msgErr}: ${error}`)
    }


}

module.exports = getTreinamentoColaborador