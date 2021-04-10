import { useContext } from 'react';

import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { __ } from '../Utils/i18nwrap'
import { AppSettings } from '../Utils/AppSettingsContext'
import CopyText from './ElmSettings/Childs/CopyText';

export default function Captcha({ saveCaptcha, setsnack }) {
  const { reCaptchaV2, setreCaptchaV2 } = useContext(AppSettings)
  const { reCaptchaV3, setreCaptchaV3 } = useContext(AppSettings)

  const onInput = (e, version) => {
    if (version === 'v2') {
      reCaptchaV2[e.target.name] = e.target.value
      setreCaptchaV2({ ...reCaptchaV2 })
    } else if (version === 'v3') {
      reCaptchaV3[e.target.name] = e.target.value
      setreCaptchaV3({ ...reCaptchaV3 })
    }
  }

  return (
    <div className="btcd-captcha">

      <Tabs
        selectedTabClassName="s-t-l-active"
      >
        <TabList className="flx m-0 mt-2">
          <Tab className="btcd-s-tab-link">
            {__('reCaptcha v3', 'bitform')}
          </Tab>
          <Tab className="btcd-s-tab-link">
            {__('reCaptcha v2', 'bitform')}
          </Tab>
        </TabList>
        <div className="btcd-hr" />

        <TabPanel>
          <h2>{__('Google reCAPTCHA v3', 'bitform')}</h2>
          <small>
            {__('reCAPTCHA is a free service that protects your website from spam and abuse.', 'bitform')}
            <a className="btcd-link" href="https://developers.google.com/recaptcha/docs/v3" target="_blank" rel="noopener noreferrer">
              &nbsp;
              {__('Learn More', 'bitform')}
            </a>
          </small>
          <br />

          <div className="mt-3">{__('Domain URL:', 'bitform')}</div>
          <CopyText value={window.location.host} setSnackbar={setsnack} className="field-key-cpy ml-0" />
          <div className="mt-2">
            <label htmlFor="captcha-key">
              {__('Site Key', 'bitform')}
              <input id="captcha-key" onChange={e => onInput(e, 'v3')} name="siteKey" className="btcd-paper-inp mt-1" value={reCaptchaV3.siteKey} placeholder="Site Key" type="text" />
            </label>
          </div>
          <div className="mt-2">
            <label htmlFor="captcha-secret">
              {__('Secret Key', 'bitform')}
              <input id="captcha-secret" onChange={e => onInput(e, 'v3')} name="secretKey" className="btcd-paper-inp mt-1" value={reCaptchaV3.secretKey} placeholder="Secret Key" type="text" />
            </label>
          </div>
          <div className="mt-2">
            <p>
              {__('To get Site Key and SECRET , Please Visit', 'bitform')}
              &nbsp;
              <a className="btcd-link" href="https://www.google.com/recaptcha/admin/" target="_blank" rel="noreferrer">{__('Google reCAPTCHA Admin', 'bitform')}</a>
            </p>
          </div>
          <button onClick={() => saveCaptcha('v3')} type="button" className="btn btn-md f-right blue">{__('Save', 'bitform')}</button>
        </TabPanel>
        <TabPanel>
          <h2>{__('Google reCAPTCHA v2', 'bitform')}</h2>
          <small>
            {__('reCAPTCHA is a free service that protects your website from spam and abuse.', 'bitform')}
            <a className="btcd-link" href="https://developers.google.com/recaptcha/docs/display" target="_blank" rel="noopener noreferrer">
              {' '}
              {__('Learn More', 'bitform')}
            </a>
          </small>
          <br />

          <div className="mt-3">{__('Domain URL:', 'bitform')}</div>
          <CopyText value={window.location.host} setSnackbar={setsnack} className="field-key-cpy ml-0" />
          <div className="mt-2">
            <label htmlFor="captcha-key">
              {__('Site Key', 'bitform')}
              <input id="captcha-key" onChange={e => onInput(e, 'v2')} name="siteKey" className="btcd-paper-inp mt-1" value={reCaptchaV2.siteKey} placeholder="Site Key" type="text" />
            </label>
          </div>
          <div className="mt-2">
            <label htmlFor="captcha-secret">
              {__('Secret Key', 'bitform')}
              <input id="captcha-secret" onChange={e => onInput(e, 'v2')} name="secretKey" className="btcd-paper-inp mt-1" value={reCaptchaV2.secretKey} placeholder="Secret Key" type="text" />
            </label>
          </div>
          <div className="mt-2">
            <p>
              {__('To get Site Key and SECRET , Please Visit', 'bitform')}
              &nbsp;
              <a className="btcd-link" href="https://www.google.com/recaptcha/admin/" target="_blank" rel="noreferrer">{__('Google reCAPTCHA Admin', 'bitform')}</a>
            </p>
          </div>
          <button onClick={() => saveCaptcha('v2')} type="button" className="btn btn-md f-right blue">{__('Save', 'bitform')}</button>
        </TabPanel>
      </Tabs>

    </div>
  )
}
