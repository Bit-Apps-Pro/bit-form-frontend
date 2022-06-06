import { addDecisionField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { adminLabelTest, checkedByDefaultTest, checkedValueTest, copyFieldKey, disabledFieldTest, readOnlyTest, requiredTest, sizeAndPositionTest, uncheckdValueTest } from '../../utils/settings-functions'

describe('example Add a Decision Box Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add A Decision Box Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addDecisionField()
    cy.fieldKey = `b${Cypress.env('formNo')}-2`
    cy.getIFrameBody().find(`#${cy.fieldKey}-decision`).should('exist')
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, { force: true })
  })
  copyFieldKey()
  sizeAndPositionTest()
  adminLabelTest()
  requiredTest(false, true)
  disabledFieldTest()
  readOnlyTest()
  checkedValueTest()
  uncheckdValueTest()
  checkedByDefaultTest()
})
