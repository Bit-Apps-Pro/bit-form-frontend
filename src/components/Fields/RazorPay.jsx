import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { $payments } from '../../GlobalStates/AppSettingsStates'
import bitsFetchFront from '../../Utils/bitsFetchFront'
import { loadScript, select } from '../../Utils/globalHelpers'
import { isFormValidatedWithoutError } from '../../user-frontend/frontendHelpers'
import InputWrapper from '../InputWrapper'

export default function RazorPay({
  fieldKey, contentID, formID, attr, buttonDisabled, resetFieldValue, isFrontend, handleFormValidationErrorMessages,
}) {
  const payments = useAtomValue($payments)
  const [clientID, setClientID] = useState('')
  const [amount, setAmount] = useState(attr.options.amount || 1)
  const [prefillName, setPrefillName] = useState('')
  const [prefillEmail, setPrefillEmail] = useState('')
  const [prefillContact, setPrefillContact] = useState('')
  const isSubscription = attr.payType === 'subscription'

  useEffect(() => {
    setAmount(attr.options.amount)
  }, [attr.options.amount])

  useEffect(() => {
    loadRazorpayScript()
    setDefaultValues(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let key = ''
    if (typeof bitFormsFront !== 'undefined') {
      // eslint-disable-next-line no-undef
      key = atob(bitFormsFront?.paymentKeys?.razorpayKey || '')
    } else if (typeof bits !== 'undefined') {
      const payInteg = payments?.find(pay => pay.id && attr.payIntegID && Number(pay.id) === Number(attr.payIntegID))
      if (!payInteg) return false
      key = payInteg.apiKey
    }
    setClientID(key)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attr.payIntegID])

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
      const src = 'https://checkout.razorpay.com/v1/checkout.js'
      const srcData = {
        src,
        integrity: 'sha256-WaK8tHBbvmUh/aQh4KOXqmWuNplM3g9ygIfpkPkb+aw=',
        id: 'razorpaysrc',
        scriptInGrid: false,
      }
      const res = await loadScript(srcData)
      if (!res) {
        // eslint-disable-next-line no-console
        console.warn('Is your internet working properly to load razorpay script?')
        loadRazorpayScript()
      }
    }
  }

  const setDefaultValues = (isInitial) => {
    const dynamicFlds = {
      amountFld: [setAmount],
      prefillNameFld: [setPrefillName, 'prefill'],
      prefillEmailFld: [setPrefillEmail, 'prefill'],
      prefillContactFld: [setPrefillContact, 'prefill'],
    }

    Object.entries(dynamicFlds).map(dynFld => {
      const fldName = dynFld[1][1] ? attr.options[dynFld[1][1]][dynFld[0]] : attr.options[dynFld[0]]
      if (fldName) {
        let fld = select(`[name="${fldName}"]`)
        if (fld?.type === 'radio') {
          fld = select(`[name="${fldName}"]:checked`)
        }
        if (fld) {
          const { value } = fld
          if (isInitial) {
            dynFld[1][0](value)
          }
          if (dynFld[1][1]) {
            dynamicFlds[dynFld[0]][2] = value
          } else {
            dynamicFlds[dynFld[0]][1] = value
          }
        }
      }
    })
    return dynamicFlds
  }

  const paymentHandler = response => {
    const formParent = document.getElementById(`${contentID}`)
    formParent.classList.add('pos-rel', 'form-loading')
    const form = document.getElementById(`form-${contentID}`)
    if (typeof form !== 'undefined' && form !== null) {
      const input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', fieldKey)
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
        fieldKey,
        transactionID: response.razorpay_payment_id,
        payment_type: isSubscription ? 'subscription' : 'order',
      }
      bitsFetchFront(paymentParams, 'bitforms_save_razorpay_details')
        .then(() => formParent.classList.remove('pos-rel', 'form-loading'))
    }
  }

  const displayRazorpay = () => {
    const dynValues = setDefaultValues()
    const { currency, name, description, theme, modal, notes } = attr.options
    // eslint-disable-next-line camelcase
    const { confirm_close } = modal

    const options = {
      key: clientID,
      amount: Number(dynValues.amountFld[1] || amount) * 100,
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
        name: dynValues.prefillNameFld[2] || prefillName,
        email: dynValues.prefillEmailFld[2] || prefillEmail,
        contact: dynValues.prefillContactFld[2] || prefillContact,
      },
      handler: async response => paymentHandler(response),
    }

    isFormValidatedWithoutError(contentID, handleFormValidationErrorMessages)
      .then(() => {
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
      })
      .catch(() => false)
  }

  return (
    <InputWrapper
      formID={formID}
      fieldData={attr}
      noLabel
    >
      {clientID && (
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
      )}
      {!attr.payIntegID && (
        <p>Select a config from field settings to render the Razorpay.</p>
      )}
    </InputWrapper>
  )
}
