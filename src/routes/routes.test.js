const request = require('supertest');
const express = require('express');
const routes = require('./routes'); 
const authorize = require('../middlewares/authenticateToken');
const manageSpreadsheets = require('../controllers/manageSpreadsheets');
jest.mock('../middlewares/authenticateToken', () => jest.fn((roles) => (req, res, next) => next()));

jest.mock('../middlewares/authenticateToken');
jest.mock('../controllers/manageSpreadsheets');

const app = express();
app.use(express.json());
app.use('/', routes);

describe('Routes', () => {
    test('GET / should return status 200 or 201', async () => {
        authorize.mockImplementation((roles) => (req, res, next) => next());

        const response = await request(app).get('/');
        expect([200, 201]).toContain(response.status);
    });

    test('GET /admin/insert-spreadsheet should return status 200 or 201', async () => {
        authorize.mockImplementation((roles) => (req, res, next) => next());

        const response = await request(app).get('/admin/insert-spreadsheet');
        expect([200, 201]).toContain(response.status);
    }, 10000); // Aumenta o tempo limite para 10000 ms

    test('GET /admin/manage-spreadsheet should return status 200 or 201', async () => {
        authorize.mockImplementation((roles) => (req, res, next) => next());
        manageSpreadsheets.mockImplementation((req, res) => res.status(200).send());

        const response = await request(app).get('/admin/manage-spreadsheet');
        expect([200, 201]).toContain(response.status);
    });
});