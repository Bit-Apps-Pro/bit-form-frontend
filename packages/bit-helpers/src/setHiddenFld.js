export default function setHiddenFld(data, form) {
  let hdnFld = bfSelect(`input[name="${data.name}"]`, form)
  if (!hdnFld) {
    hdnFld = document.createElement('input')
    hdnFld.type = 'hidden'
    hdnFld.className = 'd-none'
    hdnFld.name = data.name
    form.append(hdnFld)
  }
  hdnFld.value = data.value
  return hdnFld
}
