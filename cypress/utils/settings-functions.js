import { getByTestId } from "./common-functions"

// Icon Modal
const icnPrvArrwLeftBtn = 'inc-prv-btn-arrow-alt-circle-left'
const icnPrvArrwRightBtn = 'inc-prv-btn-arrow-alt-circle-right'
const icnDwnldNSavBtn = 'icn-dwnld-n-sav'

export function copyFieldKey() {
    it("Copy Field Key", () => {
        // cy.get('[data-testid="fld-stng-key-col-cpy-btn"]').scrollIntoView().should('be.visible')
        getByTestId("fld-stng-key-col-cpy-btn").click({ force: true })
    })
}

export function sizeAndPositionTest(x = "10", w = "40") {
    it("Size And Position Test", () => {
        getByTestId('siz-n-pos-smpl-acrdn').click({ force: true })
        getByTestId('siz-n-pos-w-inp').clear({ force: true }).type(w, { force: true })
        getByTestId('siz-n-pos-x-inp').clear({ force: true }).type(x, { force: true })
    })
}

export function fieldLabelTest(label = "Field Label Test", preIcn = true, sufIcn = true, rmvIcn = false) {
    it("Field Label Test", () => {
        getByTestId('fld-lbl-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-lbl']`).should('not.exist')
        getByTestId('fld-lbl-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-lbl']`).should('exist')

        getByTestId('fld-lbl-stng-ato-siz-inp').clear({ force: true }).type(label, { force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-lbl']`).should('have.text', label)

        if (preIcn) {
            getByTestId('lbl-pre-i-edt-btn').click({ force: true })
            getByTestId(icnPrvArrwLeftBtn).click({ force: true })
            getByTestId(icnDwnldNSavBtn).click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-lbl-pre-i']`).should('exist')

            if (rmvIcn) {
                getByTestId('lbl-pre-i-rmv-btn').click({ force: true })
                cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-lbl-pre-i']`).should('not.exist')
            }
        }

        if (sufIcn) {
            getByTestId('lbl-suf-i-edt-btn').click({ force: true })
            getByTestId(icnPrvArrwRightBtn).click({ force: true })
            getByTestId(icnDwnldNSavBtn).click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-lbl-suf-i']`).should('exist')

            if (rmvIcn) {
                getByTestId('lbl-suf-i-rmv-btn').click({ force: true })
                cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-lbl-suf-i']`).should('not.exist')
            }
        }
    })
}

export function adminLabelTest(adminLabel = "Test-Admin-Label") {
    it("Admin Label Test", () => {
        getByTestId('admn-lbl-stng-sngl-tgl').click({ force: true })
        getByTestId('admn-lbl-stng-sngl-tgl').click({ force: true })
        getByTestId('admn-lbl-stng-sngl-tgl').click({ force: true })

        getByTestId('admn-lbl-stng-ato-siz-inp').clear({ force: true }).type(adminLabel, { force: true })
    })
}

export function subTitleTest(subTitle = "Subtitle By Preview", preIcn = true, sufIcn = true, rmvIcn = false) {
    it("Sub Title Test", () => {
        getByTestId('sub-titl-stng-sngl-tgl').click({ force: true })
        getByTestId('sub-titl-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-sub-titl']`).should('not.exist')
        getByTestId('sub-titl-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-sub-titl']`).should('exist')

        getByTestId('sub-titl-stng-ato-siz-inp').clear({ force: true }).type(subTitle, { force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-sub-titl']`).should('have.text', subTitle)

        if (preIcn) {
            getByTestId('sub-titl-pre-i-edt-btn').click({ force: true })
            getByTestId(icnPrvArrwLeftBtn).click({ force: true })
            getByTestId(icnDwnldNSavBtn).click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-sub-titl-pre-i']`).should('exist')

            if (rmvIcn) {
                getByTestId('sub-titl-pre-i-rmv-btn').click({ force: true })
                cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-sub-titl-pre-i']`).should('not.exist')
            }
        }

        if (sufIcn) {
            getByTestId('sub-titl-suf-i-edt-btn').click({ force: true })
            getByTestId(icnPrvArrwRightBtn).click({ force: true })
            getByTestId(icnDwnldNSavBtn).click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-sub-titl-suf-i']`).should('exist')

            if (rmvIcn) {
                getByTestId('sub-titl-suf-i-rmv-btn').click({ force: true })
                cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-sub-titl-suf-i']`).should('not.exist')
            }
        }

        getByTestId('sub-titl-stng-smpl-acrdn').click({ force: true })
    })
}


export function uploadButtonTextTest(label = "Click for Select File") {
    it("Upload Button Text Test", () => {
        getByTestId('upld-btn-txt-inp').clear({ force: true }).type(label, { force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-inp-btn']`).should('have.text', label)
    })
}


export function inputIconTest(preIcn = true, sufIcn = true, rmvIcn = false) {
    it("Input Icon Test", () => {
        if (preIcn) {
            getByTestId('pre-i-edt-btn').click({ force: true })
            getByTestId(icnPrvArrwLeftBtn).click({ force: true })
            getByTestId(icnDwnldNSavBtn).click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-pre-i']`).should('exist')

            if (rmvIcn) {
                getByTestId('pre-i-rmv-btn').click({ force: true })
                cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-pre-i']`).should('not.exist')
            }
        }

        if (sufIcn) {
            getByTestId('suf-i-edt-btn').click({ force: true })
            getByTestId(icnPrvArrwRightBtn).click({ force: true })
            getByTestId(icnDwnldNSavBtn).click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-suf-i']`).should('exist')

            if (rmvIcn) {
                getByTestId('suf-i-rmv-btn').click({ force: true })
                cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-suf-i']`).should('not.exist')
            }
        }
    })
}


export function helperTextTest(helpetText = "Subtitle By Preview", preIcn = true, sufIcn = true, rmvIcn = false) {
    it("Helper Text Test", () => {
        getByTestId('hlpr-txt-stng-sngl-tgl').click({ force: true })
        getByTestId('hlpr-txt-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-hlp-txt']`).should('not.exist')
        getByTestId('hlpr-txt-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-hlp-txt']`).should('exist')

        getByTestId('hlpr-txt-stng-ato-siz-inp').clear({ force: true }).type(helpetText, { force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-hlp-txt']`).should('have.text', helpetText)

        if (preIcn) {
            getByTestId('hlp-txt-pre-i-edt-btn').click({ force: true })
            getByTestId(icnPrvArrwLeftBtn).click({ force: true })
            getByTestId(icnDwnldNSavBtn).click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-hlp-txt-pre-i']`).should('exist')

            if (rmvIcn) {
                getByTestId('hlp-txt-pre-i-rmv-btn').click({ force: true })
                cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-hlp-txt-pre-i']`).should('not.exist')
            }
        }

        if (sufIcn) {
            getByTestId('hlp-txt-suf-i-edt-btn').click({ force: true })
            getByTestId(icnPrvArrwRightBtn).click({ force: true })
            getByTestId(icnDwnldNSavBtn).click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-hlp-txt-suf-i']`).should('exist')

            if (rmvIcn) {
                getByTestId('hlp-txt-suf-i-rmv-btn').click({ force: true })
                cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-hlp-txt-suf-i']`).should('not.exist')
            }
        }

        getByTestId('hlpr-txt-stng-smpl-acrdn').click({ force: true })
    })
}

export function defaultValueTest(defaultValue = "Field Label Test", testValue = "Default Value Test") {
    it("Default Value Test", () => {
        getByTestId('dflt-val-stng-sngl-tgl').click({ force: true })
        getByTestId('dflt-val-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.value', '')
        getByTestId('dflt-val-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.value', defaultValue)

        getByTestId('dflt-val-stng-inp').clear({ force: true }).type(testValue, { force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.value', testValue)
    })
}

export function suggestionTest() {
    it("Suggestions Test", () => {
        getByTestId('sgsn-stng-sngl-tgl').click({ force: true })
        getByTestId('sgsn-stng-btn').click({ force: true })
        getByTestId('add-mor-cmp-btn').click({ force: true })
        getByTestId('add-mor-cmp-btn').click({ force: true })
        getByTestId('add-mor-cmp-btn').click({ force: true })
        getByTestId('mdl-cls-btn').click({ force: true })

        cy.getIFrameBody().find(`#${cy.fieldKey}-datalist`).should('exist')
    })
}

export function placeholderTest(fieldType = "text", placeholder = "Placeholder Text Test...") {
    it("Placeholder Test", () => {
        if (fieldType !== "dropdown" && fieldType !== "country") {
            getByTestId('plchldr-stng-sngl-tgl').click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('not.have.attr', "placeholder")
            getByTestId('plchldr-stng-sngl-tgl').click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "placeholder", "Placeholder Text...")

            getByTestId('plchldr-stng-inp').clear({ force: true }).type(placeholder, { force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "placeholder", placeholder)
        } else {
            getByTestId('plchldr-stng-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.ph || "").to.be.equal("")
            })
            getByTestId('plchldr-stng-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.ph).to.be.equal("Placeholder Text...")
            })
            getByTestId('plchldr-stng-inp').clear({ force: true }).type(placeholder, { force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.ph).to.be.equal(placeholder)
            })
        }

    })
}

export function searchPlaceholderTest(defaultPh = "Search Options...", placeholder = "Search Text Test...") {
    it("Search Placeholder Test", () => {
        getByTestId('srch-plchldr-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-opt-srch-inp']`).should('have.attr', "placeholder", '')
        cy.window().then(win => {
            expect(win.selectedFieldData.config.searchPlaceholder).to.be.equal("")
        })
        getByTestId('srch-plchldr-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-opt-srch-inp']`).should('have.attr', "placeholder", defaultPh)
        getByTestId('srch-plchldr-stng-inp').clear({ force: true }).type(placeholder, { force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-opt-srch-inp']`).should('have.attr', "placeholder", placeholder)
    })
}

export function selectPlaceholderTest(placeholder = "Placeholder Text Test...") {
    it("Placeholder Test", () => {
        getByTestId('plchldr-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}'] > option`).eq(0).should('have.text', "Placeholder Text...").and('have.value', '')
        getByTestId('plchldr-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}'] > option`).eq(0).should('not.have.text', "Placeholder Text...").and('not.have.value', '')
        getByTestId('plchldr-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}'] > option`).eq(0).should('have.text', "Placeholder Text...").and('have.value', '')

        getByTestId('plchldr-stng-inp').clear({ force: true }).type(placeholder, { force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}'] > option`).eq(0).should('have.text', placeholder).and('have.value', '')
    })
}

export function nameTest(isOpen = false, name = "name-test") {
    it("Name Test", () => {
        if (isOpen) getByTestId('nam-stng-smpl-acrdn').click({ force: true })
        getByTestId('nam-stng-smpl-acrdn').click({ force: true })

        getByTestId('nam-stng-inp').clear({ force: true }).type(name, { force: true })
        // cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr',"name", name)
    })
}

export function inputModeTest(inputMode = "numeric") {
    it("Input Mode Test", () => {
        getByTestId('inp-mod-stng-smpl-acrdn').click({ force: true })
        getByTestId('inp-mod-stng-slct').select("none")
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "inputmode", "none")
        getByTestId('inp-mod-stng-slct').select("decimal")
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "inputmode", "decimal")
        getByTestId('inp-mod-stng-slct').select("text")
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "inputmode", "text")
        getByTestId('inp-mod-stng-slct').select("tel")
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "inputmode", "tel")
        getByTestId('inp-mod-stng-slct').select("email")
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "inputmode", "email")
        getByTestId('inp-mod-stng-slct').select(inputMode)
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "inputmode", inputMode)
    })
}


