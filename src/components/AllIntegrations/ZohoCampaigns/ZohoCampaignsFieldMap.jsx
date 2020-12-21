import { __ } from '@wordpress/i18n'
import MtInput from '../../ElmSettings/Childs/MtInput'
import { addFieldMap, delFieldMap, handleCustomValue, handleFieldMapping } from '../IntegrationHelpers/IntegrationHelpers'

export default function ZohoCampaignsFieldMap({ i, formFields, field, campaignsConf, setCampaignsConf }) {
  const isNotRequired = field.zohoFormField === '' || campaignsConf.default.fields[campaignsConf.list].required?.indexOf(field.zohoFormField) === -1

  return (
    <div
      className={`flx flx-around mt-2 ${isNotRequired && 'mr-1'}`}
    >
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField} onChange={(ev) => handleFieldMapping(ev, i, campaignsConf, setCampaignsConf)}>
        <option value="">{__('Select Field', 'bitform')}</option>
        {
          formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
        }
        <option value="custom">{__('Custom...', 'bitform')}</option>
      </select>

      {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i, campaignsConf, setCampaignsConf)} label={__('Custom Value', 'bitform')} className="mr-2" type="text" value={field.customValue} placeholder={__('Custom Value', 'bitform')} />}

      <select className="btcd-paper-inp" name="zohoFormField" value={field.zohoFormField} disabled={!isNotRequired} onChange={(ev) => handleFieldMapping(ev, i, campaignsConf, setCampaignsConf)}>
        <option value="">{__('Select Field', 'bitform')}</option>
        {
          isNotRequired
            ? campaignsConf?.default?.fields?.[campaignsConf.list]?.fields && campaignsConf.default.fields[campaignsConf.list].fields.map(contactField => contactField !== 'Contact Email'
              && (
                <option key={`${contactField}-1`} value={contactField}>
                  {contactField}
                </option>
              ))
            : (
              <option key="contact_email" value="Contact Email">
                {__('Contact Email', 'bitform')}
              </option>
            )
        }
      </select>
      <button
        onClick={() => addFieldMap(i, campaignsConf, setCampaignsConf)}
        className={`icn-btn sh-sm ml-2 ${!isNotRequired && 'mr-8'}`}
        type="button"
      >
        +
      </button>
      {
        isNotRequired && (
          <button onClick={() => delFieldMap(i, campaignsConf, setCampaignsConf)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
            <span className="btcd-icn icn-trash-2" />
          </button>
        )
      }
    </div>
  )
}
