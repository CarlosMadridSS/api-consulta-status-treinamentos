class TreinamentoColaboradorClasse {
    makeObj (matricula, treinamento, status) {
        return {
            matricula,
            treinamento,
            status,
        }
    }

    makeTransportObj (id, matricula, status, treinamento, inicio, termino) {
        return {
            id: id,
            matricula,
            status,
            treinamento,
            inicio,
            termino
        }
    }

    getFormattedData (dataValues) {
        const treinamentoColaborador = []

        dataValues.forEach((index) => {
            treinamentoColaborador.push(this.makeObj(index.Matricula, index.Treinamento, index.Status))
        })
    
        return treinamentoColaborador
    }


}


module.exports = TreinamentoColaboradorClasse