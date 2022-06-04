import { addTimeField } from "../../utils/field-toolbar-helpers"
import { createNewForm, login } from "../../utils/form-functions"
import { iFrameClick } from "../../utils/iFrame-functions"
import { adminLabelTest, copyFieldKey, defaultValueTest, disabledFieldTest, fieldLabelTest, helperTextTest, hiddenFieldTest, inputIconTest, nameTest, readOnlyTest, requiredTest, sizeAndPositionTest, subTitleTest } from "../../utils/settings-functions"


describe('example Add a Time Field', () => {
  // beforeEach(() => {
    
  // })
  login()
  createNewForm()
  it("Add A Time Field", () => {
    //cy.get('[data-test=new-todo]').click()
    addTimeField()
    cy.getIFrameBody().find("input[type=time]").should('exist')
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
  defaultValueTest("","22:15")
  nameTest()
  requiredTest()
  hiddenFieldTest()
  readOnlyTest()
  disabledFieldTest()
})