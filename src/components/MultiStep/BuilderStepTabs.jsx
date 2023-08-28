import { arrayMoveImmutable } from 'array-move'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { create } from 'mutative'
import { useNavigate, useParams } from 'react-router-dom'
import { hideAll } from 'tippy.js'
import useSmoothHorizontalScroll from 'use-smooth-horizontal-scroll'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import {
  $alertModal, $allLayouts, $builderHookStates, $contextMenu, $fields, $nestedLayouts, $newFormId,
} from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import CloseIcn from '../../Icons/CloseIcn'
import { deepCopy } from '../../Utils/Helpers'
import paymentFields from '../../Utils/StaticData/paymentFields'
import { mergeNestedObj } from '../../Utils/globalHelpers'
import { removeLayoutItem } from '../../Utils/gridLayoutHelpers'
import { __ } from '../../Utils/i18nwrap'
import Downmenu from '../Utilities/Downmenu'
import { DragHandle, SortableItem, SortableList } from '../Utilities/Sortable'
import multiStepStyles from '../style-new/themes/multiStepStyles'

export default function BuilderStepTabs() {
  const [allLayouts, setAllLayouts] = useAtom($allLayouts)
  const [activeBuilderStep, setActiveBuilderStep] = useAtom($activeBuilderStep)
  const setBuilderHookStates = useSetAtom($builderHookStates)
  const setContextMenu = useSetAtom($contextMenu)
  const navigate = useNavigate()
  const { formType, formID: pramsFormId } = useParams()
  const newFormId = useAtomValue($newFormId)
  const isNewForm = formType !== 'edit'
  const formID = isNewForm ? newFormId : pramsFormId
  const { scrollContainerRef, handleScroll, scrollTo, isAtStart, isAtEnd } = useSmoothHorizontalScroll()
  const formLayouts = Array.isArray(allLayouts) ? allLayouts : [allLayouts]
  const path = `/form/builder/${formType}/${formID}`
  const isMultiStep = formLayouts.length > 1
  const setStyles = useSetAtom($styles)
  const fields = useAtomValue($fields)
  const setAlertMdl = useSetAtom($alertModal)
  const [nestedLayouts, setNestedLayouts] = useAtom($nestedLayouts)

  const addFormStep = () => {
    setAllLayouts(prevLayouts => create(prevLayouts, draftLayouts => {
      const nextStep = !Array.isArray(draftLayouts) ? 1 : draftLayouts.length + 1
      const stepData = { layout: { lg: [], md: [], sm: [] }, settings: { title: `Step ${nextStep}`, description: '' } }
      if (!Array.isArray(draftLayouts)) {
        setActiveBuilderStep(1)
        const newSteps = [
          { layout: draftLayouts, settings: { title: 'Step 1', description: '' } },
          stepData,
        ]
        return newSteps
      }
      draftLayouts.push(stepData)
      setActiveBuilderStep(draftLayouts.length - 1)
    }))
    setStyles(prevStyles => create(prevStyles, draftStyles => {
      draftStyles.form = mergeNestedObj(draftStyles.form, multiStepStyles({ formId: formID }))
    }))
    setBuilderHookStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    navigate(`${path}/multi-step-settings`, { replace: true })
  }

  const removeFormStep = stepIndex => {
    const lastStepIndex = allLayouts.length - 1
    const removedLayout = deepCopy(allLayouts[stepIndex].layout)
    const removedFldKeys = removedLayout.lg.map(l => l.i)
    const hasSubmitBtn = removedFldKeys.some(fKey => {
      const fldData = fields[fKey]
      return fldData?.typ === 'button' && fldData?.btnTyp === 'submit'
    })
    if (hasSubmitBtn) {
      const payFields = fields ? Object.values(fields).filter(field => paymentFields.includes(field.typ)) : []
      if (!payFields.length) {
        setAlertMdl({ show: true, msg: __('Submit button cannot be removed'), cancelBtn: false })
        hideAll()
        return false
      }
    }
    removedFldKeys.forEach(key => {
      if (nestedLayouts[key]) {
        const nestedLay = deepCopy(nestedLayouts[key])
        const flds = nestedLay.lg.map(l => l.i)
        flds.forEach(fldKey => {
          removeLayoutItem(fldKey, nestedLay)
        })
        setNestedLayouts(prevNestedLayouts => create(prevNestedLayouts, draftNestedLayouts => {
          delete draftNestedLayouts[key]
        }))
      }
      removeLayoutItem(key, removedLayout)
    })
    const newLayouts = create(allLayouts, draftLayouts => {
      draftLayouts.splice(stepIndex, 1)
    })
    setAllLayouts(newLayouts)
    if (stepIndex === activeBuilderStep && stepIndex === lastStepIndex) {
      setActiveBuilderStep(stepIndex - 1)
    } else if (activeBuilderStep > stepIndex) {
      setActiveBuilderStep(prevStep => prevStep - 1)
    }
    if (newLayouts.length === 1) {
      setStyles(prevStyles => create(prevStyles, draftStyles => {
        const stepStyles = multiStepStyles({ formId: formID })
        Object.keys(stepStyles).forEach(key => {
          delete draftStyles.form[key]
        })
      }))
    }
    setBuilderHookStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    if (newLayouts.length > 1) navigate(`${path}/multi-step-settings`, { replace: true })
    else navigate(`${path}/fields-list`, { replace: true })
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (!Array.isArray(allLayouts)) return
    setAllLayouts((items) => arrayMoveImmutable(items, oldIndex, newIndex))
    if (oldIndex === activeBuilderStep) setActiveBuilderStep(newIndex)
  }

  const onStepChange = stepIndex => () => {
    setActiveBuilderStep(stepIndex)
    setContextMenu({})
    setBuilderHookStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    if (formLayouts.length !== 1) navigate(`${path}/multi-step-settings`, { replace: true })
  }

  return (
    <div>
      <div ref={scrollContainerRef} onScroll={handleScroll} style={{ overflowX: 'auto' }}>
        <SortableList useDragHandle axis="x" onSortEnd={onSortEnd}>
          <div className="flx step-wrapper">
            {formLayouts.map((_, indx) => (
              <SortableItem key={`grid-${indx * 2}`} index={indx} itemId={`grid-${indx * 2}`}>
                <div className="flx step-container" style={{ backgroundColor: activeBuilderStep === indx ? 'red' : '' }}>
                  <DragHandle />
                  <span type="button" className="btcd-s-tab-link" onClick={onStepChange(indx)} onKeyDown={onStepChange(indx)} role="button" tabIndex={0}>
                    {__('Step #')}
                    {indx + 1}
                  </span>
                  {isMultiStep && (
                    <Downmenu>
                      <button
                        className="icn-btn"
                        aria-label="delete-relatedlist"
                        type="button"
                      >
                        <CloseIcn size="14" />
                      </button>
                      <div className="wdt-200">
                        <div className="mb-2 mt-1"><b>Are you sure to delete the step?</b></div>
                        <div className="flx flx-c">
                          <button onClick={() => hideAll()} className="tip-btn mr-2" type="button">Cancel</button>
                          <button onClick={() => removeFormStep(indx)} className="tip-btn red-btn" type="button">Delete</button>
                        </div>
                      </div>
                    </Downmenu>
                  )}
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableList>
      </div>
      <button
        onClick={addFormStep}
        className="icn-btn sh-sm ml-2 mr-2 tooltip"
        style={{ '--tooltip-txt': `'${__('Add More Related List')}'` }}
        type="button"
      >
        +
      </button>
    </div>
  )
}
