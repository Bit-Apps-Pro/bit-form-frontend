function dispatchFieldError(fldErrors, contentId) {
  Object.keys(fldErrors).forEach((fk) => {
    const errFld = bfSelect(`#form-${contentId} .${fk}-err-txt`)
    errFld.innerHTML = fldErrors[fk]
    errFld.parentElement.style.marginTop = '5px'
    errFld.parentElement.style.height = `${errFld.offsetHeight}px`
    errFld.parentElement.style.removeProperty('display')
  })
}

export default function bfValidationErrMsg(result, contentId) {
  const { data: responseData } = result
  if (responseData && typeof responseData === 'string') {
    setBFMsg({
      contentId,
      msg: responseData,
      error: true,
      show: true,
      id: 4,
    })
  } else if (responseData) {
    if (responseData.$form !== undefined) {
      setBFMsg({
        contentId,
        msg: responseData.$form,
        error: true,
        show: true,
        id: 5,
      })
      delete responseData.$form
    }
    if (Object.keys(responseData).length > 0) {
      dispatchFieldError(responseData, contentId)
    }
  }
}
