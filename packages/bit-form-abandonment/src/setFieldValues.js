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
    ]
    const checkBasedFields = ['radio', 'checkbox', 'decision-box']
    const form = bfSelect(`#form-${contentId}`)
    Object.entries(fields).map(([fieldKey, fieldData]) => {
      const fldTyp = fieldData.typ
      const fldName = fieldData.fieldName
      if (customFields.includes(fldTyp)) {
        console.log({ props, fieldKey }, props.inits, props.inits[fieldKey])
        // custom fields
        props.inits[fieldKey].value = formData[fieldKey]
      } else if (checkBasedFields.includes(fldTyp)) {
        // radio buttons, checkboxes, decision boxes
        const field = form.querySelectorAll(`input[name="${fldName}"]`)
        let optFound = false
        field.forEach(f => {
          if (f.value === formData[fieldKey]) {
            f.checked = true
            optFound = true
          }
        })
        // set other option value  input[data-oopt]: check input[data-bf-other-inp]: text
        if (!optFound && formData[fieldKey]) {
          const otherOpt = form.querySelector(`[data-oopt="${fieldKey}"]`)
          if (otherOpt) {
            otherOpt.checked = true
            const otherInp = form.querySelector(`.${fieldKey}-cw input[data-bf-other-inp]`)
            if (otherInp) {
              otherInp.value = formData[fieldKey]
              otherOpt.value = formData[fieldKey]
              otherOpt.dispatchEvent(new Event('input'))
            }
          }
        }
      } else if (formData[fieldKey]) {
        // text based fields
        const field = document.querySelector(`#form-${contentId} [name="${fldName}"]`)
        if (field) {
          field.value = formData[fieldKey]
        }
      }
    })
  })
}
