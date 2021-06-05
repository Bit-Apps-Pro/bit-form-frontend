/* eslint-disable no-continue */
/* eslint-disable no-undef */
export default function validateForm({ form, input }) {
  if (typeof bitFormsFront === 'undefined') return false
  if (input && !bitFormsFront.validateFocusLost) return true
  let { fields } = bitFormsFront
  let formEntries = {}
  if (form) formEntries = generateFormEntries(form)
  else if (input) {
    const name = generateFieldKey(input.name)
    formEntries[name] = input.value
    fields = { [name]: fields[name] }
  }

  console.log('entry', formEntries, fields)

  let formCanBeSumbitted = true
  const flds = Object.entries(fields)
  let { length } = flds
  // eslint-disable-next-line no-plusplus
  while (length--) {
    const [fldKey] = flds[length]
    const fldData = fields[fldKey]
    const fldType = fldData.typ
    const fldValue = typeof formEntries[fldKey] === 'string' ? formEntries[fldKey].trim() : formEntries[fldKey]

    console.log('flddata', fldKey, fldValue, fldData)

    let errKey = ''

    if (!fldValue) {
      if (fldData?.valid?.req) {
        errKey = 'req'
        generateErrMsg(errKey, fldKey, fldData)
        formCanBeSumbitted = false
      }
      continue
    }

    if (fldType.match(/^(text|url|textarea|password|number|email)$/) && fldData.valid.regexr) {
      errKey = regexPatternValidation(fldValue, fldData)
      if (errKey) {
        generateErrMsg(errKey, fldKey, fldData)
        formCanBeSumbitted = false
        continue
      }
    }

    if (fldType === 'number') errKey = nmbrFldValidation(fldValue, fldData)
    else if (fldType === 'email') errKey = emailFldValidation(fldValue, fldData)
    else if (fldType === 'url') errKey = urlFldValidation(fldValue, fldData)
    else if (fldType === 'decision-box') errKey = dcsnbxFldValidation(fldValue, fldData)
    else if (fldType === 'check') errKey = checkFldValidation(fldValue, fldData)
    else if (fldType === 'file-up') errKey = fileupFldValidation(fldValue, fldData)

    generateErrMsg(errKey, fldKey, fldData)
    if (errKey) formCanBeSumbitted = false
  }
  return formCanBeSumbitted
}

const generateFieldKey = fldKey => (fldKey.slice(-2) === '[]' ? fldKey.slice(0, fldKey.length - 2) : fldKey)

const generateFormEntries = form => {
  const formData = new FormData(form)
  const { fields } = bitFormsFront
  const formEntries = {}
  for (const [key, value] of formData.entries()) {
    const fldKey = generateFieldKey(key)
    if (!(fldKey in fields)) continue
    if (formEntries[fldKey]) {
      if (!Array.isArray(formEntries[fldKey])) {
        formEntries[fldKey] = [formEntries[fldKey]]
      }
      formEntries[fldKey].push(value)
    } else formEntries[fldKey] = value
  }

  return formEntries
}

const generateErrMsg = (errKey, fldKey, fldData) => {
  const errFld = document.getElementById(`${fldKey}-error`)
  if (errFld) {
    if (errKey && fldData.err[errKey].show) {
      errFld.innerHTML = fldData.err[errKey].custom ? fldData.err[errKey].msg : fldData.err[errKey].dflt
      errFld.parentElement.style.height = `${errFld.offsetHeight}px`
    } else {
      errFld.parentElement.style.height = 0
    }
  }
}

const generateBackslashPattern = str => str.replaceAll('$_bf_$', '\\')

// eslint-disable-next-line no-nested-ternary
const nmbrFldValidation = (fldValue, fldData) => ((fldData.mn && (Number(fldValue) < Number(fldData.mn))) ? 'mn' : (fldData.mx && (Number(fldValue) > Number(fldData.mx))) ? 'mx' : '')

const emailFldValidation = (fldValue, fldData) => (!new RegExp(generateBackslashPattern(fldData.pattern)).test(fldValue) ? 'invalid' : '')

const urlFldValidation = (fldValue, fldData) => (!new RegExp(generateBackslashPattern(fldData.attr.pattern)).test(fldValue) ? 'invalid' : '')

const dcsnbxFldValidation = (fldValue, fldData) => ((fldData.valid.req && (fldValue !== fldData.msg.checked)) ? 'req' : '')

const checkFldValidation = (fldValue, fldData) => (fldData.opt.filter(opt => opt.req && !(fldValue || []).includes(opt.lbl)).length ? 'req' : '')

const fileupFldValidation = (fldValue, fldData) => ((fldData.valid.req && !Array.isArray(fldValue) && !fldValue.name) ? 'req' : '')

const regexPatternValidation = (fldValue, fldData) => (!new RegExp(generateBackslashPattern(fldData.valid.regexr), fldData.valid.flags || '').test(fldValue) ? 'regexr' : '')
