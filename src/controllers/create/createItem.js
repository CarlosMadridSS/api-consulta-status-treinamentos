async function createItem(data, table, req) {
    try {
      console.log(data)
      const item = await table.create(data);
      console.log('Item criado:', item.toJSON());
      req.flash('success_msg', 'Item criado com sucesso!')
    } catch (error) {
      console.error('Erro ao criar item:', error);
      req.flash('error_msg', 'Erro ao criar item.')
    }
  }


module.exports = createItem