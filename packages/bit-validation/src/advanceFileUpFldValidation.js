const advanceFileUpFldValidation = (fldInstance, fldData) => (fldData.valid.req && !fldInstance.files?.length ? 'req' : '')
export default advanceFileUpFldValidation
