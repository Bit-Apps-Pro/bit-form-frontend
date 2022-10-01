import { useState } from 'react'
import { useFela } from 'react-fela'
import BackIcn from '../../../Icons/BackIcn'
import CloseIcn from '../../../Icons/CloseIcn'
import ut from '../../../styles/2.utilities'
import bitsFetch from '../../../Utils/bitsFetch'
import { __ } from '../../../Utils/i18nwrap'
import tutorialLinks from '../../../Utils/StaticData/tutorialLinks'
import LoaderSm from '../../Loaders/LoaderSm'
import Btn from '../../Utilities/Btn'
import TutorialLink from '../../Utilities/TutorialLink'
import { refreshActiveCampaingHeader } from './ActiveCampaignCommonFunc'

export default function ActiveCampaignAuthorization({ formID, activeCampaingConf, setActiveCampaingConf, step, setstep, setSnackbar, isInfo, isLoading, setIsLoading }) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const [error, setError] = useState({ name: '', api_key: '' })
  const [showAuthMsg, setShowAuthMsg] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)
  const { css } = useFela()

  const handleAuthorize = () => {
    const newConf = { ...activeCampaingConf }
    if (!newConf.name || !newConf.api_key || !newConf.api_url) {
      setError({
        name: !newConf.name ? __('Integration name cann\'t be empty') : '',
        api_key: !newConf.api_key ? __('Access API Key cann\'t be empty') : '',
        api_url: !newConf.api_url ? __('Access API URL cann\'t be empty') : '',
      })
      return
    }
    setIsLoading('auth')
    const data = {
      api_key: newConf.api_key,
      api_url: newConf.api_url,
    }
    bitsFetch(data, 'bitforms_aCampaign_authorize')
      .then(result => {
        if (result?.success) {
          setisAuthorized(true)
          setSnackbar({ show: true, msg: __('Authorized Successfully', 'bitfrom') })
        }
        setShowAuthMsg(true)
        setIsLoading(false)
      })
  }
  const handleInput = e => {
    const newConf = { ...activeCampaingConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setActiveCampaingConf(newConf)
  }

  const nextPage = () => {
    setTimeout(() => {
      document.getElementById('btcd-settings-wrp').scrollTop = 0
    }, 300)
    refreshActiveCampaingHeader(activeCampaingConf, setActiveCampaingConf, setIsLoading, setSnackbar)
    setstep(2)
  }

  return (
    <>
      <TutorialLink
        title={tutorialLinks.activeCampaign.title}
        youTubeLink={tutorialLinks.activeCampaign.link}
      />
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3 wdt-200"><b>{__('Integration Name:')}</b></div>
        <input
          aria-label="Integration name"
          className="btcd-paper-inp w-6 mt-1"
          onChange={handleInput}
          name="name"
          value={activeCampaingConf.name}
          type="text"
          placeholder={__('Integration Name...')}
          disabled={isInfo}
        />
        <div style={{ color: 'red', fontSize: '15px' }}>{error.name}</div>

        <div className="mt-3 wdt-200"><b>{__('Access API URL:')}</b></div>
        <input
          aria-label="Access API URL"
          className="btcd-paper-inp w-6 mt-1"
          onChange={handleInput}
          name="api_url"
          value={activeCampaingConf.api_url}
          type="text"
          placeholder={__('Access API URL...')}
          disabled={isInfo}
        />
        <div style={{ color: 'red', fontSize: '15px' }}>{error.api_url}</div>

        <div className="mt-3 wdt-200"><b>{__('Access API Key:')}</b></div>
        <input
          aria-label="Access API Key"
          className="btcd-paper-inp w-6 mt-1"
          onChange={handleInput}
          name="api_key"
          value={activeCampaingConf.api_key}
          type="text"
          placeholder={__('Access API Key...')}
          disabled={isInfo}
        />
        <div style={{ color: 'red', fontSize: '15px' }}>{error.api_key}</div>
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
            Sorry, API key is invalid
          </div>
        )}
        {!isInfo && (
          <>
            <Btn
              varient="success"
              onClick={handleAuthorize}
              disabled={isAuthorized}
              className={css(ut.mt2, ut.ml1)}
            >
              {isAuthorized ? __('Authorized ✔') : __('Authorize')}
              {isLoading && <LoaderSm size={20} clr="#022217" className="ml-2" />}
            </Btn>
            <br />
            <Btn
              varient="success"
              onClick={() => nextPage(2)}
              disabled={!isAuthorized}
              className={css(ut.ftRight)}
            >
              {__('Next')}
              <BackIcn className="ml-1 rev-icn" />
            </Btn>
          </>
        )}
      </div>
    </>
  )
}
