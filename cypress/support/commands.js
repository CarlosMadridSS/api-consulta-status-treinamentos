// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


//Login
Cypress.Commands.add('login', (register, password) => {
    cy.visit(`${Cypress.env('URL_TEST')}/admin/login`)
    cy.wait(350)
    cy.get('input[id="matricula"]').type(register)
    cy.get('input[id="senha"]').type(password)
    cy.wait(350)
    cy.get('button[id="login-button"]').click()
    cy.wait(350)
    cy.get('button[id="modal-logout-btn"]').should('exist').then(button => {
        if (button) cy.log('Autenticação OK')
        else cy.log('Erro de autenticação')
    });
})

//Logout
Cypress.Commands.add('logout', () => {
    cy.get('button[id="modal-logout-btn"]').should('exist').then(button => {
        if (button) {
            cy.log('Autenticação OK')
            cy.get('button[id="modal-logout-btn"]').click()
            cy.get('a[id="ancor-logout"]').should('exist').then(ancor => {
                if (ancor) {
                    cy.get('a[id="ancor-logout"]').click()
                    cy.log('Logout realizado com sucesso!')
                } else cy.log('Erro em efetuar o logout.')
            })
        }
        else cy.log('Erro em efetuar o login.')
    });
})

//Add Colaborador

Cypress.Commands.add('add_spreadsheet_colaborador', (name, register) => {
    cy.wait(350)
    cy.contains('Gerenciar Planilhas').then(button => {
        if (button) cy.contains('Gerenciar Planilhas').click()
        else cy.log('Erro ao encontrar botão de gerenciamento de planilhas')
    })

    cy.wait(350)
    cy.get('button[id="colaborador-edit"]').should('exist').then(button => {
        if (button) cy.get('button[id="colaborador-edit"]').click()
        else cy.log('Erro ao encontrar botão de edição de colaboradores')
    })

    cy.wait(350)
    cy.contains('Adicionar Item').then(button => {
        if (button) button.click()
        else cy.log('Erro ao encontrar botão "Adicionar Item"')
    })

    cy.wait(350)
    cy.get('input[id="nome"]').type(name)
    cy.get('input[id="matricula"]').type(register)

    cy.wait(350)
    cy.get('button[type="submit"]').click()


})

//Update Colaborador

Cypress.Commands.add('update_spreadsheet_colaborador', (register, newName, newRegister) => {

    cy.wait(350)
    cy.get(`input[value="${register}"]`).then(cell => {
        if (cell) {
            cy.log('Adição realizada com sucesso!')
            cell.click()
        }
        else cy.log('Erro em realizar adição.')
    })

    cy.wait(350)
    cy.get('#modal-edit-spreadsheet #nome').then(field => {
        if (field) {
            cy.get('#modal-edit-spreadsheet #nome').clear()
            cy.get('#modal-edit-spreadsheet #nome').type(newName)
        }
    })

    cy.wait(350)
    cy.get('#modal-edit-spreadsheet #matricula').then(field => {
        if (field) {
            cy.get('#modal-edit-spreadsheet #matricula').clear()
            cy.get('#modal-edit-spreadsheet #matricula').type(newRegister)
        }
    })

    cy.wait(350)
    cy.get('button[id="btn-form-save"]').then(button => {
        if (button) button.click()
        else cy.log('Erro em ao localizar botão "Salvar"')
    })

    cy.wait(350)
    cy.get(`input[value="${newRegister}"]`).then(cell => {
        if (cell) {
            cy.log('Edição realizada com sucesso!')
            cell.click()
        }
        else cy.log('Erro ao encontrar item.')
    })

})


//Delete Colaborador 

Cypress.Commands.add('delete_spreadsheet_colaborador', () => {

    cy.wait(350)
    cy.get('button[id="btn-form-exclude"').then(button => {
        if (button) button.click()
        else cy.log('Erro em ao localizar botão "Excluir"')
    })


    cy.wait(350)
    cy.get('.alert-personal-flash.alert.alert-success.alert-dismissible.fade.show').then(button => {
        if (button) cy.log('Processos de adição/edição/exclusão realizados com sucesso!')
        else cy.log('Erro em efetuar processos de adição/edição/exclusão.')
    })
})


//Add Status

Cypress.Commands.add('add_spreadsheet_status', (status) => {

    cy.wait(350)
    cy.contains('Gerenciar Planilhas').then(button => {
        if (button) cy.contains('Gerenciar Planilhas').click()
        else cy.log('Erro ao encontrar botão de gerenciamento de planilhas')
    })

    cy.wait(350)
    cy.get('button[id="status-edit"]').should('exist').then(button => {
        if (button) cy.get('button[id="status-edit"]').click()
        else cy.log('Erro ao encontrar botão de edição de status')
    })

    cy.wait(350)
    cy.contains('Adicionar Item').then(button => {
        if (button) button.click()
        else cy.log('Erro ao encontrar botão "Adicionar Item"')
    })

    cy.wait(350)
    cy.get('input[id="status"]').type(status)
    cy.get('button[type="submit"]').click()
})

// Update Status

Cypress.Commands.add('update_spreadsheet_status', (value, newValue) => {
    cy.wait(350)
    cy.get(`input[value="${value}"]`).then(cell => {
        if (cell) {
            cy.log('Adição realizada com sucesso!')
            cell.click()
        }
        else cy.log('Erro em realizar adição.')
    })

    cy.wait(350)
    cy.get('#modal-edit-spreadsheet #status').then(field => {
        if (field) {
            cy.get('#modal-edit-spreadsheet #status').clear()
            cy.get('#modal-edit-spreadsheet #status').type(newValue)
        }
    })

    cy.wait(350)
    cy.get('button[id="btn-form-save"]').then(button => {
        if (button) button.click()
        else cy.log('Erro em ao localizar botão "Salvar"')
    })

    cy.wait(350)
    cy.get(`input[value="${newValue}"]`).then(cell => {
        if (cell) {
            cy.log('Edição realizada com sucesso!')
            cell.click()
        }
        else cy.log('Erro ao encontrar item.')
    })
})


