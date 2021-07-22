context('LoginForm', () => {
  beforeEach(() => {
    cy.server()

    cy.route(
      'POST',
      '**/authentication_token',
      'fixture:authentication_token.json'
    )
    cy.route('**/35', 'fixture:35.json')
    cy.route('**/projects?page=1', 'fixture:projects.json')

    cy.route(
      '**/56c51a51850a8e7a58bf.hot-update',
      'fixture:56c51a51850a8e7a58bf.hot-update.json'
    )
    cy.route(
      '**/projects?page=1&id[]=49&id[]=61&id[]=62&id[]=65&id[]=66&id[]=74&id[]=75&id[]=76&id[]=77&id[]=78&id[]=79&id[]=80&id[]=88&id[]=95',
      'fixture:myRequests.json'
    )
    cy.visit('/login')
  })
  it('admin can login', function () {
    cy.get('input[name="username"]')
      .type('tester@hp.de')
      .should('have.value', 'tester@hp.de')
    cy.get('input[name="password"]').type('test').should('have.value', 'test')
    cy.get('[type="submit"]').click()

    cy.get('.cy_grid').find('li').should('have.length', 15)

    cy.get('.cy_myRequests').click()
    // cy.get('.cy_requests').find('li').should('have.length', 10).wait(500)
    // cy.get('.cy_requests').find('li:nth-child(1)').click()
    // cy.get('#menu-button').click()
    // cy.get('#menu-button').click()
    // cy.get('.cy_sidebar').find('a:nth-child(1)').click()
    // cy.get('.cy_sidebar').find('a:nth-child(2)').click()
    // cy.get('.cy_sidebar').find('a:nth-child(3)').click()
    // cy.get('.cy_sidebar').find('a:nth-child(4)').click()
    // cy.get('.cy_sidebar').find('a:nth-child(5)').click()
    // cy.get('.cy_adminSettings').should('have.length', 3)
    // cy.get('.cy_adminSettings').contains('Formulardaten').click()
    // cy.get('.cy_adminSettings').contains('Benachrichtigungen').click()
  })
})
