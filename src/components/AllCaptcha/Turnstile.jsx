import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import { Link } from 'react-router-dom'
import { $turnstile } from '../../GlobalStates/AppSettingsStates'
import { $bits } from '../../GlobalStates/GlobalStates'
import { deepCopy } from '../../Utils/Helpers'
import bitsFetch from '../../Utils/bitsFetch'
import { loadScript, removeScript } from '../../Utils/globalHelpers'
import { __ } from '../../Utils/i18nwrap'
import app from '../../styles/app.style'
import LoaderSm from '../Loaders/LoaderSm'
import CopyText from '../Utilities/CopyText'
import SnackMsg from '../Utilities/SnackMsg'

export default function Turnstile() {
  const { css } = useFela()
  const turnstileWrapElmRef = useRef(null)
  const turnstileResetIntervalRef = useRef(null)
  const turnstileCaptchaId = useRef(null)

  const [turnstile, setTurnstile] = useAtom($turnstile)
  const bits = useAtomValue($bits)
  const [snack, setSnack] = useState({ show: false })
  const [loading, setLoading] = useState(false)

  const siteURL = bits.siteURL.replace(/(^\w+:|^)\/\//, '')

  const onInput = ({ target }) => {
    const { name, value } = target
    const temp = deepCopy(turnstile)
    temp[name] = value
    setTurnstile(temp)
  }

  const saveCaptcha = () => {
    setLoading(true)

    const data = {
      reCaptcha: turnstile,
      integrationName: 'turnstile reCaptcha',
      integrationType: 'turnstileCaptcha',
    }

    bitsFetch(data, 'bitforms_save_grecaptcha')
      .then(res => {
        if (res !== undefined && res.success) {
          if (res.data && res.data.id) {
            setTurnstile({ ...turnstile, id: res.data.id })
          }
          setSnack({ ...{ show: true, msg: __('Captcha Settings Updated') } })
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  // useEffect(() => {
  //   window.onloadTurnstileCallback = onloadTurnstileCallback

  //   const src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback'
  //   const srcData = {
  //     src,
  //     integrity: '',
  //     id: 'bf-turnstile-script',
  //     async: true,
  //     defer: true,
  //   }
  //   if (turnstile?.siteKey) {
  //     loadScript(srcData)
  //   }

  //   return () => {
  //     clearInterval(turnstileResetIntervalRef.current)
  //     removeScript(srcData.id)
  //   }
  // }, [turnstile?.siteKey])
  // function onloadTurnstileCallback() {
  //   let turnstileCaptchaElm = document.querySelector('.turnstile-captcha-preview')
  //   if (turnstileCaptchaId.current !== null) {
  //     turnstileCaptchaElm?.remove()
  //     window.turnstile?.reset(turnstileCaptchaId.current)
  //     turnstileCaptchaElm = document.createElement('div')
  //     turnstileCaptchaElm.classList.add('turnstile-captcha-preview')
  //     turnstileWrapElmRef.current.appendChild(turnstileCaptchaElm)
  //   }

  //   turnstileCaptchaId.current = window.turnstile.render(turnstileCaptchaElm, {
  //     sitekey: turnstile?.siteKey || '1x00000000000000000000AA',
  //     theme: 'auto',
  //     size: 'normal',
  //   })

  //   if (turnstileResetIntervalRef.current) {
  //     clearInterval(turnstileResetIntervalRef.current)
  //   }
  //   turnstileResetIntervalRef.current = setInterval(() => {
  //     window.turnstile.reset(turnstileCaptchaId.current)
  //   }, 30000)
  // }
  // useEffect(() => {
  //   if (window.turnstile) onloadTurnstileCallback()
  // }, [turnstile])

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnack} />
      <div className={css({ flx: 'center-between' })}>
        <h2>{__('Cloudflare Turnstile reCAPTCHA')}</h2>
        <Link
          to="/app-settings/recaptcha"
          className={`${css(app.btn)} btn-md blue`}
        >
          Back
        </Link>
      </div>
      <div className="btcd-hr" />
      <div className="btcd-captcha">
        <small>
          {__('reCAPTCHA is a free service that protects your website from spam and abuse.')}
          <a
            className="btcd-link"
            href="https://developers.cloudflare.com/turnstile/"
            target="_blank"
            rel="noopener noreferrer"
          >
            &nbsp;
            {__('Learn More')}
          </a>
        </small>
        <br />

        <div className="mt-3">{__('Domain URL:')}</div>
        <CopyText value={siteURL} className="field-key-cpy ml-0" />
        <div className="mt-2">
          <label htmlFor="captcha-key">
            {__('Site Key')}
            <input
              id="captcha-key"
              onChange={e => onInput(e)}
              name="siteKey"
              className="btcd-paper-inp mt-1"
              value={turnstile?.siteKey}
              placeholder="Site Key"
              type="text"
            />
          </label>
        </div>
        <div className="mt-2">
          <label htmlFor="captcha-secret">
            {__('Secret Key')}
            <input
              id="captcha-secret"
              onChange={e => onInput(e)}
              name="secretKey"
              className="btcd-paper-inp mt-1"
              value={turnstile.secretKey}
              placeholder="Secret Key"
              type="text"
            />
          </label>
        </div>
        <div className="mt-2">
          <p>
            {__('To get Site Key and Secret, Please Visit')}
            &nbsp;
            <a
              className="btcd-link"
              href="https://dash.cloudflare.com/?to=/:account/turnstile"
              target="_blank"
              rel="noreferrer"
            >
              {__('Cloudflare Turnstile reCAPTCHA Admin')}
            </a>
          </p>
        </div>
        <div className="mt-2">
          {/* <span>{__('Preview')}</span> */}
          <div className="turnstile-wrp" ref={turnstileWrapElmRef}>
            <div className="turnstile-captcha-preview" />
          </div>
        </div>
        <button
          onClick={() => saveCaptcha()}
          type="button"
          className={`${css(app.btn)} btn-md f-right blue`}
          disabled={loading}
        >
          {turnstile?.id ? __('Update') : __('Save')}
          {loading && <LoaderSm size={20} clr="#fff" className="ml-2" />}
        </button>
      </div>
    </div>
  )
}
