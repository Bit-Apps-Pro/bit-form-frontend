import TrashIcn from '../../../Icons/TrashIcn'
import { __ } from '../../../Utils/i18nwrap'
import MtInput from '../../Utilities/MtInput'

export default function FluentCrmFieldMap({ i, formFields, field, fluentCrmConf, setFluentCrmConf }) {
  const isRequired = field.required
  const notResquiredField = fluentCrmConf?.default?.fields && Object.values(fluentCrmConf?.default?.fields).filter((f => !f.required))
  const addFieldMap = (indx) => {
    const newConf = { ...fluentCrmConf }
    newConf.field_map.splice(indx, 0, {})
    setFluentCrmConf(newConf)
  }

  const delFieldMap = (indx) => {
    const newConf = { ...fluentCrmConf }
    if (newConf.field_map.length > 1) {
      newConf.field_map.splice(indx, 1)
    }
    setFluentCrmConf(newConf)
  }

  const handleFieldMapping = (event, indx) => {
    const newConf = { ...fluentCrmConf }
    newConf.field_map[indx][event.target.name] = event.target.value

    if (event.target.value === 'custom') {
      newConf.field_map[indx].customValue = ''
    }
    setFluentCrmConf(newConf)
  }

  const handleCustomValue = (event, indx) => {
    const newConf = { ...fluentCrmConf }
    newConf.field_map[indx].customValue = event.target.value
    setFluentCrmConf(newConf)
  }

  return (
    <div className="flx mt-2 mr-1" >
      <div className="flx integ-fld-wrp">
        <select className="btcd-paper-inp mr-2" name="formField" value={field.formField || ''} onChange={(ev) => handleFieldMapping(ev, i)}>
          <option value="">{__('Select Field', 'bitform')}</option>
          {
            formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
          }
          <option value="custom">{__('Custom...', 'bitform')}</option>
        </select>

        {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i)} label={__('Custom Value', 'bitform')} className="mr-2" type="text" value={field.customValue} placeholder={__('Custom Value', 'bitform')} />}

        <select className="btcd-paper-inp" name="fluentCRMField" value={field.fluentCRMField} onChange={(ev) => handleFieldMapping(ev, i)} disabled={isRequired}>
          <option value="">{__('Select Field', 'bitform')}</option>
          {
            isRequired ? fluentCrmConf?.default?.fields && Object.values(fluentCrmConf.default.fields).map(fld => (
              <option key={`${fld.key}-1`} value={fld.key}>
                {fld.label}
              </option>
            )) : notResquiredField && notResquiredField.map(fld => (
              <option key={`${fld.key}-1`} value={fld.key}>
                {fld.label}
              </option>
            ))
          }
        </select>
      </div>
      {(!isRequired)
        && (
          <>
            <button
              onClick={() => addFieldMap(i)}
              className="icn-btn sh-sm ml-2 mr-1"
              type="button"
            >
              +
            </button>
            <button onClick={() => delFieldMap(i)} className="icn-btn sh-sm ml-2" type="button" aria-label="btn">
              <TrashIcn />
            </button>
          </>
        )}
    </div>
  )
}
