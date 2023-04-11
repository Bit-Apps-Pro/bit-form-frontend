const phoneNumberFldValidation = (fldInstance, fldData) => {
  const isValid = fldInstance.isValidated()
  if (isValid === 'invalid') return 'invalid'
  if (isValid === 'required' && fldData?.valid?.req) return 'req'
  return ''
}
export default phoneNumberFldValidation
