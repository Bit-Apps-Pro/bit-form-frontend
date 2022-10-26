document.addEventListener('DOMContentLoaded', () => {
  focusOutValidationEvents()
})

const focusOutValidationEvents = () => {
  const allContentids = window?.bf_globals
  allContentids
    && Object.keys(allContentids).forEach((contentId) => {
      const props = window.bf_globals[contentId]
      addEventToFields(contentId, props)
    })
}

const addEventToFields = props => {
  Object.values(props.fields).forEach(fldData => {
    const fldName = fldData.typ === 'check' ? `${fldData.fieldName}[]` : fldData.fieldName
    document.getElementById('form-{$FormIdentifier}').querySelectorAll(`[name = '${fldName}']`).forEach(elm => {
      elm.addEventListener('blur', e => typeof validateForm !== 'undefined' && validateForm({ input: e.target }))
    })
  })
}
