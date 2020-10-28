import MtInput from '../../ElmSettings/Childs/MtInput'
import { addFieldMap, delFieldMap, handleCustomValue, handleFieldMapping } from '../IntegrationHelpers/IntegrationHelpers'

export default function ZohoMarketingHubFieldMap({ i, formFields, field, marketingHubConf, setMarketingHubConf }) {
  const isNotRequired = field.zohoFormField === '' || marketingHubConf.default.fields[marketingHubConf.list].required?.indexOf(field.zohoFormField) === -1

  return (
    <div
      className={`flx flx-around mt-2 ${isNotRequired && 'mr-1'}`}
    >
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField} onChange={(ev) => handleFieldMapping(ev, i, marketingHubConf, setMarketingHubConf)}>
        <option value="">Select Field</option>
        {
          formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
        }
        <option value="custom">Custom...</option>
      </select>

      {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i, marketingHubConf, setMarketingHubConf)} label="Custom Value" className="mr-2" type="text" value={field.customValue} placeholder="Custom Value" />}

      <select className="btcd-paper-inp" name="zohoFormField" value={field.zohoFormField} disabled={!isNotRequired} onChange={(ev) => handleFieldMapping(ev, i, marketingHubConf, setMarketingHubConf)}>
        <option value="">Select Field</option>
        {
          isNotRequired
            ? marketingHubConf?.default?.fields?.[marketingHubConf.list]?.fields && marketingHubConf.default.fields[marketingHubConf.list].fields.map(contactField => contactField !== 'Contact Email'
              && (
                <option key={`${contactField}-1`} value={contactField}>
                  {contactField}
                </option>
              ))
            : (
              <option key="contact_email" value="Contact Email">
                Contact Email
              </option>
            )
        }
      </select>
      <button
        onClick={() => addFieldMap(i, marketingHubConf, setMarketingHubConf)}
        className={`icn-btn sh-sm ml-2 ${!isNotRequired && 'mr-8'}`}
        type="button"
      >
        +
      </button>
      {
        isNotRequired && (
          <button onClick={() => delFieldMap(i, marketingHubConf, setMarketingHubConf)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
            <span className="btcd-icn icn-trash-2" />
          </button>
        )
      }
    </div>
  )
}
