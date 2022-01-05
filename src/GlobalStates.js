import produce from 'immer'
import { atom, selector, selectorFamily } from 'recoil'
import merge from 'deepmerge-alt'
import { getFormsFromPhpVariable, getNewFormId, getNewId, makeFieldsArrByLabel } from './Utils/Helpers'

// atoms
// eslint-disable-next-line no-undef
export const $bits = atom({ key: '$bits', default: typeof bits !== 'undefined' ? bits : {} })
export const $formId = atom({ key: '$formId', default: 0 })
export const $forms = atom({ key: '$forms', default: getFormsFromPhpVariable(), dangerouslyAllowMutability: true })
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
    '--global-accent-color': 'hsla(217, 100%, 50%, 100)', // Accent Color
    '--gah': 217, // global primary hue
    '--gas': '100%', // global primary saturation
    '--gal': '50%', // global primary lightness
    '--gaa': 100, // global primary opacity
    '--global-font-color': 'hsla(0, 0%, 14%, 100)',
    '--gfh': 0, // global font color hue
    '--gfs': '0%', // global fonst color saaturation
    '--gfl': '14%',
    '--gfa': 100,
    '--global-bg-color': 'hsla(0, 0%, 95%, 100)', // background color
    '--gbg-h': 0,
    '--gbg-s': 0,
    '--gbg-l': 100,
    '--gbg-a': 100,
    '--global-fld-bdr-clr': 'hsla(0, 0%, 67%, 100)',
    '--global-fld-bg-color': 'hsla(0, 40%, 67%, 100)', // field background color

    '--fld-wrp-bg': 'hsla(0, 0%, 100%, 100)', // fieldwrapper background
    '--fld-wrp-bdr': '', // field wrapper border
    '--fld-wrp-sh': '', // field wrapper box shadow

    '--lbl-wrp-bg': '', // label wrapper for background
    '--lbl-wrp-sh': '', // label wrapper box shadow
    '--lbl-wrp-bdr': '', // label wrapper border

    '--fld-lbl-bg': '', // field label background color
    '--fld-lbl-c': '', // field babel color
    '--fld-lbl-sh': '', // field label box shadow
    '--fld-lbl-bdr': '', // field label border

    '--sub-titl-bg': 'hsla(215, 71%, 39%, 100)', // sub title background color
    '--sub-titl-c': 'hsla(210, 71%, 39%, 100)', // sub title color
    '--sub-titl-sh': '', // subtitle box shadow
    '--sub-titl-bdr': '', // subtitle border

    '--hlp-txt-bg': 'hsla(123, 71%, 39%, 100)', // helper text background color
    '--hlp-txt-c': '', // helpertext color
    '--hlp-txt-sh': '', // helper text box shadow
    '--hlp-txt-bdr': '', // helper text border

    '--err-bg': 'hsla(210, 71%, 39%, 100)', // error messages background color
    '--err-c': 'hsla(215, 71%, 39%, 100)', // error messages text color
    '--err-sh': '1em 3px 5px 0rem blue inset', // error messages box shadow
    '--err-bdr': 'solid red', // error message border
  },
})

export const $darkThemeColors = atom({
  key: '$darkThemeColors',
  default: {},
})

// export const $themeVars = atom({
//   key: '$themeVars',
//   default: {
//     '--g-bdr-rad': '11px', // border radius
//     '--g-bdr-width': '1px', // border width
//     '--dir': 'ltr', // direaction
//     '--inp-wrp-width': '',
//     '--lbl-al': '', // label align
//     '--fld-p': '', // field padding
//     '--fld-m': '', // field margin
//     '--fld-fs': '1rem', // field font size

//     '--fld-wrp-dis': '', // field wrapper display
//     '--fld-wrp-fdir': '', // field wrapper flex direction
//     '--fld-wrp-m': '', // field wrapper margin
//     '--fld-wrp-p': '10px', // field wrapper paddin
//     '--fld-wrp-bdr-width': '', // field wrapper border width
//     '--fld-wrp-bdr-rad': '', // field wrapper border radius

//     '--lbl-wrp-sa': '',
//     '--lbl-wrp-width': '', // label wrapper  width
//     '--lbl-wrp-m': '', // label wrapper for margin
//     '--lbl-wrp-p': '', // label wrapper for padding
//     '--lbl-wrp-bdr-width': '', // label wrapper border width
//     '--lbl-wrp-bdr-rad': '', // label wrapper border radius

//     '--fld-lbl-m': '', // field label margin
//     '--fld-lbl-p': '', // field label padding
//     '--fld-lbl-fs': '1rem', // field label font size
//     '--fld-lbl-bdr-width': '', // field label border width
//     '--fld-lbl-bdr-rad': '', // field label border radius

//     '--sub-titl-m': '', // subtitle margin
//     '--sub-titl-p': '', // subtitle padding
//     '--sub-titl-al': '', // subtitle align
//     '--sub-titl-fs': '12px', // subtitle font size
//     '--sub-titl-bdr-width': '', // subtitle border width
//     '--sub-titl-bdr-rad': '', // subtitle border radius

//     '--hlp-txt-m': '', // helper text margin
//     '--hlp-txt-p': '', // hepler text padding
//     '--hlp-txt-fs': '12px', // hepler text font size
//     '--hlp-txt-al': '', // helper text align
//     '--hlp-txt-bdr-width': '', // helper text border width
//     '--hlp-txt-bdr-rad': '', // helper text border radius

