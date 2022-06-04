import { addNumberField } from "../../utils/field-toolbar-helpers"
import { createNewForm, login } from "../../utils/form-functions"
import { iFrameClick } from "../../utils/iFrame-functions"
import { adminLabelTest, autoFillTest, copyFieldKey, defaultValueTest, disabledFieldTest, fieldLabelTest, helperTextTest, hiddenFieldTest, inputIconTest, nameTest, numberTest, patternTest, placeholderTest, readOnlyTest, requiredTest, sizeAndPositionTest, subTitleTest, suggestionTest, validateEntryUniqueTest } from "../../utils/settings-functions"


describe('example Add a number Field', () => {
  login()
  createNewForm()
  it("Add A Number Field", () => {
    //cy.get('[data-test=new-todo]').click()
    addNumberField()
    cy.getIFrameBody().find("input[type=number]").should('exist')
    cy.fieldKey = `b${Cypress.env("formNo")}-2`
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, {force: true})
  })
  copyFieldKey()
  sizeAndPositionTest()
  fieldLabelTest("Number Field Test")
  adminLabelTest()
  subTitleTest()
  inputIconTest()
  helperTextTest()
  defaultValueTest("", "54321")
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
  numberTest()
})