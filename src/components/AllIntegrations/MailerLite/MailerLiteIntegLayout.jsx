import { __ } from '../../../Utils/i18nwrap'
import { addFieldMap } from './IntegrationHelpers'
import MailerLiteFieldMap from './MailerLiteFieldMap'
import MailerLiteActions from './MailerLiteActions'

export default function MailerLiteIntegLayout({ formFields, handleInput, mailerLiteConf, setMailerLiteConf, isLoading, setIsLoading, setSnackbar }) {
  return (
    <>
      <br />
     
      <div className="mt-5"><b className="wdt-100">{__('Field Map', 'bit-integrations')}</b></div>
      <div className="btcd-hr mt-1" />
      <div className="flx flx-around mt-2 mb-2 btcbi-field-map-label">
        <div className="txt-dp"><b>{__('Form Fields', 'bit-integrations')}</b></div>
        <div className="txt-dp"><b>{__('MailerLite Fields', 'bit-integrations')}</b></div>
      </div>

      { mailerLiteConf?.field_map.map((itm, i) => (
        <MailerLiteFieldMap
          key={`rp-m-${i + 9}`}
          i={i}
          field={itm}
          mailerLiteConf={mailerLiteConf}
          formFields={formFields}
          setMailerLiteConf={setMailerLiteConf}
          setSnackbar={setSnackbar}
        />
      ))}
      <div className="txt-center btcbi-field-map-button mt-2"><button onClick={() => addFieldMap(mailerLiteConf.field_map.length, mailerLiteConf, setMailerLiteConf, false)} className="icn-btn sh-sm" type="button">+</button></div>
      <br />
      <br />

        <>
          <div className="mt-4"><b className="wdt-100">{__('Actions', 'bit-integrations')}</b></div>
          <div className="btcd-hr mt-1" />
          <MailerLiteActions
            mailerLiteConf={mailerLiteConf}
            setMailerLiteConf={setMailerLiteConf}
            formFields={formFields}
          />
        </>
   
    </>
  )
}
