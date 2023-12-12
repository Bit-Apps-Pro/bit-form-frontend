export default function resetPlaceholders(props) {
  const { fields, contentId } = props
  const form = bfSelect(`#form-${contentId}`)
  Object.keys(fields).forEach(fk => {
    const field = fields[fk]
    const { typ, ph, phHide } = field
    if (!ph && !phHide) return
    if (typ === 'select') {
      const elm = bfSelect(`.${fk}-selected-opt-lbl`, form)
      if (elm) elm.textContent = ph
    } else if (typ === 'html-select') {
      const elm = bfSelect(`.${fk}-slct-optn:first-child`, form)
      if (elm) elm.textContent = ph
    } else if (typ === 'currency') {
      const elm = bfSelect(`.${fk}-currency-amount-input`, form)
      if (elm) elm.placeholder = ph
    } else if (typ === 'phone-number') {
      const elm = bfSelect(`.${fk}-phone-number-input`, form)
      if (elm) elm.placeholder = ph
    } else {
      const elm = bfSelect(`.${fk}-fld`, form)
      if (elm) elm.placeholder = ph
    }
  })
}
