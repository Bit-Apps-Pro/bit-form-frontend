/* eslint-disable no-undef */
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { __ } from '../../Utils/i18nwrap'
import bitsFetch from '../../Utils/bitsFetch'
import Loader from '../Loaders/Loader'
import PaypalInfo from './PaymentInfo/PaypalInfo'
import RazorpayInfo from './PaymentInfo/RazorpayInfo'
import { _fieldLabels } from '../../GlobalStates'

export default function FormEntryPayments({ formID, rowDtl, settab }) {
  const allLabels = useRecoilValue(_fieldLabels)

  const isPro = typeof bits !== 'undefined' && bits.isPro
  const [paymentInfo, setPaymentInfo] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const payPattern = /paypal|razorpay/
  const paymentFields = allLabels.filter(label => label.type.match(payPattern))
  const payFld = paymentFields.find(field => rowDtl[field.key])
  useEffect(() => {
    settab('payment')
    if (isPro) {
      setIsLoading(true)
      const transactionID = rowDtl?.[payFld?.key]
      bitsFetch({ formID, transactionID }, 'bitforms_payment_details')
        .then(result => {
          setPaymentInfo(result.data)
          setIsLoading(false)
        })
    }
  }, [])

  const showPaymentInfo = () => {
    switch (payFld?.type) {
      case 'paypal':
        return <PaypalInfo paymentInfo={paymentInfo} />
      case 'razorpay':
        return <RazorpayInfo paymentInfo={paymentInfo} />
      default:
        return <h1>{__('No Payment Info Found!', 'bitform')}</h1>
    }
  }

  return (
    <div className="pos-rel">
      {!isPro && (
        <div className="pro-blur mt-4 flx">
          <div className="pro">
            {__('Available On', 'bitform')}
            <a href="https://bitpress.pro/" target="_blank" rel="noreferrer">
              <span className="txt-pro">
                {' '}
                {__('Premium', 'bitform')}
              </span>
            </a>
          </div>
        </div>
      )}
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
