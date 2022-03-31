/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-undef */

import produce from 'immer'
import { memo, useContext, useEffect, useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import { useHistory, useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { $additionalSettings, $breakpoint, $builderHistory, $builderHookStates, $draggingField, $fields, $flags, $isNewThemeStyleLoaded, $layouts, $selectedFieldId, $uniqueFieldId, $updateBtn } from '../GlobalStates/GlobalStates'
import { $styles } from '../GlobalStates/StylesState'
import { $themeVars } from '../GlobalStates/ThemeVarsState'
import { ShowProModalContext } from '../pages/FormDetails'
import '../resource/css/grid-layout.css'
import { AppSettings } from '../Utils/AppSettingsContext'
import { addNewItemInLayout, addToBuilderHistory, checkFieldsExtraAttr, filterLayoutItem, filterNumber, fitAllLayoutItems, fitSpecificLayoutItem, produceNewLayouts, propertyValueSumX, propertyValueSumY } from '../Utils/FormBuilderHelper'
import { selectInGrid } from '../Utils/globalHelpers'
import { isObjectEmpty } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import useComponentVisible from './CompSettings/StyleCustomize/ChildComp/useComponentVisible'
import FieldBlockWrapper from './FieldBlockWrapper'
import FieldContextMenu from './FieldContextMenu'
import RenderGridLayoutStyle from './RenderGridLayoutStyle'
import bitformDefaultTheme from './style-new/themes/1_bitformDefault'
import materialTheme from './style-new/themes/2_material'
import ConfirmModal from './Utilities/ConfirmModal'

// user will create form in desktop and it will ok for all device
// user may check all breakpoint is that ok ?
// user may chnage size and pos in different breakpoint

function GridLayout({ newData, setNewData, style, gridWidth, formID }) {
  console.log('render gridlay')
  const { formType } = useParams()
  const { payments } = useContext(AppSettings)
  const setProModal = useContext(ShowProModalContext)
  const [fields, setFields] = useRecoilState($fields)
  const [rootLayouts, setRootLayouts] = useRecoilState($layouts)
  const [layouts, setLayouts] = useState(rootLayouts)
  const [selectedFieldId, setSelectedFieldId] = useRecoilState($selectedFieldId)
  const draggingField = useRecoilValue($draggingField)
  const flags = useRecoilValue($flags)
  const builderHookStates = useRecoilValue($builderHookStates)
  const isNewThemeStyleLoaded = useRecoilValue($isNewThemeStyleLoaded)
  const setStyles = useSetRecoilState($styles)
  const themeVars = useRecoilValue($themeVars)
  const [breakpoint, setBreakpoint] = useRecoilState($breakpoint)
  const [builderWidth, setBuilderWidth] = useState(gridWidth)
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
  const { reRenderGridLayoutByRootLay, reCalculateFieldHeights, reCalculateSpecificFldHeight } = builderHookStates
  const { fieldKey, counter: fieldChangeCounter } = reCalculateSpecificFldHeight
  const { styleMode } = flags

  useEffect(() => { setLayouts(rootLayouts) }, [reRenderGridLayoutByRootLay])

  useEffect(() => {
    const nl = fitAllLayoutItems(layouts)
    setLayouts(nl)
    setRootLayouts(nl)
  }, [styleMode, reCalculateFieldHeights])

  useEffect(() => {
    if (fieldKey) {
      const nl = fitSpecificLayoutItem(layouts, fieldKey)
      setLayouts(nl)
      setRootLayouts(nl)
    }
  }, [fieldChangeCounter])

  useEffect(() => { margeNewData() }, [newData, fields])
  useEffect(() => {
    const lgLength = layouts.lg.length
    const mdLength = layouts.md.length
    const smLength = layouts.sm.length
    if (breakpoint === 'md' && lgLength !== mdLength) {
      const newLayouts = produceNewLayouts(layouts, ['md'], cols)
      setLayouts(newLayouts)
      setRootLayouts(newLayouts)
    }
    if (breakpoint === 'sm' && lgLength !== smLength) {
      const newLayouts = produceNewLayouts(layouts, ['sm'], cols)
      setLayouts(newLayouts)
      setRootLayouts(newLayouts)
    }
  }, [breakpoint])

  useEffect(() => {
    let w = 0
    let h = 0
    if (!isNewThemeStyleLoaded) {
      if (style[`._frm-${formID}`]?.['border-width']) { w += propertyValueSumX(style[`._frm-${formID}`]['border-width']) }
      if (style[`._frm-${formID}`]?.padding) { w += propertyValueSumX(style[`._frm-${formID}`].padding) }
      if (style[`._frm-${formID}`]?.margin) { w += propertyValueSumX(style[`._frm-${formID}`].margin) }
      if (style[`._frm-bg-${formID}`]?.['border-width']) { w += propertyValueSumX(style[`._frm-bg-${formID}`]['border-width']) }
      if (style[`._frm-bg-${formID}`]?.padding) { w += propertyValueSumX(style[`._frm-bg-${formID}`].padding) }
      if (style[`._frm-bg-${formID}`]?.margin) { w += propertyValueSumX(style[`._frm-bg-${formID}`].margin) }
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
    }

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

    setBuilderWidth(gridWidth - 0 - w)

    // set row height in local
    sessionStorage.setItem('btcd-rh', h / 2)
  }, [style, gridWidth, formID])

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
    setRootLayouts(nwLay)
    setFields(tmpFields)
    setSelectedFieldId(null)
    sessionStorage.setItem('btcd-lc', '-')

    // redirect to fields list
    history.replace(`/form/builder/${formType}/${formID}/fields-list`)

    // add to history
    const event = `${generateFieldLblForHistory(fldData)} removed`
    const type = 'remove_fld'
    const state = { fldKey, breakpoint, layout: removedLay, fldData, layouts: nwLay, fields: tmpFields }
    addToBuilderHistory(setBuilderHistory, { event, type, state }, setUpdateBtn)
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
      const newFldData = { ...fieldData }
      newFldData.payIntegID = extraAttr.payData.id
      return newFldData
    }

    return fieldData
  }

  const generateFieldLblForHistory = fldData => {
    if (fldData.typ === 'button') return fldData.txt
    if (fldData.typ === 'decision-box') return 'Decision Box'
    if (fldData.typ === 'title') return 'Title Field'
    return fldData.lbl
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
    const newFields = { ...fields, [newBlk]: processedFieldData }
    setLayouts(newLayouts)
    setRootLayouts(newLayouts)
    setFields(newFields)
    sessionStorage.setItem('btcd-lc', '-')

    // add to history
    const event = `${generateFieldLblForHistory(fieldData)} added`
    const type = 'add_fld'
    const state = { fldKey: newBlk, breakpoint, layout: newLayoutItem, fldData: processedFieldData, layouts: newLayouts, fields: newFields }
    addToBuilderHistory(setBuilderHistory, { event, type, state }, setUpdateBtn)
    setTimeout(() => {
      selectInGrid(`[data-key="${newBlk}"]`)?.focus()
      // .scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 500)

    // add style
    setStyles(styles => produce(styles, draftStyle => {
      const globalTheme = draftStyle.theme
      if (globalTheme === 'bitformDefault') {
        const fieldStyle = bitformDefaultTheme(newBlk, processedFieldData.typ, themeVars['--dir'])
        draftStyle.fields[newBlk] = fieldStyle
      }
      if (globalTheme === 'material') {
        const fieldStyle = materialTheme(newBlk, processedFieldData.typ, themeVars['--dir'])
        draftStyle.fields[newBlk] = fieldStyle
      }
    }))

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
        const { y, h } = layouts[brkpnt][layIndx]
        const newLayoutItem = { ...layouts[brkpnt][layIndx], i: newBlk, y: y + h }
        newLayItem[brkpnt] = newLayoutItem
        draft[brkpnt].splice(layIndx + 1, 0, newLayoutItem)
      })
    })

    setLayouts(tmpLayouts)
    setRootLayouts(tmpLayouts)
    const oldFields = produce(fields, draft => { draft[newBlk] = fldData })
    // eslint-disable-next-line no-param-reassign
    setFields(oldFields)

    // clone style
    setStyles(styles => produce(styles, draftStyle => {
      const fldStyle = draftStyle.fields[fldKey]
      const fldClasses = fldStyle.classes
      draftStyle.fields[newBlk] = { ...fldStyle }
      draftStyle.fields[newBlk].classes = {}
      Object.keys(fldClasses).forEach(cls => {
        const newClassName = cls.replace(fldKey, newBlk)
        draftStyle.fields[newBlk].classes[newClassName] = fldClasses[cls]
      })
    }))

    sessionStorage.setItem('btcd-lc', '-')

    setTimeout(() => {
      selectInGrid(`[data-key="${newBlk}"]`)?.focus()
      // .scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 500)

    // add to history
    const event = `${generateFieldLblForHistory(fldData)} cloned`
    const type = 'clone_fld'
    const state = { fldKey: newBlk, breakpoint, layout: newLayItem, fldData, layouts: tmpLayouts, fields: oldFields }
    addToBuilderHistory(setBuilderHistory, { event, type, state }, setUpdateBtn)

    resetContextMenu()
  }

  const onDrop = (lay, dropPosition) => {
    addNewField(draggingField.fieldData, draggingField.fieldSize, dropPosition)
  }

  const handleLayoutChange = (l, layoutsFromGrid) => {
    if (layoutsFromGrid.lg.findIndex(itm => itm.i === 'shadow_block') < 0) {
      setRootLayouts(layoutsFromGrid)
      setLayouts(layoutsFromGrid)
      // addToBuilderHistory(setBuilderHistory, { event: `Layout changed`, state: { layouts: layoutsFromGrid, fldKey: layoutsFromGrid.lg[0].i } }, setUpdateBtn)
    }
  }

  const setRegenarateLayFlag = () => {
    sessionStorage.setItem('btcd-lc', '-')
  }

  const handleContextMenu = (e, fldKey) => {
    e.preventDefault()
    // 0 - left click, 1 - middle click, 2 - right click
    const { button: mouseBtnClicked } = e

    let x
    let y
    let right
    let bottom

    const topPos = ref.current.getBoundingClientRect().top + window.scrollY
    const leftPos = ref.current.getBoundingClientRect().left + window.scrollX

    const layoutWrapperElm = selectInGrid('#layout-wrapper')
    const rootW = Number(layoutWrapperElm.style.width.match(/\d+/gi))
    const rootH = Number(layoutWrapperElm.style.height.match(/\d+/gi))

    const menuWidth = 170
    const menuHeight = 200

    if (mouseBtnClicked === 0) {
      const downBtn = selectInGrid(`[data-key="${fldKey}"]`)?.querySelector('.blk-wrp-down-btn')
      const downBtnSize = 30
      const downBtnTop = downBtn.getBoundingClientRect().top + downBtnSize
      const downBtnLeft = downBtn.getBoundingClientRect().left

      x = (downBtnLeft - leftPos) + 5
      y = (downBtnTop - topPos) + 5

      right = (x + menuWidth) > rootW
      bottom = (y + menuHeight) > rootH

      if (right) {
        x = ((downBtnLeft + downBtnSize) - leftPos) - 145
      }

      if (bottom) {
        y = (downBtnTop - topPos) - (menuHeight + downBtnSize + 7)
      }

      if (isComponentVisible && contextMenu.fldKey === fldKey && contextMenu.x === x && contextMenu.y === y) {
        resetContextMenu()
        return
      }
    } else if (mouseBtnClicked === 2) {
      x = (e.clientX - leftPos) + 5
      y = e.clientY - topPos

      right = (x + menuWidth) > rootW
      bottom = (y + menuHeight) > rootH

      if (right) {
        x = (e.clientX - leftPos) - 150
      }

      if (bottom) {
        y = (e.clientY - topPos) - menuHeight
      }
    }

    setTimeout(() => {
      setContextMenu({ fldKey, x, y })
      setSelectedFieldId(fldKey)
      setIsComponentVisible(true)
    }, 1)
  }

  const resetContextMenu = () => {
    setContextMenu({})
    setIsComponentVisible(false)
  }

  const navigateToFieldSettings = () => {
    history.replace(history.location.pathname.replace(/style\/.+|style/g, 'fs'))
    resetContextMenu()
  }

  const navigateToStyle = fldKey => {
    history.replace(`/form/builder/${formType}/${formID}/field-theme-customize/quick-tweaks/${fldKey}`)
    resetContextMenu()
  }

  const handleFldBlockEvent = (fieldId) => {
    setSelectedFieldId(fieldId)
    if (!isObjectEmpty(contextMenu)) {
      setContextMenu({})
    }
    if (styleMode) return
    history.push(`/form/builder/${formType}/${formID}/field-settings/${fieldId}`)
  }

  return (
    <div style={{ width: gridWidth + 10 }} className="layout-wrapper" id="layout-wrapper" onDragOver={e => e.preventDefault()} onDragEnter={e => e.preventDefault()} onClick={() => resetContextMenu()}>
      {/* // <div style={{ width: '100%' }} className="layout-wrapper" id="layout-wrapper" onDragOver={e => e.preventDefault()} onDragEnter={e => e.preventDefault()}> */}
      {styleMode && <RenderGridLayoutStyle />}

      <Scrollbars autoHide style={{ overflowX: 'hidden' }}>
        <div id={`f-${formID}`} style={{ padding: 10, paddingRight: 13 }} className={draggingField && breakpoint === 'lg' ? 'isDragging' : ''}>
          <div className={`_frm-bg-${formID} _frm-bg`}>
            <div className={`_frm-${formID}`}>
              {!styleMode ? (
                <ResponsiveReactGridLayout
                  width={Math.round(builderWidth - 10)}
                  measureBeforeMount
                  compactType="vertical"
                  useCSSTransforms
                  isDroppable={draggingField !== null && breakpoint === 'lg'}
                  className="layout"
                  onDrop={onDrop}
                  resizeHandles={['se', 'e']}
                  droppingItem={draggingField?.fieldSize}
                  onLayoutChange={handleLayoutChange}
                  cols={cols}
                  breakpoints={{ lg: 700, md: 420, sm: 300 }}
                  rowHeight={rowHeight}
                  margin={gridContentMargin}
                  // containerPadding={[1, 1]}
                  draggableCancel=".no-drg"
                  draggableHandle=".drag"
                  layouts={layouts}
                  onBreakpointChange={onBreakpointChange}
                  onDragStop={setRegenarateLayFlag}
                  onResizeStop={setRegenarateLayFlag}
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
                          handleContextMenu,
                        }}
                      />
                    </div>
                  ))}
                </ResponsiveReactGridLayout>
              ) : (
                <div className="_frm-g">
                  {layouts[breakpoint].map(layoutItem => (
                    <div
                      key={layoutItem.i}
                      data-key={layoutItem.i}
                      className={layoutItem.i}
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
                </div>
              )}
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
            className="right-click-context-menu"
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
