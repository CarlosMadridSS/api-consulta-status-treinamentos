async function verifyTreinamento(id, data, model, req) {
    try {
      const item = await model.findOne({
        where: {
          treinamento: data.treinamento
        }
      });
  
  
      if (item && (item.dataValues.id == id)) {
          return true
      }else if (!item) {
          return true
      }
  
    } catch (error) {
      console.error('Erro ao buscar item:', error);
      req.flash('error_msg', 'Erro ao buscar treinamento')
    }
    return false
  }
  
  module.exports = verifyTreinamento