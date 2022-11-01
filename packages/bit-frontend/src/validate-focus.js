const allContentids = window?.bf_globals
allContentids
  && Object.keys(allContentids).forEach((contentId) => {
    const props = window.bf_globals[contentId]
    addEventToFields(contentId, props)
  })

const addEventToFields = (contentId, props) => {
  const form = document.getElementById(`form-${contentId}`)
  Object.values(props.fields).forEach(fldData => {
    const fldName = fldData.typ === 'check' ? `${fldData.fieldName}[]` : fldData.fieldName
    const onaction = ['check', 'radio'].includes(fldData.typ) ? 'input' : 'blur'
    form.querySelectorAll(`[name = '${fldName}']`).forEach(elm => {
      elm.addEventListener(onaction, e => typeof validateForm !== 'undefined' && validateForm({ input: e.target }))
    })
  })
}
