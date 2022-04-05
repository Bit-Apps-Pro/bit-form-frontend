/* eslint-disable no-nested-ternary */

import htmr from 'htmr'

/* eslint-disable no-param-reassign */
export const hideWpMenu = () => {
  document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  if (!Object.prototype.hasOwnProperty.call(process.env, 'PUBLIC_URL')) {
    document.getElementsByClassName('wp-toolbar')[0].style.paddingTop = 0
    document.getElementById('wpadminbar').style.display = 'none'
    document.getElementById('adminmenumain').style.display = 'none'
    document.getElementById('adminmenuback').style.display = 'none'
    document.getElementById('adminmenuwrap').style.display = 'none'
    document.getElementById('wpfooter').style.display = 'none'
    document.getElementById('wpcontent').style.marginLeft = 0
  }
}

export const isObjectEmpty = (obj) => obj
  && Object.keys(obj).length === 0
  && Object.getPrototypeOf(obj) === Object.prototype

export const showWpMenu = () => {
  document.getElementsByTagName('body')[0].style.overflow = 'auto'
  if (!Object.prototype.hasOwnProperty.call(process.env, 'PUBLIC_URL')) {
    document.getElementsByClassName('wp-toolbar')[0].style.paddingTop = '32px'
    document.getElementById('wpadminbar').style.display = 'block'
    document.getElementById('adminmenumain').style.display = 'block'
    document.getElementById('adminmenuback').style.display = 'block'
    document.getElementById('adminmenuwrap').style.display = 'block'
    document.getElementById('wpcontent').style.marginLeft = null
    document.getElementById('wpfooter').style.display = 'block'
  }
}

export const getNewId = flds => {
  let largestNumberFld = 0
  let num = 0
  const fldsArr = Object.keys(flds)
  fldsArr.map(fld => {
    if (fld !== null && fld !== undefined) {
      num = Number(fld.match(/-[0-9]+/g)?.[0]?.match(/[0-9]+/g))
      if (typeof num === 'number' && num > largestNumberFld) {
        largestNumberFld = num
      }
    }
  })
  return largestNumberFld + 1
}

export const assign = (obj, keyPath, value) => {
  const lastKeyIndex = keyPath.length - 1
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < lastKeyIndex; ++i) {
    const key = keyPath[i]
    if (!(key in obj)) {
      obj[key] = {}
    }
    obj = obj[key]
  }
  obj[keyPath[lastKeyIndex]] = value
  return value
}

export const multiAssign = (obj, assignArr) => {
  for (let i = 0; i < assignArr.length; i += 1) {
    if (assignArr[i].delProp) {
      delete obj?.[assignArr[i].cls]?.[assignArr[i].property]
      if (obj[assignArr[i]?.cls]?.constructor === Object && Object.keys(obj?.[assignArr[i]?.cls]).length === 0) {
        delete obj[assignArr[i].cls]
      }
    } else {
      assign(obj, [assignArr[i].cls, assignArr[i].property], assignArr[i].value)
    }
  }
}
const forEach = (array, iteratee) => {
  let index = -1
  const { length } = array
  // eslint-disable-next-line no-plusplus
  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}
export const deepCopy = (target, map = new WeakMap()) => {
  if (typeof target !== 'object' || target === null) {
    return target
  }
  const isArray = Array.isArray(target)
  const cloneTarget = isArray ? [] : {}

  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  if (isArray) {
    forEach(target, (value, index) => {
      cloneTarget[index] = deepCopy(value, map)
    })
  } else {
    forEach(Object.keys(target), key => {
      cloneTarget[key] = deepCopy(target[key], map)
    })
  }
  return cloneTarget
}

export const sortArrOfObj = (data, sortLabel) => data.sort((a, b) => {
  if (a?.[sortLabel]?.toLowerCase() < b?.[sortLabel]?.toLowerCase()) return -1
  if (a?.[sortLabel]?.toLowerCase() > b?.[sortLabel]?.toLowerCase()) return 1
  return 0
})

