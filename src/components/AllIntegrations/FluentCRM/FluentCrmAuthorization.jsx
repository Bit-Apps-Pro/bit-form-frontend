import { useEffect, useState } from 'react'
import CloseIcn from '../../../Icons/CloseIcn'
import bitsFetch from '../../../Utils/bitsFetch'
import { __ } from '../../../Utils/i18nwrap'
import tutorialLinks from '../../../Utils/StaticData/tutorialLinks'
import LoaderSm from '../../Loaders/LoaderSm'
import TutorialLink from '../../Utilities/TutorialLink'
import AuthorizeBtn from '../AuthorizeBtn'
import NextBtn from '../NextBtn'

export default function FluentCrmAuthorization({
  fluentCrmConf, setFluentCrmConf, step, nextPage, setSnackbar, isInfo,
}) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const [error, setError] = useState({ integrationName: '' })
  const [showAuthMsg, setShowAuthMsg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(true)
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
      </div>
    </>
  )
}
