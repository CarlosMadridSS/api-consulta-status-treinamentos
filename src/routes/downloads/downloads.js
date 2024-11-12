const authorize = require('../../middlewares/authenticateToken')
const downloadsRoute = require('express').Router()
const path = require('path')
const fs = require('fs')



//Download Model Tables
downloadsRoute.get('/admin/download-model-tables', authorize(['master', 'admin', 'gerente-treinamentos']), (req, res) => {
    res.render('layouts/download-spreadsheet-models', {title: 'Admin | Baixar modelos'})
})


//Download Model Tables
downloadsRoute.get('/admin/download-model-tables/:filename', authorize(['master', 'admin', 'gerente-treinamentos']), (req, res) => {

    const filename = req.params.filename;

    const file = path.join(__dirname, '../../../src', 'public', 'downloads', `${filename}.csv`);

    fs.access(file, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Arquivo não encontrado:', file);
            req.flash('error_msg', 'Arquivo não encontrado.')
            res.render('layouts/oops', {title: 'Oops', internalTemplate: '/admin/download-model-tables', msg: {error: req.flash('error_msg')}})
        }

        res.download(file, (err) => {
            if (err) {
                console.error('Erro ao enviar o arquivo:', err);
                req.flash('error_msg', 'Erro ao enviar o arquivo.')
                res.render('layouts/oops', {title: 'Oops', internalTemplate: '/admin/download-model-tables', msg: {error: req.flash('error_msg')}})
            }
        });
    });
    

})



module.exports = downloadsRoute