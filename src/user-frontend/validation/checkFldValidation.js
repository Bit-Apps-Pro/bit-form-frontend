const checkFldValidation = (fldValue, fldData) => (fldData?.opt?.find(opt => opt.req && !((fldValue || []).includes(opt.lbl))) ? 'req' : '')
