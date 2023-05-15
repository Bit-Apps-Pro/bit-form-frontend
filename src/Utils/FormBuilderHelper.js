/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
import { produce } from 'immer'
import { getRecoil, setRecoil } from 'recoil-nexus'
import { addDefaultStyleClasses } from '../components/style-new/styleHelpers'
import {
  $additionalSettings,
  $bits,
  $breakpoint, $builderHistory, $builderHookStates, $colorScheme, $fields, $formId, $layouts, $selectedFieldId, $updateBtn,
} from '../GlobalStates/GlobalStates'
import { $styles } from '../GlobalStates/StylesState'
import { $themeColors } from '../GlobalStates/ThemeColorsState'
import { $themeVars } from '../GlobalStates/ThemeVarsState'
import { JCOF, mergeNestedObj, selectInGrid } from './globalHelpers'
import { compactResponsiveLayouts } from './gridLayoutHelper'
import { deepCopy } from './Helpers'
import { __ } from './i18nwrap'

export const cols = { lg: 60, md: 60, sm: 60 }

/**
 * sort a layout array by x and y axis
 * @param {array} layoutArr layout array [{x:0,y:1,...}, {x:0,y:2,...}, ]
 * @returns {Array} sorted layout
 */
export const sortLayoutByXY = (layoutArr) => layoutArr.sort((first, second) => {
  const n = first.y - second.y
  if (n !== 0) return n
  return first.x - second.x
})

/**
 * check specific space are blank in a col
 * @param {number} maxCol maximum size of the column
 * @param {number} spaceNeed targeted space need to blank
 * @param {array} sortedBlockedPos blocked positions in array of number
 * @returns {number} give a start position of blank or -1 for no space
 */
export function getEmptyXPos(maxCol, spaceNeed, sortedBlockedPos) {
  if (sortedBlockedPos.length === 0) return 0
  const sortedBlockedPosArrLen = sortedBlockedPos.length
  for (let i = 1; i < sortedBlockedPosArrLen; i += 2) {
    if (
      sortedBlockedPos[i + 1]
      && sortedBlockedPos[i + 1] - sortedBlockedPos[i] > spaceNeed - 1
    ) {
      return sortedBlockedPos[i]
    }
  }

  if (maxCol - sortedBlockedPos[sortedBlockedPosArrLen - 1] > spaceNeed - 1) {
    return sortedBlockedPos[sortedBlockedPosArrLen - 1]
  }

  if (sortedBlockedPos[0] !== 0 && sortedBlockedPos[0] > spaceNeed - 1) {
    return 0
  }
  return -1
}

/**
 *
 * @param {number} key any sizekey of given object
 * @param {number} fieldMinW minimum required space for a field in
 * @param {Object} obj specify an object with number keys
 * @param {number} maxCol max column size
 * @returns {Boolean} check whether any of keys calue blocked x axis after given key
 */
export function isRestYhasBlockX(key, fieldMinW, obj, maxCol) {
  const objArr = Object.entries(obj)
  for (let i = 0; i < objArr.length; i += 1) {
    const [oKey] = objArr[i]
    if (Number(oKey) === Number(key)) {
      for (let j = i; j < objArr.length; j += 1) {
        const [, oVal] = objArr[j]
        if (getEmptyXPos(maxCol, fieldMinW, oVal) === -1) {
          return true
        }
      }
    }
  }
  return false
}
/**
 *
 * @param {Object} obj object with number keys
 * @param {number} key object key
 * @returns
 */
export function delAllPrevKeys(obj, key) {
  const targetKey = Number(key)
  const keysArr = Object.entries(obj)
  const keysArrLen = keysArr.length
  for (let i = 0; i < keysArrLen; i += 1) {
    const okey = Number(keysArr[i])
    if (okey === targetKey) return obj
    delete obj[okey]
  }
  return obj
}

/**
 * convert layout by specific column
 * @param lay
 * @param {number} tc  targeted column to be convert
 * @param {number} fieldMinW minimum space ned in a row for field
 * @returns {Array} converted array of object
 */
