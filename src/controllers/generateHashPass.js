const bcrypt = require('bcrypt');

const saltRounds = 12;

const generateHashPass = async (senha) => {
  try {
    const hash = await bcrypt.hash(senha, saltRounds);
    console.log('Senha hash gerada:', hash);
    return hash;
  } catch (error) {
    console.error('Erro ao gerar hash:', error);
  }
};

module.exports = generateHashPass