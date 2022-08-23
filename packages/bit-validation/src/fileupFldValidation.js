const fileupFldValidation = (fldValue, fldData) => ((fldData.valid.req && !Array.isArray(fldValue) && !fldValue.name) ? 'req' : '')
export default fileupFldValidation
