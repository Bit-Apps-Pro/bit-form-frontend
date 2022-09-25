/* eslint-disable no-continue */
let contentId
let fields
let fieldKeysByName = {}
export default function validateForm({ form, input }) {
  if (form) contentId = form
  else if (input?.form?.id) [, contentId] = input.form.id.split('form-')
  if (typeof window?.bf_globals?.[contentId] === 'undefined') return false
  let formEntries = {}
  fields = window?.bf_globals?.[contentId].fields
  if (form) {
    formEntries = generateFormEntries()
  } else if (input) {
    if (!window?.bf_globals?.[contentId].validateFocusLost) return true
    const fldKey = generateFieldKey(input.name)
    formEntries = { [fldKey]: input.value }
    fields = { [fldKey]: fields[fldKey] }
  }

  let formCanBeSubmitted = true
  const flds = Object.entries(fields)
  let { length } = flds
  // eslint-disable-next-line no-plusplus
  while (length--) {
    const [fldKey, fldData] = flds[length]
    const fldType = fldData.typ
    const fldValue = typeof formEntries[fldKey] === 'string' ? formEntries[fldKey].trim() : formEntries[fldKey]

    const fldDiv = document.querySelector(`#form-${contentId} .${fldKey}`)
    if (window.getComputedStyle(fldDiv).display === 'none') {
      generateErrMsg('', fldKey)
      continue
    }

    let errKey = ''
    if (fldType === 'check' && fldValue) {
      errKey = typeof checkFldValidation !== 'undefined' ? checkFldValidation(fldValue, fldData) : ''
    }
    if (!fldValue) {
      errKey = typeof requiredFldValidation !== 'undefined' ? requiredFldValidation(fldData) : null
      generateErrMsg(errKey, fldKey, fldData)
      if (errKey) formCanBeSubmitted = false
      continue
    }

    if (fldType === 'number' && typeof nmbrFldValidation !== 'undefined') errKey = nmbrFldValidation(fldValue, fldData)
    else if (fldType === 'email' && typeof emailFldValidation !== 'undefined') errKey = emailFldValidation(fldValue, fldData)
    else if (fldType === 'url' && typeof urlFldValidation !== 'undefined') errKey = urlFldValidation(fldValue, fldData)
    else if (fldType === 'decision-box' && typeof dcsnbxFldValidation !== 'undefined') errKey = dcsnbxFldValidation(fldValue, fldData)
    else if ((fldType === 'check' || fldType === 'select') && typeof checkMinMaxOptions !== 'undefined') errKey = checkMinMaxOptions(fldValue, fldData)
    else if (fldType === 'file-up' && typeof fileupFldValidation !== 'undefined') errKey = fileupFldValidation(fldValue, fldData)
    else if (fldType === 'advanced-file-up' && typeof advanceFileUpFldValidation !== 'undefined') errKey = advanceFileUpFldValidation(getFieldInstance(fldKey), fldData)
    if ((fldType === 'check' || fldType === 'radio') && typeof customOptionValidation !== 'undefined') customOptionValidation(fldValue, fldData)
    if (fldData?.valid?.regexr) {
      errKey = typeof regexPatternValidation !== 'undefined' ? regexPatternValidation(fldValue, fldData) : null
      if (errKey) {
        generateErrMsg(errKey, fldKey, fldData)
        formCanBeSubmitted = false
        continue
      }
    }

    generateErrMsg(errKey, fldKey, fldData)
    if (errKey) formCanBeSubmitted = false
  }
  return formCanBeSubmitted
}

const getFieldInstance = fldKey => window?.bf_globals?.[contentId].inits?.[fldKey]

const generateFieldKey = keyName => {
  const fldKey = document.getElementById(`form-${contentId}`).querySelector(`[name="${keyName}"]`).id
  const fldName = keyName.slice(-2) === '[]' ? keyName.slice(0, keyName.length - 2) : keyName
  if (fldKey !== fldName) {
    if (fieldKeysByName[fldName]) return fieldKeysByName[fldName]
    const fldEntries = Object.entries(fields)
    for (let i = 0; i < fldEntries.length; i += 1) {
      const [key, fldData] = fldEntries[i]
      if (fldData?.fieldName === fldName) {
        fieldKeysByName[fldName] = key
        return key
      }
    }
  }
  return fldKey
}

const generateFormEntries = () => {
  const formData = new FormData(document.getElementById(`form-${contentId}`))
  const formEntries = {}
  const entries = Array.from(formData.entries())
  fieldKeysByName = {}
  entries.forEach(([key, value]) => {
    const fldKey = generateFieldKey(key)
    if (!(fldKey in fields)) return
    if (formEntries[fldKey]) {
      if (!Array.isArray(formEntries[fldKey])) formEntries[fldKey] = [formEntries[fldKey]]
      formEntries[fldKey].push(value)
    } else formEntries[fldKey] = value
  })

  return formEntries
}

const generateErrMsg = (errKey, fldKey, fldData) => {
  const errFld = document.querySelector(`#form-${contentId} .${fldKey}-err-txt`)
  if (errFld && 'err' in (fldData || {})) {
    if (errKey && fldData?.err?.[errKey]?.show) {
      errFld.innerHTML = fldData.err[errKey].custom ? fldData.err[errKey].msg : fldData.err[errKey].dflt
      errFld.parentElement.style.marginTop = '9px'
      errFld.parentElement.style.height = 'auto'
      errFld.parentElement.style.removeProperty('display')
      scrollToFld(fldKey)
    } else {
      errFld.innerHTML = ''
      errFld.parentElement.style.marginTop = 0
      errFld.parentElement.style.height = 0
      errFld.parentElement.style.display = 'none'
    }
  }
}

const scrollToFld = fldKey => {
  const fld = document.querySelector(`#form-${contentId} .btcd-fld-itm.${fldKey}`)
  const bodyRect = document.body.getBoundingClientRect()
  const fldRect = fld.getBoundingClientRect()
  const offsetTop = fldRect.top - bodyRect.top
  if (!isElementInViewport(fld)) window.scroll({ top: offsetTop, behavior: 'smooth' })
}

const isElementInViewport = elm => {
  const rect = elm.getBoundingClientRect()

  return (
    rect.top >= 0
    && rect.left >= 0
    && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