export const dateTimeFormatter = (dateStr, format) => {
  const newDate = new Date(dateStr)

  if (newDate.toString() === 'Invalid Date') {
    return 'Invalid Date'
  }

  const allFormatObj = {}

  // Day
  allFormatObj.d = newDate.toLocaleDateString('en-US', { day: '2-digit' })
  allFormatObj.j = newDate.toLocaleDateString('en-US', { day: 'numeric' })
  let S = Number(allFormatObj.j)
  if (S % 10 === 1 && S !== 11) {
    S = 'st'
  } else if (S % 10 === 2 && S !== 12) {
    S = 'nd'
  } else if (S % 10 === 3 && S !== 13) {
    S = 'rd'
  } else {
    S = 'th'
  }
  allFormatObj.S = S
  // Weekday
  allFormatObj.l = newDate.toLocaleDateString('en-US', { weekday: 'long' })
  allFormatObj.D = newDate.toLocaleDateString('en-US', { weekday: 'short' })
  // Month
  allFormatObj.m = newDate.toLocaleDateString('en-US', { month: '2-digit' })
  allFormatObj.n = newDate.toLocaleDateString('en-US', { month: 'numeric' })
  allFormatObj.F = newDate.toLocaleDateString('en-US', { month: 'long' })
  allFormatObj.M = newDate.toLocaleDateString('en-US', { month: 'short' })
  // Year
  allFormatObj.Y = newDate.toLocaleDateString('en-US', { year: 'numeric' })
  allFormatObj.y = newDate.toLocaleDateString('en-US', { year: '2-digit' })
  // Time
  allFormatObj.a = newDate.toLocaleTimeString('en-US', { hour12: true }).split(' ')[1].toLowerCase()
  // eslint-disable-next-line prefer-destructuring
  allFormatObj.A = newDate.toLocaleTimeString('en-US', { hour12: true }).split(' ')[1]
  // Hour
  // eslint-disable-next-line prefer-destructuring
  allFormatObj.g = newDate.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric' }).split(' ')[0]
  // eslint-disable-next-line prefer-destructuring
  allFormatObj.h = newDate.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit' }).split(' ')[0]
  allFormatObj.G = newDate.toLocaleTimeString('en-US', { hour12: false, hour: 'numeric' })
  allFormatObj.H = newDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit' })
  // Minute
  allFormatObj.i = newDate.toLocaleTimeString('en-US', { minute: '2-digit' })
  // Second
  allFormatObj.s = newDate.toLocaleTimeString('en-US', { second: '2-digit' })
  // Additional
  // eslint-disable-next-line prefer-destructuring
  allFormatObj.T = newDate.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ')[2]
  allFormatObj.c = newDate.toISOString()
  allFormatObj.r = newDate.toUTCString()
  allFormatObj.U = newDate.valueOf()
  let formattedDate = ''

  const allFormatkeys = Object.keys(allFormatObj)

  for (let v = 0; v < format.length; v += 1) {
    if (format[v] === '\\') {
      v += 1
      formattedDate += format[v]
    } else {
      const formatKey = allFormatkeys.find(key => key === format[v])
      formattedDate += formatKey ? format[v].replace(formatKey, allFormatObj[formatKey]) : format[v]
    }
  }

  return formattedDate
}

const cipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0))
  const byteHex = n => (`0${Number(n).toString(16)}`).substr(-2)
  // eslint-disable-next-line no-bitwise
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code)

  return text => text
    .split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('')
}

const decipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0))
  // eslint-disable-next-line no-bitwise
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => (a ^ b), code)
  return encoded => encoded
    .match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('')
}

export const bitCipher = cipher('btcd')
export const bitDecipher = decipher('btcd')

export function spreadIn4Value(value) {
  if (!value) return undefined
  const valArr = value.split(' ')
  if (valArr.length === 4) return value
  if (valArr.length === 1) return Array(4).fill(valArr[0]).join(' ')
  if (valArr.length === 2) return [valArr[0], valArr[1], valArr[0], valArr[1]].join(' ')
  if (valArr.length === 3) return [valArr[0], valArr[1], valArr[2], valArr[1]].join(' ')
  return value
}

export const checkValidEmail = email => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true
  }
  return false
}
export const makeFieldsArrByLabel = (fields, labels) => {
  const fldArrByLabel = Object.entries(fields).filter(fld => fld[1].typ !== 'button').map(([fldKey, fld]) => {
    const fldByLabel = labels.find(lbl => lbl.key === fldKey)
    return {
      ...fld,
      key: fldKey,
      type: fld.typ,
      name: fldByLabel?.adminLbl
        || fldByLabel?.name
        || fld.lbl
        || fld.adminLbl
        || fld.txt // for submit button
        || fldKey,
    }
  })

  return sortArrOfObj(fldArrByLabel, 'name')
}

export const getFileExts = filename => filename.split('.').pop()

