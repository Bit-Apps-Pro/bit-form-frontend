import { addDividerField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { copyFieldKey, sizeAndPositionTest } from '../../utils/settings-functions'

describe('example Add Divider Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add Divider Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addDividerField()
    cy.fieldKey = `b${Cypress.env('formNo')}-2`
    cy.getIFrameBody().find(`[data-dev-divider="${cy.fieldKey}"]`).should('exist')
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, { force: true })
  })
  copyFieldKey()
  sizeAndPositionTest()
})
