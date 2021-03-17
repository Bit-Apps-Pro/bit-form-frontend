/* eslint-disable no-undef */
import { __ } from '../../../Utils/i18nwrap'
import noData from '../../../resource/img/nodata.svg'
import { dateTimeFormatter } from '../../../Utils/Helpers'

export default function RazorpayInfo({ paymentInfo }) {
  const dateTimeFormat = `${bits.dateFormat} ${bits.timeFormat}`

  const renderRazorpayInfo = payInfo => {
    const paypalResp = JSON.parse(payInfo.payment_response)
    const createdatToMiliSeconds = paypalResp.created_at * 1000
    return (
      <div key={paypalResp.id}>
        <small>
          {dateTimeFormatter(createdatToMiliSeconds, dateTimeFormat)}
        </small>
        <br />
        <br />
        <small>{`${__('Status', 'bitform')}: ${paypalResp.status}`}</small>
        <br />
        <br />
        <small>
          <b>{`${__('Transaction ID', 'bitform')}: ${paypalResp.id}`}</b>
        </small>
        <br />
        <br />
        {/* <h3>{`${userInfo.name.given_name} ${userInfo.name.surname}`}</h3> */}
        <small>{`${__('Email', 'bitform')}: ${paypalResp.email}`}</small>
        <br />
        <br />
        <small>{`${__('Contact', 'bitform')}: ${paypalResp.contact}`}</small>
        <br />
        <p>
          {__('Total Paid', 'bitform')}
          :
          {' '}
          {paypalResp.amount / 100}
          {' '}
          {paypalResp.currency}
        </p>
      </div>
    )
  }

  return (
    <div>
      {paymentInfo?.length
        ? (
          <>
            <h1>{__('Razorpay', 'bitform')}</h1>
            {paymentInfo.map(payInfo => renderRazorpayInfo(payInfo))}
          </>
        )
        : <img src={noData} alt={__('no data found', 'bitform')} style={{ height: 150, width: '100%' }} />}
    </div>
  )
}
