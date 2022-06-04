import { addRecaptchaField } from "../../utils/field-toolbar-helpers"
import { createNewForm, login } from "../../utils/form-functions"
import { iFrameClick } from "../../utils/iFrame-functions"
import { copyFieldKey, positionAlignment, sizeAndPositionTest } from "../../utils/settings-functions"


describe('example Add a Recaptcha Field', () => {
  // beforeEach(() => {
    
  // })
  login()
  createNewForm()
  it("Add A Recaptcha Field", () => {
    //cy.get('[data-test=new-todo]').click()
    addRecaptchaField()
    cy.fieldKey = `b${Cypress.env("formNo")}-2`
    cy.getIFrameBody().find(`[data-dev-fld-wrp="${cy.fieldKey}"]`).should('exist')
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, {force: true})
  })
  copyFieldKey()
  sizeAndPositionTest()
//   recaptchaThemeTest()
//   recaptchaSizeTest()
  positionAlignment()
})