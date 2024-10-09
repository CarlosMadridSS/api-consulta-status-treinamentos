class StatusClasse {

    makeObj (status) {

        return {
            status: status
        }
    }

    makeTransportObj (id, status){
        return {
            id: id,
            status: status
        }
    }

    getFormattedData (dataValues) {

        const statusArray = []

        dataValues.forEach((index) => {
            statusArray.push(this.makeObj(index[0]))
        })
    
        statusArray.shift()

        return statusArray
    }
}


module.exports = StatusClasse
