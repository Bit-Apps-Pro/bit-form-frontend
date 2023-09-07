function dispatchFieldError(fldErrors, contentId) {
  const fldKeys = Object.keys(fldErrors)
  fldKeys.forEach((fk) => {
    const rowIndex = fk.match(/\[(\d+)\]/)?.[1]
    const rptIndexClass = rowIndex ? ` .rpt-index-${rowIndex}` : ''
    const errWrp = bfSelect(`#form-${contentId}${rptIndexClass} .${fk}-err-wrp`)
    const errTxt = bfSelect(`.${fk}-err-txt`, errWrp)
    bfSelect(`.${fk}-err-msg`, errWrp).style.removeProperty('display')
    errTxt.innerHTML = fldErrors[fk]
    setTimeout(() => {
      setStyleProperty(errWrp, 'height', `${errTxt.offsetHeight}px`)
      setStyleProperty(errWrp, 'opacity', 1)
    })
  })
  if (typeof moveStepToFirstErrFld !== 'undefined') moveStepToFirstErrFld(window?.bf_globals?.[contentId], fldKeys)
}

export default function bfValidationErrMsg(result, contentId) {
  const { data: responseData } = result
  if (responseData && typeof responseData === 'string') {
    setBFMsg({
      contentId,
      msg: responseData,
      error: true,
      show: true,
      type: 'error',
    })
  } else if (responseData) {
    if (responseData.$form !== undefined) {
      setBFMsg({
        contentId,
        msg: responseData.$form.message,
        msgId: responseData.$form.msg_id,
        duration: responseData.$form.msg_duration,
        type: 'error',
      })
      delete responseData.$form
    }
    if (Object.keys(responseData).length > 0) {
      dispatchFieldError(responseData, contentId)
    }
  }
}
