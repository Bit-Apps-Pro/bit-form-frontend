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
  for (const fld in flds) {
    if (fld !== null && fld !== undefined) {
      num = Number(fld.match(/-[0-9]+/g)?.[0]?.match(/[0-9]+/g))
      if (typeof num === 'number' && num > largestNumberFld) {
        largestNumberFld = num
      }
    }
  }
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

export const sortArrOfObj = (data, sortLabel) => data.sort((a, b) => {
  if (a[sortLabel].toLowerCase() < b[sortLabel].toLowerCase()) return -1
  if (a[sortLabel].toLowerCase() > b[sortLabel].toLowerCase()) return 1
  return 0
})

export const dateTimeFormatter = (oldDate, format) => {
  const newDate = new Date(oldDate);

  if (newDate.toString() === 'Invalid Date') {
    return 'Invalid Date'
  }

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thusday',
    'Friday',
    'Saturday',
  ]
  const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const monthsShort = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const l = days[newDate.getDay()]
  const D = daysShort[newDate.getDay()]
  const date = newDate.getDate()
  const j = date
  const d = (date < 10 ? '0' : '') + date
  let S = date
  if (date % 10 === 1 && date !== 11) {
    S += 'st'
  } else if (date % 10 === 2 && date !== 12) {
    S += 'nd'
  } else if (date % 10 === 3 && date !== 13) {
    S += 'rd'
  } else {
    S += 'th'
  }
  const month = newDate.getMonth()
  const F = months[month]
  const M = monthsShort[month]
  const m = (month < 10 ? '0' : '') + (month + 1)
  const n = month + 1
  const fullYear = newDate.getFullYear()
  const Y = fullYear
  const y = fullYear.toString().substr(-2)
  const hour = newDate.getHours()
  const g = hour % 12
  const G = hour
  const a = hour >= 12 ? 'pm' : 'am'
  const A = hour >= 12 ? 'PM' : 'AM'
  const h = ((hour % 12 || 12) < 10 ? '0' : '') + (hour % 12 || 12)
  const H = (hour < 10 ? '0' : '') + hour
  const minute = newDate.getMinutes()
  const i = (minute < 10 ? '0' : '') + minute
  const second = newDate.getSeconds()
  const s = (second < 10 ? '0' : '') + second
  const T = newDate.toLocaleTimeString(navigator.language, { timeZoneName: 'short' }).split(' ')[2]
  const c = newDate.toISOString()
  const r = newDate.toUTCString()
  const U = newDate.valueOf()
  let formattedDate = ''
  const allFormatObj = { a, A, c, d, D, F, g, G, h, H, i, j, l, m, M, n, r, s, S, T, U, y, Y }

  const keys = Object.keys(allFormatObj)

  for (let v = 0; v < format.length; v += 1) {
    const latter = keys.find((key) => key === format[v])

    if (format[v] === '\\') {
      v += 1;
      formattedDate += format[v];
    } else if (latter) {
      formattedDate += format[v].replace(latter, allFormatObj[latter]);
    } else {
      formattedDate += format[v];
    }
  }

  return formattedDate;
}

const cipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  const byteHex = n => (`0${Number(n).toString(16)}`).substr(-2);
  // eslint-disable-next-line no-bitwise
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);

  return text => text
    .split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
};

const decipher = salt => {
  const textToChars = text => text.split('').map(c => c.charCodeAt(0));
  // eslint-disable-next-line no-bitwise
  const applySaltToChar = code => textToChars(salt).reduce((a, b) => (a ^ b), code);
  return encoded => encoded
    .match(/.{1,2}/g)
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
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
