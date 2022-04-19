/* eslint-disable import/prefer-default-export */
export const getElementTitle = (element) => {
  switch (element) {
    case 'quick-tweaks': return 'Quick Tweaks'
    case 'fld-wrp': return 'Field Container'
    case 'lbl-wrp': return 'Label & Subtitle Container'
    case 'lbl': return 'Label Container'
    case 'lbl-pre-i': return 'Label Prefix Icon'
    case 'lbl-suf-i': return 'Label Suffix Icon'
    case 'sub-titl': return 'Subtitle Container'
    case 'sub-titl-pre-i': return 'Subtitle Prefix Icon'
    case 'sub-titl-suf-i': return 'Subtitle Suffix Icon'

    case 'fld':
    case 'file-up-wrpr': return 'Input Container'

    case 'pre-i': return 'Field Prefix Icon'
    case 'suf-i': return 'Field Suffix Icon'
    case 'hlp-txt': return 'Helper Text Container'
    case 'hlp-txt-pre-i': return 'Helper Text Prefix Icon'
    case 'hlp-txt-suf-i': return 'Helper Text Suffix Icon'
    case 'err-msg': return 'Error Messages Container'

    case 'currency-fld-wrp':
    case 'dpd-fld-wrp':
    case 'country-fld-wrp': return 'Field Wrapper'

    case 'cc': return 'Check Container'
    case 'ck': return 'Check Box Icon'
    case 'cw': return 'Check Wrapper'
    case 'cl': return 'Option Wrapper'
    case 'rdo': return 'Radio Box'
    case 'slct-optn': return 'Select Options'
    case 'slct-opt-grp': return 'Select Options Group'
    case 'selected-opt-img': return 'Selected Option Image'
    case 'selected-opt-clear-btn': return 'Selected Option Clear Button'
    case 'opt-search-wrp': return 'Option Search Wrapper'
    case 'opt-search-input': return 'Option Search Input'
    case 'opt-search-icn': return 'Option Search Icon'
    case 'search-clear-btn': return 'Search Clear Button'
    case 'opt-lbl-wrp': return 'Option Label Wrapper'
    case 'option': return 'Option'
    case 'opt-icn': return 'Option Icon'

    case 'ct':
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
    case 'inp-clr-btn': return 'Selected Clear Button'
    case 'input-clear-btn': return 'Input Clear Button'

    case 'selected-currency-img':
    case 'selected-country-img': return 'Selected Image'

    case 'opt-prefix': return 'Option Prefix'
    case 'opt-suffix': return 'Option Suffix'
    default:
      break
  }
}
