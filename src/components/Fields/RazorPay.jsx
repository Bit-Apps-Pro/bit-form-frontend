import { useContext, useEffect, useState } from 'react'
import { AppSettings } from '../../Utils/AppSettingsContext'
import bitsFetch from '../../Utils/bitsFetch'
import { loadScript, observeElement, select } from '../../Utils/globalHelpers'

export default function RazorPay({ fieldKey, contentID, formID, attr, buttonDisabled, resetFieldValue, isFrontend }) {
  const appSettingsContext = useContext(AppSettings)
  const [amount, setAmount] = useState(attr.options.amount)
  const [prefillName, setPrefillName] = useState('')
  const [prefillEmail, setPrefillEmail] = useState('')
  const [prefillContact, setPrefillContact] = useState('')
  const isSubscription = attr.payType === 'subscription'

  useEffect(() => {
    setAmount(attr.options.amount)
  }, [attr.options.amount])

  useEffect(() => {
    loadRazorpayScript()
    setDefaultValues()
    obsrvPymntAttr()
  }, [])

  useEffect(() => {
    if (resetFieldValue) {
      const razorpayField = document.getElementById('razorpayfield')
      if (razorpayField) {
        razorpayField.remove()
      }
    }
  }, [resetFieldValue])

  const loadRazorpayScript = async () => {
    if (!document.getElementById('razorpaysrc')) {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js', 'razorpaysrc')
      if (!res) {
        // eslint-disable-next-line no-console
        console.warn('Is your internet working properly to load razorpay script?')
        loadRazorpayScript()
      }
    }
  }

  const setDefaultValues = () => {
    const dynamicFlds = [
      ['amountFld', setAmount],
      ['prefillNameFld', setPrefillName, 'prefill'],
      ['prefillEmailFld', setPrefillEmail, 'prefill'],
      ['prefillContactFld', setPrefillContact, 'prefill'],
    ]

    dynamicFlds.map(dynFld => {
      const fldName = dynFld[2] ? attr.options[dynFld[2]][dynFld[0]] : attr.options[dynFld[0]]
      if (fldName) {
        const fld = select(`[name="${fldName}"]`)
        if (fld) {
          const { value } = fld
          console.log({ value })
          if (value) dynFld[1](value)
        }
      }
    })
  }

  const obsrvPymntAttr = () => {
    if (attr.options.amountFld) {
      const amntField = select(`[name="${attr.options.amountFld}"]`)
      if (amntField) {
        observeElement(amntField, 'value', (oldVal, newVal) => setAmount(newVal))
      }
    }
    if (attr.options.prefill.prefillNameFld) {
      const nameField = select(`[name="${attr.options.prefill.prefillNameFld}"]`)
      if (nameField) {
        observeElement(nameField, 'value', (oldVal, newVal) => setPrefillName(newVal))
      }
    }
    if (attr.options.prefill.prefillEmailFld) {
      const emailField = select(`[name="${attr.options.prefill.prefillEmailFld}"]`)
      if (emailField) {
        observeElement(emailField, 'value', (oldVal, newVal) => setPrefillEmail(newVal))
      }
    }
    if (attr.options.prefill.prefillContactFld) {
      const contactField = select(`[name="${attr.options.prefill.prefillContactFld}"]`)
      if (contactField) {
        observeElement(contactField, 'value', (oldVal, newVal) => setPrefillContact(newVal))
      }
    }
  }

  const paymentHandler = response => {
    const form = document.getElementById(`form-${contentID}`)
    if (typeof form !== 'undefined' && form !== null) {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', fieldKey)
      input.setAttribute('id', 'razorpayfield')
      input.setAttribute('value', response.razorpay_payment_id)
      form.appendChild(input)
      const submitBtn = form.querySelector('button[type="submit"]')
      submitBtn.click()
      const paymentParams = {
        formID,
        fieldKey,
        transactionID: response.razorpay_payment_id,
        payment_type: isSubscription ? 'subscription' : 'order',
      }
      bitsFetch(paymentParams, 'bitforms_save_razorpay_details')
    }
  }

  const displayRazorpay = () => {
    let key = ''
    const razorpayFld = document.getElementById(`razorpay-client-${fieldKey}`)
    if (razorpayFld) {
      const razorpayClient = razorpayFld?.getAttribute('razorpay-client-key')
      if (!razorpayClient) return false
      key = atob(razorpayClient)
    } else {
      const payInteg = appSettingsContext?.payments?.find(pay => pay.id && attr.options.payIntegID && Number(pay.id) === Number(attr.options.payIntegID))
      if (!payInteg) return false
      key = payInteg.apiKey
    }

    const { currency, name, description, theme, modal, notes } = attr.options
    // eslint-disable-next-line camelcase
    const { confirm_close } = modal

    const options = {
      key,
      amount: Number(amount) * 100,
      currency,
      name,
      description,
      theme,
      notes,
      modal: {
        backdropclose: false,
        escape: false,
        confirm_close,
      },
      prefill: {
        name: prefillName,
        email: prefillEmail,
        contact: prefillContact,
      },
      handler: async response => paymentHandler(response),
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <div className={`drag fld-wrp fld-wrp-${formID} ${attr.valid.hide ? 'btcd-hidden' : ''}`}>
      <div className={`btcd-frm-sub ${attr.align === 'center' && 'j-c-c'} ${attr.align === 'right' && 'j-c-e'}`}>
        <button
          className={`btcd-sub-btn btcd-sub ${attr.btnSiz === 'md' && 'btcd-btn-md'} ${attr.fulW && 'ful-w'}`}
          disabled={buttonDisabled}
          type="button"
          onClick={displayRazorpay}
        >
          {attr.btnTxt}
        </button>
      </div>
    </div>
  )
}
