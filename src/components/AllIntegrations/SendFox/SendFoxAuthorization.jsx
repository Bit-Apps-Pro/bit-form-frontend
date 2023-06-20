import { useState } from 'react'
import { __ } from '../../../Utils/i18nwrap'
import CopyText from '../../Utilities/CopyText'
import AuthorizeBtn from '../AuthorizeBtn'
import NextBtn from '../NextBtn'
import { handleAuthorize } from './SendFoxCommonFunc'

export default function SendFoxAuthorization({
  sendFoxConf, setSendFoxConf, step, setstep, isLoading, setIsLoading, setSnackbar, redirectLocation, isInfo,
}) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const [error, setError] = useState({ dataCenter: '', clientId: '' })
  const nextPage = () => {
    setTimeout(() => {
      document.getElementById('btcd-settings-wrp').scrollTop = 0
    }, 300)

    setstep(2)
    // fetchAllList(sendFoxConf, setSendFoxConf, setIsLoading, setSnackbar)
  }

  const handleInput = e => {
    const newConf = { ...sendFoxConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setSendFoxConf(newConf)
  }

  return (
    <div
      className="btcd-stp-page"
      style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && 'auto' } }}
    >
      <div className="mt-3"><b>{__('Integration Name:')}</b></div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="name"
        value={sendFoxConf.name}
        type="text"
        placeholder={__('Integration Name...')}
        disabled={isInfo}
      />

      <small className="d-blk mt-3">
        {__('To Get Client Auth token, Please Visit')}
        &nbsp;
        <a
          className="btcd-link"
          href="https://sendfox.com/account/oauth"
          target="_blank"
          rel="noreferrer"
        >
          {__('SendFox Access Token')}
        </a>
      </small>

      <div className="mt-3"><b>{__('Authorized Redirect URIs:')}</b></div>
      <CopyText
        value={redirectLocation || `${window.location.href}`}
        className="field-key-cpy w-6 ml-0"
        readOnly={isInfo}
        setSnackbar={setSnackbar}
      />
      <div className="mt-3"><b>{__('Access Token:')}</b></div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="access_token"
        value={sendFoxConf.access_token}
        type="text"
        placeholder={__('Access Token...')}
        disabled={isInfo}
      />
      <div style={{ color: 'red', fontSize: '15px' }}>{error.access_token}</div>

      {!isInfo && (
        <>
          <AuthorizeBtn
            isAuthorized={isAuthorized}
            isLoading={isLoading}
            handleAuthorize={() => handleAuthorize(
              sendFoxConf,
              setSendFoxConf,
              setError,
              setisAuthorized,
              setIsLoading,
              setSnackbar,
            )}
          />
          <br />
          <NextBtn
            nextPageHandler={() => nextPage()}
            disabled={!isAuthorized}
          />
        </>
      )}
    </div>
  )
}
