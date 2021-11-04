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
      '--g-bdr-rad': '11px',
      '--dir': 'ltr',
      '--fw-dis': '',
      '--fw-fdir': '',
      '--lw-width': '',
      '--iw-width': '',
      '--lw-sa': '',
      '--lbl-al': '',
      '--st-al': '',
      '--ht-al': '',
    },
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
