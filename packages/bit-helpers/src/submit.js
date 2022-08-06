function validateForm(obj) {
  return true
}
function handleSubmit(e) {
  e.preventDefault()
  const contentId = e.target.id.slice(e.target.id.indexOf('-') + 1)
  /* 'form-bitforms_1_submit_10_1' */

  if (!validateForm({ form: contentId })) return
  /*  TODO: form submit validation error frontend */

  /*  // TODO set button disabled
	 // buttonDisabled = true
	 // snack = false */
  const formData = new FormData(e.target)
  const props = window[contentId]

  if (props.GCLID) {
    formData.set('GCLID', props.GCLID)
  }

  const hidden = []
  Object.entries(props?.fields || {}).forEach(fld => {
    if (fld[1]?.valid?.hide) {
      hidden.push(fld[0])
    }
  })

  if (hidden.length) {
    formData.append('hidden_fields', hidden)
  }
  console.log('formData=', formData)
  /* bitFormsFront Will Delete */
  const bitFormsFront = { ajaxURL: 'http://bitform.mr/wp-admin/admin-ajax.php' }
  if (props?.gRecaptchaVersion === 'v3' && props?.gRecaptchaSiteKey) {
    grecaptcha.ready(() => {
      grecaptcha.execute(props.gRecaptchaSiteKey, { action: 'submit' }).then((token) => {
        formData.append('g-recaptcha-response', token)
        const uri = new URL(bitFormsFront?.ajaxURL)
        uri.searchParams.append('action', 'bitforms_submit_form')
        const submitResp = fetch(
          uri,
          {
            method: 'POST',
            body: formData,
          },
        )
        submitResponse(submitResp, contentId)
      })
    })
  } else {
    const uri = new URL(bitFormsFront?.ajaxURL)
    uri.searchParams.append('action', 'bitforms_submit_form')
    const submitResp = fetch(
      uri,
      {
        method: 'POST',
        body: formData,
      },
    )
    submitResponse(submitResp, contentId)
  }
}

function submitResponse(resp, contentId) {
  resp.then(response => new Promise((resolve, reject) => {
    if (response.staus > 400) {
      /* // TODO: form submit error */
      response.staus === 500 ? reject(new Error('Mayebe Internal Server Error')) : reject(response.json())
    } else resolve(response.json())
  })).then(result => {
    /* // form submit success */
    console.log('result =', result)
    new CustomEvent('build', { formId: contentId, formData, entryId })
    let responsedRedirectPage = null
    let hitCron = null
    let newNonce = ''
    if (result != undefined && result.success) {
      /* // TODO: form reset */
      handleReset(contentId)
      if (typeof result.data === 'object') {
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
        setToastMessage({ msg: result.data.message, show: true, error: false, id: 1 })
      } else {
        setToastMessage({ msg: result.data, show: true, error: false, id: 2 })
      }
    } else {
      /* // TODO: form submit validation error */
      handleFormValidationErrorMessages(result)
    }

    if (responsedRedirectPage) {
      triggerIntegration(hitCron, newNonce)
      const timer = setTimeout(() => {
        window.location = decodeURI(responsedRedirectPage)
        if (timer) {
          clearTimeout(timer)
        }
      }, 1000)
    } else {
      triggerIntegration(hitCron, newNonce)
    }

    /* // TODO setButtonDisabled */
  })
    .catch(error => {
      const err = error?.message ? error.message : 'Unknown Error'
      setToastMessage({ msg: err, show: true, error: true, id: 3 })
      /* // TODO setButtonDisabled */
    })
}

function handleReset(contentId) {
  const props = window[contentId]
  document.getElementById(`form-${contentId}`).reset()
  if (props.gRecaptchaSiteKey && props.gRecaptchaVersion === 'v2') {
    /* resetCaptcha(); */
  }
}
function setToastMessage(msgObj) {
  alert(`msg(${msgObj.id}): ${msgObj.msg}`)
}
function triggerIntegration(hitCron, newNonce) {
  if (hitCron) {
    if (typeof hitCron === 'string') {
      const uri = new URL(hitCron)
      if (uri.protocol !== window.location.protocol) {
        uri.protocol = window.location.protocol
      }
      fetch(uri)
    } else {
      const uri = new URL(bitFormsFront.ajaxURL)
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
function handleFormValidationErrorMessages(result) {
  if (result.data && typeof result.data === 'string') {
    setToastMessage({ msg: result.data, error: true, show: true, id: 4 })
  } else if (result.data) {
    if (result.data.$form !== undefined) {
      setToastMessage({ msg: result.data.$form, error: true, show: true, id: 5 })
      delete result.data.$form
    }
    if (Object.keys(result.data).length > 0) {
      /*  //TODO dispatchFieldData */
      console.log('hi')
    }
  }
}
