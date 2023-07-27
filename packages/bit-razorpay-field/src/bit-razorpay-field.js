export default class BitRazorpayField {
  #razorpayWrapper = null

  #formSelector = ''

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

  #entryId = null

  #document = null

  #window = null

  constructor(selector, config) {
    Object.assign(this.#config, config)
    this.#document = config.document || document
    this.#window = config.window || window
    this.#formSelector = `#form-${this.#getContentId()}`
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

  #removeEvent(selector, eventType, cb) {
    selector.removeEventListener(eventType, cb)
  }

  #getDynamicValue(fldKey) {
    if (fldKey) {
      const fldName = window.bf_globals[this.#getContentId()].fields[fldKey].fieldName
      let elm = this.#select(`[name="${fldName}"]`, this.#formSelector)
      if (elm && elm.type === 'radio') {
        elm = this.#select(`[name="${fldName}"]:checked`, this.#formSelector)
      }
      if (elm && elm.value) {
        return elm.value
      }
    }
    return ''
  }

  #onPaymentSuccess = (response) => {
    const formParent = document.getElementById(`${this.#getContentId()}`)
    formParent.classList.add('pos-rel', 'form-loading')
    const form = document.getElementById(`form-${this.#getContentId()}`)
    const formID = this.#getContentId()?.split('_')[1]
    if (typeof form !== 'undefined' && form !== null) {
      const props = bf_globals[this.#getContentId()]
      if (this.#entryId) props.entryId = this.#entryId
      const paymentFld = bfSelect(`input[name="${this.#config.fieldKey}"]`, form)
      if (paymentFld) {
        paymentFld.value = response.razorpay_payment_id
      } else {
        setHiddenFld({ name: this.#config.fieldKey, value: response.razorpay_payment_id, type: 'text' }, form)
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
        formID,
        fieldKey: this.#config.fieldKey,
        transactionID: response.razorpay_payment_id,
        payment_type: this.#config.payType === 'subscription' ? 'subscription' : 'order',
        entry_id: this.#entryId,
      }

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
        this.#entryId = null
      })
    }
  }

  async #displayRazorpay() {
    const {
      currency, amount, amountType, amountFld, name, description, theme, prefill, modal, notes,
    } = this.#config.options
    const { confirm_close } = modal
    const { contentId } = this.#config

    const totalAmount = Number(amountType === 'dynamic' ? this.#getDynamicValue(amountFld) : amount) * 100

    const options = {
      key: this.#config.clientId,
      currency,
      amount: totalAmount,
      name,
      description,
      theme,
      prefill: {
        name: this.#getDynamicValue(prefill.prefillNameFld),
        email: this.#getDynamicValue(prefill.prefillEmailFld),
        contact: this.#getDynamicValue(prefill.prefillContactFld),
      },
      notes,
      modal: {
        backdropclose: false,
        escape: false,
        confirm_close,
      },
      handler: async response => this.#onPaymentSuccess(response),
    }
    try { await isFormValidatedWithoutError(contentId) } catch (_) { return false }
    const progressData = await saveFormProgress(contentId)
    const savedFormData = progressData?.[contentId]
    if (!savedFormData?.success) return
    if (savedFormData.entry_id) this.#entryId = savedFormData.entry_id

    const paymentObject = new this.#window.Razorpay(options)
    paymentObject.open()
  }

  #getContentId() {
    return this.#config.contentId
  }

  destroy() {
    this.#removeEvent(this.#select(`.${this.#config.fieldKey}-razorpay-btn`), 'click', () => { this.#displayRazorpay() })
  }

  reset() {
    this.destroy()
    this.init()
  }
}
