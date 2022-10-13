function pushFilToFormData(formData, fld, files) {
  if (files?.length > 1) {
    const uploadedFileNames = []
    for (let i = 0; i < files.length; i += 1) {
      const { serverId } = files[i]
      if (serverId) {
        uploadedFileNames.push(serverId)
      } else {
        formData.append(`${fld}[]`, files[i]?.file)
      }
    }
    uploadedFileNames.length && formData.append(fld, uploadedFileNames.join(','))
  } else {
    const file = !files[0]?.serverId ? files[0]?.file : files[0]?.serverId
    formData.append(fld, file)
  }
  return formData
}

function bitFormSubmitAction(e) {
  e.preventDefault()
  const contentId = e.target.id.slice(e.target.id.indexOf('-') + 1)

  if (typeof validateForm !== 'undefined' && !validateForm({ form: contentId })) {
    const validationEvent = new CustomEvent('bf-form-validation-error', { detail: { formId: contentId, fieldId: '', error: '' } })
    e.target.dispatchEvent(validationEvent)
    return
  }
  disabledSubmitButton(contentId, true)
  let formData = new FormData(e.target)
  const props = window.bf_globals[contentId]

  const inits = props.inits || {}
  const fileFields = Object.keys(inits).filter(fldKey => props.fields[fldKey].typ === 'advanced-file-up')
  for (let i = 0; i < fileFields?.length; i++) {
    if (formData.has(fileFields[i])) {
      formData.delete(fileFields[i])
      if (inits[fileFields[i]]?.on_select_upload) {
        formData.append(fileFields[i], inits[fileFields[i]].uploaded_files)
      } else {
        formData = pushFilToFormData(
          formData,
          fileFields[i],
          inits[fileFields[i]].files,
        )
      }
    }
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
      grecaptcha.execute(props.gRecaptchaSiteKey, { action: 'submit' }).then((token) => {
        formData.append('g-recaptcha-response', token)
        const uri = new URL(props?.ajaxURL)
        uri.searchParams.append('action', 'bitforms_submit_form')
        const submitResp = fetch(
          uri,
          {
            method: 'POST',
            body: formData,
          },
        )
        submitResponse(submitResp, contentId, formData)
      })
    })
  } else {
    const uri = new URL(props?.ajaxURL)
    uri.searchParams.append('action', 'bitforms_submit_form')
    const submitResp = fetch(
      uri,
      {
        method: 'POST',
        body: formData,
      },
    )
    submitResponse(submitResp, contentId, formData)
  }
}

function submitResponse(resp, contentId, formData) {
  resp.then(response => new Promise((resolve, reject) => {
    if (response.staus > 400) {
      const errorEvent = new CustomEvent('bf-form-submit-error', { detail: { formId: contentId, errors: result.data } })
      document.getElementById(`form-${contentId}`).dispatchEvent(errorEvent)
      response.staus === 500 ? reject(new Error('Mayebe Internal Server Error')) : reject(response.json())
    } else resolve(response.json())
  })).then(result => {
    const successEvent = new CustomEvent('bf-form-submit-success', { detail: { formId: contentId, entryId: result.entryId, formData } })
    document.getElementById(`form-${contentId}`).dispatchEvent(successEvent)
    let responsedRedirectPage = null
    let hitCron = null
    let newNonce = ''
    if (result !== undefined && result.success) {
      handleReset(contentId)
      if (typeof result.data === 'object') {
        genereateNewHpToken(result.data)
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
        setToastMessage({ contentId, msg: result.data.message, show: true, type: 'warning', error: false, id: 1 })
      } else {
        setToastMessage({ contentId, msg: result.data, show: true, error: false, id: 2 })
      }
    } else {
      const errorEvent = new CustomEvent('bf-form-submit-error', { detail: { formId: contentId, errors: result.data } })
      document.getElementById(`form-${contentId}`).dispatchEvent(errorEvent)
      handleFormValidationErrorMessages(result, contentId)
    }

    if (responsedRedirectPage) {
      triggerIntegration(hitCron, newNonce, contentId)
      const timer = setTimeout(() => {
        window.location = decodeURI(responsedRedirectPage)
        if (timer) {
          clearTimeout(timer)
        }
      }, 1000)
    } else {
      triggerIntegration(hitCron, newNonce, contentId)
    }

    disabledSubmitButton(contentId, false)
  })
    .catch(error => {
      const err = error?.message ? error.message : 'Unknown Error'
      setToastMessage({ contentId, msg: err, show: true, type: 'error', error: true, id: 3 })
      disabledSubmitButton(contentId, false)
    })
}

