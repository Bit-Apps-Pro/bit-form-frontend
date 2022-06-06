import { addPaypalField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { copyFieldKey, sizeAndPositionTest } from '../../utils/settings-functions'

describe('example Add Paypal Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add Paypal Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addPaypalField()
    cy.fieldKey = `b${Cypress.env('formNo')}-2`
    cy.getIFrameBody().find(`#${cy.fieldKey}-paypal-wrp`).should('exist')
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, { force: true })
  })
  copyFieldKey()
  sizeAndPositionTest()
})
