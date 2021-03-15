
import { __ } from '../../../Utils/i18nwrap'
import MtInput from '../../ElmSettings/Childs/MtInput'
import { addFieldMap, delFieldMap, handleCustomValue, handleFieldMapping } from '../IntegrationHelpers/IntegrationHelpers'

export default function ZohoDeskFieldMap({ i, formFields, field, deskConf, setDeskConf }) {
  const { orgId } = deskConf
  const isNotRequired = field.zohoFormField === '' || deskConf.default.fields[orgId].required?.indexOf(field.zohoFormField) === -1

  return (
    <div
      className="flx mt-2 mr-1"
    >
      <div className="flx integ-fld-wrp">
        <select className="btcd-paper-inp mr-2" name="formField" value={field.formField || ''} onChange={(ev) => handleFieldMapping(ev, i, deskConf, setDeskConf)}>
          <option value="">{__('Select Field', 'bitform')}</option>
          {
            formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
          }
          <option value="custom">{__('Custom...', 'bitform')}</option>
        </select>

        {field.formField === 'custom' && <MtInput onChange={ev => handleCustomValue(ev, i, deskConf, setDeskConf)} label={__('Custom Value', 'bitform')} className="mr-2" type="text" value={field.customValue} placeholder={__('Custom Value', 'bitform')} />}

        <select className="btcd-paper-inp" name="zohoFormField" value={field.zohoFormField || ''} disabled={!isNotRequired} onChange={(ev) => handleFieldMapping(ev, i, deskConf, setDeskConf)}>
          <option value="">{__('Select Field', 'bitform')}</option>
          {
            deskConf.default?.fields?.[orgId]?.fields && Object.values(deskConf.default.fields[orgId].fields).map(ticketField => (
              isNotRequired
                ? ticketField.required === false && (
                  <option key={ticketField.displayLabel} value={ticketField.apiName}>
                    {ticketField.displayLabel}
                  </option>
                )
                : (
                  <option key={ticketField.displayLabel} value={ticketField.apiName}>
                    {ticketField.displayLabel}
                  </option>
                )
            ))
          }
        </select>
      </div>

      {
        isNotRequired && (
          <>
            <button
              onClick={() => addFieldMap(i, deskConf, setDeskConf)}
              className="icn-btn sh-sm ml-2 mr-1"
              type="button"
            >
              +
            </button>
            <button onClick={() => delFieldMap(i, deskConf, setDeskConf)} className="icn-btn sh-sm" type="button" aria-label="btn">
              <span className="btcd-icn icn-trash-2" />
            </button>
          </>
        )
      }
    </div>
  )
}
