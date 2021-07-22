context('New Request', () => {
  beforeEach(() => {
    cy.server()

    cy.route('**/councils', 'fixture:councils.json')
    cy.route(
      '**/search/photos?page=1&per_page=10&query=future&client_id=hMuPe_y9Zi2RD7j9KoPiBBuOhHc-pa5ocywPLKHY9kc',
      'fixture:photos.json'
    )
    cy.route('**/categories?page=1', 'fixture:categories?page=1.json')

    cy.route('**/projects', 'fixture:myProject.json')
    cy.route('**/35', 'fixture:35.json')
    cy.route('**/96', 'fixture:96.json')

    cy.visit('/antraege/erstellen')
  })
  it('Create new request', function () {
    cy.get('input[name="title"]').type('cypress test request')
    cy.get('select').select('Stadtrat Test 222')
    cy.get('.cy_imgs').find('div:nth-child(2)').click()
    cy.get('[type="submit"]').click()

    cy.get('textarea[name="topic"]').type(
      'Laptops für alle Schülerinnen und Schüler'
    )

    cy.get('textarea[name="description"]').type(
      'Am Ende sollen alle Schulkinder einen Laptop haben, um besser lernen zu können'
    )

    cy.get('input[name="motivation"]').type('Meine Motivation ist...')
    cy.get('input[name="skills"]').type('Ich habe Erfahrung mit....')

    cy.get('button[name="categories"]:nth-child(2)').click()
    cy.get('button[name="categories"]:nth-child(5)').click()

    cy.get('[type="submit"]').click()
  })
})
