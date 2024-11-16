
async function verifyMatriculaUser(matricula, model, req) {
    try {
        const count = await model.count({
            where: {
                matricula: matricula
            }
        });

        if (count > 0) {
            throw new Error('A matricula já existe no banco de dados.')
        }

        //Não Existe
        return false;

    } catch (error) {
        console.error(error.message);
        req.flash('error_msg', error.message)
        return true
    }
}


module.exports =  verifyMatriculaUser
