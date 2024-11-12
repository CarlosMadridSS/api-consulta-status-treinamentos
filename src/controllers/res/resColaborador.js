const Colaborador = require('../../models/database/colaborador')
const ColaboradorClasse = require('../../models/generalClass/colaborador')

const resColaborador = async (res) => {

    Colaborador.findAll({order: [['matricula', 'ASC']]}).then(data => {
            
        let arrayColaborador = []

        data.forEach(item => {
            arrayColaborador.push(new ColaboradorClasse().makeTransportObj(item.dataValues.id, item.dataValues.nome, item.dataValues.matricula))
        })

        res.json(arrayColaborador)

    }).catch(err => {
        const msgErr = 'Erro ao capturar lista de colaboradores'
        console.log(`${msgErr}: ${err}`)
        res.send(`${msgErr}...`)
    })

}

module.exports = resColaborador