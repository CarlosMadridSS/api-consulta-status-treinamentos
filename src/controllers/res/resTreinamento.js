const Treinamento = require('../../models/database/treinamento')
const TreinamentoClasse = require('../../models/generalClass/treinamento')

const resTreinamento = async (res) => {
    await Treinamento.findAll().then(data => {

        let arrayTreinamento = []
    
        data.forEach(item => {
            arrayTreinamento.push(new TreinamentoClasse().makeTransportObj(item.dataValues.id, item.dataValues.treinamento))
        })
    
        res.json(arrayTreinamento)
    
    }).catch(err => {
        const msgErr = 'Erro ao capturar lista de Treinamento'
        console.log(`${msgErr}: ${err}`)
        res.send(`${msgErr}...`)
    })
}

module.exports = resTreinamento