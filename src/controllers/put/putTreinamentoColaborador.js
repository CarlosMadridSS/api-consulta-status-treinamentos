const TreinamentoColaboradorClasse = require('../../models/generalClass/treinamentoColaborador')
const TreinamentoColaborador = require('../../models/database/treinamentoColaborador')
const getValuesApi = require('../../services/getValuesApi')
const updateDatabase = require('../../controllers/updateDatabase')

const refreshTreinamentoColaborador = async (res) => {
    const dataValues = await getValuesApi('treinamentos_colaborador')

    const treinamentosColaboradorArray = new TreinamentoColaboradorClasse().getFormattedData(dataValues.data.values)

    await updateDatabase(treinamentosColaboradorArray, TreinamentoColaborador, res)
}

module.exports = refreshTreinamentoColaborador
