import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import { create } from 'mutative'
import { getFormsFromPhpVariable, getNewFormId, getNewId, makeFieldsArrByLabel } from '../Utils/Helpers'
import blankTemplate from '../Utils/StaticData/form-templates/blankTemplate'

// atoms
export const $additionalSettings = atomWithReset(blankTemplate.additionalSettings)
export const $bits = atom(typeof window.bits !== 'undefined' ? window.bits : {})
export const $breakpoint = atomWithReset('lg')
export const $breakpointSize = atomWithReset({ lg: 1024, md: 960, sm: 570 })
export const $builderHistory = atomWithReset({ histories: [{ event: 'reset', state: { breakpoint: 'lg', colorScheme: 'light' } }], active: 0 })
export const $builderHelperStates = atomWithReset({ respectLGLayoutOrder: true })
export const $builderHookStates = atomWithReset({
  reCalculateFieldHeights: 0,
  reRenderGridLayoutByRootLay: 0,
  forceBuilderWidthToLG: 0,
  forceBuilderWidthToBrkPnt: 0,
  reCalculateSpecificFldHeight: { fieldKey: '', counter: 0 },
  recalculateNestedField: { fieldKey: '', parentFieldKey: '', counter: 0 }
})
export const $builderRightPanelScroll = atomWithReset(false)
export const $builderSettings = atomWithReset({ atomicClassPrefix: '', darkModeConfig: { darkModeSelector: '', preferSystemColorScheme: false }, addImportantRuleToStyles: false })
export const $confirmations = atomWithReset({})
export const $colorScheme = atomWithReset('light')
export const $customCodes = atomWithReset({ JavaScript: '', CSS: '', isFetched: false })
export const $draggingField = atomWithReset(null)
export const $deletedFldKey = atomWithReset([])
export const $draggableModal = atomWithReset({ show: false, component: null, position: { x: 0, y: 0 }, width: 250 })
export const $formId = atomWithReset(0)
export const $formInfo = atomWithReset({ formName: 'Untitled Form' })
export const $forms = atom(getFormsFromPhpVariable())
export const $fieldLabels = atomWithReset([])
export const $fields = atomWithReset({})
export const $flags = atomWithReset({ saveStyle: true, styleMode: false, inspectMode: false })
export const $integrations = atomWithReset([])
export const $isNewThemeStyleLoaded = atomWithReset(false)
export const $layouts = atomWithReset({ lg: [], md: [], sm: [] })
export const $mailTemplates = atomWithReset([])
export const $pdfTemplates = atomWithReset([])
export const $reports = atomWithReset([])
export const $reportId = atomWithReset({})
export const $selectedFieldId = atomWithReset(null)
export const $updateBtn = atomWithReset({ unsaved: false })
export const $unsplashMdl = atomWithReset(false)
export const $unsplashImgUrl = atomWithReset('')
export const $workflows = atomWithReset([])
export const $contextMenu = atomWithReset({})
export const $resizingFld = atomWithReset({})
export const $contextMenuRef = atomWithReset({})
export const $proModal = atomWithReset({ show: false })
export const $alertModal = atomWithReset({ show: false, msg: '' })
export const $nestedLayouts = atomWithReset({})

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
