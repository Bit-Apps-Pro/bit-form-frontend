import { __ } from '@wordpress/i18n'
import { useState } from 'react'
import CopyText from '../../ElmSettings/Childs/CopyText'
import LoaderSm from '../../Loaders/LoaderSm'
import { handleAuthorize, refreshOrganizations } from './ZohoDeskCommonFunc'

export default function ZohoDeskAuthorization({ formID, deskConf, setDeskConf, step, setstep, isLoading, setisLoading, setSnackbar, redirectLocation, isInfo }) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '' })
  const nextPage = () => {
    setstep(2)
    refreshOrganizations(formID, deskConf, setDeskConf, setisLoading, setSnackbar)
    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }
  console.log(deskConf)
  const handleInput = e => {
    const newConf = { ...deskConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setDeskConf(newConf)
  }

  return (
    <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
      <div className="mt-3"><b>{__('Integration Name:', 'bitform')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="name" value={deskConf.name} type="text" placeholder={__('Integration Name...', 'bitform')} disabled={isInfo} />

      <div className="mt-3"><b>{__('Data Center:', 'bitform')}</b></div>
      <select onChange={handleInput} name="dataCenter" value={deskConf.dataCenter} className="btcd-paper-inp w-9 mt-1" disabled={isInfo}>
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
        <a className="btcd-link" href={`https://api-console.zoho.${deskConf?.dataCenter || 'com'}/`} target="_blank" rel="noreferrer">{__('Zoho API Console', 'bitform')}</a>
      </small>

      <div className="mt-3"><b>{__('Client id:', 'bitform')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="clientId" value={deskConf.clientId} type="text" placeholder={__('Client id...', 'bitform')} disabled={isInfo} />
      <div style={{ color: 'red' }}>{error.clientId}</div>

      <div className="mt-3"><b>{__('Client secret:', 'bitform')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="clientSecret" value={deskConf.clientSecret} type="text" placeholder={__('Client secret...', 'bitform')} disabled={isInfo} />
      <div style={{ color: 'red' }}>{error.clientSecret}</div>

      {!isInfo && (
        <>
          <button onClick={() => handleAuthorize(deskConf, setDeskConf, setError, setisAuthorized, setisLoading, setSnackbar)} className="btn btcd-btn-lg green sh-sm flx" type="button" disabled={isAuthorized}>
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
