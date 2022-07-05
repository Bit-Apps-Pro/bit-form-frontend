import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilValue } from 'recoil'
import { $bits } from '../../../GlobalStates/GlobalStates'
import BackIcn from '../../../Icons/BackIcn'
import app from '../../../styles/app.style'
import { __ } from '../../../Utils/i18nwrap'
import tutorialLinks from '../../../Utils/StaticData/tutorialLinks'
import LoaderSm from '../../Loaders/LoaderSm'
import CopyText from '../../Utilities/CopyText'
import TutorialLink from '../../Utilities/TutorialLink'
import { handleAuthorize, refreshLists } from './ZohoMarketingHubCommonFunc'

export default function ZohoMarketingAuthorization({ formID, marketingHubConf, setMarketingHubConf, step, setstep, isLoading, setisLoading, setSnackbar, redirectLocation, isInfo }) {
  const bits = useRecoilValue($bits)
  const { siteURL } = bits
  const [isAuthorized, setisAuthorized] = useState(false)
  const { css } = useFela()
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '' })
  const nextPage = () => {
    setTimeout(() => {
      document.getElementById('btcd-settings-wrp').scrollTop = 0
    }, 300)
    setstep(2)
    refreshLists(formID, marketingHubConf, setMarketingHubConf, setisLoading, setSnackbar)
  }

  const handleInput = e => {
    const newConf = { ...marketingHubConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setMarketingHubConf(newConf)
  }

  return (
    <>
      <TutorialLink
        title={tutorialLinks.zohoMarketingHub.title}
        youTubeLink={tutorialLinks.zohoMarketingHub.link}
      />
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3"><b>{__('Integration Name:')}</b></div>
        <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="name" value={marketingHubConf.name} type="text" placeholder={__('Integration Name...')} disabled={isInfo} />

        <div className="mt-3"><b>{__('Data Center:')}</b></div>
        <select onChange={handleInput} name="dataCenter" value={marketingHubConf.dataCenter} className="btcd-paper-inp w-6 mt-1" disabled={isInfo}>
          <option value="">{__('--Select a data center--')}</option>
          <option value="com">zoho.com</option>
          <option value="eu">zoho.eu</option>
          <option value="com.cn">zoho.com.cn</option>
          <option value="in">zoho.in</option>
          <option value="com.au">zoho.com.au</option>
        </select>
        <div style={{ color: 'red' }}>{error.dataCenter}</div>

        <div className="mt-3"><b>{__('Homepage URL:')}</b></div>
        <CopyText value={siteURL} className="field-key-cpy w-6 ml-0" readOnly={isInfo} />

        <div className="mt-3"><b>{__('Authorized Redirect URIs:')}</b></div>
        <CopyText value={redirectLocation || `${window.location.href}/redirect`} className="field-key-cpy w-6 ml-0" readOnly={isInfo} />

        <small className="d-blk mt-5">
          {__('To get Client ID and SECRET , Please Visit')}
          {' '}
          <a className="btcd-link" href={`https://api-console.zoho.${marketingHubConf?.dataCenter || 'com'}/`} target="_blank" rel="noreferrer">{__('Zoho API Console')}</a>
        </small>

        <div className="mt-3"><b>{__('Client id:')}</b></div>
        <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="clientId" value={marketingHubConf.clientId} type="text" placeholder={__('Client id...')} disabled={isInfo} />
        <div style={{ color: 'red' }}>{error.clientId}</div>

        <div className="mt-3"><b>{__('Client secret:')}</b></div>
        <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="clientSecret" value={marketingHubConf.clientSecret} type="text" placeholder={__('Client secret...')} disabled={isInfo} />
        <div style={{ color: 'red' }}>{error.clientSecret}</div>

        {!isInfo && (
          <>
            <button onClick={() => handleAuthorize(marketingHubConf, setMarketingHubConf, setError, setisAuthorized, setisLoading, setSnackbar)} className={`${css(app.btn)} btcd-btn-lg green sh-sm flx`} type="button" disabled={isAuthorized}>
              {isAuthorized ? __('Authorized ✔') : __('Authorize')}
              {isLoading && <LoaderSm size={20} clr="#022217" className="ml-2" />}
            </button>
            <br />
            <button onClick={nextPage} className={`${css(app.btn)} f-right btcd-btn-lg green sh-sm flx`} type="button" disabled={!isAuthorized}>
              {__('Next')}
              <BackIcn className="ml-1 rev-icn" />
            </button>
          </>
        )}
      </div>
    </>
  )
}
