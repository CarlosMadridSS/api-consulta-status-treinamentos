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

        dataValues.forEach((item) => {
            statusArray.push(this.makeObj(item.status))
        })
    

        return statusArray
    }
}


module.exports = StatusClasse
