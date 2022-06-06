import { addFileUploadField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login } from '../../utils/form-functions'
import { iFrameClick } from '../../utils/iFrame-functions'
import { maximumUploadSizeTest, showFileListTest } from '../../utils/settings-functions'

describe('example Add a Dropdown Field', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add A File-Upload Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addFileUploadField()
    cy.fieldKey = `b${Cypress.env('formNo')}-2`
    cy.getIFrameBody().find(`[data-testid="${cy.fieldKey}-fld-wrp"]`).should('exist')
    iFrameClick(`[data-testid="${cy.fieldKey}-settings-btn"]`, { force: true })
  })
  //   copyFieldKey()
  //   sizeAndPositionTest()
  //   fieldLabelTest()
  //   adminLabelTest()
  //   subTitleTest()
  //   uploadButtonTextTest()
  //   inputIconTest()
  //   helperTextTest()
  //   requiredTest(false)
  //   readOnlyTest(false)
  //   disabledFieldTest(false)
  //   hiddenFieldTest()
  //   allowMultipleTest()
  //   fileSelectStatusTest()
  //   showMaximumFileSizeTest()
  maximumUploadSizeTest()
  showFileListTest()
})
