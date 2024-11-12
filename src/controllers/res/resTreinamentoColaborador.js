const getTreinamentoColaborador = require("../get/getTreinamentoColaborador")
const returnFormattedData = require("../returnFormattedData")

const resTreinamentoColaborador = async (res) => {

    const datagetTreinamentoColaborador = await getTreinamentoColaborador({ order: [['id', 'ASC'],] })

    const filteredDataGetTreinamentoColaborador = datagetTreinamentoColaborador.map(item => {
        return {
            id: item.id,
            matricula: item.matricula,
            status: item.status,
            treinamento: item.treinamento,
            inicio: returnFormattedData(item.inicio),
            termino: returnFormattedData(item.termino)
        }
    })

    res.json(filteredDataGetTreinamentoColaborador)


}




module.exports = resTreinamentoColaborador