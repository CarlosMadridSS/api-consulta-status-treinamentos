async function createUser(data, table, req) {
    try {
      console.log(data)
      await table.create(data);
      return req.flash('success_msg', 'Usuário criado com sucesso!')
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return req.flash('error_msg', 'Erro ao criar usuário.')
    }
  }

module.exports = createUser