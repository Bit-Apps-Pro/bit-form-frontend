/* eslint-disable no-continue */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { deepCopy } from './Helpers'
import { __ } from './i18nwrap'

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
  for (const [okey] of Object.entries(obj)) {
    if (Number(key) === Number(okey)) return obj
    // eslint-disable-next-line no-param-reassign
    delete obj[Number(okey)]
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

      setYaxisCount(lastItem.y, lastItem.y + layoutItem.h,
        [
          lastItem.x + lastItem.w,
          layoutItem.w + lastItem.x + lastItem.w,
        ])
      layoutItemIndex += 1
      continue
    }

    const layoutYAxisCountArr = Object.entries(layoutYAxisCount)
    for (const [key, value] of layoutYAxisCountArr) {
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
}

export const checkFieldsExtraAttr = (field, allFields, paymentsIntegs = [], additionalSettings, bits, __) => {
  // TODO country field with type  and list it in extraFieldsAttr
  // eslint-disable-next-line no-undef
  if (field.lbl === 'Select Country' && !bits.isPro) {
    return { validType: 'pro', msg: __('Country Field available in Pro version of Bit Form.', 'bitform') }
  }

  if (field.typ === 'recaptcha' && additionalSettings?.enabled?.recaptchav3) {
    return { msg: __('You can use either ReCaptcha-V2 or ReCaptcha-V3 in a form. to use ReCaptcha-V2 disable the ReCaptcha-V3 from the Form Settings.', 'bitform') }
  }

  // eslint-disable-next-line no-undef
  if (FIELDS_EXTRA_ATTR[field.typ]?.pro && !bits.isPro) {
    return { validType: 'pro', msg: __(`${field.typ} field is available in Pro Version!`, 'bitform') }
  }

  if (FIELDS_EXTRA_ATTR[field.typ]?.onlyOne && Object.values(allFields).find(fld => fld.typ === field.typ)) {
    return { validType: 'onlyOne', msg: __(`You cannot add more than one ${field.typ} field in the same form.`, 'bitform') }
  }

  if (FIELDS_EXTRA_ATTR[field.typ]?.setDefaultPayConfig) {
    const payConf = paymentsIntegs.filter(pay => pay.type.toLowerCase() === field.typ)
    if (payConf.length === 1) {
      return { validType: 'setDefaultPayConfig', payData: payConf[0] }
    }
  }

  return {}
}

function getStatics(layout) {
  return layout.filter((l) => l.static)
}

function sortLayoutItemsByColRow(layout) {
  return layout.slice(0).sort((a, b) => {
    if (a.x > b.x || (a.x === b.x && a.y > b.y)) {
      return 1
    }
    return -1
  })
}

function bottom(layout) {
  let max = 0
  let bottomY
  for (let i = 0, len = layout.length; i < len; i += 1) {
    bottomY = layout[i].y + layout[i].h
    if (bottomY > max) max = bottomY
  }
  return max
}

function cloneLayoutItem(layoutItem) {
  return {
    w: layoutItem.w,
    h: layoutItem.h,
    x: layoutItem.x,
    y: layoutItem.y,
    i: layoutItem.i,
    minW: layoutItem.minW,
    maxW: layoutItem.maxW,
    minH: layoutItem.minH,
    maxH: layoutItem.maxH,
    moved: Boolean(layoutItem.moved),
    static: Boolean(layoutItem.static),
    // These can be null/undefined
    isDraggable: layoutItem.isDraggable,
    isResizable: layoutItem.isResizable,
    resizeHandles: layoutItem.resizeHandles,
    isBounded: layoutItem.isBounded,
  }
}

const heightWidth = { x: 'w', y: 'h' }

function resolveCompactionCollision(layout, item, moveToCoord, axis) {
  const sizeProp = heightWidth[axis]
  item[axis] += 1
  const itemIndex = layout
    .map((layoutItem) => layoutItem.i)
    .indexOf(item.i)

  // Go through each item we collide with.
  for (let i = itemIndex + 1; i < layout.length; i += 1) {
    const otherItem = layout[i]
    // Ignore static items
    if (otherItem.static) continue

    // Optimization: we can break early if we know we're past this el
    // We can do this b/c it's a sorted layout
    if (otherItem.y > item.y + item.h) break

    if (collides(item, otherItem)) {
      resolveCompactionCollision(
        layout,
        otherItem,
        moveToCoord + item[sizeProp],
        axis,
      )
    }
  }

  item[axis] = moveToCoord
}

function collides(l1, l2) {
  if (l1.i === l2.i) return false // same element
  if (l1.x + l1.w <= l2.x) return false // l1 is left of l2
  if (l1.x >= l2.x + l2.w) return false // l1 is right of l2
  if (l1.y + l1.h <= l2.y) return false // l1 is above l2
  if (l1.y >= l2.y + l2.h) return false // l1 is below l2
  return true // boxes overlap
}

