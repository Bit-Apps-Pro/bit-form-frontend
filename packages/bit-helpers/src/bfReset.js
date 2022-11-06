export default function bfReset(contentId, customHook = false) {
  if (customHook) {
    const resetEvent = new CustomEvent('bf-form-reset', {
      detail: { formId: contentId },
    })
    bfSelect(`#form-${contentId}`).dispatchEvent(resetEvent)
  }

  const props = window.bf_globals[contentId]
  bfSelect(`#form-${contentId}`).reset()
  localStorage.setItem('bf-entry-id', '')
  typeof customFieldsReset !== 'undefined' && customFieldsReset(props)
  typeof resetOtherOpt !== 'undefined' && resetOtherOpt()
  Object.keys(props.fields).forEach(fk => {
    const errWrp = bfSelect(`#form-${contentId} .${fk}-err-wrp`)
    if (errWrp) {
      errWrp.style.height = '0px'
      errWrp.style.opacity = 0
      bfSelect(`.${fk}-err-msg`, errWrp).style.display = 'none'
    }
  })

  if (props.gRecaptchaSiteKey && props.gRecaptchaVersion === 'v2') {
    window?.grecaptcha?.reset()
  }
}
