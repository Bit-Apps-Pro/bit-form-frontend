/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import produce from 'immer'
import {
  lazy, memo, Suspense, useContext, useEffect, useRef, useState,
} from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { Responsive as ResponsiveReactGridLayout } from 'react-grid-layout'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  $additionalSettings,
  $breakpoint,
  $builderHookStates,
  $deletedFldKey,
  $draggingField,
  $fields,
  $flags,
  $isNewThemeStyleLoaded,
  $layouts,
  $selectedFieldId,
  $uniqueFieldId,
} from '../GlobalStates/GlobalStates'
import { $stylesLgLight } from '../GlobalStates/StylesState'
import { $themeVars } from '../GlobalStates/ThemeVarsState'
import '../resource/css/grid-layout.css'
import { AppSettings } from '../Utils/AppSettingsContext'
import {
  addNewItemInLayout,
  addToBuilderHistory,
  calculateFormGutter,
  checkFieldsExtraAttr,
  cols,
  filterLayoutItem,
  filterNumber,
  fitAllLayoutItems,
  fitSpecificLayoutItem,
  getAbsoluteElmHeight,
  getLatestState,
  getResizableHandles,
  isLayoutSame,
  produceNewLayouts,
  propertyValueSumY,
  reCalculateFldHeights,
  removeFormUpdateError,
} from '../Utils/FormBuilderHelper'
import { selectInGrid } from '../Utils/globalHelpers'
import { compactResponsiveLayouts } from '../Utils/gridLayoutHelper'
import { deepCopy, isFirefox, isObjectEmpty } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import { ShowProModalContext } from '../Utils/StaticData/Contexts'
import useComponentVisible from './CompSettings/StyleCustomize/ChildComp/useComponentVisible'
import FieldContextMenu from './FieldContextMenu'
import FieldBlockWrapperLoader from './Loaders/FieldBlockWrapperLoader'
import RenderGridLayoutStyle from './RenderGridLayoutStyle'
import { updateFieldStyleByFieldSizing } from './style-new/themes/1_bitformDefault/fieldSizeControlStyle'
import { highlightElm, removeHighlight } from './style-new/styleHelpers'
import atlassianTheme from './style-new/themes/2_atlassian'
import bitformDefaultTheme from './style-new/themes/1_bitformDefault'
import noStyleTheme from './style-new/themes/0_noStyle'

const FieldBlockWrapper = lazy(() => import('./FieldBlockWrapper'))

const BUILDER_PADDING = { all: 5 }
const CUSTOM_SCROLLBAR_GUTTER = isFirefox() ? 20 : 12

