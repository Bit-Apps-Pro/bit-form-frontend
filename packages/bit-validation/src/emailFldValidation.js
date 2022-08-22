const emailFldValidation = (fldValue, fldData) => {
  if (fldData.err.invalid.show) {
    return (!new RegExp(generateBackslashPattern(fldData.pattern)).test(fldValue) ? 'invalid' : '')
  }
  return ''
}

export default emailFldValidation