export function convertLayout(lay, tc, fieldMinW = 1) {
  const newLayout = []
  const layout = deepCopy(lay)
  const layoutYAxisCount = {} // key-> y , value-> used col arr

  function setOrUpdateXY(y, xFilledArr) {
    if (y in layoutYAxisCount) {
      layoutYAxisCount[y] = layoutYAxisCount[y]
        .concat(xFilledArr)
        .sort((a, b) => a - b)
    } else {
      layoutYAxisCount[y] = xFilledArr
    }
  }

  function setYaxisCount(fromY, toY, xFill) {
    const from = Number(fromY)
    const to = Number(toY)
    let filledPos = xFill

    for (let y = from; y <= to; y += 1) {
      if (y === to) {
        filledPos = []
      }
      setOrUpdateXY(y, filledPos)
    }
  }

  // insert first item
  const [firstLayoutItem] = layout
  // if item w is grater than tc then make it to max tc
  if (firstLayoutItem.w > tc) {
    firstLayoutItem.w = tc
  }
  newLayout.push({ ...firstLayoutItem, x: 0, y: 0 })
  setYaxisCount(0, firstLayoutItem.h, [0, firstLayoutItem.w])

  let layoutItemIndex = 1
  while (layoutItemIndex <= layout.length) {
    if (!layout[layoutItemIndex]) break
    const layoutItem = layout[layoutItemIndex]

    // if item w is grater than tc then make it to max tc
    if (layoutItem.w > tc) {
      layoutItem.w = tc
    }

    const lastItem = newLayout[newLayout.length - 1]
    if (getEmptyXPos(tc, layoutItem.w, layoutYAxisCount[lastItem.y]) > -1) {
      newLayout.push({
        ...layoutItem,
        x: lastItem.x + lastItem.w,
        y: lastItem.y,
      })

      setYaxisCount(
        lastItem.y,
        lastItem.y + layoutItem.h,
        [
          lastItem.x + lastItem.w,
          layoutItem.w + lastItem.x + lastItem.w,
        ],
      )
      layoutItemIndex += 1
      continue
    }

    const layoutYAxisCountArr = Object.entries(layoutYAxisCount)
    const layoutYAxisCountArrLen = layoutYAxisCountArr.length

    for (let i = 0; i < layoutYAxisCountArrLen; i += 1) {
      const [key, value] = layoutYAxisCountArr[i]
      const blankXPos = getEmptyXPos(tc, layoutItem.w, value)

      if (blankXPos > -1) {
        newLayout.push({
          ...layoutItem,
          x: blankXPos,
          y: Number(key),
        })

        if (blankXPos === 0) {
          delAllPrevKeys(layoutYAxisCount, Number(key))
        }

        setYaxisCount(key, Number(key) + layoutItem.h, [
          blankXPos,
          blankXPos + layoutItem.w,
        ])

        layoutItemIndex += 1
        break
      } else if (
        getEmptyXPos(tc, fieldMinW, value) === -1
        || isRestYhasBlockX(key, fieldMinW, value, tc)
      ) {
        delete layoutYAxisCount[Number(key)]
      }
    }
  }
  return newLayout
}
export const propertyValueSumX = (propertyValue = '') => {
  let arr = propertyValue?.replace(/px|em|rem|!important/g, '').split(' ')
  if (arr.length === 1) { arr = Array(4).fill(arr[0]) }
  if (arr.length === 2) { arr = [arr[0], arr[1], arr[0], arr[1]] }
  if (arr.length === 3) { arr = [arr[0], arr[1], arr[2], arr[1]] }
  arr = [arr[1], arr[3]]
  const sum = arr?.reduce((pv, cv) => Number(pv) + Number(cv), 0)
  return sum || 0
}

const FIELDS_EXTRA_ATTR = {
  paypal: { pro: true, onlyOne: true, setDefaultPayConfig: true },
  razorpay: { pro: true, onlyOne: true, setDefaultPayConfig: true },
  stripe: { pro: true, onlyOne: true, setDefaultPayConfig: true },
  'advanced-file-up': { pro: true },
  recaptcha: { onlyOne: true },
  submit: { onlyOne: true },
  reset: { onlyOne: true },
}

export const checkFieldsExtraAttr = (field, paymentsIntegs = [], reCaptchaV2) => {
  // eslint-disable-next-line no-undef
  const allFields = getRecoil($fields)
  const bits = getRecoil($bits)
  const additionalSettings = getRecoil($additionalSettings)
  if (field.lbl === 'Select Country' && !bits.isPro) {
    return { validType: 'pro', msg: __('Country Field available in Pro version of Bit Form.') }
  }

  if (field.typ === 'recaptcha' && additionalSettings?.enabled?.recaptchav3) {
    return { validType: 'onlyOne', msg: __('You can use either ReCaptcha-V2 or ReCaptcha-V3 in a form. to use ReCaptcha-V2 disable the ReCaptcha-V3 from the Form Settings.') }
  }

  if (field.typ === 'recaptcha' && (!reCaptchaV2?.secretKey || !reCaptchaV2?.siteKey)) {
    return { validType: 'keyEmpty', msg: __('To use ReCaptchaV2, you must set site key and secret from app settings') }
  }

  // eslint-disable-next-line no-undef
  if (FIELDS_EXTRA_ATTR[field.typ]?.pro && !bits.isPro) {
    return { validType: 'pro', msg: __(`${field.typ} field is available in Pro Version!`) }
  }

  if (FIELDS_EXTRA_ATTR[field.typ]?.onlyOne && Object.values(allFields).find(fld => fld.typ === field.typ)) {
    return { validType: 'onlyOne', msg: __(`You cannot add more than one ${field.typ} field in the same form.`) }
  }

  if (field.typ === 'button' && FIELDS_EXTRA_ATTR[field.btnTyp]?.onlyOne && Object.values(allFields).find(fld => fld.typ === field.typ)) {
    return { validType: 'onlyOne', msg: __(`You cannot add more than one ${field.btnTyp} button in the same form.`) }
  }

  if (FIELDS_EXTRA_ATTR[field.typ]?.setDefaultPayConfig) {
    const payConf = paymentsIntegs.filter(pay => pay.type.toLowerCase() === field.typ)
    if (payConf.length === 1) {
      return { validType: 'setDefaultPayConfig', payData: payConf[0] }
    }
  }

  return {}
}

