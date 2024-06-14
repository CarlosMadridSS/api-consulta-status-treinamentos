const Colaborador = require('../../models/database/colaborador')
const ColaboradorClasse = require('../../models/generalClass/colaborador')

const getColaborador = async () => {

    try {
        const data = await Colaborador.findAll()

        let dataArray = []

        data.forEach(item => {
            dataArray.push(new ColaboradorClasse().makeTransportObj(item.dataValues.id, item.dataValues.nome, item.dataValues.matricula))
        })


        return dataArray

    } catch (error) {
        const msgErr = 'Erro ao capturar lista de colaboradores'
        console.log(`${msgErr}: ${error}`)
    }


}

module.exports = getColaborador