const updateDatabase = require('../updateDatabase');
const preSaveCheck = require('../../controllers/preSaveCheck');
const commomDateToGMT = require('../../controllers/commonDateToGMT')

const getColaborador = require('../../controllers/get/getColaborador');
const getTreinamento = require('../../controllers/get/getTreinamento');
const getStatus = require('../../controllers/get/getStatus');
const TreinamentosColaborador = require('../../models/database/treinamentoColaborador');


const insertTreinamentoColaborador = async (data, req, res) => {

    const dataValues = await data.treinamentoColaboradorFile

    const [dataGetColaborador, dataGetTreinamento, dataGetStatus] = await Promise.all([
        getColaborador(),
        getTreinamento(),
        getStatus()
    ]);
    
    const resultArray = await Promise.all(dataValues.map(async (item) => {
        // Encontrar o colaborador correspondente
        const colaborador = await dataGetColaborador.find(col => col.matricula == item.Matricula);
        
        // Encontrar o treinamento correspondente
        const treinamento = await dataGetTreinamento.find(tr => tr.treinamento == item.Treinamento);
        
        // Encontrar o status correspondente
        const status = await dataGetStatus.find(st => st.status == item.Status);
    
        if (colaborador && treinamento && status) {
            return {
                
                colaborador: colaborador.id,
                status: status.id,
                treinamento: treinamento.id,
                inicio: commomDateToGMT(item['Início']),
                termino: commomDateToGMT(item['Término'])
            };
        }

        

    }));
    
    const filteredResultArray = resultArray.filter(item => item);

    if (!preSaveCheck(filteredResultArray)){
        await saveTreinamentoColaborador(filteredResultArray, req, res);
        return true
    }else{
        return false
    }  

    
}


const saveTreinamentoColaborador = async (treinamentoColaboradorArray) => {
    await updateDatabase(treinamentoColaboradorArray, TreinamentosColaborador);
}


module.exports = insertTreinamentoColaborador
