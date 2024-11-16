const TreinamentoColaborador = require('../models/database/treinamentoColaborador')
const Treinamento = require('../models/database/treinamento')
const Status = require('../models/database/status')
const Colaborador = require('../models/database/colaborador')

const doHaveItemsInTables = async () => {
    const haveTreinamentoColaborador = await checkIfExists(TreinamentoColaborador);
    const haveTreinamento = await checkIfExists(Treinamento);
    const haveStatus = await checkIfExists(Status);
    const haveColaborador = await checkIfExists(Colaborador);
    
    if (
        haveTreinamentoColaborador &&
        haveTreinamento &&
        haveStatus &&
        haveColaborador
    ) {
        return true;
    }else{
        return false;
    }    

}

const checkIfExists = async (Model) => {
    const nameTable = await Model.getTableName();

    try {

        const item = await Model.count();

        if (item > 0) {
            return true;
        }else{
            return false;
        }

        
    } catch (error) {
        console.error(`Erro ao verificar itens na tabela: ${nameTable}`, error);
        return false;
    }
}


module.exports = doHaveItemsInTables;

