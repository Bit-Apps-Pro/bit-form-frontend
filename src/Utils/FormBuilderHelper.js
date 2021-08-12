import produce from 'immer'
import { __ } from './i18nwrap'

/**
 * sort a layout array by x and y axis
 * @param {array} layoutArr layout array [{x:0,y:1,...}, {x:0,y:2,...}, ]
 * @returns {Array} sorted layout
 */
export const sortLayoutByXY = (layoutArr) => produce(layoutArr, draftLayoutArr => draftLayoutArr.sort((first, second) => {
  const n = first.y - second.y
  if (n !== 0) {
    return n
  }
  return first.x - second.x
}))

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
export function convertLayout(layout, tc, fieldMinW = 1) {
  const newLayout = []
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

export const validateField = (field, allFields, extraFieldsAttr, paymentsIntegs = [], setProModal, setModal, additionalSettings) => {
  // eslint-disable-next-line no-undef
  if (extraFieldsAttr[field.typ]?.pro && !bits.isPro) {
    setProModal({ show: true, msg: __(`${field.typ} field is available in Pro Version!`, 'bitform') })
    return { validationMsg: 'pro' }
  }
  if (extraFieldsAttr[field.typ]?.onlyOne) {
    if (Object.values(allFields).find(fld => fld.typ === field.typ)) {
      setModal({
        show: true,
        msg: __(`You cannot add more than one ${field.typ} field in same form.`, 'bitform'),
      })
      return { validationMsg: 'alread-exist' }
    }
  }
  if (extraFieldsAttr[field.typ]?.checkDefaultConfig) {
    const [payConf] = paymentsIntegs.filter(pay => pay.type.toLowerCase() === field.typ)
    if (payConf?.length === 1) return { validationMsg: 'extraAttrAvailable', data: payConf }
  }
  if (field.typ === 'recaptcha') {
    if (additionalSettings?.enabled?.recaptchav3) {
      setModal({
        show: true,
        msg: __('You can use either ReCaptcha-V2 or ReCaptcha-V3 in a form. to use ReCaptcha-V2 disable the ReCaptcha-V3 from the Form Settings.', 'bitform'),
      })
    }
  }

  // TODO country field with type  and list it in extraFieldsAttr
  // eslint-disable-next-line no-undef
  if (field.lbl === 'Select Country' && !bits.isPro) {
    setModal({
      show: true,
      msg: __('Country Field available in Pro version of Bit Form.', 'bitform'),
    })
  }
}
