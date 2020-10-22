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

export const sortArrOfObj = (data, sortLabel) => data.sort((a, b) => ((a[sortLabel] < b[sortLabel]) ? -1 : ((a[sortLabel] > b[sortLabel]) ? 1 : 0)))

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
}