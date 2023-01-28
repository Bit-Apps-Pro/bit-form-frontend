document.addEventListener('DOMContentLoaded', () => {
  const allContentids = window.bf_globals
  if (allContentids) {
    Object.keys(allContentids).forEach((contentId) => {
      const props = window.bf_globals[contentId]
      const form = document.getElementById(`form-${contentId}`)
      Object.values(props.fields).forEach(fldData => {
        const fldName = fldData.typ === 'check' ? `${fldData.fieldName}[]` : fldData.fieldName
        const onaction = ['check', 'radio', 'decision-box'].includes(fldData.typ) ? 'input' : 'blur'
        form.querySelectorAll(`[name='${fldName}']`).forEach(elm => {
          if (props.validateFocusLost) {
            elm.addEventListener(onaction, e => validateForm({ input: e.target }))
          }
          if (props.onfieldCondition) {
            elm.addEventListener('input', e => bit_conditionals(e))
            if (fldData.typ === 'button') elm.addEventListener('click', e => bit_conditionals(e))
            observeElm(elm, 'value', (oldValue, newValue) => {
              if (oldValue !== newValue) {
                bit_conditionals({ target: elm })
              }
            })
          }
        })
      })
    })
  }
})
