import { addRazorpayField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { copyFieldKey, sizeAndPositionTest } from '../../utils/settings-functions'

describe('example Add Razorpay Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add Razorpay Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addRazorpayField()
    cy.fieldKey = `b${Cypress.env('formNo')}-2`
    cy.getIFrameBody().find(`[data-dev-razorpay-btn="${cy.fieldKey}"]`).should('exist')
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, { force: true })
  })
  copyFieldKey()
  sizeAndPositionTest()
})
