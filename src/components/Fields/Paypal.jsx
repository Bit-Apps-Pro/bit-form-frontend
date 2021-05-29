/* eslint-disable react/jsx-props-no-spreading */
import { FUNDING, PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useContext, useEffect, useState } from 'react'
import { AppSettings } from '../../Utils/AppSettingsContext'
import bitsFetch from '../../Utils/bitsFetch'
import { select } from '../../Utils/globalHelpers'

function Paypal({ fieldKey, formID, attr, contentID, resetFieldValue, isBuilder }) {
  const appSettingsContext = useContext(AppSettings)
  const [clientID, setClientID] = useState('')
  const [render, setrender] = useState(false)
  const [amount, setAmount] = useState(attr?.amount || 1)
  const [shipping, setShipping] = useState(attr?.shipping || 0)
  const [tax, setTax] = useState(attr?.tax || 0)
  const [description, setDescription] = useState(attr?.description || '')
  const { currency } = attr
  const isSubscription = attr.payType === 'subscription'
  const isStandalone = attr.style.layout === 'standalone'

  const setDefaultValues = (isInitial) => {
    const dynamicFlds = {
      amountFld: [setAmount],
      shippingFld: [setShipping],
      taxFld: [setTax],
      descFld: [setDescription]
    }

    Object.entries(dynamicFlds).map(dynFld => {
      if (attr?.[dynFld[0]]) {
        console.log(attr?.[dynFld[0]])
        const fld = select(`[name="${attr[dynFld[0]]}"]`)
        if (fld) {
          const { value } = fld
          if (isInitial) {
            dynFld[1][0](value)
          }
          dynFld[1][1] = value
        }
      }
    })
    return dynamicFlds
  }

  useEffect(() => {
    let key = ''
    const payFld = document.getElementById(`paypal-client-${fieldKey}`)
    if (payFld) {
      const payClient = payFld?.getAttribute('paypal-client-key')
      if (payClient) {
        key = atob(payClient)
      }
    } else {
      const payInteg = appSettingsContext?.payments?.find(pay => pay.id && attr.payIntegID && Number(pay.id) === Number(attr.payIntegID))
      if (payInteg) {
        key = payInteg.clientID
      }
    }
    setClientID(key)
    setDefaultValues(1)
  }, [attr.payIntegID])

  useEffect(() => {
    if (resetFieldValue) {
      const paypalField = document.getElementById('paypalfield')
      if (paypalField) {
        paypalField.remove()
      }
    }
  }, [resetFieldValue])

  useEffect(() => {
    setrender(false)
    setTimeout(() => {
      setrender(true)
    }, 1)
  }, [clientID, attr.currency, attr.payType, attr.locale, attr.disableFunding])

  const createSubscriptionHandler = (data, actions) => actions.subscription.create({ plan_id: attr?.planId })

  const createOrderHandler = (data, actions) => {
    const dynValues = setDefaultValues()
    const orderAmount = Number(dynValues.amountFld[1] || amount)
    const shippingAmount = Number(dynValues.shippingFld[1] || shipping)
    const taxAmount = (Number(dynValues.taxFld[1] || tax) * orderAmount) / 100
    const totalAmount = (orderAmount + shippingAmount + taxAmount).toFixed(2)
    return actions.order.create({
      purchase_units: [{
        description: dynValues.descFld[1] || description,
        amount:
        {
          currency_code: attr.currency,
          value: totalAmount,
          breakdown:
          {
            item_total: { currency_code: attr.currency, value: orderAmount },
            shipping: { currency_code: attr.currency, value: shippingAmount },
            tax_total: { currency_code: attr.currency, value: taxAmount },
          },
        },
      }],
    })
  }

  const onApproveHanlder = (data, actions) => {
    const order = isSubscription ? actions.subscription.get() : actions.order.capture()
    order.then(result => {
      const form = document.getElementById(`form-${contentID}`)
      if (typeof form !== 'undefined' && form !== null) {
        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', fieldKey)
        input.setAttribute('id', 'paypalfield')
        input.setAttribute('value', result.id)
        form.appendChild(input)
        const submitBtn = form.querySelector('button[type="submit"]')
        submitBtn.click()
        const paymentParams = {
          formID,
          transactionID: result.id,
          payment_name: 'paypal',
          payment_type: isSubscription ? 'subscription' : 'order',
          payment_response: result,
        }
        bitsFetch(paymentParams, 'bitforms_payment_insert')
      }
    })
  }

  return (
    <div className={`drag fld-wrp fld-wrp-${formID} ${isBuilder ? 'o-h' : ''} ${attr.valid.hide ? 'btcd-hidden' : ''}`}>
      <div
        style={{
          width: 'auto',
          minWidth: 150,
          maxWidth: 750,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {(render && clientID) ? (
          <PayPalScriptProvider
            options={{
              'client-id': clientID,
              ...!isSubscription && { currency },
              ...isSubscription && { vault: true, intent: 'subscription' },
              ...attr?.locale && { locale: attr.locale },
              ...attr?.disableFunding && { 'disable-funding': attr.disableFunding },
            }}
          >
            <PayPalButtons
              style={{
                color: attr.style.color,
                shape: attr.style.shape,
                label: isSubscription ? 'subscribe' : attr.style.label,
                ...!isStandalone && { layout: attr.style.layout },
                ...attr.style?.height && { height: Number(attr.style.height) },
              }}
              {...isStandalone && { fundingSource: FUNDING[attr.style.payBtn] }}
              {...isSubscription
                ? { createSubscription: (data, actions) => createSubscriptionHandler(data, actions) }
                : { createOrder: (data, actions) => createOrderHandler(data, actions) }}
              onApprove={(data, actions) => onApproveHanlder(data, actions)}
              forceReRender={{ amount, lay: attr.style }}
            />
          </PayPalScriptProvider>
        ) : (!attr.payIntegID ? (
          <p>Select a config from field settings to render the PayPal.</p>
        ) : '')}
      </div>
    </div>
  )
}

export default Paypal
