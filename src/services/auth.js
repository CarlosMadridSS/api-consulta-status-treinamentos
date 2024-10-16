const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const dotenv = require('dotenv');
const sequelize = require('../database'); // Certifique-se de que o caminho está correto
const { QueryTypes } = require('sequelize');

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await sequelize.query('SELECT * FROM colaborador WHERE id = ?', {
      replacements: [jwt_payload.id],
      type: QueryTypes.SELECT
    });

    if (user.length > 0) {
      return done(null, user[0]);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
}));

module.exports = passport;