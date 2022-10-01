/* eslint-disable no-unused-expressions */
import { useState } from 'react'
import { useFela } from 'react-fela'
import toast from 'react-hot-toast'
import BackIcn from '../../../Icons/BackIcn'
import ut from '../../../styles/2.utilities'
import app from '../../../styles/app.style'
import { __ } from '../../../Utils/i18nwrap'
import tutorialLinks from '../../../Utils/StaticData/tutorialLinks'
import LoaderSm from '../../Loaders/LoaderSm'
import Btn from '../../Utilities/Btn'
import TutorialLink from '../../Utilities/TutorialLink'
import { getAllDropboxFolders, handleAuthorize } from './DropboxCommonFunc'

export default function DropboxAuthorization({ formID, dropboxConf, setDropboxConf, step, setStep, isLoading, setIsLoading, isInfo }) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [error, setError] = useState({ apiKey: '', apiSecret: '' })
  const { css } = useFela()

  const nextPage = () => {
    getAllDropboxFolders(formID, dropboxConf, setDropboxConf, setIsLoading)
    setStep(2)
    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  const handleInput = e => {
    const newConf = { ...dropboxConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    newConf[e.target.name] = e.target.value
    setError(rmError)
    setDropboxConf(newConf)
  }

  const getAccessCode = () => {
    if (!dropboxConf.apiKey || !dropboxConf.apiSecret) {
      toast.error(__('Please enter API key and API secret'))
      return
    }
    window.open(`https://www.dropbox.com/oauth2/authorize?client_id=${dropboxConf.apiKey}&token_access_type=offline&response_type=code`, '_blank')
  }

  return (
    <div
      className="btcd-stp-page"
      style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${220}%` } }}
    >
      <TutorialLink
        title={tutorialLinks.dropbox.title}
        youTubeLink={tutorialLinks.dropbox.link}
      />
      <div className="mt-3">
        <b>{__('Integration Name:', 'bitform')}</b>
      </div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="name"
        value={dropboxConf.name}
        type="text"
        placeholder={__('Integration Name...')}
        disabled={isInfo}
      />

      <small className="d-blk mt-3">
        {__('To Get Api Key & Secret, Please Visit')}
        &nbsp;
        <a
          className="btcd-link"
          rel="noreferrer"
          target="_blank"
          href="https://www.dropbox.com/developers/apps/create?_tk=pilot_lp&_ad=ctabtn1&_camp=create"
        >
          {__('Dropbox API Console')}
        </a>
      </small>

      <div className="mt-3">
        <b>{__('Dropbox Api Key:')}</b>
      </div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="apiKey"
        value={dropboxConf.apiKey}
        type="text"
        placeholder={__('Api Key...')}
        disabled={isInfo}
      />
      <div style={{ color: 'red' }}>{error.apiKey}</div>

      <div className="mt-3">
        <b>{__('Dropbox Api Secret:')}</b>
      </div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="apiSecret"
        value={dropboxConf.apiSecret}
        type="text"
        placeholder={__('Api Secret...')}
        disabled={isInfo}
      />
      <div style={{ color: 'red' }}>{error.apiSecret}</div>

      <small className="d-blk mt-3">
        {__('To Get Access Code, Please Visit')}
        &nbsp;
        <span
          className="btcd-link"
          style={{ cursor: 'pointer' }}
          onClick={getAccessCode}
          aria-hidden="true"
        >
          {__('Dropbox Access Code')}
        </span>
      </small>

      <div className="mt-3"><b>{__('Dropbox Access Code:')}</b></div>
      <input
        className="btcd-paper-inp w-6 mt-1"
        onChange={handleInput}
        name="accessCode"
        value={dropboxConf.accessCode}
        type="text"
        placeholder={__('Access Code...')}
        disabled={isInfo}
      />
      <div style={{ color: 'red' }}>{error.accessCode}</div>

      {!isInfo && (
        <>
          <Btn
            varient="success"
            onClick={() => handleAuthorize(dropboxConf, setDropboxConf, setIsAuthorized, setIsLoading)}
            disabled={isAuthorized}
            className={css(ut.mt3)}
          >
            {isAuthorized ? __('Authorized ✔') : __('Authorize')}
            {isLoading && <LoaderSm size="20" clr="#022217" className="ml-2" />}
          </Btn>
          <br />
          <Btn
            onClick={nextPage}
            varient="success"
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
