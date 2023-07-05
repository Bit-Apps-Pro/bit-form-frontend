const customOptionValidation = (contentId, fldKey, fldData) => {
  const optElm = bfSelect(`#form-${contentId} [data-oopt="${fldKey}"]`)
  return (optElm?.checked && (!optElm.hasAttribute('value') || !optElm.value) && fldData.valid.otherOptReq) ? 'otherOptReq' : ''
}
export default customOptionValidation
