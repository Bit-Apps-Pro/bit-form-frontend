const fileupFldValidation = (fldValue, fldData) => {
  if (fldData.config?.minFile && !(fldValue?.length >= fldData.config?.minFile || fldData.config?.minFile === 1)) return 'minFile'
  return (fldData.valid.req && !Array.isArray(fldValue) && !fldValue.name) ? 'req' : ''
}
export default fileupFldValidation
