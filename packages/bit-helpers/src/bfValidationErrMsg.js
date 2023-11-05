function dispatchFieldError(fldErrors, contentId) {
  const fldKeys = Object.keys(fldErrors)
  fldKeys.forEach((fk) => {
    const [fldKey, rowIndex] = getFldKeyAndRowIndx(fk)
    const rptIndexClass = rowIndex ? `.rpt-index-${rowIndex}` : ''
    const errWrp = bfSelect(`#form-${contentId} ${rptIndexClass} .${fldKey}-err-wrp`)
    const errTxt = bfSelect(`.${fldKey}-err-txt`, errWrp)
    const errMsg = bfSelect(`.${fldKey}-err-msg`, errWrp)
    let isErrWrpGrid = false
    try {
      isErrWrpGrid = getComputedStyle(errWrp).display === 'grid'
      if (isErrWrpGrid) {
        errWrp.style.removeProperty('opacity')
        errWrp.style.removeProperty('height')
        errMsg.style.removeProperty('display')
      }
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
  moveToFirstErrFld(window?.bf_globals?.[contentId], fldKeys)
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
