/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { getRecoil, setRecoil } from 'recoil-nexus'
import { $builderHistory, $builderHookStates, $updateBtn } from '../GlobalStates/GlobalStates'
import { selectInGrid } from './globalHelpers'
import { deepCopy } from './Helpers'

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
 * @param {Array} layout array of object ex: [{x:0,y:0,...}, {x:3:y:0,...}, ...]
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
  const summ = arr?.reduce((pv, cv) => Number(pv) + Number(cv), 0)
  return summ || 0
}

const FIELDS_EXTRA_ATTR = {
  paypal: { pro: true, onlyOne: true, setDefaultPayConfig: true },
  razorpay: { pro: true, onlyOne: true, setDefaultPayConfig: true },
  recaptcha: { onlyOne: true },
  submit: { onlyOne: true },
  reset: { onlyOne: true },
}

export const checkFieldsExtraAttr = (field, allFields, paymentsIntegs = [], additionalSettings, bits, __) => {
  // eslint-disable-next-line no-undef
  if (field.lbl === 'Select Country' && !bits.isPro) {
    return { validType: 'pro', msg: __('Country Field available in Pro version of Bit Form.') }
  }

  if (field.typ === 'recaptcha' && additionalSettings?.enabled?.recaptchav3) {
    return { msg: __('You can use either ReCaptcha-V2 or ReCaptcha-V3 in a form. to use ReCaptcha-V2 disable the ReCaptcha-V3 from the Form Settings.') }
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
export function produceNewLayouts(layouts, breakpointArr, cols) {
  const lays = deepCopy(layouts)
  lays.lg = sortLayoutItemsByRowCol(lays.lg)
  const minFieldW = lays.lg.reduce((prv, cur) => (prv < cur ? prv : cur))
  if (breakpointArr.indexOf('md') > -1) {
    lays.md = convertLayout(lays.lg, cols.md, minFieldW)
  }
  if (breakpointArr.indexOf('sm') > -1) {
    lays.sm = convertLayout(lays.lg, cols.sm, minFieldW)
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

export function layoutOrderSortedByLg(lay, cols) {
  const tmpLay = deepCopy(lay)
  const newLay = { lg: [], md: [], sm: [] }

  newLay.lg = sortLayoutItemsByRowCol(tmpLay.lg)
  newLay.md = sortLayoutByLg(tmpLay.md, newLay.lg)
  newLay.sm = sortLayoutByLg(tmpLay.sm, newLay.lg)
  const minFieldWidthSm = tmpLay.sm.reduce((prv, cur) => (prv < cur ? prv : cur))
  const minFieldWidthMd = tmpLay.md.reduce((prv, cur) => (prv < cur ? prv : cur))
  newLay.md = convertLayout(newLay.md, cols.md, minFieldWidthMd)
  newLay.sm = convertLayout(newLay.sm, cols.sm, minFieldWidthSm)

  return newLay
}

export const addToBuilderHistory = (historyData, unsaved = true) => {
  const builderHistoryState = getRecoil($builderHistory)
  const changedHistory = produce(builderHistoryState, draft => {
    const lastHistory = draft.histories[draft.histories.length - 1]
    if ((lastHistory.type === historyData.type) && (lastHistory.state.fldKey === historyData.state.fldKey)) {
      draft.histories.pop()
      draft.active = draft.histories.length - 1
    }
    draft.histories.splice(draft.active + 1)
    draft.active = draft.histories.push(historyData) - 1
  })
  setRecoil($builderHistory, changedHistory)

  if (unsaved) {
    setRecoil($updateBtn, { unsaved })
  }
}

export const cols = { lg: 60, md: 40, sm: 20 }

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
  // draftLayouts.md.push(newItem)
  // draftLayouts.sm.push(newItem)
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
    const height = elm.offsetHeight || 0
    const { marginTop, marginBottom } = window.getComputedStyle(elm)
    const marginTopNumber = Number(marginTop.match(/\d+/gi))
    const marginBottomNumber = Number(marginBottom.match(/\d+/gi))
    return Math.round(height + marginTopNumber + marginBottomNumber)
  }
  return 0
}

export const fitAllLayoutItems = (lays) => produce(lays, draftLayout => {
  draftLayout.lg.map(fld => {
    const height = getElementTotalHeight(selectInGrid(`.${fld.i}-fld-wrp`))
    if (height) {
      fld.h = Math.round(height / 2)
    }
  })
})

export const fitSpecificLayoutItem = (lays, fieldKey) => produce(lays, draftLayout => {
  draftLayout.lg.map(fld => {
    if (fld.i === fieldKey) {
      const height = getElementTotalHeight(selectInGrid(`.${fieldKey}-fld-wrp`))
      if (height) {
        fld.h = Math.round(height / 2)
      }
    }
  })
})

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

// TODO can be assign non existing path also
export const assignNestedObj = (obj, keyPath, value) => {
  const paths = keyPath?.split('->') || []
  if (paths.length === 1) {
    obj[paths[0]] = value
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
  obj[paths[lastKeyIndex]] = value
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

export const reCalculateFieldHeights = (fieldKey) => {
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
