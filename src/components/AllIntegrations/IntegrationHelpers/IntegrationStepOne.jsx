import { useFela } from 'react-fela'
import { useAtomValue } from 'recoil'
import { $bits } from '../../../GlobalStates/GlobalStates'
import BackIcn from '../../../Icons/BackIcn'
import app from '../../../styles/app.style'
import { __ } from '../../../Utils/i18nwrap'
import LoaderSm from '../../Loaders/LoaderSm'
import CopyText from '../../Utilities/CopyText'
import AuthorizeBtn from '../AuthorizeBtn'
import NextBtn from '../NextBtn'

export default function IntegrationStepOne({
  step, confTmp, handleInput, error, handleAuthorize, isLoading, isAuthorized, nextPage, children,
}) {
  const { css } = useFela()
  const bits = useAtomValue($bits)
  const { siteURL } = bits

  return (
    <div
      className="btcd-stp-page"
      style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}
    >
      <div className="mt-3"><b>{__('Integration Name:')}</b></div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="name"
        value={confTmp.name}
        type="text"
        placeholder={__('Integration Name...')}
      />

      <div className="mt-3"><b>{__('Data Center:')}</b></div>
      <select
        onChange={handleInput}
        name="dataCenter"
        value={confTmp.dataCenter}
        className="btcd-paper-inp w-9 mt-1"
      >
        <option value="">{__('--Select a data center--')}</option>
        <option value="com">zoho.com</option>
        <option value="eu">zoho.eu</option>
        <option value="com.cn">zoho.com.cn</option>
        <option value="in">zoho.in</option>
        <option value="com.au">zoho.com.au</option>
      </select>
      <div style={{ color: 'red' }}>{error.dataCenter}</div>

      <div className="mt-3"><b>{__('Homepage URL:')}</b></div>
      <CopyText value={siteURL} className="field-key-cpy w-6 ml-0" />

      <div className="mt-3"><b>{__('Authorized Redirect URIs:')}</b></div>
      <CopyText value={`${window.location.href}/redirect`} className="field-key-cpy w-6 ml-0" />

      <small className="d-blk mt-5">
        {__('To get Client ID and SECRET , Please Visit')}
        {' '}
        <a
          className="btcd-link"
          href="https://api-console.zoho.com/"
          target="_blank"
          rel="noreferrer"
        >
          {__('Zoho API Console')}
        </a>
      </small>

      <div className="mt-3"><b>{__('Client id:')}</b></div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="clientId"
        value={confTmp.clientId}
        type="text"
        placeholder={__('Client id...')}
      />
      <div style={{ color: 'red' }}>{error.clientId}</div>

      <div className="mt-3"><b>{__('Client secret:')}</b></div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="clientSecret"
        value={confTmp.clientSecret}
        type="text"
        placeholder={__('Client secret...')}
      />
      <div style={{ color: 'red' }}>{error.clientSecret}</div>

      {children}

      <AuthorizeBtn
        handleAuthorize={handleAuthorize}
        isLoading={isLoading}
        isAuthorized={isAuthorized}
      />
      <br />
      <NextBtn
        nextPageHanlder={() => nextPage(2)}
        disabled={!isAuthorized}
      />
    </div>
  )
}
