import { addSelectField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { adminLabelTest, copyFieldKey, disabledFieldTest, editOptionTest, fieldLabelTest, helperTextTest, hiddenFieldTest, readOnlyTest, requiredTest, selectPlaceholderTest, sizeAndPositionTest, subTitleTest, validateEntryUniqueTest } from '../../utils/settings-functions'

describe('example Add a Select Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add A Select Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addSelectField()
    cy.getIFrameBody().find('select').should('exist')
    cy.fieldKey = `b${Cypress.env('formNo')}-2`
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, { force: true })
  })
  copyFieldKey()
  sizeAndPositionTest()
  fieldLabelTest()
  adminLabelTest()
  subTitleTest()
  helperTextTest()
  selectPlaceholderTest()
  requiredTest()
  hiddenFieldTest()
  readOnlyTest()
  disabledFieldTest()
  validateEntryUniqueTest()
  editOptionTest()
})