export function patternTest(indexNo = "1") {
    it("Pattern Test", () => {
        getByTestId('ptrn-stng-smpl-acrdn').click({ force: true })
        getByTestId('ptrn-stng-exprsn-btn').click({ force: true })
        getByTestId('ptrn-stng-expn-itm-3').click({ force: true })
        getByTestId('ptrn-stng-exprsn-btn').click({ force: true })
        getByTestId('ptrn-stng-expn-itm-1').click({ force: true })
        getByTestId('ptrn-stng-exprsn-btn').click({ force: true })
        getByTestId('ptrn-stng-expn-itm-' + indexNo).click({ force: true })
    })
}

export function requiredTest(isInput = true, isSelected = false) {
    it("Required Test", () => {
        if (isInput) {
            if (isSelected) {
                getByTestId('rqrd-stng-sngl-tgl').click({ force: true })
                cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('not.have.attr', "required")
            }
            getByTestId('rqrd-stng-sngl-tgl').click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "required")
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-req-smbl']`).should('exist')
            getByTestId('rqrd-stng-sngl-tgl').click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('not.have.attr', "required")
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-req-smbl']`).should('not.exist')
            getByTestId('rqrd-stng-sngl-tgl').click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "required")
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-req-smbl']`).should('exist')
        } else {
            if (isSelected) {
                getByTestId('rqrd-stng-sngl-tgl').click({ force: true })
                cy.window().then(win => {
                    expect(win.selectedFieldData.valid.req || false).to.be.equal(false)
                })
            }
            getByTestId('rqrd-stng-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.valid.req).to.be.equal(true)
            })
            getByTestId('rqrd-stng-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.valid.req || false).to.be.equal(false)
            })
            getByTestId('rqrd-stng-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.valid.req).to.be.equal(true)
            })
        }

    })
}

