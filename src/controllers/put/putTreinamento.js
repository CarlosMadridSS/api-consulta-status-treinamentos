const TreinamentoClasse = require('../../models/generalClass/treinamento')
const Treinamento = require('../../models/database/treinamento')
const getValuesApi = require('../../services/getValuesApi')
const updateDatabase = require('../../controllers/updateDatabase')

const refreshTreinamento = async (res) => {
    const dataValues = await getValuesApi('treinamento')

    const treinamentosArray = new TreinamentoClasse().getFormattedData(dataValues.data.values)

    await updateDatabase(treinamentosArray, Treinamento, res)
}

module.exports = refreshTreinamento
