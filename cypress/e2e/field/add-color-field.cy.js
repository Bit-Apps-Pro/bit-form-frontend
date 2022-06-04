import { addColorField } from "../../utils/field-toolbar-helpers"
import { createNewForm, login } from "../../utils/form-functions"
import { iFrameClick } from "../../utils/iFrame-functions"
import { validateEntryUniqueTest } from "../../utils/settings-functions"


describe('example Add a Color Field', () => {
  // beforeEach(() => {
    
  // })
  login()
  createNewForm()
  it("Add A Color Field", () => {
    //cy.get('[data-test=new-todo]').click()
    addColorField()
    cy.getIFrameBody().find("input[type=color]").should('exist')
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
  inputModeTest()
  patternTest()
  requiredTest()
  hiddenFieldTest()
  readOnlyTest()
  disabledFieldTest()
  autoFillTest()
  validateEntryUniqueTest()
})