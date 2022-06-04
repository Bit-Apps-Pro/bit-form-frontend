import { getByTestId } from "./common-functions"
import "./custom-functions"

export function login() {
    it("WP Login", () => {
        cy.visit('http://bitform.mr/wp-admin/admin.php?page=bitform#/')
        cy.get('#user_login').type("maruf")
        cy.get('#user_pass').type("123")
        cy.get("#rememberme").click()
        cy.get("#wp-submit").click()
        cy.get('nav').should('contain', 'My Forms')
    })
}

export function createNewForm() {
    it("Create New Form", () => {
        getByTestId("create-form-btn").click()
        getByTestId("create-form-btn-0").click()
        cy.getIFrameBody().find("button[type=submit]").should('contain', 'Submit')
    })
}

export function saveForm(){
    it("Save Form", () => {
        cy.get("#update-btn").click()
        cy.get("#update-btn").should('have.text', 'Update')
    })
}

