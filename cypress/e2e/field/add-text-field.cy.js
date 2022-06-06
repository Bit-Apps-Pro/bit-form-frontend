import { addTextField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { adminLabelTest, autoFillTest, copyFieldKey, defaultValueTest, disabledFieldTest, fieldLabelTest, helperTextTest, hiddenFieldTest, inputIconTest, inputModeTest, nameTest, patternTest, placeholderTest, readOnlyTest, requiredTest, sizeAndPositionTest, subTitleTest, suggestionTest, validateEntryUniqueTest } from '../../utils/settings-functions'

describe('example Add a text Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add A Text Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addTextField()
    cy.getIFrameBody().find('input[type=text]').should('exist')
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
  defaultValueTest()
  suggestionTest()
  placeholderTest()
  nameTest()
  inputModeTest()
  patternTest()
  requiredTest()
  hiddenFieldTest()
  readOnlyTest()
  disabledFieldTest()
  autoFillTest()
  validateEntryUniqueTest()
})
