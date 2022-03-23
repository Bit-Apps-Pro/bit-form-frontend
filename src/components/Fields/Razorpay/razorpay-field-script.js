const formSelector = '.bf-form'

class Razorpay {
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

  constructor(selector, config) {
    Object.assign(this.#config, config)
    if (typeof selector === 'string') {
      this.#razorpayWrapper = document.querySelector(selector)
    } else {
      this.#razorpayWrapper = selector
    }
    this.init()
  }

  init() {
    this.#addEvent(this.#select(`.${this.#config.fieldKey}-razorpay-btn`), 'click', () => { this.#displayRazorpay() })
  }

  #select(selector, elm) {
    if (elm) return document.querySelector(elm).querySelector(selector)
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
      handler: async response => onPaymentSuccess(response),
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  destroy() {
    this.#razorpayWrapper.innerHTML = ''
  }
}

export default Razorpay

// const razorpayFld = new Razorpay('.razorpay-wrp', {
//   clientId: 'rzp_test_Sw0MZlz8H4gPfa',
//   options: {
//     name: 'Test Razorpay',
//     description: 'wowowowowowo',
//     amount: 1,
//     amountType: 'dynamic',
//     amountFld: 'bf-2',
//     theme: { color: 'RED', backdrop_color: 'BLUE' },
//     prefill: {
//       name: 'bf-1',
//     },
//     modal: { confirm_close: false }
//   },
//   onPaymentSuccess: resp => { console.log('success') },
//   onPaymentFailed: () => { console.log('failed') }
// })
