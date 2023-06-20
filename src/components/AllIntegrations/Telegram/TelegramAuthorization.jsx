import { useState } from 'react'
import CloseIcn from '../../../Icons/CloseIcn'
import bitsFetch from '../../../Utils/bitsFetch'
import { __ } from '../../../Utils/i18nwrap'
import tutorialLinks from '../../../Utils/StaticData/tutorialLinks'
import LoaderSm from '../../Loaders/LoaderSm'
import TutorialLink from '../../Utilities/TutorialLink'
import AuthorizeBtn from '../AuthorizeBtn'
import NextBtn from '../NextBtn'
import { refreshGetUpdates } from './TelegramCommonFunc'

export default function TelegramAuthorization({ telegramConf, setTelegramConf, step, setstep, setSnackbar, isInfo }) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const [error, setError] = useState({ name: '', bot_api_key: '', apiError: '' })
  const [showAuthMsg, setShowAuthMsg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAuthorize = () => {
    const newConf = { ...telegramConf }

    if (!newConf.name || !newConf.bot_api_key) {
      setError({
        name: !newConf.name ? __('Integration name cann\'t be empty') : '',
        bot_api_key: !newConf.bot_api_key ? __('API Key cann\'t be empty') : '',
      })
      return
    }
    setIsLoading('auth')
    const requestParams = { bot_api_key: newConf.bot_api_key }
    bitsFetch(requestParams, 'bitforms_telegram_authorize')
      .then(result => {
        if (result?.success) {
          setisAuthorized(true)
          setSnackbar({ show: true, msg: __('Authorized Successfully', 'bitfrom') })
        } else {
          setisAuthorized(false)
          setError({ apiError: result?.data.description })
          setSnackbar({ show: true, msg: __('Authorized Filled', 'bitfrom') })
        }
        setShowAuthMsg(true)
        setIsLoading(false)
      })
  }
  const handleInput = e => {
    const newConf = { ...telegramConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setTelegramConf(newConf)
  }

  const nextPage = () => {
    setTimeout(() => {
      document.getElementById('btcd-settings-wrp').scrollTop = 0
    }, 300)
    refreshGetUpdates(telegramConf, setTelegramConf, setIsLoading, setSnackbar)
    setstep(2)
  }

  return (
    <>
      <TutorialLink
        title={tutorialLinks.telegram.title}
        youTubeLink={tutorialLinks.telegram.link}
      />
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3">
          <b>{__('Integration Name:')}</b>
        </div>
        <input
          className="btcd-paper-inp w-6 mt-1"
          onChange={handleInput}
          name="name"
          value={telegramConf.name}
          type="text"
          placeholder={__('Integration Name...')}
          disabled={isInfo}
        />
        <div style={{ color: 'red', fontSize: '15px', marginTop: '5px' }}>{error.name}</div>
        <div className="mt-3">
          <b>{__('Bot API Key:')}</b>
        </div>
        <input
          className="btcd-paper-inp w-6 mt-1"
          onChange={handleInput}
          name="bot_api_key"
          value={telegramConf.bot_api_key}
          type="text"
          placeholder={__('Bot API Key...')}
          disabled={isInfo}
        />
        <div style={{ color: 'red', fontSize: '15px', marginTop: '5px' }}>{error.bot_api_key}</div>
        {isLoading === 'auth' && (
          <div className="flx mt-5">
            <LoaderSm size={25} clr="#022217" className="mr-2" />
            Checking API Key!!!
          </div>
        )}

        {(showAuthMsg && !isAuthorized && !isLoading) && (
          <div className="flx mt-5" style={{ color: 'red' }}>
            <span className="mr-2" style={{ fontSize: 30, marginTop: -5 }}>
              <CloseIcn size="15" />
            </span>
            {error.apiError}
          </div>
        )}
        {!isInfo && (
          <>
            <AuthorizeBtn
              isAuthorized={isAuthorized}
              isLoading={isLoading}
              handleAuthorize={() => handleAuthorize()}
            />
            <br />
            <NextBtn
              nextPageHandler={() => nextPage(2)}
              disabled={!isAuthorized}
            />
          </>
        )}
      </div>
    </>
  )
}
