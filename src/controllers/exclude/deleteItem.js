async function deleteItem(id, ModelName, req) {
  try {
    const result = await ModelName.destroy({
      where: {
        id: id 
      }
    });

    if (result === 0) {
      console.log('Nenhum item encontrado para excluir.');
      req.flash('error_msg','Nenhum item encontrado para excluir.')
    } else {
      console.log('Item excluído com sucesso.');
      req.flash('success_msg', 'Item excluído com sucesso.')
    }
  } catch (error) {
    console.error('Erro ao excluir o item:', error);
    req.flash('error_msg', 'Erro ao excluir o item.')
  }
}


module.exports = deleteItem


