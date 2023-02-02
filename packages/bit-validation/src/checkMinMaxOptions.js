export default function checkMinMaxOptions(fldValue, fldData, separator = ',') {
  const val = Array.isArray(fldValue) ? fldValue : (fldValue || '').split(separator)
  const mn = Number(fldData.mn) || 0
  let mx = Number(fldData.mx)
  if (fldData.typ === 'check' && !mx) mx = fldData.opt.length
  else if (fldData.typ === 'select' && !mx) mx = val.length
  if (val.length < mn) return 'mn'
  if (val.length > mx) return 'mx'
  return fldData.typ === 'check' ? checkFldValidation(fldValue, fldData) : ''
}
