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
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', this.#config.fieldKey)
      input.setAttribute('id', 'razorpayfield')
      input.setAttribute('value', response.razorpay_payment_id)
      form.appendChild(input)
      let submitBtn = form.querySelector('button[type="submit"]')
      if (!submitBtn) {
        submitBtn = document.createElement('input')
        submitBtn.setAttribute('type', 'submit')
        submitBtn.style.display = 'none'
        form.appendChild(submitBtn)
      }
      submitBtn.click()
      const paymentParams = {
        formID,
        fieldKey: this.#config.fieldKey,
        transactionID: response.razorpay_payment_id,
        payment_type: this.#config.payType === 'subscription' ? 'subscription' : 'order',
      }
      // bitsFetchFront(paymentParams, 'bitforms_save_razorpay_details')
      //   .then(() => formParent.classList.remove('pos-rel', 'form-loading'))
      const uri = new URL(bf_globals[this.#config.contentId]?.ajaxURL)
      uri.searchParams.append('_ajax_nonce', bf_globals[this.#config.contentId]?.nonce)
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
      })
    }
  }

  #displayRazorpay = () => {
    const { currency, amount, amountType, amountFld, name, description, theme, prefill, modal, notes } = this.#config.options
    const { confirm_close } = modal

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

    isFormValidatedWithoutError(this.#config.contentId, handleFormValidationErrorMessages)
      .then(() => {
        const paymentObject = new this.#window.Razorpay(options)
        paymentObject.open()
      })
      .catch((err) => {
        alert(`restult 1${err}`)
        return false
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
