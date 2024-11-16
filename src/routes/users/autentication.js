const autenticationRoute = require('express').Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
require('dotenv').config()
const AdminColaborador = require('../../models/database/admin_colaborador');

autenticationRoute.post('/admin/login', async (req, res) => {
    // Rota de login

    const { matricula, senha } = req.body;

    const user = await AdminColaborador.findOne({ where: { matricula } });
    if (!user) {
        req.flash('error_msg', 'Acesso restrito: Usuário não encontrado.')
        return res.redirect('/admin/login')
    }

    const privilegios = user.dataValues.privilegios

    // Comparar a senha
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
        req.flash('error_msg', 'Acesso restrito: senha incorreta.')
        return res.redirect('/admin/login')
    }

    // Gerar token JWT sem expiração
    const token = String(jwt.sign({ matricula, privilegios }, process.env.JWT_SECRET));

    res.cookie('tokenST', token, { 
        httpOnly: true,
        secure: true 
    });

    res.redirect('/admin/menu')
});



autenticationRoute.get('/admin/logout', (req, res) => {
    res.clearCookie('tokenST', { path: '/' });
    req.flash('success_msg', 'Logout realizado com sucesso!')
    res.redirect('/admin/login')
})


module.exports = autenticationRoute