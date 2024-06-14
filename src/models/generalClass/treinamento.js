class TreinamentoClasse {
    makeObj (treinamento) {
        return {
            treinamento: treinamento
        }
    }

    makeTransportObj (id, treinamento) {
        return {
            id: id,
            treinamento: treinamento
        }
    }

    getFormattedData (dataValues) {
        const treinamentoArray = []

        dataValues.forEach((index) => {
            treinamentoArray.push(this.makeObj(index[0]))
        })
    
        treinamentoArray.shift()

        return treinamentoArray
    }


}


module.exports = TreinamentoClasse