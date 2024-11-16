describe('Usuários devem realizar o logout', () => {
  it('atravé da página da aplicação com sucesso', () => {
    cy.login(Cypress.env('USER_MASTER'), Cypress.env('USER_MASTER_PASSWORD'))
    cy.wait(500)
    cy.logout()
  })
})




