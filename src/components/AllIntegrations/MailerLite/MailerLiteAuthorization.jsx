/* eslint-disable no-unused-expressions */
import { useState } from 'react'
import { __ } from '../../../Utils/i18nwrap'
import tutorialLinks from '../../../Utils/StaticData/tutorialLinks'
import Note from '../../Utilities/Note'
import TutorialLink from '../../Utilities/TutorialLink'
import AuthorizeBtn from '../AuthorizeBtn'
import NextBtn from '../NextBtn'
import { mailerliteRefreshFields } from './MailerLiteCommonFunc'
import { version } from 'ace-builds'

export default function MailerLiteAuthorization({
  mailerLiteConf, setMailerLiteConf, step, setstep, isLoading, setIsLoading, isInfo,
}) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const [error, setError] = useState({ name: '', auth_token: '' })

  const nextPage = () => {
    !mailerLiteConf?.default
    setstep(2)
    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }
  const handleInput = e => {
    const newConf = { ...mailerLiteConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setMailerLiteConf(newConf)
  }
  const url = (mailerLiteConf.version === 'v2') ? 'https://dashboard.mailerlite.com/integrations/api' : 'https://app.mailerlite.com/integrations/api/'
  const note = `
    <h4> Step of generate API token:</h4>
    <ul>
      <li>Goto <a href=${url}>Generate API Token</a></li>
      <li>Copy the <b>Token</b> and paste into <b>API Token</b> field of your authorization form.</li>
      <li>Finally, click <b>Authorize</b> button.</li>
  </ul>
  `
  return (
    <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && 'auto' } }}>
      <TutorialLink
        title={tutorialLinks.mailerlite.title}
        youTubeLink={tutorialLinks.mailerlite.link}
      />
      <div className="mt-3"><b>{__('Integration Name:')}</b></div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="name"
        value={mailerLiteConf.name}
        type="text"
        placeholder={__('Integration Name...')}
        disabled={isInfo}
      />
      <div className="mt-3"><b>{__('Select Version:')}</b></div>
      <div className="flex items-center w-6 mt-3">
        <input id="MailerLiteClassic" type="radio" name="version" value="v1" className="hidden" checked={mailerLiteConf.version === "v1"} onChange={handleInput} />
        <label for="MailerLiteClassic">
          <span className="w-4 h-4 inline-block mr-1 border border-grey" />
          MailerLite Classic

        </label>
      </div>

      <div className="flex items-center mr-4 mt-2 mb-4">
        <input id="MailerLiteNew" type="radio" name="version" value="v2" className="hidden" checked={mailerLiteConf.version === "v2"} onChange={handleInput} />
        <label for="MailerLiteNew">
          <span className="w-4 h-4 inline-block mr-1 border border-grey" />
          MailerLite New

        </label>
      </div>

      <small className="d-blk mt-3">
        {__('To Get API token, Please Visit')}
        &nbsp;
        <a
          className="btcd-link"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {__('MailerLite API Token')}
        </a>
      </small>

      <div className="mt-3"><b>{__('API Token:')}</b></div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="auth_token"
        value={mailerLiteConf.auth_token}
        type="text"
        placeholder={__('API Token...')}
        disabled={isInfo}
      />
      <div style={{ color: 'red', fontSize: '15px' }}>{error.auth_token}</div>

      {!isInfo && (
        <div>
          <AuthorizeBtn
            isAuthorized={isAuthorized}
            isLoading={isLoading}
            disabled={mailerLiteConf.version === undefined || mailerLiteConf.version === ''}
            handleAuthorize={() => mailerliteRefreshFields(mailerLiteConf, setMailerLiteConf, setError, setisAuthorized, setIsLoading, 'authorization')}
          />
          <br />
          <NextBtn
            nextPageHandler={() => nextPage()}
            disabled={!isAuthorized}
          />
        </div>
      )}
      <Note note={note} />
    </div>
  )
}