export function hiddenFieldTest() {
    it("Hidden Field Test", () => {
        getByTestId('fld-hid-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-fld-wrp']`).should('have.class', "fld-hide")
        getByTestId('fld-hid-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-fld-wrp']`).should('not.have.class', "fld-hide")
        getByTestId('fld-hid-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-fld-wrp']`).should('have.class', "fld-hide")
    })
}


export function readOnlyTest(isInput = true) {

    it("Read-only Field Test", () => {
        if (isInput) {
            getByTestId('rdonly-stng-sngl-tgl').click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "readonly")
            getByTestId('rdonly-stng-sngl-tgl').click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('not.have.attr', "readonly")
            getByTestId('rdonly-stng-sngl-tgl').click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "readonly")
        } else {
            getByTestId('rdonly-stng-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.valid.readonly).to.be.equal(true)
            })
            getByTestId('rdonly-stng-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.valid.readonly || false).to.be.equal(false)
            })
            getByTestId('rdonly-stng-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.valid.readonly).to.be.equal(true)
            })
        }
    })
}



export function disabledFieldTest(isInput = true) {
    it("Disabled Field Test", () => {
        if (isInput) {
            getByTestId('fld-dsbl-stng-sngl-tgl').click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "disabled")
            getByTestId('fld-dsbl-stng-sngl-tgl').click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('not.have.attr', "disabled")
            getByTestId('fld-dsbl-stng-sngl-tgl').click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "disabled")
        } else {
            getByTestId('fld-dsbl-stng-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.valid.disabled).to.be.equal(true)
            })
            getByTestId('fld-dsbl-stng-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.valid.disabled || false).to.be.equal(false)
            })
            getByTestId('fld-dsbl-stng-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.valid.disabled).to.be.equal(true)
            })
        }

    })
}


export function autoFillTest() {
    it("Auto Fill Test", () => {
        getByTestId('ato-fil-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "autocomplete", "on")
        getByTestId('ato-fil-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('not.have.attr', "autocomplete")
        getByTestId('ato-fil-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', "autocomplete", "on")

    })
}

export function validateEntryUniqueTest() {
    it("Validate Entry Unique Test", () => {
        getByTestId('entryUnique-stng-sngl-tgl').click({ force: true })
        getByTestId('entryUnique-stng-sngl-tgl').click({ force: true })
        getByTestId('entryUnique-stng-sngl-tgl').click({ force: true })

    })
}

export function validateUserUniqueTest() {
    it("Validate User Unique Test", () => {
        getByTestId('userUnique-stng-sngl-tgl').click({ force: true })
        getByTestId('userUnique-stng-sngl-tgl').click({ force: true })
        getByTestId('userUnique-stng-sngl-tgl').click({ force: true })

    })
}

export function numberTest(minValue = "2", maxValue = "20") {
    it("Number Test", () => {
        getByTestId('nmbr-stng-smpl-acrdn').click({ force: true })
        getByTestId('nmbr-stng-min-inp').clear({ force: true }).type(minValue, { force: true })
        getByTestId('nmbr-stng-max-inp').clear({ force: true }).type(maxValue, { force: true })
    })
}

export function editOptionTest(fieldType = "select") {
    it("Edit Option Test", () => {
        getByTestId('edt-opt-stng').click({ force: true })
        getByTestId('add-mor-cmp-btn').click({ force: true })
        getByTestId('add-mor-cmp-btn').click({ force: true })
        getByTestId('add-mor-cmp-btn').click({ force: true })
        getByTestId('mdl-cls-btn').click({ force: true })

        switch (fieldType) {
            case "select":
                cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}'] option`).should('have.length', 6);
                break;
            case "check":
            case "radio":
                cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-cw']`).should('have.length', 6);
                break;

        }

    })
}

