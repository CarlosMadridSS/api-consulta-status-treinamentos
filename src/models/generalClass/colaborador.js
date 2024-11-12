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
            colaboradorArray.push(this.makeObj(item.colaborador, item.matricula))
        })
    
        colaboradorArray.shift()

        return colaboradorArray
    }

}

module.exports = ColaboradorClasse