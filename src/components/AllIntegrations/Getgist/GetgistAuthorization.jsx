import { useState } from 'react'
import CloseIcn from '../../../Icons/CloseIcn'
import bitsFetch from '../../../Utils/bitsFetch'
import { __ } from '../../../Utils/i18nwrap'
import LoaderSm from '../../Loaders/LoaderSm'
import AuthorizeBtn from '../AuthorizeBtn'
import NextBtn from '../NextBtn'

export default function GetgistAuthorization({ getgistConf, setGetgistConf, step, setstep, isInfo }) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const [error, setError] = useState({ name: '', api_key: '' })
  const [showAuthMsg, setShowAuthMsg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAuthorize = () => {
    const newConf = { ...getgistConf }
    if (!newConf.name || !newConf.api_key) {
      setError({
        name: !newConf.name ? __('Integration name cann\'t be empty') : '',
        api_key: !newConf.api_key ? __('API Key cann\'t be empty') : '',
      })
      return
    }
    setIsLoading('auth')
    const data = { api_key: newConf.api_key }
    bitsFetch(data, 'bitforms_getgist_authorize')
      .then(result => {
        if (result?.success) {
          setisAuthorized(true)
          // setSnackbar({ show: true, msg: __('Authorized Successfully') })
        }
        setShowAuthMsg(true)
        setIsLoading(false)
      })
  }
  const handleInput = e => {
    const newConf = { ...getgistConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setGetgistConf(newConf)
  }

  const nextPage = () => {
    setTimeout(() => {
      document.getElementById('btcd-settings-wrp').scrollTop = 0
    }, 300)
    setstep(2)
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
        value={getgistConf.name}
        type="text"
        placeholder={__('Integration Name...')}
        disabled={isInfo}
      />
      <div style={{ color: 'red', fontSize: '15px' }}>{error.name}</div>
      <div className="mt-3"><b>{__('API Key:')}</b></div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="api_key"
        value={getgistConf.api_key}
        type="text"
        placeholder={__('Integration Name...')}
        disabled={isInfo}
      />
      <div style={{ color: 'red', fontSize: '15px' }}>{error.api_key}</div>
      <small className="d-blk mt-5">
        {__('To get API , Please Visit')}
        {' '}
        <a
          className="btcd-link"
          href="https://app.getgist.com/projects/jgmmrszy/settings/api-key"
          target="_blank"
          rel="noreferrer"
        >
          {__('Getgist API Console')}
        </a>
      </small>
      {isLoading === 'auth' && (
        <div className="flx mt-5">
          <LoaderSm size={25} clr="#022217" className="mr-2" />
          Checking API Key!!!
        </div>
      )}

      {(showAuthMsg && !isAuthorized && !isLoading) && (
        <div className="flx mt-5" style={{ color: 'red' }}>
          <CloseIcn size="20" />
          Sorry, API key is invalid
        </div>
      )}
      {!isInfo && (
        <>
          <AuthorizeBtn
            isAuthorized={isAuthorized}
            handleAuthorize={handleAuthorize}
            isLoading={isLoading}
          />

          <br />
          <NextBtn
            nextPageHanlder={() => nextPage(2)}
            disabled={!isAuthorized}
          />
        </>
      )}
    </div>
  )
}
