import { getByTestId } from "../common-functions"

export function clickThemeQuickTweaksNav() {
    getByTestId('quick-tweaks-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/quick-tweaks')
}

export function clickFormWrapperNav() {
    getByTestId('_frm-bg-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/_frm-bg')
}

export function clickFormContainerNav() {
    getByTestId('_frm-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/_frm')
}

export function clickFieldContainersNav() {
    getByTestId('field-containers-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/field-containers')
}

export function clickLabelContainersNav() {
    getByTestId('label-containers-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/label-containers')
}

export function clickLabelAccordion() {
    getByTestId('labels-acc').click({ force: true })
    cy.url().should('contain', '/theme-customize/lbl')
}

export function clickLabelPreIconNav() {
    getByTestId('lbl-pre-i-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/lbl-pre-i')
}

export function clickLabelSufIconNav() {
    getByTestId('lbl-suf-i-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/lbl-suf-i')
}

export function clickLabelAsteriskIconNav() {
    getByTestId('req-smbl-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/req-smbl')
}

export function clickSubTitleAccordion() {
    getByTestId('sub-titles-acc').click({ force: true })
    cy.url().should('contain', '/theme-customize/sub-titl')
}

export function clickSubTitlePreIconNav() {
    getByTestId('sub-titl-pre-i-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/sub-titl-pre-i')
}

export function clickSubTitleSufIconNav() {
    getByTestId('sub-titl-suf-i-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/sub-titl-suf-i')
}

export function clickInputsAccordion() {
    getByTestId('inputs-acc').click({ force: true })
    cy.url().should('contain', '/theme-customize/pre-i')
}

export function clickInputsPreIconNav() {
    getByTestId('pre-i-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/pre-i')
}

export function clickInputsSufIconNav() {
    getByTestId('suf-i-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/suf-i')
}

export function clickHelperTextAccordion() {
    getByTestId('helper-texts-acc').click({ force: true })
    cy.url().should('contain', '/theme-customize/hlp-txt')
}

export function clickHelperTextPreIconNav() {
    getByTestId('hlp-txt-pre-i-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/hlp-txt-pre-i')
}

export function clickHelperTextSufIconNav() {
    getByTestId('hlp-txt-suf-i-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/hlp-txt-suf-i')
}

export function clickErrorMessageAccordion() {
    getByTestId('error-messages-acc').click({ force: true })
    cy.url().should('contain', '/theme-customize/err-msg')
}

export function clickErrMsgPreIconNav() {
    getByTestId('err-txt-pre-i-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/err-txt-pre-i')
}

export function clickErrMsgSufIconNav() {
    getByTestId('err-txt-suf-i-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/err-txt-suf-i')
}

export function clickButtonsAccordion() {
    getByTestId('buttons-acc').click({ force: true })
    cy.url().should('contain', '/theme-customize/btn')
}

export function clickButtonPreIconNav() {
    getByTestId('btn-pre-i-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/btn-pre-i')
}

export function clickButtonSufIconNav() {
    getByTestId('btn-suf-i-nav').click({ force: true })
    cy.url().should('contain', '/theme-customize/btn-suf-i')
}


export function hoverOnFormWrapperHighlighter() {
    cy.get('[data-testid="_frm-bg-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnFormContainerHighlighter() {
    cy.get('[data-testid="_frm-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnFieldContainersHighlighter() {
    cy.get('[data-testid="field-containers-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnLabelContainersHighlighter() {
    cy.get('[data-testid="label-containers-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnLabelsHighlighter() {
    cy.get('[data-testid="labels-acc-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnLabelPreIconHighlighter() {
    cy.get('[data-testid="lbl-pre-i-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnLabelSufIconHighlighter() {
    cy.get('[data-testid="lbl-suf-i-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnLabelAsteriskIconHighlighter() {
    cy.get('[data-testid="req-smbl-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnSubTitlesHighlighter() {
    cy.get('[data-testid="sub-titles-acc-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnSubTitlePreIconHighlighter() {
    cy.get('[data-testid="sub-titl-pre-i-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnSubTitleSufIconHighlighter() {
    cy.get('[data-testid="sub-titl-suf-i-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnInputsHighlighter() {
    cy.get('[data-testid="inputs-acc-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnInputPreIconHighlighter() {
    cy.get('[data-testid="pre-i-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnInputSufIconHighlighter() {
    cy.get('[data-testid="suf-i-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnHelperTextHighlighter() {
    cy.get('[data-testid="helper-texts-acc-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnHelperTextPreIconHighlighter() {
    cy.get('[data-testid="hlp-txt-pre-i-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnHelperTextSufIconHighlighter() {
    cy.get('[data-testid="hlp-txt-suf-i-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnErrorMessageHighlighter() {
    cy.get('[data-testid="error-messages-acc-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnErrMsgPreIconHighlighter() {
    cy.get('[data-testid="err-txt-pre-i-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnErrMsgSufIconHighlighter() {
    cy.get('[data-testid="err-txt-suf-i-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnButtonsHighlighter() {
    cy.get('[data-testid="buttons-acc-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnButtonPreIcnHighlighter() {
    cy.get('[data-testid="btn-pre-i-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}

export function hoverOnButtonSufIcnHighlighter() {
    cy.get('[data-testid="btn-suf-i-nav-focus"]').invoke('show').trigger('mouseover',{force: true})
}