const AdminColaborador = require('../../models/database/admin_colaborador')
const SenhasGeradas = require('../../models/database/senhas_geradas')

async function createTemporaryPass (registration, pass, req){

    try {
        
        const user = await AdminColaborador.findOne({
            where: { matricula: registration }
        });

        if (user) {

            const senhasGeradas = await SenhasGeradas.create({
                senhaTemp: pass,
                admin_colaborador: user.dataValues.id
            });

            await AdminColaborador.update({senha_temp: true},{where: {matricula: registration}})
            

            if(!senhasGeradas){
                throw new Error('Problemas ao gravar senha temporária no banco de dados')
            }

            return false

        }else{
            throw new Error('Problemas no processo de gravação de senha temporária no banco de dados')
        }

        
    } catch (error) {
        console.error(error.message)
        req.flash('error_msg', error.message)
        return true;
    }

}

module.exports = createTemporaryPass


