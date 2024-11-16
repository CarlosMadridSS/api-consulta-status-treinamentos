describe('Usuários devem realizar: adição/edição/exclusão nas planilhas', () => {

  //Planilha de Colaboradores

  //-----------------------------------------------------------------------------//

  //Login


  beforeEach(() => {
    cy.login(Cypress.env('USER_MASTER'), Cypress.env('USER_MASTER_PASSWORD'))
  });


  it('Adicionando e editando a planilha de colaboladores', () => {

    cy.fixture('spreadsheet.json').then(data => {

      // Add

      cy.add_spreadsheet_colaborador(data.colaborador.old.nome, data.colaborador.old.matricula)

      //Update

      cy.update_spreadsheet_colaborador(data.colaborador.old.matricula, data.colaborador.new.nome, data.colaborador.new.matricula)

    })

  })

  //-----------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------//


  //Planilha de Status

  it('Adicionando e editando a planilha de status', () => {
    // Visit

    cy.fixture('system.json').then(data => {
      cy.visit(`${Cypress.env('URL_TEST')}${data.url.pathnames.manage_spreadsheet}`)
    })

    cy.fixture('spreadsheet.json').then(data => {

      // Add

      cy.add_spreadsheet_status(data.status.old)

      // Update

      cy.update_spreadsheet_status(data.status.old, data.status.new)

    })
  })




  //-----------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------//


  //Planilha de Treinamentos

  it('Adicionando e editando a planilha de treinamentos', () => {
    // Visit

    cy.fixture('system.json').then(data => {
      cy.visit(`${Cypress.env('URL_TEST')}${data.url.pathnames.manage_spreadsheet}`)
    })

    cy.fixture('spreadsheet.json').then(data => {

      // Add

      cy.add_spreadsheet_treinamento(data.treinamento.old)

      // Update

      cy.update_spreadsheet_treinamento(data.treinamento.old, data.treinamento.new)

    })
  })





  //-----------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------//


  //Planilha de Treinamentos-Colaborador

  it('Adicionando e deletando dados na planilha treinamentos-colaborador', () => {
    cy.fixture('system.json').then(data => {
      cy.visit(`${Cypress.env('URL_TEST')}${data.url.pathnames.manage_spreadsheet}`)
    })

    cy.fixture('spreadsheet.json').then(data => {
      cy.add_spreadsheet_treinamento_colaborador(
        data.treinamento_colaborador.new.inicio,
        data.colaborador.new.matricula,
        data.status.new,
        data.treinamento_colaborador.new.termino,
        data.treinamento.new
      )

      //Exclusão de item -> planilha: treinamento_colaborador

      cy.delete_spreadsheet_treinamento_colaborador(data.colaborador.new.matricula)
    })
  })




  //Exclusão de item -> planilha: colaborador
  it('Removendo item da planilha de colaboradores', () => {
    cy.fixture('system.json').then(data => {
      cy.visit(`${Cypress.env('URL_TEST')}${data.url.pathnames.manage_spreadsheet}`)
    })

    cy.wait(500)

    cy.get('button[id="colaborador-edit"]').should('exist').then(button => {
      if (button) cy.get('button[id="colaborador-edit"]').click()
      else cy.log('Erro ao encontrar botão de edição de colaboradores')
    })


    cy.wait(500)

    cy.fixture('spreadsheet.json').then(data => {

      cy.get(`input[value="${data.colaborador.new.nome}"]`).then(cell => {
        if (cell) {
          cy.get(`input[value="${data.colaborador.new.nome}"]`).should('exist').click()
        }
        else cy.log('Erro ao encontrar item.')
      })

    })

    cy.delete_spreadsheet_colaborador()
  })


  //Exclusão de item -> planilha: status
  it('Removendo item da planilha de status', () => {
    cy.fixture('system.json').then(data => {
      cy.visit(`${Cypress.env('URL_TEST')}${data.url.pathnames.manage_spreadsheet}`)
    })

    cy.wait(500)
    cy.get('button[id="status-edit"]').should('exist').then(button => {
      if (button) cy.get('button[id="status-edit"]').click()
      else cy.log('Erro ao encontrar botão de edição de status')
    })

    cy.wait(500)

    cy.fixture('spreadsheet.json').then(data => {

      cy.get(`input[value="${data.status.new}"]`).then(cell => {
        if (cell) {
          cy.get(`input[value="${data.status.new}"]`).should('exist').click()
        }
        else cy.log('Erro ao encontrar item.')
      })

    })


    cy.delete_spreadsheet_status()
  })


  //Exclusão de item -> planilha: treinamento

  it('Removendo item da planilha de treinamentos', () => {
    cy.fixture('system.json').then(data => {
      cy.visit(`${Cypress.env('URL_TEST')}${data.url.pathnames.manage_spreadsheet}`)
    })


    cy.wait(500)
    cy.get('button[id="treinamento-edit"]').should('exist').then(button => {
      if (button) cy.get('button[id="treinamento-edit"]').click()
      else cy.log('Erro ao encontrar botão de edição de treinamentos')
    })

    cy.wait(500)

    cy.fixture('spreadsheet.json').then(data => {

      cy.get(`input[value="${data.treinamento.new}"]`).then(cell => {
        if (cell) {
          cy.get(`input[value="${data.treinamento.new}"]`).should('exist').click()
        }
        else cy.log('Erro ao encontrar item.')
      })

    })

    cy.delete_spreadsheet_treinamento()
  })
})

