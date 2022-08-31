const checkFldValidation = (fldValue, fldData) => (fldData?.opt?.find(opt => opt.req && !((fldValue || []).includes(opt.val || opt.lbl))) ? 'req' : '')
export default checkFldValidation