export function roundedTest(isSelected = true) {
    it("Rounded Option Test", () => {
        if (isSelected) {
            console.log("radio =", cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-bx']`).eq(0))
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-bx']`).should('have.css', 'border-radius', '50%')
            getByTestId('rnd-stng-sngl-tgl').click({ force: true })
        }
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-bx']`).should('have.css', 'border-radius', '5px')
        getByTestId('rnd-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-bx']`).should('have.css', 'border-radius', '50%')
    })
}

export function optionColumnTest(coloumnNo = 2) {
    it("Edit Option Test", () => {
        getByTestId('opt-clm-stng-smpl-acrdn').click({ force: true })
        getByTestId('nam-stng-inp').clear({ force: true }).type(coloumnNo, { force: true })
    })
}

export function minimumCheckTest(minCheck = '1') {
    it("Minimum Check Test", () => {
        getByTestId('mnmm-stng-smpl-acrdn').click({ force: true })
        getByTestId('mnmm-stng-inp').clear({ force: true }).type(minCheck, { force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.mn).to.be.equal(minCheck)
        })
    })
}

export function maximumCheckTest(maxCheck = '2') {
    it("Maximum Check Test", () => {
        getByTestId('mxmm-stng-smpl-acrdn').click({ force: true })
        getByTestId('mxmm-stng-inp').clear({ force: true }).type(maxCheck, { force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.mx).to.be.equal(maxCheck)
        })
    })
}

export function showSelectedOptImgTest(isSelected = true, fieldType = 'country') {
    it("Show Selected Option Image Test", () => {
        const imgSelector = fieldType === 'dropdown' ? `[data-dev-selected-opt-img='${cy.fieldKey}']` : `[data-dev-selected-${fieldType}-img='${cy.fieldKey}']`
        if (isSelected) {
            getByTestId('shw-slctd-img-stng-sngl-tgl').click({ force: true })
        }
        cy.getIFrameBody().find(imgSelector).should('not.exist')

        getByTestId('shw-slctd-img-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(imgSelector).should('exist')
    })
}

export function selectedOptClearableTest(isSelected = true) {
    it("Selected Option Clearable Test", () => {

        if (isSelected) {
            getByTestId('slctd-clrbl-stng-sngl-tgl').click({ force: true })
        }
        cy.window().then(win => {
            expect(win.selectedFieldData.config.selectedOptClearable || win.selectedFieldData.config.selectedCountryClearable || win.selectedFieldData.config.selectedCurrencyClearable || false).to.be.equal(false)
        })

        getByTestId('slctd-clrbl-stng-sngl-tgl').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.config.selectedOptClearable || win.selectedFieldData.config.selectedCountryClearable || win.selectedFieldData.config.selectedCurrencyClearable).to.be.equal(true)
        })
    })
}

export function optionSerarchClearableTest(isSelected = true) {
    it("Option Search Clearable Test", () => {

        if (isSelected) {
            getByTestId('srch-clrbl-stng-sngl-tgl').click({ force: true })
        }
        cy.window().then(win => {
            expect(win.selectedFieldData.config.searchClearable).to.be.equal(false)
        })

        getByTestId('srch-clrbl-stng-sngl-tgl').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.config.searchClearable).to.be.equal(true)
        })
    })
}

export function optionIconTest(isSelected = true) {
    it("Option Icon Test", () => {

        if (isSelected) {
            getByTestId('opt-icn-stng-sngl-tgl').click({ force: true })
        }
        cy.window().then(win => {
            expect(win.selectedFieldData.config.optionIcon || win.selectedFieldData.config.optionFlagImage).to.be.equal(false)
        })

        getByTestId('opt-icn-stng-sngl-tgl').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.config.optionIcon || win.selectedFieldData.config.optionFlagImage).to.be.equal(true)
        })
    })
}

export function allowCustomOptionTest(isSelected = false) {
    it("Allow Custom Option Test", () => {

        if (isSelected) {
            getByTestId('alw-cstm-opt-stng-sngl-tgl').click({ force: true })
        }
        cy.window().then(win => {
            expect(win.selectedFieldData.config.allowCustomOption).to.be.equal(false)
        })

        getByTestId('alw-cstm-opt-stng-sngl-tgl').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.config.allowCustomOption).to.be.equal(true)
        })
    })
}

export function multipleSelectTest(isSelected = true) {
    it("Allow Multiple Select Test", () => {

        if (isSelected) {
            getByTestId('mltpl-slct-stng-sngl-tgl').click({ force: true })
        }
        cy.window().then(win => {
            expect(win.selectedFieldData.config.multipleSelect).to.be.equal(false)
        })

        getByTestId('mltpl-slct-stng-sngl-tgl').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.config.multipleSelect).to.be.equal(true)
        })
    })
}

export function closeOnSelectTest(isSelected = false) {
    it("Close On Select Test", () => {

        if (isSelected) {
            getByTestId('cls-on-slct-stng-sngl-tgl').click({ force: true })
        }
        cy.window().then(win => {
            expect(win.selectedFieldData.config.closeOnSelect).to.be.equal(false)
        })

        getByTestId('cls-on-slct-stng-sngl-tgl').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.config.closeOnSelect).to.be.equal(true)
        })
    })
}

export function listAndOptionsTest(listName = "list-name-test",) {
    it("List And Options Test", () => {
        getByTestId('ad-opt-lst-btn').click({ force: true })
        getByTestId('ad-opt-lst-btn').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.optionsList.length).to.be.equal(3)
        })

        cy.window().then(win => {
            expect(win.selectedFieldData.config.activeList).to.be.equal(0)
        })
        getByTestId('lst-opt-1-chk').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.config.activeList).to.be.equal(1)
        })

        getByTestId('lst-name-inp-1').clear({ force: true }).type(listName, { force: true })
        cy.window().then(win => {
            expect(Object.keys(win.selectedFieldData.optionsList[1])[0]).to.be.equal(listName)
        })

        cy.window().then(win => {
            expect(win.selectedFieldData.optionsList[1][listName].length).to.be.equal(3)
        })
        getByTestId('lst-opt-edt-btn-1').click({ force: true })
        getByTestId('add-mor-cmp-btn').click({ force: true })
        getByTestId('add-mor-cmp-btn').click({ force: true })
        getByTestId('mdl-cls-btn').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.optionsList[1][listName].length).to.be.equal(5)
        })

        getByTestId('lst-opt-del-btn-2').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.optionsList.length).to.be.equal(2)
        })

    })
}

export function allowMultipleTest(multiple = true, minFile = "1", maxFile = '3') {
    it("Allow Multiple File Test", () => {
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-fil-upld-inp']`).should('have.attr', 'multiple');
        getByTestId('alw-mltpl-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-fil-upld-inp']`).should('not.have.attr', 'multiple');

        if (multiple) {
            getByTestId('alw-mltpl-stng-sngl-tgl').click({ force: true })
            cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}-fil-upld-inp']`).should('have.attr', 'multiple');

            getByTestId('alw-mltpl-min-inp').clear({ force: true }).type(minFile, { force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.config.minFile).to.be.equal(minFile)
            })
            getByTestId('alw-mltpl-max-inp').clear({ force: true }).type(maxFile, { force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.config.maxFile).to.be.equal(maxFile)
            })
        }
    })
}

