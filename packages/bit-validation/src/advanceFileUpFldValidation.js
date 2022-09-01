const advanceFileUpFldValidation = (fldInstance, fldData) => (fldData.valid.req && !(fldInstance.files?.length > 0) ? 'req' : '')
export default advanceFileUpFldValidation