export function sortLayoutItemsByRowCol(layout) {
  // Slice to clone array as sort modifies
  return layout.slice(0).sort((a, b) => {
    if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
      return 1
    } if (a.y === b.y && a.x === b.x) {
      // Without this, we can get different sort results in IE vs. Chrome/FF
      return 0
    }
    return -1
  })
}

// export function produceNewLayouts(layouts, breakpointArr, cols) {
//   return produce(layouts, draftLay => {
//     draftLay.lg = sortLayoutItemsByRowCol(draftLay.lg)
//     const minFieldW = draftLay.lg.reduce((prv, cur) => (prv < cur ? prv : cur))
//     const tmpLg = deepCopy(layouts.lg)
//     if (breakpointArr.indexOf('md') > -1) {
//       draftLay.md = convertLayout(tmpLg, cols.md, minFieldW)
//     }
//     if (breakpointArr.indexOf('sm') > -1) {
//       draftLay.sm = convertLayout(tmpLg, cols.sm, minFieldW)
//     }
//     console.log('drft', draftLay.lg, draftLay.md, draftLay.sm)
//   })
// }
export function produceNewLayouts(layouts, breakpointArr, gridCols) {
  const lays = deepCopy(layouts)
  lays.lg = sortLayoutItemsByRowCol(lays.lg)
  const minFieldW = lays.lg.reduce((prv, cur) => (prv < cur ? prv : cur))
  if (breakpointArr.includes('lg')) {
    lays.lg = convertLayout(lays.lg, gridCols.lg, minFieldW)
  }
  if (breakpointArr.includes('md')) {
    lays.md = convertLayout(lays.lg, gridCols.md, minFieldW)
  }
  if (breakpointArr.includes('sm')) {
    lays.sm = convertLayout(lays.lg, gridCols.sm, minFieldW)
  }
  return lays
}

// export function layoutOrderSortedByLg(lay, cols) {
//   return produce(lay, drft => {
//     const draftedLay = drft
//     draftedLay.md = sortLayoutByLg(draftedLay.md, draftedLay.lg)
//     draftedLay.sm = sortLayoutByLg(draftedLay.sm, draftedLay.lg)
//     draftedLay.lg = sortLayoutItemsByRowCol(draftedLay.lg)
//     const minFieldWidthMd = draftedLay.md.reduce((prv, cur) => (prv < cur ? prv : cur))
//     const minFieldWidthSm = draftedLay.sm.reduce((prv, cur) => (prv < cur ? prv : cur))
//     draftedLay.md = convertLayout(draftedLay.md, cols.md, minFieldWidthMd)
//     draftedLay.sm = convertLayout(draftedLay.lg, cols.sm, minFieldWidthSm)
//   })
// }

export function layoutOrderSortedByLg(lay, gridCols) {
  const tmpLay = deepCopy(lay)
  const newLay = { lg: [], md: [], sm: [] }

  newLay.lg = sortLayoutItemsByRowCol(tmpLay.lg)
  newLay.md = sortLayoutByLg(tmpLay.md, newLay.lg)
  newLay.sm = sortLayoutByLg(tmpLay.sm, newLay.lg)
  const minFieldWidthSm = tmpLay.sm.reduce((prv, cur) => (prv < cur ? prv : cur))
  const minFieldWidthMd = tmpLay.md.reduce((prv, cur) => (prv < cur ? prv : cur))
  newLay.md = convertLayout(newLay.md, gridCols.md, minFieldWidthMd)
  newLay.sm = convertLayout(newLay.sm, gridCols.sm, minFieldWidthSm)

  return newLay
}

