import { addDateField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { adminLabelTest, copyFieldKey, defaultValueTest, disabledFieldTest, fieldLabelTest, helperTextTest, hiddenFieldTest, inputIconTest, nameTest, readOnlyTest, requiredTest, sizeAndPositionTest, subTitleTest, validateEntryUniqueTest } from '../../utils/settings-functions'

describe('example Add a Date Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add A Date Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addDateField()
    cy.getIFrameBody().find('input[type=date]').should('exist')
    cy.fieldKey = `b${Cypress.env('formNo')}-2`
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, { force: true })
  })
  copyFieldKey()
  sizeAndPositionTest()
  fieldLabelTest()
  adminLabelTest()
  subTitleTest()
  inputIconTest()
  helperTextTest()
  defaultValueTest('', '2022-12-20')
  nameTest()
  requiredTest()
  hiddenFieldTest()
  readOnlyTest()
  disabledFieldTest()
  validateEntryUniqueTest()
})
