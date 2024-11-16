async function verifyStatus(id, data, model, req) {
    try {
      const item = await model.findOne({
        where: {
          status: data.status
        }
      });
  
  
      if (item && (item.dataValues.id == id)) {
          return true
      }else if (!item) {
          return true
      }
  
    } catch (error) {
      console.error('Erro ao buscar item:', error);
      req.flash('error_msg', 'Erro ao buscar status')
    }
    return false
  }
  
  module.exports = verifyStatus