export function prepareLayout(lays, respectLGLayoutOrder) {
  let layouts = compactResponsiveLayouts(lays, cols)

  // if all layout length not same then produce new layout
  if (layouts.lg.length !== layouts.md.length
    || layouts.lg.length !== layouts.sm.length) {
    layouts = produceNewLayouts(layouts, ['md', 'sm'], cols)
  }

  if (respectLGLayoutOrder) {
    layouts = layoutOrderSortedByLg(layouts, cols)
  } else {
    // sort all layout by x and y
    layouts.lg = sortLayoutItemsByRowCol(layouts.lg)
    layouts.md = sortLayoutItemsByRowCol(layouts.md)
    layouts.sm = sortLayoutItemsByRowCol(layouts.sm)

    // if any layout item width cross the max col then produce new layout
    if (layouts.md.findIndex(itm => itm.w > cols.md) > -1) {
      const minFieldWidthMd = layouts.md.reduce((prv, cur) => (prv < cur ? prv : cur))
      layouts.md = convertLayout(layouts.md, cols.md, minFieldWidthMd)
    }
    // if any layout item width cross the max col then produce new layout
    if (layouts.sm.findIndex(itm => itm.w > cols.sm) > -1) {
      const minFieldWidthSm = layouts.sm.reduce((prv, cur) => (prv < cur ? prv : cur))
      layouts.sm = convertLayout(layouts.sm, cols.sm, minFieldWidthSm)
    }
  }

  return layouts
}

export const addToBuilderHistory = (historyData, unsaved = true, index = undefined) => {
  const builderHistoryState = getRecoil($builderHistory)
  const changedHistory = produce(builderHistoryState, draft => {
    if (index !== undefined) {
      if (!draft.histories[index]) draft.histories[index] = {}
      const history = draft.histories[index]
      draft.histories[index] = mergeNestedObj(history, historyData)
    } else {
      const lastHistory = draft.histories[draft.histories.length - 1]
      if ((lastHistory.type === historyData.type) && (lastHistory.state.fldKey === historyData.state.fldKey)) {
        draft.histories.pop()
        draft.active = draft.histories.length - 1
      }
      draft.histories.splice(draft.active + 1)
      draft.active = draft.histories.push(historyData) - 1
    }
  })
  setRecoil($builderHistory, changedHistory)

  if (unsaved) {
    const updateBtn = getRecoil($updateBtn)
    setRecoil($updateBtn, { ...updateBtn, unsaved: true })
  }
}

const checkErrKeyIndex = (fieldKey, errorKey) => {
  const updateBtn = getRecoil($updateBtn)
  return Array.isArray(updateBtn.errors) ? updateBtn.errors.findIndex(({ fieldKey: fldKey,
    errorKey: errKey }) => (fieldKey || errorKey) && (fieldKey ? fieldKey === fldKey : true) && (errorKey ? errorKey === errKey : true)) : -1
}

export const addFormUpdateError = (err) => {
  const updateBtn = getRecoil($updateBtn)
  const { fieldKey, errorKey } = err
  const errIndex = checkErrKeyIndex(fieldKey, errorKey)
  if (errIndex > -1) return
  const newUpdateBtn = produce(updateBtn, draftUpdateBtn => {
    if (!draftUpdateBtn.errors) {
      draftUpdateBtn.errors = []
    }
    draftUpdateBtn.errors.push(err)
  })
  setRecoil($updateBtn, newUpdateBtn)
}

export const removeFormUpdateError = (fieldKey, errorKey) => {
  const updateBtn = getRecoil($updateBtn)
  const errIndex = checkErrKeyIndex(fieldKey, errorKey)

  if (errIndex < 0) return
  if (fieldKey && !errorKey) {
    const newUpdateBtn = produce(updateBtn, draftUpdateBtn => {
      // delete all matched fieldKey errors
      draftUpdateBtn.errors = draftUpdateBtn.errors.filter(({ fieldKey: fldKey }) => fldKey !== fieldKey)
      if (draftUpdateBtn.errors.length === 0) {
        delete draftUpdateBtn.errors
      }
    })
    setRecoil($updateBtn, newUpdateBtn)
    return
  }
  const newUpdateBtn = produce(updateBtn, draftUpdateBtn => {
    draftUpdateBtn.errors.splice(errIndex, 1)

    const otherFldErrors = draftUpdateBtn.errors.filter(({ errorKey: errKey }) => errorKey === errKey)
    if (otherFldErrors.length === 1) {
      const otherErrorsIndex = checkErrKeyIndex('', errorKey)
      draftUpdateBtn.errors.splice(otherErrorsIndex, 1)
    }

    if (draftUpdateBtn.errors.length === 0) {
      delete draftUpdateBtn.errors
    }
  })

  setRecoil($updateBtn, newUpdateBtn)
}

