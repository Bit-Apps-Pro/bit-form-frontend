/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-undef */

import produce from 'immer'
import { memo, useContext, useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import { useHistory } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $additionalSettings, $breakpoint, $builderHelperStates, $builderHistory, $draggingField, $fields, $layouts, $selectedFieldId, $styles, $uniqueFieldId, $updateBtn } from '../GlobalStates'
import { ShowProModalContext } from '../pages/FormDetails'
import '../resource/css/grid-layout.css'
import { AppSettings } from '../Utils/AppSettingsContext'
import { addNewItemInLayout, addToBuilderHistory, checkFieldsExtraAttr, sortLayoutItemsByRowCol, convertLayout, filterLayoutItem, propertyValueSumX, produceNewLayouts } from '../Utils/FormBuilderHelper'
import { deepCopy, isObjectEmpty } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import useComponentVisible from './CompSettings/StyleCustomize/ChildComp/useComponentVisible'
import FieldBlockWrapper from './FieldBlockWrapper'
import FieldContextMenu from './FieldContextMenu'
import defaultTheme from './style-new/defaultTheme'
import RenderStyle from './style-new/RenderStyle'
import ConfirmModal from './Utilities/ConfirmModal'

function GridLayout({ newData, setNewData, style, gridWidth, formID }) {
  console.log('render gridlay')
  const { payments } = useContext(AppSettings)
  const setProModal = useContext(ShowProModalContext)
  const [fields, setFields] = useRecoilState($fields)
  const [rootLayouts, setRootLayouts] = useRecoilState($layouts)
  const [builderHelperStates, setBuilderHelperStates] = useRecoilState($builderHelperStates)
  const [layouts, setLayouts] = useState(rootLayouts)
  const [selectedFieldId, setSelectedFieldId] = useRecoilState($selectedFieldId)
  const draggingField = useRecoilValue($draggingField)
  const [styles, setStyles] = useRecoilState($styles)
  const [breakpoint, setBreakpoint] = useRecoilState($breakpoint)
  const [builderWidth, setBuilderWidth] = useState(gridWidth - 32)
  // const cols = { lg: 6, md: 4, sm: 2 }
  // const cols = { lg: 120, md: 80, sm: 40 }
  const cols = { lg: 60, md: 40, sm: 20 }
  const [gridContentMargin, setgridContentMargin] = useState([-0.2, 0])
  const [rowHeight, setRowHeight] = useState(2)
  const [alertMdl, setAlertMdl] = useState({ show: false, msg: '' })
  const uniqueFieldId = useRecoilValue($uniqueFieldId)
  const additional = useRecoilValue($additionalSettings)
  const setUpdateBtn = useSetRecoilState($updateBtn)
  const setBuilderHistory = useSetRecoilState($builderHistory)
  const [contextMenu, setContextMenu] = useState({})
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  const history = useHistory()
  const { reRenderGridLayoutByRootLay } = builderHelperStates

  useEffect(() => { setLayouts(rootLayouts); setBuilderHelperStates(prv => ({ ...prv, reRenderGridLayoutByRootLay: false })) }, [reRenderGridLayoutByRootLay])

  useEffect(() => { margeNewData() }, [newData, fields])

  useEffect(() => {
    const lgLength = layouts.lg.length
    const mdLength = layouts.md.length
    const smLength = layouts.sm.length
    if (breakpoint === 'md' && lgLength !== mdLength) {
      const newLayouts = produceNewLayouts(layouts, ['md'], cols)
      setLayouts(newLayouts)
    }
    if (breakpoint === 'sm' && lgLength !== smLength) {
      const newLayouts = produceNewLayouts(layouts, ['sm'], cols)
      setLayouts(newLayouts)
    }
  }, [breakpoint])

  useEffect(() => {
    let w = 0
    let h = 0

    if (style[`._frm-${formID}`]?.['border-width']) { w += propertyValueSumX(style[`._frm-${formID}`]['border-width']) }
    if (style[`._frm-${formID}`]?.padding) { w += propertyValueSumX(style[`._frm-${formID}`].padding) }
    if (style[`._frm-${formID}`]?.margin) { w += propertyValueSumX(style[`._frm-${formID}`].margin) }
    if (style[`._frm-bg-${formID}`]?.['border-width']) { w += propertyValueSumX(style[`._frm-bg-${formID}`]['border-width']) }
    if (style[`._frm-bg-${formID}`]?.padding) { w += propertyValueSumX(style[`._frm-bg-${formID}`].padding) }
    if (style[`._frm-bg-${formID}`]?.margin) { w += propertyValueSumX(style[`._frm-bg-${formID}`].margin) }
    setBuilderWidth(gridWidth - 33 - w)

    if (style[`._frm-g-${formID}`]?.gap) {
      const gaps = style[`._frm-g-${formID}`].gap.replace(/px/g, '').split(' ')
      setgridContentMargin([Number(gaps[1]), Number(gaps[0])])
    }

    if (style[`.fld-lbl-${formID}`]?.['font-size']) {
      let lineHeight = 1
      if (style[`.fld-lbl-${formID}`]?.['line-height']) {
        lineHeight = filterNumber(style[`.fld-lbl-${formID}`]['line-height'])
      }
      h += filterNumber(style[`.fld-lbl-${formID}`]['font-size']) * lineHeight
    }
    if (style[`.fld-wrp-${formID}`]?.padding) { h += propertyValueSumY(style[`.fld-wrp-${formID}`].padding) }
    if (style[`input.fld-${formID},textarea.fld-${formID}`]?.margin) { h += propertyValueSumY(style[`input.fld-${formID},textarea.fld-${formID}`].margin) }
    if (style[`input.fld-${formID},textarea.fld-${formID}`]?.height) {
      h += filterNumber(style[`input.fld-${formID},textarea.fld-${formID}`].height)
    } else { h += 40 /* default field height */ }
    // if (style[`input.fld-${formID},textarea.fld-${formID}`]?.['border-width']) { h += propertyValueSumY(style[`input.fld-${formID},textarea.fld-${formID}`]['border-width']) }
    // let topNbottomPadding = 0
    // if (style[`input.fld-${formID},textarea.fld-${formID}`]?.padding) {
    //   topNbottomPadding = propertyValueSumY(style[`input.fld-${formID},textarea.fld-${formID}`].padding)
    // }
    // if (topNbottomPadding > 39) {
    //   h += topNbottomPadding - 39
    // }
    // h += 40 // default field height
    // setRowHeight((h / 2) / 10)

    // set row height in local
    sessionStorage.setItem('btcd-rh', h / 2)
  }, [style, gridWidth, formID])

  const filterNumber = numberString => Number(numberString.replace(/px|em|rem|!important/g, ''))

  const propertyValueSumY = (propertyValue = '') => {
    let arr = propertyValue?.replace(/px|em|rem|!important/g, '').split(' ')
    if (arr.length === 1) { arr = Array(4).fill(arr[0]) }
    if (arr.length === 2) { arr = [arr[0], arr[1], arr[0], arr[1]] }
    if (arr.length === 3) { arr = [arr[0], arr[1], arr[2], arr[1]] }
    arr = [arr[0], arr[2]]
    const summ = arr?.reduce((pv, cv) => Number(pv) + Number(cv), 0)
    return summ || 0
  }

  const margeNewData = () => {
    if (newData !== null) {
      addNewField(newData.fieldData, newData.fieldSize, { x: 0, y: Infinity })
    }
    setNewData(null)
  }

  const onBreakpointChange = bp => setBreakpoint(bp)

  const removeLayoutItem = fldKey => {
    const fldData = fields[fldKey]
    if (fldData?.typ === 'button' && fldData?.btnTyp === 'submit') {
      const payFields = fields ? Object.values(fields).filter(field => field.typ.match(/paypal|razorpay/)) : []
      if (!payFields.length) {
        setAlertMdl({ show: true, msg: __('Submit button cannot be removed') })
        return
      }
    }
    const removedLay = {
      lg: layouts.lg.find(l => l.i === fldKey),
      md: layouts.md.find(l => l.i === fldKey),
      sm: layouts.sm.find(l => l.i === fldKey),
    }
    const nwLay = filterLayoutItem(fldKey, layouts)
    const tmpFields = produce(fields, draftFields => { delete draftFields[fldKey] })
    setLayouts(nwLay)
    setFields(tmpFields)
    setSelectedFieldId(null)
    sessionStorage.setItem('btcd-lc', '-')
    setUpdateBtn({ unsaved: true })

    // add to history
    const event = `${fldData.lbl} removed`
    const action = 'remove_fld'
    const state = { fldKey, breakpoint, layout: removedLay, fldData }
    addToBuilderHistory(setBuilderHistory, { event, action, state })
  }

  const clsAlertMdl = () => {
    const tmpAlert = { ...alertMdl }
    tmpAlert.show = false
    setAlertMdl(tmpAlert)
  }

  const handleFieldExtraAttr = (fieldData) => {
    const extraAttr = checkFieldsExtraAttr(fieldData, fields, payments, additional, bits, __)

    if (extraAttr.validType === 'pro') {
      setProModal({ show: true, msg: extraAttr.msg })
      return 0
    }

    if (extraAttr.validType === 'onlyOne') {
      setAlertMdl({ show: true, msg: extraAttr.msg })
      return 0
    }

    if (extraAttr.validType === 'setDefaultPayConfig') {
      const newFldData = produce(draggingField, draft => {
        // eslint-disable-next-line no-param-reassign
        draft.fieldData.payIntegID = extraAttr.payData.id
      })
      return newFldData
    }

    return fieldData
  }

  function addNewField(fieldData, fieldSize, addPosition) {
    const processedFieldData = handleFieldExtraAttr(fieldData)
    if (!processedFieldData) return
    const { w, h, minH, maxH, minW } = fieldSize
    // eslint-disable-next-line prefer-const
    let { x, y } = addPosition
    if (y !== 0) { y -= 1 }
    const newBlk = `b${formID}-${uniqueFieldId}`
    const newLayoutItem = { i: newBlk, x, y, w, h, minH, maxH, minW }
    // const newLayoutItem = { i: newBlk, x, y, w: w * 10, h: h * 10 }
    const newLayouts = addNewItemInLayout(layouts, newLayoutItem)
    setLayouts(newLayouts)
    setFields({ ...fields, [newBlk]: processedFieldData })
    sessionStorage.setItem('btcd-lc', '-')
    setUpdateBtn({ unsaved: true })

    // add to history
    const event = `${fieldData.lbl} added`
    const action = 'add_fld'
    const state = { fldKey: newBlk, breakpoint, layout: newLayoutItem, fldData: processedFieldData }
    addToBuilderHistory(setBuilderHistory, { event, action, state })
    setTimeout(() => {
      document.querySelector(`[data-key="${newBlk}"]`)?.focus()
      // .scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 500)

    // add style
    const newStyle = produce(styles, draftStyle => {
      const globalTheme = draftStyle.theme
      if (globalTheme === 'defaultBlue') {
        const fieldStyle = { theme: 'defaultBlue', classes: defaultTheme(newBlk, processedFieldData.typ) }
        draftStyle.fields[newBlk] = fieldStyle
      }
    })
    console.log('new style ', newStyle)
    setStyles(newStyle)

    return { newBlk }
  }

  const cloneLayoutItem = fldKey => {
    const fldData = fields[fldKey]
    if (!handleFieldExtraAttr(fldData)) return

    const newBlk = `b${formID}-${uniqueFieldId}`
    const newLayItem = {}

    const tmpLayouts = produce(layouts, draft => {
      const allBreakpoints = ['sm', 'md', 'lg']
      allBreakpoints.forEach(brkpnt => {
        const layIndx = layouts[brkpnt].findIndex(lay => lay.i === fldKey)
        const { x, y, w, h, minH, maxH, minW } = layouts[brkpnt][layIndx]
        const newLayoutItem = { i: newBlk, x, y: y + h, w, h, minH, maxH, minW }
        newLayItem[brkpnt] = newLayoutItem
        draft[brkpnt].splice(layIndx + 1, 0, newLayoutItem)
      })
    })

    setLayouts(tmpLayouts)
    // eslint-disable-next-line no-param-reassign
    setFields(oldFields => produce(oldFields, draft => { draft[newBlk] = fldData }))

    sessionStorage.setItem('btcd-lc', '-')
    setUpdateBtn({ unsaved: true })

    setTimeout(() => {
      document.querySelector(`[data-key="${newBlk}"]`)?.focus()
      // .scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 500)

    // add to history
    const event = `${fldData.lbl} cloned`
    const action = 'add_fld'
    const state = { fldKey: newBlk, breakpoint, layout: newLayItem, fldData }
    addToBuilderHistory(setBuilderHistory, { event, action, state })

    resetContextMenu()
  }

  const onDrop = (lay, dropPosition) => {
    addNewField(draggingField.fieldData, draggingField.fieldSize, dropPosition)
  }

  const handleLayoutChange = (l, layoutsFromGrid) => {
    if (layoutsFromGrid.lg.length === layoutsFromGrid.md.length
      && layoutsFromGrid.lg.length === layoutsFromGrid.sm.length
      && layoutsFromGrid.md.length === layoutsFromGrid.sm.length) {
      setLayouts(layoutsFromGrid)
      setRootLayouts(layoutsFromGrid)
    }
  }

  const handleContextMenu = (e, fldKey) => {
    e.preventDefault()
    const topPos = ref.current.getBoundingClientRect().top + window.scrollY
    const leftPos = ref.current.getBoundingClientRect().left + window.scrollX
    let x = (e.clientX - leftPos) + 5
    const y = e.clientY - topPos

    const test = document.getElementById('layout-wrapper')
    const rootW = Number(test.style.width.substr(0, test.style.width.indexOf('px')))

    const right = (x + 170) > rootW
    if (right) {
      x = (e.clientX - leftPos) - 150
    }
    setContextMenu({ fldKey, x, y })
    setSelectedFieldId(fldKey)
    setIsComponentVisible(true)
  }

  const resetContextMenu = () => {
    setContextMenu({})
    setIsComponentVisible(false)
  }

  const navigateToFieldSettings = () => {
    history.replace(history.location.pathname.replace(/style\/.+|style/g, 'fs'))
    resetContextMenu()
  }

  const navigateToStyle = typ => {
    if (typ === 'paypal') history.replace(history.location.pathname.replace(/fs|style\/.+|style/g, 'style/fl/ppl'))
    // if (/text|textarea|number|password|email|url|date|time|week|month|datetime-local|/g.test(typ){
    else history.replace(history.location.pathname.replace(/fs|style\/.+/g, 'style'))
    resetContextMenu()
  }

  const handleFldBlockEvent = (fieldId) => {
    setSelectedFieldId(fieldId)
    console.log('empty cobntatex')
    if (!isObjectEmpty(contextMenu)) {
      setContextMenu({})
    }
  }

  return (
    <div style={{ width: gridWidth - 9 }} className="layout-wrapper" id="layout-wrapper" onDragOver={e => e.preventDefault()} onDragEnter={e => e.preventDefault()}>
      <RenderStyle styleClasses={styles.commonClasses} />
      <Scrollbars autoHide>
        <div id={`f-${formID}`} style={{ padding: 10, paddingRight: 13 }} className={draggingField && breakpoint === 'lg' ? 'isDragging' : ''}>
          <div className={`_frm-bg-${formID} _frm-bg`}>
            <div className={`_frm-${formID}`}>
              <ResponsiveReactGridLayout
                width={Math.round(builderWidth)}
                measureBeforeMount={false}
                compactType="vertical"
                useCSSTransforms
                isDroppable={draggingField !== null && breakpoint === 'lg'}
                className="layout"
                onDrop={onDrop}
                resizeHandles={['se', 'e']}
                droppingItem={draggingField?.fieldSize}
                onLayoutChange={handleLayoutChange}
                // cols={cols}
                cols={cols}
                // cols={{ lg: 120, md: 120, sm: 120 }}
                breakpoints={{ lg: 700, md: 420, sm: 300 }}
                rowHeight={rowHeight}
                margin={gridContentMargin}
                containerPadding={[1, 1]}
                draggableCancel=".no-drg"
                draggableHandle=".drag"
                layouts={layouts}
                onBreakpointChange={onBreakpointChange}
                onDragStop={() => sessionStorage.setItem('btcd-lc', '-')}
                onResizeStop={() => sessionStorage.setItem('btcd-lc', '-')}
              >
                {layouts[breakpoint].map(layoutItem => (
                  <div
                    key={layoutItem.i}
                    data-key={layoutItem.i}
                    className={`blk ${layoutItem.i === selectedFieldId && 'itm-focus'}`}
                    onClick={() => handleFldBlockEvent(layoutItem.i)}
                    onKeyPress={() => handleFldBlockEvent(layoutItem.i)}
                    role="button"
                    tabIndex={0}
                    onContextMenu={e => handleContextMenu(e, layoutItem.i)}
                  >
                    <FieldBlockWrapper
                      {...{
                        layoutItem,
                        removeLayoutItem,
                        cloneLayoutItem,
                        fields,
                        formID,
                        navigateToFieldSettings,
                        navigateToStyle,
                      }}
                    />
                  </div>
                ))}
              </ResponsiveReactGridLayout>
            </div>
          </div>
        </div>
      </Scrollbars>
      <div ref={ref} className="pos-rel">
        <CSSTransition
          in={isComponentVisible}
          timeout={150}
          classNames="btc-pk"
          unmountOnExit
          onExit={() => resetContextMenu()}
        >
          <FieldContextMenu
            isContextMenu
            isComponentVisible={isComponentVisible}
            setIsComponentVisible={setIsComponentVisible}
            contextMenu={contextMenu}
            setContextMenu={setContextMenu}
            resetContextMenu={resetContextMenu}
            navigateToFieldSettings={navigateToFieldSettings}
            navigateToStyle={navigateToStyle}
            cloneLayoutItem={cloneLayoutItem}
            removeLayoutItem={removeLayoutItem}
          />
        </CSSTransition>
      </div>

      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="red"
        btnTxt="Close"
        show={alertMdl.show}
        close={clsAlertMdl}
        action={clsAlertMdl}
        title="Sorry"
      >
        <div className="txt-center">{alertMdl.msg}</div>
      </ConfirmModal>
    </div>
  )
}

export default memo(GridLayout)
