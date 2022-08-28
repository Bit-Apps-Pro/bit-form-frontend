import { useContext, useState } from 'react'
import { useFela } from 'react-fela'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { $bits } from '../GlobalStates/GlobalStates'
import app from '../styles/app.style'
import { AppSettings } from '../Utils/AppSettingsContext'
import bitsFetch from '../Utils/bitsFetch'
import { deepCopy } from '../Utils/Helpers'
import { __ } from '../Utils/i18nwrap'
import LoaderSm from './Loaders/LoaderSm'
import PaypalSettings from './PaypalSettings'
import RazorpaySettings from './RazorpaySettings'
import SnackMsg from './Utilities/SnackMsg'

export default function Payment({ allIntegURL }) {
  const bits = useRecoilValue($bits)
  const { isPro } = bits
  const { payments, setPayments } = useContext(AppSettings)
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

  const handleSubmit = () => {
    setisLoading(true)
    bitsFetch({ paySetting }, 'bitforms_save_payment_setting')
      .then(res => {
        if (res !== undefined && res.success) {
          const tmpSetting = { ...paySetting }
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
        }[type]
      }
      <button type="button" onClick={handleSubmit} className={`${css(app.btn)} btn-md f-right blue`} disabled={isLoading}>
        {__('Save')}
        {isLoading && <LoaderSm size={20} clr="#fff" className="ml-2" />}
      </button>
    </div>
  )
}
