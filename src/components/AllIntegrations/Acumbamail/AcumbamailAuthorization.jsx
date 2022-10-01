import { useState } from 'react'
import { useFela } from 'react-fela'
import BackIcn from '../../../Icons/BackIcn'
import ut from '../../../styles/2.utilities'
import app from '../../../styles/app.style'
import { __ } from '../../../Utils/i18nwrap'
import tutorialLinks from '../../../Utils/StaticData/tutorialLinks'
import LoaderSm from '../../Loaders/LoaderSm'
import Btn from '../../Utilities/Btn'
import TutorialLink from '../../Utilities/TutorialLink'
import { fetchAllList, handleAuthorize } from './AcumbamailCommonFunc'

export default function AcumbamailAuthorization({ formID, acumbamailConf, setAcumbamailConf, step, setstep, isLoading, setIsLoading, setSnackbar, redirectLocation, isInfo }) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const { css } = useFela()
  const [error, setError] = useState({ dataCenter: '', clientId: '' })
  const nextPage = () => {
    setTimeout(() => {
      document.getElementById('btcd-settings-wrp').scrollTop = 0
    }, 300)

    setstep(2)
    fetchAllList(acumbamailConf, setAcumbamailConf, setIsLoading, setSnackbar)
  }

  const handleInput = e => {
    const newConf = { ...acumbamailConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setAcumbamailConf(newConf)
  }

  return (
    <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && 'auto' } }}>

      <TutorialLink
        title={tutorialLinks.acumbamail.title}
        youTubeLink={tutorialLinks.acumbamail.link}
      />

      <div className="mt-3"><b>{__('Integration Name:', 'bit-integrations')}</b></div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="name"
        value={acumbamailConf.name}
        type="text"
        placeholder={__('Integration Name...')}
        disabled={isInfo}
      />

      <small className="d-blk mt-3">
        {__('To Get Auth token, Please Visit')}
        &nbsp;
        <a className="btcd-link" href="https://acumbamail.com/en/apidoc/" target="_blank" rel="noreferrer">{__('Acumbamail documentation')}</a>
      </small>

      <div className="mt-3"><b>{__('Auth Token:', 'bit-integrations')}</b></div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="auth_token"
        value={acumbamailConf.auth_token}
        type="text"
        placeholder={__('Auth Token...')}
        disabled={isInfo}
      />
      <div style={{ color: 'red', fontSize: '15px' }}>{error.auth_token}</div>

      {!isInfo && (
        <>
          <Btn
            varient="success"
            className={css(ut.mt2)}
            onClick={() => handleAuthorize(
              acumbamailConf,
              setAcumbamailConf,
              setError,
              setisAuthorized,
              setIsLoading,
              setSnackbar,
            )}
            disabled={isAuthorized || isLoading}
          >
            {isAuthorized ? __('Authorized ✔') : __('Authorize')}
            {isLoading && <LoaderSm size={20} clr="#022217" className="ml-2" />}
          </Btn>
          <br />
          <Btn
            varient="success"
            onClick={nextPage}
            disabled={!isAuthorized}
            className={css(ut.ftRight)}
          >
            {__('Next')}
            <BackIcn className="ml-1 rev-icn" />
          </Btn>
        </>
      )}
    </div>
  )
}
