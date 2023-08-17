import { arrayMoveImmutable } from 'array-move'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { create } from 'mutative'
import { useNavigate, useParams } from 'react-router-dom'
import useSmoothHorizontalScroll from 'use-smooth-horizontal-scroll'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import { $allLayouts, $builderHookStates, $contextMenu, $newFormId } from '../../GlobalStates/GlobalStates'
import CloseIcn from '../../Icons/CloseIcn'
import { __ } from '../../Utils/i18nwrap'
import { DragHandle, SortableItem, SortableList } from '../Utilities/Sortable'
import { $styles } from '../../GlobalStates/StylesState'
import { mergeNestedObj } from '../../Utils/globalHelpers'
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
  const [styles, setStyles] = useAtom($styles)
  console.log({ styles })

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
    const newLayouts = create(allLayouts, draftLayouts => {
      draftLayouts.splice(stepIndex, 1)
      if (draftLayouts.length === 1) {
        draftLayouts[0] = draftLayouts[0].layout
      }
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
                  <span type="button" className="btcd-s-tab-link" onClick={onStepChange(indx)}>
                    {__('Step #')}
                    {indx + 1}
                  </span>
                  {isMultiStep && (
                    <button
                      onClick={() => removeFormStep(indx)}
                      className="icn-btn"
                      aria-label="delete-relatedlist"
                      type="button"
                    >
                      <CloseIcn size="14" />
                    </button>
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
