/* eslint-disable react/jsx-props-no-spreading */
import { FUNDING, PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useContext, useEffect, useState } from 'react';
import { AppSettings } from '../../Utils/AppSettingsContext';
import bitsFetch from '../../Utils/bitsFetch';

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
    obsrvPymntAttr()
  }, [attr.payIntegID])

  useEffect(() => {
    if (resetFieldValue) {
      const paypalField = document.getElementById('paypalfield')
      if (paypalField) {
        paypalField.remove()
      }
    }
  }, [resetFieldValue])

/*   const amountFld = document.getElementsByName(attr?.amountFld)[0]
  amountFld?.addEventListener('change', e => setAmount(e.target.value))

  const shippingFld = document.getElementsByName(attr?.shippingFld)[0]
  shippingFld?.addEventListener('change', e => setShipping(e.target.value))

  const taxFld = document.getElementsByName(attr?.taxFld)[0]
  taxFld?.addEventListener('change', e => setTax(e.target.value))

  const descFld = document.getElementsByName(attr?.descFld)[0]
  descFld?.addEventListener('change', e => setDescription(e.target.value)) */

  useEffect(() => {
    setrender(false)
    setTimeout(() => {
      setrender(true)
    }, 1);
  }, [clientID, attr.currency, attr.payType, attr.locale, attr.disableFunding])

  const createSubscriptionHandler = (data, actions) => actions.subscription.create({
    plan_id: attr?.planId,
  })

  const obsrvPymntAttr = () => {
    const fields = {}
    if (attr?.amountFld) {
      fields[attr?.amountFld] = { elm: document.getElementsByName(attr?.amountFld)[0], func: setAmount }
    }

    if (attr?.shippingFld) {
      fields[attr?.shippingFld] = { elm: document.getElementsByName(attr?.shippingFld)[0], func: setShipping }
    }

    if (attr?.taxFld) {
      fields[attr?.taxFld] = { elm: document.getElementsByName(attr?.taxFld)[0], func: setTax }
    }

    if (attr?.descFld) {
      fields[attr?.descFld] = { elm: document.getElementsByName(attr?.descFld)[0], func: setDescription }
    }
    const payAttrObserver = new MutationObserver((data) => {
      console.log('data', data.length, data[0].target.name, data[0].target.value)
      const obsrvdFld = fields[data[0].target.name]
      if (obsrvdFld) {
        obsrvdFld.func(data[0].target.value)
      }
      // setAmount(data[0].target.value)
    })
    console.log('fields', fields, fields.length)
    Object.keys(fields).map(elm => {
      console.log('elm', fields[elm].elm)
      payAttrObserver.observe(fields[elm].elm, { attributes: true, attributeFilter: ['value'] })
    })
  }

  const createOrderHandler = (data, actions) => {
    const orderAmount = Number(attr.amount || amount)
    const shippingAmount = Number(attr.shipping || shipping)
    const taxAmount = (Number(attr.tax || tax) * orderAmount) / 100
    const totalAmount = orderAmount + shippingAmount + taxAmount
    return actions.order.create({
      purchase_units: [{
        description: attr.description || description,
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
  // console.clear()
  console.log('==================')
  console.log('amount', amount)
  console.log('==================')
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
        {(render && clientID) && (
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
        )}
      </div>
    </div>
  )
}

export default Paypal
