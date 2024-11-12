const getStatus = require('../controllers/get/getStatus')
const getColaborador = require('../controllers/get/getColaborador')
const getTreinamento = require('../controllers/get/getTreinamento')
const getTreinamentoColaborador = require('../controllers/get/getTreinamentoColaborador')


const dataConvertTreinamentoColaborador = async () => {
    try {


         const dadosFiltrados = await compareDataValues()

         return dadosFiltrados


        
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}




const compareDataValues = async () => {

    const dataColaborador = await getColaborador()
    const dataTreinamento = await getTreinamento()
    const dataTreinamentoColaborador = await getTreinamentoColaborador()
    const dataStatus = await getStatus()


    console.log(dataTreinamentoColaborador)


    let filteredDataArray = []


    dataTreinamentoColaborador.forEach(treinamentoColaborador => {
        
        let objeto = new Object()

        
            dataColaborador.forEach(colaborador => {
                if (colaborador.matricula === treinamentoColaborador.matricula){
                    objeto.matricula = colaborador.matricula
                    objeto.nome = colaborador.nome
                }
            })        


        dataTreinamento.forEach(treinamento => {
            if (treinamento.treinamento === treinamentoColaborador.treinamento){
                objeto.treinamento = treinamento.treinamento
            }
        })

        
            dataStatus.forEach(status => {
                if (status.status === treinamentoColaborador.status){
                    objeto.status = status.status
                }
            })        
    

        if (Object.keys(objeto).length > 0 && objeto.constructor === Object){
            filteredDataArray.push(objeto)
        }
    })

    return filteredDataArray


}



module.exports = dataConvertTreinamentoColaborador