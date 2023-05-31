import { create } from 'mutative'
import {
  $breakpoint,
  $contextMenu,
  $deletedFldKey,
  $fields, $formId,
  $nestedLayouts, $proModal, $resizingFld, $selectedFieldId, $uniqueFieldId,
} from '../GlobalStates/GlobalStates'
import { $staticStylesState } from '../GlobalStates/StaticStylesState'
import { $styles } from '../GlobalStates/StylesState'
import { $themeVars } from '../GlobalStates/ThemeVarsState'
import noStyleTheme from '../components/style-new/themes/0_noStyle'
import bitformDefaultTheme from '../components/style-new/themes/1_bitformDefault'
import { updateFieldStyleByFieldSizing } from '../components/style-new/themes/1_bitformDefault/fieldSizeControlStyle'
import atlassianTheme from '../components/style-new/themes/2_atlassian'
import {
  addFormUpdateError,
  addNewItemInLayout, addToBuilderHistory,
  filterLayoutItem, getAbsoluteElmHeight, getLatestState,
  getResizableHandles, reCalculateFldHeights, removeFormUpdateError,
} from './FormBuilderHelper'
import { IS_PRO, deepCopy } from './Helpers'
import proHelperData from './StaticData/proHelperData'
import { selectInGrid } from './globalHelpers'
import { __ } from './i18nwrap'
import { handleFieldExtraAttr } from './FormBuilderHelper'
import paymentFields from './StaticData/paymentFields'
import bitStore from '../GlobalStates/BitStore'

const setUpdateErrorMsgByDefault = (fldKey, fieldData) => {
  const { typ: fldType } = fieldData

  if (fldType === 'paypal') {
    addFormUpdateError({
      fieldKey: fldKey,
      errorKey: 'paypalClientIdMissing',
      errorMsg: 'PayPal Client ID is missing',
      errorUrl: `field-settings/${fldKey}`,
    })
    addFormUpdateError({
      fieldKey: fldKey,
      errorKey: 'paypalAmountMissing',
      errorMsg: __('PayPal Fixed Amount is not valid'),
      errorUrl: `field-settings/${fldKey}`,
    })
  } else if (fldType === 'razorpay') {
    addFormUpdateError({
      fieldKey: fldKey,
      errorKey: 'razorpayClientIdMissing',
      errorMsg: __('Razorpay Client ID is missing'),
      errorUrl: `field-settings/${fldKey}`,
    })
    addFormUpdateError({
      fieldKey: fldKey,
      errorKey: 'razorpayAmountMissing',
      errorMsg: __('Razorpay Fixed Amount is not valid'),
      errorUrl: `field-settings/${fldKey}`,
    })
  }
}

export const generateFieldLblForHistory = fldData => {
  if (fldData.typ === 'button') return fldData.txt
  if (fldData.typ === 'decision-box') return 'Decision Box'
  if (fldData.typ === 'title') return 'Title Field'
  if (fldData.typ === 'html') return 'HTML Field'
  if (fldData.typ === 'recaptcha') return 'Recaptcha Field'
  if (!fldData.lbl) return fldData.typ.charAt(0).toUpperCase() + fldData.typ.slice(1)
  return fldData.lbl
}

