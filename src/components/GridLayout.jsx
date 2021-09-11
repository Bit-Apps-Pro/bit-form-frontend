/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-undef */

import produce from 'immer'
import { memo, useContext, useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $additionalSettings, $breakpoint, $builderHistory, $draggingField, $fields, $layouts, $selectedFieldId, $uniqueFieldId, $updateBtn } from '../GlobalStates'
import { ShowProModalContext } from '../pages/FormDetails'
import '../resource/css/grid-layout.css'
import { AppSettings } from '../Utils/AppSettingsContext'
import { addToBuilderHistory, checkFieldsExtraAttr, compactNewLayoutItem, compactRemovedLayoutItem, propertyValueSumX } from '../Utils/FormBuilderHelper'
import { deepCopy } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import FieldBlockWrapper from './FieldBlockWrapper'
import ConfirmModal from './Utilities/ConfirmModal'

function GridLayout({ newData, setNewData, style, gridWidth, formID }) {
  console.log('render gridlay')
  const { payments } = useContext(AppSettings)
  const setProModal = useContext(ShowProModalContext)
  const [fields, setFields] = useRecoilState($fields)
  const [layout, setLay] = useRecoilState($layouts)
  const [selectedFieldId, setSelectedFieldId] = useRecoilState($selectedFieldId)
  const draggingField = useRecoilValue($draggingField)
  const [layouts, setLayouts] = useState(layout)
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

  useEffect(() => {
    checkAllLayoutSame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // check all layout by breakpoint is same otherwise push missing layout item
  function checkAllLayoutSame() {
    let notSame = false

    layouts.lg.map(item => {
      if (!layouts.md.find(itm => itm.i === item.i)) {
        const tmpItem = { ...item }
        if (tmpItem.w >= cols.md) {
          tmpItem.w = cols.md
        }
        layouts.md.push(tmpItem)
        notSame = true
      } else if (!layouts.sm.find(itm => itm.i === item.i)) {
        const tmpItem = { ...item }
        if (tmpItem.w >= cols.sm) {
          tmpItem.w = cols.sm
        }
        layouts.sm.push(tmpItem)
        notSame = true
      }
    })
    if (notSame) { setLayouts(layouts) }
  }

  useEffect(() => {
    setLayouts(deepCopy(layout))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout])

  useEffect(() => {
    if (newData !== null) {
      margeNewData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData, fields])

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
    const { newBlk: newFieldKey } = addNewField(newData.fieldData, newData.fieldSize, { x: 0, y: Infinity })
    setTimeout(() => {
      document.querySelector(`[data-key="${newFieldKey}"]`)?.focus()
      // .scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 500)
    setNewData(null)
  }

  const onLayoutChange = (newLay, newLays) => {
    if (newLays.lg.length === layouts.lg.length
      && newLays.md.length === layouts.md.length
      && newLays.sm.length === layouts.sm.length) {
      // setLayouts(extendLayout(newLays))
      // setLay(extendLayout(newLays))
      setLayouts(newLays)
      setLay(newLays)
      console.log('layout changed')
    }
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
    const nwLay = compactRemovedLayoutItem(fldKey, breakpoint, layouts)
    const tmpFields = { ...fields }
    delete tmpFields[fldKey]
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
    const newBlk = `bf${formID}-${uniqueFieldId}`
    const newLayoutItem = { i: newBlk, x, y, w: w * 10, h: h * 20, minH: minH * 10 || minH, maxH: maxH * 20 || maxH, minW: minW * 10 || minW }
    // const newLayoutItem = { i: newBlk, x, y, w: w * 10, h: h * 10 }
    const tmpLayouts = compactNewLayoutItem(breakpoint, newLayoutItem, layouts)

    setLayouts(tmpLayouts)
    setFields({ ...fields, [newBlk]: processedFieldData })
    sessionStorage.setItem('btcd-lc', '-')
    setUpdateBtn({ unsaved: true })

    // add to history
    const event = `${fieldData.lbl} added`
    const action = 'add_fld'
    const state = { fldKey: newBlk, breakpoint, layout: newLayoutItem, fldData: processedFieldData }
    addToBuilderHistory(setBuilderHistory, { event, action, state })

    return { newBlk }
  }

  const onDrop = (lay, dropPosition) => {
    addNewField(draggingField.fieldData, draggingField.fieldSize, dropPosition)
  }

  return (
    <div style={{ width: gridWidth - 9 }} className="layout-wrapper" onDragOver={e => e.preventDefault()} onDragEnter={e => e.preventDefault()}>
      <Scrollbars autoHide>
        <div id={`f-${formID}`} style={{ padding: 10, paddingRight: 13 }} className={draggingField ? 'isDragging' : ''}>
          <div className={`_frm-bg-${formID} _frm-bg`} style={{ overflow: 'auto' }}>
            <div className={`_frm-${formID}`}>
              <ResponsiveReactGridLayout
                width={Math.round(builderWidth)}
                measureBeforeMount={false}
                compactType="vertical"
                useCSSTransforms
                isDroppable={draggingField !== null}
                className="layout"
                onDrop={onDrop}
                resizeHandles={['se', 'e']}
                onLayoutChange={onLayoutChange}
                droppingItem={draggingField?.fieldSize}
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
                    onClick={() => setSelectedFieldId(layoutItem.i)}
                    onKeyPress={() => setSelectedFieldId(layoutItem.i)}
                    role="button"
                    tabIndex={0}
                  >
                    <FieldBlockWrapper
                      {...{
                        layoutItem,
                        removeLayoutItem,
                        fields,
                        formID,
                      }}
                    />
                  </div>
                ))}
              </ResponsiveReactGridLayout>
            </div>
          </div>
        </div>
      </Scrollbars>
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
        <div className="txt-center">
          {alertMdl.msg}
        </div>
      </ConfirmModal>
    </div>
  )
}

export default memo(GridLayout)
