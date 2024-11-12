const Status = require('../models/database/status')
const Colaborador = require('../models/database/colaborador')
const Treinamento = require('../models/database/treinamento')
const TreinamentosColaborador = require('../models/database/treinamentoColaborador')
const returnUrl = require('../controllers/returnUrl')

const manageSpreadsheets = async (req, res) => {

    const url = returnUrl(req)

    try {
        const tableName = {
            status: {
                name: await Status.getTableName(),
                route: '/admin/manage-spreadsheet/status/edit',
                drop: '/admin/manage-spreadsheet/drop/status'
            },
            colaborador: {
                name: await Colaborador.getTableName(),
                route: '/admin/manage-spreadsheet/colaborador/edit',
                drop: '/admin/manage-spreadsheet/drop/colaborador'
            },
            treinamento: {
                name: await Treinamento.getTableName(),
                route: '/admin/manage-spreadsheet/treinamento/edit',
                drop: '/admin/manage-spreadsheet/drop/treinamentos'
            },
            treinamentoColaborador: {
                name: await TreinamentosColaborador.getTableName(),
                route: '/admin/manage-spreadsheet/treinamento-colaborador/edit',
                drop: '/admin/manage-spreadsheet/drop/treinamentos-colaborador'
            },
            url
        }

        const isEmpty = (obj) => Object.entries(obj).length === 0;

        if (
            isEmpty(tableName) ||
            tableName == null 
        ){
            throw new Error('Ocorreu um erro ao carregar tabelas');
            
        }else{
            res.render('layouts/manage-spreadsheet', { title: 'Admin | Gerenciamento de Planilhas', tableName});
        }

        
        
    } catch (error) {
        console.error('Erro: ', error)
    }

}

module.exports = manageSpreadsheets;