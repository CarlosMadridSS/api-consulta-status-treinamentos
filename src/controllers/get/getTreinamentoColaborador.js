const Colaborador = require('../../models/database/colaborador')
const Status = require('../../models/database/status')
const Treinamento = require('../../models/database/treinamento')
const TreinamentoColaborador = require('../../models/database/treinamentoColaborador')
const TreinamentoColaboradorClasse = require('../../models/generalClass/treinamentoColaborador')


const getTreinamentoColaborador = async () => {

    try {
        const data = await TreinamentoColaborador.findAll({
            include: [
                {
                    model: Colaborador,
                    as: 'Colaborador',
                    required: true
                },
                {
                    model: Treinamento,
                    as: 'Treinamento',
                    required: true
                },
                {
                    model: Status,
                    as: 'Status',
                    required: true
                }
            ]
        })

        const filteredData = await data.map(item => ({
            id: item.id,
            matricula: item.Colaborador.matricula,
            status: item.Status.status,
            treinamento: item.Treinamento.treinamento,
            inicio: item.inicio,
            termino: item.termino
        }));

        let dataArray = []

        filteredData.forEach(item => {
            dataArray.push(new TreinamentoColaboradorClasse().makeTransportObj(item.id, item.matricula, item.status, item.treinamento, item.inicio, item.termino))
        })

        return dataArray

    } catch (error) {
        const msgErr = 'Erro ao capturar lista "treinamentos_colaborador"'
        console.log(`${msgErr}: ${error}`)
    }


}

module.exports = getTreinamentoColaborador