const Status = require('../../models/database/status')
const StatusClasse = require('../../models/generalClass/status')
const updateDatabase = require('../updateDatabase')
const preSaveCheck = require('../../controllers/preSaveCheck')


const insertStatus = async (data, req, res) => {
    const dataValues = await data.statusFile

    const statusArray = new StatusClasse().getFormattedData(dataValues)

    if (!preSaveCheck(statusArray)){
      await saveStatus(statusArray, req, res);
      return true
  }else{
      return false
  }
}


const saveStatus = async (statusArray) => {
  await updateDatabase(statusArray, Status)
}

module.exports = insertStatus