export const compactNewLayoutItem = (breakpoint, layout, layouts) => produce(layouts, drftLay => {
  let minFieldW = 55
  drftLay.lg.map(layItm => {
    if (layItm.w < minFieldW) {
      minFieldW = layItm.w
    }
  })
  drftLay.lg.push(layout.lg || layout)
  drftLay.md.push(layout.md || layout)
  drftLay.sm.push(layout.sm || layout)
  drftLay[breakpoint] = sortLayoutByXY(drftLay[breakpoint])
  if (breakpoint === 'lg') {
    drftLay.md = convertLayout(sortLayoutByXY(drftLay.md), cols.md, minFieldW)
    drftLay.sm = convertLayout(sortLayoutByXY(drftLay.sm), cols.sm, minFieldW)
  } else if (breakpoint === 'md') {
    drftLay.lg = convertLayout(sortLayoutByXY(drftLay.lg), cols.lg, minFieldW)
    drftLay.sm = convertLayout(sortLayoutByXY(drftLay.sm), cols.sm, minFieldW)
  } else if (breakpoint === 'sm') {
    drftLay.lg = convertLayout(sortLayoutByXY(drftLay.lg), cols.lg, minFieldW)
    drftLay.md = convertLayout(sortLayoutByXY(drftLay.md), cols.md, minFieldW)
  }
})

export const addNewItemInLayout = (layouts, newItem) => produce(layouts, draftLayouts => {
  draftLayouts.lg.push(newItem)
  draftLayouts.md.push(newItem)
  draftLayouts.sm.push(newItem)
})

export const filterLayoutItem = (fldKey, layouts) => produce(layouts, draft => {
  draft.lg = draft.lg.filter(l => l.i !== fldKey)
  draft.md = draft.md.filter(l => l.i !== fldKey)
  draft.sm = draft.sm.filter(l => l.i !== fldKey)
})

export function sortLayoutByLg(layoutArr, orderLayout) {
  const newLayoutByOrder = []
  const layout = layoutArr
  for (let i = 0; i < orderLayout.length; i += 1) {
    const index = layout.findIndex(itm => itm.i === orderLayout[i].i)
    newLayoutByOrder.push(layout[index])
    layout.splice(index, 0)
  }
  return newLayoutByOrder
}

const getElementTotalHeight = (elm) => {
  if (elm) {
    const elmOldHeight = elm.style.height
    elm.style.height = 'auto'
    const height = elm.offsetHeight || 0
    const { marginTop, marginBottom } = window.getComputedStyle(elm)
    const marginTopNumber = Number(marginTop.match(/\d+/gi))
    const marginBottomNumber = Number(marginBottom.match(/\d+/gi))
    elm.style.height = elmOldHeight
    return Math.ceil(height + marginTopNumber + marginBottomNumber)
  }
  console.error('getElementTotalHeight: elm is null')
  return 0
}

export const fitAllLayoutItems = (lays) => {
  const newLays = deepCopy(lays)
  for (let i = 0; i < newLays.lg.length; i += 1) {
    newLays.lg[i].h = Math.ceil(getElementTotalHeight(selectInGrid(`.${newLays.lg[i].i}-fld-wrp`))) || newLays.lg[i].h
    newLays.md[i].h = Math.ceil(getElementTotalHeight(selectInGrid(`.${newLays.md[i].i}-fld-wrp`))) || newLays.md[i].h
    newLays.sm[i].h = Math.ceil(getElementTotalHeight(selectInGrid(`.${newLays.sm[i].i}-fld-wrp`))) || newLays.sm[i].h
  }
  return newLays
}

export const fitSpecificLayoutItem = (lays, fieldKey) => {
  const newLays = deepCopy(lays)
  const lgFld = newLays.lg.find(itm => itm.i === fieldKey)
  const mdFld = newLays.md.find(itm => itm.i === fieldKey)
  const smFld = newLays.sm.find(itm => itm.i === fieldKey)

  if (lgFld) lgFld.h = Math.ceil(getElementTotalHeight(selectInGrid(`.${lgFld.i}-fld-wrp`))) || lgFld.h
  if (mdFld) mdFld.h = Math.ceil(getElementTotalHeight(selectInGrid(`.${mdFld.i}-fld-wrp`))) || mdFld.h
  if (smFld) smFld.h = Math.ceil(getElementTotalHeight(selectInGrid(`.${smFld.i}-fld-wrp`))) || smFld.h
  return newLays
}

export const nestedObjAssign = (obj, paths, value, createNonExist = true) => {
  const path = paths?.split?.('->') || []
  if (path.length === 1) {
    if (createNonExist) {
      if (value instanceof Object) {
        const tmp = obj[path]
        obj[path] = { ...tmp, ...value }
        return
      }
      obj[path] = value
      return
    } return
  }

  if (path.length > 1 && obj[path[0]] === undefined) {
    if (createNonExist) {
      obj[path[0]] = {}
    } else return
  }

  return nestedObjAssign(obj[path[0]], path.slice(1), value)
}

