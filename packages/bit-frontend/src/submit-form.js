function bitFormSubmitAction(e) {
  e.preventDefault()
  const contentId = e.target.id.slice(e.target.id.indexOf('-') + 1)

  if (
    typeof validateForm !== 'undefined'
    && !validateForm({ form: contentId })
  ) {
    const validationEvent = new CustomEvent('bf-form-validation-error', {
      detail: { formId: contentId, fieldId: '', error: '' },
    })
    e.target.dispatchEvent(validationEvent)
    return
  }
  disabledSubmitButton(contentId, true)
  let formData = new FormData(e.target)
  const props = window.bf_globals[contentId]

  if (typeof advancedFileHandle !== 'undefined') {
    formData = advancedFileHandle(props, formData)
  }
  if (props.GCLID) {
    formData.set('GCLID', props.GCLID)
  }

  const hidden = []
  Object.entries(props?.fields || {}).forEach((fld) => {
    if (fld[1]?.valid?.hide) {
      hidden.push(fld[0])
    }
  })

  if (hidden.length) {
    formData.append('hidden_fields', hidden)
  }
  if (props?.gRecaptchaVersion === 'v3' && props?.gRecaptchaSiteKey) {
    grecaptcha.ready(() => {
      grecaptcha
        .execute(props.gRecaptchaSiteKey, { action: 'submit' })
        .then((token) => {
          formData.append('g-recaptcha-response', token)
          const submitResp = bfSubmitFetch(props?.ajaxURL, formData)
          submitResponse(submitResp, contentId, formData)
        })
    })
  } else {
    const submitResp = bfSubmitFetch(props?.ajaxURL, formData)
    submitResponse(submitResp, contentId, formData)
  }
}

function bfSubmitFetch(ajaxURL, formData) {
  const uri = new URL(ajaxURL)
  uri.searchParams.append('action', 'bitforms_submit_form')
  return fetch(uri, {
    method: 'POST',
    body: formData,
  })
}
function submitResponse(resp, contentId, formData) {
  resp
    .then(
      (response) => new Promise((resolve, reject) => {
        if (response.staus > 400) {
          const errorEvent = new CustomEvent('bf-form-submit-error', {
            detail: { formId: contentId, errors: result.data },
          })
          bfSelect(`#form-${contentId}`).dispatchEvent(errorEvent)
          response.staus === 500
            ? reject(new Error('Mayebe Internal Server Error'))
            : reject(response.json())
        } else resolve(response.json())
      }),
    )
    .then((result) => {
      const successEvent = new CustomEvent('bf-form-submit-success', {
        detail: { formId: contentId, entryId: result.entryId, formData },
      })
      bfSelect(`#form-${contentId}`).dispatchEvent(successEvent)
      let responsedRedirectPage = null
      let hitCron = null
      let newNonce = ''
      if (result !== undefined && result.success) {
        const form = bfSelect(`#form-${contentId}`)
        handleReset(contentId)
        if (typeof result.data === 'object') {
          if (form) {
            result?.data?.hidden_fields?.map(hdnFld => {
              setHiddenFld(hdnFld, form)
            })
          }
          responsedRedirectPage = result.data.redirectPage
          if (result.data.cron) {
            hitCron = result.data.cron
          }
          if (result.data.cronNotOk) {
            hitCron = result.data.cronNotOk
          }
          if (result.data.new_nonce) {
            newNonce = result.data.new_nonce
          }
          setToastMessage({
            contentId,
            msgId: result.data.msg_id,
            msg: result.data.message,
            show: true,
            type: 'success',
            error: false,
            id: 1,
          })
        } else {
          setToastMessage({
            contentId,
            msg: result.data,
            type: 'success',
            show: true,
            error: false,
            id: 2,
          })
        }
      } else {
        const errorEvent = new CustomEvent('bf-form-submit-error', {
          detail: { formId: contentId, errors: result.data },
        })
        bfSelect(`#form-${contentId}`).dispatchEvent(errorEvent)
        handleFormValidationErrorMessages(result, contentId)
      }

      triggerIntegration(hitCron, newNonce, contentId)
      if (responsedRedirectPage) {
        const timer = setTimeout(() => {
          window.location = decodeURI(responsedRedirectPage)
          if (timer) {
            clearTimeout(timer)
          }
        }, 1000)
      }

      disabledSubmitButton(contentId, false)
    })
    .catch((error) => {
      const err = error?.message ? error.message : 'Unknown Error'
      setToastMessage({
        contentId,
        msg: err,
        show: true,
        type: 'error',
        error: true,
        id: 3,
      })
      disabledSubmitButton(contentId, false)
    })
}