export function fileSelectStatusTest(status = "File Select Status Test") {
    it("File Select Status Test", () => {
        getByTestId('fil-slct-stts-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-dev-file-select-status='${cy.fieldKey}']`).should('not.exist');

        getByTestId('fil-slct-stts-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-dev-file-select-status='${cy.fieldKey}']`).should('exist').and('have.text', 'No File Selected');

        getByTestId('fil-slct-stts-inp').clear({ force: true }).type(status, { force: true })
        cy.getIFrameBody().find(`[data-dev-file-select-status='${cy.fieldKey}']`).should('have.text', status);
    })
}

export function showMaximumFileSizeTest(show = true) {
    it("Show Maximum File Size Test", () => {
        getByTestId('shw-mxmm-siz-stng-sngl-tgl').click({ force: true })
        cy.getIFrameBody().find(`[data-dev-max-size-lbl='${cy.fieldKey}']`).should('not.exist');

        if (show) {
            getByTestId('shw-mxmm-siz-stng-sngl-tgl').click({ force: true })
            cy.getIFrameBody().find(`[data-dev-max-size-lbl='${cy.fieldKey}']`).should('exist');
        }
    })
}

export function maximumUploadSizeTest(mxmmSize = "500", sizeUnit = "KB", isTotal = true) {
    it("Maximum Upload Size Test", () => {

        getByTestId('mxmm-upld-siz-input').clear({ force: true }).type(mxmmSize, { force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.config.maxSize).to.be.equal(mxmmSize)
        })

        getByTestId('mxmm-upld-siz-unit-select').select(sizeUnit)
        cy.window().then(win => {
            expect(win.selectedFieldData.config.sizeUnit).to.be.equal(sizeUnit)
        })

        if (isTotal) {
            getByTestId('ttl-mxmm-siz-chk-mini').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.config.isItTotalMax).to.be.equal(isTotal)
            })
        } else {
            cy.window().then(win => {
                expect(win.selectedFieldData.config.isItTotalMax).to.be.equal(isTotal)
            })
        }
    })
}

