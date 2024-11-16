const request = require('supertest');
const express = require('express');
const path = require('path');
const routerTreinamentoColaborador = require('./treinamentoColaboradorRoute'); 

const app = express();
app.use(express.json());

// Configurar o mecanismo de visualização EJS
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');

app.use('/', routerTreinamentoColaborador);

describe('Treinamento Colaborador Routes', () => {
    test('GET /treinamentos-colaborador/get should return status 200 or 201', async () => {
        const response = await request(app).get('/treinamentos-colaborador/get');
        expect([200, 201]).toContain(response.status);
    });

    test('GET /admin/manage-spreadsheet/treinamento-colaborador/edit should return status 200 or 201', async () => {
        const response = await request(app).get('/admin/manage-spreadsheet/treinamento-colaborador/edit');
        expect([200, 201]).toContain(response.status);
    }, 10000); // Aumenta o tempo limite para 10000 ms

    test('POST /admin/manage-spreadsheet/treinamento-colaborador/edit/remove should return status 200 or 201', async () => {
        const response = await request(app)
            .post('/admin/manage-spreadsheet/treinamento-colaborador/edit/remove')
            .send({ id: 1 });
        expect([200, 201]).toContain(response.status);
    });

    test('POST /admin/manage-spreadsheet/treinamento-colaborador/edit/save should return status 200 or 201', async () => {
        const response = await request(app)
            .post('/admin/manage-spreadsheet/treinamento-colaborador/edit/save')
            .send({ id: 1, name: 'Test' });
        expect([200, 201]).toContain(response.status);
    });

    test('POST /admin/manage-spreadsheet/treinamento-colaborador/edit/add should return status 200 or 201', async () => {
        const response = await request(app)
            .post('/admin/manage-spreadsheet/treinamento-colaborador/edit/add')
            .send({ name: 'Test' });
        expect([200, 201]).toContain(response.status);
    });
});