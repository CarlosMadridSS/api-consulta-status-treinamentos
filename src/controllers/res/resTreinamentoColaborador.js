const dataConvertTreinamentoColaborador = require('../dataConvertTreinamentoColaborador')

const resTreinamento = async (res) => {
    await dataConvertTreinamentoColaborador().then(data => {
        res.json(data)
    }).catch(err => {
        const msgErr = 'Erro ao capturar lista "treinamentos_colaborador"'
        console.log(`${msgErr}: ${err}`)
        res.send(`${msgErr}...`)
    })
}


module.exports = resTreinamento