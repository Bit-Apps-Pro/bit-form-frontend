import { useRecoilValue } from 'recoil'
import { __ } from '../../../Utils/i18nwrap'
import noData from '../../../resource/img/nodata.svg'
import { $bits } from '../../../GlobalStates/GlobalStates'
import { dateTimeFormatter } from '../../../Utils/Helpers'

const generateParsedInfo = info => {
  if (info?.payment_response) {
    return JSON.parse(info.payment_response)
  }

  return {}
}

export default function StripeInfo({ paymentInfo, payInfoFound }) {
  const bits = useRecoilValue($bits)
  const dateTimeFormat = `${bits.dateFormat} ${bits.timeFormat}`
  const stripeResp = generateParsedInfo(paymentInfo)

  return (
    <div>
      {payInfoFound.current === 1
        ? (
          <>
            <h1>{__('Stripe')}</h1>
            <div key={stripeResp.id}>
              <small>
                {dateTimeFormatter(stripeResp.created * 1000, dateTimeFormat)}
              </small>
              <br />
              <br />
              <small>
                <b>{`${__('Transaction ID')}: ${stripeResp.id}`}</b>
              </small>
              <p>
                {__('Total Paid')}
                :
                {' '}
                {stripeResp.amount / 100}
                {' '}
                {stripeResp.currency}
              </p>
            </div>
          </>
        )
        : <img src={noData} alt={__('no data found')} style={{ height: 150, width: '100%' }} />}
    </div>
  )
}
