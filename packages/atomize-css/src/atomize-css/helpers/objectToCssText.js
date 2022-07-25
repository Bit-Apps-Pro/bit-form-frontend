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
    let len = Object.entries(definations).length
    const props = Object.keys(definations)
    const propsCount = props.length
    for (let j = 0; j < propsCount; j += 1) {
      const prop = props[j]
      if (!Object.prototype.hasOwnProperty.call(definations, prop)) continue
      const value = definations[prop]
      cssText += prop
      cssText += ':'
      cssText += value
      // eslint-disable-next-line no-plusplus
      if (--len !== 0) {
        cssText += ';'
      }
    }
    cssText += '}'
  }

  cssText = cssText
    .replace(/::after/gm, ':after')
    .replace(/::before/gm, ':before')
    .replace(/(?<=\s|:|,)0+(px|r?em|%|pt|pc|ch|vw|vh)/gm, '0')
    .replace(/(?<=\s+|:|,)0+\./gm, '.')
    .replace(/\s*border\s*:\s*medium\s*none/gm, 'border:none')

  return cssText
}
