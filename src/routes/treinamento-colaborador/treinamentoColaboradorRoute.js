const routerTreinamentoColaborador = require('express').Router()


const treinamento = require('../../../models/define/treinamento')
const createItem = require('../../controllers/create/createItem')
const dropTable = require('../../controllers/drop/dropTable')
const deleteItem = require('../../controllers/exclude/deleteItem')
const listInformationsSpreadsheets = require('../../controllers/listInformationsSpreadSheets')
const resTreinamentoColaborador = require('../../controllers/res/resTreinamentoColaborador')
const updateItem = require('../../controllers/update/updateItem')
const WhatMyAttributesTable = require('../../controllers/WhatMyAttributesTable')
const authorize = require('../../middlewares/authenticateToken')
const TreinamentosColaborador = require('../../models/database/treinamentoColaborador')
const inputDateToGMT = require('../../controllers/inputDateToGMT')

// Treinamento Colaborador

    //get
    routerTreinamentoColaborador.get('/treinamentos-colaborador/get', async (req, res) => await resTreinamentoColaborador(res))

    //Manage Spreadsheet
    routerTreinamentoColaborador.get('/admin/manage-spreadsheet/treinamento-colaborador/edit', async (req, res) => {
        
        const myAttributes  = await WhatMyAttributesTable(TreinamentosColaborador)

        const params = {
            layout:'layouts/spreadsheet-edit',
            title: 'Admin | Edição - Planilha',
            table: TreinamentosColaborador,
            myAttributes,
            getData: '/treinamentos-colaborador/get',
            removeItemRoute: '/admin/manage-spreadsheet/treinamento-colaborador/edit/remove',
            updateItemRoute: '/admin/manage-spreadsheet/treinamento-colaborador/edit/save',
            addItemRoute: '/admin/manage-spreadsheet/treinamento-colaborador/edit/add',
            req,
            res,
            successMessage: [],
            errorMessage: []
        }
    
        await listInformationsSpreadsheets(params);
    })



    // Remove Treinamento Colaborador
    routerTreinamentoColaborador.post('/admin/manage-spreadsheet/treinamento-colaborador/edit/remove', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
        const { id } = req.body;

        await deleteItem(id, TreinamentosColaborador, req);

        res.redirect('/admin/manage-spreadsheet/treinamento-colaborador/edit')

    })



// Edita Treinamento Colaborador
routerTreinamentoColaborador.post('/admin/manage-spreadsheet/treinamento-colaborador/edit/save', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
    try {
        const item = {
            id: req.body.id,
            matricula: req.body.matricula,
            status: req.body.status,
            treinamento: req.body.treinamento,
            inicio: inputDateToGMT(req.body.inicio),
            termino: inputDateToGMT(req.body.termino)
        }
    
        if (item.matricula !== '0' && item.treinamento !== '0' && item.status !== '0') {
            item.colaborador = item.matricula
            delete item.matricula
    
                if(item.colaborador != undefined && item.treinamento != undefined && item.status != undefined){
                    await updateItem(item.id,item,TreinamentosColaborador, req)
                }else{
                    throw new Error('Erro ao tentar atualizar novo item. Verifique os campos e tente novamente.')
                }
            
        }else{
            throw new Error('Parece que nem todos os campos do formulário continham os dados. Tente novamente.')
        }
    
    } catch (error) {
        req.flash('error_msg', error.message)
    }

    res.redirect('/admin/manage-spreadsheet/treinamento-colaborador/edit')
})


//Cria Treinamento Colaborador
routerTreinamentoColaborador.post('/admin/manage-spreadsheet/treinamento-colaborador/edit/add', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {
    
try {
    const item = {
        matricula: req.body.matricula,
        status: req.body.status,
        treinamento: req.body.treinamento,
        inicio: inputDateToGMT(req.body.inicio),
        termino: inputDateToGMT(req.body.termino)
    }
    

    if (item.matricula !== '0' && item.treinamento !== '0' && item.status !== '0') {
        item.colaborador = item.matricula
        delete item.matricula

            if(item.colaborador != undefined && item.treinamento != undefined && item.status != undefined){
                await createItem(item, TreinamentosColaborador, req)
            }else{
                throw new Error('Erro ao tentar criar novo item. Verifique os campos e tente novamente.')
            }
        
    }else{
        throw new Error('Parece que nem todos os campos do formulário continham os dados. Tente novamente.')
    }

} catch (error) {
    req.flash('error_msg', error.message)
}


res.redirect('/admin/manage-spreadsheet/treinamento-colaborador/edit')
})


//Deleta todos os dados da tabela
routerTreinamentoColaborador.get('/admin/manage-spreadsheet/drop/treinamentos-colaborador', authorize(['master', 'admin', 'gerente-treinamentos']), async (req, res) => {

    try {
        
        const stateTreinamentosColaborador = await dropTable(TreinamentosColaborador)
    
        if (stateTreinamentosColaborador) {
            req.flash('success_msg', 'Tabela "treinamentos_colaborador" excluída com sucesso!')
        }else{
            throw new Error('Parece que a tabela não pôde ser excluída. Tente novamente.')
        }
        
    } catch (error) {
        console.error(error.message)
        req.flash('error_msg', error.message)
    }
    
        res.redirect('/admin/manage-spreadsheet')
    
})




module.exports = routerTreinamentoColaborador

