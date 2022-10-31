export default function setHiddenFld(data, form) {
  let hdnFld = bfSelect(`input[name="${data.name}"]`, form)
  if (!hdnFld) {
    hdnFld = document.createElement('input')
    hdnFld.type = 'hidden'
    hdnFld.className = 'd-none'
    form.append(hdnFld)
  }
  if (data.name === 'b_h_t') {
    bfSelect(`input[name="${hdnFld.value}"]`, form)?.remove()
    setHiddenFld({ name: data.value, required: '' }, form)
  }
  Object.keys(data).forEach(key => {
    hdnFld.setAttribute(key, data[key])
  })
  return hdnFld
}
