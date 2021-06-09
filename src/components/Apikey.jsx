import { useState, useEffect } from 'react'
import { __ } from '../Utils/i18nwrap'
import bitsFetch from '../Utils/bitsFetch'
import LoaderSm from './Loaders/LoaderSm'
import SnackMsg from './Utilities/SnackMsg'
import CopyText from './Utilities/CopyText'

const randomKey = length => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export default function Apikey() {
  const [key, setKey] = useState('')
  const [snack, setsnack] = useState({ show: false })
  const [isLoading, setisLoading] = useState(false)

  const handleSubmit = e => {
    setisLoading(true)
    bitsFetch({ api_key: key }, 'bitforms_api_key').then((res) => {
      if (res !== undefined && res.success) {
        setKey(res.data)
        setsnack({ ...{ show: true, msg: __('api key save successfully', 'bitform') } })
      } else if (res?.data) {
        setsnack({ ...{ show: true, msg: res.data } })
      }
      setisLoading(false)
    })
  }

  const changeKey = () => {
    setKey(randomKey(40))
  }

  useEffect(() => {
    bitsFetch({}, 'bitforms_api_key').then((res) => {
      if (res !== undefined && res.success) {
        setKey(res.data)
      } else if (res?.data) {
        setsnack({ ...{ show: true, msg: res.data } })
      }
    })
  }, [])

  return (
    <div className="btcd-captcha w-5">
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
            {__('Genarate new API key', 'bitform')}
          </span>
        </label>
      </div>
      <button type="button" onClick={(e) => handleSubmit(e)} className="btn btn-md f-right blue" disabled={isLoading}>
        {__('Save', 'bitform')}
        {isLoading && <LoaderSm size="20" clr="#fff" className="ml-2" />}
      </button>
    </div>
  )
}
