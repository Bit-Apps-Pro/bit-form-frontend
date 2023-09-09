function dispatchFieldError(fldErrors, contentId) {
  const fldKeys = Object.keys(fldErrors)
  fldKeys.forEach((fk) => {
    const rowIndex = fk.match(/\[(\d+)\]/)?.[1]
    const rptIndexClass = rowIndex ? ` .rpt-index-${rowIndex}` : ''
    const errWrp = bfSelect(`#form-${contentId}${rptIndexClass} .${fk}-err-wrp`)
    const errTxt = bfSelect(`.${fk}-err-txt`, errWrp)
    const errMsg = bfSelect(`.${fk}-err-msg`, errWrp)
    let isErrWrpGrid = false
    try {
      isErrWrpGrid = getComputedStyle(errWrp).display === 'grid'
    } catch (_) {
      isErrWrpGrid = false
    }
    errTxt.innerHTML = fldErrors[fk]
    if (!isErrWrpGrid) {
      setTimeout(() => {
        errMsg.style.removeProperty('display')
        setStyleProperty(errWrp, 'height', `${errTxt.offsetHeight}px`)
        setStyleProperty(errWrp, 'opacity', 1)
      }, 100)
    } else {
      setStyleProperty(errWrp, 'grid-template-rows', '1fr')
    }
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
