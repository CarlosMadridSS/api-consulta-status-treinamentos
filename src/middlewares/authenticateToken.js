const jwt = require('jsonwebtoken')
require('dotenv').config()

const authorize = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        const token = req.cookies.tokenST;
        if (!token) {
            req.flash('error_msg', 'Acesso restrito: autentique-se para acessar.')
            return res.redirect('/admin/login')
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;

            // Verifique se o usuário tem a permissão necessária
            if (roles.length && !roles.includes(user.privilegios)) {
                req.flash('error_msg', 'Acesso restrito: você não tem as permissões necesárias para acessar esta página.')
                return res.redirect('/admin/login')
            }
            next();
        });
    };
};


module.exports = authorize