// ⚠️ ALERT: Discuss with team before making any changes
function GridLayout({ newData, setNewData, style: v1Styles, gridWidth, setAlertMdl, formID }) {
  const { formType } = useParams()
  const { payments } = useContext(AppSettings)
  const setProModal = useContext(ShowProModalContext)
  const [fields, setFields] = useRecoilState($fields)
  const [rootLayouts, setRootLayouts] = useRecoilState($layouts)
  const [layouts, setLayouts] = useState(rootLayouts)
  const [selectedFieldId, setSelectedFieldId] = useRecoilState($selectedFieldId)
  const setDeletedFldKey = useSetRecoilState($deletedFldKey)
  const draggingField = useRecoilValue($draggingField)
  const [flags, setFlags] = useRecoilState($flags)
  const builderHookStates = useRecoilValue($builderHookStates)
  const isNewThemeStyleLoaded = useRecoilValue($isNewThemeStyleLoaded)
  const [styles, setStyles] = useRecoilState($stylesLgLight)
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [breakpoint, setBreakpoint] = useRecoilState($breakpoint)
  const [gridContentMargin, setgridContentMargin] = useState([0, 0])
  const [rowHeight, setRowHeight] = useState(1)
  const uniqueFieldId = useRecoilValue($uniqueFieldId)
  const additional = useRecoilValue($additionalSettings)
  const [contextMenu, setContextMenu] = useState({})
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  const navigate = useNavigate()
  const { reRenderGridLayoutByRootLay, reCalculateFieldHeights, reCalculateSpecificFldHeight } = builderHookStates
  const { fieldKey, counter: fieldChangeCounter } = reCalculateSpecificFldHeight
  const { styleMode, inspectMode } = flags
  const stopGridTransition = useRef(false)
  const [resizingFld, setResizingFld] = useState({})
  const delayRef = useRef(null)
  const [formGutter, setFormGutter] = useState(0)
  const elmCurrentHighlightedRef = useRef(null)
  const eventAbortControllerRef = useRef(null)
  const insptectModeTurnedOnRef = useRef(false)
  const location = useLocation()

  useEffect(() => { setLayouts(rootLayouts) }, [reRenderGridLayoutByRootLay])
  // calculate fieldheight every time layout and field changes && stop layout transition when stylemode changes
  useEffect(() => {
    const fieldsCount = Object.keys(fields).length
    const layoutLgFieldsCount = layouts.lg.length
    if (fieldsCount === layoutLgFieldsCount) {
      const nl = fitAllLayoutItems(layouts)
      const nl2 = compactResponsiveLayouts(nl, cols)
      if (!isLayoutSame(layouts, nl2)) {
        setLayouts(nl2)
        setRootLayouts(nl2)
      }
    }

    if (styleMode) {
      stopGridTransition.current = true
    } else {
      setTimeout(() => { stopGridTransition.current = false }, 1)
    }
  }, [styleMode, reCalculateFieldHeights, breakpoint, fields, layouts])

  useEffect(() => {
    if (fieldKey) {
      const nl = fitSpecificLayoutItem(layouts, fieldKey)
      setLayouts(nl)
      setRootLayouts(nl)
    }
  }, [fieldChangeCounter])

  useEffect(() => { if (newData !== null) margeNewData() }, [newData])

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
    const w = calculateFormGutter(isNewThemeStyleLoaded ? styles.form : v1Styles, formID)
    let h = 0

    if (!isNewThemeStyleLoaded) {
      if (v1Styles[`._frm-g-${formID}`]?.gap) {
        const gaps = v1Styles[`._frm-g-${formID}`].gap.replace(/px/g, '').split(' ')
        setgridContentMargin([Number(gaps[1]), Number(gaps[0])])
      }

      if (v1Styles[`.fld-lbl-${formID}`]?.['font-size']) {
        let lineHeight = 1
        if (v1Styles[`.fld-lbl-${formID}`]?.['line-height']) {
          lineHeight = filterNumber(v1Styles[`.fld-lbl-${formID}`]['line-height'])
        }
        h += filterNumber(v1Styles[`.fld-lbl-${formID}`]['font-size']) * lineHeight
      }
      if (v1Styles[`.fld-wrp-${formID}`]?.padding) { h += propertyValueSumY(v1Styles[`.fld-wrp-${formID}`].padding) }
      if (v1Styles[`input.fld-${formID},textarea.fld-${formID}`]?.margin) { h += propertyValueSumY(v1Styles[`input.fld-${formID},textarea.fld-${formID}`].margin) }
      if (v1Styles[`input.fld-${formID},textarea.fld-${formID}`]?.height) {
        h += filterNumber(v1Styles[`input.fld-${formID},textarea.fld-${formID}`].height)
      } else { h += 40 /* default field height */ }
      sessionStorage.setItem('btcd-rh', h / 2)
    }

    setFormGutter(w)

    // set row height in local
  }, [v1Styles, gridWidth, formID, styles])

  const margeNewData = () => {
    addNewField(newData.fieldData, newData.fieldSize, { x: 0, y: Infinity })
    setNewData(null)
  }

  const onBreakpointChange = bp => setBreakpoint(bp)

  const removeFieldStyles = fldKey => {
    setStyles(prevStyles => produce(prevStyles, draftStyles => {
      delete draftStyles.fields[fldKey]
    }))
  }

  const removeLayoutItem = fldKey => {
    const fldData = fields[fldKey]
    if (fldData?.typ === 'button' && fldData?.btnTyp === 'submit') {
      const payFields = fields ? Object.values(fields).filter(field => field.typ.match(/paypal|razorpay/)) : []
      if (!payFields.length) {
        setAlertMdl({ show: true, msg: __('Submit button cannot be removed') })
        return false
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
    removeFieldStyles(fldKey)
    setDeletedFldKey(prvDeleted => {
      const tmpFldKeys = [...prvDeleted]
      if (!tmpFldKeys.includes(fldKey)) {
        tmpFldKeys.push(fldKey)
      }

      return tmpFldKeys
    })
    sessionStorage.setItem('btcd-lc', '-')

    // redirect to fields list
    // navigate.replace(`/form/builder/${formType}/${formID}/fields-list`)
    navigate(`/form/builder/${formType}/${formID}/fields-list`, { replace: true })

    // add to history
    const event = `${generateFieldLblForHistory(fldData)} removed`
    const type = 'remove_fld'
    const state = { fldKey, breakpoint, layout: removedLay, fldData, layouts: nwLay, fields: tmpFields }
    addToBuilderHistory({ event, type, state })

    //  remove if it has any update button errors
    removeFormUpdateError(fldKey)
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

    if (extraAttr.validType === 'keyEmpty') {
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
    if (fldData.typ === 'html') return 'HTML Field'
    if (fldData.typ === 'recaptcha') return 'Recaptcha Field'
    if (!fldData.lbl) return fldData.typ.charAt(0).toUpperCase() + fldData.typ.slice(1)
    return fldData.lbl
  }

  function addNewField(fieldData, fieldSize, addPosition) {
    let processedFieldData = handleFieldExtraAttr(fieldData)
    if (!processedFieldData) return
    const { w, h, minH, maxH, minW } = fieldSize
    // eslint-disable-next-line prefer-const
    let { x, y } = addPosition
    if (y !== 0) { y -= 1 }
    const newBlk = `b${formID}-${uniqueFieldId}`
    const fk = `${processedFieldData.typ}-${formID}-${uniqueFieldId}`
    processedFieldData = { ...processedFieldData, fieldName: fk }
    const newLayoutItem = {
      i: newBlk, x, y, w, h, minH, maxH, minW,
    }
    const resizeHandles = getResizableHandles(fieldData.typ)
    if (resizeHandles) {
      newLayoutItem.resizeHandles = resizeHandles
    }
    const newLayouts = addNewItemInLayout(layouts, newLayoutItem)
    const newFields = { ...fields, [newBlk]: processedFieldData }
    if (newLayouts.lg.length !== Object.keys(newFields).length) {
      const fldArr = Object.keys(newFields)
      const layArr = newLayouts.lg.map(lay => lay.i)
      const missingFields = fldArr.filter(fld => !layArr.includes(fld))
      if (missingFields.length) missingFields.forEach(fldKey => delete newFields[fldKey])
    }
    setLayouts(newLayouts)
    setRootLayouts(newLayouts)
    setFields(newFields)
    sessionStorage.setItem('btcd-lc', '-')

    // add to history
    const event = `${generateFieldLblForHistory(fieldData)} added`
    const type = 'add_fld'

    setTimeout(() => {
      selectInGrid(`[data-key="${newBlk}"]`)?.focus()
    }, 500)

    // add style
    let newStyles = styles
    const tempThemeVars = deepCopy(themeVars)
    setStyles(prevStyles => {
      newStyles = produce(prevStyles, draftStyle => {
        const globalTheme = draftStyle.theme

        if (globalTheme === 'bitformDefault') {
          const defaultFieldStyle = bitformDefaultTheme({
            type: processedFieldData.typ,
            fieldKey: newBlk,
            direction: themeVars['--dir'],
          })
          if (prevStyles.fieldsSize !== 'medium') {
            const updateStyle = updateFieldStyleByFieldSizing(defaultFieldStyle, newBlk, processedFieldData.typ, prevStyles.fieldsSize, tempThemeVars)
            draftStyle.fields[newBlk] = updateStyle
          } else {
            draftStyle.fields[newBlk] = defaultFieldStyle
          }
        }

        if (globalTheme === 'atlassian') {
          draftStyle.fields[newBlk] = atlassianTheme({
            type: processedFieldData.typ,
            fieldKey: newBlk,
            direction: themeVars['--dir'],
          })
        }

        if (globalTheme === 'noStyle') {
          draftStyle.fields[newBlk] = noStyleTheme({
            type: processedFieldData.typ,
            fieldKey: newBlk,
            direction: themeVars['--dir'],
          })
        }
      })
      return newStyles
    })
    setThemeVars(tempThemeVars)

    const state = { fldKey: newBlk, layouts: newLayouts, fields: newFields, styles: newStyles }
    addToBuilderHistory({ event, type, state })

    setTimeout(() => {
      reCalculateFldHeights(newBlk)
    }, 100)

    return { newBlk }
  }

  const generateNewFldName = (oldFldName, oldFLdKey, newFldKey) => {
    const oldFldKeyExceptFirstLetter = oldFLdKey.slice(1)
    const newFldKeyExceptFirstLetter = newFldKey.slice(1)
    const reg = new RegExp(oldFldKeyExceptFirstLetter, 'g')
    const newFldName = oldFldName.replace(reg, newFldKeyExceptFirstLetter)
    return newFldName
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
    const newFldName = generateNewFldName(fldData.fieldName, fldKey, newBlk)
    const oldFields = produce(fields, draft => { draft[newBlk] = { ...fldData, fieldName: newFldName } })
    // eslint-disable-next-line no-param-reassign
    setFields(oldFields)

    // clone style
    setStyles(preStyles => produce(preStyles, draftStyle => {
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
    const state = {
      fldKey: newBlk, breakpoint, layout: newLayItem, fldData, layouts: tmpLayouts, fields: oldFields, styles: getLatestState('styles'),
    }
    addToBuilderHistory({ event, type, state })

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
    setResizingFalse()
  }

  const handleContextMenu = (e, fldKey) => {
    e.preventDefault()
    e.stopPropagation()
    calculatePositionForContextMenu(e, fldKey)
  }

  const calculatePositionForContextMenu = (e, fldKey) => {
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
      y = (downBtnTop - topPos) + 2

      right = (x + menuWidth) > rootW
      bottom = (y + menuHeight) > rootH

      if (right) {
        x = ((downBtnLeft + downBtnSize) - leftPos) - 148
      }

      if (bottom) {
        y = (downBtnTop - topPos) - (menuHeight + downBtnSize + 7)
      }

      if (selectedFieldId !== fldKey) {
        x += 3
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

    setSelectedFieldId(fldKey)
    setContextMenu({ fldKey, x, y })
    setIsComponentVisible(true)
  }

  const resetContextMenu = () => {
    setContextMenu({})
    setIsComponentVisible(false)
  }

  const navigateToFieldSettings = () => {
    navigate(location.pathname.replace(/style\/.+|style/g, 'fs'), { replace: true })
    resetContextMenu()
  }

  const navigateToStyle = fldKey => {
    navigate(`/form/builder/${formType}/${formID}/field-theme-customize/quick-tweaks/${fldKey}`, { replace: true })
    resetContextMenu()
  }

  const handleFldBlockEvent = (fieldId) => {
    setSelectedFieldId(fieldId)
    if (!isObjectEmpty(contextMenu)) {
      setContextMenu({})
    }
    setResizingFalse()
    if (styleMode) return
    navigate(`/form/builder/${formType}/${formID}/field-settings/${fieldId}`)
  }

  const highlightElmEvent = event => {
    const iFrameDocument = document.getElementById('bit-grid-layout').contentDocument
    if (iFrameDocument.elementsFromPoint) {
      const allPointedElements = iFrameDocument.elementsFromPoint(event.pageX, event.pageY)
      const elmOnMousePointer = allPointedElements.find(el => typeof el.className === 'string' && !el.className.startsWith('highlight-'))
      if (!elmOnMousePointer) return false
      if (elmCurrentHighlightedRef.current && elmOnMousePointer.isEqualNode(elmCurrentHighlightedRef.current)) return false
      let dataDevAttrFound = false
      if (elmOnMousePointer?.attributes?.length) {
        const attrLength = elmOnMousePointer.attributes.length
        for (let i = 0; i < attrLength; i += 1) {
          const { name: attrName, value: attrVal } = elmOnMousePointer.attributes[i]
          if (attrName.startsWith('data-dev-')) {
            removeHighlight()
            dataDevAttrFound = true
            elmCurrentHighlightedRef.current = elmOnMousePointer
            highlightElm(`[${attrName}="${attrVal}"]`)
            break
          }
        }
      }
      if (!dataDevAttrFound) {
        removeHighlight()
        elmCurrentHighlightedRef.current = null
      }
    }
  }

  const redirectStyleUrlOfHighlightedElm = () => {
    const highlightedElm = elmCurrentHighlightedRef.current
    if (highlightedElm?.attributes?.length) {
      const attrLength = highlightedElm.attributes.length
      for (let i = 0; i < attrLength; i += 1) {
        const { name: attrName, value: attrVal } = highlightedElm.attributes[i]
        if (attrName.startsWith('data-dev-')) {
          const styleUrlPart = attrName.replace('data-dev-', '')
          let styleUrl
          if (styleUrlPart.startsWith('_frm-')) {
            styleUrl = `/form/builder/${formType}/${formID}/theme-customize/${styleUrlPart}`
          } else {
            styleUrl = `/form/builder/${formType}/${formID}/field-theme-customize/${styleUrlPart}/${attrVal}`
          }
          navigate(styleUrl)
          setFlags(prvFlags => produce(prvFlags, draft => {
            draft.inspectMode = false
          }))
          // setSelectedFieldId(attrVal)
          break
        }
      }
    }
  }

  useEffect(() => {
    if (inspectMode) {
      insptectModeTurnedOnRef.current = true
      const iFrameDocument = document.getElementById('bit-grid-layout').contentDocument
      eventAbortControllerRef.current = new AbortController()
      iFrameDocument.addEventListener('mousemove', highlightElmEvent, { signal: eventAbortControllerRef.current.signal })
      iFrameDocument.addEventListener('click', redirectStyleUrlOfHighlightedElm, { signal: eventAbortControllerRef.current.signal })
    } else if (!inspectMode && insptectModeTurnedOnRef.current) {
      eventAbortControllerRef.current.abort()
      removeHighlight()
    }
  }, [inspectMode])

  const setResizingFalse = () => {
    if (isObjectEmpty(resizingFld)) return
    if (delayRef.current !== null) {
      clearTimeout(delayRef.current)
    }

    delayRef.current = setTimeout(() => {
      setResizingFld({})
      delayRef.current = null
    }, 700)
  }

  const setResizingWX = (lays, lay) => {
    if (resizingFld.fieldKey) {
      const layout = lays.find(l => l.i === resizingFld.fieldKey)
      setResizingFld(prevState => ({ ...prevState, w: layout.w, x: layout.x }))
      return
    }
    const fldKey = lay.i
    const resizingData = { fieldKey: fldKey, ...getInitHeightsForResizingTextarea(fldKey) }
    setResizingFld({ ...resizingData, w: lay.w, x: lay.x })
  }

  const getInitHeightsForResizingTextarea = fldKey => {
    const fldData = fields[fldKey]
    if (!fldData) return
    const fldType = fldData.typ
    if (fldType === 'textarea') {
      const wrpElm = selectInGrid(`[data-key="${fldKey}"]`)
      const textareaElm = selectInGrid(`textarea[data-dev-fld="${fldKey}"]`)
      const wrpHeight = getAbsoluteElmHeight(wrpElm, 0)
      const fldHeight = getAbsoluteElmHeight(textareaElm, 0)
      return { fldHeight, wrpHeight }
    }

    return {}
  }

  const setResizingFldKey = (_, lay) => {
    const fldKey = lay.i
    setResizingFld({ fieldKey: fldKey, ...getInitHeightsForResizingTextarea(fldKey) })
  }

  return (
    <div
      style={{ width: gridWidth, display: 'inline-block' }}
      className="layout-wrapper"
      id="layout-wrapper"
      onDragOver={e => e.preventDefault()}
      onDragEnter={e => e.preventDefault()}
      onClick={resetContextMenu}
    >
      {stopGridTransition.current && <style>{'.layout *{transition:none!important}'}</style>}
      {styleMode && <RenderGridLayoutStyle />}

      <Scrollbars autoHide style={{ overflowX: 'hidden' }}>
        <div id={`f-${formID}`} style={{ padding: BUILDER_PADDING.all, margin: '23px 13px 400px 0', border: '1px solid lightblue' }} className={draggingField && breakpoint === 'lg' ? 'isDragging' : ''}>
          <div className={`_frm-bg-${formID}`} data-dev-_frm-bg={formID}>
            <div className={`_frm-${formID}`} data-dev-_frm={formID}>

              {!styleMode ? (
                <ResponsiveReactGridLayout
                  width={gridWidth - (formGutter + BUILDER_PADDING.all + CUSTOM_SCROLLBAR_GUTTER)}
                  measureBeforeMount
                  compactType="vertical"
                  useCSSTransforms
                  isDroppable={draggingField !== null && breakpoint === 'lg'}
                  className="layout"
                  onDrop={onDrop}
                  resizeHandles={['e']}
                  droppingItem={draggingField?.fieldSize}
                  onLayoutChange={handleLayoutChange}
                  cols={cols}
                  breakpoints={{ lg: 700, md: 420, sm: 300 }}
                  rowHeight={rowHeight}
                  margin={gridContentMargin}
                  draggableCancel=".no-drg"
                  draggableHandle=".drag"
                  layouts={layouts}
                  onBreakpointChange={onBreakpointChange}
                  onDragStart={setResizingFldKey}
                  onDrag={setResizingWX}
                  onDragStop={setRegenarateLayFlag}
                  onResizeStart={setResizingFldKey}
                  onResize={setResizingWX}
                  onResizeStop={setRegenarateLayFlag}
                >
                  {layouts[breakpoint].map(layoutItem => (
                    <div
                      key={layoutItem.i}
                      data-key={layoutItem.i}
                      className={`blk ${layoutItem.i === selectedFieldId && 'itm-focus'}`}
                      onClick={() => handleFldBlockEvent(layoutItem.i)}
                      onKeyDown={() => handleFldBlockEvent(layoutItem.i)}
                      role="button"
                      tabIndex={0}
                      onContextMenu={e => handleContextMenu(e, layoutItem.i)}
                      data-testid={`${layoutItem.i}-fld-blk`}
                    >
                      <Suspense fallback={<FieldBlockWrapperLoader layout={layoutItem} />}>
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
                            resizingFld,
                          }}
                        />
                      </Suspense>
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
                      onKeyDown={() => handleFldBlockEvent(layoutItem.i)}
                      role="button"
                      tabIndex={0}
                      onContextMenu={e => handleContextMenu(e, layoutItem.i)}
                    >
                      <Suspense fallback={<FieldBlockWrapperLoader layout={layoutItem} />}>
                        <FieldBlockWrapper
                          {...{
                            layoutItem,
                            removeLayoutItem,
                            cloneLayoutItem,
                            fields,
                            formID,
                            navigateToFieldSettings,
                            navigateToStyle,
                            resizingFld,
                          }}
                        />
                      </Suspense>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Scrollbars>

      <div ref={ref} className="pos-rel">
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
      </div>
    </div>
  )
}
export default memo(GridLayout)
