import { __ } from '@wordpress/i18n'
import MtInput from '../../ElmSettings/Childs/MtInput'
import { addFieldMap, delFieldMap, handleCustomValue, handleFieldMapping } from '../IntegrationHelpers/IntegrationHelpers'

export default function ZohoAnalyticsFieldMap({ i, formFields, field, analyticsConf, setAnalyticsConf }) {
  return (
    <div
      className="flx flx-around mt-2 mr-1"
    >
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField} onChange={(ev) => handleFieldMapping(ev, i, analyticsConf, setAnalyticsConf)}>
        <option value="">{__('Select Field', 'bitform')}</option>
        {
          formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
        }
        <option value="custom">{__('Custom...', 'bitform')}</option>
      </select>

      {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i, analyticsConf, setAnalyticsConf)} label={__('Custom Value', 'bitform')} className="mr-2" type="text" value={field.customValue} placeholder={__('Custom Value', 'bitform')} />}

      <select className="btcd-paper-inp" name="zohoFormField" value={field.zohoFormField} onChange={(ev) => handleFieldMapping(ev, i, analyticsConf, setAnalyticsConf)}>
        <option value="">{__('Select Field', 'bitform')}</option>
        {
          Object.values(analyticsConf.default.tables.headers[analyticsConf.table]).map(header => (
            <option key={`${header}-1`} value={header}>
              {header}
            </option>
          ))
        }
      </select>
      <button
        onClick={() => addFieldMap(i, analyticsConf, setAnalyticsConf)}
        className="icn-btn sh-sm ml-2 mr-8"
        type="button"
      >
        +
      </button>
      <button onClick={() => delFieldMap(i, analyticsConf, setAnalyticsConf)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
        <span className="btcd-icn icn-trash-2" />
      </button>
    </div>
  )
}
