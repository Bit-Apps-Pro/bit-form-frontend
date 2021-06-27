/* eslint-disable no-continue */
let contentId
let fields
export default function validateForm({ form, input }) {
  if (form) contentId = form
  else if (input?.form?.id) [, contentId] = input.form.id.split('form-')
  if (typeof window[contentId] === 'undefined') return false
  let formEntries = {}
  fields = window[contentId].fields
  if (form) {
    formEntries = generateFormEntries()
  } else if (input) {
    if (!window[contentId].validateFocusLost) return true
    const name = generateFieldKey(input.name)
    formEntries = { [name]: input.value }
    fields = { [name]: fields[name] }
  }

  console.log('entry', formEntries, fields)

  let formCanBeSumbitted = true
  const flds = Object.entries(fields)
  let { length } = flds
  // eslint-disable-next-line no-plusplus
  while (length--) {
    const [fldKey, fldData] = flds[length]
    const fldType = fldData.typ
    const fldValue = typeof formEntries[fldKey] === 'string' ? formEntries[fldKey].trim() : formEntries[fldKey]

    console.log('flddata', fldKey, fldValue, fldData)

    const fldDiv = document.querySelector(`#form-${contentId} .${fldKey}`)
    if (window.getComputedStyle(fldDiv).display === 'none') continue

    let errKey = ''

    if (!fldValue) {
      if (fldType === 'check') errKey = checkFldValidation(fldValue, fldData)
      if (fldData?.valid?.req) errKey = 'req'
      generateErrMsg(errKey, fldKey, fldData)
      if (errKey) formCanBeSumbitted = false
      continue
    }

    if (fldData?.valid?.regexr) {
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
    else if (fldType === 'check' || fldType === 'select') errKey = checkMinMaxOptions(fldValue, fldData)
    else if (fldType === 'file-up') errKey = fileupFldValidation(fldValue, fldData)

    generateErrMsg(errKey, fldKey, fldData)
    if (errKey) formCanBeSumbitted = false
  }
  return formCanBeSumbitted
}

const generateFieldKey = fldKey => (fldKey.slice(-2) === '[]' ? fldKey.slice(0, fldKey.length - 2) : fldKey)

const generateFormEntries = () => {
  const formData = new FormData(document.getElementById(`form-${contentId}`))
  const formEntries = {}
  for (const [key, value] of formData.entries()) {
    const fldKey = generateFieldKey(key)
    if (!(fldKey in fields)) continue
    if (formEntries[fldKey]) {
      if (!Array.isArray(formEntries[fldKey])) formEntries[fldKey] = [formEntries[fldKey]]
      formEntries[fldKey].push(value)
    } else formEntries[fldKey] = value
  }

  return formEntries
}

const generateErrMsg = (errKey, fldKey, fldData) => {
  const errFld = document.querySelector(`#form-${contentId} #${fldKey}-error`)
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

const checkMinMaxOptions = (fldValue, fldData) => {
  const val = Array.isArray(fldValue) ? fldValue : (fldValue || '').split(',')
  const mn = Number(fldData.mn) || 0
  const mx = Number(fldData.mx) || fldData.opt.length
  if (val.length < mn) return 'mn'
  if (val.length > mx) return 'mx'
  return fldData.typ === 'check' ? checkFldValidation(fldValue, fldData) : ''
}