//Delete Status

Cypress.Commands.add('delete_spreadsheet_status', () => {

    cy.wait(350)
    cy.get('button[id="btn-form-exclude"]').then(button => {
        if (button) button.click()
        else cy.log('Erro em ao localizar botão "Excluir"')
    })

    cy.wait(350)
    cy.get('.alert-personal-flash.alert.alert-success.alert-dismissible.fade.show').then(button => {
        if (button) cy.log('Processos de adição/edição/exclusão realizados com sucesso!')
        else cy.log('Erro em efetuar processos de adição/edição/exclusão.')
    })

})


//Add Treinamentos

Cypress.Commands.add('add_spreadsheet_treinamento', (treinamento) => {

    cy.wait(350)
    cy.contains('Gerenciar Planilhas').then(button => {
        if (button) cy.contains('Gerenciar Planilhas').click()
        else cy.log('Erro ao encontrar botão de gerenciamento de planilhas')
    })

    cy.wait(350)
    cy.get('button[id="treinamento-edit"]').should('exist').then(button => {
        if (button) cy.get('button[id="treinamento-edit"]').click()
        else cy.log('Erro ao encontrar botão de edição de treinamentos')
    })

    cy.wait(350)
    cy.contains('Adicionar Item').then(button => {

        if (button) button.click()
        else cy.log('Erro ao encontrar botão "Adicionar Item"')
    })

    cy.wait(350)
    cy.get('input[id="treinamento"]').type(treinamento)
    cy.get('button[type="submit"]').click()
})



//Update Treinamentos

Cypress.Commands.add('update_spreadsheet_treinamento', (value, newValue) => {
    cy.wait(350)
    cy.get(`input[value="${value}"]`).then(cell => {
        if (cell) {
            cy.log('Adição realizada com sucesso!')
            cell.click()
        }
        else cy.log('Erro ao encontrar item')
    })

    cy.wait(350)
    cy.get('#modal-edit-spreadsheet #treinamento').then(field => {
        if (field) {
            cy.get('#modal-edit-spreadsheet #treinamento').clear()
            cy.get('#modal-edit-spreadsheet #treinamento').type(newValue)
        }
    })


    cy.wait(350)
    cy.get('button[id="btn-form-save"]').then(button => {
        if (button) button.click()
        else cy.log('Erro em ao localizar botão "Salvar"')
    })

    cy.wait(350)
    cy.get(`input[value="${newValue}"]`).then(cell => {
        if (cell) {
            cy.log('Edição realizada com sucesso!')
            cell.click()
        }
        else cy.log('Erro ao encontrar item.')
    })



})


Cypress.Commands.add('delete_spreadsheet_treinamento', () => {
    cy.wait(350)
    cy.get('button[id="btn-form-exclude"]').then(button => {
        if (button) button.click()
        else cy.log('Erro em ao localizar botão "Excluir"')
    })

    cy.wait(350)
    cy.get('.alert-personal-flash.alert.alert-success.alert-dismissible.fade.show').then(button => {
        if (button) cy.log('Processos de adição/edição/exclusão realizados com sucesso!')
        else cy.log('Erro em efetuar processos de adição/edição/exclusão.')
    })
})

//Add Treinamentos Colaborador

Cypress.Commands.add('add_spreadsheet_treinamento_colaborador', (inicio, matricula, status, termino, treinamento) => {
    cy.wait(350)
    cy.get('button[id="treinamentos_colaborador-edit"]').should('exist').then(button => {
        if (button) cy.get('button[id="treinamentos_colaborador-edit"]').click()
        else cy.log('Erro ao encontrar botão de edição de treinamentos')
    })

    cy.wait(350)
    cy.contains('Adicionar Item').then(button => {
        if (button) button.click()
        else cy.log('Erro ao encontrar botão "Adicionar Item"')
    })

    cy.wait(350)
    cy.get('#modal-insert-spreadsheet #inicio').should('be.visible').type(inicio)
    cy.get('#matricula').select(matricula);
    cy.get('#status').select(status);
    cy.get('#modal-insert-spreadsheet #termino').type(termino);
    cy.get('#treinamento').select(treinamento);

    cy.wait(350)
    cy.get('#modal-insert-spreadsheet button[type="submit"]').then(button => {
        if (button) button.click()
        else cy.log('Erro ao encontrar botão "Salvar"')
    })
})

//Delete Treinamentos Colaborador
Cypress.Commands.add('delete_spreadsheet_treinamento_colaborador', (register) => {
    cy.wait(350)
    cy.get(`#body-table input[value="${register}"]`).should('be.visible').then(cell => {
        if (cell) cell.click()
        else cy.log('Erro ao encontrar item para exclusão')
    })

    //3

    cy.wait(1000)
    cy.get('#btn-form-exclude').then(button => {
        if (button) button.click()
        else cy.log('Erro ao encontrar botão "Excluir"')
    })

    cy.wait(350)
    cy.get('.alert-personal-flash.alert.alert-success.alert-dismissible.fade.show').then(button => {
        if (button) cy.log('Processos de adição/edição/exclusão realizados com sucesso!')
        else cy.log('Erro em efetuar processos de adição/edição/exclusão.')
    })
})