export function showFileListTest(show = true, showFilePreview = true, showFileSize = true) {
    it("Show File List Test", () => {
        getByTestId('shw-fil-lst-stng-sngl-tgl').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.config.showFileList).to.be.equal(false)
        })

        if (show) {
            getByTestId('shw-fil-lst-stng-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.config.showFileList).to.be.equal(true)
            })

            getByTestId('shw-fil-prvw-chk-mini').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.config.showFilePreview).to.be.equal(false)
            })

            if (showFilePreview) {
                getByTestId('shw-fil-prvw-chk-mini').click({ force: true })
                cy.window().then(win => {
                    expect(win.selectedFieldData.config.showFilePreview).to.be.equal(true)
                })
            }

            getByTestId('shw-fil-siz-chk-mini').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.config.showFileSize).to.be.equal(false)
            })

            if (showFileSize) {
                getByTestId('shw-fil-siz-chk-mini').click({ force: true })
                cy.window().then(win => {
                    expect(win.selectedFieldData.config.showFileSize).to.be.equal(true)
                })
            }

        }
    })
}

export function detectCountryByIpTest(select = true) {
    it("Detect Country By IP Test", () => {
        getByTestId('dtct-cntry-by-ip-stng-sngl-tgl').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.config.detectCountryByIp).to.be.equal(true)
        })
        getByTestId('dtct-cntry-by-ip-stng-sngl-tgl').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.config.detectCountryByIp).to.be.equal(false)
        })

        if (select) {
            getByTestId('dtct-cntry-by-ip-stng-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.config.detectCountryByIp).to.be.equal(select)
            })
        }
    })
}

