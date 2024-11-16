const request = require('supertest');
const express = require('express');
const routerTreinamento = require('./treinamentosRoute'); // ajuste o caminho conforme necessário
const path = require('path');

const app = express();
app.use(express.json());

// Configurar o mecanismo de visualização EJS
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');

app.use('/', routerTreinamento);

describe('Treinamento Routes', () => {
    test('GET /treinamentos/get should return status 200 or 201', async () => {
        const response = await request(app).get('/treinamentos/get');
        expect([200, 201]).toContain(response.status);
    });

    test('GET /admin/manage-spreadsheet/treinamento/edit should return status 200 or 201', async () => {
        const response = await request(app).get('/admin/manage-spreadsheet/treinamento/edit');
        expect([200, 201]).toContain(response.status);
    }, 10000); // Aumenta o tempo limite para 10000 ms

    test('POST /admin/manage-spreadsheet/treinamento/edit/remove should return status 200 or 201', async () => {
        const response = await request(app)
            .post('/admin/manage-spreadsheet/treinamento/edit/remove')
            .send({ id: 1 });
        expect([200, 201]).toContain(response.status);
    });

    test('POST /admin/manage-spreadsheet/treinamento/edit/save should return status 200 or 201', async () => {
        const response = await request(app)
            .post('/admin/manage-spreadsheet/treinamento/edit/save')
            .send({ id: 1, name: 'Test' });
        expect([200, 201]).toContain(response.status);
    });

    test('POST /admin/manage-spreadsheet/treinamento/edit/add should return status 200 or 201', async () => {
        const response = await request(app)
            .post('/admin/manage-spreadsheet/treinamento/edit/add')
            .send({ name: 'Test' });
        expect([200, 201]).toContain(response.status);
    });
});
