export default function objectToCssText(obj) {
  let cssText = ''
  const selectors = Object.keys(obj)
  const selectorsCount = selectors.length
  if (!selectorsCount) return ''

  for (let i = 0; i < selectorsCount; i += 1) {
    const selector = selectors[i]
    if (!Object.prototype.hasOwnProperty.call(obj, selector)) continue
    cssText += selector
    cssText += '{'
    const definations = obj[selector]
    cssText += generatePropertyRules(definations)
    cssText += '}'
  }

  cssText = cssText
    .replace(/::after/gm, ':after')
    .replace(/::before/gm, ':before')
    .replace(/(?:\s|:|,)0+(px|r?em|%|pt|pc|ch|vw|vh)/gm, match => (match[0] !== '0' ? `${match[0]}0` : '0'))
    .replace(/(?:\s+|:|,)0+\./gm, match => (match[0] !== '0' ? `${match[0]}.` : '.'))
    .replace(/\s*border\s*:\s*medium\s*none/gm, 'border:none')

  return cssText
}

const generatePropertyRules = (definations) => {
  let cssText = ''
  let len = Object.entries(definations).length
  const props = Object.keys(definations)
  const propsCount = props.length
  for (let j = 0; j < propsCount; j += 1) {
    const prop = props[j]
    if (!Object.prototype.hasOwnProperty.call(definations, prop)) continue
    const value = definations[prop]
    const valueIsObject = typeof value === 'object' && value !== null
    cssText += prop
    if (!valueIsObject) cssText += ':'
    if (valueIsObject) {
      cssText += `{${generatePropertyRules(value)}}`
    } else cssText += value
    // eslint-disable-next-line no-plusplus
    if (--len !== 0 && !valueIsObject) {
      cssText += ';'
    }
  }

  return cssText
}