export function detectCountryByGeoTest(select = true) {
    it("Detect Country By GEO Test", () => {
        getByTestId('dtct-cntry-by-geo-stng-sngl-tgl').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.config.detectCountryByGeo).to.be.equal(true)
        })
        getByTestId('dtct-cntry-by-geo-stng-sngl-tgl').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.config.detectCountryByGeo).to.be.equal(false)
        })

        if (select) {
            getByTestId('dtct-cntry-by-geo-stng-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.config.detectCountryByGeo).to.be.equal(select)
            })
        }
    })
}

export function countryNotFoundLabelTest(text = "No Country Found by Test") {
    it("Country Not Found Text Test", () => {
        getByTestId('cntry-nt-fund-stng-smpl-acrdn').click({ force: true })
        getByTestId('cntry-nt-fund-inp').clear({ force: true }).type(text, { force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.config.noCountryFoundText || win.selectedFieldData.config.noCurrencyFoundText).to.be.equal(text)
        })
    })
}

export function checkedValueTest(value = 'Checked') {
    it("Checked Value Test", () => {
        getByTestId('chek-val-inp').clear({ force: true }).type(value, { force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.msg.checked).to.be.equal(value)
        })
    })
}

export function uncheckdValueTest(value = 'Unchecked Value') {
    it("Unchecked Value Test", () => {

        getByTestId('unchek-val-inp').clear({ force: true }).type(value, { force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.msg.unchecked).to.be.equal(value)
        })
    })
}

