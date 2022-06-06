import { addRadioButtonField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { adminLabelTest, copyFieldKey, editOptionTest, fieldLabelTest, helperTextTest, nameTest, optionColumnTest, requiredTest, roundedTest, sizeAndPositionTest, subTitleTest, validateUserUniqueTest } from '../../utils/settings-functions'

describe('example Add a Radio Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add A Radio Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addRadioButtonField()
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
  nameTest(true)
  requiredTest()
  roundedTest()
  optionColumnTest(2)
  validateUserUniqueTest()
  editOptionTest('radio')
})
