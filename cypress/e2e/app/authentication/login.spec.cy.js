describe('Usuários devem realizar o login', () => {
  it('atravé da página da aplicação com sucesso', () => {
    cy.login(Cypress.env('USER_MASTER'), Cypress.env('USER_MASTER_PASSWORD'))
  })
})