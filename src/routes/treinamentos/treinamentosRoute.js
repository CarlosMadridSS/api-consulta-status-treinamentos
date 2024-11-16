const routerTreinamento = require('express').Router()

const createItem = require('../../controllers/create/createItem')
const deleteItem = require('../../controllers/exclude/deleteItem')
const listInformationsSpreadsheets = require('../../controllers/listInformationsSpreadSheets')
const resTreinamento = require('../../controllers/res/resTreinamento')
const updateItem = require('../../controllers/update/updateItem')
const verifyTreinamento = require('../../controllers/verifyTreinamento')
const Treinamento = require('../../models/database/treinamento')
const WhatMyAttributesTable = require('../../controllers/WhatMyAttributesTable')
const dropTable = require('../../controllers/drop/dropTable')
const authorize = require('../../middlewares/authenticateToken')



// Treinamento

    //get
    routerTreinamento.get('/treinamentos/get', async (req, res) => await resTreinamento(res))

    

    //Manage Spreadsheet
    routerTreinamento.get('/admin/manage-spreadsheet/treinamento/edit', async (req, res) => {

        const myAttributes  = await WhatMyAttributesTable(Treinamento)

        const params = {
            layout:'layouts/spreadsheet-edit',
            title: 'Admin | Edição - Planilha',
            table: Treinamento,
            myAttributes,
            getData: '/treinamentos/get',
            removeItemRoute: '/admin/manage-spreadsheet/treinamento/edit/remove',
            updateItemRoute: '/admin/manage-spreadsheet/treinamento/edit/save',
            addItemRoute: '/admin/manage-spreadsheet/treinamento/edit/add',
            req,
            res,
            successMessage: [],
            errorMessage: []
        }
    
        await listInformationsSpreadsheets(params);
    })



    // Remove treinamento
    routerTreinamento.post('/admin/manage-spreadsheet/treinamento/edit/remove',authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
        const { id } = req.body;

        await deleteItem(id, Treinamento, req);

        res.redirect('/admin/manage-spreadsheet/treinamento/edit')

    })



// Edita Treinamento
routerTreinamento.post('/admin/manage-spreadsheet/treinamento/edit/save', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
    
    const {id} = req.body
    let item = req.body
    delete item.id

    
    const resVerifyTreinamento = await verifyTreinamento(id, item,Treinamento, req)

    if(resVerifyTreinamento){
        await updateItem(id,item, Treinamento, req)
    }else{
        req.flash('error_msg', 'O staus indicado já existe no banco de dados.')
    }

    res.redirect('/admin/manage-spreadsheet/treinamento/edit')
})


//Cria treinamento
routerTreinamento.post('/admin/manage-spreadsheet/treinamento/edit/add', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
    
    const item = req.body

    const resVerifyTreinamento = await verifyTreinamento('', item,Treinamento, req)

    if(resVerifyTreinamento){
        await createItem(item, Treinamento, req)
    }else{
        req.flash('error_msg', 'O treinamento indicado já existe no banco de dados.')
    }


    res.redirect('/admin/manage-spreadsheet/treinamento/edit')
})


//Deleta todos os dados da Tabela

routerTreinamento.get('/admin/manage-spreadsheet/drop/treinamentos', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
    try {
        
        const stateTreinamento = await dropTable(Treinamento)
    
        if (stateTreinamento) {
            req.flash('success_msg', 'Tabela "treinamento" excluída com sucesso!')
        }else{
            throw new Error('Parece que a tabela não pôde ser excluída. Tente novamente.')
        }
        
    } catch (error) {
        console.error(error.message)
        req.flash('error_msg', error.message)
    }
    
        res.redirect('/admin/manage-spreadsheet')
})


module.exports = routerTreinamento

