import React, { useContext } from 'react'
import { AppSettings } from '../Utils/AppSettingsContext'

export default function Captcha() {
  const { reCaptchaV2, setreCaptchaV2 } = useContext(AppSettings)

  const onInput = e => {
    reCaptchaV2[e.target.name] = e.target.value
    setreCaptchaV2({ ...reCaptchaV2 })
  }

  return (
    <div className="btcd-captcha">
      <h2>Google reCAPTCHA v2</h2>
      <small>
        reCAPTCHA is a free service that protects your website from spam and abuse.
        <a className="btcd-link" href="https://developers.google.com/recaptcha/docs/display" target="_blank" rel="noopener noreferrer"> Learn More</a>
      </small>
      <br />
      <br />
      <div className="btcd-hr" />

      <div className="mt-2">
        <label htmlFor="captcha-key">
          Site Key
          <input id="captcha-key" onChange={onInput} name="siteKey" className="btcd-paper-inp mt-1" value={reCaptchaV2.siteKey} placeholder="Site Key" type="text" />
        </label>
      </div>
      <div className="mt-2">
        <label htmlFor="captcha-secret">
          Secret Key
          <input id="captcha-secret" onChange={onInput} name="secretKey" className="btcd-paper-inp mt-1" value={reCaptchaV2.secretKey} placeholder="Secret Key" type="text" />
        </label>
      </div>
    </div>
  )
}
