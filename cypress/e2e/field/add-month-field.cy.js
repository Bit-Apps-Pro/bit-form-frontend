import { addMonthField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { adminLabelTest, copyFieldKey, defaultValueTest, disabledFieldTest, fieldLabelTest, helperTextTest, hiddenFieldTest, inputIconTest, nameTest, readOnlyTest, requiredTest, sizeAndPositionTest, subTitleTest } from '../../utils/settings-functions'

describe('example Add a Month Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add A Month Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addMonthField()
    cy.getIFrameBody().find('input[type=month]').should('exist')
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
  defaultValueTest('', '2022-12')
  nameTest()
  requiredTest()
  hiddenFieldTest()
  readOnlyTest()
  disabledFieldTest()
})
