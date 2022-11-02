const customOptionValidation = (fldKey, fldData) => {
  const optElm = document.querySelector(`[data-oopt="${fldKey}"]`)
  return (optElm?.checked && optElm.value === '' && fldData.valid.otherOptReq) ? 'otherOptReq' : ''
}
export default customOptionValidation