function getFirstCollision(layout, layoutItem) {
  for (let i = 0, len = layout.length; i < len; i += 1) {
    if (collides(layout[i], layoutItem)) return layout[i]
  }
}

function compactItem(compareWith, l, compactType, cols, fullLayout) {
  const compactV = compactType === 'vertical'
  const compactH = compactType === 'horizontal'
  if (compactV) {
    // Bottom 'y' possible is the bottom of the layout.
    // This allows you to do nice stuff like specify {y: Infinity}
    // This is here because the layout must be sorted in order to get the correct bottom `y`.
    l.y = Math.min(bottom(compareWith), l.y)
    // Move the element up as far as it can go without colliding.
    while (l.y > 0 && !getFirstCollision(compareWith, l)) {
      l.y -= 1
    }
  } else if (compactH) {
    // Move the element left as far as it can go without colliding.
    while (l.x > 0 && !getFirstCollision(compareWith, l)) {
      l.x -= 1
    }
  }

  // Move it down, and keep moving it down if it's colliding.
  let collides
  while ((collides = getFirstCollision(compareWith, l))) {
    if (compactH) {
      resolveCompactionCollision(fullLayout, l, collides.x + collides.w, 'x')
    } else {
      resolveCompactionCollision(fullLayout, l, collides.y + collides.h, 'y')
    }
    // Since we can't grow without bounds horizontally, if we've overflown, let's move it down and try again.
    if (compactH && l.x + l.w > cols) {
      l.x = cols - l.w
      l.y += 1
    }
  }

  // Ensure that there are no negative positions
  l.y = Math.max(l.y, 0)
  l.x = Math.max(l.x, 0)

  return l
}

function sortLayoutItemsByRowCol(layout) {
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

function sortLayoutItems(layout, compactType) {
  if (compactType === 'horizontal') return sortLayoutItemsByColRow(layout)
  if (compactType === 'vertical') return sortLayoutItemsByRowCol(layout)
  return layout
}

export function compact(layout, compactType, cols) {
  // Statics go in the compareWith array right away so items flow around them.
  const compareWith = getStatics(layout)
  // We go through the items by row and column.
  const sorted = sortLayoutItems(layout, compactType)
  // Holding for new items.
  const out = Array(layout.length)

  for (let i = 0, len = sorted.length; i < len; i += 1) {
    let l = cloneLayoutItem(sorted[i])

    // Don't move static elements
    if (!l.static) {
      l = compactItem(compareWith, l, compactType, cols, sorted)

      // Add to comparison array. We only collide with items before this one.
      // Statics are already in this array.
      compareWith.push(l)
    }

    // Add to output array to make sure they still come out in the right order.
    out[layout.indexOf(sorted[i])] = l

    // Clear moved flag, if it exists.
    l.moved = false
  }

  return out
}

export const compactNewLayoutItem = (breakpoint, layout, layouts) => {
  const cols = { lg: 60, md: 40, sm: 20 }
  return produce(layouts, drftLay => {
    drftLay.lg.push(layout.lg || layout)
    drftLay.md.push(layout.md || layout)
    drftLay.sm.push(layout.sm || layout)
    drftLay[breakpoint] = sortLayoutByXY(drftLay[breakpoint])
    if (breakpoint === 'lg') {
      drftLay.md = convertLayout(sortLayoutByXY(drftLay.md), cols.md)
      drftLay.sm = convertLayout(sortLayoutByXY(drftLay.sm), cols.sm)
    } else if (breakpoint === 'md') {
      drftLay.lg = convertLayout(sortLayoutByXY(drftLay.lg), cols.lg)
      drftLay.sm = convertLayout(sortLayoutByXY(drftLay.sm), cols.sm)
    } else if (breakpoint === 'sm') {
      drftLay.lg = convertLayout(sortLayoutByXY(drftLay.lg), cols.lg)
      drftLay.md = convertLayout(sortLayoutByXY(drftLay.md), cols.md)
    }
  })
}

export const compactRemovedLayoutItem = (fldKey, breakpoint, layouts) => produce(layouts, draft => {
  if (breakpoint === 'lg') {
    draft.lg = draft.lg.filter(l => l.i !== fldKey)
    draft.md = compact(draft.md.filter(l => l.i !== fldKey), 'vertical')
    draft.sm = compact(draft.sm.filter(l => l.i !== fldKey), 'vertical')
  } else if (breakpoint === 'md') {
    draft.lg = compact(draft.lg.filter(l => l.i !== fldKey), 'vertical')
    draft.md = draft.md.filter(l => l.i !== fldKey)
    draft.sm = compact(draft.sm.filter(l => l.i !== fldKey), 'vertical')
  } else if (breakpoint === 'sm') {
    draft.lg = compact(draft.lg.filter(l => l.i !== fldKey), 'vertical')
    draft.md = compact(draft.md.filter(l => l.i !== fldKey), 'vertical')
    draft.sm = draft.sm.filter(l => l.i !== fldKey)
  }
})
