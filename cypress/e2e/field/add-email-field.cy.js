import { addEmailField } from "../../utils/field-toolbar-helpers"
import { createNewForm, login } from "../../utils/form-functions"
import { iFrameClick } from "../../utils/iFrame-functions"
import { adminLabelTest, autoFillTest, copyFieldKey, defaultValueTest, disabledFieldTest, fieldLabelTest, helperTextTest, hiddenFieldTest, inputIconTest, nameTest, patternTest, placeholderTest, readOnlyTest, requiredTest, sizeAndPositionTest, subTitleTest, suggestionTest, validateEntryUniqueTest, validateUserUniqueTest } from "../../utils/settings-functions"


describe('example Add a Email Field', () => {
  // beforeEach(() => {
    
  // })
  login()
  createNewForm()
  it("Add A Email Field", () => {
    //cy.get('[data-test=new-todo]').click()
    addEmailField()
    cy.getIFrameBody().find("input[type=email]").should('exist')
    cy.fieldKey = `b${Cypress.env("formNo")}-2`
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, {force: true})
  })
  copyFieldKey()
  sizeAndPositionTest()
  fieldLabelTest("Email Field Test")
  adminLabelTest()
  subTitleTest()
  inputIconTest()
  helperTextTest()
  defaultValueTest("Email Field Test", "default@example.com")
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
  validateUserUniqueTest()
})