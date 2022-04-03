/* eslint-disable import/prefer-default-export */
export const getElementTitle = (element) => {
  switch (element) {
    case 'quick-tweaks': return 'Quick Tweaks'
    case 'field-container': return 'Field Container'
    case 'label-subtitle-container': return 'Label & Subtitle Container'
    case 'label': return 'Label Container'
    case 'lbl-pre-i': return 'Label Prefix Icon'
    case 'lbl-suf-i': return 'Label Suffix Icon'
    case 'subtitle': return 'Subtitle Container'
    case 'sub-titl-pre-i': return 'Subtitle Prefix Icon'
    case 'sub-titl-suf-i': return 'Subtitle Suffix Icon'

    case 'fld':
    case 'file-up-wrpr': return 'Input Container'

    case 'pre-i': return 'Field Prefix Icon'
    case 'suf-i': return 'Field Suffix Icon'
    case 'helper-text': return 'Helper Text Container'
    case 'hlp-txt-pre-i': return 'Helper Text Prefix Icon'
    case 'hlp-txt-suf-i': return 'Helper Text Suffix Icon'
    case 'error-message': return 'Error Messages Container'

    case 'currency-fld-wrp':
    case 'dpd-fld-wrp':
    case 'country-fld-wrp': return 'Field Wrapper'

    case 'check-container': return 'Check Container'
    case 'check-box': return 'Check Box Icon'
    case 'check-wrapper': return 'Check Wrapper'
    case 'option-wrapper': return 'Option Wrapper'
    case 'radio-box': return 'Radio Box'
    case 'slct-optn': return 'Select Options'
    case 'slct-opt-grp': return 'Select Options Group'
    case 'selected-opt-img': return 'Selected Option Image'
    case 'selected-opt-clear-btn': return 'Selected Option Clear Button'
    case 'opt-search-input': return 'Option Search Input'
    case 'opt-search-icn': return 'Option Search Icon'
    case 'search-clear-btn': return 'Search Clear Button'

    case 'currency-option':
    case 'phone-option':
    case 'option': return 'Option'

    case 'currency-option-icn':
    case 'phone-option-icn':
    case 'opt-icn': return 'Option Icon'

    case 'option-label':
    case 'currency-option-lbl':
    case 'phone-option-lbl':
    case 'opt-lbl': return 'Option Label'

    case 'inp-btn': return 'Input Button'
    case 'btn-txt': return 'Button Text'
    case 'file-select-status': return 'File Select Status'
    case 'max-size-lbl': return 'Max Size Label'
    case 'files-list': return 'Files List'
    case 'file-wrpr': return 'File Wrapper'
    case 'file-preview': return 'File Preview'
    case 'file-title': return 'File Title'
    case 'file-size': return 'File Size'
    case 'cross-btn': return 'Cross Button'
    case 'selected-country-clear-btn': return 'Selected Clear Button'
    case 'input-clear-btn': return 'Input Clear Button'

    case 'selected-currency-img':
    case 'selected-country-img': return 'Selected Image'

    case 'phone-option-prefix':
    case 'currency-option-suf': return 'Option Prefix'
    default:
      break
  }
}