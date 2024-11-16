const request = require('supertest');
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const autenticationRoute = require('./autentication'); 
const AdminColaborador = require('../../models/database/admin_colaborador');

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../../models/database/admin_colaborador');

const app = express();
app.use(express.json());

// Mockar a função req.flash
app.use((req, res, next) => {
    req.flash = jest.fn();
    next();
});

// Configurar o mecanismo de visualização EJS
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');

app.use('/', autenticationRoute);

describe('Autentication Routes', () => {
    test('POST /admin/login should return status 200 or 201 for valid credentials', async () => {
        const mockUser = {
            dataValues: {
                matricula: '12345',
                senha: 'hashedpassword',
                privilegios: 'admin'
            }
        };

        AdminColaborador.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('mockToken');

        const response = await request(app)
            .post('/admin/login')
            .send({ matricula: '12345', senha: 'password' });

        expect([200, 201]).toContain(response.status);
    });

    test('POST /admin/login should return status 302 for invalid user', async () => {
        AdminColaborador.findOne.mockResolvedValue(null);

        const response = await request(app)
            .post('/admin/login')
            .send({ matricula: '12345', senha: 'password' });

        expect(response.status).toBe(302);
    });

    test('POST /admin/login should return status 302 for invalid password', async () => {
        const mockUser = {
            dataValues: {
                matricula: '12345',
                senha: 'hashedpassword',
                privilegios: 'admin'
            }
        };

        AdminColaborador.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(false);

        const response = await request(app)
            .post('/admin/login')
            .send({ matricula: '12345', senha: 'wrongpassword' });

        expect(response.status).toBe(302);
    });
});