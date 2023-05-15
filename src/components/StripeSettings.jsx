import { __ } from '../Utils/i18nwrap'
import CheckBox from './Utilities/CheckBox'

export default function StripeSettings({ paySetting, handleInput }) {
  return (
    <div>
      <h2>{__('Stripe Settings')}</h2>
      <div className="btcd-hr" />
      <div className="flx mt-3">
        <b className="wdt-200">{__('Integration Name:')}</b>
        <input
          type="text"
          className="btcd-paper-inp"
          placeholder="Integration Name"
          value={paySetting.name || ''}
          name="name"
          onChange={handleInput}
        />
      </div>
      <div className="flx mt-3">
        <b className="wdt-150 mr-2">{__('Environment Mode:')}</b>
        <CheckBox
          radio
          name="mode"
          onChange={handleInput}
          checked={paySetting.mode === 'test'}
          title={<small className="txt-dp"><b>Test</b></small>}
          value="test"
        />
        <CheckBox
          radio
          name="mode"
          onChange={handleInput}
          checked={paySetting.mode === 'live'}
          title={<small className="txt-dp"><b>Live</b></small>}
          value="live"
        />
      </div>
      <div className="flx mt-3">
        <b className="wdt-200">{__('Publishable key:')}</b>
        <input
          type="text"
          className="btcd-paper-inp"
          placeholder="Publishable key"
          value={paySetting.publishableKey || ''}
          name="publishableKey"
          onChange={handleInput}
        />
      </div>
      <div className="flx mt-3">
        <b className="wdt-200">{__('Secret Key:')}</b>
        <input
          type="text"
          className="btcd-paper-inp"
          placeholder="Secret Key"
          value={paySetting.clientSecret || ''}
          name="clientSecret"
          onChange={handleInput}
        />
      </div>
      <div className="flx">
        <small className="d-blk mt-2" style={{ marginLeft: 170 }}>
          {__('To get Publishable key & Secret key, Please Visit')}
          {' '}
          <a
            className="btcd-link"
            href="https://dashboard.stripe.com/apikeys"
            target="_blank"
            rel="noreferrer"
          >
            {__('Stripe Developer Dashboard')}
          </a>
        </small>
      </div>
    </div>
  )
}
