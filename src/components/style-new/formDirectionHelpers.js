import produce from 'immer'
import { isObjectEmpty } from '../../Utils/Helpers'

export const changeFormStylesDir = (style, dir) => produce(style, drft => {
  const fieldsKeysArr = Object.keys(drft.fields)
  const fieldsKeysArrLen = fieldsKeysArr.length
  for (let i = 0; i < fieldsKeysArrLen; i += 1) {
    const fieldKey = fieldsKeysArr[i]
    if (Object.hasOwnProperty.call(drft.fields, fieldKey)) {
      if (drft.fields[fieldKey].overrideGlobalTheme.length === 0) {
        handleFormDirStyleToggle(drft, fieldKey, dir)
      }
    }
  }
})

const handleFormDirStyleToggle = (style, fieldKey, dir) => {
  if (style.theme === 'bitformDefault') {
    const { classes = {}, fieldType = '' } = style.fields[fieldKey]
    if (isObjectEmpty(classes)) return
    switch (fieldType) {
      case 'check':
      case 'radio':
      case 'decision-box': {
        const checkBx = classes?.[`.${fieldKey}-bx`]
        if (checkBx) checkBx.margin = switchXSpacing(checkBx.margin)
        const otherInp = classes?.[`.${fieldKey}-other-inp`]
        if (otherInp) otherInp.margin = switchXSpacing(otherInp.margin)
        break
      }
      case 'country':
      case 'currency':
      case 'phone-number': {
        const countrySelectedCountryImg = classes?.[`.${fieldKey}-selected-country-img`]
        if (countrySelectedCountryImg) countrySelectedCountryImg.margin = switchXSpacing(countrySelectedCountryImg.margin)
        const currencySelectedCurrencyImg = classes?.[`.${fieldKey}-selected-currency-img`]
        if (currencySelectedCurrencyImg) currencySelectedCurrencyImg.margin = switchXSpacing(currencySelectedCurrencyImg.margin)
        const countryOptIcn = classes?.[`.${fieldKey}-option-list .opt-icn`]
        if (countryOptIcn) countryOptIcn.margin = switchXSpacing(countryOptIcn.margin)
        const currencyAmountInput = classes?.[`.${fieldKey}-currency-amount-input`]
        if (currencyAmountInput) currencyAmountInput.padding = switchXSpacing(currencyAmountInput.padding)
        const phoneNumberInput = classes?.[`.${fieldKey}-phone-number-input`]
        if (phoneNumberInput) phoneNumberInput.padding = switchXSpacing(phoneNumberInput.padding)
        const countryOptSearchInput = classes?.[`.${fieldKey}-opt-search-input`]
        if (countryOptSearchInput) switchXPadding(countryOptSearchInput, dir === 'rtl' ? 'right' : 'left', '41px')
        const countryOptSearchIcn = classes?.[`.${fieldKey}-opt-search-icn`]
        if (countryOptSearchIcn) switchXPositions(countryOptSearchIcn, dir === 'rtl' ? 'right' : 'left', '13px')
        const countrySearchClearBtn = classes?.[`.${fieldKey}-search-clear-btn`]
        if (countrySearchClearBtn) switchXPositions(countrySearchClearBtn, dir === 'rtl' ? 'left' : 'right', '6px')
        const countryInputClearBtn = classes?.[`.${fieldKey}-input-clear-btn`]
        if (countryInputClearBtn) switchXPositions(countryInputClearBtn, dir === 'rtl' ? 'left' : 'right', '6px')
        break
      }
      case 'select': {
        const selectOptSearchIcn = classes?.[`.${fieldKey}-opt-search-icn`]
        if (selectOptSearchIcn) switchXPositions(selectOptSearchIcn, dir === 'rtl' ? 'right' : 'left', '11px')
        const searchClearBtn = classes?.[`.${fieldKey}-search-clear-btn`]
        if (searchClearBtn) switchXPositions(searchClearBtn, dir === 'rtl' ? 'left' : 'right', '8px')
        break
      }
      case 'button': {
        const btnFldWrp = classes?.[`.${fieldKey}-fld-wrp`]
        if (btnFldWrp) btnFldWrp['justify-content'] = switchFlexContent(btnFldWrp['justify-content'])
        break
      }
      default:
        break
    }
  }
}

const switchXSpacing = spacing => {
  if (!spacing) return spacing
  const newSpacing = spacing.replace(/\s+/g, ' ')
  const extracted = newSpacing.split(' ')
  if (extracted.length < 4) return spacing
  const [spacingTop, spacingRight, spacingBottom, spacingLeft, ...rest] = extracted
  return [spacingTop, spacingLeft, spacingBottom, spacingRight].join(' ') + (rest.length ? ` ${rest.join(' ')}` : '')
}

const switchXPositions = (draft, positionName, defaultStl) => {
  if (positionName === 'left') {
    draft.left = draft.right || defaultStl
    delete draft.right
    return
  }
  draft.right = draft.left || defaultStl
  delete draft.left
}

const switchXPadding = (draft, positionName, defaultStl) => {
  if (positionName === 'left') {
    draft['padding-left'] = draft['padding-right'] || defaultStl
    delete draft['padding-right']
    return
  }
  draft['padding-right'] = draft['padding-left'] || defaultStl
  delete draft['padding-left']
}

const switchFlexContent = justifyCont => {
  if (!justifyCont) return justifyCont
  if (justifyCont === 'flex-start') return 'flex-end'
  if (justifyCont === 'flex-end') return 'flex-start'
  if (justifyCont === 'start') return 'end'
  if (justifyCont === 'end') return 'start'
  return justifyCont
}

export const changeFormThemeVarsDir = (themeVars, dir) => produce(themeVars, draftThemeVars => {
  draftThemeVars['--dir'] = dir
  if ('--lbl-pre-i-m' in draftThemeVars) draftThemeVars['--lbl-pre-i-m'] = switchXSpacing(draftThemeVars['--lbl-pre-i-m'])
  if ('--lbl-suf-i-m' in draftThemeVars) draftThemeVars['--lbl-suf-i-m'] = switchXSpacing(draftThemeVars['--lbl-suf-i-m'])
  if ('--sub-titl-pre-i-m' in draftThemeVars) draftThemeVars['--sub-titl-pre-i-m'] = switchXSpacing(draftThemeVars['--sub-titl-pre-i-m'])
  if ('--sub-titl-suf-i-m' in draftThemeVars) draftThemeVars['--sub-titl-suf-i-m'] = switchXSpacing(draftThemeVars['--sub-titl-suf-i-m'])
  if ('--hlp-txt-pre-i-m' in draftThemeVars) draftThemeVars['--hlp-txt-pre-i-m'] = switchXSpacing(draftThemeVars['--hlp-txt-pre-i-m'])
  if ('--hlp-txt-suf-i-m' in draftThemeVars) draftThemeVars['--hlp-txt-suf-i-m'] = switchXSpacing(draftThemeVars['--hlp-txt-suf-i-m'])
  if ('--err-txt-pre-i-m' in draftThemeVars) draftThemeVars['--err-txt-pre-i-m'] = switchXSpacing(draftThemeVars['--err-txt-pre-i-m'])
  if ('--err-txt-suf-i-m' in draftThemeVars) draftThemeVars['--err-txt-suf-i-m'] = switchXSpacing(draftThemeVars['--err-txt-suf-i-m'])
})
