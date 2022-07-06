const nmbrFldValidation = (fldValue, fldData) => ((fldData.mn && (Number(fldValue) < Number(fldData.mn))) ? 'mn' : (fldData.mx && (Number(fldValue) > Number(fldData.mx))) ? 'mx' : '')
