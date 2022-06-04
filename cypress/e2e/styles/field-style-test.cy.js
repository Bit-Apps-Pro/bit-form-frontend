import { clickThemeQuickTweaksNav } from '../../utils/elements-n-layers/global-actions'
import { addTextField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { clickAccentColor, setColorPicker } from '../../utils/style-customize/global-theme-customize'
import { clickStyleModedBtn } from '../../utils/top-bar-helper'

describe('example Add Html Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add A Text Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addTextField()
    cy.getIFrameBody().find('input[type=text]').should('exist')
    cy.fieldKey = `b${Cypress.env('formNo')}-2`
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, { force: true })
  })

  it('Switch to Style Mode', () => {
    clickStyleModedBtn()
  })

  it('Style & Layer click Test', () => {
    clickThemeQuickTweaksNav()
    // clickTextAccordion()
    // clickFieldQuickTweaks()
    // cy.fieldKey = `b${Cypress.env("formNo")}-1`
    // clickButtonAccordion()

    clickAccentColor()
    setColorPicker()
  })
})
