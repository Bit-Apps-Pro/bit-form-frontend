import { useState } from 'react'
import { useFela } from 'react-fela'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { useAtom, useAtomValue } from 'recoil'
import { $reCaptchaV2, $reCaptchaV3 } from '../GlobalStates/AppSettingsStates'
import { $bits } from '../GlobalStates/GlobalStates'
import { deepCopy } from '../Utils/Helpers'
import bitsFetch from '../Utils/bitsFetch'
import { __ } from '../Utils/i18nwrap'
import app from '../styles/app.style'
import LoaderSm from './Loaders/LoaderSm'
import CopyText from './Utilities/CopyText'
import SnackMsg from './Utilities/SnackMsg'

export default function Captcha() {
  const [reCaptchaV2, setreCaptchaV2] = useAtom($reCaptchaV2)
  const [reCaptchaV3, setreCaptchaV3] = useAtom($reCaptchaV3)
  const bits = useAtomValue($bits)
  const [snack, setsnack] = useState({ show: false })
  const [loading, setLoading] = useState(false)
  const { css } = useFela()

  const saveCaptcha = version => {
    setLoading(true)
    const reCaptcha = version === 'v2' ? reCaptchaV2 : reCaptchaV3
    bitsFetch({ version, reCaptcha }, 'bitforms_save_grecaptcha')
      .then(res => {
        if (res !== undefined && res.success) {
          if (res.data && res.data.id) {
            if (version === 'v2') {
              setreCaptchaV2({ ...reCaptchaV2, id: res.data.id })
            } else if (version === 'v3') {
              setreCaptchaV3({ ...reCaptchaV3, id: res.data.id })
            }
          }
          setsnack({ ...{ show: true, msg: __('Captcha Settings Updated') } })
        }
        setLoading(false)
      })
      .catch(_ => setLoading(false))
  }

  const onInput = (e, version) => {
    if (version === 'v2') {
      const tmp = deepCopy(reCaptchaV2)
      tmp[e.target.name] = e.target.value
      setreCaptchaV2(tmp)
    } else if (version === 'v3') {
      const tmpv3 = deepCopy(reCaptchaV3)
      tmpv3[e.target.name] = e.target.value
      setreCaptchaV3(tmpv3)
    }
  }

  // remove http & https from site url
  const siteURL = bits.siteURL.replace(/(^\w+:|^)\/\//, '')

  return (
    <div className="btcd-captcha">
      <SnackMsg snack={snack} setSnackbar={setsnack} />
      <Tabs
        selectedTabClassName="s-t-l-active"
      >
        <TabList className="flx m-0 mt-2">
          {['v3', 'v2'].map(ver => (
            <Tab key={`cp-${ver}`} className="btcd-s-tab-link">
              <b>{__(`reCaptcha ${ver}`)}</b>
            </Tab>
          ))}
        </TabList>
        <div className="btcd-hr" />
        {['v3', 'v2'].map(ver => (
          <TabPanel key={ver}>
            <h2>{__(`Google reCAPTCHA ${ver}`)}</h2>
            <small>
              {__('reCAPTCHA is a free service that protects your website from spam and abuse.')}
              <a className="btcd-link" href={`https://developers.google.com/recaptcha/docs/${ver === 'v3' ? 'v3' : 'display'}`} target="_blank" rel="noopener noreferrer">
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
                <input id="captcha-key" onChange={e => onInput(e, ver)} name="siteKey" className="btcd-paper-inp mt-1" value={(ver === 'v3' ? reCaptchaV3 : reCaptchaV2).siteKey} placeholder="Site Key" type="text" />
              </label>
            </div>
            <div className="mt-2">
              <label htmlFor="captcha-secret">
                {__('Secret Key')}
                <input id="captcha-secret" onChange={e => onInput(e, ver)} name="secretKey" className="btcd-paper-inp mt-1" value={(ver === 'v3' ? reCaptchaV3 : reCaptchaV2).secretKey} placeholder="Secret Key" type="text" />
              </label>
            </div>
            <div className="mt-2">
              <p>
                {__('To get Site Key and SECRET , Please Visit')}
                &nbsp;
                <a className="btcd-link" href="https://www.google.com/recaptcha/admin/" target="_blank" rel="noreferrer">{__('Google reCAPTCHA Admin')}</a>
              </p>
            </div>
            <button onClick={() => saveCaptcha(ver)} type="button" className={`${css(app.btn)} btn-md f-right blue`} disabled={loading}>
              {__('Save')}
              {loading && <LoaderSm size={20} clr="#fff" className="ml-2" />}
            </button>
          </TabPanel>
        ))}
      </Tabs>

    </div>
  )
}