export const csvToJson = (string, delimiter = ',') => {
  const regex = new RegExp(`\\s*(")?(.*?)\\1\\s*(?:${delimiter}|$)`, 'gs')
  const match = str => [...str.matchAll(regex)].map(matc => matc[2])
    .filter((_, i, a) => i < a.length - 1)

  const lines = string.split('\n')
  const heads = match(lines.splice(0, 1)[0])

  return lines.map(line => match(line).reduce((acc, cur, i) => ({
    ...acc,
    [heads[i] || `extra_${i}`]: ((cur.length > 0) ? (Number(cur) || cur) : '').trim(),
  }), {}))
}

export const isType = (type, val) => !!(val?.constructor && val.constructor.name.toLowerCase() === type.toLowerCase())

export const getFormsFromPhpVariable = () => {
  let allForms = []
  if (!Object.prototype.hasOwnProperty.call(process.env, 'PUBLIC_URL')
    && typeof bits !== 'undefined'
    //  eslint-disable-next-line no-undef
    && bits.allForms !== null) {
    //  eslint-disable-next-line no-undef
    allForms = bits?.allForms?.map(form => (
      { formID: form.id, status: form.status !== '0', formName: form.form_name, shortcode: `bitform id='${form.id}'`, entries: form.entries, views: form.views, created_at: form.created_at }))
  }
  return allForms
}
export const getNewFormId = (allForms) => {
  let max = 0
  allForms.map(frm => {
    const fid = Number(frm.formID)
    if (fid > max) {
      max = fid
    }
  })
  return max + 1
}

export const sortByField = (array, fieldKey, typ) => array.sort((a, b) => {
  const x = a[fieldKey]
  const y = b[fieldKey]
  if (typ === 'ASC') {
    return ((x < y) ? -1 : ((x > y) ? 1 : 0))
  }
  return ((y < x) ? -1 : ((y > x) ? 1 : 0))
})

export const renderHTMR = str => {
  try {
    return (
      <>
        {htmr(str)}
      </>
    )
  } catch (_) {
    return str
  }
}

export const getElmDataBasedOnElement = (element) => {
  let elementKey = element
  let classKey = element
  switch (element) {
    case 'field-container':
      elementKey = 'fld-wrp'
      break
    case 'label-subtitle-container':
      elementKey = 'lbl-wrp'
      break
    case 'subtitle':
      elementKey = 'sub-titl'
      break
    case 'label':
      elementKey = 'lbl'
      classKey = 'lbl'
      break
    case 'helper-text':
      elementKey = 'hlp-txt'
      break
    case 'error-message':
      classKey = 'err-msg'
      elementKey = 'err-msg'
      break
    case 'image':
      classKey = 'img'
      elementKey = 'img'
      break
    case 'check-wrapper':
      classKey = 'cw'
      elementKey = 'cw'
      break
    case 'option-wrapper':
      classKey = 'cl'
      elementKey = 'cl'
      break
    case 'check-container':
      classKey = 'cc'
      elementKey = 'cc'
      break
    case 'option-label':
      classKey = 'ct'
      elementKey = 'ct'
      break
    case 'check-box':
      classKey = 'ck'
      elementKey = 'ck'
      break
    case 'radio-box':
      classKey = 'rdo'
      elementKey = 'rdo'
      break
    case 'currency-fld-wrp':
      classKey = 'currency-fld-wrp'
      elementKey = 'currency-fld-wrp'
      break
    case 'selected-currency-img':
      classKey = 'selected-currency-img'
      elementKey = 'selected-currency-img'
      break
    case 'input-clear-btn':
      classKey = 'input-clear-btn'
      elementKey = 'input-clear-btn'
      break
    case 'opt-search-input':
      classKey = 'opt-search-input'
      elementKey = 'opt-search-input'
      break
    case 'search-clear-btn':
      classKey = 'search-clear-btn'
      elementKey = 'search-clear-btn'
      break
    case 'currency-option':
      classKey = 'option'
      elementKey = 'option'
      break
    case 'currency-option-icn':
      classKey = 'opt-icn'
      elementKey = 'opt-icn'
      break
    case 'currency-option-lbl':
      classKey = 'opt-lbl'
      elementKey = 'opt-lbl'
      break
    case 'currency-option-suf':
      classKey = 'opt-suffix'
      elementKey = 'opt-suffix'
      break
    case 'selected-country-clear-btn':
      classKey = 'inp-clr-btn'
      elementKey = 'inp-clr-btn'
      break
    case 'phone-fld-wrp':
      classKey = 'phone-fld-wrp'
      elementKey = 'phone-fld-wrp'
      break
    case 'phone-option':
      classKey = 'option'
      elementKey = 'option'
      break
    case 'phone-option-icn':
      classKey = 'opt-icn'
      elementKey = 'opt-icn'
      break
    case 'phone-option-lbl':
      classKey = 'opt-lbl'
      elementKey = 'opt-lbl'
      break
    case 'phone-option-prefix':
      classKey = 'opt-prefix'
      elementKey = 'opt-prefix'
      break
    case 'selected-country-img':
      classKey = 'selected-country-img'
      elementKey = 'selected-country-img'
      break
    default:
      elementKey = element
      classKey = element
  }

  return { elementKey, classKey }
}

