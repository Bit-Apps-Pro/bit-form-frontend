import { getByTestId } from "../common-functions";

export function clickFieldWraperBgColor() {
    getByTestId(`global-bg-clr-modal-btn`).click({ force: true })
}

export function clickAccentColor() {
    getByTestId(`global-primary-clr-modal-btn`).click({ force: true })
}

export function clickFontColor() {
    getByTestId(`global-font-clr-modal-btn`).click({ force: true })
}

export function clickFieldBgColor() {
    getByTestId(`global-fld-bg-clr-modal-btn`).click({ force: true })
}

export function clickFontFamily() {
    getByTestId(`font-picker`).click({ force: true })
}

export function clickLabelAlignment() {
    getByTestId(`lbl-placement-ctrl`).click({ force: true })
}

export function clickDirectionRightToLeft() {
    getByTestId(`rtl-sngl-tgl`).click({ force: true })
}

export function setColorPicker(hexColor = "57b3f9" , tranparent = false){
    cy.get('.styles-module_input__2EvWe').clear({ force: true }).type(hexColor, { force: true })
    if(tranparent) getByTestId(`color-transparant`).click({ force: true })
    getByTestId(`draggable-modal-close-btn`).click({ force: true })
}

export function setFieldWrapperBgColor(hexColor = "57b3f9"){
    clickFieldWraperBgColor()
    setColorPicker(hexColor)
}

export function setGlobalAccentColor(hexColor = "57b3f9"){
    clickAccentColor()
    setColorPicker(hexColor)
}

export function setGlobalFontColor(hexColor = "57b3f9"){
    clickFontColor()
    setColorPicker(hexColor)
}


