import { addPhoneNumberField } from "../../utils/field-toolbar-helpers"
import { createNewForm, login } from "../../utils/form-functions"
import { iFrameClick } from "../../utils/iFrame-functions"
import { adminLabelTest, copyFieldKey, countryNotFoundLabelTest, detectCountryByGeoTest, detectCountryByIpTest, disabledFieldTest, fieldLabelTest, helperTextTest, hiddenFieldTest, optionIconTest, optionSerarchClearableTest, readOnlyTest, requiredTest, searchPlaceholderTest, selectedOptClearableTest, showSelectedOptImgTest, sizeAndPositionTest, subTitleTest } from "../../utils/settings-functions"


describe('example Add a Phone-number Field', () => {
    // beforeEach(() => {

    // })
    login()
    createNewForm()
    it("Add A Phone-number Field", () => {
        //cy.get('[data-test=new-todo]').click()
        addPhoneNumberField()
        cy.fieldKey = `b${Cypress.env("formNo")}-2`
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
    searchPlaceholderTest("Search Country Here...")
    countryNotFoundLabelTest()
    showSelectedOptImgTest(true, "phone")
    selectedOptClearableTest()
    optionSerarchClearableTest()
    optionIconTest(true)
    detectCountryByIpTest()
    detectCountryByGeoTest()
    hiddenFieldTest()
})