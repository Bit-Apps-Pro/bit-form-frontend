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
export const $styles = atom({
  key: '$styles',
  default: {
    theme: 'bitformDefault',
    themeVars: {
      '--global-primary-color': 'hsla(0, 10%, 20%, 100)',
      '--gph': 0,
      '--gps': 10,
      '--gpl': 20,
      '--gpa': 100,
      '--global-font-color': 'hsla(0, 10%, 20%, 100)',
      '--gfh': 0,
      '--gfs': 10,
      '--gfl': 20,
      '--gfa': 100,
      '--global-bg-color': 'hsla(240, 100%, 97%, 100)',
      '--gbg-h': 0,
      '--gbg-s': 10,
      '--gbg-l': 20,
      '--gbg-a': 100,
      '--global-fld-bg-color': 'var(--global-bg-color)',
      '--border-radius': '10px',
      '--dir': 'ltr',
      '--fw-dis': '',
      '--fw-fdir': '',
      '--lw-width': '20px', // for widht
      '--iw-width': '',
      '--lw-sa': '',
      '--lbl-al': '',
      '--st-al': '',
      '--ht-al': '',
      '--fl-fs': '16px',
      '--st-fs': '12px',
      '--ht-fs': '12px',
      '--lw-m': '', // label wrapper for margin
      '--lw-p': '', // label wrapper for padding
      '--fl-m': '', // field label
      '--fl-p': '',
      '--st-m': '', // subtitle
      '--st-p': '',
      '--ht-m': '', // helper text
      '--ht-p': '',
      '--fld-m': '', // field
      '--fld-p': '',
    },
    form: { _frm: { background: 'var(--global-bg-color)' } },
    fields: {
      'bf9-3-': {
        theme: 'default_blue',
        overrideGlobalTheme: false,
        fieldType: '',
        themeVars: { '--primary-color': '--global-primary-color' },
        classes: {
          'bf9-3--fw': {
            background: 'Red',
            height: '100%',
            'text-align': 'start',
            width: '100%',
            padding: '10px',
          },
          'bf9-3--lbl': {
            display: 'block',
            overflow: 'hidden',
            margin: 0,
            'font-weight': 500,
            'font-size': '16px',
            color: 'rgba(42, 49, 99, 1)!important',
            'line-height': '1.4!important',
          },
          'bf9-3--fld': {
            display: ' inline-block !important',
            direction: 'inherit !important',
            height: '40px',
            'max-width': '100% !important',
            'font-family': 'sans-serif',
            width: '100% !important',
            outline: 'none !important',
            'background-color': 'rgba(0, 0, 0, 0)!important',
            'border-color': 'rgba(199, 212, 221, 1)!important',
            'border-radius': '6px 6px 6px 6px !important',
            'border-style': 'solid!important',
            'border-width': '1px 1px 1px 1px !important',
            'font-size': '15px!important',
            color: 'rgba(0, 0, 0, 1)!important',
            margin: '5px 0 0 0!important',
            padding: '10px 8px 10px 8px!important',
            'line-height': '1.4 !important',
          },
          'bf9-3--fld:focus': {
            'box-shadow': '0px 0px 0px 3px rgba(151, 203, 252, 0.38) !important',
            'border-color': 'rgba(29, 158, 249, 1)!important',
          },
          'bf9-3--fld:hover': { 'border-color': 'rgba(29, 158, 249, 1)!important' },
          'bf9-3--fld::placeholder': { color: 'rgba(213, 212, 221, 1)!important' },
        },
      },
      field_key2: {
        theme: 'default red',
        themeVars: {},
        type: 'textarea',
        classes: {
          class1: { background: 'Red' },
          class2: { 'font-size': '12px' },
        },
      },
    },
  },
})

// selectors
export const $fieldsArr = selector({ key: '$fieldsArr', get: ({ get }) => makeFieldsArrByLabel(get($fields), get($fieldLabels)), dangerouslyAllowMutability: true })
export const $newFormId = selector({ key: '$newFormId', get: ({ get }) => getNewFormId(get($forms)) })
export const $uniqueFieldId = selector({ key: '$uniqueFieldId', get: ({ get }) => getNewId(get($fields)) })
export const $fieldsDirection = selector({
  key: '$fieldsDirection',
  get: ({ get }) => {
    const styles = get($styles)
    return styles.themeVars['--dir']
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
