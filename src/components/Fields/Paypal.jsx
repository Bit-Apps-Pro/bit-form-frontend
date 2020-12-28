/* eslint-disable react/jsx-props-no-spreading */
import { FUNDING, PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useEffect, useState } from 'react';
import bitsFetch from '../../Utils/bitsFetch';

function Paypal({ formID, attr, contentID, fieldData }) {
  const [render, setrender] = useState(false)
  const [amount, setAmount] = useState(attr?.amount || 1)
  const [shipping, setShipping] = useState(attr?.shipping || 0)
  const [tax, setTax] = useState(attr?.tax || 0)
  const [description, setDescription] = useState(attr?.description || '')
  const { currency } = attr
  const isSubscription = attr.payType === 'subscription'
  const isStandalone = attr.style.layout === 'standalone'

  const amountFld = document.getElementsByName(attr?.amountFld)[0]
  amountFld?.addEventListener('change', e => setAmount(e.target.value))

  const shippingFld = document.getElementsByName(attr?.shippingFld)[0]
  shippingFld?.addEventListener('change', e => setShipping(e.target.value))

  const taxFld = document.getElementsByName(attr?.taxFld)[0]
  taxFld?.addEventListener('change', e => setTax(e.target.value))

  const descFld = document.getElementsByName(attr?.descFld)[0]
  descFld?.addEventListener('change', e => setDescription(e.target.value))

  useEffect(() => {
    setrender(false)
    setTimeout(() => {
      setrender(true)
    }, 1);
  }, [attr.clientId, attr.currency, attr.payType, attr.locale, attr.disableFunding])

  const createSubscriptionHandler = (data, actions) => actions.subscription.create({
    plan_id: attr?.planId,
  })

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
      if (typeof (form) != 'undefined' && form != null) {
        const paypalFieldKey = Object.keys(fieldData).find(fieldKey => fieldData[fieldKey].typ === 'paypal')
        const input = document.createElement('input')
        input.setAttribute('type', 'hidden')
        input.setAttribute('name', paypalFieldKey)
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
    <div className={`drag fld-wrp fld-wrp-${formID}`}>
      <div
        style={{
          width: 'auto',
          minWidth: 150,
          maxWidth: 750,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {render && (
          <PayPalScriptProvider
            options={{
              'client-id': attr.clientId || 'sb',
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
