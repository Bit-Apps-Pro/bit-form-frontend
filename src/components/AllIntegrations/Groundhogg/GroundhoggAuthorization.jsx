import { useState } from 'react'
import { useFela } from 'react-fela'
import BackIcn from '../../../Icons/BackIcn'
import ut from '../../../styles/2.utilities'
import { __ } from '../../../Utils/i18nwrap'
import LoaderSm from '../../Loaders/LoaderSm'
import Btn from '../../Utilities/Btn'
import { fetchAllTags, handleAuthorize } from './GroundhoggCommonFunc'

export default function GroundhoggAuthorization({ formID, groundhoggConf, setGroundhoggConf, step, setstep, isLoading, setIsLoading, setSnackbar, redirectLocation, isInfo }) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const { css } = useFela()
  const [error, setError] = useState({ token: '', public_key: '', domainName: '' })
  const nextPage = () => {
    setTimeout(() => {
      document.getElementById('btcd-settings-wrp').scrollTop = 0
    }, 300)

    setstep(2)
    fetchAllTags(formID, groundhoggConf, setGroundhoggConf, setIsLoading, setSnackbar)
  }

  const handleInput = e => {
    const newConf = { ...groundhoggConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setGroundhoggConf(newConf)
  }

  return (
    <div
      className="btcd-stp-page"
      style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && 'auto' } }}
    >
      <div className="mt-3">
        <b>{__('Integration Name:')}</b>
      </div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="name"
        value={groundhoggConf.name}
        type="text"
        placeholder={__('Integration Name...')}
        disabled={isInfo}
      />

      <div className="mt-3">
        <b>{__('Your Domain Name:')}</b>
      </div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="domainName"
        value={groundhoggConf.domainName}
        type="text"
        placeholder={__('Integration Name...')}
        disabled={isInfo}
      />
      <div className="mt-3">
        <b>{__('Public Key:')}</b>
      </div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="public_key"
        value={groundhoggConf.public_key}
        type="text"
        placeholder={__('Public Key...')}
        disabled={isInfo}
      />
      <div className="mt-3">
        <b>{__('Token:')}</b>
      </div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="token"
        value={groundhoggConf.token}
        type="text"
        placeholder={__('Token...')}
        disabled={isInfo}
      />
      <div style={{ color: 'red', fontSize: '15px' }}>{error.api_key}</div>

      <div style={{ color: 'red', fontSize: '15px' }}>{error.clientSecret}</div>
      {!isInfo && (
        <>
          <Btn
            variant="success"
            onClick={() => handleAuthorize(
              groundhoggConf,
              setGroundhoggConf,
              setError,
              setisAuthorized,
              setIsLoading,
              setSnackbar,
            )}
            className={css(ut.mt3, { ml: 3 })}
            disabled={isAuthorized || isLoading}
          >
            {isAuthorized ? __('Authorized ✔') : __('Authorize')}
            {isLoading && <LoaderSm size={20} clr="#022217" className="ml-2" />}
          </Btn>
          <br />
          <Btn
            variant="success"
            onClick={nextPage}
            className={css(ut.ftRight)}
            disabled={!isAuthorized}
          >
            {__('Next')}
            <BackIcn className="ml-1 rev-icn" />
          </Btn>
        </>
      )}
    </div>
  )
}
