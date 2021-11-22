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
export const $builderHookStates = atom({ key: '$builderHookStates', default: { reCalculateFieldHeights: 0, reRenderGridLayoutByRootLay: 0, forceBuilderWidthToLG: 0 } })
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
    '--fw-dis': '', // field wrapper display
    '--fw-fdir': '', // field wrapper flex direction
    '--lw-width': '', // label wrapper  width
    '--iw-width': '',
    '--lw-sa': '',
    '--lbl-al': '', // label align
    '--st-al': '', // subtitle align
    '--ht-al': '', // helper text align
    '--fl-fs': '16px', // field label font size
    '--st-fs': '12px', // subtitle font size
    '--ht-fs': '12px', // hepler text font size
    '--lw-m': '', // label wrapper for margin
    '--lw-p': '', // label wrapper for padding
    '--fl-m': '', // field label margin
    '--fl-p': '', // field label padding
    '--st-m': '', // subtitle margin
    '--st-p': '', // subtitle padding
    '--ht-m': '', // helper text margin
    '--ht-p': '', // hepler text padding
    // '--fld-p': '', // field padding
    '--fld-m': '', // field margin
    '--fld-fs': '12px', // field font size
    '--fw-m': '', // field wrapper margin
    '--fw-p': '10px', // field wrapper paddin

    '--fw-bg': 'hlsa(23,23,23,3)', // fieldwrapper background
    '--fw-b': '10px',
    '--fw-sh': '10px',

    '--fl-bg': '10px',
    '--fl-c': '10px',
    // '--fl-m': '10px',
    // '--fl-p': '10px',
    '--st-bg': '10px',
    '--st-c': '10px',
    // '--st-m': '10px',
    // '--st-p': '10px',

    '--err-bg': 'hsla(1,3,4,6)',
    '--err-sh': '1em 3px 5px 0rem yellow inset',
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
