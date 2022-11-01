const allContentids = window?.bf_globals
if (allContentids) {
  Object.keys(allContentids).forEach((contentId) => {
    const props = window.bf_globals[contentId]
    const form = document.getElementById(`form-${contentId}`)
    Object.values(props.fields).forEach(fldData => {
      const fldName = fldData.typ === 'check' ? `${fldData.fieldName}[]` : fldData.fieldName
      const onaction = ['check', 'radio'].includes(fldData.typ) ? 'input' : 'blur'
      form.querySelectorAll(`[name = '${fldName}']`).forEach(elm => {
        elm.addEventListener(onaction, e => typeof validateForm !== 'undefined' && validateForm({ input: e.target }))
      })
    })
  })
}
