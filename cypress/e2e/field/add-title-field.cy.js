import { addTitleField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { copyFieldKey, sizeAndPositionTest, subTitleTest } from '../../utils/settings-functions'

describe('example Add a Title Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add Title Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addTitleField()
    cy.fieldKey = `b${Cypress.env('formNo')}-2`
    cy.getIFrameBody().find(`[data-dev-titl-wrp="${cy.fieldKey}"]`).should('exist')
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, { force: true })
  })
  copyFieldKey()
  sizeAndPositionTest()
  subTitleTest()
})
