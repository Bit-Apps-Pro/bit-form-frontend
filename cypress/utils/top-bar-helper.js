import { getByTestId } from "./common-functions"

const fieldModeBtn = "field-mode"
const styleModeBtn = "style-mode"
const inspectBtn = "inspect-element"
const smallBrkPntBtn = "bp-sm"
const mediumBrkPntBtn = "bp-md"
const largeBrkPntBtn = "bp-lg"
const undoBtn = "undo"
const redoBtn = "redo"
const historyListBtn = "history-list"
const customCssJsBtn = "custom-css-js"
const fieldSettingsTab = "fld-settings-tab"
const themeCustomizeTab = "theme-customize-tab"
const styleModeToggle = "style-mode-sngl-tgl"

export function clickFormFieldBtn(){
    getByTestId(fieldModeBtn).click({ force: true })
}

export function clickStyleModedBtn(){
    getByTestId(styleModeBtn).click({ force: true })
    cy.get('[data-testid="quick-tweaks-nav"]').should('exist') 
}

export function clickInspectBtn(){
    getByTestId(inspectBtn).click({ force: true })
}

export function clickSmallBrkPntBtn(){
    getByTestId(smallBrkPntBtn).click({ force: true })
}

export function clickMediumBrkPntBtn(){
    getByTestId(mediumBrkPntBtn).click({ force: true })
}

export function clickLargeBrkPntBtn(){
    getByTestId(largeBrkPntBtn).click({ force: true })
}

export function clickUndoBtn(){
    getByTestId(undoBtn).click({ force: true })
}

export function clickRedoBtn(){
    getByTestId(redoBtn).click({ force: true })
}

export function clickHistoryListBtn(){
    getByTestId(historyListBtn).click({ force: true })
}

export function clickFieldSettingsTab(){
    getByTestId(fieldSettingsTab).click({ force: true })
}

export function clickCustomCssJsBtn(){
    getByTestId(customCssJsBtn).click({ force: true })
}

export function clickThemeCustomizeTab(){
    getByTestId(themeCustomizeTab).click({ force: true })
}

export function clickStyleModeToggle(){
    getByTestId(styleModeToggle).click({ force: true })
}