export function checkedByDefaultTest(isChecked = false, check = true) {
    it("Checked By Default Test", () => {
        if (isChecked) {
            getByTestId('chek-by-dflt-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.valid.checked || false).to.be.equal(false)
            })
        }
        getByTestId('chek-by-dflt-sngl-tgl').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.valid.checked).to.be.equal(true)
        })

        getByTestId('chek-by-dflt-sngl-tgl').click({ force: true })
        cy.window().then(win => {
            expect(win.selectedFieldData.valid.checked || false).to.be.equal(false)
        })

        if (check) {
            getByTestId('chek-by-dflt-sngl-tgl').click({ force: true })
            cy.window().then(win => {
                expect(win.selectedFieldData.valid.checked).to.be.equal(check)
            })
        }
    })
}

export function recaptchaThemeTest(theme="dark"){
    it("Recaptcha Theme Test", ()=> {
        getByTestId('thm-slct').select(theme)

        cy.window().then(win => {
            expect(win.selectedFieldData.config.theme).to.be.equal(theme)
        })
    })
}

export function recaptchaSizeTest(size="compact"){
    it("Recaptcha Size Test", ()=> {
        getByTestId('siz-slct').select(size)

        cy.window().then(win => {
            expect(win.selectedFieldData.config.size).to.be.equal(size)
        })
    })
}

export function positionAlignment(position = "center"){
    it("Position Alignment Test", ()=> {
        getByTestId('left-tab').click({force: true})
        cy.getIFrameBody().find(`[data-dev-fld-wrp='${cy.fieldKey}']`).should('have.css', 'justify-content', 'left').and('have.css','display','flex')

        getByTestId('center-tab').click({force: true})
        cy.getIFrameBody().find(`[data-dev-fld-wrp='${cy.fieldKey}']`).should('have.css', 'justify-content', 'center').and('have.css','display','flex')

        getByTestId('right-tab').click({force: true})
        cy.getIFrameBody().find(`[data-dev-fld-wrp='${cy.fieldKey}']`).should('have.css', 'justify-content', 'right').and('have.css','display','flex')

        getByTestId(position+'-tab').click({force: true})
        cy.getIFrameBody().find(`[data-dev-fld-wrp='${cy.fieldKey}']`).should('have.css', 'justify-content', position).and('have.css','display','flex')
    })
}

export function buttonAlignTest(position = "center"){
    it("Button Align Test", ()=> {
        getByTestId('btn-algn-slct').select('start')
        cy.getIFrameBody().find(`[data-dev-fld-wrp='${cy.fieldKey}']`).should('have.css', 'align-items', 'start').and('have.css','display','flex')

        getByTestId('btn-algn-slct').select('center')
        cy.getIFrameBody().find(`[data-dev-fld-wrp='${cy.fieldKey}']`).should('have.css', 'align-items', 'center').and('have.css','display','flex')

        getByTestId('btn-algn-slct').select('end')
        cy.getIFrameBody().find(`[data-dev-fld-wrp='${cy.fieldKey}']`).should('have.css', 'align-items', 'end').and('have.css','display','flex')

        getByTestId('btn-algn-slct').select(position)
        cy.getIFrameBody().find(`[data-dev-fld-wrp='${cy.fieldKey}']`).should('have.css', 'align-items', position).and('have.css','display','flex')
    })
}


export function buttonTypeTest(btnType = "button"){
    it("Button Type Test", ()=> {
        getByTestId('btn-typ-slct').select('reset')
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', 'type', 'reset')

        getByTestId('btn-typ-slct').select('button')
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', 'type', 'button')

        getByTestId('btn-typ-slct').select(btnType)
        cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.attr', 'type', btnType)

    })
}

export function fullWidthButton(){
    it("Full Width Button Test", () => {
        getByTestId('ful-wid-btn-sngl-tgl').click({force: true})
        // cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('not.have.css', 'width', '100%')

        getByTestId('ful-wid-btn-sngl-tgl').click({force: true})
        // cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('have.css', 'width', 'auto')

        getByTestId('ful-wid-btn-sngl-tgl').click({force: true})
        // cy.getIFrameBody().find(`[data-testid='${cy.fieldKey}']`).should('not.have.css', 'width', '100%')
    })
}
