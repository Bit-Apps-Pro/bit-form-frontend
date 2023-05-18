export default class BitStripeField {
  #stripeWrpSelector = ''

  #publishableKey = ''

  #options = null

  #contentId = null

  #config = {}

  #payIntegID = null

  #fieldKey = null

  #elements = null

  #stripInstance = null

  #amountType = null

  #amountFld = null

  #amount = null

  #currency = null

  #formSelector = null

  #formID = null

  #entryID = null

  constructor(selector, config) {
    // check config string or object
    const conf = typeof config === 'string' ? JSON.parse(config) : config
    Object.assign(this.#config, conf)
    console.log({ config })

    this.#stripeWrpSelector = selector
    this.#publishableKey = this.#config.publishableKey
    this.#options = this.#config.options
    this.#contentId = this.#config.contentId
    this.#payIntegID = this.#config.payIntegID
    this.#fieldKey = this.#config.fieldKey
    this.#amountFld = this.#config?.amountFld
    this.#amount = this.#config?.amount
    this.#amountType = this.#config.amountType
    this.#currency = this.#config.options.currency
    this.#formSelector = `#form-${this.#contentId}`
    this.#formID = this.#contentId?.split('_')[1]

    this.init()
  }

  init() {
    this.#initField()
    // this.#submitPayment()
  }

  #initField() {
    const stripeBtn = document.querySelector(`.${this.#fieldKey}-stripe-btn`)

    stripeBtn.addEventListener('click', () => {
      this.#handleOnClick(this.#contentId)
        .then(response => {
          if (response) {
            this.#stripeComponent()
          }
        })
    })
  }

  #stripeComponent() {
    const { Stripe } = window
    const contentIdLastItm = this.#contentId.split('_').at(-1)
    const fldId = `#${this.#amountFld}-${contentIdLastItm}`
    const errWrp = bfSelect(`#form-${this.#contentId} .${this.#fieldKey}-err-wrp`)
    const errTxt = bfSelect(`.${this.#fieldKey}-err-txt`, errWrp)
    const errMsg = bfSelect(`.${this.#fieldKey}-err-msg`, errWrp)
    this.#stripeWrpSelector.classList.remove('d-none')
    const dynamicAmount = document.querySelector(fldId)?.value

    if (this.#amountType === 'dynamic' && !dynamicAmount) {
      errMsg.style.removeProperty('display')
      errTxt.innerHTML = 'Amount field is required'
      setStyleProperty(errWrp, 'height', `${errTxt.parentElement.scrollHeight}px`)
      setStyleProperty(errWrp, 'opacity', 1)
      const fld = document.querySelector(`#form-${this.#contentId} .btcd-fld-itm.${this.#fieldKey}`)
      scrollToFld(fld)
      return
    }
    errTxt.innerHTML = ''
    setStyleProperty(errMsg, 'display', 'none')
    setStyleProperty(errWrp, 'height', 0)
    setStyleProperty(errWrp, 'opacity', 0)

    const amount = (this.#amountType === 'fixed' ? this.#amount : dynamicAmount) * 100
    if (Stripe) {
      this.#stripInstance = Stripe(this.#publishableKey)

      const data = {
        payIntegID: this.#payIntegID,
        amount,
        currency: this.#currency,
        metadata: {
          formID: this.#formID,
          entryID: this.#getEntryId(),
          fieldKey: this.#fieldKey,
        },
      }
      console.log(data)
      bitsFetchFront(this.#contentId, data, 'bitforms_get_stripe_secret_key')
        .then(res => {
          const { clientSecret } = res.data

          const config = {
            apperance: this.#options.appearance,
            clientSecret,
            locale: this.#options.locale,
            paymentMethodTypes: this.#options.paymentMethodTypes,
          }
          this.#elements = this.#stripInstance.elements(config)

          const paymentElement = this.#elements.create('payment', this.#options.layout)
          paymentElement.mount(this.#stripeWrpSelector)
        }).then(() => {
          const payNowBtn = document.createElement('button')
          payNowBtn.innerText = 'Pay Now'
          payNowBtn.classList.add('strip-pay-btn')
          payNowBtn.setAttribute('id', 'pay-now-btn')
          payNowBtn.setAttribute('type', 'button')

          const spannerSvg = `
                <svg width="25" height="25" class="pay-spinner d-none" version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0"
                xml:space="preserve">
                <path fill="#fff"
                  d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                  <animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50"
                    to="360 50 50" repeatCount="indefinite" />
                </path>
              </svg>`
          const span = document.createElement('span')
          span.innerHTML = spannerSvg
          payNowBtn.insertAdjacentElement('beforeend', span)
          this.#stripeWrpSelector.insertAdjacentElement('beforeend', payNowBtn)
          this.#submitPayment()
        })
    }
  }

  #getEntryId() {
    return localStorage.getItem('bf-entry-id')
  }

  #submitPayment() {
    const submitBtn = document.querySelector('#pay-now-btn')

    const elements = this.#elements

    submitBtn?.addEventListener('click', () => {
      const paySpinner = document.querySelector('.pay-spinner')
      paySpinner.classList.remove('d-none')
      this.#stripInstance.confirmPayment({
        elements,
        confirmParams: {},
        redirect: 'if_required',
      }).then(res => {
        console.log({ res })
        if (res?.paymentIntent?.status === 'succeeded') {
          paySpinner.classList.add('d-none')
          this.#onApproveHandler(res.paymentIntent)
        }
      })
    })
  }

  #bfSubmitFetch(ajaxURL, formData, update) {
    const uri = new URL(ajaxURL)
    uri.searchParams.append('action', update ? 'bitforms_entry_update' : 'bitforms_submit_form')
    return fetch(uri, {
      method: 'POST',
      body: formData,
    })
  }

  async #handleOnClick(contentId) {
    console.log('handleOnClick')
    const form = bfSelect(this.#formSelector)
    if (
      typeof validateForm !== 'undefined'
      && !validateForm({ form: contentId })
    ) {
      console.log('validate')
      const validationEvent = new CustomEvent('bf-form-validation-error', {
        detail: { formId: contentId, fieldId: '', error: '' },
      })
      form.dispatchEvent(validationEvent)
      return false
    }

    let update = false
    let formData = new FormData(form)
    if (this.#getEntryId()) {
      update = true
      formData.append('entryID', this.#getEntryId())
    }
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
      const result = await new Promise(resolve => {
        grecaptcha.ready(() => {
          grecaptcha
            .execute(props.gRecaptchaSiteKey, { action: 'submit' })
            .then(async (token) => {
              formData.append('g-recaptcha-response', token)
              const submitResp = this.#bfSubmitFetch(props?.ajaxURL, formData, update)
              resolve(await paymentSubmitResponse(this, submitResp, contentId, formData))
            })
        })
      })
      return result
    }
    const submitResp = this.#bfSubmitFetch(props?.ajaxURL, formData, update)
    console.log({ submitResp })
    const result = await paymentSubmitResponse(this, submitResp, contentId, formData)
    console.log({ result })
    return result
  }

  #onApproveHandler(result) {
    const formParent = document.getElementById(`${this.#contentId}`)
    formParent.classList.add('pos-rel', 'form-loading')

    const form = document.getElementById(`form-${this.#contentId}`)
    // this.#formID = this.#contentId?.split('_')[1]
    console.log('content id', this.#contentId)
    console.log({ result, form })
    if (typeof form !== 'undefined' && form !== null) {
      const paymentParams = {
        formID: this.#formID,
        transactionID: result.id,
        payment_name: 'stripe',
        payment_type: 'order',
        payment_response: result,
        entry_id: this.#getEntryId(),
        fieldKey: this.#fieldKey,
      }
      console.log({ paymentParams })
      const props = bf_globals[this.#contentId]
      const uri = new URL(props?.ajaxURL)
      uri.searchParams.append('_ajax_nonce', props?.nonce)
      uri.searchParams.append('action', 'bitforms_payment_insert')
      const submitResp = fetch(
        uri,
        {
          method: 'POST',
          body: JSON.stringify(paymentParams),
        },
      )
      submitResp.then(() => {
        formParent.classList.remove('pos-rel', 'form-loading')
        setBFMsg({
          contentId: this.#config.contentId,
          msg: this.responseData.message || this.responseData,
          type: 'success',
          show: true,
          error: false,
        })
        this.responseData?.hidden_fields?.map(hdnFld => {
          setHiddenFld(hdnFld, form)
        })
        this.#responseRedirect()
        bfReset(this.#contentId)
      })
    }
  }

  #responseRedirect() {
    const responsedRedirectPage = this.responseData.redirectPage
    let hitCron = null
    let newNonce = ''
    if (this.responseData.cron) {
      hitCron = this.responseData.cron
    }
    if (this.responseData.cronNotOk) {
      hitCron = this.responseData.cronNotOk
    }
    if (this.responseData.new_nonce) {
      newNonce = this.responseData.new_nonce
    }

    this.#triggerIntegration(hitCron, newNonce, this.#contentId)
    if (responsedRedirectPage) {
      const timer = setTimeout(() => {
        window.location = decodeURI(responsedRedirectPage)
        if (timer) {
          clearTimeout(timer)
        }
      }, 1000)
    }
  }

  #triggerIntegration(hitCron, newNonce, contentId) {
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

  destroy() {
    this.#stripeWrpSelector.innerHTML = ''
  }

  reset() {
    this.destroy()
    this.init()
  }
}
