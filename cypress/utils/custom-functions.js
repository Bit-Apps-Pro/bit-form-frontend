
Cypress.Commands.add('getIFrameBody', () => {
    return cy
        .get('iframe#bit-grid-layout')
        .its('0.contentDocument.body')
        .then(cy.wrap)
})