function handleReset(contentId, customHook = false) {
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

  if (props.gRecaptchaSiteKey && props.gRecaptchaVersion === 'v2') {
    resetCaptcha()
  }
}
function setToastMessage(msgObj) {
  let msgWrpr = bfSelect(`#bf-form-msg-wrp-${msgObj.contentId}`)

  msgWrpr.innerHTML = `<div class="form-msg deactive ${msgObj.type}">${msgObj.msg}</div>`
  msgWrpr = bfSelect('.form-msg', msgWrpr)
  if (msgObj.msgId) {
    msgWrpr = bfSelect(`.msg-content-${msgObj.msgId} .msg-content`, bfSelect(`#${msgObj.contentId}`))
    msgWrpr.innerHTML = msgObj.msg
    msgWrpr = bfSelect(`.msg-container-${msgObj.msgId}`, bfSelect(`#${msgObj.contentId}`))
  }
  if (msgWrpr) {
    msgWrpr.classList.replace('active', 'deactive')
  }
  if (!msgWrpr) { return }
  setTimeout(() => {
    msgWrpr.classList.replace('deactive', 'active')
  }, 100)
  setTimeout(() => {
    msgWrpr.classList.replace('active', 'deactive')
  }, 5000)
}
function triggerIntegration(hitCron, newNonce, contentId) {
  const props = window.bf_globals[contentId]
  if (hitCron) {
    if (typeof hitCron === 'string') {
      const uri = new URL(hitCron)
      if (uri.protocol !== window.location.protocol) {
        uri.protocol = window.location.protocol
      }
      fetch(uri)
    } else {
      const uri = new URL(props.ajaxURL)
      uri.searchParams.append('action', 'bitforms_trigger_workflow')
      const data = {
        cronNotOk: hitCron,
        token: newNonce || props.nonce,
        id: props.appID,
      }
      fetch(uri, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => response.json())
    }
  }
}
function handleFormValidationErrorMessages(result, contentId) {
  const { data: responseData } = result
  if (responseData && typeof responseData === 'string') {
    setToastMessage({
      contentId,
      msg: responseData,
      error: true,
      show: true,
      id: 4,
    })
  } else if (responseData) {
    if (responseData.$form !== undefined) {
      setToastMessage({
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

function dispatchFieldError(fldErrors, contentId) {
  Object.keys(fldErrors).forEach((fk) => {
    const errFld = bfSelect(`#form-${contentId} .${fk}-err-txt`)
    errFld.innerHTML = fldErrors[fk]
    errFld.parentElement.style.marginTop = '5px'
    errFld.parentElement.style.height = `${errFld.offsetHeight}px`
    errFld.parentElement.style.removeProperty('display')
  })
}

function disabledSubmitButton(contentId, disabled) {
  bfSelect('button[type="submit"]', bfSelect(`#form-${contentId}`)).disabled = disabled
}

document.querySelectorAll('form').forEach((frm) => {
  if (frm.id?.startsWith('form-bitforms')) {
    frm.addEventListener('submit', (e) => bitFormSubmitAction(e))
    bfSelect('button[type="reset"]', frm)
      ?.addEventListener('click', (e) => handleReset(e, true))
  }
})
localStorage.setItem('bf-entry-id', '')
