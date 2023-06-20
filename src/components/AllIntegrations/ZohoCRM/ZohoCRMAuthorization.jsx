import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { $bits } from '../../../GlobalStates/GlobalStates'
import { __ } from '../../../Utils/i18nwrap'
import tutorialLinks from '../../../Utils/StaticData/tutorialLinks'
import CopyText from '../../Utilities/CopyText'
import TutorialLink from '../../Utilities/TutorialLink'
import AuthorizeBtn from '../AuthorizeBtn'
import NextBtn from '../NextBtn'
import { handleAuthorize, refreshModules } from './ZohoCRMCommonFunc'

export default function ZohoCRMAuthorization({
  formID, crmConf, setCrmConf, step, setstep, isLoading, setisLoading, setSnackbar, redirectLocation, isInfo,
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
    !crmConf.module && refreshModules(formID, crmConf, setCrmConf, setisLoading, setSnackbar)
  }
  const handleInput = e => {
    const newConf = { ...crmConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setCrmConf(newConf)
  }

  return (
    <>
      <TutorialLink
        title={tutorialLinks.zohoCrm.title}
        youTubeLink={tutorialLinks.zohoCrm.link}
      />
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3">
          <b>{__('Integration Name:')}</b>
        </div>
        <input
          className="btcd-paper-inp w-6 mt-1"
          onChange={handleInput}
          name="name"
          value={crmConf.name}
          type="text"
          placeholder={__('Integration Name...')}
          disabled={isInfo}
        />

        <div className="mt-3">
          <b>{__('Data Center:')}</b>
        </div>
        <select
          onChange={handleInput}
          name="dataCenter"
          value={crmConf.dataCenter}
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

        <div className="mt-3">
          <b>{__('Homepage URL:')}</b>
        </div>
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
            href={`https://api-console.zoho.${crmConf?.dataCenter || 'com'}/`}
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
          value={crmConf.clientId}
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
          value={crmConf.clientSecret}
          type="text"
          placeholder={__('Client secret...')}
          disabled={isInfo}
        />
        <div style={{ color: 'red' }}>{error.clientSecret}</div>

        {!isInfo && (
          <>
            {/* <button onClick={() => handleAuthorize(crmConf, setCrmConf, setError, setisAuthorized, setisLoading, setSnackbar)} className={`${css(app.btn)} btcd-btn-lg green sh-sm flx`} type="button" disabled={isAuthorized}>
              {isAuthorized ? __('Authorized ✔') : __('Authorize')}
              {isLoading && <LoaderSm size={20} clr="#022217" className="ml-2" />}
            </button> */}
            <AuthorizeBtn
              isAuthorized={isAuthorized}
              isLoading={isLoading}
              handleAuthorize={() => handleAuthorize(crmConf, setCrmConf, setError, setisAuthorized, setisLoading, setSnackbar)}
            />
            <br />
            {/* <button
              onClick={nextPage}
              className={`${css(app.btn)} f-right btcd-btn-lg green sh-sm flx`}
              type="button"
              disabled={!isAuthorized}
            >
              {__('Next')}
              <BackIcn className="ml-1 rev-icn" />
            </button> */}
            <NextBtn
              nextPageHandler={() => nextPage()}
              disabled={!isAuthorized}
            />
          </>
        )}
      </div>
    </>
  )
}
