import { addUrlField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { adminLabelTest, autoFillTest, copyFieldKey, defaultValueTest, disabledFieldTest, fieldLabelTest, helperTextTest, hiddenFieldTest, inputIconTest, nameTest, patternTest, placeholderTest, readOnlyTest, requiredTest, sizeAndPositionTest, subTitleTest, suggestionTest, validateEntryUniqueTest } from '../../utils/settings-functions'

describe('example Add a URL Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add A URL Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addUrlField()
    cy.getIFrameBody().find('input[type=text]').should('exist')
    cy.fieldKey = `b${Cypress.env('formNo')}-2`
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, { force: true })
  })
  copyFieldKey()
  sizeAndPositionTest()
  fieldLabelTest('URL Field Test')
  adminLabelTest()
  subTitleTest()
  inputIconTest()
  helperTextTest()
  defaultValueTest('URL Field Test', "'https://www.example.com")
  suggestionTest()
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
