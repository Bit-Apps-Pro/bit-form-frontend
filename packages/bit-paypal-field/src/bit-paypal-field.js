const formSelector = '.bf-form'

export default class BitPayPalField {
  #paypalWrpSelector = ''

  #config = {
    namespace: 'paypal',
    payType: 'payment',
    currency: 'USD',
    amount: 1,
    shipping: 0,
    tax: 0,
    style: {
      label: 'paypal',
      color: 'gold',
      shape: 'rect',
      layout: 'vertical',
    },
  }

  constructor(selector, config) {
    Object.assign(this.#config, config)

    this.#paypalWrpSelector = selector

    this.init()
  }

  init() {
    const { namespace } = this.#config
    const paypal = window[namespace]

    const btnProps = { style: this.#getStyles() }

    if (this.#isStandalone()) {
      btnProps.fundingSource = paypal.FUNDING[this.#config.style.payBtn]
    }

    if (this.#isSubscription()) {
      btnProps.createSubscription = (data, actions) => this.#createSubscriptionHandler(data, actions)
    } else {
      btnProps.createOrder = (data, actions) => this.#createOrderHandler(data, actions)
    }
    btnProps.onClick = () => this.#handleOnClick(this.#getContentId())
    btnProps.onApprove = (data, actions) => this.#onApproveHanlder(data, actions)

    if (this.#config.onInit) {
      btnProps.onInit = this.#config.onInit
    }

    if (paypal) paypal.Buttons(btnProps).render(this.#paypalWrpSelector)
  }

  #isSubscription() { return this.#config.payType === 'subscription' }

  #isStandalone() { return this.#config.style.layout === 'standalone' }

  #getContentId() { return this.#config.contentId }

  #createSubscriptionHandler(_, action) {
    if (typeof validateForm !== 'undefined' && !validateForm({ form: this.#getContentId() })) throw new Error('form validation is failed!')
    return action.subscription.create({ plan_id: this.#config.planId })
  }

  #handleOnClick(contentId) {
    return isFormValidatedWithoutError(contentId, handleFormValidationErrorMessages)
      .then(() => true)
      .catch(() => false)
  }

  #onApproveHanlder(_, actions) {
    const formParent = document.getElementById(`${this.#getContentId()}`)
    formParent.classList.add('pos-rel', 'form-loading')
    const order = this.#isSubscription() ? actions.subscription.get() : actions.order.capture()
    order.then(result => {
      const form = document.getElementById(`form-${this.#getContentId()}`)
      const formID = this.#getContentId()?.split('_')[1]
      if (typeof form !== 'undefined' && form !== null) {
        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', this.#config.fieldKey)
        input.setAttribute('id', 'paypalfield')
        input.setAttribute('value', result.id)
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
          transactionID: result.id,
          payment_name: 'paypal',
          payment_type: this.#isSubscription() ? 'subscription' : 'order',
          payment_response: result,
        }
        // bitsFetchFront(paymentParams, 'bitforms_payment_insert')
        //   .then(() => formParent.classList.remove('pos-rel', 'form-loading'))
        const uri = new URL(bf_globals[this.#getContentId()]?.ajaxURL)
        uri.searchParams.append('_ajax_nonce', bf_globals[this.#getContentId()]?.nonce)
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
        })
      }
    })
  }

  #select(selector, elm) {
    return document.querySelector(elm)?.querySelector(selector)
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

  #createOrderHandler(_, action) {
    const { currency, amount, shipping, tax } = this.#config
    const amountVal = this.#getDynamicValue(this.#config.amountFld) || amount
    const shippingVal = this.#getDynamicValue(this.#config.shippingVal) || shipping
    const taxVal = this.#getDynamicValue(this.#config.taxVal) || tax

    const orderAmount = Number(amountVal).toFixed(2) * 1
    const shippingAmount = Number(shippingVal).toFixed(2) * 1
    const taxAmount = ((Number(taxVal) * orderAmount) / 100).toFixed(2) * 1
    const totalAmount = (orderAmount + shippingAmount + taxAmount).toFixed(2) * 1
    return action.order.create({
      purchase_units: [{
        description: this.#getDynamicValue(this.#config.descFld) || this.#config.description,
        amount:
        {
          currency_code: currency,
          value: totalAmount,
          breakdown:
          {
            item_total: { currency_code: currency, value: orderAmount },
            shipping: { currency_code: currency, value: shippingAmount },
            tax_total: { currency_code: currency, value: taxAmount },
          },
        },
      }],
    })
  }

  #getStyles() {
    const { label, color, shape, layout, height } = this.#config.style

    const style = {
      label: this.#isSubscription() ? 'subscribe' : label,
      color,
      shape,
    }
    if (!this.#isStandalone()) style.layout = layout
    if (height !== undefined) style.height = Number(height)

    return style
  }

  destroy() {
    this.#paypalWrpSelector.innerHTML = ''
    // Object.keys(window).forEach((key) => {
    //   if (/paypal|zoid|post_robot/.test(key)) {
    //     delete window[key]
    //   }
    // })
  }

  reset() {
    this.destroy()
    this.init()
  }
}

// const payPalField = new PayPalField('#paypal-wrp', {
//   namespace: 'paypal',
//   payType: 'payment', // payment, subscription
//   currency: 'USD',
//   description: '',
//   // amount: 15,
//   amountFld: 'bf-amount',
//   shipping: 0,
//   tax: 0,
//   style: {
//     color: 'gold',
//     shape: 'rect',
//     layout: 'vertical',
//     // payBtn: 'PAYPAL'
//   },
// })
