import { atom } from 'jotai'
import { create } from 'mutative'
import { getFormsFromPhpVariable, getNewFormId, getNewId, makeFieldsArrByLabel } from '../Utils/Helpers'
import blankTemplate from '../Utils/StaticData/form-templates/blankTemplate'

// atoms
export const $additionalSettings = atom(blankTemplate.additionalSettings)
export const $bits = atom(typeof window.bits !== 'undefined' ? window.bits : {})
export const $breakpoint = atom('lg')
export const $breakpointSize = atom({ lg: 1024, md: 960, sm: 570 })
export const $builderHistory = atom({ histories: [{ event: 'reset', state: { breakpoint: 'lg', colorScheme: 'light' } }], active: 0 })
export const $builderHelperStates = atom({ respectLGLayoutOrder: true })
export const $builderHookStates = atom({
  reCalculateFieldHeights: 0,
  reRenderGridLayoutByRootLay: 0,
  forceBuilderWidthToLG: 0,
  forceBuilderWidthToBrkPnt: 0,
  reCalculateSpecificFldHeight: { fieldKey: '', counter: 0 },
  recalculateNestedField: { fieldKey: '', parentFieldKey: '', counter: 0 }
})
export const $builderRightPanelScroll = atom(false)
export const $builderSettings = atom({ atomicClassPrefix: '', darkModeConfig: { darkModeSelector: '', preferSystemColorScheme: false }, addImportantRuleToStyles: false })
export const $confirmations = atom({})
export const $colorScheme = atom('light')
export const $customCodes = atom({ JavaScript: '', CSS: '', isFetched: false })
export const $draggingField = atom(null)
export const $deletedFldKey = atom([])
export const $draggableModal = atom({ show: false, component: null, position: { x: 0, y: 0 }, width: 250 })
export const $formId = atom(0)
export const $formInfo = atom({ formName: 'Untitled Form' })
export const $forms = atom(getFormsFromPhpVariable())
export const $fieldLabels = atom([])
export const $fields = atom({})
export const $flags = atom({ saveStyle: true, styleMode: false, inspectMode: false })
export const $integrations = atom([])
export const $isNewThemeStyleLoaded = atom(false)
export const $layouts = atom({ lg: [], md: [], sm: [] })
export const $mailTemplates = atom([])
export const $reports = atom([])
export const $reportId = atom({})
export const $selectedFieldId = atom(null)
export const $updateBtn = atom({ unsaved: false })
export const $unsplashMdl = atom(false)
export const $unsplashImgUrl = atom('')
export const $workflows = atom([])
export const $contextMenu = atom({})
export const $resizingFld = atom({})
export const $contextMenuRef = atom({})
export const $proModal = atom({ show: false })
export const $alertModal = atom({ show: false, msg: '' })
export const $nestedLayouts = atom({})

// selectors
export const $fieldsArr = atom((get) => makeFieldsArrByLabel(get($fields), get($fieldLabels), []))
export const $newFormId = atom((get) => getNewFormId(get($forms)))
export const $uniqueFieldId = atom((get) => getNewId(get($fields)))
export const $reportSelector = atom(
  (get) => get($reports)?.find(r => r.id === get($reportId)?.id?.toString()),
  (get, set, newReport) => set($reports, oldReports => create(oldReports, draft => {
    const reprtId = get($reportId)?.id?.toString()
    const rportIndx = oldReports.findIndex(r => r?.id && r.id.toString() === reprtId)
    draft[rportIndx] = newReport
  })),
)