export function addNewFieldToGridLayout(layouts, fieldData, fieldSize, addPosition) {
  const formID = bitStore.get($formId)
  const uniqueFieldId = bitStore.get($uniqueFieldId)
  const fields = bitStore.get($fields)
  const styles = bitStore.get($styles)
  const themeVars = bitStore.get($themeVars)
  const staticStylesState = bitStore.get($staticStylesState)

  let processedFieldData = handleFieldExtraAttr(fieldData)
  if (!processedFieldData) return
  processedFieldData = { ...processedFieldData, fieldName: `${processedFieldData.typ}-${formID}-${uniqueFieldId}` }
  const newBlk = `b${formID}-${uniqueFieldId}`
  setUpdateErrorMsgByDefault(newBlk, processedFieldData)
  // eslint-disable-next-line prefer-const
  let { x, y } = addPosition
  if (y !== 0) { y -= 1 }
  const { w, h, minH, maxH, minW } = fieldSize
  const newLayoutItem = {
    i: newBlk, x, y, w, h, minH, maxH, minW,
  }
  const resizeHandles = getResizableHandles(fieldData.typ)
  if (resizeHandles) {
    newLayoutItem.resizeHandles = resizeHandles
  }
  const newLayouts = addNewItemInLayout(layouts, newLayoutItem)
  const newFields = { ...fields, [newBlk]: processedFieldData }

  bitStore.set($fields, newFields)
  sessionStorage.setItem('btcd-lc', '-')

  // add to history
  const event = `${generateFieldLblForHistory(fieldData)} added`
  const type = 'add_fld'

  setTimeout(() => {
    selectInGrid(`[data-key="${newBlk}"]`)?.focus()
  }, 500)
  const fldType = processedFieldData.typ

  if (fldType === 'section') {
    const nestedLayouts = bitStore.get($nestedLayouts)
    bitStore.set($nestedLayouts, create(nestedLayouts, draftNestedLayouts => {
      draftNestedLayouts[newBlk] = { lg: [], md: [], sm: [] }
    }))
  }

  // add style
  const tempThemeVars = deepCopy(themeVars)
  const newStyles = create(styles, draftStyle => {
    const globalTheme = draftStyle.theme

    if (globalTheme === 'bitformDefault') {
      const defaultFieldStyle = bitformDefaultTheme({
        type: processedFieldData.typ,
        fieldKey: newBlk,
        direction: themeVars['--dir'],
      })
      if (draftStyle.fieldsSize !== 'medium') {
        const updateStyle = updateFieldStyleByFieldSizing(defaultFieldStyle, newBlk, processedFieldData.typ, draftStyle.fieldsSize, tempThemeVars)
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
  bitStore.set($styles, newStyles)
  bitStore.set($themeVars, tempThemeVars)

  if (paymentFields.includes(fldType)) {
    bitStore.set($staticStylesState, create(staticStylesState, draftStaticStyleState => {
      draftStaticStyleState.staticStyles['.pos-rel'] = { position: 'relative' }
      draftStaticStyleState.staticStyles['.form-loading::before'] = {
        position: 'absolute',
        'border-radius': '5px',
        display: 'block',
        top: 0,
        left: 0,
        content: "''",
        height: '100%',
        width: '100%',
        'z-index': '9999',
        'background-color': 'rgba(0,0,0,0.2)',
      }
      draftStaticStyleState.staticStyles['.form-loading::after'] = {
        position: 'absolute',
        'border-radius': '5px',
        color: '#fff',
        top: '50%',
        left: '50%',
        content: "'loading...'",
        transform: 'translate(-50%, -50%)',
        'z-index': '99999',
        'font-size': '20px',
        'background-color': '#222',
        padding: '5px 15px',
      }
      if (fldType === 'razorpay') draftStaticStyleState.staticStyles['.razorpay-checkout-frame'] = { height: '100% !important' }
    }))
  }

  const state = { fldKey: newBlk, layouts: newLayouts, fields: newFields, styles: newStyles }
  addToBuilderHistory({ event, type, state })

  setTimeout(() => {
    reCalculateFldHeights(newBlk)
  }, 100)

  return { newBlk, newLayouts }
}

export const generateNewFldName = (oldFldName, oldFLdKey, newFldKey) => {
  const oldFldKeyExceptFirstLetter = oldFLdKey.slice(1)
  const newFldKeyExceptFirstLetter = newFldKey.slice(1)
  const reg = new RegExp(oldFldKeyExceptFirstLetter, 'g')
  const newFldName = oldFldName.replace(reg, newFldKeyExceptFirstLetter)
  return newFldName
}

export const getInitHeightsForResizingTextarea = fldKey => {
  const fields = bitStore.get($fields)
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

export const setResizingFldKey = (_, lay) => {
  const fldKey = lay.i
  bitStore.set($resizingFld, { fieldKey: fldKey, ...getInitHeightsForResizingTextarea(fldKey) })
}

export const setResizingWX = (lays, lay) => {
  const resizingFld = bitStore.get($resizingFld)
  if (resizingFld.fieldKey) {
    const layout = lays.find(l => l.i === resizingFld.fieldKey)
    const newResingFld = create(resizingFld, draftResizingFld => {
      draftResizingFld.w = layout.w
      draftResizingFld.x = layout.x
    })
    bitStore.set($resizingFld, newResingFld)
    return
  }
  const fldKey = lay.i
  const resizingData = { fieldKey: fldKey, ...getInitHeightsForResizingTextarea(fldKey) }
  bitStore.set($resizingFld, { ...resizingData, w: lay.w, x: lay.x })
}

export const removeFieldStyles = fldKey => {
  const styles = bitStore.get($styles)
  const newStyles = create(styles, draftStyles => {
    delete draftStyles.fields[fldKey]
  })
  bitStore.set($styles, newStyles)
}

export const cloneLayoutItem = (fldKey, layouts) => {
  const fields = bitStore.get($fields)
  const styles = bitStore.get($styles)
  const proModal = bitStore.get($proModal)
  const uniqueFieldId = bitStore.get($uniqueFieldId)
  const formID = bitStore.get($formId)
  const breakpoint = bitStore.get($breakpoint)

  if (!IS_PRO) {
    bitStore.set(proModal, { show: true, ...proHelperData.fieldClone })
    return
  }
  const fldData = fields[fldKey]
  // if (!handleFieldExtraAttr(fldData)) return

  const newBlk = `b${formID}-${uniqueFieldId}`
  const newLayItem = {}

  const allBreakpoints = ['sm', 'md', 'lg']

  const newLayouts = create(layouts, draft => {
    allBreakpoints.forEach(brkpnt => {
      const layIndx = layouts[brkpnt].findIndex(lay => lay.i === fldKey)
      const { y, h } = layouts[brkpnt][layIndx]
      const newLayoutItem = { ...layouts[brkpnt][layIndx], i: newBlk, y: y + h }
      newLayItem[brkpnt] = newLayoutItem
      draft[brkpnt].splice(layIndx + 1, 0, newLayoutItem)
    })
  })

  const newFldName = generateNewFldName(fldData.fieldName, fldKey, newBlk)
  const oldFields = create(fields, draft => { draft[newBlk] = { ...fldData, fieldName: newFldName } })
  // eslint-disable-next-line no-param-reassign
  bitStore.set($fields, oldFields)

  // clone style
  const newStyle = create(styles, draftStyle => {
    const fldStyle = draftStyle.fields[fldKey]
    const fldClasses = fldStyle.classes
    draftStyle.fields[newBlk] = { ...fldStyle }
    draftStyle.fields[newBlk].classes = {}
    Object.keys(fldClasses).forEach(cls => {
      const newClassName = cls.replace(fldKey, newBlk)
      draftStyle.fields[newBlk].classes[newClassName] = fldClasses[cls]
    })
  })
  bitStore.set($styles, newStyle)

  sessionStorage.setItem('btcd-lc', '-')

  setTimeout(() => {
    selectInGrid(`[data-key="${newBlk}"]`)?.focus()
    // .scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, 500)

  // add to history
  const event = `${generateFieldLblForHistory(fldData)} cloned`
  const type = 'clone_fld'
  const state = {
    fldKey: newBlk, breakpoint, layout: newLayItem, fldData, layouts: newLayouts, fields: oldFields, styles: getLatestState('styles'),
  }
  addToBuilderHistory({ event, type, state })

  // resetContextMenu()
  bitStore.set($contextMenu, {})
  return { newBlk, newFldName, newLayouts }
}

export const removeLayoutItem = (fldKey, layouts) => {
  const fields = bitStore.get($fields)
  const breakpoint = bitStore.get($breakpoint)
  const deletedFldKey = bitStore.get($deletedFldKey)
  const staticStylesState = bitStore.get($staticStylesState)

  const fldData = fields[fldKey]
  if (fldData?.typ === 'button' && fldData?.btnTyp === 'submit') {
    const payFields = fields ? Object.values(fields).filter(field => paymentFields.includes(field.typ)) : []
    if (!payFields.length) {
      // setAlertMdl({ show: true, msg: __('Submit button cannot be removed'), cancelBtn: false })
      return false
    }
  }
  const removedLay = {
    lg: layouts.lg.find(l => l.i === fldKey),
    md: layouts.md.find(l => l.i === fldKey),
    sm: layouts.sm.find(l => l.i === fldKey),
  }
  const newLayouts = filterLayoutItem(fldKey, layouts)
  const tmpFields = create(fields, draftFields => { delete draftFields[fldKey] })

  bitStore.set($fields, tmpFields)
  bitStore.set($selectedFieldId, null)
  removeFieldStyles(fldKey)
  const newDeletedFldKey = create(deletedFldKey, drft => {
    if (!drft.includes(fldKey)) {
      drft.push(fldKey)
    }
  })
  bitStore.set($deletedFldKey, newDeletedFldKey)
  sessionStorage.setItem('btcd-lc', '-')

  const fldType = fldData?.typ
  if (paymentFields.includes(fldType)) {
    const newStaticStyleState = create(staticStylesState, draftStaticStyleState => {
      delete draftStaticStyleState.staticStyles['.pos-rel']
      delete draftStaticStyleState.staticStyles['.form-loading::before']
      delete draftStaticStyleState.staticStyles['.form-loading::after']
      if (fldType === 'razorpay') delete draftStaticStyleState.staticStyles['.razorpay-checkout-frame']
    })
    bitStore.set($staticStylesState, newStaticStyleState)
  }

  // add to history
  const event = `${generateFieldLblForHistory(fldData)} removed`
  const type = 'remove_fld'
  const state = { fldKey, breakpoint, layout: removedLay, fldData, layouts: newLayouts, fields: tmpFields }
  addToBuilderHistory({ event, type, state })

  //  remove if it has any update button errors
  removeFormUpdateError(fldKey)

  return newLayouts
}
