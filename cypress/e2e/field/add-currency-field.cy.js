import { addCurrencyField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { countryNotFoundLabelTest, optionIconTest, optionSerarchClearableTest, searchPlaceholderTest, selectedOptClearableTest, showSelectedOptImgTest } from '../../utils/settings-functions'

describe('example Add a Currency Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add A Currency Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addCurrencyField()
    cy.fieldKey = `b${Cypress.env('formNo')}-2`
    cy.getIFrameBody().find(`[data-testid="${cy.fieldKey}-fld-wrp"]`).should('exist')
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, { force: true })
  })
  //   copyFieldKey()
  //   sizeAndPositionTest()
  //   fieldLabelTest()
  //   adminLabelTest()
  //   subTitleTest()
  //   helperTextTest()
  // requiredTest(false)
  // readOnlyTest(false)
  // disabledFieldTest(false)
  searchPlaceholderTest('Search Currency Here...')
  countryNotFoundLabelTest()
  showSelectedOptImgTest(true, 'currency')
  selectedOptClearableTest()
  optionSerarchClearableTest()
  optionIconTest(true)
  //   hiddenFieldTest()
})
