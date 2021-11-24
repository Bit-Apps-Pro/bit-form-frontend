import produce from 'immer'
import { atom, selector, selectorFamily } from 'recoil'
import { getFormsByPhpVar, getNewFormId, getNewId, makeFieldsArrByLabel } from './Utils/Helpers'

// atoms
// eslint-disable-next-line no-undef
export const $bits = atom({ key: '$bits', default: typeof bits !== 'undefined' ? bits : {} })
export const $formId = atom({ key: '$formId', default: 0 })
export const $forms = atom({ key: '$forms', default: getFormsByPhpVar(), dangerouslyAllowMutability: true })
export const $reports = atom({ key: '$reports', default: [], dangerouslyAllowMutability: true })
export const $fields = atom({ key: '$fields', default: [], dangerouslyAllowMutability: true })
export const $layouts = atom({ key: '$layouts', default: { lg: [], md: [], sm: [] }, dangerouslyAllowMutability: true })
export const $fieldLabels = atom({ key: '$fieldLabels', default: [], dangerouslyAllowMutability: true })
export const $selectedFieldId = atom({ key: '$selectedFieldId', default: null })
export const $draggingField = atom({ key: '$draggingField', default: null })
export const $breakpoint = atom({ key: '$breakpoint', default: 'lg' })
export const $breakpointSize = atom({ key: '$breakpointSize', default: { lg: 1024, md: 960, sm: 570 } })
export const $mailTemplates = atom({ key: '$mailTemplates', default: [], dangerouslyAllowMutability: true })
export const $additionalSettings = atom({ key: '$additionalSettings', default: { enabled: { validateFocusLost: true }, settings: {} } })
export const $workflows = atom({ key: '$workflows', default: [], dangerouslyAllowMutability: true })
export const $confirmations = atom({ key: '$confirmations', default: {}, dangerouslyAllowMutability: true })
export const $integrations = atom({ key: '$integrations', default: [], dangerouslyAllowMutability: true })
export const $formName = atom({ key: '$formName', default: 'Untitled Form' })
export const $updateBtn = atom({ key: '$updateBtn', default: { unsaved: false } })
export const $builderHistory = atom({ key: '$builderHistory', default: { histories: [{ event: 'reset', state: {} }], active: 0 } })
export const $draggableModal = atom({ key: '$draggableModal', default: { show: false, component: null, position: { x: 0, y: 0 }, width: 250 } })
export const $builderHelperStates = atom({ key: '$builderHelperStates', default: { respectLGLayoutOrder: true } })
export const $flags = atom({ key: '$flags', default: { saveStyle: true, styleMode: false } })
export const $isNewThemeStyleLoaded = atom({ key: '$isNewThemeStyleLoaded', default: false })
export const $builderHookStates = atom({ key: '$builderHookStates', default: { reCalculateFieldHeights: 0, reRenderGridLayoutByRootLay: 0, forceBuilderWidthToLG: 0 } })
export const $colorScheme = atom({ key: '$colorScheme', default: 'light' })
export const $lightThemeColors = atom({
  key: '$lightThemeColors',
  default: {
    '--global-primary-color': 'hsla(0, 10%, 20%, 100)', // primary color
    '--gph': 0, // global primary hue
    '--gps': 10, // global primary saturation
    '--gpl': 20, // global primary lightness
    '--gpa': 100, // global primary opacity
    '--global-font-color': 'hsla(0, 10%, 20%, 100)',
    '--gfh': 0, // global font color hue
    '--gfs': 10, // global fonst color sa
    '--gfl': 20,
    '--gfa': 100,
    '--global-bg-color': 'hsla(240, 100%, 97%, 100)', // background color
    '--gbg-h': 0,
    '--gbg-s': 10,
    '--gbg-l': 20,
    '--gbg-a': 100,
    '--global-fld-bdr-clr': 'hsla(0, 10%, 20%, 100)',
    '--global-fld-bg-color': 'var(--global-bg-color)', // field background color
  },
})
export const $darkThemeColors = atom({
  key: '$darkThemeColors',
  default: {
    '--global-primary-color': 'hsla(0, 10%, 20%, 100)', // primary color
    '--gph': 0, // global primary hue
    '--gps': 10, // global primary saturation
    '--gpl': 20, // global primary lightness
    '--gpa': 100, // global primary opacity
    '--global-font-color': 'hsla(0, 10%, 20%, 100)',
    '--gfh': 0, // global font color hue
    '--gfs': 10, // global fonst color sa
    '--gfl': 20,
    '--gfa': 100,
    '--global-bg-color': 'hsla(240, 100%, 97%, 100)', // background color
    '--gbg-h': 0,
    '--gbg-s': 10,
    '--gbg-l': 20,
    '--gbg-a': 100,
    '--global-fld-bdr-clr': 'hsla(0, 10%, 20%, 100)',
    '--global-fld-bg-color': 'var(--global-bg-color)', // field background color
  },
})
export const $highContrastThemeColors = atom({
  key: '$highContrastThemeColors',
  default: {
    '--global-primary-color': 'hsla(0, 10%, 20%, 100)', // primary color
    '--gph': 0, // global primary hue
    '--gps': 10, // global primary saturation
    '--gpl': 20, // global primary lightness
    '--gpa': 100, // global primary opacity
    '--global-font-color': 'hsla(0, 10%, 20%, 100)',
    '--gfh': 0, // global font color hue
    '--gfs': 10, // global fonst color sa
    '--gfl': 20,
    '--gfa': 100,
    '--global-bg-color': 'hsla(240, 100%, 97%, 100)', // background color
    '--gbg-h': 0,
    '--gbg-s': 10,
    '--gbg-l': 20,
    '--gbg-a': 100,
    '--global-fld-bdr-clr': 'hsla(0, 10%, 20%, 100)',
    '--global-fld-bg-color': 'var(--global-bg-color)', // field background color
  },
})
export const $themeVars = atom({
  key: '$themeVars',
  default: {
    '--global-primary-color': 'hsla(0, 10%, 20%, 100)', // primary color
    '--gph': 0, // global primary hue
    '--gps': 10, // global primary saturation
    '--gpl': 20, // global primary lightness
    '--gpa': 100, // global primary opacity
    '--global-font-color': 'hsla(0, 10%, 20%, 100)',
    '--gfh': 0, // global font color hue
    '--gfs': 10, // global fonst color sa
    '--gfl': 20,
    '--gfa': 100,
    '--global-bg-color': 'hsla(240, 100%, 97%, 100)', // background color
    '--gbg-h': 0,
    '--gbg-s': 10,
    '--gbg-l': 20,
    '--gbg-a': 100,
    '--global-fld-bdr-clr': 'hsla(0, 10%, 20%, 100)', // border color
    // '--gfbc-h': 0,
    // '--gfbc-s': 10,
    // '--gfbc-l': 20,
    // '--gfbc-a': 100,
    '--global-fld-bg-color': 'var(--global-bg-color)', // field background color
    // '--global-fld-bg-color': 'hsla(215, 10%, 20%, 100)', // field background color
    // '--gfbg-h': 0,
    // '--gfbg-s': 10,
    // '--gfbg-l': 20,
    // '--gfbg-a': 100,
    '--g-bdr-rad': '11px', // border radius
    '--g-bdr-width': '1px', // border width
    '--dir': 'ltr', // direaction
    '--iw-width': '',
    '--lbl-al': '', // label align

    // '--fld-p': '', // field padding
    '--fld-m': '', // field margin
    '--fld-fs': '12px', // field font size

    '--fw-dis': '', // field wrapper display
    '--fw-fdir': '', // field wrapper flex direction
    '--fw-bg': 'hlsa(23,23,23,3)', // fieldwrapper background
    '--fw-b': '10px',
    '--fw-m': '', // field wrapper margin
    '--fw-p': '10px', // field wrapper paddin
    '--fw-sh': '1em 3px 5px 0rem blue inset', // field wrapper box shadow
    '--fw-bdr': 'solid red', // field wrapper border
    '--fw-bdr-width': '1px', // field wrapper border width
    '--fw-bdr-rad': '8px', // field wrapper border radius

    '--lw-sa': '',
    '--lw-width': '', // label wrapper  width
    '--lw-m': '', // label wrapper for margin
    '--lw-p': '', // label wrapper for padding
    '--lw-bg': '', // label wrapper for padding
    '--lw-c': '', // label wrapper for color
    '--lw-sh': '1em 3px 5px 0rem blue inset', // label wrapper box shadow
    '--lw-bdr': 'solid red', // label wrapper border
    '--lw-bdr-width': '1px', // label wrapper border width
    '--lw-bdr-rad': '8px', // label wrapper border radius

    '--fl-bg': 'hsla(0, 71%, 39%, 100)', // field label background color
    '--fl-c': 'hsla(0, 71%, 39%, 100)', // field babel color
    '--fl-m': '', // field label margin
    '--fl-p': '', // field label padding
    '--fl-fs': '16px', // field label font size
    '--fl-sh': '1em 3px 5px 0rem blue inset', // field label box shadow
    '--fl-bdr': 'solid red', // field label border
    '--fl-bdr-width': '1px', // field label border width
    '--fl-bdr-rad': '8px', // field label border radius

    '--st-bg': 'hsla(0, 71%, 39%, 100)', // sub title background color
    '--st-c': 'hsla(201, 71%, 39%, 100)', // sub title color
    '--st-m': '5px', // subtitle margin
    '--st-p': '5px', // subtitle padding
    '--st-al': '5px', // subtitle align
    '--st-fs': '12px', // subtitle font size
    '--st-sh': '1em 3px 5px 0rem blue inset', // subtitle box shadow
    '--st-bdr': 'solid red', // subtitle border
    '--st-bdr-width': '1px', // subtitle border width
    '--st-bdr-rad': '8px', // subtitle border radius

    '--ht-bg': 'hsla(0, 71%, 39%, 100)', // helper text background color
    '--ht-c': 'hsla(0, 71%, 39%, 100)', // helpertext color
    '--ht-m': '', // helper text margin
    '--ht-p': '', // hepler text padding
    '--ht-fs': '12px', // hepler text font size
    '--ht-al': '', // helper text align
    '--ht-sh': '1em 3px 5px 0rem blue inset', // hepler text box shadow
    '--ht-bdr': 'solid red', // hepler text border
    '--ht-bdr-width': '1px', // hepler text border width
    '--ht-bdr-rad': '8px', // hepler text border radius

    '--err-bg': 'hsla(210, 71%, 39%, 100)', // error messages background color
    '--err-c': 'hsla(215, 71%, 39%, 100)', // error messages text color
    '--err-m': '', // error messages margin
    '--err-p': '', // error messages padding
    '--err-sh': '1em 3px 5px 0rem blue inset', // error messages box shadow
    '--err-bdr': 'solid red', // error message border
    '--err-bdr-width': '1px', // error message border width
    '--err-bdr-rad': '8px', // error message border radius
  },
})
export const $tempThemeVars = atom({
  key: '$tempThemeVars',
  default: {},
})
export const $styles = atom({
  key: '$styles',
  default: {
    theme: 'bitformDefault',
    form: { _frm: { background: 'var(--global-bg-color)' } },
    fields: {},
  },
})

// selectors
export const $fieldsArr = selector({ key: '$fieldsArr', get: ({ get }) => makeFieldsArrByLabel(get($fields), get($fieldLabels)), dangerouslyAllowMutability: true })
export const $newFormId = selector({ key: '$newFormId', get: ({ get }) => getNewFormId(get($forms)) })
export const $uniqueFieldId = selector({ key: '$uniqueFieldId', get: ({ get }) => getNewId(get($fields)) })
export const $fieldsDirection = selector({
  key: '$fieldsDirection',
  get: ({ get }) => {
    const themeVars = get($themeVars)
    return themeVars['--dir']
  },
})

export const $reportSelector = selectorFamily({
  key: '$reportSelector',
  get: (reportID) => ({ get }) => get($reports)[reportID],
  set: (reportID) => ({ set }, newReport) => set($reports, oldReports => produce(oldReports, draft => {
    // eslint-disable-next-line no-param-reassign
    draft[reportID] = newReport
  })),
})
