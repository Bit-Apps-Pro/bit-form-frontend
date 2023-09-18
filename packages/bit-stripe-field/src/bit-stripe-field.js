export default class BitStripeField {
  #stripeWrpSelector = ''

  #publishableKey = ''

  #options = null

  #contentId = null

  #entryId = null

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

  #stripeBtnSpanner = null

  #paymentElement = null

  #theme = null

  #layout = null

  #payBtnTxt = null

  #allEventListeners = []

  constructor(selector, config) {
    if (typeof selector === 'string') {
      this.#stripeWrpSelector = document.querySelector(selector)
    } else {
      this.#stripeWrpSelector = selector
    }

    Object.assign(this.#config, config)
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
    this.#theme = this.#config.theme.style
    this.#layout = this.#config.layout
    this.#payBtnTxt = this.#config.payBtnTxt
    this.init()
  }

  init() {
    this.#initField()
    // this.#submitPayment()
  }

  #querySelector(selector) {
    const form = document.querySelector(this.#formSelector)
    return form.querySelector(selector)
  }

  #initField() {
    const stripeBtn = this.#querySelector(`.${this.#fieldKey}-stripe-btn`)
    this.#stripeBtnSpanner = this.#querySelector('.stripe-btn-spinner')

    this.#addEvent(stripeBtn, 'click', () => {
      this.#stripeBtnSpanner.classList.remove('d-none')
      this.#handleOnClick(this.#contentId)
        .then(response => {
          if (response) {
            this.#stripeComponent()
            // stripeBtnSpanner.classList.add('d-none')
          }
        })
        .finally(() => this.#stripeBtnSpanner.classList.add('d-none'))
    })
  }

  #addEvent(selector, eventType, cb) {
    selector.addEventListener(eventType, cb)
    this.#allEventListeners.push({ selector, eventType, cb })
  }

  #getDynamicValue(fldKey) {
    if (fldKey) {
      const fldName = window.bf_globals[this.#contentId].fields[fldKey]?.fieldName
      if (!fldName) return console.error(`Field name not found for ${fldKey}`)
      let elm = this.#querySelector(`[name="${fldName}"]`, this.#formSelector)
      if (elm && elm.type === 'radio') {
        elm = this.#querySelector(`[name="${fldName}"]:checked`, this.#formSelector)
      }
      if (elm && elm.value) {
        return elm.value
      }
    }
    return ''
  }

  #displayErrorMsg(msg = '') {
    const errWrp = bfSelect(`${this.#formSelector} .${this.#fieldKey}-err-wrp`)
    const errTxt = bfSelect(`.${this.#fieldKey}-err-txt`, errWrp)
    const errMsg = bfSelect(`.${this.#fieldKey}-err-msg`, errWrp)
    if (msg) {
      errMsg.style.removeProperty('display')
      errTxt.innerHTML = msg
      setStyleProperty(errWrp, 'height', `${errTxt.parentElement.scrollHeight}px`)
      setStyleProperty(errWrp, 'opacity', 1)
      const fld = this.#querySelector(`${this.#formSelector} .btcd-fld-itm.${this.#fieldKey}`)
      scrollToFld(fld)
    } else {
      errTxt.innerHTML = ''
      setStyleProperty(errMsg, 'display', 'none')
      setStyleProperty(errWrp, 'height', 0)
      setStyleProperty(errWrp, 'opacity', 0)
    }
  }

  #stripeComponent() {
    const { Stripe } = window
    const dynamicAmount = this.#getDynamicValue(this.#amountFld)

    if (this.#amountType === 'dynamic' && !dynamicAmount) {
      this.#displayErrorMsg('Amount field is required')
      return
    }
    this.#displayErrorMsg()

    const amount = (this.#amountType === 'fixed' ? this.#amount : dynamicAmount) * 100
    if (Stripe) {
      this.#stripInstance = Stripe(this.#publishableKey)

      const data = {
        payIntegID: this.#payIntegID,
        amount,
        currency: this.#currency,
        metadata: {
          formID: this.#formID,
          entryID: this.#entryId,
          fieldKey: this.#fieldKey,
        },
        payment_method_types: this.#options.payment_method_types,
      }
      bitsFetchFront(this.#contentId, data, 'bitforms_get_stripe_secret_key')
        .then(res => {
          const { success, data } = res
          if (!success) {
            this.#displayErrorMsg(data.error.message)
            return
          }
          this.#displayErrorMsg()
          this.#stripeWrpSelector.classList.remove('d-none')
          const { clientSecret } = data

          const config = {
            appearance: this.#theme,
            clientSecret,
            locale: this.#options.locale,
            // paymentMethodTypes: this.#options.paymentMethodTypes,
          }
          this.#elements = this.#stripInstance.elements(config)
          this.#paymentElement = this.#elements.create('payment', { layout: this.#layout })
          if (this.#config?.linkAuthentication?.active) {
            const email = this.#getDynamicValue(this.#config.linkAuthentication.emailFld)
            const linkAuthenticationElm = this.#elements.create('linkAuthentication', { defaultValues: { email } })
            const stripeAuthWrp = this.#querySelector(`${this.#formSelector} .${this.#fieldKey}-stripe-auth-wrp`)
            linkAuthenticationElm.mount(stripeAuthWrp)
          }
          if (this.#config?.address?.active) {
            const { address } = this.#config
            const addressElm = this.#elements.create('address', address)
            const stripeAddrWrp = this.#querySelector(`${this.#formSelector} .${this.#fieldKey}-stripe-addr-wrp`)
            addressElm.mount(stripeAddrWrp)
          }
          this.#paymentElement.mount(this.#stripeWrpSelector)
          this.#stripeBtnSpanner.classList.add('d-none')
        }).then(() => {
          const payNowBtn = document.createElement('button')
          payNowBtn.innerText = this.#payBtnTxt
          payNowBtn.classList.add('stripe-pay-btn')
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

  #submitPayment() {
    const submitBtn = this.#querySelector('#pay-now-btn')

    const elements = this.#elements

    this.#addEvent(submitBtn, 'click', () => {
      const paySpinner = this.#querySelector('.pay-spinner')
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
          this.#paymentElement.clear()
        } else {
          paySpinner.classList.add('d-none')
        }
      })
    })
  }

  async #handleOnClick(contentId) {
    try { await isFormValidatedWithoutError(contentId) } catch (_) { return Promise.reject() }
    const progressData = await saveFormProgress(contentId)
    const savedFormData = progressData?.[contentId]
    if (!savedFormData?.success) return Promise.reject()
    if (savedFormData.success) this.#entryId = savedFormData.data.entry_id
    return Promise.resolve(true)
  }

  #onApproveHandler(result) {
    const formParent = document.getElementById(`${this.#contentId}`)
    formParent.classList.add('pos-rel', 'form-loading')
    const form = document.getElementById(`form-${this.#contentId}`)

    if (typeof form !== 'undefined' && form !== null) {
      const props = bf_globals[this.#contentId]
      if (this.#entryId) props.entryId = this.#entryId
      const paymentFld = bfSelect(`input[name="${this.#config.fieldKey}"]`, form)
      if (paymentFld) {
        paymentFld.value = result.id
      } else {
        setHiddenFld({ name: this.#config.fieldKey, value: result.id, type: 'text' }, form)
      }
      let submitBtn = bfSelect('button[type="submit"]', form)
      if (!submitBtn) {
        submitBtn = document.createElement('button')
        submitBtn.setAttribute('type', 'submit')
        submitBtn.style.display = 'none'
        form.append(submitBtn)
      }
      submitBtn.click()

      const paymentParams = {
        formID: this.#formID,
        transactionID: result.id,
        payment_name: 'stripe',
        payment_type: 'order',
        payment_response: result,
        entry_id: this.#entryId,
        fieldKey: this.#fieldKey,
      }

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
        this.#entryId = null
      })
    }
  }

  #detachAllEvents() {
    this.#allEventListeners.forEach(({ selector, eventType, cb }) => {
      selector.removeEventListener(eventType, cb)
    })
  }

  destroy() {
    this.#paymentElement?.destroy()
    const stripeFldElm = this.#querySelector(`.${this.#fieldKey}-stripe-fld`)
    const stripeAuthWrpElm = this.#querySelector(`.${this.#fieldKey}-stripe-auth-wrp`)
    const stripeAddrWrpElm = this.#querySelector(`.${this.#fieldKey}-stripe-addr-wrp`)
    stripeFldElm.classList.add('d-none')
    stripeFldElm.innerHTML = ''
    this.#stripeWrpSelector.innerHTML = ''
    if (stripeAuthWrpElm) stripeAuthWrpElm.innerHTML = ''
    if (stripeAddrWrpElm) stripeAddrWrpElm.innerHTML = ''
    this.#detachAllEvents()
  }

  reset() {
    this.destroy()
    this.init()
  }
}
