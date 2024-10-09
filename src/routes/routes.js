const express = require('express')
const path = require('path')

const resStatus = require('../controllers/res/resStatus')
const resColaborador = require('../controllers/res/resColaborador')
const resTreinamento = require('../controllers/res/resTreinamento')
const resTreinamentoColaborador = require('../controllers/res/resTreinamentoColaborador')

const refreshTreinamentoColaborador = require('../controllers/put/putTreinamentoColaborador')
const refreshTreinamento = require('../controllers/put/putTreinamento')
const refreshColaborador = require('../controllers/put/putColaborador')
const refreshStatus = require('../controllers/put/putStatus')

const refresh = require('../controllers/refresh')
const { displayvideo } = require('googleapis/build/src/apis/displayvideo')





const routes = express.Router()



//Index

    //get
    routes.get('/', (req, res) => {

        res.sendFile(path.join(__dirname, '../public/views/index.html'))
    })



// Status

    //put
    routes.put('/status/put', async (req, res) => await refreshStatus(res))

    //get
    routes.get('/status/get', async (req, res) => await resStatus(res))



// Colaborador

    //put
    routes.put('/colaborador/put', async (req, res) => await refreshColaborador(res))

    //get
    routes.get('/colaborador/get', async (req, res) => await resColaborador(res))


// Treinamento


    //put
    routes.put('/treinamentos/put', async (req, res) => await refreshTreinamento(res))


    //get
    routes.get('/treinamentos/get', async (req, res) => await resTreinamento(res))


//Treinamento x Colaborador

    //put
    routes.put('/treinamentos-colaborador/put', async (req, res) => await refreshTreinamentoColaborador(res))


    //get
    routes.get('/treinamentos-colaborador/get', async (req, res) => await resTreinamentoColaborador(res))


//Capturavel

    //get
    routes.get('/disponibilidade', async (req, res) => {
        let availability = refresh.getAvailability()

        res.json({disponibilidade: availability})
    })

module.exports = routes;