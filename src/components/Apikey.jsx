import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import { useRecoilValue } from 'recoil'
import { $bits } from '../GlobalStates/GlobalStates'
import app from '../styles/app.style'
import bitsFetch from '../Utils/bitsFetch'
import { __ } from '../Utils/i18nwrap'
import LoaderSm from './Loaders/LoaderSm'
import CopyText from './Utilities/CopyText'
import SnackMsg from './Utilities/SnackMsg'

const randomKey = () => {
  const a = new Uint32Array(4)
  window.crypto.getRandomValues(a)
  return (performance.now().toString(36) + Array.from(a).map(A => A.toString(36)).join('')).replace(/\./g, '')
}

export default function Apikey() {
  const [key, setKey] = useState('')
  const bits = useRecoilValue($bits)
  const { isPro } = bits
  const [snack, setsnack] = useState({ show: false })
  const [isLoading, setisLoading] = useState(false)
  const { css } = useFela()

  const handleSubmit = () => {
    setisLoading(true)
    const apiSaveProm = bitsFetch({ api_key: key }, 'bitforms_api_key')
      .then((res) => {
        setisLoading(false)
        if (res?.success) {
          setKey(res.data)
          return __('API key saved successfully', 'bitform')
        }
        return res?.data || __('Error Occured', 'bitform')
      })
    toast.promise(apiSaveProm, {
      success: data => data,
      failed: data => data,
      loading: __('Saving API key...'),
    })
  }

  const changeKey = () => {
    setKey(randomKey())
  }

  useEffect(() => {
    const loadApiKeyProm = bitsFetch({}, 'bitforms_api_key').then((res) => {
      if (res !== undefined && res.success) {
        if (isPro) setKey(res.data)
        else setKey('**********************************')
      }
      if (res?.data) return 'Successfully fetched API key.'
      return 'Error'
    })
    toast.promise(loadApiKeyProm, {
      success: data => data,
      error: __('Error Occured', 'bitform'),
      loading: __('Loading API key...'),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="btcd-captcha w-5">
      <div className="pos-rel">
        {!isPro && (
          <div className="pro-blur flx" style={{ height: '135%', left: -12, width: '104%', marginTop: 10 }}>
            <div className="pro">
              {__('Available On', 'bitform')}
              <a href="https://www.bitapps.pro/bit-form" target="_blank" rel="noreferrer">
                <span className="txt-pro">
                  {__('Premium', 'bitform')}
                </span>
              </a>
            </div>
          </div>
        )}

        <SnackMsg snack={snack} setSnackbar={setsnack} />
        <h2>{__('API Integration', 'bitform')}</h2>
        <div className="btcd-hr" />

        <div className="mt-2">
          <label htmlFor="captcha-key">
            {__('Domain URL', 'bitform')}
            <CopyText value={window.location.origin} name="domainURL" setSnackbar={setsnack} className="field-key-cpy w-12 ml-0" readOnly />
          </label>
        </div>
        <div className="mt-3">
          <label htmlFor="captcha-key">
            {__('API Key', 'bitform')}
            <CopyText value={key} name="siteKey" setSnackbar={setsnack} className="field-key-cpy w-12 ml-0" readOnly />
            <span
              className="btcd-link"
              role="button"
              tabIndex="-1"
              onClick={changeKey}
              onKeyPress={changeKey}
            >
              {__('Generate new API key', 'bitform')}
            </span>
          </label>
        </div>
        <button type="button" onClick={(e) => handleSubmit(e)} className={`${css(app.btn)} btn-md f-right blue`} disabled={isLoading}>
          {__('Save', 'bitform')}
          {isLoading && <LoaderSm size={20} clr="#fff" className="ml-2" />}
        </button>
      </div>
    </div>
  )
}
