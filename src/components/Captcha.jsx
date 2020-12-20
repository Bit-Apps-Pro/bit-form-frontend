import { useContext } from 'react';
import { __ } from '@wordpress/i18n'
import { AppSettings } from '../Utils/AppSettingsContext'

export default function Captcha({ saveCaptcha }) {
  const { reCaptchaV2, setreCaptchaV2 } = useContext(AppSettings)

  const onInput = e => {
    reCaptchaV2[e.target.name] = e.target.value
    setreCaptchaV2({ ...reCaptchaV2 })
  }

  return (
    <div className="btcd-captcha">
      <h2>{__('Google reCAPTCHA v2', 'bitform')}</h2>
      <small>
        {__('reCAPTCHA is a free service that protects your website from spam and abuse.', 'bitform')}
        <a className="btcd-link" href="https://developers.google.com/recaptcha/docs/display" target="_blank" rel="noopener noreferrer">
          {' '}
          {__('Learn More', 'bitform')}
        </a>
      </small>
      <br />
      <br />
      <div className="btcd-hr" />

      <div className="mt-2">
        <label htmlFor="captcha-key">
          {__('Site Key', 'bitform')}
          <input id="captcha-key" onChange={onInput} name="siteKey" className="btcd-paper-inp mt-1" value={reCaptchaV2.siteKey} placeholder="Site Key" type="text" />
        </label>
      </div>
      <div className="mt-2">
        <label htmlFor="captcha-secret">
          {__('Secret Key', 'bitform')}
          <input id="captcha-secret" onChange={onInput} name="secretKey" className="btcd-paper-inp mt-1" value={reCaptchaV2.secretKey} placeholder="Secret Key" type="text" />
        </label>
      </div>
      <button onClick={saveCaptcha} type="button" className="btn btn-md f-right blue">{__('Save', 'bitform')}</button>
    </div>
  )
}
