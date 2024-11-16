const SenhasGeradas = require("../../models/database/senhas_geradas");

async function removeTemporaryPass(idColaborator, req) {
  try {

    if (idColaborator){
        await SenhasGeradas.destroy({
            where: {
              admin_colaborador: idColaborator
            }
          });
    }

  } catch (error) {
    console.error('Erro ao apagar registros:', error);
    req.flash('error_msg', 'Erro ao desvincular senha temporária do seu usuário.')
  }
}

module.exports = removeTemporaryPass
