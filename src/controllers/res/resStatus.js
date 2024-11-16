const Status = require('../../models/database/status')
const StatusClasse = require('../../models/generalClass/status')
require('express')

const resStatus = async (res) => {
    await Status.findAll().then(async data => {

        let arrayStatus = []
    
        data.forEach(item => {
            arrayStatus.push(new StatusClasse().makeTransportObj(item.dataValues.id, item.dataValues.status))
        })
    
        await res.json(arrayStatus)
    
    }).catch(err => {
        const msgErr = 'Erro ao capturar lista de status'
        console.log(`${msgErr}: ${err}`)
        res.send(`${msgErr}...`)
    })
}




module.exports = resStatus