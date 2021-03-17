/* eslint-disable no-undef */
import { __ } from '../../../Utils/i18nwrap'
import noData from '../../../resource/img/nodata.svg'
import { dateTimeFormatter } from '../../../Utils/Helpers'

export default function PaypalInfo({ paymentInfo }) {
  const dateTimeFormat = `${bits.dateFormat} ${bits.timeFormat}`

  const renderPaypalInfo = payInfo => {
    const paypalResp = JSON.parse(payInfo.payment_response)
    const isSubscription = 'subscriber' in paypalResp
    const userInfo = isSubscription ? paypalResp.subscriber : paypalResp.payer
    const amountInfo = isSubscription ? paypalResp.billing_info.last_payment.amount : paypalResp.purchase_units[0].amount
    return (
      <div key={paypalResp.id}>
        <small>
          {dateTimeFormatter(paypalResp.create_time, dateTimeFormat)}
        </small>
        <br />
        <br />
        <small>
          {`${__('Type', 'bitform')}: ${isSubscription ? __('Subscription', 'biform') : __('Order', 'bitform')}`}
        </small>
        <br />
        <br />
        <small>
          <b>{`${__('Transaction ID', 'bitform')}: ${paypalResp.id}`}</b>
        </small>
        <h3>{`${userInfo.name.given_name} ${userInfo.name.surname}`}</h3>
        <small>{userInfo.email_address}</small>
        {isSubscription && (
          <h4>{`${__('Plan ID', 'bitform')}: ${paypalResp.plan_id}`}</h4>
        )}
        {isSubscription && (
          <small>
            {__('Next Billing Time', 'bitform')}
            :
            {' '}
            {dateTimeFormatter(paypalResp.billing_info.next_billing_time, dateTimeFormat)}
          </small>
        )}
        <p>
          {__('Total Paid', 'bitform')}
          :
          {' '}
          {amountInfo.value}
          {' '}
          {amountInfo.currency_code}
        </p>
      </div>
    )
  }

  return (
    <div>
      {paymentInfo?.length
        ? (
          <>
            <h1>{__('PayPal', 'bitform')}</h1>
            {paymentInfo.map(payInfo => renderPaypalInfo(payInfo))}
          </>
        )
        : <img src={noData} alt={__('no data found', 'bitform')} style={{ height: 150, width: '100%' }} />}
    </div>
  )
}
