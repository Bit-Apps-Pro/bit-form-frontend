/* eslint-disable no-shadow */
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useNavigate, useParams } from 'react-router-dom'
import { useAtom, useAtomValue } from 'recoil'
import { $payments } from '../GlobalStates/AppSettingsStates'
import { $bits } from '../GlobalStates/GlobalStates'
import { deepCopy } from '../Utils/Helpers'
import bitsFetch from '../Utils/bitsFetch'
import { __ } from '../Utils/i18nwrap'
import ut from '../styles/2.utilities'
import LoaderSm from './Loaders/LoaderSm'
import PaypalSettings from './PaypalSettings'
import RazorpaySettings from './RazorpaySettings'
import StripeSettings from './StripeSettings'
import Btn from './Utilities/Btn'
import SnackMsg from './Utilities/SnackMsg'

export default function Payment({ allIntegURL }) {
  const bits = useAtomValue($bits)
  const { isPro } = bits
  const [payments, setPayments] = useAtom($payments)
  const { type, indx } = useParams()
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })
  const { css } = useFela()
  const [paySetting, setPaySetting] = useState(
    (indx && payments?.[indx])
      ? { ...payments[indx] }
      : { type, name: type },
  )

  if (paySetting.type !== type) {
    navigate(allIntegURL)
  }

  const handleInput = e => {
    const { name, value } = e.target
    const tmpSetting = { ...paySetting }
    tmpSetting[name] = value
    setPaySetting(tmpSetting)
  }
  console.log('paySetting', paySetting)
  const validation = () => {
    let validation = false
    const tmpSetting = { ...paySetting }
    console.log('type', type)
    switch (type) {
      case 'PayPal':
        if (!tmpSetting.name || !tmpSetting.clientID || !tmpSetting.clientSecret || !tmpSetting.mode) {
          validation = true
        }
        break
      case 'Razorpay':
        if (!tmpSetting.apiKey || !tmpSetting.apiSecret || !tmpSetting.name) {
          validation = true
        }
        break
      case 'Stripe':
        if (!tmpSetting.name || !tmpSetting.publishableKey || !tmpSetting.clientSecret) {
          validation = true
        }
      // eslint-disable-next-line no-fallthrough
      default:
        console.log('not found')
        break
    }

    return validation
  }

  const handleSubmit = () => {
    const tmpSetting = { ...paySetting }
    if (validation()) {
      setSnackbar({ show: true, msg: __('All fields are required') })
      return
    }
    setisLoading(true)
    bitsFetch({ paySetting }, 'bitforms_save_payment_setting')
      .then(res => {
        if (res !== undefined && res.success) {
          if (res.data && res.data.id) {
            tmpSetting.id = res.data.id
          }
          setPaySetting(tmpSetting)
          const tmpPayments = deepCopy(payments)
          if (!indx) tmpPayments.push(tmpSetting)
          else tmpPayments[indx] = tmpSetting
          setPayments(tmpPayments)
        }
        setSnackbar({ show: true, msg: `${res.data.message}` })
        setisLoading(false)
        navigate('/app-settings/payments')
      })
  }

  return (
    <div className="pos-rel">
      {!isPro && (
        <div className="pro-blur flx" style={{ top: -5, left: -10, height: '140%', width: '102%' }}>
          <div className="pro">
            {__('Available On')}
            <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
              <span className="txt-pro">
                {__('Premium')}
              </span>
            </a>
          </div>
        </div>
      )}
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      {
        {
          PayPal: <PaypalSettings
            paySetting={paySetting}
            setPaySetting={setPaySetting}
            handleInput={handleInput}
          />,
          Razorpay: <RazorpaySettings
            paySetting={paySetting}
            setPaySetting={setPaySetting}
            handleInput={handleInput}
          />,
          Stripe: <StripeSettings
            paySetting={paySetting}
            setPaySetting={setPaySetting}
            handleInput={handleInput}
          />,
        }[type]
      }
      <Btn
        onClick={handleSubmit}
        disabled={isLoading}
        className={css(ut.ftRight)}
        shadow
      >
        {__('Save')}
        {isLoading && <LoaderSm size={20} clr="#fff" className="ml-2" />}
      </Btn>
    </div>
  )
}
