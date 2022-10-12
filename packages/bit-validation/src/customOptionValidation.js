const customOptionValidation = (fldKey, fldData) => {
  const optElm = document.querySelector(`[data-oopt="${fldKey}"]`)
  return (optElm?.checked && optElm.value === '') ? 'otherOptReq' : ''
}
export default customOptionValidation
