const Treinamento = require('../../models/database/treinamento')
const TreinamentoClasse = require('../../models/generalClass/treinamento')
const updateDatabase = require('../updateDatabase')
const preSaveCheck = require('../../controllers/preSaveCheck')

const insertTreinamento = async (data, req, res) => {
    const dataValues = await data.treinamentoFile

    const treinamentoArray = new TreinamentoClasse().getFormattedData(dataValues)

    if (!preSaveCheck(treinamentoArray)){
      await saveTreinamento(treinamentoArray, req, res);
      return true
    }else{
        return false
    }
}


const saveTreinamento = async (treinamentoArray) => {
  await updateDatabase(treinamentoArray, Treinamento)
}

module.exports = insertTreinamento
