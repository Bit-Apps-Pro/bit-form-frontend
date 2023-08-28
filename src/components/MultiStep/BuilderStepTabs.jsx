import { arrayMoveImmutable } from 'array-move'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { create } from 'mutative'
import { useNavigate, useParams } from 'react-router-dom'
import useSmoothHorizontalScroll from 'use-smooth-horizontal-scroll'
import { hideAll } from 'tippy.js'
import { useFela } from 'react-fela'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import { $alertModal, $allLayouts, $builderHookStates, $contextMenu, $fields, $newFormId } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import CloseIcn from '../../Icons/CloseIcn'
import { deepCopy } from '../../Utils/Helpers'
import { mergeNestedObj } from '../../Utils/globalHelpers'
import { removeLayoutItem } from '../../Utils/gridLayoutHelpers'
import { __ } from '../../Utils/i18nwrap'
import { DragHandle, SortableItem, SortableList } from '../Utilities/Sortable'
import multiStepStyles from '../style-new/themes/multiStepStyles'
import paymentFields from '../../Utils/StaticData/paymentFields'
import Downmenu from '../Utilities/Downmenu'
import EllipsisIcon from '../../Icons/EllipsisIcon'
import CopyIcn from '../../Icons/CopyIcn'
import TrashIcn from '../../Icons/TrashIcn'

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
  const { css } = useFela()

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
    const newLayouts = create(allLayouts, draftLayouts => {
      draftLayouts.splice(stepIndex, 1)
    })
    removedFldKeys.forEach(key => {
      removeLayoutItem(key, removedLayout)
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

  const cloneStep = stepIndex => {
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
    <div className={css(s.wrp)}>
      <div ref={scrollContainerRef} onScroll={handleScroll}>
        <SortableList useDragHandle axis="x" onSortEnd={onSortEnd}>
          <div className="flx step-wrapper">
            {formLayouts.map((_, indx) => (
              <SortableItem key={`grid-${indx * 2}`} index={indx} itemId={`grid-${indx * 2}`}>
                <div className={`btcd-s-tab-link ${css(s.stepTab)} ${activeBuilderStep === indx && 'active'}`}>
                  <DragHandle />
                  <span type="button" className="" onClick={onStepChange(indx)} onKeyDown={onStepChange(indx)} role="button" tabIndex={0}>
                    {__('Step #')}
                    {indx + 1}
                  </span>
                  {isMultiStep && (
                    <Downmenu>
                      <button
                        className={css(s.ellipsBtn)}
                        aria-label="Step Options"
                        type="button"
                      >
                        {/* <CloseIcn size="14" /> */}
                        <EllipsisIcon size="20" className={css({ tm: 'rotate(90deg)' })} />
                      </button>
                      <ul className={css(s.optionWrap)}>
                        <li className={css(s.option)}>
                          <button
                            type="button"
                            className={css(s.optionBtn)}
                            onClick={() => cloneStep(indx)}
                          >
                            <CopyIcn size={18} />
                            &nbsp;Clone Step
                          </button>
                        </li>
                        <li className={css(s.option)}>
                          <Downmenu width={250}>
                            <button type="button" className={css(s.optionBtn)}>
                              <TrashIcn size={18} />
                              &nbsp;Delete Step
                            </button>
                            <dvi className={css(s.confirmModal)}>
                              <div className="mb-2 mt-1"><b>Are you sure to delete the step?</b></div>
                              <p className={css({ fs: 12, fw: 400 })}>Note: After delete this Step. you will lose all responses of included fields.</p>
                              <div className="flx flx-c">
                                <button onClick={() => hideAll()} className="tip-btn mr-2" type="button">Cancel</button>
                                <button onClick={() => removeFormStep(indx)} className="tip-btn red-btn" type="button">Delete</button>
                              </div>
                            </dvi>
                          </Downmenu>
                        </li>
                      </ul>
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
        className={css(s.addBtn)}
        style={{ '--tooltip-txt': `'${__('Add More Related List')}'` }}
        type="button"
      >
        <CloseIcn size="12" className={css({ tm: 'rotate(45deg)' })} />
      </button>
    </div>
  )
}

const s = {
  wrp: {
    dy: 'flex',
    ai: 'center',
    bb: '1px solid #edf3fd',
  },
  addBtn: {
    se: 25,
    b: 'none',
    brs: '20%',
    p: 0,
    flxi: 'center',
    bd: 'var(--white-0-95)',
    curp: 1,
    tn: 'transform 0.2s',
    ':hover': { tm: 'scale(1.1)', cr: 'var(--b-50)' },
    ':active': { tm: 'scale(0.95)' },
  },
  ellipsBtn: {
    bd: 'transparent',
    cr: 'var(--dp-blue)',
    pn: 'relative',
    cur: 'pointer',
    fs: '20px',
    b: '0',
    p: '0',
    w: '20px',
    h: '22px',
    brs: '8px',
    oe: 'none',
    '&:hover': {
      bd: 'var(--white-0-95)',
    },
    '&:active': {
      b: '1px solid var(--white-0-83)',
    },
    '&:focus': {
      b: '1px solid var(--white-0-83)',
    },
  },
  stepTab: {
    flxi: 'center',
    mr: 5,
    cg: 4,
    h: 30,
    ws: 'nowrap',
    fs: 12,
    fw: 500,
    b: 'none',
    '&.active': {
      bd: 'var(--b-79-96)',
    },
  },
  optionWrap: { m: 0, w: 125 },
  option: { dy: 'block', m: 0 },
  optionBtn: {
    m: 0,
    brs: 6,
    curp: 1,
    tn: 'background .3s',
    py: 3,
    px: 10,
    fw: 500,
    b: 'none',
    w: '100%',
    bd: 'none',
    ta: 'left',
    ':hover': { bd: 'var(--white-0-95)' },
  },
  confirmModal: {
    m: 0,
    p: 0,
    w: 200,
  },
}
