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
import { handleMailChimpAuthorize, refreshAudience } from './MailChimpCommonFunc'

export default function MailChimpAuthorization({ formID, sheetConf, setSheetConf, step, setstep, isLoading, setisLoading, setSnackbar, redirectLocation, isInfo }) {
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
    refreshAudience(formID, sheetConf, setSheetConf, setisLoading, setSnackbar)
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
        title={tutorialLinks.mailChimp.title}
        youTubeLink={tutorialLinks.mailChimp.link}
      />
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3"><b>{__('Integration Name:')}</b></div>
        <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="name" value={sheetConf.name} type="text" placeholder={__('Integration Name...')} disabled={isInfo} />

        <div className="mt-3"><b>{__('Homepage URL:')}</b></div>
        <CopyText value={siteURL} className="field-key-cpy w-6 ml-0" readOnly={isInfo} />

        <div className="mt-3"><b>{__('Authorized Redirect URIs:')}</b></div>
        <CopyText value={redirectLocation || `${window.location.href}`} className="field-key-cpy w-6 ml-0" readOnly={isInfo} />

        <small className="d-blk mt-5">
          {__('To get Client ID and SECRET , Please Visit')}
          {' '}
          <a className="btcd-link" href="https://us7.admin.mailchimp.com/account/oauth2/" target="_blank" rel="noreferrer">{__('Mail Chimp API Console')}</a>
        </small>

        <div className="mt-3"><b>{__('Client id:')}</b></div>
        <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="clientId" value={sheetConf.clientId} type="text" placeholder={__('Client id...')} disabled={isInfo} />
        <div style={{ color: 'red', fontSize: '15px' }}>{error.clientId}</div>

        <div className="mt-3"><b>{__('Client secret:')}</b></div>
        <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="clientSecret" value={sheetConf.clientSecret} type="text" placeholder={__('Client secret...')} disabled={isInfo} />
        <div style={{ color: 'red', fontSize: '15px' }}>{error.clientSecret}</div>
        {!isInfo && (
          <>
            <button onClick={() => handleMailChimpAuthorize('mailChimp', 'mChimp', sheetConf, setSheetConf, setError, setisAuthorized, setisLoading, setSnackbar)} className={`${css(app.btn)} btcd-btn-lg green sh-sm flx`} type="button" disabled={isAuthorized}>
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
