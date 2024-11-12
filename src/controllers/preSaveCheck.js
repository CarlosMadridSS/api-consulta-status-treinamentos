const preSaveCheck = (data) => {

    let errBool = false

    data.forEach(element => {
        for(key in element){
            if(element[key] === undefined){
                errBool = true
            }
        }
    });

    return errBool;
}


module.exports = preSaveCheck