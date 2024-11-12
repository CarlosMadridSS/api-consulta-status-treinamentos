
async function updateItem(itemId, newData, model, req) {
  try {
    const [updatedRows] = await model.update(newData, {
      where: { id: itemId },
    });

    if (updatedRows > 0) {
      console.log('Item atualizado com sucesso!');
      await req.flash('success_msg', 'Item atualizado com sucesso!')
    } else {
      throw new Error('Item não encontrado')
    }
  } catch (error) {
    console.error('Erro ao atualizar Item:', error.message);
    req.flash('error_msg',error.message)
  }
}

module.exports = updateItem


