
import { __ } from '../../../Utils/i18nwrap'
import CopyText from '../../ElmSettings/Childs/CopyText'
import LoaderSm from '../../Loaders/LoaderSm'

export default function GoogleSheetAuthorization({ step, confTmp, handleInput, error, setSnackbar, handleAuthorize, isLoading, isAuthorized, nextPage, children }) {
  return (
    <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
      <div className="mt-3"><b>{__('Integration Name:', 'bitform')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="name" value={confTmp.name} type="text" placeholder={__('Integration Name...', 'bitform')} />

      <div className="mt-3"><b>{__('Homepage URL:', 'bitform')}</b></div>
      <CopyText value={`${window.location.origin}`} setSnackbar={setSnackbar} className="field-key-cpy w-6 ml-0" />

      <div className="mt-3"><b>{__('Authorized Redirect URIs:', 'bitform')}</b></div>
      <CopyText value={`${bits.googleRedirectURL}`} setSnackbar={setSnackbar} className="field-key-cpy w-6 ml-0" />

      <small className="d-blk mt-5">
        {__('To get Client ID and SECRET , Please Visit', 'bitform')}
        {' '}
        <a className="btcd-link" href="https://console.developers.google.com/apis/credentials" target="_blank" rel="noreferrer">{__('Google API Console', 'bitform')}</a>
      </small>

      <div className="mt-3"><b>{__('Client id:', 'bitform')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="clientId" value={confTmp.clientId} type="text" placeholder={__('Client id...', 'bitform')} />
      <div style={{ color: 'red', fontSize: '15px' }}>{error.clientId}</div>

      <div className="mt-3"><b>{__('Client secret:', 'bitform')}</b></div>
      <input className="btcd-paper-inp w-6 mt-1" onChange={handleInput} name="clientSecret" value={confTmp.clientSecret} type="text" placeholder={__('Client secret...', 'bitform')} />
      <div style={{ color: 'red', fontSize: '15px' }}>{error.clientSecret}</div>

      {children}

      <button onClick={handleAuthorize} className="btn btcd-btn-lg green sh-sm flx" type="button" disabled={isAuthorized}>
        {isAuthorized ? __('Authorized ✔', 'bitform') : __('Authorize', 'bitform')}
        {isLoading && <LoaderSm size="20" clr="#022217" className="ml-2" />}
      </button>
      <br />
      <button onClick={() => nextPage(2)} className="btn f-right btcd-btn-lg green sh-sm flx" type="button" disabled={!isAuthorized}>
        {__('Next', 'bitform')}
        {' '}
&nbsp;
        <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
      </button>
    </div>
  )
}
