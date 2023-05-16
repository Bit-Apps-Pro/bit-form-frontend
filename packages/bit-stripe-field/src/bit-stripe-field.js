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

  constructor(selector, config) {
    // check config string or object
    const conf = typeof config === 'string' ? JSON.parse(config) : config
    Object.assign(this.#config, conf)
    console.log({ selector, conf }, this.#config)

    this.#stripeWrpSelector = selector
    this.#publishableKey = this.#config.publishableKey
    this.#options = this.#config.options
    this.#contentId = this.#config.contentId
    this.#payIntegID = this.#config.payIntegID
    this.#fieldKey = this.#config.fieldKey
    console.log(this.#options)
    this.init()
  }

  init() {
    this.#initField()
    // this.#submitPayment()
    this.#checkStatus()
  }

  #initField() {
    const { Stripe } = window
    const stripeBtn = document.querySelector(`.${this.#fieldKey}-stripe-btn`)
    console.log({ stripeBtn })
    if (Stripe) {
      this.#stripInstance = Stripe(this.#publishableKey)
      const data = {
        payIntegID: this.#payIntegID,
      }
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

          // const linkAuthenticationElement = elements.create('linkAuthentication')
          // linkAuthenticationElement.mount('#link-authentication-element')

          // const paymentElementOptions = {
          //   layout: 'tabs',
          // }

          // console.log(this.#config)

          const paymentElement = this.#elements.create('payment', this.#options.layout)
          paymentElement.mount(this.#stripeWrpSelector)
        }).then(() => {
          const payNowBtn = document.createElement('button')
          payNowBtn.innerText = 'Pay Now'
          payNowBtn.classList.add('strip-pay-btn')
          payNowBtn.setAttribute('id', 'pay-now-btn')
          payNowBtn.setAttribute('type', 'button')
          this.#stripeWrpSelector.insertAdjacentElement('beforeend', payNowBtn)
          this.#submitPayment()
        })
      // console.log({ apiResponse })
      // const elements = stripInstance.elements({ ...this.#options, loader: 'never' })
      // console.log('publishableKey', this.#publishableKey, { ...this.#options, loader: 'never' })
      // const paymentElement = elements.create('payment')
      // paymentElement.mount(this.#stripeWrpSelector)
    }

    stripeBtn.addEventListener('click', () => {
      this.#stripeWrpSelector.classList.remove('d-none')
    })
  }

  #submitPayment() {
    const submitBtn = document.querySelector('#pay-now-btn')
    const elements = this.#elements
    console.log({ elements, submitBtn })
    submitBtn?.addEventListener('click', () => {
      console.log({ submitBtn })
      const response = this.#stripInstance.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          // return_url: "http://localhost:4242/checkout.html",
          return_url: window.location.href,
          // receipt_email: emailAddress,
        },
      }).then(res => console.log({ res }))
    })
  }

  #checkStatus() {
    (async function () {
      const clientSecret = new URLSearchParams(window.location.search).get(
        'payment_intent_client_secret',
      )

      if (!clientSecret) {
        return
      }

      const { paymentIntent } = await this.#stripInstance.retrievePaymentIntent(clientSecret)

      switch (paymentIntent.status) {
        case 'succeeded':
          console.log('Payment succeeded!')
          break
        case 'processing':
          console.log('Your payment is processing.')
          break
        case 'requires_payment_method':
          console.log('Your payment was not successful, please try again.')
          break
        default:
          console.log('Something went wrong.')
          break
      }
    }())
  }

  // #addEvent(selector, eventType, cb) {
  //   selector.addEventListener(eventType, cb)
  // }

  destroy() {
    this.#stripeWrpSelector.innerHTML = ''
  }

  reset() {
    this.destroy()
    this.init()
  }
}
