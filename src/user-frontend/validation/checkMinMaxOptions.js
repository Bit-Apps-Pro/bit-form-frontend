const checkMinMaxOptions = (fldValue, fldData) => {
  const val = Array.isArray(fldValue) ? fldValue : (fldValue || '').split(',')
  const mn = Number(fldData.mn) || 0
  const mx = Number(fldData.mx) || fldData.opt.length
  if (val.length < mn) return 'mn'
  if (val.length > mx) return 'mx'
  return fldData.typ === 'check' ? checkFldValidation(fldValue, fldData) : ''
}
