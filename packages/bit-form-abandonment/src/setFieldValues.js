export default function setFieldValues(formContentId) {
  const contentIds = formContentId ? [formContentId] : Object.keys(window?.bf_globals || {})
  contentIds.forEach((contentId) => {
    const props = window.bf_globals[contentId]
    const formData = props?.oldValues || {}
    // form may have text based fields, radio buttons, checkboxes, select dropdowns, custom fields
    const { fields } = props
    const customFields = [
      'select',
      'phone-number',
      'country',
      'currency',
      'file-up',
      'advanced-file-up',
      'repeater',
    ]
    const checkBasedFields = ['radio', 'check', 'decision-box']
    const form = bfSelect(`#form-${contentId}`)
    Object.entries(fields).forEach(([fieldKey, fieldData]) => {
      const fldTyp = fieldData.typ
      let fldName = fieldData.fieldName
      const fldValue = formData[fieldKey]
      if (!fldValue) return
      if (customFields.includes(fldTyp)) {
        // console.log({ props, fieldKey }, props.inits, props.inits[fieldKey])
        // custom fields
        props.inits[fieldKey].value = fldValue
      } else if (checkBasedFields.includes(fldTyp)) {
        // radio buttons, checkboxes, decision boxes
        if (fldTyp === 'check') fldName += '[]'
        const field = form.querySelectorAll(`input[name="${fldName}"]`)
        const fldValues = fldValue?.split(props?.configs?.bf_separator) || []

        field.forEach(f => {
          if (fldValues.includes(f.value)) {
            f.checked = true
            const index = fldValues.indexOf(f.value)
            fldValues.splice(index, 1)
          }
        })
        // set other option value  input[data-oopt]: check input[data-bf-other-inp]: text
        if (fldValues.length) {
          const otherOpt = form.querySelector(`[data-oopt="${fieldKey}"]`)
          if (otherOpt) {
            otherOpt.checked = true
            const otherInp = form.querySelector(`.${fieldKey}-cw input[data-bf-other-inp]`)
            if (otherInp) {
              otherInp.value = fldValues.join(', ')
              otherOpt.value = fldValues.join(', ')
              otherOpt.dispatchEvent(new Event('input'))
            }
          }
        }
      } else if (fldValue) {
        // text based fields
        const field = document.querySelector(`#form-${contentId} [name="${fldName}"]`)
        if (field) {
          field.value = fldValue
        }
      }
    })
  })
}
