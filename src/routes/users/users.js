const verifyMatriculaUser = require('../../controllers/users/veriryMatriculaUser');
const verifyMatricula = require('../../controllers/verifyMatricula');
const decodeJWT = require('../../controllers/decodeJWT');
const authorize = require('../../middlewares/authenticateToken');
const AdminColaborador = require('../../models/database/admin_colaborador');
const jwt = require('jsonwebtoken')

const createUser = require('../../controllers/create/createUser');
const createTemporaryPass = require('../../controllers/create/createTemporaryPass');
const { Op, Sequelize } = require('sequelize');

const routerUsers = require('express').Router()

const generateHashPass = require('../../controllers/generateHashPass');
const updateUser = require('../../controllers/update/updateUser');

const removeTemporaryPass = require('../../controllers/exclude/removeTemporaryPass');
const SenhasGeradas = require('../../models/database/senhas_geradas');

const returnFormattedHours = require('../../controllers/returnFormattedHours')
const isNumber = require('../../controllers/isNumber')


routerUsers.get('/admin/login', (req, res) => {
    res.render('layouts/login', { title: 'Admin | Login' });
})


routerUsers.get('/admin/register', authorize(['master', 'admin']), (req, res) => {
    const route = req.url;

    const decodedCookie = decodeJWT(req.cookies.tokenST, process.env.JWT_SECRET)

    const role = decodedCookie.privilegios

    res.render('layouts/register-or-user', { title: 'Admin | Registrar usuário', route, role, data: '' });
})



routerUsers.post('/admin/register/add', authorize(['master', 'admin']), async (req, res) => {

    try {

        let data = {
            nome: req.body.primeiroNome,
            sobrenome: req.body.ultimoNome,
            matricula: req.body.matricula,
            privilegios: req.body.privilegio,
            senha: await generateHashPass(req.body.senha),
            senha_temp: true
        }

        const hashedPass = req.body.senha

        const matricula = data.matricula

        const resVerifyMatriculaUser = await verifyMatriculaUser(matricula, AdminColaborador, req)
        if (!resVerifyMatriculaUser) {
            await createUser(data, AdminColaborador, req)
            await createTemporaryPass(matricula, hashedPass, req)
            res.redirect('/admin/manage-users/')
        } else {
            res.redirect('/admin/manage-users/')
        }

    } catch (error) {
        req.flash('error_msg', 'Erro no processo de criação de usuário.')
        res.redirect('/admin/manage-users/')
    }

})

//Manage Users
routerUsers.get('/admin/manage-users/', authorize(['master', 'admin']), async (req, res) => {

    try {

        const decodedCookie = decodeJWT(req.cookies.tokenST, process.env.JWT_SECRET)
        if (!decodedCookie) throw new Error('Não foi possível recuperar os dados do usuário autenticado.')
        const role = decodedCookie.privilegios

        let selectedRole = []

        switch (role) {
            case 'master':
                selectedRole.push('master')
                break;
            case 'admin':
                selectedRole.push('master', 'admin')
                break;
            case 'gerente-treinamentos':
                selectedRole.push('master', 'admin', 'gerente-treinamentos', 'tecnico-campo')
                break;
            case 'tecnico-campo':
                selectedRole.push('master', 'admin', 'gerente-treinamentos', 'tecnico-campo')
                break;
            default:
                selectedRole.push('master', 'admin', 'gerente-treinamentos', 'tecnico-campo')
        }

        const users = await AdminColaborador.findAll({
            where: {
                privilegios: {
                    [Op.notIn]: selectedRole
                },
                matricula: {
                    [Op.ne]: decodedCookie.matricula
                }
            }
        });

        const filteredUsers = users.map(user => user.dataValues)

        res.render('layouts/manage-users', { title: 'Admin | Gerenciar Usuários', users: filteredUsers, role });
    } catch (error) {
        console.error(error)
        req.flash('req_flash', 'Ocorreu um erro na busca dos usuários. Tente novamente mais tarde!')
        res.redirect('/admin/menu')
    }


})

//Manage Users Search
routerUsers.get('/admin/manage-users/search/:search', authorize(['master', 'admin']), async (req, res) => {

    const matricula = req.params.search

    await AdminColaborador.findAll({
        where: {
            privilegios: { [Op.ne]: 'master' },
            matricula
        }
    }).then(users => {

        const filteredUsers = users.map(user => user.dataValues)

        res.render('layouts/manage-users', { title: 'Admin | Gerenciar Usuários', users: filteredUsers, role: '' });
    }).catch(error => {
        console.error(error)
        req.flash('req_flash', 'Ocorreu um erro na busca dos usuários. Tente novamente mais tarde!')
        res.redirect('/admin/menu')
    })


})


