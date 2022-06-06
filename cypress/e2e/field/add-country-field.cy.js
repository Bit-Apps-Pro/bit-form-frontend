import { addCountryField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { adminLabelTest, copyFieldKey, detectCountryByGeoTest, detectCountryByIpTest, disabledFieldTest, fieldLabelTest, helperTextTest, hiddenFieldTest, optionIconTest, optionSerarchClearableTest, placeholderTest, readOnlyTest, requiredTest, searchPlaceholderTest, selectedOptClearableTest, showSelectedOptImgTest, sizeAndPositionTest, subTitleTest } from '../../utils/settings-functions'

describe('example Add a Country Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add A Country Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addCountryField()
    cy.fieldKey = `b${Cypress.env('formNo')}-2`
    cy.getIFrameBody().find(`[data-testid="${cy.fieldKey}-fld-wrp"]`).should('exist')
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, { force: true })
  })
  copyFieldKey()
  sizeAndPositionTest()
  fieldLabelTest()
  adminLabelTest()
  subTitleTest()
  helperTextTest()
  requiredTest(false)
  readOnlyTest(false)
  disabledFieldTest(false)
  placeholderTest('country')
  searchPlaceholderTest('Search Country Here...')
  showSelectedOptImgTest(true)
  selectedOptClearableTest()
  optionSerarchClearableTest()
  optionIconTest(true)
  detectCountryByIpTest()
  detectCountryByGeoTest()
  hiddenFieldTest()
})
