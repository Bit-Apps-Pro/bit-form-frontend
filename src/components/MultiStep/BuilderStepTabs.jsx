import { arrayMoveImmutable } from 'array-move'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useNavigate, useParams } from 'react-router-dom'
import { hideAll } from 'tippy.js'
import useSmoothHorizontalScroll from 'use-smooth-horizontal-scroll'
import { $activeBuilderStep } from '../../GlobalStates/FormBuilderStates'
import {
  $alertModal, $allLayouts,
  $builderHookStates, $contextMenu, $fields, $flags, $formInfo, $nestedLayouts, $newFormId, $selectedFieldId, $updateBtn,
} from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import CloseIcn from '../../Icons/CloseIcn'
import CopyIcn from '../../Icons/CopyIcn'
import EllipsisIcon from '../../Icons/EllipsisIcon'
import SettingsIcn from '../../Icons/SettingsIcn'
import TrashIcn from '../../Icons/TrashIcn'
import { builderBreakpoints, handleFieldExtraAttr } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import defaultMultstepSettings from '../../Utils/StaticData/form-templates/defaultMultstepSettings'
import defaultStepSettings from '../../Utils/StaticData/form-templates/defaultStepSettings'
import paymentFields from '../../Utils/StaticData/paymentFields'
import { mergeNestedObj } from '../../Utils/globalHelpers'
import { cloneLayoutItem, removeLayoutItem } from '../../Utils/gridLayoutHelpers'
import { __ } from '../../Utils/i18nwrap'
import Downmenu from '../Utilities/Downmenu'
import { DragHandle, SortableItem, SortableList } from '../Utilities/Sortable'
import multiStepStyle_0_noStyle from '../style-new/themes/0_noStyle/multiStepStyle_0_noStyle'
import multiStepStyle_1_bitformDefault from '../style-new/themes/1_bitformDefault/multiStepStyle_1_bitformDefaullt'
import multiStepeStyle_2_atlassian from '../style-new/themes/2_atlassian/multiStepStyle_2_atlassian'
import Tip from '../Utilities/Tip'

