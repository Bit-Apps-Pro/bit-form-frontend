const formSelector = '.bf-form'

export default class BitRazorpayField {
  #razorpayWrapper = null

  #config = {
    clientId: '',
    options: {
      currency: 'INR',
      amount: 1,
      amountType: 'fixed',
      theme: {},
      modal: {},
      prefill: {},
      notes: {},
    },
  }

  #document = null

  #window = null

  constructor(selector, config) {
    Object.assign(this.#config, config)
    this.#document = config.document || document
    this.#window = config.window || window
    if (typeof selector === 'string') {
      this.#razorpayWrapper = this.#document.querySelector(selector)
    } else {
      this.#razorpayWrapper = selector
    }
    this.init()
  }

  init() {
    this.#addEvent(this.#select(`.${this.#config.fieldKey}-razorpay-btn`), 'click', () => { this.#displayRazorpay() })
  }

  #select(selector, elm) {
    if (elm) return this.#document.querySelector(elm).querySelector(selector)
    return this.#razorpayWrapper.querySelector(selector)
  }

  #addEvent(selector, eventType, cb) {
    selector.addEventListener(eventType, cb)
  }

  #getDynamicValue(fldName) {
    let elm = this.#select(`[name="${fldName}"]`, formSelector)
    if (elm) {
      if (elm.type === 'radio') {
        elm = this.#select(`[name="${fldName}"]:checked`, formSelector)
      }

      return elm.value || ''
    }
    return ''
  }

  #onPaymentSuccess = (response) => {
    const formParent = document.getElementById(`${this.#config.contentId}`)
    formParent.classList.add('pos-rel', 'form-loading')
    const form = document.getElementById(`form-${this.#config.contentId}`)
    const formID = this.#config.contentId?.split('_')[1]
    if (typeof form !== 'undefined' && form !== null) {
      const paymentParams = {
        formID,
        fieldKey: this.#config.fieldKey,
        transactionID: response.razorpay_payment_id,
        payment_type: this.#config.payType === 'subscription' ? 'subscription' : 'order',
        entry_id: this.#getEntryId(),
      }

      const props = bf_globals[this.#config.contentId]
      const uri = new URL(props?.ajaxURL)
      uri.searchParams.append('_ajax_nonce', props?.nonce)
      uri.searchParams.append('action', 'bitforms_save_razorpay_details')
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
        bfReset(this.#config.contentId)
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

    this.#triggerIntegration(hitCron, newNonce, this.#config.contentId)
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

  async #displayRazorpay() {
    const {
      currency, amount, amountType, amountFld, name, description, theme, prefill, modal, notes,
    } = this.#config.options
    const { confirm_close } = modal
    const { contentId } = this.#config

    const totalAmount = Number(amountType === 'fixed' ? amount : this.#getDynamicValue(amountFld)) * 100

    const options = {
      key: this.#config.clientId,
      currency,
      amount: totalAmount,
      name,
      description,
      theme,
      prefill: {
        name: this.#getDynamicValue(prefill.name),
        email: this.#getDynamicValue(prefill.email),
        contact: this.#getDynamicValue(prefill.contact),
      },
      notes,
      modal: {
        backdropclose: false,
        escape: false,
        confirm_close,
      },
      handler: async response => this.#onPaymentSuccess(response),
    }

    const form = bfSelect(`#form-${contentId}`)
    if (
      typeof validateForm !== 'undefined'
      && !validateForm({ form: contentId })
    ) {
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
      grecaptcha.ready(() => {
        grecaptcha
          .execute(props.gRecaptchaSiteKey, { action: 'submit' })
          .then(async (token) => {
            formData.append('g-recaptcha-response', token)
            const submitResp = this.#bfSubmitFetch(props?.ajaxURL, formData, update)
            if (await paymentSubmitResponse(this, submitResp, contentId, formData)) {
              const paymentObject = new this.#window.Razorpay(options)
              paymentObject.open()
            }
          })
      })
    } else {
      const submitResp = this.#bfSubmitFetch(props?.ajaxURL, formData, update)
      if (await paymentSubmitResponse(this, submitResp, contentId, formData)) {
        const paymentObject = new this.#window.Razorpay(options)
        paymentObject.open()
      }
    }
  }

  #setEntryId(id) {
    localStorage.setItem('bf-entry-id', id)
  }

  #getEntryId() {
    return localStorage.getItem('bf-entry-id')
  }

  #bfSubmitFetch(ajaxURL, formData, update) {
    const uri = new URL(ajaxURL)
    uri.searchParams.append('action', update ? 'bitforms_entry_update' : 'bitforms_submit_form')
    return fetch(uri, {
      method: 'POST',
      body: formData,
    })
  }

  destroy() {
    this.#razorpayWrapper.innerHTML = ''
  }

  reset() {
    this.destroy()
    this.init()
  }
}
