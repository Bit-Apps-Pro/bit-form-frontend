function getNewPattern(idx, str) {
  const newChar = String.fromCharCode(str.charCodeAt(idx) + 1)
  const strPrefix = str.substring(0, idx)
  const strSuffix = Array(str.substring(idx + 1, str.length).length)
    .fill('a')
    .join('')
  return strPrefix + newChar + strSuffix
}

export default function* generateCssClassName() {
  let x = 'a'
  let i = 0

  while (true) {
    const charCode = String.fromCharCode(97 + i)
    x = x.substring(0, x.length - 1) + charCode
    yield x

    i += 1
    if (i === 26) {
      i = 0

      if (x.length > 1) {
        for (let k = 0; k < x.length; k += 1) {
          if (x[k] < 'z') {
            x = getNewPattern(k, x)
            break
          }
        }
      }

      if (x.split('').every((itm) => itm === 'z')) {
        x = Array(x.length + 1)
          .fill('a')
          .join('')
      }
    }
  }
}
