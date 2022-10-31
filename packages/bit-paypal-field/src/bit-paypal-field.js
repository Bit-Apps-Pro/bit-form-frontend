export default class BitPayPalField {
  #paypalWrpSelector = ''

  #formSelector = ''

  #responseData = null

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
    this.#formSelector = `#form-${this.#getContentId()}`

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
    btnProps.onApprove = (data, actions) => this.#onApproveHandler(data, actions)

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
    const form = bfSelect(this.#formSelector)
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
          .then((token) => {
            formData.append('g-recaptcha-response', token)
            const submitResp = this.#bfSubmitFetch(props?.ajaxURL, formData, update)
            return this.#submitResponse(submitResp, contentId, formData)
          })
      })
    } else {
      const submitResp = this.#bfSubmitFetch(props?.ajaxURL, formData, update)
      return this.#submitResponse(submitResp, contentId, formData)
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

  #submitResponse(resp, contentId, formData) {
    resp
      .then(
        (response) => new Promise((resolve, reject) => {
          if (response.staus > 400) {
            const errorEvent = new CustomEvent('bf-form-submit-error', {
              detail: { formId: contentId, errors: result.data },
            })
            bfSelect(`#form-${contentId}`).dispatchEvent(errorEvent)
            response.staus === 500
              ? reject(new Error('Mayebe Internal Server Error'))
              : reject(response.json())
          } else resolve(response.json())
        }),
      )
      .then((result) => {
        const successEvent = new CustomEvent('bf-form-submit-success', {
          detail: { formId: contentId, entryId: result.entryId, formData },
        })
        bfSelect(`#form-${contentId}`).dispatchEvent(successEvent)
        this.#responseData = result.data
        if (result !== undefined && result.success) {
          this.#setEntryId(result.data.entry_id)
          return true
        }
        const errorEvent = new CustomEvent('bf-form-submit-error', {
          detail: { formId: contentId, errors: result.data },
        })
        bfSelect(`#form-${contentId}`).dispatchEvent(errorEvent)
        return false
      })
      .catch((error) => {
        const err = error?.message ? error.message : 'Unknown Error'
        return false
      })
  }

  #onApproveHandler(_, actions) {
    const formParent = document.getElementById(`${this.#getContentId()}`)
    formParent.classList.add('pos-rel', 'form-loading')
    const order = this.#isSubscription() ? actions.subscription.get() : actions.order.capture()
    order.then(result => {
      const form = document.getElementById(`form-${this.#getContentId()}`)
      const formID = this.#getContentId()?.split('_')[1]
      if (typeof form !== 'undefined' && form !== null) {
        const paymentParams = {
          formID,
          transactionID: result.id,
          payment_name: 'paypal',
          payment_type: this.#isSubscription() ? 'subscription' : 'order',
          payment_response: result,
          entry_id: this.#getEntryId(),
          fieldKey: this.#config.namespace,
        }
        const props = bf_globals[this.#getContentId()]
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
          this.#responseRedirect()
          this.#handleReset(this.#getContentId())
        })
      }
    })
  }

  #handleReset(contentId, customHook = false) {
    if (customHook) {
      const resetEvent = new CustomEvent('bf-form-reset', {
        detail: { formId: contentId },
      })
      bfSelect(`#form-${contentId}`).dispatchEvent(resetEvent)
    }

    const props = window.bf_globals[contentId]
    bfSelect(`#form-${contentId}`).reset()
    localStorage.setItem('bf-entry-id', '')
    typeof customFieldsReset !== 'undefined' && customFieldsReset(props)

    if (props.gRecaptchaSiteKey && props.gRecaptchaVersion === 'v2') {
      resetCaptcha()
    }
  }

  #responseRedirect() {
    const responsedRedirectPage = this.#responseData.redirectPage
    let hitCron = null
    let newNonce = ''
    if (this.#responseData.cron) {
      hitCron = this.#responseData.cron
    }
    if (this.#responseData.cronNotOk) {
      hitCron = this.#responseData.cronNotOk
    }
    if (this.#responseData.new_nonce) {
      newNonce = this.#responseData.new_nonce
    }

    this.#triggerIntegration(hitCron, newNonce, this.#getContentId())
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

  #select(selector, elm) {
    return document.querySelector(elm)?.querySelector(selector)
  }

  #getDynamicValue(fldName) {
    let elm = this.#select(`[name="${fldName}"]`, this.#formSelector)
    if (elm) {
      if (elm.type === 'radio') {
        elm = this.#select(`[name="${fldName}"]:checked`, this.#formSelector)
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
