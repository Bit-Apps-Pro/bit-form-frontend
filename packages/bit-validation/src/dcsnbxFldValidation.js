const dcsnbxFldValidation = (fldValue, fldData) => ((fldData.valid.req && (fldValue !== fldData.msg.checked)) ? 'req' : '')
export default dcsnbxFldValidation
