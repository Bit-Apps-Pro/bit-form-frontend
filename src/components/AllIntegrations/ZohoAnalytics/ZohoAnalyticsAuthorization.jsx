import { __ } from '@wordpress/i18n'
import { useState } from 'react'
import { checkValidEmail } from '../../../Utils/Helpers'
import CopyText from '../../ElmSettings/Childs/CopyText'
import LoaderSm from '../../Loaders/LoaderSm'
import { handleAuthorize, refreshWorkspaces } from './ZohoAnalyticsCommonFunc'

export default function ZohoAnalyticsAuthorization({ formID, analyticsConf, setAnalyticsConf, step, setStep, isLoading, setisLoading, setSnackbar, redirectLocation, isInfo }) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '', ownerEmail: '' })
  const nextPage = () => {
    if (!checkValidEmail(analyticsConf.ownerEmail)) {
      setError({
        ownerEmail: !checkValidEmail(analyticsConf.ownerEmail) ? __('Email is invalid', 'bitform') : '',
      })
      return
    }
    setStep(2)
    refreshWorkspaces(formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar)
    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  const handleInput = e => {
    const newConf = { ...analyticsConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setAnalyticsConf(newConf)
  }

  return (
    <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
      <div className="mt-3"><b>{__('Integration Name:', 'bitform')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="name" value={analyticsConf.name} type="text" placeholder={__('Integration Name...', 'bitform')} disabled={isInfo} />

      <div className="mt-3"><b>{__('Data Center:', 'bitform')}</b></div>
      <select onChange={handleInput} name="dataCenter" value={analyticsConf.dataCenter} className="btcd-paper-inp w-9 mt-1" disabled={isInfo}>
        <option value="">{__('--Select a data center--', 'bitform')}</option>
        <option value="com">zoho.com</option>
        <option value="eu">zoho.eu</option>
        <option value="com.cn">zoho.com.cn</option>
        <option value="in">zoho.in</option>
        <option value="com.au">zoho.com.au</option>
      </select>
      <div style={{ color: 'red' }}>{error.dataCenter}</div>

      <div className="mt-3"><b>{__('Homepage URL:', 'bitform')}</b></div>
      <CopyText value={`${window.location.origin}`} setSnackbar={setSnackbar} className="field-key-cpy w-6 ml-0" readOnly={isInfo} />

      <div className="mt-3"><b>{__('Authorized Redirect URIs:', 'bitform')}</b></div>
      <CopyText value={redirectLocation || `${window.location.href}/redirect`} setSnackbar={setSnackbar} className="field-key-cpy w-6 ml-0" readOnly={isInfo} />

      <small className="d-blk mt-5">
        {__('To get Client ID and SECRET , Please Visit', 'bitform')}
        {' '}
        <a className="btcd-link" href="https://api-console.zoho.com/" target="_blank" rel="noreferrer">{__('Zoho API Console', 'bitform')}</a>
      </small>

      <div className="mt-3"><b>{__('Client id:', 'bitform')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="clientId" value={analyticsConf.clientId} type="text" placeholder={__('Client id...', 'bitform')} disabled={isInfo} />
      <div style={{ color: 'red' }}>{error.clientId}</div>

      <div className="mt-3"><b>{__('Client secret:', 'bitform')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="clientSecret" value={analyticsConf.clientSecret} type="text" placeholder={__('Client secret...', 'bitform')} disabled={isInfo} />
      <div style={{ color: 'red' }}>{error.clientSecret}</div>
      <div className="mt-3"><b>{__('Zoho Analytics Owner Email:', 'bitform')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="ownerEmail" value={analyticsConf.ownerEmail} type="email" placeholder={__('Owner Email', 'bitform')} disabled={isInfo} />
      <div style={{ color: 'red' }}>{error.ownerEmail}</div>

      {!isInfo && (
        <>
          <button onClick={() => handleAuthorize(analyticsConf, setAnalyticsConf, setError, setisAuthorized, setisLoading, setSnackbar)} className="btn btcd-btn-lg green sh-sm flx" type="button" disabled={isAuthorized}>
            {isAuthorized ? __('Authorized ✔', 'bitform') : __('Authorize', 'bitform')}
            {isLoading && <LoaderSm size="20" clr="#022217" className="ml-2" />}
          </button>
          <br />
          <button onClick={nextPage} className="btn f-right btcd-btn-lg green sh-sm flx" type="button" disabled={!isAuthorized}>
            {__('Next', 'bitform')}
            <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
          </button>
        </>
      )}
    </div>
  )
}