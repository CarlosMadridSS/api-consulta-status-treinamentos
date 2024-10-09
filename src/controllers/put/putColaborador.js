const ColaboradorClasse = require('../../models/generalClass/colaborador')
const Colaborador = require('../../models/database/colaborador')
const getValuesApi = require('../../services/getValuesApi')
const updateDatabase = require('../../controllers/updateDatabase')

const refreshColaborador = async (res) => {

    const dataValues = await getValuesApi('colaborador')

    const colaboradorArray = new ColaboradorClasse().getFormattedData(dataValues.data.values)

    await updateDatabase(colaboradorArray, Colaborador, res)

}

module.exports = refreshColaborador

