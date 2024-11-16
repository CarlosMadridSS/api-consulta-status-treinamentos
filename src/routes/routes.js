const routes = require('express').Router()
const refresh = require('../controllers/refresh')
const configMulter = require('../../config/multer')
const csvUploadAndConvert = require('./uploadSpreadSheetCSV')
const manageSpreadsheets = require('../controllers/manageSpreadsheets')
const Treinamento = require('../models/database/treinamento')
const Status = require('../models/database/status')
const Colaborador = require('../models/database/colaborador')
const TreinamentosColaborador = require('../models/database/treinamentoColaborador')
const dropTable = require('../controllers/drop/dropTable')
const authorize = require('../middlewares/authenticateToken')


//Layouts

    //Index
    routes.get('/', authorize(['master']), (req, res) => {
        res.render('layouts',{ title: 'Página Inicial', passAPI: process.env.PASS_API});
    })

    //Insert Spreadsheet
    routes.get('/admin/insert-spreadsheet', authorize(['master', 'admin', 'gerente-treinamentos']),(req, res) => {

        res.render('layouts/insert-spreadsheet', 
        { 
            title: 'Start Inicial | Inserção de Planilha',
            action: '/admin/process-spreadsheet',
            method: 'POST'
        });
        
    })

    //Manage Spreadsheet
    routes.get('/admin/manage-spreadsheet', authorize(['master', 'admin', 'gerente-treinamentos']),async (req, res) => await manageSpreadsheets(req, res))


//Capturavel

    //get
    routes.get('/admin/disponibilidade', async (req, res) => {
        let availability = refresh.getAvailability()

        res.json({disponibilidade: availability})
    })



//Process Spreadsheet
    routes.post('/admin/process-spreadsheet', authorize(['master', 'admin', 'gerente-treinamentos']), configMulter().fields([
        { name: 'treinamentoColaboradorFile' },
        { name: 'colaboradorFile' },
        { name: 'statusFile' },
        { name: 'treinamentoFile' }
    ]), async (req, res) => {

        await csvUploadAndConvert(req, res)
    });



//admin/menu
routes.get('/admin/menu',authorize(['master', 'admin', 'gerente-treinamentos', 'tecnico-campo']), (req, res) => {
    res.render('layouts/admin-menu', { title: 'Menu Administrativo'});
})

routes.get('/admin', (req, res) => {
    res.redirect('/admin/menu')
})



//Manage Spreadsheet - Drop
routes.get('/admin/manage-spreadsheet/drop', authorize(['master', 'admin', 'gerente-treinamentos', 'tecnico-campo']), async (req, res) => {

try {
    
    const stateTreinamento = await dropTable(Treinamento)
    const stateColaborador = await dropTable(Colaborador)
    const stateStatus = await dropTable(Status)

    if (stateTreinamento && stateColaborador && stateStatus) {
        req.flash('success_msg', 'Tabelas excluídas com sucesso!')
    }else{
        throw new Error('Parece que nem todas as tabelas foram excluídas. Tente novamente.')
    }

    
} catch (error) {
    console.error(error.message)
    req.flash('error_msg', error.message)
}

    res.redirect('/admin/manage-spreadsheet')

})

module.exports = routes;