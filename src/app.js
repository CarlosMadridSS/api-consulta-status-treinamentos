//Bibliotecas
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const session = require('express-session')
const flash = require('connect-flash')

const db = require('./database')

//Modulos extrenos
const routes = require('./routes/routes')
const erro404 = require('./middlewares/404')
//const refreshDatas = require('./controllers/refresh')
const routerColaborador = require('./routes/colaborador/colaboradorRoute')
const routerStatus = require('./routes/status/statusRoute')
const routerTreinamento = require('./routes/treinamentos/treinamentosRoute')
const routerTreinamentoColaborador = require('./routes/treinamento-colaborador/treinamentoColaboradorRoute')
const routerUsers = require('./routes/users/users')
const autenticationRoute = require('./routes/users/autentication')
const cookieParser = require('cookie-parser')
const downloadsRoute = require('./routes/downloads/downloads')
const exportRoute = require('./routes/export/exportRoute')

const app = express()

//Configuração do Dotenv
dotenv.config()

//Configurando express-session
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}));


// Usar connect-flash
app.use(flash());
app.use(cookieParser())


// Middleware para passar mensagens para a view
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});


//Utilizando bodyParser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



// Configurando o EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Definir public
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/', routerColaborador)
app.use('/', routerStatus)
app.use('/', routerTreinamento)
app.use('/', routerTreinamentoColaborador)
app.use('/', routerUsers)
app.use('/', autenticationRoute)
app.use('/', downloadsRoute)
app.use('/', exportRoute)




//Middleware 404
app.use(erro404);

const PORT = Number(process.env.API_PORT)

app.listen(PORT, console.log('Servidor rondando!'))