export const deleteNestedObj = (obj, keyPath) => {
  const paths = keyPath?.split('->') || []
  if (paths.length === 1) {
    delete obj[paths[0]]
    return
  }
  const lastKeyIndex = paths.length - 1
  for (let i = 0; i < lastKeyIndex; i += 1) {
    const key = paths[i]
    if (!(key in obj)) {
      obj[key] = {}
    }
    obj = obj[key]
  }
  delete obj[paths[lastKeyIndex]]
}

export const propertyValueSumY = (propertyValue = '') => {
  let arr = propertyValue?.replace(/px|em|rem|!important/g, '').split(' ')
  if (arr.length === 1) { arr = Array(4).fill(arr[0]) }
  if (arr.length === 2) { arr = [arr[0], arr[1], arr[0], arr[1]] }
  if (arr.length === 3) { arr = [arr[0], arr[1], arr[2], arr[1]] }
  arr = [arr[0], arr[2]]
  const summ = arr?.reduce((pv, cv) => Number(pv) + Number(cv), 0)
  return summ || 0
}

export const filterNumber = numberString => Number(numberString.replace(/px|em|rem|!important/g, ''))

export const reCalculateFldHeights = (fieldKey) => {
  const builderHookState = getRecoil($builderHookStates)
  if (fieldKey) {
    const newBuilderHookState = produce(builderHookState, draft => {
      const { counter } = draft.reCalculateSpecificFldHeight
      draft.reCalculateSpecificFldHeight = {
        fieldKey,
        counter: counter + 1,
      }
    })
    setRecoil($builderHookStates, newBuilderHookState)
  } else {
    const newBuilderHookState = produce(builderHookState, draft => {
      draft.reCalculateFieldHeights += 1
    })
    setRecoil($builderHookStates, newBuilderHookState)
  }
}

export const generateHistoryData = (element, fieldKey, path, changedValue, state) => {
  const propertyName = genaratePropertyName(path)
  let event = ''
  if (fieldKey) {
    state.fldKey = fieldKey
    event = `${propertyName} ${changedValue ? `changed to ${changedValue}` : ''}: ${elementLabel(element)}`
  } else {
    state.fldKey = elementLabel(element)
    event = `${propertyName} ${changedValue ? `changed to ${changedValue}` : ''}`
  }
  return {
    event,
    type: `${propertyName}_changed`,
    state,
  }
}

export const getLatestState = (stateName) => {
  if (stateName === 'fields') return getRecoil($fields)
  if (stateName === 'styles') return getRecoil($styles)
  if (stateName === 'themeVars') return getRecoil($themeVars)
  if (stateName === 'themeColors') return getRecoil($themeColors)
  if (stateName === 'breakpoint') return getRecoil($breakpoint)
  if (stateName === 'colorScheme') return getRecoil($colorScheme)
}

const elementLabel = (element) => {
  const labels = {
    'quick-tweaks': 'Theme Quick Tweaks',
    '_frm-bg': 'Form Wrapper',
    _frm: 'Form Container',
    'field-containers': 'Field Container',
    'label-containers': 'Label & Subtitle Container',
    'lbl-wrp': 'Label Container',
    lbl: 'Label',
    'lbl-pre-i': 'Label Leading Icon',
    'lbl-suf-i': 'Label Trailing Icon',
    'sub-titl': 'Subtitle',
    'sub-titl-pre-i': 'Subtitle Leading Icon',
    'sub-titl-suf-i': 'Subtitle Trailing Icon',
    'pre-i': 'Input Leading Icon',
    'suf-i': 'Input Trailing Icons',
    'hlp-txt': 'Helper Text',
    'hlp-txt-pre-i': 'Helper Text Leading Icon',
    'hlp-txt-suf-i': 'Helper Text Trailing Icon',
    'err-msg': 'Error Message',
    'err-txt-pre-i': 'Error Text Leading Icon',
    'err-txt-suf-i': 'Error Text Trailing Icon',
    btn: 'Button',
    'btn-pre-i': 'Button Leading Icon',
    'btn-suf-i': 'Button Trailing Icon',
    'req-smbl': 'Asterisk Symbol',
    fld: 'Input Field',
  }
  return labels[element] || element || ''
}

