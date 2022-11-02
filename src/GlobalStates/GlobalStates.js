import produce from 'immer'
import { atom, selector } from 'recoil'
import { getFormsFromPhpVariable, getNewFormId, getNewId, makeFieldsArrByLabel } from '../Utils/Helpers'

// atoms
export const $additionalSettings = atom({ key: '$additionalSettings', default: { enabled: {}, settings: { empty_submission: { message: 'Empty form cannot be submitted.' } } } })
export const $bits = atom({ key: '$bits', default: typeof bits !== 'undefined' ? bits : {} }) // eslint-disable-line no-undef
export const $breakpoint = atom({ key: '$breakpoint', default: 'lg' })
export const $breakpointSize = atom({ key: '$breakpointSize', default: { lg: 1024, md: 960, sm: 570 } })
export const $builderHistory = atom({ key: '$builderHistory', default: { histories: [{ event: 'reset', state: { breakpoint: 'lg', colorScheme: 'light', } }], active: 0 } })
export const $builderHelperStates = atom({ key: '$builderHelperStates', default: { respectLGLayoutOrder: true } })
export const $builderHookStates = atom({ key: '$builderHookStates', default: { reCalculateFieldHeights: 0, reRenderGridLayoutByRootLay: 0, forceBuilderWidthToLG: 0, forceBuilderWidthToBrkPnt: 0, reCalculateSpecificFldHeight: { fieldKey: '', counter: 0 } } })
export const $builderRightPanelScroll = atom({ key: '$builderRightPanelScroll', default: false })
export const $builderSettings = atom({ key: '$builderSettings', default: { atomicClassPrefix: '', darkModeConfig: { darkModeSelector: '', preferSystemColorScheme: false } } })
export const $confirmations = atom({ key: '$confirmations', default: {}, dangerouslyAllowMutability: true })
export const $colorScheme = atom({ key: '$colorScheme', default: 'light' })
export const $customCodes = atom({ key: '$customCodes', default: { JavaScript: '', CSS: '' } })
export const $draggingField = atom({ key: '$draggingField', default: null, dangerouslyAllowMutability: true })
export const $deletedFldKey = atom({ key: '$deletedFldKey', default: [] })
export const $draggableModal = atom({ key: '$draggableModal', default: { show: false, component: null, position: { x: 0, y: 0 }, width: 250 } })
export const $formId = atom({ key: '$formId', default: 0 })
export const $formInfo = atom({ key: '$formInfo', default: { formName: 'Untitled Form' } })
export const $forms = atom({ key: '$forms', default: getFormsFromPhpVariable(), dangerouslyAllowMutability: true })
export const $fieldLabels = atom({ key: '$fieldLabels', default: [], dangerouslyAllowMutability: true })
export const $fields = atom({ key: '$fields', default: [], dangerouslyAllowMutability: true })
export const $flags = atom({ key: '$flags', default: { saveStyle: true, styleMode: false, inspectMode: false } })
export const $integrations = atom({ key: '$integrations', default: [], dangerouslyAllowMutability: true })
export const $isNewThemeStyleLoaded = atom({ key: '$isNewThemeStyleLoaded', default: false })
export const $layouts = atom({ key: '$layouts', default: { lg: [], md: [], sm: [] }, dangerouslyAllowMutability: true })
export const $mailTemplates = atom({ key: '$mailTemplates', default: [], dangerouslyAllowMutability: true })
export const $reports = atom({ key: '$reports', default: [], dangerouslyAllowMutability: true })
export const $reportId = atom({ key: '$reportId', default: {} })
export const $selectedFieldId = atom({ key: '$selectedFieldId', default: null })
export const $updateBtn = atom({ key: '$updateBtn', default: { unsaved: false } })
export const $unsplashMdl = atom({ key: '$unsplashMdl', default: false })
export const $unsplashImgUrl = atom({ key: '$unsplashImgUrl', default: '' })
export const $workflows = atom({ key: '$workflows', default: [], dangerouslyAllowMutability: true })
// selectors
export const $fieldsArr = selector({ key: '$fieldsArr', get: ({ get }) => makeFieldsArrByLabel(get($fields), get($fieldLabels)), dangerouslyAllowMutability: true })
export const $newFormId = selector({ key: '$newFormId', get: ({ get }) => getNewFormId(get($forms)) })
export const $uniqueFieldId = selector({ key: '$uniqueFieldId', get: ({ get }) => getNewId(get($fields)) })

export const $reportSelector = selector({
  key: '$reportSelector',
  get: ({ get }) => get($reports)?.find(r => r.id === get($reportId)?.id?.toString()),
  set: ({ set, get }, newReport) => set($reports, oldReports => produce(oldReports, draft => {
    const reprtId = get($reportId)?.id?.toString()
    const rportIndx = oldReports.findIndex(r => r?.id && r.id.toString() === reprtId)
    draft[rportIndx] = newReport
  })),
})
