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

        dataValues.forEach((item) => {
            treinamentoArray.push(this.makeObj(item['treinamentos obrigatórios']))

            return treinamentoArray;
        })

        return treinamentoArray
    }


}


module.exports = TreinamentoClasse