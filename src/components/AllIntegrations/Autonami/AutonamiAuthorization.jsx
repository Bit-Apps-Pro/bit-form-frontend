/* eslint-disable react/jsx-no-useless-fragment */
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { __ } from '../../../Utils/i18nwrap'
import bitsFetch from '../../../Utils/bitsFetch'
import LoaderSm from '../../Loaders/LoaderSm'
import BackIcn from '../../../Icons/BackIcn'
import TutorialLink from '../../Utilities/TutorialLink'
import tutorialLinks from '../../../Utils/StaticData/tutorialLinks'
import app from '../../../styles/app.style'
import Btn from '../../Utilities/Btn'
import ut from '../../../styles/2.utilities'

export default function AutonamiAuthorization({ formID, autonamiConf, setAutonamiConf, step, nextPage, setSnackbar, isInfo }) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [showAuthMsg, setShowAuthMsg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(true)
  const { css } = useFela()
  const [error, setError] = useState({ integrationName: '' })
  useEffect(() => () => {
    setIsMounted(false)
  }, [])

  const handleAuthorize = () => {
    setIsLoading('auth')
    bitsFetch({}, 'bitforms_autonami_authorize')
      .then(result => {
        if (isMounted) {
          if (result?.success) {
            setIsAuthorized(true)
            setSnackbar({ show: true, msg: __('Connect Successfully', 'bitfrom') })
          }
          setShowAuthMsg(true)
          setIsLoading(false)
        }
      })
  }
  const handleInput = e => {
    const newConf = { ...autonamiConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setAutonamiConf(newConf)
  }

  return (
    <>
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <TutorialLink
          title={tutorialLinks.autonami.title}
          youTubeLink={tutorialLinks.autonami.link}
        />
        <div className="mt-3">
          <b>{__('Integration Name:', 'bitform')}</b>
        </div>
        <input
          className="btcd-paper-inp w-5 mt-1"
          onChange={handleInput}
          name="name"
          value={autonamiConf.name}
          type="text"
          placeholder={__('Integration Name...')}
          disabled={isInfo}
        />

        {(showAuthMsg && !isAuthorized && !isLoading) && (
          <div className="flx mt-4" style={{ color: 'red' }}>
            <span className="btcd-icn mr-2" style={{ fontSize: 30, marginTop: -5 }}>
              &times;
            </span>
            Please! First Install or Active Autonami Pro Plugin
          </div>
        )}
        <br />
        <Btn
          varient="success"
          onClick={handleAuthorize}
          disabled={isAuthorized}
          className={css(ut.mt3, { ml: 2 })}
        >
          {isAuthorized ? __('Connected ✔') : __('Connect to Autonami')}
          {isLoading && <LoaderSm size={20} clr="#022217" className="ml-2" />}
        </Btn>
        <br />
        <Btn
          varient="success"
          onClick={() => nextPage(2)}
          className={css(ut.ftRight)}
          disabled={!isAuthorized}
        >
          {__('Next')}
          <BackIcn className="ml-1 rev-icn" />
        </Btn>
      </div>
    </>
  )
}