//Manage Users Remove
routerUsers.post('/admin/manage-users/remove', authorize(['master', 'admin']), async (req, res) => {

    try {
        const { id } = req.body

        const user = await AdminColaborador.findByPk(id)

        const decodedCookie = decodeJWT(req.cookies.tokenST, process.env.JWT_SECRET)

        if (!user) throw new Error('O usuário especificado não existe.')

        if (decodedCookie) {
            const role = decodedCookie.privilegios

            if (role === 'admin' && user.dataValues.privilegios === 'admin') {
                throw new Error('Um administrador não pode remover outro administrador.')
            }

            if (String(user.dataValues.matricula) === String(decodedCookie.matricula)) {
                throw new Error('Não é possivel se remover.')
            }
        }

        const result = await AdminColaborador.destroy({
            where: { id }
        });


        if (result === 0) {
            throw new Error('Não existem usuários com o ID especificado.')
        } else {
            req.flash('success_msg', 'Usuário removido com sucesso!')
            res.redirect('/admin/manage-users')
        }



    } catch (error) {
        console.error(error.message)
        req.flash('error_msg', error.message)
        res.redirect('/admin/manage-users')
    }

})



//Manage Users
routerUsers.get('/admin/manage-users/edit/:id', authorize(['master', 'admin']), async (req, res) => {
    try {

        const route = req.url;
        const { id } = req.params

        const decodedCookie = decodeJWT(req.cookies.tokenST, process.env.JWT_SECRET)
        const role = decodedCookie.privilegios

        const user = await AdminColaborador.findByPk(id)

        if (!user) throw new Error('A lista de usuários está vazia, portanto, não é possivel editar.')

        if (decodedCookie) {
            const role = decodedCookie.privilegios

            if (role === 'admin' && user.dataValues.privilegios === 'admin') {
                throw new Error('Um administrador não pode editar outro administrador.')
            }

            if (String(user.dataValues.matricula) === String(decodedCookie.matricula)) {
                throw new Error('Não é possivel se editar.')
            }
        }

        res.render('layouts/register-or-user', { title: 'Admin | Editar Usuário', route, role, data: user.dataValues });


    } catch (error) {
        console.error(error.message)
        req.flash('error_msg', error.message)
        res.redirect('/admin/manage-users/')
    }
})


//Manage Users Edit Save
routerUsers.post('/admin/manage-users/edit/save', authorize(['master', 'admin']), async (req, res) => {

    try {

        let data = {
            nome: req.body.primeiroNome,
            sobrenome: req.body.ultimoNome,
            matricula: req.body.matricula,
            privilegios: req.body.privilegio,
            id: req.body.id,
            senha: req.body.senha
        }


        if (data.senha != undefined) {
            await removeTemporaryPass(data.id, req)
            await createTemporaryPass(data.matricula, data.senha, req)
            data.senha = await generateHashPass(data.senha)
            await updateUser(data.id, data, AdminColaborador, req)
        } else {

            delete data.senha

            await updateUser(data.id, data, AdminColaborador, req)

        }

        res.redirect('/admin/manage-users/')

    } catch (error) {
        console.error(`Erro no processo de atualização de usuário: ${error.message}`)
        req.flash('error_msg', 'Erro no processo de atualização de usuário.')
        res.redirect('/admin/manage-users/')
    }

})





// My Profile
routerUsers.get('/admin/my-profile', authorize(['master', 'admin', 'gerente-treinamentos', 'tecnico-campo']), async (req, res) => {
    const decodedCookie = decodeJWT(req.cookies.tokenST, process.env.JWT_SECRET)

    const user = await AdminColaborador.findOne({ where: { matricula: decodedCookie.matricula } })

    const userFormatted = {
        nome: user.dataValues.nome,
        sobrenome: user.dataValues.sobrenome,
        matricula: user.dataValues.matricula,
        privilegio: user.dataValues.privilegios,
        senha_temp: user.dataValues.senha_temp ? 'Sim' : 'Não'
    }

    res.render('layouts/my-profile', { title: 'Admin | Meu Usuário', user: userFormatted });

})


// My Profile / Edit
routerUsers.get('/admin/my-profile/edit', authorize(['master', 'admin', 'gerente-treinamentos', 'tecnico-campo']), (req, res) => {
    const route = req.url;
    const decodedCookie = decodeJWT(req.cookies.tokenST, process.env.JWT_SECRET)
    const role = decodedCookie.privilegios

    res.render('layouts/register-or-user', { title: 'Admin | Editar meu Usuário', route, role, data: '' });
})






