export default function urlFldValidation(fldValue, fldData) {
  if (fldData.err.invalid.show) {
    return (!new RegExp(generateBackslashPattern(fldData.attr.pattern)).test(fldValue) ? 'invalid' : '')
  }
  return ''
}
