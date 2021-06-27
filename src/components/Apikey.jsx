import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { __ } from '../Utils/i18nwrap'
import bitsFetch from '../Utils/bitsFetch'
import LoaderSm from './Loaders/LoaderSm'
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
  const [isLoading, setisLoading] = useState(false)

  const handleSubmit = e => {
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
    setKey(randomKey(40))
  }

  useEffect(() => {
    const loadApiKeyProm = bitsFetch({}, 'bitforms_api_key').then((res) => {
      if (res?.success) {
        setKey(res.data)
        return 'Successfully fetched API key.'
      }
      return res?.data
    })
    toast.promise(loadApiKeyProm, {
      success: data => data,
      error: __('Error Occured', 'bitform'),
      loading: __('Loading API key...'),
    })
  }, [])

  return (
    <div className="btcd-captcha w-5">
      <h2>{__('API Integration', 'bitform')}</h2>
      <div className="btcd-hr" />

      <div className="mt-2">
        <label htmlFor="captcha-key">
          <b>{__('Domain URL', 'bitform')}</b>
          <CopyText value={window.location.origin} name="domainURL" className="field-key-cpy w-12 ml-0" readOnly />
        </label>
      </div>
      <div className="mt-3">
        <label htmlFor="captcha-key">
          <b>{__('API Key', 'bitform')}</b>
          <CopyText value={key} name="siteKey" className="field-key-cpy w-12 ml-0" readOnly />
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
      <button type="button" onClick={(e) => handleSubmit(e)} className="btn btcd-btn-lg blue" disabled={isLoading}>
        {__('Save', 'bitform')}
        {isLoading && <LoaderSm size="20" clr="#fff" className="ml-2" />}
      </button>
    </div>
  )
}
