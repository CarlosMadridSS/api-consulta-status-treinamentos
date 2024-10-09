//Bibliotecas
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const bodyParser = require('body-parser')

const db = require('./database')

//Modulos extrenos
const routes = require('./routes/routes')
const erro404 = require('./middlewares/404')
const refreshDatas = require('./controllers/refresh')


//Configuração do Dotenv
dotenv.config()

const app = express()

//Utilizando bodyParser
//app.use(bodyParser)

//Definir public
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)

//Midleware 404
app.use(erro404);

refreshDatas.refreshDatas()


const PORT = process.env.PORT

app.listen(PORT, console.log('Servidor rondando!'))
