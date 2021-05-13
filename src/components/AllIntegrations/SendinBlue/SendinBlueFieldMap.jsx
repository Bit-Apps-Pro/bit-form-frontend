import { __ } from '../../../Utils/i18nwrap'
import MtInput from '../../Utilities/MtInput'

export default function SendinBlueFieldMap({ i, formFields, field, sendinBlueConf, setSendinBlueConf }) {
  const isRequired = field.required
  console.log(isRequired)
  const notResquiredField = sendinBlueConf?.default?.fields && Object.values(sendinBlueConf?.default?.fields).filter((f => !f.required))
  console.log(notResquiredField)
  const addFieldMap = (indx) => {
    const newConf = { ...sendinBlueConf }
    newConf.field_map.splice(indx, 0, {})
    setSendinBlueConf(newConf)
  }

  const delFieldMap = (indx) => {
    const newConf = { ...sendinBlueConf }
    if (newConf.field_map.length > 1) {
      newConf.field_map.splice(indx, 1)
    }
    setSendinBlueConf(newConf)
  }

  const handleFieldMapping = (event, indx) => {
    const newConf = { ...sendinBlueConf }
    newConf.field_map[indx][event.target.name] = event.target.value

    if (event.target.value === 'custom') {
      newConf.field_map[indx].customValue = ''
    }
    setSendinBlueConf(newConf)
  }

  const handleCustomValue = (event, indx) => {
    const newConf = { ...sendinBlueConf }
    newConf.field_map[indx].customValue = event.target.value
    setSendinBlueConf(newConf)
  }

  return (
    <div
      className={isRequired ? 'mt-2 mr-1 flx w-9' : 'flx flx-around mt-2 mr-1'}
    >
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField || ''} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">{__('Select Field', 'bitform')}</option>
        {
          formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
        }
        <option value="custom">{__('Custom...', 'bitform')}</option>
      </select>

      {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i)} label={__('Custom Value', 'bitform')} className="mr-2" type="text" value={field.customValue} placeholder={__('Custom Value', 'bitform')} />}

      <select className="btcd-paper-inp" name="sendinBlueField" value={field.sendinBlueField} onChange={(ev) => handleFieldMapping(ev, i)} disabled={isRequired}>
        <option value="">{__('Select Field', 'bitform')}</option>
        {isRequired ? sendinBlueConf?.default?.fields && Object.values(sendinBlueConf.default.fields).map(fld => (
          <option key={`${fld.fieldId}-1`} value={fld.fieldId}>
            {fld.fieldName}
          </option>
        )) : notResquiredField && notResquiredField.map(fld => (
          <option key={`${fld.fieldId}-1`} value={fld.fieldId}>
            {fld.fieldName}
          </option>
        ))}
      </select>
      {!isRequired
        && (
          <>
            <button
              onClick={() => addFieldMap(i)}
              className="icn-btn sh-sm ml-2"
              type="button"
            >
              +
            </button>
            <button onClick={() => delFieldMap(i)} className="icn-btn sh-sm ml-2" type="button" aria-label="btn">
              <span className="btcd-icn icn-trash-2" />
            </button>
          </>
        )}
    </div>
  )
}
