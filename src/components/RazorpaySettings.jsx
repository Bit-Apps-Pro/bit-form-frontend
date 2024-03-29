import { __ } from '../Utils/i18nwrap'

export default function RazorpaySettings({ paySetting, handleInput }) {
  return (
    <div>
      <h2>{__('Razorpay Settings')}</h2>
      <div className="btcd-hr" />
      <div className="flx mt-3">
        <b className="wdt-150">{__('Integration Name:')}</b>
        <input
          type="text"
          className="btcd-paper-inp"
          placeholder="Integration Name"
          value={paySetting.name}
          name="name"
          onChange={handleInput}
        />
      </div>
      <div className="flx mt-3">
        <b className="wdt-150">{__('API Key:')}</b>
        <input
          type="text"
          className="btcd-paper-inp"
          placeholder="API Key"
          value={paySetting.apiKey}
          name="apiKey"
          onChange={handleInput}
        />
      </div>
      <div className="flx mt-3">
        <b className="wdt-150">{__('API Secret:')}</b>
        <input
          type="text"
          className="btcd-paper-inp"
          placeholder="API Secret"
          value={paySetting.apiSecret}
          name="apiSecret"
          onChange={handleInput}
        />
      </div>
      <div className="flx">
        <small className="d-blk mt-5" style={{ marginLeft: 130 }}>
          {__('To get API Key & Secret, Please Visit')}
          {' '}
          <a
            className="btcd-link"
            href="https://dashboard.razorpay.com/app/keys"
            target="_blank"
            rel="noreferrer"
          >
            {__('Razorpay Dashboard')}
          </a>
        </small>
      </div>
    </div>
  )
}
