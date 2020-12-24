import { useEffect, useState } from 'react'
import bitsFetch from '../Utils/bitsFetch'

export default function FormEntryPayments({ formID, allLabels, rowDtl, settab }) {
  const [paymentInfo, setPaymentInfo] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const payPattern = /paypal/
  const paymentFields = allLabels.filter(label => label.type.match(payPattern))
  const payFld = paymentFields.find(field => rowDtl[field.key])
  useEffect(() => {
    settab('payment')
    setIsLoading(true)

    const transactionID = rowDtl[payFld.key]
    console.log('transaction', transactionID)
    bitsFetch({ formID, transactionID }, 'bitforms_payment_details')
      .then(result => {
        console.log('payment details', result)
        setPaymentInfo(result.data)
        setIsLoading(false)
      })
  }, [])


  const renderPaymentInfo = () => {

  }







  console.log('payment', formID, allLabels, rowDtl)
  return (
    <h1>hi</h1>
  )
}
