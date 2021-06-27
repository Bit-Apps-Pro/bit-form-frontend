import { useState } from 'react'
import { __ } from '../../../Utils/i18nwrap'
import CopyText from '../../Utilities/CopyText'
import LoaderSm from '../../Loaders/LoaderSm'
import { handleAuthorize, refreshWorkbooks } from './ZohoSheetCommonFunc'
import BackIcn from '../../../Icons/BackIcn'
import SetupHelperLink from '../../Utilities/SetupHelperLink'

export default function ZohoSheetAuthorization({ formID, sheetConf, setSheetConf, step, setstep, isLoading, setisLoading, setSnackbar, redirectLocation, isInfo }) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '' })
  const nextPage = () => {
    setTimeout(() => {
      document.getElementById('btcd-settings-wrp').scrollTop = 0
    }, 300)
    setstep(2)
    refreshWorkbooks(formID, sheetConf, setSheetConf, setisLoading, setSnackbar)
  }

  const handleInput = e => {
    const newConf = { ...sheetConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setSheetConf(newConf)
  }

  return (
    <>
      <SetupHelperLink
        title={sheetConf.type}
        youTubeLink={'https://www.youtube.com/watch?v=uIdOUW-7SYA&list=PL7c6CDwwm-AKN4gEgctrcyht7zOwCyWpz'}
      />
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3"><b>{__('Integration Name:', 'bitform')}</b></div>
        <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="name" value={sheetConf.name} type="text" placeholder={__('Integration Name...', 'bitform')} disabled={isInfo} />

        <div className="mt-3"><b>{__('Data Center:', 'bitform')}</b></div>
        <select onChange={handleInput} name="dataCenter" value={sheetConf.dataCenter} className="btcd-paper-inp w-6 mt-1" disabled={isInfo}>
          <option value="">{__('--Select a data center--', 'bitform')}</option>
          <option value="com">zoho.com</option>
          <option value="eu">zoho.eu</option>
          <option value="com.cn">zoho.com.cn</option>
          <option value="in">zoho.in</option>
          <option value="com.au">zoho.com.au</option>
        </select>
        <div style={{ color: 'red' }}>{error.dataCenter}</div>

        <div className="mt-3"><b>{__('Homepage URL:', 'bitform')}</b></div>
        <CopyText value={`${window.location.origin}`} className="field-key-cpy w-6 ml-0" readOnly={isInfo} />

        <div className="mt-3"><b>{__('Authorized Redirect URIs:', 'bitform')}</b></div>
        <CopyText value={redirectLocation || `${window.location.href}/redirect`} className="field-key-cpy w-6 ml-0" readOnly={isInfo} />

        <small className="d-blk mt-5">
          {__('To get Client ID and SECRET , Please Visit', 'bitform')}
          {' '}
          <a className="btcd-link" href={`https://api-console.zoho.${sheetConf?.dataCenter || 'com'}/`} target="_blank" rel="noreferrer">{__('Zoho API Console', 'bitform')}</a>
        </small>

        <div className="mt-3"><b>{__('Client id:', 'bitform')}</b></div>
        <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="clientId" value={sheetConf.clientId} type="text" placeholder={__('Client id...', 'bitform')} disabled={isInfo} />
        <div style={{ color: 'red' }}>{error.clientId}</div>

        <div className="mt-3"><b>{__('Client secret:', 'bitform')}</b></div>
        <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="clientSecret" value={sheetConf.clientSecret} type="text" placeholder={__('Client secret...', 'bitform')} disabled={isInfo} />
        <div style={{ color: 'red' }}>{error.clientSecret}</div>

        {!isInfo && (
          <>
            <button onClick={() => handleAuthorize(sheetConf, setSheetConf, setError, setisAuthorized, setisLoading, setSnackbar)} className="btn btcd-btn-lg green sh-sm flx" type="button" disabled={isAuthorized}>
              {isAuthorized ? __('Authorized ✔', 'bitform') : __('Authorize', 'bitform')}
              {isLoading && <LoaderSm size="20" clr="#022217" className="ml-2" />}
            </button>
            <br />
            <button onClick={nextPage} className="btn f-right btcd-btn-lg green sh-sm flx" type="button" disabled={!isAuthorized}>
              {__('Next', 'bitform')}
              <BackIcn className="ml-1 rev-icn" />
            </button>
          </>
        )}
      </div>
    </>
  )
}
