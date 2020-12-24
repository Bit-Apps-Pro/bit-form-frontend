import { __ } from '@wordpress/i18n'
import { useEffect, useState } from 'react'
import bitsFetch from '../../Utils/bitsFetch'
import Loader from '../Loaders/Loader'
import PaypalInfo from './PaymentInfo/PaypalInfo'

export default function FormEntryPayments({ formID, allLabels, rowDtl, settab }) {
  const [paymentInfo, setPaymentInfo] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const payPattern = /paypal/
  const paymentFields = allLabels.filter(label => label.type.match(payPattern))
  const payFld = paymentFields.find(field => rowDtl[field.key])
  useEffect(() => {
    settab('payment')
    setIsLoading(true)
    const transactionID = rowDtl?.[payFld?.key]
    bitsFetch({ formID, transactionID }, 'bitforms_payment_details')
      .then(result => {
        setPaymentInfo(result.data)
        setIsLoading(false)
      })
  }, [])

  const showPaymentInfo = () => {
    if (payFld?.type === 'paypal') {
      return (
        <PaypalInfo
          paymentInfo={paymentInfo}
        />
      )
    }
    return <h1>{__('No Payment Info Found!', 'bitform')}</h1>;
  }

  return (
    <div>
      {isLoading ? (
        <Loader style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 70,
          transform: 'scale(0.7)',
        }}
        />
      ) : showPaymentInfo()}
    </div>
  )
}
