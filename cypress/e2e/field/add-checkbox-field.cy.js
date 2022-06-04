import { addCheckboxField } from "../../utils/field-toolbar-helpers"
import { createNewForm, login } from "../../utils/form-functions"
import { iFrameClick } from "../../utils/iFrame-functions"
import { adminLabelTest, copyFieldKey, editOptionTest, fieldLabelTest, helperTextTest, maximumCheckTest, minimumCheckTest, nameTest, optionColumnTest, requiredTest, roundedTest, sizeAndPositionTest, subTitleTest, validateUserUniqueTest } from "../../utils/settings-functions"


describe('example Add a Checkbox Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it("Add A Checkbox Field", () => {
    //cy.get('[data-test=new-todo]').click()
    addCheckboxField()
    cy.fieldKey = `b${Cypress.env("formNo")}-2`
    cy.getIFrameBody().find(`[data-testid="${cy.fieldKey}-fld-wrp"]`).should('exist')
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, { force: true })
  })
  copyFieldKey()
  sizeAndPositionTest()
  fieldLabelTest()
  adminLabelTest()
  subTitleTest()
  helperTextTest()
  nameTest(true)
  requiredTest()
  roundedTest(false)
  optionColumnTest('2')
  minimumCheckTest('3')
  maximumCheckTest('5')
  validateUserUniqueTest()
  editOptionTest("check")
})