//     '--err-m': '', // error messages margin
//     '--err-p': '', // error messages padding
//     '--err-bdr-width': '1px', // error message border width
//     '--err-bdr-rad': '8px', // error message border radius
//   },
// })

const $themeVarsLg = atom({
  key: '$themeVarsLg',
  default: {
    '--g-bdr-rad': '11px', // border radius
    '--g-bdr-width': '1px', // border width
    '--dir': 'ltr', // direaction
    '--inp-wrp-width': '',
    '--lbl-al': '', // label align
    '--fld-p': '', // field padding
    '--fld-m': '', // field margin
    '--fld-fs': '1rem', // field font size

    '--fld-wrp-dis': '', // field wrapper display
    '--fld-wrp-fdir': '', // field wrapper flex direction
    '--fld-wrp-m': '', // field wrapper margin
    '--fld-wrp-p': '10px', // field wrapper paddin
    '--fld-wrp-bdr-width': '', // field wrapper border width
    '--fld-wrp-bdr-rad': '', // field wrapper border radius

    '--lbl-wrp-sa': '',
    '--lbl-wrp-width': '', // label wrapper  width
    '--lbl-wrp-m': '', // label wrapper for margin
    '--lbl-wrp-p': '', // label wrapper for padding
    '--lbl-wrp-bdr-width': '', // label wrapper border width
    '--lbl-wrp-bdr-rad': '', // label wrapper border radius

    '--fld-lbl-m': '', // field label margin
    '--fld-lbl-p': '', // field label padding
    '--fld-lbl-fs': '1rem', // field label font size
    '--fld-lbl-bdr-width': '', // field label border width
    '--fld-lbl-bdr-rad': '', // field label border radius

    '--sub-titl-m': '', // subtitle margin
    '--sub-titl-p': '', // subtitle padding
    '--sub-titl-al': '', // subtitle align
    '--sub-titl-fs': '12px', // subtitle font size
    '--sub-titl-bdr-width': '', // subtitle border width
    '--sub-titl-bdr-rad': '', // subtitle border radius

    '--hlp-txt-m': '', // helper text margin
    '--hlp-txt-p': '', // hepler text padding
    '--hlp-txt-fs': '12px', // hepler text font size
    '--hlp-txt-al': '', // helper text align
    '--hlp-txt-bdr-width': '', // helper text border width
    '--hlp-txt-bdr-rad': '', // helper text border radius

    '--err-m': '', // error messages margin
    '--err-p': '', // error messages padding
    '--err-bdr-width': '1px', // error message border width
    '--err-bdr-rad': '8px', // error message border radius
  },
})
export const $themeVarsMd = atom({ key: '$themeVarsMd', default: {} })
export const $themeVarsSm = atom({ key: '$themeVarsSm', default: {} })

export const $tempStyles = atom({
  key: '$tempStyles',
  default: {
    themeVars: {},
    lightThemeColors: {},
    darkThemeColors: {},
    styles: {},
  },
})

export const $stylesLg = atom({
  key: '$stylesLg',
  default: {
    theme: 'bitformDefault',
    form: {
      light: {
        _frm: { background: 'var(--global-bg-color)' },
        '_frm-bg': { padding: '10px' },
      },
      dark: {
        _frm: { background: 'var(--global-bg-color)' },
        '_frm-bg': { padding: '10px' },
      },
    },
    fields: {},
  },
})
export const $stylesMd = atom({ key: '$stylesMd', default: {} })
export const $stylesSm = atom({ key: '$stylesSm', default: {} })

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
    if (colorScheme === 'light') return get($lightThemeColors)
    if (colorScheme === 'dark') return merge(get($lightThemeColors), get($darkThemeColors))
  },
  set: ({ set, get }, newColors) => {
    const colorScheme = get($colorScheme)
    if (colorScheme === 'light') set($lightThemeColors, newColors)
    if (colorScheme === 'dark') set($darkThemeColors, newColors)
  },
})

export const $themeVars = selector({
  key: '$themeVars',
  get: ({ get }) => {
    const breakpoint = get($breakpoint)
    if (breakpoint === 'md') return merge(get($themeVarsLg), get($themeVarsMd))
    if (breakpoint === 'sm') return merge(get($themeVarsLg), get($themeVarsSm))
    return get($themeVarsLg)
  },
  set: ({ set, get }, newThemeVars) => {
    const breakpoint = get($breakpoint)
    if (breakpoint === 'md') set($themeVarsMd, newThemeVars)
    else if (breakpoint === 'sm') set($themeVarsSm, newThemeVars)
    else set($themeVarsLg, newThemeVars)
  },
})

export const $styles = selector({
  key: '$styles',
  get: ({ get }) => {
    const breakpoint = get($breakpoint)
    if (breakpoint === 'md') return merge(get($stylesLg), get($stylesMd))
    if (breakpoint === 'sm') return merge(get($stylesLg), get($stylesSm))
    return get($stylesLg)
  },
  set: ({ set, get }, newStyles) => {
    const breakpoint = get($breakpoint)
    if (breakpoint === 'md') set($stylesMd, newStyles)
    else if (breakpoint === 'sm') set($stylesSm, newStyles)
    else set($stylesLg, newStyles)
  },
})
