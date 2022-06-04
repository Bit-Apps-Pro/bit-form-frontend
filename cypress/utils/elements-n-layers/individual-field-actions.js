import { getByTestId } from "../common-functions"

export function clickTextAccordion() {
    getByTestId(`${cy.fieldKey}-text-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickMultilineTextAccordion() {
    getByTestId(`${cy.fieldKey}-multiline-text-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickEmailAccordion() {
    getByTestId(`${cy.fieldKey}-email-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickNumberAccordion() {
    getByTestId(`${cy.fieldKey}-number-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickSelectAccordion() {
    getByTestId(`${cy.fieldKey}-html-select-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickRadioButtonAccordion() {
    getByTestId(`${cy.fieldKey}-radio-button-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickCheckBoxAccordion() {
    getByTestId(`${cy.fieldKey}-check-box-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickDropdownAccordion() {
    getByTestId(`${cy.fieldKey}-drop-down-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickFileUploadAccordion() {
    getByTestId(`${cy.fieldKey}-file-upload-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickAdvanceFileUploadAccordion() {
    getByTestId(`${cy.fieldKey}-advanced-file-upload-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickCountryAccordion() {
    getByTestId(`${cy.fieldKey}-country-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickCurrencyAccordion() {
    getByTestId(`${cy.fieldKey}-currency-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickPhoneNumberAccordion() {
    getByTestId(`${cy.fieldKey}-phone-number-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickUserNameAccordion() {
    getByTestId(`${cy.fieldKey}-user-name-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickPasswordAccordion() {
    getByTestId(`${cy.fieldKey}-password-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickDateAccordion() {
    getByTestId(`${cy.fieldKey}-date-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickTimeAccordion() {
    getByTestId(`${cy.fieldKey}-time-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickDateTimeAccordion() {
    getByTestId(`${cy.fieldKey}-date-time-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickWeekAccordion() {
    getByTestId(`${cy.fieldKey}-week-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickMonthAccordion() {
    getByTestId(`${cy.fieldKey}-month-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickUrlAccordion() {
    getByTestId(`${cy.fieldKey}-url-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickColorAccordion() {
    getByTestId(`${cy.fieldKey}-color-picker-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickDecisionBoxAccordion() {
    getByTestId(`${cy.fieldKey}-decision-box-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickRecaptchaAccordion() {
    getByTestId(`${cy.fieldKey}-recaptcha-v2-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickButtonAccordion() {
    getByTestId(`${cy.fieldKey}-button-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickPaypalAccordion() {
    getByTestId(`${cy.fieldKey}-paypal-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickRazorpayAccordion() {
    getByTestId(`${cy.fieldKey}-razorpay-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickTitleAccordion() {
    getByTestId(`${cy.fieldKey}-title-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickImageAccordion() {
    getByTestId(`${cy.fieldKey}-image-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickDividerAccordion() {
    getByTestId(`${cy.fieldKey}-divider-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}
export function clickHtmlAccordion() {
    getByTestId(`${cy.fieldKey}-html-acc`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}



export function clickFieldQuickTweaks() {
    getByTestId(`${cy.fieldKey}-quick-tweaks-nav`).click({ force: true })
    cy.url().should('contain', `/field-theme-customize/quick-tweaks/${cy.fieldKey}`)
}