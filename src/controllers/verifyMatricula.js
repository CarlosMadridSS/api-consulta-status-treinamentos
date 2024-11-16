
async function verifyMatricula(id, data, model, req) {
  try {
    const item = await model.findOne({
      where: {
        matricula: data.matricula
      }
    });


    if (item && (item.dataValues.id == id)) {
        return true
    }else if (!item) {
        return true
    }

  } catch (error) {
    console.error('Erro ao buscar item:', error);
    req.flash('error_msg', 'Erro ao buscar matricula')
  }
  return false
}

module.exports = verifyMatricula