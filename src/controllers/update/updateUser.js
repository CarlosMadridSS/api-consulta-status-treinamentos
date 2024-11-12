
async function updateUser(updateUserId, newData, model, req) {
    try {
      const [updatedRows] = await model.update(newData, {
        where: { id: updateUserId },
      });
  
      if (updatedRows > 0) {
        console.log('Usuário atualizado com sucesso!');
        await req.flash('success_msg', 'Usuário atualizado com sucesso!')
      } else {
        throw new Error('Usuário não encontrado')
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message);
      req.flash('error_msg',error.message)
    }
  }
  
  module.exports = updateUser
  
  
  