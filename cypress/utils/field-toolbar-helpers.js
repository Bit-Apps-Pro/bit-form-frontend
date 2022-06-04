
const toolTextBtn = '[data-testid="text-tool"]'
const toolTextareaBtn = '[data-testid="textarea-tool"]'
const toolEmailBtn = '[data-testid="email-tool"]'
const toolNumberBtn = '[data-testid="number-tool"]'
const toolHtmlSelectBtn = '[data-testid="html-select-tool"]'
const toolRadioBtn = '[data-testid="radio-tool"]'
const toolCheckBtn = '[data-testid="check-tool"]'
const toolDropDownBtn = '[data-testid="select-tool"]'
const toolFileUpBtn = '[data-testid="file-up-tool"]'
const toolAdvancedFileUpBtn = '[data-testid="advanced-file-up-tool"]'
const toolCountryBtn = '[data-testid="country-tool"]'
const toolCurrencyBtn = '[data-testid="currency-tool"]'
const toolPhoneNumberBtn = '[data-testid="phone-number-tool"]'
const toolUsernameBtn = '[data-testid="username-tool"]'
const toolPasswordBtn = '[data-testid="password-tool"]'
const toolDateBtn = '[data-testid="date-tool"]'
const toolTimeBtn = '[data-testid="time-tool"]'
const toolDatetimeBtn = '[data-testid="datetime-local-tool"]'
const toolWeekBtn = '[data-testid="week-tool"]'
const toolMonthBtn = '[data-testid="month-tool"]'
const toolUrlBtn = '[data-testid="url-tool"]'
const toolColorBtn = '[data-testid="color-tool"]'
const toolDecisionBtn = '[data-testid="decision-box-tool"]'
const toolRecaptchaBtn = '[data-testid="recaptcha-tool"]'
const toolButtonBtn = '[data-testid="button-tool"]'
const toolPaypalBtn = '[data-testid="paypal-tool"]'
const toolRazorpayBtn = '[data-testid="razorpay-tool"]'
const toolTitleBtn = '[data-testid="title-tool"]'
const toolImageBtn = '[data-testid="image-tool"]'
const toolDividerBtn = '[data-testid="divider-tool"]'
const toolHtmlBtn = '[data-testid="html-tool"]'

export function addField(selector){
    cy.get(selector).click({force: true})
}

export function addTextField (){
    addField(toolTextBtn)
    cy.getIFrameBody().find("input[type=text]").should('exist')
}
export function addMultilineTextField (){
    addField(toolTextareaBtn)
}
export function addEmailField (){
    addField(toolEmailBtn)
}
export function addNumberField (){
    addField(toolNumberBtn)
}
export function addSelectField (){
    addField(toolHtmlSelectBtn)
}
export function addRadioButtonField (){
    addField(toolRadioBtn)
}
export function addCheckboxField (){
    addField(toolCheckBtn)
}
export function addDropdownField (){
    addField(toolDropDownBtn)
}
export function addFileUploadField (){
    addField(toolFileUpBtn)
}
export function addAdvancedFileUploadField (){
    addField(toolAdvancedFileUpBtn)
}
export function addCountryField (){
    addField(toolCountryBtn)
}
export function addCurrencyField (){
    addField(toolCurrencyBtn)
}
export function addPhoneNumberField (){
    addField(toolPhoneNumberBtn)
}
export function addUsernameField (){
    addField(toolUsernameBtn)
}
export function addPasswordField (){
    addField(toolPasswordBtn)
}
export function addDateField (){
    addField(toolDateBtn)
}
export function addTimeField (){
    addField(toolTimeBtn)
}
export function addDatetimeField (){
    addField(toolDatetimeBtn)
}
export function addWeekField (){
    addField(toolWeekBtn)
}
export function addMonthField (){
    addField(toolMonthBtn)
}
export function addUrlField (){
    addField(toolUrlBtn)
}
export function addColorField (){
    addField(toolColorBtn)
}
export function addDecisionField (){
    addField(toolDecisionBtn)
}
export function addRecaptchaField (){
    addField(toolRecaptchaBtn)
}
export function addButtonField (){
    addField(toolButtonBtn)
}
export function addPaypalField (){
    addField(toolPaypalBtn)
}
export function addRazorpayField (){
    addField(toolRazorpayBtn)
}
export function addTitleField (){
    addField(toolTitleBtn)
}
export function addImageField (){
    addField(toolImageBtn)
}
export function addDividerField (){
    addField(toolDividerBtn)
}
export function addHtmlField (){
    addField(toolHtmlBtn)
}