function genereateNewHpToken(responseData) {
  const allContentids = window?.bf_globals
  allContentids
    && Object.keys(allContentids).forEach((contentId) => {
      const form = document.getElementById(`form-${contentId}`)
      const oldHpToken = form.querySelector(
        `input[name=${responseData.old_hp_token}]`,
      )
      if (oldHpToken) {
        oldHpToken.name = responseData.hp_token
      }
    })
}

function handleReset(contentId, customHook = false) {
  if (customHook) {
    const resetEvent = new CustomEvent('bf-form-reset', { detail: { formId: contentId } })
    document.getElementById(`form-${contentId}`).dispatchEvent(resetEvent)
  }

  const customFields = ['select',
    'phone-number',
    'country',
    'currency',
    'file-up',
    'advanced-file-up']
  const props = window.bf_globals[contentId]
  document.getElementById(`form-${contentId}`).reset()

  for (const [fieldKey, fieldData] of Object.entries(props?.fields || {})) {
    if (customFields.includes(fieldData.typ)) {
      window.bf_globals[contentId].inits[fieldKey].reset()
    }
  }

  if (props.gRecaptchaSiteKey && props.gRecaptchaVersion === 'v2') {
    resetCaptcha()
  }
}
function setToastMessage(msgObj) {
  console.log('msg', msgObj)
  const msgWrpr = document.getElementById(`bf-form-msg-wrp-${msgObj.contentId}`)
  if (msgWrpr.firstChild) {
    msgWrpr.firstChild.classList.remove('active')
  }
  msgWrpr.innerHTML = `<div class="form-msg ${msgObj.type}">${msgObj.msg}<div>`
  setTimeout(() => {
    msgWrpr.firstChild.classList.add('active')
  }, 100)
  setTimeout(() => {
    msgWrpr.firstChild.classList.remove('active')
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
      const data = { cronNotOk: hitCron, token: newNonce || props.nonce, id: props.appID }
      fetch(
        uri,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        },
      )
        .then(response => response.json())
    }
  }
}
function handleFormValidationErrorMessages(result, contentId) {
  const { data: responseData } = result
  if (responseData && typeof responseData === 'string') {
    setToastMessage({ contentId, msg: responseData, error: true, show: true, id: 4 })
  } else if (responseData) {
    if (responseData.$form !== undefined) {
      setToastMessage({ contentId, msg: responseData.$form, error: true, show: true, id: 5 })
      delete responseData.$form
    }
    if (Object.keys(responseData).length > 0) {
      dispatchFieldError(responseData, contentId)
      /*  //TODO dispatchFieldData */
      console.log('hi')
    }
  }
}

function dispatchFieldError(fldErrors, contentId) {
  Object.keys(fldErrors).forEach(fk => {
    const errFld = document.querySelector(`#form-${contentId} .${fk}-err-txt`)
    errFld.innerHTML = fldErrors[fk]
    errFld.parentElement.style.marginTop = '5px'
    errFld.parentElement.style.height = `${errFld.offsetHeight}px`
    errFld.parentElement.style.removeProperty('display')
  })
}

function disabledSubmitButton(contentId, disabled) {
  document.getElementById(`form-${contentId}`).querySelector('button[type="submit"]').disabled = disabled
}

document.querySelectorAll('form').forEach((frm) => {
  if (frm.id.includes('form-bitforms')) {
    frm.addEventListener('submit', (e) => bitFormSubmitAction(e))
    frm.querySelector('button[type="reset"]')?.addEventListener('click', (e) => handleReset(frm.id.slice(frm.id.indexOf('-') + 1), true))
  }
})
