const routerColaborador = require('express').Router()
const resColaborador = require('../../controllers/res/resColaborador')
const Colaborador = require('../../models/database/colaborador')
const deleteItem = require('../../controllers/exclude/deleteItem')
const listInformationsSpreadsheets = require('../../controllers/listInformationsSpreadSheets')
const updateItem = require('../../controllers/update/updateItem')
const verifyMatricula = require('../../controllers/verifyMatricula')
const createItem = require('../../controllers/create/createItem')
const WhatMyAttributesTable = require('../../controllers/WhatMyAttributesTable')
const dropTable = require('../../controllers/drop/dropTable')
const authorize = require('../../middlewares/authenticateToken')


// Colaborador

//get
routerColaborador.get('/colaborador/get', async (req, res) => await resColaborador(res))

//Edit SpreadSheets

routerColaborador.get('/admin/manage-spreadsheet/colaborador/edit',async (req, res) => {

    const myAttributes  = await WhatMyAttributesTable(Colaborador)

    const params = {
        layout:'layouts/spreadsheet-edit',
        title: 'Admin | Edição - Planilha',
        table: Colaborador,
        myAttributes,
        getData: '/colaborador/get',
        removeItemRoute: '/admin/manage-spreadsheet/colaborador/edit/remove',
        updateItemRoute: '/admin/manage-spreadsheet/colaborador/edit/save',
        addItemRoute: '/admin/manage-spreadsheet/colaborador/edit/add',
        req,
        res,
        successMessage: [],
        errorMessage: []
    }

    await listInformationsSpreadsheets(params);
})


// Remove Colaborador
routerColaborador.post('/admin/manage-spreadsheet/colaborador/edit/remove', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
    const { id } = req.body;

    await deleteItem(id, Colaborador, req);

    res.redirect('/admin/manage-spreadsheet/colaborador/edit')

})



// Edita Colaborador
routerColaborador.post('/admin/manage-spreadsheet/colaborador/edit/save', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
    
    const {id} = req.body
    let item = req.body
    delete item.id

    const resVerifyMatricula = await verifyMatricula(id, item,Colaborador, req)

    if(resVerifyMatricula){
        await updateItem(id,item, Colaborador, req)
    }else{
        req.flash('error_msg', 'A matricula indicada já existe no banco de dados.')
    }

    res.redirect('/admin/manage-spreadsheet/colaborador/edit')
})


// Cria Colaborador
routerColaborador.post('/admin/manage-spreadsheet/colaborador/edit/add', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
    
    const item = req.body

    const resVerifyMatricula = await verifyMatricula('', item,Colaborador, req)

    if(resVerifyMatricula){
        await createItem(item, Colaborador, req)
    }else{
        req.flash('error_msg', 'A matricula indicada já existe no banco de dados.')
    }


    res.redirect('/admin/manage-spreadsheet/colaborador/edit')
})


//Deleta todos os dados da Tabela
routerColaborador.get('/admin/manage-spreadsheet/drop/colaborador', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
    try {
        
        const stateColaborador = await dropTable(Colaborador)
    
        if (stateColaborador) {
            req.flash('success_msg', 'Tabela "colaborador" excluída com sucesso!')
        }else{
            throw new Error('Parece que a tabela não pôde ser excluída. Tente novamente.')
        }
        
    } catch (error) {
        console.error(error.message)
        req.flash('error_msg', error.message)
    }
    
        res.redirect('/admin/manage-spreadsheet')
})


module.exports = routerColaborador

