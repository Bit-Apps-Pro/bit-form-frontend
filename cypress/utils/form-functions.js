import { getByTestId } from './common-functions'
import './custom-functions'

export function login() {
  it('WP Login', () => {
    cy.visit('/')
    cy.get('#user_login').type(Cypress.env('wpUserName'))
    cy.get('#user_pass').type(Cypress.env('wpPassword'))
    cy.get('#rememberme').click()
    cy.get('#wp-submit').click()
    cy.get('nav').should('contain', 'My Forms')
  })
}

export function createNewForm() {
  it('Create New Form', () => {
    getByTestId('create-form-btn').click()
    getByTestId('create-form-btn-0').click()
    cy.getIFrameBody().find('button[type=submit]').should('contain', 'Submit')
  })
}

export function saveForm() {
  it('Save Form', () => {
    cy.get('#update-btn').click()
    cy.get('#update-btn').should('have.text', 'Update')
  })
}
