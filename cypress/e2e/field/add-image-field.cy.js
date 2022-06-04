import { addImageField } from "../../utils/field-toolbar-helpers"
import { createNewForm, login } from "../../utils/form-functions"
import { iFrameClick } from "../../utils/iFrame-functions"
import { copyFieldKey, sizeAndPositionTest } from "../../utils/settings-functions"


describe('example Add Image Field', () => {
  // beforeEach(() => {
    
  // })
  login()
  createNewForm()
  it("Add Image Field", () => {
    //cy.get('[data-test=new-todo]').click()
    addImageField()
    cy.fieldKey = `b${Cypress.env("formNo")}-2`
    cy.getIFrameBody().find(`[data-dev-img="${cy.fieldKey}"]`).should('exist')
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, {force: true})
  })
  copyFieldKey()
  sizeAndPositionTest()
  
})