/* eslint-disable no-continue */
let contentId
let fields
let fieldKeysByName = {}
let errors = []
export default function validateForm({ form, input }, { step } = {}) {
  if (form) contentId = form
  else if (input?.form?.id) [, contentId] = input.form.id.split('form-')
  const props = window?.bf_globals?.[contentId]
  if (typeof props === 'undefined') return false
  let formEntries = {}
  errors = []
  const bfSeparator = props.configs.bf_separator
  if (step) {
    let layout = props.layout[step - 1]
    if (!layout) return false
    layout = layout?.layout || layout
    const fldKeys = layout.lg.map(l => l.i)
    fields = fldKeys.reduce((acc, key) => ({ ...acc, [key]: props.fields[key] }), {})
  } else {
    fields = props.fields
  }
  const { modifiedFields } = props
  if (modifiedFields) Object.assign(fields, modifiedFields)
  if (form) {
    formEntries = generateFormEntries()
  } else if (input) {
    if (!props.validateFocusLost) return true
    const fldKey = generateFieldKey(input.name)
    formEntries = generateFormEntries()
    fields = { [fldKey]: fields[fldKey] }
  }

  let formCanBeSubmitted = true
  const flds = Object.entries(fields)
  let { length } = flds
  // eslint-disable-next-line no-plusplus
  while (length--) {
    const [fldKey, fldData] = flds[length]
    let indexes = ['']
    if (typeof checkRepeatedField !== 'undefined') {
      const repeatedFieldKey = checkRepeatedField(fldKey, props)
      indexes = getRepeatedIndexes(repeatedFieldKey, props, input)
    }
    for (let i = 0; i < indexes.length; i += 1) {
      const index = indexes[i]
      const fldName = index ? `${fldData.fieldName}[${index}]` : fldData.fieldName
      const selector = index ? `.rpt-index-${index}` : ''
      const fldType = fldData.typ
      const fldValue = typeof formEntries[fldName] === 'string' ? formEntries[fldName].trim() : formEntries[fldName]

      const fldDiv = bfSelect(`#form-${contentId}${selector} .${fldKey}.fld-hide`)
      if (fldDiv) {
        generateErrMsg('', fldKey, fldData, selector)
        continue
      }

      let errKey = ''
      if (fldType === 'check') {
        errKey = typeof checkFldValidation !== 'undefined' ? checkFldValidation(fldValue, fldData) : ''
      }
      if ((fldType === 'check' || fldType === 'radio') && !errKey && typeof customOptionValidation !== 'undefined') errKey = customOptionValidation(contentId, fldKey, fldData)
      if (!fldValue && !errKey) {
        errKey = typeof requiredFldValidation !== 'undefined' ? requiredFldValidation(fldData) : null
      }
      generateErrMsg(errKey, fldKey, fldData, selector)
      if (errKey) {
        formCanBeSubmitted = false
        continue
      }
      if (!fldValue) continue

      if (fldType === 'number' && typeof nmbrFldValidation !== 'undefined') errKey = nmbrFldValidation(fldValue, fldData)
      else if (fldType === 'email' && typeof emailFldValidation !== 'undefined') errKey = emailFldValidation(fldValue, fldData)
      else if (fldType === 'url' && typeof urlFldValidation !== 'undefined') errKey = urlFldValidation(fldValue, fldData)
      else if (fldType === 'decision-box' && typeof dcsnbxFldValidation !== 'undefined') errKey = dcsnbxFldValidation(fldValue, fldData)
      else if ((fldType === 'check' || fldType === 'select') && typeof checkMinMaxOptions !== 'undefined') errKey = checkMinMaxOptions(fldValue, fldData, bfSeparator)
      else if (fldType === 'file-up' && typeof fileupFldValidation !== 'undefined') errKey = fileupFldValidation(fldValue, fldData)
      else if (fldType === 'advanced-file-up' && typeof advanceFileUpFldValidation !== 'undefined') errKey = advanceFileUpFldValidation(getFieldInstance(fldKey), fldData)
      else if (fldType === 'phone-number' && typeof phoneNumberFldValidation !== 'undefined') errKey = phoneNumberFldValidation(getFieldInstance(fldKey), fldData)

      if (fldData?.valid?.regexr && !errKey) errKey = typeof regexPatternValidation !== 'undefined' ? regexPatternValidation(fldValue, fldData) : null

      generateErrMsg(errKey, fldKey, fldData, selector)
      if (errKey) formCanBeSubmitted = false
    }
  }
  if (typeof moveStepToFirstErrFld !== 'undefined') moveStepToFirstErrFld(props, errors)
  return formCanBeSubmitted
}

const getFieldInstance = fldKey => window?.bf_globals?.[contentId].inits?.[fldKey]

const generateFieldKey = keyName => {
  const fldName = keyName.replace(/\[\d*\]/g, '')
  if (fieldKeysByName[fldName]) return fieldKeysByName[fldName]
  const fldEntries = Object.entries(fields)
  for (let i = 0; i < fldEntries.length; i += 1) {
    const [key, fldData] = fldEntries[i]
    if (fldData?.fieldName === fldName) {
      fieldKeysByName[fldName] = key
      return key
    }
  }
  return ''
}

const generateFormEntries = () => {
  const formData = new FormData(bfSelect(`#form-${contentId}`))
  const formEntries = {}
  const entries = Array.from(formData.entries())
  fieldKeysByName = {}
  entries.forEach(([key, value]) => {
    const fldKey = generateFieldKey(key)
    const fldName = key.replace('[]', '')
    if (!(fldKey in fields)) return
    if (formEntries[fldName]) {
      if (!Array.isArray(formEntries[fldName])) formEntries[fldName] = [formEntries[fldName]]
      formEntries[fldName].push(value)
    } else formEntries[fldName] = value
  })

  return formEntries
}

const generateErrMsg = (errKey, fldKey, fldData, selector = '') => {
  const errWrp = bfSelect(`#form-${contentId} ${selector} .${fldKey}-err-wrp`)
  const errTxt = bfSelect(`.${fldKey}-err-txt`, errWrp)
  const errMsg = bfSelect(`.${fldKey}-err-msg`, errWrp)

  if (errTxt && 'err' in (fldData || {})) {
    if (errKey && fldData?.err?.[errKey]?.show) {
      errMsg.style.removeProperty('display')
      errTxt.innerHTML = fldData.err[errKey].custom ? fldData.err[errKey].msg : fldData.err[errKey].dflt
      setTimeout(() => {
        setStyleProperty(errWrp, 'height', `${errTxt.offsetHeight}px`)
        setStyleProperty(errWrp, 'opacity', 1)
      }, 100)
      const fld = bfSelect(`#form-${contentId} ${selector} .btcd-fld-itm.${fldKey}`)
      scrollToFld(fld)
      errors.push(fldKey)
    } else {
      errTxt.innerHTML = ''
      setStyleProperty(errMsg, 'display', 'none')
      setStyleProperty(errWrp, 'height', 0)
      setStyleProperty(errWrp, 'opacity', 0)
    }
  }
}
