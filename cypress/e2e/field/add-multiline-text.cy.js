import { addMultilineTextField } from "../../utils/field-toolbar-helpers"
import { createNewForm, login } from "../../utils/form-functions"
import { iFrameClick } from "../../utils/iFrame-functions"
import { adminLabelTest, copyFieldKey, defaultValueTest, disabledFieldTest, fieldLabelTest, helperTextTest, hiddenFieldTest, inputIconTest, nameTest, patternTest, placeholderTest, readOnlyTest, requiredTest, sizeAndPositionTest, subTitleTest, validateEntryUniqueTest } from "../../utils/settings-functions"


describe('example Add a Multiline Text', () => {
  // beforeEach(() => {
    
  // })
  login()
  createNewForm()
  it("Add A Multiline Text", () => {
    //cy.get('[data-test=new-todo]').click()
    addMultilineTextField()
    cy.getIFrameBody().find("textarea").should('exist')
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
  patternTest()
  placeholderTest()
  nameTest()
  requiredTest()
  hiddenFieldTest()
  readOnlyTest()
  disabledFieldTest()
  validateEntryUniqueTest()
})