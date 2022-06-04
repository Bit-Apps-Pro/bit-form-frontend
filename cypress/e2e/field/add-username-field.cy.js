import { addUsernameField } from "../../utils/field-toolbar-helpers"
import { createNewForm, login } from "../../utils/form-functions"
import { iFrameClick } from "../../utils/iFrame-functions"
import { adminLabelTest, copyFieldKey, defaultValueTest, disabledFieldTest, fieldLabelTest, helperTextTest, hiddenFieldTest, inputIconTest, nameTest, patternTest, placeholderTest, readOnlyTest, requiredTest, sizeAndPositionTest, subTitleTest, suggestionTest, validateEntryUniqueTest, validateUserUniqueTest } from "../../utils/settings-functions"


describe('example Add a Username Field', () => {
  // beforeEach(() => {
    
  // })
  login()
  createNewForm()
  it("Add A Username Field", () => {
    //cy.get('[data-test=new-todo]').click()
    addUsernameField()
    cy.getIFrameBody().find("input[type=username]").should('exist')
    cy.fieldKey = `b${Cypress.env("formNo")}-2`
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, {force: true})
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
  // inputModeTest()
  patternTest()
  requiredTest()
  hiddenFieldTest()
  readOnlyTest()
  disabledFieldTest()
  // autoFillTest()
  validateEntryUniqueTest()
  validateUserUniqueTest()
})