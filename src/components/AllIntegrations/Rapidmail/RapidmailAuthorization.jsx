/* eslint-disable no-unused-expressions */
import { useState } from 'react'
import { __ } from '../../../Utils/i18nwrap'
import AuthorizeBtn from '../AuthorizeBtn'
import NextBtn from '../NextBtn'
import { getAllRecipient, handleAuthorize } from './RapidmailCommonFunc'

export default function RapidmailAuthorization({
  rapidmailConf,
  setRapidmailConf,
  step,
  setstep,
  isLoading,
  setIsLoading,
  setSnackbar,
  isInfo,
}) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const [error, setError] = useState({ username: '', password: '' })

  const nextPage = () => {
    !rapidmailConf?.default
      && getAllRecipient(
        rapidmailConf,
        setRapidmailConf,
        setIsLoading,
        setSnackbar,
      )
    setstep(2)
    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }
  const handleInput = (e) => {
    const newConf = { ...rapidmailConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setRapidmailConf(newConf)
  }

  return (
    <div
      className="btcd-stp-page"
      style={{
        ...{ width: step === 1 && 900 },
        ...{ height: step === 1 && `${100}%` },
      }}
    >
      <div className="mt-3">
        <b>{__('Integration Name:')}</b>
      </div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="name"
        value={rapidmailConf?.name}
        type="text"
        placeholder={__('Integration Name...')}
        disabled={isInfo}
      />

      <small className="d-blk mt-5">
        {__('To get Username and Password , Please Visit')}
        {' '}
        <a
          className="btcd-link"
          href="https://my.rapidmail.com/api/v3/userlist.html#/"
          target="_blank"
          rel="noreferrer"
        >
          {__('Create API User')}
        </a>
      </small>

      <div className="mt-3">
        <b>{__('User Name:')}</b>
      </div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="username"
        value={rapidmailConf?.username}
        type="text"
        placeholder={__('User name...')}
        disabled={isInfo}
      />
      <div style={{ color: 'red' }}>{error.username}</div>

      <div className="mt-3">
        <b>{__('Password:')}</b>
      </div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="password"
        value={rapidmailConf?.password}
        type="text"
        placeholder={__('Password...')}
        disabled={isInfo}
      />
      <div style={{ color: 'red' }}>{error.password}</div>

      {!isInfo && (
        <div>
          <AuthorizeBtn
            isAuthorized={isAuthorized}
            handleAuthorize={() => handleAuthorize(
              rapidmailConf,
              setRapidmailConf,
              setError,
              setisAuthorized,
              setIsLoading,
              setSnackbar,
            )}
            isLoading={isLoading}
          />
          <br />
          <NextBtn
            nextPageHandler={() => nextPage()}
            disabled={!isAuthorized}
          />
        </div>
      )}
    </div>
  )
}
