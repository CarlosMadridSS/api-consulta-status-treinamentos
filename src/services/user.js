const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const sequelize = require('../database'); // Certifique-se de que o caminho está correto
const { QueryTypes } = require('sequelize');

dotenv.config();

const saltRounds = 10;

const registerUser = async (username, password, callback) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    await sequelize.query('INSERT INTO colaborador (username, password) VALUES (?, ?)', {
      replacements: [username, hash],
      type: QueryTypes.INSERT
    });
    callback(null, { message: 'User registered successfully' });
  } catch (err) {
    callback(err);
  }
};

const authenticateUser = async (username, password, callback) => {
  try {
    const users = await sequelize.query('SELECT * FROM colaborador WHERE username = ?', {
      replacements: [username],
      type: QueryTypes.SELECT
    });

    if (users.length === 0) {
      return callback(null, false);
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      callback(null, token);
    } else {
      callback(null, false);
    }
  } catch (err) {
    callback(err);
  }
};

module.exports = {
  registerUser,
  authenticateUser
};