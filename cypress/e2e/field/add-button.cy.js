import { addButtonField } from "../../utils/field-toolbar-helpers"
import { createNewForm, login } from "../../utils/form-functions"
import { iFrameClick } from "../../utils/iFrame-functions"
import { buttonAlignTest, buttonTypeTest, copyFieldKey, disabledFieldTest, fullWidthButton, helperTextTest, sizeAndPositionTest } from "../../utils/settings-functions"


describe('example Add a Button Field', () => {
  // beforeEach(() => {
    
  // })
  login()
  createNewForm()
  it("Add A Button Field", () => {
    //cy.get('[data-test=new-todo]').click()
    addButtonField()
    cy.getIFrameBody().find("button[type=button]").should('exist')
    cy.fieldKey = `b${Cypress.env("formNo")}-2`
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, {force: true})
  })
  copyFieldKey()
  sizeAndPositionTest()
  helperTextTest()
  disabledFieldTest()
  buttonAlignTest()
  buttonTypeTest()
  fullWidthButton()
})