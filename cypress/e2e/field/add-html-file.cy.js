import { addHtmlField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { copyFieldKey, disabledFieldTest, sizeAndPositionTest } from '../../utils/settings-functions'

describe('example Add Html Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add HTML Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addHtmlField()
    cy.fieldKey = `b${Cypress.env('formNo')}-2`
    cy.getIFrameBody().find(`[data-dev-fld-wrp="${cy.fieldKey}"]`).should('exist')
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, { force: true })
  })
  copyFieldKey()
  sizeAndPositionTest()
  disabledFieldTest(false)
})