const genaratePropertyName = (propertyName) => {
  const newPropertyName = propertyName?.includes('->') ? propertyName.slice(propertyName.lastIndexOf('->') + 2) : propertyName
  return newPropertyName
    ?.replace(/--/g, '')
    .replace(/-/g, ' ')
    .replace(/\b(fld)\b/g, 'Field')
    .replace(/\b(pre)\b/g, 'Leading')
    .replace(/\b(suf)\b/g, 'Suffix')
    .replace(/\b(i)\b/g, 'Icon')
    .replace(/\b(lbl)\b/g, 'Label')
    .replace(/\b(clr)\b/g, 'Color')
    .replace(/\b(c)\b/g, 'Color')
    .replace(/\b(bdr)\b/g, 'Border')
    .replace(/\b(fltr)\b/g, 'Filter')
    .replace(/\b(sh)\b/g, 'Shadow')
    .replace(/\b(bg)\b/g, 'Background')
    .replace(/\b(hlp)\b/g, 'Helper')
    .replace(/\b(err)\b/g, 'Error')
    .replace(/\b(titl)\b/g, 'Title')
    .replace(/\b(smbl)\b/g, 'Symbol')
    .replace(/\b(fs)\b/g, 'Font Size')
    .replace(/\b(m)\b/g, 'Margin')
    .replace(/\b(p)\b/g, 'Padding')
    .replace(/\b(w)\b/g, 'Width')
    .replace(/\b(h)\b/g, 'Height')
    .replace(/\b(wrp)\b/g, 'Container')
    .replace(/\b(req)\b/g, 'Required')
    .replace(/\b\w/g, c => c.toUpperCase())
}

export const calculateFormGutter = (styles, formId) => {
  let gutter = 0
  if (!styles) return gutter
  if (styles[`._frm-b${formId}`]?.['border-width']) { gutter += propertyValueSumX(styles[`._frm-b${formId}`]['border-width']) }
  if (styles[`._frm-b${formId}`]?.padding) { gutter += propertyValueSumX(styles[`._frm-b${formId}`].padding) }
  if (styles[`._frm-b${formId}`]?.margin) { gutter += propertyValueSumX(styles[`._frm-b${formId}`].margin) }
  if (styles[`._frm-bg-b${formId}`]?.['border-width']) { gutter += propertyValueSumX(styles[`._frm-bg-b${formId}`]['border-width']) }
  if (styles[`._frm-bg-b${formId}`]?.padding) { gutter += propertyValueSumX(styles[`._frm-bg-b${formId}`].padding) }
  if (styles[`._frm-bg-b${formId}`]?.margin) { gutter += propertyValueSumX(styles[`._frm-bg-b${formId}`].margin) }
  return gutter
}

export const getResizableHandles = fieldType => {
  switch (fieldType) {
    // case 'divider':
    case 'textarea':
    case 'image':
      return ['se', 'e']
    default:
  }
}

export const setRequired = (e, callBack) => {
  const fields = getRecoil($fields)
  const fldKey = getRecoil($selectedFieldId)
  const fieldData = deepCopy(fields[fldKey])
  if (e.target.checked) {
    const tmp = { ...fieldData.valid }
    tmp.req = true
    tmp.reqShow = true
    tmp.reqPos = 'after'
    fieldData.valid = tmp
    if (!fieldData.err) fieldData.err = {}
    if (!fieldData.err.req) fieldData.err.req = {}
    fieldData.err.req.dflt = '<p style="margin:0">This field is required</p>'
    fieldData.err.req.show = true
    addDefaultStyleClasses(fldKey, 'reqSmbl')
  } else {
    delete fieldData.valid.req
  }
  const allFields = produce(fields, draft => { draft[fldKey] = fieldData })
  setRecoil($fields, allFields)
  const req = e.target.checked ? 'on' : 'off'
  addToBuilderHistory({ event: `Field required ${req}: ${fieldData.adminLbl || fieldData.lbl || fldKey}`, type: `required_${req}`, state: { fields: allFields, fldKey } })
  callBack && callBack()
}

/**
 * find different field between 2 layout
 * @param lay1 layout Object
 * @param lay2 layout Object
 * @returns layout object which is different from lay1
 *  */
export function getLayoutDiff(lay1, lay2) {
  const diff = lay2.filter((l2) => {
    const l1Item = lay1.find((l1) => l2.i === l1.i)
    if (l1Item) {
      if (
        l1Item.w !== l2.w
        || l1Item.h !== l2.h
        || l1Item.x !== l2.x
        || l1Item.y !== l2.y
      ) {
        return true
      }
    }
  })
  return diff
}

