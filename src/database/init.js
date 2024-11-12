const { Sequelize } = require('sequelize');

const dotenv = require('dotenv')
dotenv.config()


const connectionCred = {
    nameDB: process.env.DB_NAME,
    userDB: process.env.DB_USER,
    passDB: process.env.DB_PASSWORD
}

const options = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    timezone: process.env.DB_timezone
}



const sequelize = new Sequelize(connectionCred.nameDB, connectionCred.userDB, connectionCred.passDB, options)

module.exports = sequelize