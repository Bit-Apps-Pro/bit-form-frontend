/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-undef */

import { memo, useContext, useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $bits, $fields, $layouts, $selectedFieldId, $uniqueFieldId } from '../GlobalStates'
import { ShowProModalContext } from '../pages/FormDetails'
import '../resource/css/grid-layout.css'
import { AppSettings } from '../Utils/AppSettingsContext'
import { propertyValueSumX, sortLayoutByXY } from '../Utils/FormBuilderHelper'
import { deepCopy, isType } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import FieldBlockWrapper from './FieldBlockWrapper'
import ConfirmModal from './Utilities/ConfirmModal'

function GridLayout(props) {
  console.log('render gridlay')
  const { payments } = useContext(AppSettings)
  const bits = useRecoilValue($bits)
  const { isPro } = bits
  const setProModal = useContext(ShowProModalContext)
  const { newData, setNewData, style, gridWidth, formID, isToolDragging, formSettings } = props
  const [fields, setFields] = useRecoilState($fields)
  const [layout, setLay] = useRecoilState($layouts)
  const setSelectedFieldId = useSetRecoilState($selectedFieldId)
  const [layouts, setLayouts] = useState(layout)
  const [breakpoint, setBreakpoint] = useState('lg')
  const [builderWidth, setBuilderWidth] = useState(gridWidth - 32)
  const cols = { lg: 6, md: 4, sm: 2 }
  const [gridContentMargin, setgridContentMargin] = useState([-0.2, 0])
  const [rowHeight, setRowHeight] = useState(43)
  const [alertMdl, setAlertMdl] = useState({ show: false, msg: '' })
  const uniqueFieldId = useRecoilValue($uniqueFieldId)

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
    setRowHeight(h / 2)

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

  // eslint-disable-next-line consistent-return
  const getPos = (vgrid, width, h, col) => {
    const w = width > col ? col : width
    for (let i = 0; i < vgrid.length; i += 1) {
      for (let j = 0; j < vgrid[i].length; j += 1) {
        if (!vgrid[i][j]) {
          if (h > i) {
            vgrid.push(Array(col).fill(0))
          }
          if (col - j >= w) {
            // chek height
            let clr = true
            for (let k = i; k < i + h; k += 1) {
              // check clr right by w
              if (k > vgrid.length - 1) {
                vgrid.push(Array(col).fill(0))
              }
              for (let m = j; m < w + j - 1; m += 1) {
                if (vgrid[k][m]) {
                  clr = false
                }
              }
            }
            if (clr) {
              for (let r = i; r < h + i; r += 1) {
                for (let c = j; c < w + j; c += 1) {
                  // eslint-disable-next-line no-param-reassign
                  vgrid[r][c] = 1
                }
              }
              return { x: j, y: i, vgrid, w }
            }
          } else {
            break
          }
        } else {
          vgrid.push(Array(col).fill(0))
        }
      }
    }
  }

  const genLay = (lay, col) => {
    const sortedLay = sortLayoutByXY(lay)
    const nlay = []
    const nvgrid = Array(Array(col).fill(0))
    for (let i = 0; i < sortedLay.length; i += 1) {
      const o = { ...sortedLay[i] }
      const { x, y, w } = getPos(nvgrid, o.w, o.h, col)
      o.x = x
      o.y = y
      o.w = w
      nlay.push(o)
    }
    return nlay
  }

  const genFilterLay = (lay, col, idx) => {
    const nlay = []
    const nvgrid = Array(Array(col).fill(0))
    for (let i = 0; i < lay.length; i += 1) {
      const o = { ...lay[i] }
      if (o.i !== idx) {
        const { x, y, w } = getPos(nvgrid, o.w, o.h, col)
        o.x = x
        o.y = y
        o.w = w
        nlay.push(o)
      }
    }
    return nlay
  }

  const margeNewData = () => {
    setNewData(null)
    const checkPayments = checkPaymentFields(newData[0])
    if (checkPayments && isType('array', checkPayments)) {
      if (newData[0].typ === 'razorpay') {
        newData[0].options.payIntegID = checkPayments[0].id
      } else {
        newData[0].payIntegID = checkPayments[0].id
      }
    } else if (!checkPayments) return
    if (newData[0].typ === 'recaptcha' && !checkCaptchaField()) return
    if (newData[0].lbl === 'Select Country' && !checkCountryField()) return
    console.log({ newData })
    const { w, h, minH, maxH, minW } = newData[1]
    const x = 0
    const y = Infinity
    const newBlk = { i: `bf${formID}-${uniqueFieldId}`, x, y, w, h, minH, maxH, minW }
    const tmpLayouts = layouts
    tmpLayouts.lg.push(newBlk)
    tmpLayouts.md.push(newBlk)
    tmpLayouts.sm.push(newBlk)
    tmpLayouts[breakpoint] = sortLayoutByXY(tmpLayouts[breakpoint])
    if (breakpoint === 'lg') {
      tmpLayouts.md = genLay(tmpLayouts.md, cols.md)
      tmpLayouts.sm = genLay(tmpLayouts.sm, cols.sm)
    } else if (breakpoint === 'md') {
      tmpLayouts.lg = genLay(tmpLayouts.lg, cols.lg)
      tmpLayouts.sm = genLay(tmpLayouts.sm, cols.sm)
    } else if (breakpoint === 'sm') {
      tmpLayouts.lg = genLay(tmpLayouts.lg, cols.lg)
      tmpLayouts.md = genLay(tmpLayouts.md, cols.md)
    }
    setLayouts({ ...tmpLayouts })
    const tmpField = deepCopy(newData[0])
    setFields({ ...fields, [`bf${formID}-${uniqueFieldId}`]: tmpField })
    sessionStorage.setItem('btcd-lc', '-')
  }

  const onLayoutChange = (newLay, newLays) => {
    if (newLays.lg.length === layouts.lg.length
      && newLays.md.length === layouts.md.length
      && newLays.sm.length === layouts.sm.length) {
      setLayouts({ ...newLays })
      setLay({ ...newLays })
    }
  }

  const onBreakpointChange = bp => setBreakpoint(bp)

  const onRemoveItem = i => {
    if (fields[i]?.typ === 'button' && fields[i]?.btnTyp === 'submit') {
      const payFields = fields ? Object.values(fields).filter(field => field.typ.match(/paypal|razorpay/)) : []
      if (!payFields.length) {
        setAlertMdl({ show: true, msg: __('Submit button cannot be removed') })
        return
      }
    }
    const nwLay = {}
    const tmpFields = { ...fields }
    nwLay.lg = genFilterLay(layouts.lg, cols.lg, i)
    nwLay.md = genFilterLay(layouts.md, cols.md, i)
    nwLay.sm = genFilterLay(layouts.sm, cols.sm, i)
    delete tmpFields[i]
    setLayouts(nwLay)
    setFields(tmpFields)
    setSelectedFieldId(null)
    sessionStorage.setItem('btcd-lc', '-')
  }

  const clsAlertMdl = () => {
    const tmpAlert = { ...alertMdl }
    tmpAlert.show = false
    setAlertMdl(tmpAlert)
  }

  const checkPaymentFields = elm => {
    const payPattern = /paypal|razorpay/
    const fld = elm.typ.match(payPattern)
    if (fld) {
      const payFields = fields ? Object.values(fields).filter(field => field.typ === fld[0]) : []
      let msg
      if (!isPro) {
        msg = __(`${fld[0]} is in Pro Version!`, 'bitform')
        setProModal({ show: true, msg })
      } else if (payFields.length) {
        msg = __(
          <p>
            You cannot add more than one &nbsp;
            {fld[0]}
            &nbsp;
            field in same form.
          </p>, 'bitform',
        )
        setAlertMdl({ show: true, msg })
      }
      if (msg) {
        return false
      }

      const payConf = payments.filter(pay => pay.type.toLowerCase() === fld[0])
      if (payConf.length === 1) {
        return payConf
      }
    }
    return true
  }

  const checkCaptchaField = () => {
    let msg
    if (formSettings?.additional?.enabled?.recaptchav3) {
      msg = __(
        <p>
          You can use either ReCaptchaV2 or ReCaptchaV3 in a form. to use ReCaptchaV2 disable the ReCaptchaV3 from the Form Settings.
        </p>, 'bitform',
      )
    } else {
      const capchaFlds = fields ? Object.values(fields).filter(field => field.typ === 'recaptcha') : []
      if (capchaFlds.length) {
        msg = __(
          <p>
            You cannot add more than one reCaptcha field in same form.
          </p>, 'bitform',
        )
      }
    }

    if (msg) {
      setAlertMdl({ show: true, msg })
      return false
    }

    return true
  }

  const checkCountryField = () => {
    let msg
    if (!isPro) {
      msg = __(
        <p>
          Country field is in Pro Version!
        </p>, 'bitform',
      )
    }

    if (msg) {
      setProModal({ show: true, msg })
      return false
    }

    return true
  }

  const onDrop = (lay, elmPrms) => {
    const { draggedElm } = props
    const checkPayments = checkPaymentFields(draggedElm[0])
    if (checkPayments && isType('array', checkPayments)) {
      if (draggedElm[0].typ === 'razorpay') {
        draggedElm[0].options.payIntegID = checkPayments[0].id
      } else {
        draggedElm[0].payIntegID = checkPayments[0].id
      }
    } else if (!checkPayments) return

    if (draggedElm[0].typ === 'recaptcha' && !checkCaptchaField()) return
    if (draggedElm[0].lbl === 'Select Country' && !checkCountryField()) return
    const { w, h, minH, maxH, minW } = draggedElm[1]
    // eslint-disable-next-line prefer-const
    let { x, y } = elmPrms
    if (y !== 0) { y -= 1 }
    const newBlk = `bf${formID}-${uniqueFieldId}`
    const newLayoutItem = { i: newBlk, x, y, w, h, minH, maxH, minW }
    const tmpLayouts = layouts
    tmpLayouts.lg.push(newLayoutItem)
    tmpLayouts.md.push(newLayoutItem)
    tmpLayouts.sm.push(newLayoutItem)
    tmpLayouts[breakpoint] = sortLayoutByXY(tmpLayouts[breakpoint])
    if (breakpoint === 'lg') {
      tmpLayouts.md = genLay(tmpLayouts.md, cols.md)
      tmpLayouts.sm = genLay(tmpLayouts.sm, cols.sm)
    } else if (breakpoint === 'md') {
      tmpLayouts.lg = genLay(tmpLayouts.lg, cols.lg)
      tmpLayouts.sm = genLay(tmpLayouts.sm, cols.sm)
    } else if (breakpoint === 'sm') {
      tmpLayouts.lg = genLay(tmpLayouts.lg, cols.lg)
      tmpLayouts.md = genLay(tmpLayouts.md, cols.md)
    }
    setLayouts({ ...tmpLayouts })
    const tmpField = deepCopy(draggedElm[0])
    setFields({ ...fields, [newBlk]: tmpField })
    sessionStorage.setItem('btcd-lc', '-')
  }

  return (
    <div style={{ width: gridWidth - 9 }} className="layout-wrapper" onDragOver={e => e.preventDefault()} onDragEnter={e => e.preventDefault()}>
      <Scrollbars autoHide>
        <div id={`f-${formID}`} style={{ padding: 10, paddingRight: 13 }} className={isToolDragging ? 'isDragging' : ''}>
          <div className={`_frm-bg-${formID} _frm-bg`} style={{ overflow: 'auto' }}>
            <div className={`_frm-${formID}`}>
              <ResponsiveReactGridLayout
                width={Math.round(builderWidth)}
                measureBeforeMount={false}
                isDroppable={props.draggedElm[0] !== ''}
                className="layout"
                onDrop={onDrop}
                onLayoutChange={onLayoutChange}
                droppingItem={props.draggedElm[1]}
                cols={cols}
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
                {/* {layouts[breakpoint].map(itm => blkGen(itm))} */}
                {layouts[breakpoint].map(layoutItem => (
                  <div
                    key={layoutItem.i}
                    className="blk"
                    onClick={() => setSelectedFieldId(layoutItem.i)}
                    onKeyPress={() => setSelectedFieldId(layoutItem.i)}
                    role="button"
                    tabIndex={0}
                  >
                    <FieldBlockWrapper
                      {...{
                        layoutItem,
                        onRemoveItem,
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
