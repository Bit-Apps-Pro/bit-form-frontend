import { addWeekField } from "../../utils/field-toolbar-helpers"
import { createNewForm, login } from "../../utils/form-functions"
import { iFrameClick } from "../../utils/iFrame-functions"
import { adminLabelTest, copyFieldKey, defaultValueTest, disabledFieldTest, fieldLabelTest, helperTextTest, hiddenFieldTest, inputIconTest, nameTest, readOnlyTest, requiredTest, sizeAndPositionTest, subTitleTest } from "../../utils/settings-functions"


describe('example Add a Week Field', () => {
  // beforeEach(() => {
    
  // })
  login()
  createNewForm()
  it("Add A Week Field", () => {
    //cy.get('[data-test=new-todo]').click()
    addWeekField()
    cy.getIFrameBody().find("input[type=week]").should('exist')
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
  defaultValueTest("","1999-W23")
  nameTest()
  requiredTest()
  hiddenFieldTest()
  readOnlyTest()
  disabledFieldTest()
})