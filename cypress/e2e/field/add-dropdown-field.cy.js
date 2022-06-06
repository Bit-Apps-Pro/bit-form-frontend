import { addDropdownField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { adminLabelTest, allowCustomOptionTest, closeOnSelectTest, copyFieldKey, disabledFieldTest, fieldLabelTest, helperTextTest, hiddenFieldTest, listAndOptionsTest, multipleSelectTest, optionIconTest, optionSerarchClearableTest, placeholderTest, readOnlyTest, requiredTest, searchPlaceholderTest, selectedOptClearableTest, showSelectedOptImgTest, sizeAndPositionTest, subTitleTest, validateEntryUniqueTest } from '../../utils/settings-functions'

describe('example Add a Dropdown Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add A Dropdown Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addDropdownField()
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
  placeholderTest('dropdown')
  searchPlaceholderTest()
  showSelectedOptImgTest(false, 'dropdown')
  selectedOptClearableTest()
  optionSerarchClearableTest()
  optionIconTest(false)
  allowCustomOptionTest()
  multipleSelectTest()
  closeOnSelectTest()
  validateEntryUniqueTest()
  hiddenFieldTest()
  listAndOptionsTest()
})
