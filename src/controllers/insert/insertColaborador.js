const Colaborador = require('../../models/database/colaborador')
const ColaboradorClasse = require('../../models/generalClass/colaborador')
const updateDatabase = require('../updateDatabase')
const preSaveCheck = require('../../controllers/preSaveCheck')


const insertColaborador = async (data, req, res) => {
    const dataValues = await data.colaboradorFile

    const colaboradorArray = new ColaboradorClasse().getFormattedData(dataValues)

    if (!preSaveCheck(colaboradorArray)){
      await saveColaborador(colaboradorArray, req, res);
      return true
  }else{
      return false
  }
}


const saveColaborador = async (colaboradorArray) => {
  await updateDatabase(colaboradorArray, Colaborador)
}

module.exports = insertColaborador
