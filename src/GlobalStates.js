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
export const $mailTemplates = atom({ key: '$mailTemplates', default: [], dangerouslyAllowMutability: true })
export const $additionalSettings = atom({ key: '$additionalSettings', default: { enabled: { validateFocusLost: true }, settings: {} } })
export const $workflows = atom({ key: '$workflows', default: [], dangerouslyAllowMutability: true })
export const $confirmations = atom({ key: '$confirmations', default: {}, dangerouslyAllowMutability: true })
export const $integrations = atom({ key: '$integrations', default: [], dangerouslyAllowMutability: true })
export const $formName = atom({ key: '$formName', default: 'Untitled Form' })
export const $updateBtn = atom({ key: '$updateBtn', default: { unsaved: false } })
export const $builderHistory = atom({ key: '$builderHistory', default: { histories: [], active: 0 } })
export const $draggableModal = atom({ key: '$draggableModal', default: { show: false, component: null, position: { x: 0, y: 0 }, width: 250 } })
export const $builderHelperStates = atom({ key: '$builderHelperStates', default: { forceBuilderWidthToLG: 0, respectLGLayoutOrder: true, reRenderGridLayoutByRootLay: false, styleMood: false } })
export const $flags = atom({ key: '$flags', default: { saveStyle: true } })
export const $styles = atom({
  key: '$styles',
  default: {
    theme: 'defaultBlue',
    themeVars: {
      '--global-primary-color': 'blue',
      '--border-radius': '10px',
    },
    form: { 'frm-wrp-': { background: 'red' } },
    commonClasses: { 'f-wrp': {} },
    fields: {
      'bf9-3-': {
        theme: 'default_blue',
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

export const $reportSelector = selectorFamily({
  key: '$reportSelector',
  get: (reportID) => ({ get }) => get($reports)[reportID],
  set: (reportID) => ({ set }, newReport) => set($reports, oldReports => produce(oldReports, draft => {
    // eslint-disable-next-line no-param-reassign
    draft[reportID] = newReport
  })),
})
