const routerStatus = require('express').Router()

const createItem = require('../../controllers/create/createItem')
const deleteItem = require('../../controllers/exclude/deleteItem')
const listInformationsSpreadsheets = require('../../controllers/listInformationsSpreadSheets')
const resStatus = require('../../controllers/res/resStatus')
const updateItem = require('../../controllers/update/updateItem')
const verifyStatus = require('../../controllers/verifyStatus')
const Status = require('../../models/database/status')
const WhatMyAttributesTable = require('../../controllers/WhatMyAttributesTable')
const dropTable = require('../../controllers/drop/dropTable')
const authorize = require('../../middlewares/authenticateToken')





// Status

    //get
    routerStatus.get('/status/get', async (req, res) => await resStatus(res))


    //Manage Spreadsheet
    routerStatus.get('/admin/manage-spreadsheet/status/edit', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {

        const myAttributes  = await WhatMyAttributesTable(Status)

        const params = {
            layout:'layouts/spreadsheet-edit',
            title: 'Admin | Edição - Planilha',
            table: Status,
            myAttributes,
            getData: '/status/get',
            removeItemRoute: '/admin/manage-spreadsheet/status/edit/remove',
            updateItemRoute: '/admin/manage-spreadsheet/status/edit/save',
            addItemRoute: '/admin/manage-spreadsheet/status/edit/add',
            req,
            res,
            successMessage: [],
            errorMessage: []
        }
    
        await listInformationsSpreadsheets(params);
    })



    // Remove status
    routerStatus.post('/admin/manage-spreadsheet/status/edit/remove', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
        const { id } = req.body;

        await deleteItem(id, Status, req);

        res.redirect('/admin/manage-spreadsheet/status/edit')

    })



// Edita Status
routerStatus.post('/admin/manage-spreadsheet/status/edit/save', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
    
    const {id} = req.body
    let item = req.body
    delete item.id

    
    const resVerifyStatus = await verifyStatus(id, item,Status, req)

    if(resVerifyStatus){
        await updateItem(id,item, Status, req)
    }else{
        req.flash('error_msg', 'O status indicado já existe no banco de dados.')
    }

    res.redirect('/admin/manage-spreadsheet/status/edit')
})


//Cria status
routerStatus.post('/admin/manage-spreadsheet/status/edit/add', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
    
    const item = req.body

    const resVerifyStatus = await verifyStatus('', item,Status, req)

    if(resVerifyStatus){
        await createItem(item, Status, req)
    }else{
        req.flash('error_msg', 'O status indicado já existe no banco de dados.')
    }


    res.redirect('/admin/manage-spreadsheet/status/edit')
})


//Deleta todos os dados da Tabela
routerStatus.get('/admin/manage-spreadsheet/drop/status', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
    try {
        
        const stateStatus = await dropTable(Status)
    
        if (stateStatus) {
            req.flash('success_msg', 'Tabela "status" excluída com sucesso!')
        }else{
            throw new Error('Parece que a tabela não pôde ser excluída. Tente novamente.')
        }
        
    } catch (error) {
        console.error(error.message)
        req.flash('error_msg', error.message)
    }
    
        res.redirect('/admin/manage-spreadsheet')
})

module.exports = routerStatus


