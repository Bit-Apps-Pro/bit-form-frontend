import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { $bits } from '../../../GlobalStates/GlobalStates'
import { checkValidEmail } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import tutorialLinks from '../../../Utils/StaticData/tutorialLinks'
import CopyText from '../../Utilities/CopyText'
import TutorialLink from '../../Utilities/TutorialLink'
import AuthorizeBtn from '../AuthorizeBtn'
import NextBtn from '../NextBtn'
import { refreshWorkspaces } from './ZohoAnalyticsCommonFunc'
import { handleAuthorize } from '../IntegrationHelpers/IntegrationHelpers'

export default function ZohoAnalyticsAuthorization({
  formID, analyticsConf, setAnalyticsConf, step, setStep, isLoading, setisLoading, setSnackbar, redirectLocation, isInfo,
}) {
  const bits = useRecoilValue($bits)
  const { siteURL } = bits
  const [isAuthorized, setisAuthorized] = useState(false)
  const scopes = 'ZohoAnalytics.metadata.read,ZohoAnalytics.data.read,ZohoAnalytics.data.create,ZohoAnalytics.data.update,ZohoAnalytics.usermanagement.read,ZohoAnalytics.share.create'
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '', ownerEmail: '' })
  const nextPage = () => {
    setTimeout(() => {
      document.getElementById('btcd-settings-wrp').scrollTop = 0
    }, 300)
    if (!checkValidEmail(analyticsConf.ownerEmail)) {
      setError({ ownerEmail: !checkValidEmail(analyticsConf.ownerEmail) ? __('Email is invalid') : '' })
      return
    }
    setStep(2)
    refreshWorkspaces(formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar)
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
    <>
      <TutorialLink
        title={tutorialLinks.zohoAnalytics.title}
        youTubeLink={tutorialLinks.zohoAnalytics.link}
      />
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3"><b>{__('Integration Name:')}</b></div>
        <input
          className="btcd-paper-inp w-6 mt-1"
          onChange={handleInput}
          name="name"
          value={analyticsConf.name}
          type="text"
          placeholder={__('Integration Name...')}
          disabled={isInfo}
        />

        <div className="mt-3"><b>{__('Data Center:')}</b></div>
        <select
          onChange={handleInput}
          name="dataCenter"
          value={analyticsConf.dataCenter}
          className="btcd-paper-inp w-6 mt-1"
          disabled={isInfo}
        >
          <option value="">{__('--Select a data center--')}</option>
          <option value="com">zoho.com</option>
          <option value="eu">zoho.eu</option>
          <option value="com.cn">zoho.com.cn</option>
          <option value="in">zoho.in</option>
          <option value="com.au">zoho.com.au</option>
        </select>
        <div style={{ color: 'red' }}>{error.dataCenter}</div>

        <div className="mt-3"><b>{__('Homepage URL:')}</b></div>
        <CopyText
          value={siteURL}
          className="field-key-cpy w-6 ml-0"
          readOnly={isInfo}
        />

        <div className="mt-3"><b>{__('Authorized Redirect URIs:', 'bitform')}</b></div>
        <CopyText value={redirectLocation || `${bits.zohoRedirectURL}`} className="field-key-cpy w-6 ml-0" readOnly={isInfo} />

        <small className="d-blk mt-5">
          {__('To get Client ID and SECRET , Please Visit')}
          {' '}
          <a className="btcd-link" href={`https://api-console.zoho.${analyticsConf?.dataCenter || 'com'}/`} target="_blank" rel="noreferrer">{__('Zoho API Console')}</a>
        </small>

        <div className="mt-3"><b>{__('Client id:')}</b></div>
        <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="clientId" value={analyticsConf.clientId} type="text" placeholder={__('Client id...')} disabled={isInfo} />
        <div style={{ color: 'red' }}>{error.clientId}</div>

        <div className="mt-3"><b>{__('Client secret:')}</b></div>
        <input
          className="btcd-paper-inp w-6 mt-1"
          onChange={handleInput}
          name="clientSecret"
          value={analyticsConf.clientSecret}
          type="text"
          placeholder={__('Client secret...')}
          disabled={isInfo}
        />
        <div style={{ color: 'red' }}>{error.clientSecret}</div>
        <div className="mt-3"><b>{__('Zoho Analytics Owner Email:')}</b></div>
        <input
          className="btcd-paper-inp w-6 mt-1"
          onChange={handleInput}
          name="ownerEmail"
          value={analyticsConf.ownerEmail}
          type="email"
          placeholder={__('Owner Email')}
          disabled={isInfo}
        />
        <div style={{ color: 'red' }}>{error.ownerEmail}</div>

        {!isInfo && (
          <>
            <AuthorizeBtn
              isAuthorized={isAuthorized}
              isLoading={isLoading}
              handleAuthorize={() => handleAuthorize(
                analyticsConf,
                setAnalyticsConf,
                setError,
                setisAuthorized,
                setisLoading,
                setSnackbar,
              )}
            />
            <br />
            <NextBtn
              nextPageHanlder={() => nextPage()}
              disabled={!isAuthorized}
            />
          </>
        )}
      </div>
    </>
  )
}
