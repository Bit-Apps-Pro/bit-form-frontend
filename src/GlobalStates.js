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
    '--global-primary-color': 'hsla(217, 100%, 50%, 100)', // primary color
    '--gph': 217, // global primary hue
    '--gps': '100%', // global primary saturation
    '--gpl': '50%', // global primary lightness
    '--gpa': 100, // global primary opacity
    '--global-font-color': 'hsla(0, 0%, 14%, 100)',
    '--gfh': 0, // global font color hue
    '--gfs': '0%', // global fonst color saaturation
    '--gfl': '14%',
    '--gfa': 100,
    '--global-bg-color': 'hsla(0, 0%, 100%, 100)', // background color
    '--gbg-h': 0,
    '--gbg-s': 0,
    '--gbg-l': 100,
    '--gbg-a': 100,
    '--global-fld-bdr-clr': 'hsla(0, 0%, 67%, 100)',
    '--global-fld-bg-color': 'hsla(0, 0%, 67%, 100)', // field background color
  },
})

export const $darkThemeColors = atom({
  key: '$darkThemeColors',
  default: {
    '--global-primary-color': 'hsla(215, 10%, 20%, 100)', // primary color
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
    // '--global-primary-color': 'hsla(0, 10%, 20%, 100)', // primary color
    // '--gph': 0, // global primary hue
    // '--gps': 10, // global primary saturation
    // '--gpl': 20, // global primary lightness
    // '--gpa': 100, // global primary opacity
    // '--global-font-color': 'hsla(0, 10%, 20%, 100)',
    // '--gfh': 0, // global font color hue
    // '--gfs': 10, // global fonst color sa
    // '--gfl': 20,
    // '--gfa': 100,
    // '--global-bg-color': 'hsla(240, 100%, 97%, 100)', // background color
    // '--gbg-h': 0,
    // '--gbg-s': 10,
    // '--gbg-l': 20,
    // '--gbg-a': 100,
    // '--global-fld-bdr-clr': 'hsla(0, 10%, 20%, 100)', // border color
    // '--gfbc-h': 0,
    // '--gfbc-s': 10,
    // '--gfbc-l': 20,
    // '--gfbc-a': 100,
    // '--global-fld-bg-color': 'var(--global-bg-color)', // field background color
    // '--global-fld-bg-color': 'hsla(215, 10%, 20%, 100)', // field background color
    // '--gfbg-h': 0,
    // '--gfbg-s': 10,
    // '--gfbg-l': 20,
    // '--gfbg-a': 100,
    '--g-bdr-rad': '11px', // border radius
    '--g-bdr-width': '1px', // border width
    '--dir': 'ltr', // direaction
    '--inp-wrp-width': '',
    '--lbl-al': '', // label align
    // '--fld-p': '', // field padding
    '--fld-m': '', // field margin
    '--fld-fs': '1rem', // field font size

    '--fld-wrp-dis': '', // field wrapper display
    '--fld-wrp-fdir': '', // field wrapper flex direction
    '--fld-wrp-bg': '', // fieldwrapper background
    '--fld-wrp-m': '', // field wrapper margin
    '--fld-wrp-p': '10px', // field wrapper paddin
    '--fld-wrp-sh': '', // field wrapper box shadow
    '--fld-wrp-bdr': '', // field wrapper border
    '--fld-wrp-bdr-width': '', // field wrapper border width
    '--fld-wrp-bdr-rad': '', // field wrapper border radius

    '--lbl-wrp-sa': '',
    '--lbl-wrp-width': '', // label wrapper  width
    '--lbl-wrp-m': '', // label wrapper for margin
    '--lbl-wrp-p': '', // label wrapper for padding
    '--lbl-wrp-bg': '', // label wrapper for padding
    '--lbl-wrp-sh': '', // label wrapper box shadow
    '--lbl-wrp-bdr': '', // label wrapper border
    '--lbl-wrp-bdr-width': '', // label wrapper border width
    '--lbl-wrp-bdr-rad': '', // label wrapper border radius

    '--fld-lbl-bg': '', // field label background color
    '--fld-lbl-c': '', // field babel color
    '--fld-lbl-m': '', // field label margin
    '--fld-lbl-p': '', // field label padding
    '--fld-lbl-fs': '1rem', // field label font size
    '--fld-lbl-sh': '', // field label box shadow
    '--fld-lbl-bdr': '', // field label border
    '--fld-lbl-bdr-width': '', // field label border width
    '--fld-lbl-bdr-rad': '', // field label border radius

    '--sub-titl-bg': 'hsla(215, 71%, 39%, 100)', // sub title background color
    '--sub-titl-c': 'hsla(210, 71%, 39%, 100)', // sub title color
    '--sub-titl-m': '', // subtitle margin
    '--sub-titl-p': '', // subtitle padding
    '--sub-titl-al': '', // subtitle align
    '--sub-titl-fs': '12px', // subtitle font size
    '--sub-titl-sh': '', // subtitle box shadow
    '--sub-titl-bdr': '', // subtitle border
    '--sub-titl-bdr-width': '', // subtitle border width
    '--sub-titl-bdr-rad': '', // subtitle border radius

    '--hlp-txt-bg': 'hsla(123, 71%, 39%, 100)', // helper text background color
    '--hlp-txt-c': '', // helpertext color
    '--hlp-txt-m': '', // helper text margin
    '--hlp-txt-p': '', // hepler text padding
    '--hlp-txt-fs': '12px', // hepler text font size
    '--hlp-txt-al': '', // helper text align
    '--hlp-txt-sh': '', // helper text box shadow
    '--hlp-txt-bdr': '', // helper text border
    '--hlp-txt-bdr-width': '', // helper text border width
    '--hlp-txt-bdr-rad': '', // helper text border radius

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
export const $tempStyles = atom({
  key: '$tempStyles',
  default: {
    themeVars: {},
    themeColors: {},
  },
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

export const $themeColors = selector({
  key: '$themeColors',
  get: ({ get }) => {
    const colorScheme = get($colorScheme)
    console.log('in state', colorScheme)
    if (colorScheme === 'light') return get($lightThemeColors)
    if (colorScheme === 'dark') return get($darkThemeColors)
  },
  set: ({ set, get }, newColors) => {
    console.log('set in selctot', $colorScheme)
    const colorScheme = get($colorScheme)
    if (colorScheme === 'light') set($lightThemeColors, newColors)
    if (colorScheme === 'dark') set($darkThemeColors, newColors)
  },
})