export default function BuilderStepTabs() {
  const [allLayouts, setAllLayouts] = useAtom($allLayouts)
  const [activeBuilderStep, setActiveBuilderStep] = useAtom($activeBuilderStep)
  const [formInfo, setFormInfo] = useAtom($formInfo)
  const setBuilderHookStates = useSetAtom($builderHookStates)
  const setContextMenu = useSetAtom($contextMenu)
  const flags = useAtomValue($flags)
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
  const fields = useAtomValue($fields)
  const setAlertMdl = useSetAtom($alertModal)
  const [nestedLayouts, setNestedLayouts] = useAtom($nestedLayouts)
  const setUpdateBtn = useSetAtom($updateBtn)
  const setSelectedFieldId = useSetAtom($selectedFieldId)
  const { styleMode } = flags
  const { css } = useFela()

  const getMultiStepStyle = () => {
    if (styles.theme === 'noStyle') return multiStepStyle_0_noStyle({ formId: formID })
    if (styles.theme === 'bitformDefault') return multiStepStyle_1_bitformDefault({ formId: formID })
    if (styles.theme === 'atlassian') return multiStepeStyle_2_atlassian({ formId: formID })
    return multiStepStyle_1_bitformDefault({ formId: formID })
  }

  const addFormStep = () => {
    setAllLayouts(prevLayouts => create(prevLayouts, draftLayouts => {
      const nextStep = !Array.isArray(draftLayouts) ? 1 : draftLayouts.length
      const stepData = { layout: { lg: [], md: [], sm: [] }, settings: defaultStepSettings(nextStep) }
      if (!Array.isArray(draftLayouts)) {
        setActiveBuilderStep(1)
        const newSteps = [
          { layout: draftLayouts, settings: defaultStepSettings(0) },
          stepData,
        ]
        return newSteps
      }
      draftLayouts.push(stepData)
      setActiveBuilderStep(draftLayouts.length - 1)
    }))
    setFormInfo(prevFormInfo => create(prevFormInfo, draftFormInfo => {
      if (!draftFormInfo.multiStepSettings) {
        draftFormInfo.multiStepSettings = defaultMultstepSettings
      }
      draftFormInfo.isMultiStepForm = true
    }))
    setStyles(prevStyles => create(prevStyles, draftStyles => {
      if (!draftStyles.form[`._frm-b${formID}-stp-cntnr`]) {
        draftStyles.form = mergeNestedObj(draftStyles.form, getMultiStepStyle())
      }
      Object.keys(fields || {}).forEach(fldKey => {
        draftStyles.fields[fldKey].classes[`.${fldKey}-err-wrp`] = {
          transition: 'all .3s',
          display: 'grid',
          'grid-template-rows': '0fr',
        }
        draftStyles.fields[fldKey].classes[`.${fldKey}-err-inner`] = {
          overflow: 'hidden',
        }
      })
    }))
    setBuilderHookStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
    navigate(`${path}/step-settings`, { replace: true })
  }

  const removeFormStep = stepIndex => {
    const lastStepIndex = allLayouts.length - 1
    const removedLayout = deepCopy(allLayouts[stepIndex].layout)
    const removedFldKeys = removedLayout.lg.map(l => l.i)
    const cannotRemove = removedFldKeys.some(fKey => {
      const fldData = fields[fKey]
      if (fldData?.typ === 'button' && fldData?.btnTyp === 'submit') {
        const payFields = fields ? Object.values(fields).filter(field => paymentFields.includes(field.typ)) : []
        if (!payFields.length) {
          setAlertMdl({ show: true, msg: __('Submit button cannot be removed'), cancelBtn: false })
          return true
        }
      }
    })
    hideAll()
    if (cannotRemove) return
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
        const stepStyles = multiStepStyle_1_bitformDefault({ formId: formID })
        Object.keys(stepStyles).forEach(key => {
          delete draftStyles.form[key]
        })
      }))
      setFormInfo(prevFormInfo => create(prevFormInfo, draftFormInfo => {
        draftFormInfo.isMultiStepForm = false
      }))
    }
    setBuilderHookStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
    if (newLayouts.length > 1) navigate(`${path}/step-settings/`, { replace: true })
    else navigate(`${path}/fields-list`, { replace: true })
  }

  const cloneFormStep = stepIndex => {
    const cloningStep = allLayouts[stepIndex]
    const cloningLayout = cloningStep.layout
    const cloningFldKeys = cloningLayout.lg.map(l => l.i)
    const cannotClone = cloningFldKeys.some(fKey => {
      const fldData = fields[fKey]
      return !handleFieldExtraAttr(fldData)
    })
    hideAll()
    if (cannotClone) return
    const newStepIndex = stepIndex + 1
    const clonedStep = deepCopy(cloningStep)
    clonedStep.settings.title = `Step ${allLayouts.length + 1}`
    let draftAllLayouts = create(allLayouts, draftLayouts => {
      draftLayouts.splice(newStepIndex, 0, clonedStep)
    })
    let draftNestedLayouts = create(nestedLayouts, () => { })
    cloningFldKeys.forEach(key => {
      const newClonedLayout = draftAllLayouts[newStepIndex].layout
      const { newBlk: newFldKey, newLayouts: clonedLayouts } = cloneLayoutItem(key, newClonedLayout)
      // remove the old layout from the new layout after clone
      const newClonedLayouts = create(clonedLayouts, draftClonedLayouts => {
        Object.keys(builderBreakpoints).forEach(bp => {
          const indx = draftClonedLayouts[bp].findIndex(l => l.i === key)
          draftClonedLayouts[bp].splice(indx, 1)
        })
      })
      draftAllLayouts = create(draftAllLayouts, draftLayouts => {
        draftLayouts[newStepIndex].layout = newClonedLayouts
      })
      if (nestedLayouts[key]) {
        draftNestedLayouts = create(draftNestedLayouts, draftLayouts => {
          draftLayouts[newFldKey] = deepCopy(nestedLayouts[key])
          const nestedLay = nestedLayouts[key]
          const flds = nestedLay.lg.map(l => l.i)
          flds.forEach(fldKey => {
            const { newLayouts: clonedNestedLayouts } = cloneLayoutItem(fldKey, draftLayouts[newFldKey])
            draftLayouts[newFldKey] = clonedNestedLayouts
            Object.keys(builderBreakpoints).forEach(bp => {
              const indx = clonedNestedLayouts[bp].findIndex(l => l.i === fldKey)
              clonedNestedLayouts[bp].splice(indx, 1)
            })
          })
        })
      }
    })
    setNestedLayouts(draftNestedLayouts)
    setAllLayouts(draftAllLayouts)
    setActiveBuilderStep(newStepIndex)
    setBuilderHookStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
    navigate(`${path}/step-settings`, { replace: true })
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (!Array.isArray(allLayouts)) return
    setAllLayouts((items) => arrayMoveImmutable(items, oldIndex, newIndex))
    if (oldIndex === activeBuilderStep) setActiveBuilderStep(newIndex)
    setUpdateBtn(prevState => ({ ...prevState, unsaved: true }))
  }

  const onStepChange = stepIndex => () => {
    setActiveBuilderStep(stepIndex)
    setContextMenu({})
    setBuilderHookStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    if (formLayouts.length !== 1) navigate(`${path}/step-settings`, { replace: true })
  }

  const goToStepSettings = stepIndex => () => {
    setActiveBuilderStep(stepIndex)
    setContextMenu({})
    hideAll()
    setBuilderHookStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: prv.reRenderGridLayoutByRootLay + 1 }))
    navigate(`${path}/step-settings`, { replace: true })
  }

  const goToMultiStepSettings = () => {
    setContextMenu({})
    hideAll()
    setSelectedFieldId(null)
    navigate(`${path}/multi-step-settings`, { replace: true })
  }

  return (
    <div className={css(s.wrp)}>
      <div ref={scrollContainerRef} onScroll={handleScroll}>
        <SortableList useDragHandle axis="x" onSortEnd={onSortEnd}>
          <div className={css(s.tabWrpr)}>
            {formLayouts.map((_, indx) => (
              <SortableItem key={`grid-${indx * 2}`} index={indx} itemId={`grid-${indx * 2}`}>
                <div className={`btcd-s-tab-link ${css(s.stepTab)} ${activeBuilderStep === indx && 'active'}`}>
                  <DragHandle />
                  <span type="button" className={css(s.stepTitle)} onClick={onStepChange(indx)} onKeyDown={onStepChange(indx)} role="button" tabIndex={0}>
                    {__('Step-')}
                    {indx + 1}
                  </span>
                  {isMultiStep && (
                    <Downmenu>
                      <button
                        className={css(s.ellipsBtn)}
                        aria-label="Step Options"
                        type="button"
                      >
                        <EllipsisIcon size="20" className={css({ tm: 'rotate(90deg)' })} />
                      </button>
                      <ul className={css(s.optionWrap)}>
                        <li className={css(s.option)}>
                          <button
                            type="button"
                            className={css(s.optionBtn)}
                            onClick={goToStepSettings(indx)}
                          >
                            <SettingsIcn size={18} />
                            <span>Settings</span>
                          </button>
                        </li>
                        <li className={css(s.option)}>
                          <button
                            type="button"
                            className={css(s.optionBtn)}
                            onClick={() => cloneFormStep(indx)}
                          >
                            <CopyIcn size={18} />
                            <span>Clone Step</span>
                          </button>
                        </li>
                        <li className={css(s.option)}>
                          <Downmenu width={250}>
                            <button type="button" className={css(s.optionBtn)}>
                              <TrashIcn size={18} />
                              <span>Delete Step</span>
                            </button>
                            <div className={css(s.confirmModal)}>
                              <div className="mb-2 mt-1"><b>Are you sure to delete the step?</b></div>
                              <p className={css({ fs: 12, fw: 400 })}>Note: After delete this Step. you will lose all responses of included fields.</p>
                              <div className="flx flx-c">
                                <button onClick={() => hideAll()} className="tip-btn mr-2" type="button">Cancel</button>
                                <button onClick={() => removeFormStep(indx)} className="tip-btn red-btn" type="button">Delete</button>
                              </div>
                            </div>
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
      <div className={css(s.addBtnWrp)}>
        <Tip msg={__('Add New Step')}>
          <button
            onClick={addFormStep}
            className={css(s.addBtn)}
            type="button"
          >
            <CloseIcn size="12" className={css({ tm: 'rotate(45deg)' })} />
          </button>
        </Tip>
        {isMultiStep && (
          <Tip msg={__('Multi step settings')}>
            <button
              onClick={goToMultiStepSettings}
              className={css(s.addBtn)}
              type="button"
            >
              <SettingsIcn size={20} />
            </button>
          </Tip>
        )}
      </div>
    </div>
  )
}

const s = {
  wrp: {
    dy: 'flex',
    ai: 'center',
    bb: '1px solid #edf3fd',
  },
  sortableWrp: {
    w: '100%',
    mxw: 'max-content',
    owx: 'auto',
  },
  addBtnWrp: {
    mnw: 25,
    dy: 'flex',
    flxp: 'wrap',
    gp: 5,
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
    fs: 20,
    b: '1px solid transparent',
    p: '0',
    w: 22,
    h: 22,
    brs: '8px',
    oe: 'none',
    '&:hover': {
      b: '1px solid var(--white-0-83)',
    },
    '&:active': {
      b: '1px solid var(--white-0-83)',
    },
    '&:focus': {
      b: '1px solid var(--white-0-83)',
    },
  },
  tabWrpr: {
    dy: 'flex',
    flxp: 1,
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
    p: '0 5px',
    '&.active': {
      bd: 'var(--b-79-96)',
    },
  },
  stepTitle: {
    cur: 'pointer',
    p: '8px 0px',
  },
  optionWrap: { m: 0, w: 125 },
  option: { dy: 'block', m: 0 },
  optionBtn: {
    m: 0,
    brs: 6,
    curp: 1,
    tn: 'background .3s',
    py: 5,
    px: 10,
    fw: 500,
    b: 'none',
    w: '100%',
    bd: 'none',
    ta: 'left',
    flx: 'align-center',
    gp: 5,
    ':hover': { bd: 'var(--white-0-95)' },
  },
  confirmModal: {
    m: 0,
    p: 0,
    w: 200,
  },
}
