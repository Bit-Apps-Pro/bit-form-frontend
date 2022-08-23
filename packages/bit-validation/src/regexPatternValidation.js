const regexPatternValidation = (fldValue, fldData) => (!new RegExp(generateBackslashPattern(fldData.valid.regexr), fldData.valid.flags || '').test(fldValue) ? 'regexr' : '')
export default regexPatternValidation
