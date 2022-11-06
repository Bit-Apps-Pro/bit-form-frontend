function dispatchFieldError(fldErrors, contentId) {
  Object.keys(fldErrors).forEach((fk) => {
    const errWrp = bfSelect(`#form-${contentId} .${fk}-err-wrp`)
    const errTxt = bfSelect(`.${fk}-err-txt`, errWrp)
    bfSelect(`.${fk}-err-msg`, errWrp).style.removeProperty('display')
    errTxt.innerHTML = fldErrors[fk]
    errWrp.style.height = `${errTxt.offsetHeight}px`
    errWrp.style.opacity = 1
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
