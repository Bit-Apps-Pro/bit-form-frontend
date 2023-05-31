import { useState } from 'react'
import { useAtomValue } from 'recoil'
import { $bits } from '../../../GlobalStates/GlobalStates'
import { __ } from '../../../Utils/i18nwrap'
import tutorialLinks from '../../../Utils/StaticData/tutorialLinks'
import CopyText from '../../Utilities/CopyText'
import TutorialLink from '../../Utilities/TutorialLink'
import AuthorizeBtn from '../AuthorizeBtn'
import NextBtn from '../NextBtn'
import { handleAuthorize, refreshWorkbooks } from './ZohoSheetCommonFunc'

export default function ZohoSheetAuthorization({
  formID, sheetConf, setSheetConf, step, setstep, isLoading, setisLoading, setSnackbar, redirectLocation, isInfo,
}) {
  const bits = useAtomValue($bits)
  const { siteURL } = bits
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
      <TutorialLink
        title={tutorialLinks.zohoSheet.title}
        youTubeLink={tutorialLinks.zohoSheet.link}
      />
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3"><b>{__('Integration Name:')}</b></div>
        <input
          className="btcd-paper-inp w-6 mt-1"
          onChange={handleInput}
          name="name"
          value={sheetConf.name}
          type="text"
          placeholder={__('Integration Name...')}
          disabled={isInfo}
        />

        <div className="mt-3"><b>{__('Data Center:')}</b></div>
        <select
          onChange={handleInput}
          name="dataCenter"
          value={sheetConf.dataCenter}
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
          <a
            className="btcd-link"
            href={`https://api-console.zoho.${sheetConf?.dataCenter || 'com'}/`}
            target="_blank"
            rel="noreferrer"
          >
            {__('Zoho API Console')}
          </a>
        </small>

        <div className="mt-3"><b>{__('Client id:')}</b></div>
        <input
          className="btcd-paper-inp w-6 mt-1"
          onChange={handleInput}
          name="clientId"
          value={sheetConf.clientId}
          type="text"
          placeholder={__('Client id...')}
          disabled={isInfo}
        />
        <div style={{ color: 'red' }}>{error.clientId}</div>

        <div className="mt-3"><b>{__('Client secret:')}</b></div>
        <input
          className="btcd-paper-inp w-6 mt-1"
          onChange={handleInput}
          name="clientSecret"
          value={sheetConf.clientSecret}
          type="text"
          placeholder={__('Client secret...')}
          disabled={isInfo}
        />
        <div style={{ color: 'red' }}>{error.clientSecret}</div>

        {!isInfo && (
          <>
            <AuthorizeBtn
              isAuthorized={isAuthorized}
              isloading={isLoading}
              handleAuthorize={() => handleAuthorize(sheetConf, setSheetConf, setError, setisAuthorized, setisLoading, setSnackbar)}
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
