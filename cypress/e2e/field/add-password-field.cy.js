import { addPasswordField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { adminLabelTest, autoFillTest, copyFieldKey, disabledFieldTest, fieldLabelTest, helperTextTest, hiddenFieldTest, inputIconTest, nameTest, patternTest, placeholderTest, readOnlyTest, requiredTest, sizeAndPositionTest, subTitleTest, validateEntryUniqueTest } from '../../utils/settings-functions'

describe('example Add a Password Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add A Password Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addPasswordField()
    cy.getIFrameBody().find('input[type=password]').should('exist')
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
  placeholderTest()
  nameTest()
  patternTest()
  requiredTest()
  hiddenFieldTest()
  readOnlyTest()
  disabledFieldTest()
  autoFillTest()
  validateEntryUniqueTest()
})