// fast compare 2 layout object
export function isLayoutSame(l1, l2) {
  const l1LgLength = l1.lg.length
  const l1MdLength = l1.md.length
  const l1SmLength = l1.sm.length

  if (l1LgLength !== l2.lg.length) return false
  if (l1MdLength !== l2.md.length) return false
  if (l1SmLength !== l2.sm.length) return false

  // compare lg
  for (let i = 0; i < l1LgLength; i += 1) {
    const l1ItemKeys = Object.keys(l1.lg[i])
    const l2ItemKeys = Object.keys(l2.lg[i])
    const l1ItemKeysLength = l1ItemKeys.length
    if (l1ItemKeysLength !== l2ItemKeys.length) return false

    for (let j = 0; j < l1ItemKeysLength; j += 1) {
      const l1ItemKey = l1ItemKeys[j]
      if (Array.isArray(l1.lg[i][l1ItemKey])) {
        if (
          JSON.stringify(l1.lg[i][l1ItemKey])
          !== JSON.stringify(l2.lg[i][l1ItemKey])
        ) {
          return false
        }
      } else if (l1.lg[i][l1ItemKey] !== l2.lg[i][l1ItemKey]) {
        return false
      }
    }
  }

  // compare md
  for (let i = 0; i < l1MdLength; i += 1) {
    const l1ItemKeys = Object.keys(l1.md[i])
    const l2ItemKeys = Object.keys(l2.md[i])
    const l1ItemKeysLength = l1ItemKeys.length
    if (l1ItemKeysLength !== l2ItemKeys.length) return false

    for (let j = 0; j < l1ItemKeysLength; j += 1) {
      const l1ItemKey = l1ItemKeys[j]
      if (Array.isArray(l1.md[i][l1ItemKey])) {
        if (
          JSON.stringify(l1.md[i][l1ItemKey])
          !== JSON.stringify(l2.md[i][l1ItemKey])
        ) {
          return false
        }
      } else if (l1.md[i][l1ItemKey] !== l2.md[i][l1ItemKey]) {
        return false
      }
    }
  }

  // compare sm
  for (let i = 0; i < l1LgLength; i += 1) {
    const l1ItemKeys = Object.keys(l1.sm[i])
    const l2ItemKeys = Object.keys(l2.sm[i])
    const l1ItemKeysLength = l1ItemKeys.length
    if (l1ItemKeysLength !== l2ItemKeys.length) return false

    for (let j = 0; j < l1ItemKeysLength; j += 1) {
      const l1ItemKey = l1ItemKeys[j]
      if (Array.isArray(l1.sm[i][l1ItemKey])) {
        if (
          JSON.stringify(l1.sm[i][l1ItemKey])
          !== JSON.stringify(l2.sm[i][l1ItemKey])
        ) {
          return false
        }
      } else if (l1.sm[i][l1ItemKey] !== l2.sm[i][l1ItemKey]) {
        return false
      }
    }
  }
  return true
}

export function getAbsoluteElmHeight(el, withMargin = 1) {
  if (!el) return 0
  const iFrameWindow = document.getElementById('bit-grid-layout').contentWindow
  if (!withMargin) return el.offsetHeight
  const stl = iFrameWindow.getComputedStyle(el)
  const margin = parseFloat(stl.marginTop) + parseFloat(stl.marginBottom)
  return el.offsetHeight + margin
}

export const generateSessionKey = key => {
  const formId = getRecoil($formId)
  if (!formId) return null
  return `btcd-${key}-bf-${formId}`
}

export async function addToSessionStorage(key, value, { strType } = {}) {
  return false
  if (!key) return
  let newVal = value
  if (typeof value !== 'string') {
    if (strType === 'json') newVal = JSON.stringify(value)
    if (strType === 'jcof') newVal = JCOF.stringify(value)
  }
  sessionStorage.setItem(key, newVal)
}

export const getSessionStorageStates = (key, { strType } = {}) => {
  if (!key) return null
  const state = sessionStorage.getItem(key)
  if (!state) return null
  if (!strType) return state
  if (strType === 'json') return JSON.parse(state)
  if (strType === 'jcof') return JCOF.parse(state)
  return state
}

export const getCurrentFormUrl = () => {
  const formID = getRecoil($formId)
  const { hash } = window.location
  const url = hash.replace('#', '')
  const regex = new RegExp(`/(.*?)${formID}`)
  const matchedUrl = url.match(regex)
  if (matchedUrl) return matchedUrl[0]
  return null
}

export const getTotalLayoutHeight = () => {
  const layouts = getRecoil($layouts)
  const breakpoint = getRecoil($breakpoint)
  const layout = layouts[breakpoint]

  return layout.reduce((acc, { h, y }) => {
    const { [y]: prevH = 0 } = acc.maxHeightsByY
    const newH = Math.max(prevH, h)
    return {
      maxHeightsByY: { ...acc.maxHeightsByY, [y]: newH },
      totalHeight: acc.totalHeight + (newH - prevH),
    }
  }, { maxHeightsByY: {}, totalHeight: 0 }).totalHeight
}
