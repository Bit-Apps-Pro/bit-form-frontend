// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'

export default function PaypalSettings({ paySetting, handleInput }) {
  return (
    <div>
      <h2>{__('Paypal Settings', 'bitform')}</h2>
      <div className="btcd-hr" />
      <div className="flx mt-3">
        <b className="wdt-150">{__('Integration Name:', 'bitform')}</b>
        <input type="text" className="btcd-paper-inp" placeholder="Integration Name" value={paySetting.name} name="name" onChange={handleInput} />
      </div>
      <div className="flx mt-3">
        <b className="wdt-150">{__('Client ID:', 'bitform')}</b>
        <input type="text" className="btcd-paper-inp" placeholder="Client ID" value={paySetting.clientID} name="clientID" onChange={handleInput} />
      </div>
    </div>
  )
}
