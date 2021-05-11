import { useContext, useEffect, useState } from 'react'
import { AppSettings } from '../../Utils/AppSettingsContext'
import bitsFetch from '../../Utils/bitsFetch'
import { loadScript } from '../../Utils/Helpers'

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

  useEffect(() => loadRazorpayScript(), [])

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

  const amountFld = document.getElementsByName(attr.options.amountFld)[0]
  amountFld?.addEventListener('change', e => setAmount(e.target.value))

  const prefillNameFld = document.getElementsByName(attr.options.prefill.prefillNameFld)[0]
  prefillNameFld?.addEventListener('change', e => setPrefillName(e.target.value))

  const prefillEmailFld = document.getElementsByName(attr.options.prefill.prefillEmailFld)[0]
  prefillEmailFld?.addEventListener('change', e => setPrefillEmail(e.target.value))

  const prefillContactFld = document.getElementsByName(attr.options.prefill.prefillContactFld)[0]
  prefillContactFld?.addEventListener('change', e => setPrefillContact(e.target.value))

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
      amount: amount * 100,
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
  console.log('======== razor', attr.valid)
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
