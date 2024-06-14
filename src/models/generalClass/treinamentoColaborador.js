class TreinamentoColaboradorClasse {
    makeObj (matricula, treinamento, status) {
        return {
            matricula: matricula,
            treinamento: treinamento,
            status: status
        }
    }

    makeTransportObj (id, matricula, status, treinamento) {
        return {
            id: id,
            matricula: matricula,
            status: status,
            treinamento: treinamento
        }
    }

    getFormattedData (dataValues) {
        const treinamentoColaborador = []

        dataValues.forEach((index) => {
            treinamentoColaborador.push(this.makeObj(index[0], index[1], index[2], index[3]))
        })
    
        treinamentoColaborador.shift()

        return treinamentoColaborador
    }


}


module.exports = TreinamentoColaboradorClasse