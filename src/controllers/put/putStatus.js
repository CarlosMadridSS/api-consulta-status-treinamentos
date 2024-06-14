const StatusClasse =  require('../../models/generalClass/status')
const Status = require('../../models/database/status')
const getValuesApi = require('../../services/getValuesApi')
const updateDatabase = require('../../controllers/updateDatabase')

const refreshStatus = async (res) => {
    const dataValues = await getValuesApi('status')
        
    const statusArray = new StatusClasse().getFormattedData(dataValues.data.values)

    await updateDatabase(statusArray, Status, res)
}

module.exports = refreshStatus
