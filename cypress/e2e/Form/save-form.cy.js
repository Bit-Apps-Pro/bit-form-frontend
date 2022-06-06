import { addTextField } from '../../utils/field-toolbar-helpers'
import { createNewForm, login, saveForm } from '../../utils/form-functions'

describe('Save Form', () => {
  // beforeEach(() => {

  // })
  login()
  createNewForm()
  it('Add A Text Field', () => {
    // cy.get('[data-test=new-todo]').click()
    addTextField()
  })

  saveForm()
})
