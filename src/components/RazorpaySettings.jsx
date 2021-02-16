// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'

export default function RazorpaySettings({ paySetting, handleInput }) {
  return (
    <div>
      <h2>{__('Razorpay Settings', 'bitform')}</h2>
      <div className="btcd-hr" />
      <div className="flx mt-3">
        <b className="wdt-150">{__('Integration Name:', 'bitform')}</b>
        <input type="text" className="btcd-paper-inp" placeholder="Integration Name" value={paySetting.name} name="name" onChange={handleInput} />
      </div>
      <div className="flx mt-3">
        <b className="wdt-150">{__('API Key:', 'bitform')}</b>
        <input type="text" className="btcd-paper-inp" placeholder="API Key" value={paySetting.apiKey} name="apiKey" onChange={handleInput} />
      </div>
      <div className="flx mt-3">
        <b className="wdt-150">{__('API Secret:', 'bitform')}</b>
        <input type="text" className="btcd-paper-inp" placeholder="API Secret" value={paySetting.apiSecret} name="apiSecret" onChange={handleInput} />
      </div>
    </div>
  )
}
