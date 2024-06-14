class ColaboradorClasse {

    makeObj (nome, matricula) {
        return {
            nome: nome,
            matricula: matricula
        }
    }

    makeTransportObj (id, nome, matricula) {
        return {
            id: id,
            nome: nome,
            matricula: matricula
        }
    }


    getFormattedData (dataValues) {
        let colaboradorArray = []

        dataValues.forEach(item => {
            colaboradorArray.push(this.makeObj(item[0], item[1]))
        })
    
        colaboradorArray.shift()

        return colaboradorArray
    }

}

module.exports = ColaboradorClasse