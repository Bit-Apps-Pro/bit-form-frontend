import { useEffect, useState } from 'react'
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

export default function FluentCrmAuthorization({
  formID, fluentCrmConf, setFluentCrmConf, step, nextPage, setSnackbar, isInfo,
}) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const [error, setError] = useState({ integrationName: '' })
  const [showAuthMsg, setShowAuthMsg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(true)
  const { css } = useFela()
  useEffect(() => () => {
    setIsMounted(false)
  }, [])

  const handleAuthorize = () => {
    setIsLoading('auth')
    bitsFetch({}, 'bitforms_fluent_crm_authorize')
      .then(result => {
        if (isMounted) {
          if (result?.success) {
            setisAuthorized(true)
            setSnackbar({ show: true, msg: __('Connect Successfully', 'bitfrom') })
          }
          setShowAuthMsg(true)
          setIsLoading(false)
        }
      })
  }
  const handleInput = e => {
    const newConf = { ...fluentCrmConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setFluentCrmConf(newConf)
  }

  return (
    <>
      <TutorialLink
        title={tutorialLinks.fluentCRM.title}
        youTubeLink={tutorialLinks.fluentCRM.link}
      />
      <div
        className="btcd-stp-page"
        style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}
      >
        <div className="mt-3"><b>{__('Integration Name:')}</b></div>
        <input
          className="btcd-paper-inp w-5 mt-1"
          onChange={handleInput}
          name="name"
          value={fluentCrmConf.name}
          type="text"
          placeholder={__('Integration Name...')}
          disabled={isInfo}
        />
        {isLoading === 'auth' && (
          <div className="flx mt-5">
            <LoaderSm size={25} clr="#022217" className="mr-2" />
            Checking if Fluent CRM is active!!!
          </div>
        )}

        {(showAuthMsg && !isAuthorized && !isLoading) && (
          <div className="flx mt-5" style={{ color: 'red' }}>
            <span className="mr-2" style={{ fontSize: 30, marginTop: -5 }}>
              <CloseIcn size="15" />
            </span>
            Please! First Install Fluent CRM Plugins
          </div>
        )}
        <Btn
          variant="success"
          onClick={handleAuthorize}
          disabled={isAuthorized}
          className={css(ut.mt3, { ml: 3 })}
        >
          {isAuthorized ? __('Connected ✔') : __('Connect to Fluent CRM')}
          {isLoading && <LoaderSm size={20} clr="#022217" className="ml-2" />}
        </Btn>
        <br />
        <Btn
          variant="success"
          onClick={() => nextPage(2)}
          className={css(ut.ftRight, ut.mt3)}
          disabled={!isAuthorized}
        >
          {__('Next')}
          <BackIcn className="ml-1 rev-icn" />
        </Btn>
      </div>
    </>
  )
}