routerUsers.post('/admin/my-profile/change-password', async (req, res) => {

    try {
        const { senha, contraSenha } = req.body

        const decodedCookie = decodeJWT(req.cookies.tokenST, process.env.JWT_SECRET)

        const user = await AdminColaborador.findOne({ where: { matricula: decodedCookie.matricula } })

        if (decodedCookie.privilegios === 'master') throw new Error('O usuário master não pode trocar a sua própria senha por este canal.')

        if (senha.length < 8) throw new Error('A sua senha deve possuir, pelo menos, 8 caracteres.')

        if (senha !== contraSenha) throw new Error('As senhas não conferem.')

        const generatedPass = await generateHashPass(senha)

        await updateUser(user.dataValues.id, { senha: generatedPass, senha_temp: false }, AdminColaborador, req)

        await removeTemporaryPass(user.dataValues.id, req)

        res.redirect('/admin/my-profile')

    } catch (error) {
        console.error(error.message)
        req.flash('error_msg', error.message)
        res.redirect('/admin/my-profile')
    }
})



// Manage Users / Generated Passwords
routerUsers.get('/admin/manage-users/generated-passwords', authorize(['master', 'admin']), async (req, res) => {

    try {

        const decodedCookie = decodeJWT(req.cookies.tokenST, process.env.JWT_SECRET)
        const role = decodedCookie.privilegios


        let generatedPasswords = await SenhasGeradas.findAll({
            include: [{
                model: AdminColaborador,
                required: false,
                where: {
                    privilegios: {
                        [Op.ne]: role
                    }
                }
            }]
        });

        const adminColaborador = generatedPasswords.map(item => item.AdminColaborador)

        let filteredGeneratedPasswords = []

        if (adminColaborador) {
            filteredGeneratedPasswords = generatedPasswords.map(pass => {
                return {
                    id: pass.id,
                    nome: `${pass.AdminColaborador.dataValues.nome} ${pass.AdminColaborador.dataValues.sobrenome}`,
                    matricula: pass.AdminColaborador.dataValues.matricula,
                    privilegio: pass.AdminColaborador.dataValues.privilegios,
                    data: returnFormattedHours(pass.data),
                    senha: pass.senhaTemp
                }
            })
        }


        res.render('layouts/generated-passwords', { title: 'Admin | Senhas Geradas', passwords: filteredGeneratedPasswords, search: false });

    } catch (error) {
        req.flash('error_msg', 'Ocorreu um problema ao listar as senhas geradas. Tente novamente mais tarde!')
        res.redirect('/admin/manage-users/')

    }
})


// Manage Users / Generated Passwords
routerUsers.get('/admin/manage-users/generated-passwords/:search', authorize(['master', 'admin']), async (req, res) => {

    try {

        const { search } = req.params
        const decodedCookie = decodeJWT(req.cookies.tokenST, process.env.JWT_SECRET)
        const role = decodedCookie.privilegios

        if (!isNumber(search)) throw new Error('A matricula deve ser numérica.')

        let hasGeneratePasswords = await SenhasGeradas.findAll() ? true : false

        if (!hasGeneratePasswords) throw new Error('Não há senhas geradas!')

        let generatedPasswords = await SenhasGeradas.findOne({
            include: [{
                model: AdminColaborador,
                required: true,
                where: {
                    privilegios: {
                        [Op.ne]: role
                    },
                    matricula: search
                }
            }],

        });

        let filteredGeneratedPasswords = []

        if (generatedPasswords && generatedPasswords.AdminColaborador) {
            filteredGeneratedPasswords.push({
                id: generatedPasswords.id,
                nome: `${generatedPasswords.AdminColaborador.dataValues.nome} ${generatedPasswords.AdminColaborador.dataValues.sobrenome}`,
                matricula: generatedPasswords.AdminColaborador.dataValues.matricula,
                privilegio: generatedPasswords.AdminColaborador.dataValues.privilegios,
                data: returnFormattedHours(generatedPasswords.data),
                senha: generatedPasswords.senhaTemp
            })
        }

        res.render('layouts/generated-passwords', { title: 'Admin | Senhas Geradas', passwords: filteredGeneratedPasswords, search: true });

    } catch (error) {
        req.flash('error_msg', error.message)
        res.redirect('/admin/manage-users/generated-passwords/')

    }
})

routerUsers.get(`/admin-colaboradores/get/${process.env.PASS_API}`, async (req, res) => {
    const datasAdminColaborador = await AdminColaborador.findAll(
        {
            attributes: { exclude: ['createdAt', 'updatedAt', 'senha_temp'] }
        })

    res.json(datasAdminColaborador)
})





module.exports = routerUsers