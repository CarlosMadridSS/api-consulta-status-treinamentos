describe('Usuários devem realizar o gerenciamento do seu perfil e o crud de usuários de nível inferior', () => {

    //----------------------------------------------------//

    it('Inserção de usuário', () => {

        cy.login(Cypress.env('USER_MASTER'), Cypress.env('USER_MASTER_PASSWORD'))

        cy.wait(400)

        cy.get('a').contains('Gerenciar Usuários').should('exist').click()

        cy.wait(400)

        cy.get('.navbar-toggler-icon').should('exist').click()

        cy.wait(400)

        cy.get('#register-user').should('exist').click()

        cy.wait(400)

        cy.get('#primeiro-nome').should('exist').type('João')

        cy.get('#ultimo-nome').should('exist').type('Magalhães')

        cy.get('#matricula').should('exist').type('4')

        cy.get('#privilegio').should('exist').select('admin')

        cy.get('input[name="senha"]').should('exist').type('12345678910')

        cy.get('button[type="submit"]').should('exist').click()

        cy.wait(400)

        cy.get('.navbar-toggler-icon').should('exist').click()

        cy.wait(400)

        cy.get('#generated-passwords').should('exist').click()

        //----------------------------------------------------//

        cy.wait(400)

        cy.get('button').contains('Copiar Senha').should('exist').then(button => {
            if (button) {
                cy.get('button').contains('Copiar Senha').click()
            }

            cy.visit(`${Cypress.env('URL_TEST')}/admin/menu`)

            cy.wait(400)

            cy.logout()
        })



    })

    //----------------------------------------------------//

    it('Alteração de senha', () => {

        cy.login('4', '12345678910')

        cy.wait(400)

        cy.get('a').contains('Meu Perfil').should('exist').click()

        cy.wait(400)

        cy.get('button').contains('Alterar senha').should('exist').click()

        cy.wait(400)

        cy.get('input[name="senha"]').should('exist').type('87654321')

        cy.get('input[name="contraSenha"]').should('exist').type('87654321')

        cy.get('button[type="submit"]').contains('Salvar').should('exist').click()

        cy.wait(400)

        cy.visit(`${Cypress.env('URL_TEST')}/admin/menu`)

        cy.wait(400)

        cy.logout()

    })

    //----------------------------------------------------//

    it('Edição de usuário', () => {

        cy.login(Cypress.env('USER_MASTER'), Cypress.env('USER_MASTER_PASSWORD'))

        cy.wait(400)

        cy.get('a').contains('Gerenciar Usuários').should('exist').click()

        cy.wait(400)

        cy.get('.navbar-toggler-icon').should('exist').click()

        cy.wait(400)

        cy.get('#generated-passwords').should('exist').click()

        cy.wait(400)

        cy.visit(`${Cypress.env('URL_TEST')}/admin/manage-users`)

        cy.wait(400)

        cy.get('#edit-user').should('exist').click()

        cy.wait(400)

        cy.get('#ultimo-nome').should('exist').clear()

        cy.get('#ultimo-nome').should('exist').type('Silveira')

        cy.get('#privilegio').should('exist').select('tecnico-campo')

        cy.get('button').contains('Editar').should('exist').click()

        cy.wait(400)
    })

    //----------------------------------------------------//

    it('Remoção de usuário', () => {

        cy.login(Cypress.env('USER_MASTER'), Cypress.env('USER_MASTER_PASSWORD'))

        cy.wait(400)

        cy.get('a').contains('Gerenciar Usuários').should('exist').click()

        cy.wait(400)

        cy.get('button[id="delete-user"]').should('exist').click()

        cy.wait(400)

        cy.get('button[type="submit"]').contains('Excluir').should('exist').click()
    })

    //----------------------------------------------------//


})