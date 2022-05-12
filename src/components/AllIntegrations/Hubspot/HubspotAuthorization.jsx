/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { useState } from 'react'
import BackIcn from '../../../Icons/BackIcn'
import bitsFetch from '../../../Utils/bitsFetch'
import { __ } from '../../../Utils/i18nwrap'
import LoaderSm from '../../Loaders/LoaderSm'
import Note from '../../Utilities/Note'
// import { getAllList } from './ElasticEmailCommonFunc'

export default function HubspotAuthorization({ hubspotConf, setHubspotConf, step, setstep, isInfo }) {
  const [isAuthorized, setisAuthorized] = useState(false)
  const [error, setError] = useState({ name: '', api_key: '' })
  const [showAuthMsg, setShowAuthMsg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAuthorize = () => {
    const newConf = { ...hubspotConf }
    if (!newConf.name || !newConf.api_key) {
      setError({
        name: !newConf.name ? __('Integration name cann\'t be empty', 'bit-integrations') : '',
        api_key: !newConf.api_key ? __('API Key cann\'t be empty', 'bit-integrations') : '',
      })
      return
    }
    setIsLoading('auth')
    const values = { api_key: newConf.api_key }
    bitsFetch(values, 'bitforms_hubspot_authorize')
      .then(result => {
        const { data } = result
        if (data) {
          setisAuthorized(true)
        }
        setShowAuthMsg(true)
        setIsLoading(false)
      })
  }
  const handleInput = e => {
    const newConf = { ...hubspotConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setHubspotConf(newConf)
  }

  const nextPage = () => {
    setTimeout(() => {
      document.getElementById('btcd-settings-wrp').scrollTop = 0
    }, 300)
    // !hubspotConf?.default && getAllList(hubspotConf, setHubspotConf, setIsLoading)
    setstep(2)
  }
  const note = `
    <h4> Step of generating api key:</h4>
    <ul>
      <li>Login to your HubSpot account, click the <b>Settings</b> icon settings in the main navigation bar..</li>
      <li>In the left sidebar menu, navigate to <b>Integrations > API key</b>.</li>
      <li>If a key has never been generated for your account, click <b>Generate API key</b>.</li>
      <li>If you've already generated an API key, click Show to display your key.</li>
  </ul>
  `

  return (
    <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && 'auto' } }}>
      <div className="mt-3"><b>{__('Integration Name:', 'bit-integrations')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="name" value={hubspotConf?.name} type="text" placeholder={__('Integration Name...', 'bit-integrations')} disabled={isInfo} />
      <div style={{ color: 'red', fontSize: '15px' }}>{error.name}</div>
      <div className="mt-3"><b>{__('API Key:', 'bit-integrations')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="api_key" value={hubspotConf?.api_key} type="text" placeholder={__('Integration Name...', 'bit-integrations')} disabled={isInfo} />
      <div style={{ color: 'red', fontSize: '15px' }}>{error.api_key}</div>
      <small className="d-blk mt-5">
        {__('To get API , Please Visit', 'bit-integrations')}
        {' '}
        <a className="btcd-link" href="https://app.hubspot.com/api-key" target="_blank" rel="noreferrer">{__('Hubspot API Console', 'bit-integrations')}</a>
      </small>
      {isLoading === 'auth' && (
        <div className="flx mt-5">
          <LoaderSm size={25} clr="#022217" className="mr-2" />
          Checking API Key!!!
        </div>
      )}

      {(showAuthMsg && !isAuthorized && !isLoading) && (
        <div className="flx mt-5" style={{ color: 'red' }}>
          <span className="btcd-icn mr-2" style={{ fontSize: 30, marginTop: -5 }}>
            &times;
          </span>
          Sorry, API key is invalid
        </div>
      )}
      {!isInfo && (
        <>
          <button onClick={handleAuthorize} className="btn btcd-btn-lg green sh-sm flx" type="button" disabled={isAuthorized || isLoading}>
            {isAuthorized ? __('Authorized ✔', 'bit-integrations') : __('Authorize', 'bit-integrations')}
            {isLoading && <LoaderSm size={20} clr="#022217" className="ml-2" />}
          </button>
          <br />
          <button onClick={() => nextPage(2)} className="btn f-right btcd-btn-lg green sh-sm flx" type="button" disabled={!isAuthorized}>
            {__('Next', 'bit-integrations')}
            <BackIcn className="ml-1 rev-icn" />
          </button>
        </>
      )}
      <Note note={note} />
    </div>
  )
}
