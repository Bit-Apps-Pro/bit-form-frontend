import { atom, selector } from 'recoil'
import { __ } from './Utils/i18nwrap'
import { getFormsByPhpVar, getNewFormId, getNewId, makeFieldsArrByLabel } from './Utils/Helpers'

const defaultWorkflowValue = [
  {
    title: __('Show Success Message', 'bitform'),
    action_type: 'onsubmit',
    action_run: 'create_edit',
    action_behaviour: 'always',
    logics: [
      {
        field: '',
        logic: '',
        val: '',
      },
      'or',
      {
        field: '',
        logic: '',
        val: '',
      },
    ],
    actions: [
      {
        field: '',
        action: 'value',
      },
    ],
    successAction: [
      {
        type: 'successMsg',
        details: { id: '{"index":0}' },
      },
    ],
  },
]

// atoms
export const $forms = atom({ key: '$forms', default: getFormsByPhpVar(), dangerouslyAllowMutability: true })
export const $reports = atom({ key: '$reports', default: [], dangerouslyAllowMutability: true })
export const $fields = atom({ key: '$fields', default: [], dangerouslyAllowMutability: true })
export const $layouts = atom({ key: '$layouts', default: { lg: [], md: [], sm: [] }, dangerouslyAllowMutability: true })
export const $fieldLabels = atom({ key: '$fieldLabels', default: [], dangerouslyAllowMutability: true })
export const $selectedFieldId = atom({ key: '$selectedFieldId', default: null })
export const $draggingField = atom({ key: '$draggingField', default: null })
export const $mailTemplates = atom({ key: '$mailTemplates', default: [], dangerouslyAllowMutability: true })
export const $additionalSettings = atom({ key: '$additionalSettings', default: { enabled: {}, settings: {} } })
export const $saveForm = atom({ key: '$saveForm', default: () => { } })
export const $workflows = atom({ key: '$workflows', default: defaultWorkflowValue, dangerouslyAllowMutability: true })

// selectors
export const $fieldsArr = selector({ key: '$fieldsArr', get: ({ get }) => makeFieldsArrByLabel(get($fieldLabels)), dangerouslyAllowMutability: true })
export const $newFormId = selector({ key: '$newFormId', get: ({ get }) => getNewFormId(get($forms)) })
export const $uniqueFieldId = selector({ key: '$uniqueFieldId', get: ({ get }) => getNewId(get($fields)) })