export const getIconsGlobalFilterVariable = (iconType) => {
  let variableName = ''
  switch (iconType) {
    case 'lblPreIcn':
      variableName = '--lbl-pre-i-fltr'
      break
    case 'lblSufIcn':
      variableName = '--lbl-suf-i-fltr'
      break
    case 'subTlePreIcn':
      variableName = '--sub-titl-pre-i-fltr'
      break
    case 'subTleSufIcn':
      variableName = '--sub-titl-suf-i-fltr'
      break
    case 'prefixIcn':
      variableName = '--pre-i-fltr'
      break
    case 'suffixIcn':
      variableName = '--suf-i-fltr'
      break
    case 'hlpPreIcn':
      variableName = '--hlp-txt-pre-i-fltr'
      break
    case 'hlpSufIcn':
      variableName = '--hlp-txt-suf-i-fltr'
      break
    case 'btnPreIcn':
      variableName = '--lbl-pre-i-fltr'
      break
    case 'btnSufIcn':
      variableName = '--lbl-pre-i-fltr'
      break
    case 'errPreIcn':
      variableName = '--err-txt-pre-i-fltr'
      break
    case 'errSufIcn':
      variableName = '--err-txt-suf-i-fltr'
      break
    case 'titlePreIcn':
      variableName = '--lbl-pre-i-fltr'
      break
    case 'titleSufIcn':
      variableName = '--lbl-pre-i-fltr'
      break
    default:
      variableName = ''
  }
  return variableName
}

export const getIconsParentElement = (iconType) => {
  let parentElement = ''
  switch (iconType) {
    case 'lblPreIcn':
    case 'lblSufIcn':
      parentElement = 'lbl'
      break
    case 'subTlePreIcn':
    case 'subTleSufIcn':
      parentElement = 'sub-titl'
      break
    case 'hlpPreIcn':
    case 'hlpSufIcn':
      parentElement = 'hlp-txt'
      break
    case 'btnPreIcn':
    case 'btnSufIcn':
      parentElement = 'btn'
      break
    case 'errPreIcn':
    case 'errSufIcn':
      parentElement = 'err-msg'
      break
    case 'titlePreIcn':
    case 'titleSufIcn':
      parentElement = 'title'
      break
    case 'subTitlPreIcn':
    case 'subTitlSufIcn':
      parentElement = 'sub-titl'
      break
    default:
      parentElement = 'fld'
  }
  return parentElement
}

/**
 * First letter uppercase
 * @function ucFirst
 * @param {String} str
 * @returns String
 */
export const ucFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const divide = (dividend, divisor) => {
  let returnValue = ''
  let remainder = 0
  let currentDividend = 0
  let currentQuotient

  dividend.split('').forEach((digit, index) => {
    // use classical digit by digit division
    if (currentDividend !== 0) {
      currentDividend *= 10
    }
    currentDividend += Number(digit)

    if (currentDividend >= divisor) {
      currentQuotient = Math.floor(currentDividend / divisor)
      currentDividend -= currentQuotient * divisor
      returnValue += currentQuotient.toString()
    } else if (returnValue.length > 0) {
      returnValue += '0'
    }

    if (index === dividend.length - 1) {
      remainder = currentDividend
    }
  })

  return {
    quotient: returnValue.length === 0 ? '0' : returnValue,
    remainder,
  }
}

export const number2Ipv6 = ipNumber => {
  const base = 16
  const blocks = []
  const blockSize = 2 ** 16

  while (blocks.length < 8) {
    const divisionResult = divide(ipNumber, blockSize)

    blocks.unshift(divisionResult.remainder.toString(base))

    ipNumber = divisionResult.quotient
  }

  return blocks.join(':')
}
