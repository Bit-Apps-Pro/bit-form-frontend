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
    const errFld = bfSelect(`#form-${contentId} .${fk}-err-msg`)
    if (errFld) {
      errFld.style.marginTop = '0px'
      errFld.style.height = '0px'
      errFld.style.opacity = '0'
    }
  })

  if (props.gRecaptchaSiteKey && props.gRecaptchaVersion === 'v2') {
    window?.grecaptcha?.reset()
  }
}
