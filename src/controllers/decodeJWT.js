const jwt = require('jsonwebtoken'); // Se você precisar decodificar o JWT


function decodeJWT (tokenReq, secretJWT) {
    
    const token = tokenReq;

    if (token) {
        try {
            const decoded = jwt.verify(token, secretJWT); // Use sua chave secreta
            return decoded
        } catch (err) {
            req.flash('error_msg', 'Token inválido.')
            res.redirect('/admin/menu')
        }
    } else {
        req.flash('error_msg', 'Nenhum token encontrado.')
        res.redirect('/admin/menu')
    }

}


module.exports = decodeJWT

