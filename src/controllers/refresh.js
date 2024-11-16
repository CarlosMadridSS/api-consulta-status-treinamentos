
const getStatus = require('../controllers/get/getStatus')
const getColaborador = require('../controllers/get/getColaborador')
const getTreinamento = require('../controllers/get/getTreinamento')
const getTreinamentoColaborador = require('../controllers/get/getTreinamentoColaborador')

const axios = require('axios')


const url = {
    protocol: process.env.API_PROTOCOL,
    hostname: process.env.API_HOSTNAME,
    port: process.env.API_PORT
}

const makeUrl = (route) => {
    return `${url.protocol}://${url.hostname}:${url.port}/${route}/put`
}

let availability = false

const getAvailability =  () => {
    return availability
}




const refreshDatas = async () => {

        availability = false

        const checkedData = await checkDatas()

        availability = true

        while (checkedData) {
            await new Promise(resolve => setTimeout(resolve, 300000)); // Espera 5 minutos
            availability = false
            await requests().then(() => {availability = true});
    }

}



const checkDatas = async () => {
    const dataColaborador = await getColaborador()
    const dataTreinamento = await getTreinamento()
    const dataTreinamentoColaborador = await getTreinamentoColaborador()
    const dataStatus = await getStatus()



    if (dataColaborador.length > 0 &&
        dataTreinamento.length > 0 &&
        dataTreinamentoColaborador.length > 0 &&
        dataStatus.length > 0
    ){
        return true
    }else{
        await requests()
        return false
    }
}


const requests = async () => {
    try {

        await axios.put(makeUrl('colaborador'))
        await axios.put(makeUrl('status'))
        await axios.put(makeUrl('treinamentos'))
        await axios.put(makeUrl('treinamentos-colaborador'))

        console.log('Tabelas atualizadas')
        
    } catch (error) {
        console.log('Erro ao atualizar tabelas em banco de dados', error)
    }
}

module.exports = {
    getAvailability,
    refreshDatas
}
