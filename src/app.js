//Bibliotecas
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('./services/auth');
const { registerUser, authenticateUser } = require('./services/user');
const Colaborador = require('./models/database/colaborador'); // Corrigir o caminho de importação


const db = require('./database');

//Modulos extrenos
const routes = require('./routes/routes');
const erro404 = require('./middlewares/404');
const refreshDatas = require('./controllers/refresh');

//Configuração do Dotenv
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Utilizando bodyParser
app.use(bodyParser.json());

//Definir public
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// Middleware para proteger a rota
app.get('./public/views/index.html', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
});

// Rotas de autenticação
app.post('/register', async (req, res) => {
  const { nome, username, password } = req.body;
  registerUser(nome, username, password)
    .then(newColaborador => {
      res.status(201).json({ message: 'User registered successfully', newColaborador });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  authenticateUser(username, password, (err, token) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!token) return res.status(401).json({ message: 'Invalid credentials' });
    res.status(200).json({ token });
  });
});

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ message: 'You have accessed a protected route' });
});

// Middleware 404
app.use(erro404);

refreshDatas.refreshDatas();

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});