import React from 'react'
import MtInput from '../../ElmSettings/Childs/MtInput'

export default function ZohoDeskFieldMap({ i, formFields, field, deskConf, setDeskConf }) {
  const { orgId } = deskConf
  const isNotRequired = field.zohoFormField === '' || deskConf.default.fields[orgId].required?.indexOf(field.zohoFormField) === -1

  const addMap = ind => {
    const newConf = { ...deskConf }

    newConf.field_map.splice(ind, 0, { formField: '', zohoFormField: '' })

    setDeskConf({ ...newConf })
  }

  const delMap = ind => {
    const newConf = { ...deskConf }
    if (newConf.field_map.length > 1) {
      newConf.field_map.splice(ind, 1)
    }
    setDeskConf({ ...newConf })
  }

  const handleFieldMapping = (event, index) => {
    const newConf = { ...deskConf }
    newConf.field_map[index][event.target.name] = event.target.value
    setDeskConf({ ...newConf })
  }

  const handleCustomValue = (e, ind) => {
    const newConf = { ...deskConf }
    newConf.field_map[ind].customValue = e.target.value
    setDeskConf({ ...newConf })
  }

  return (
    <div
      className={`flx flx-around mt-2 ${isNotRequired && 'mr-1'}`}
    >
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        {
          formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
        }
        <option value="custom">Custom...</option>
      </select>

      {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i)} label="Custom Value" className="mr-2" type="text" value={field.customValue} placeholder="Custom Value" />}

      <select className="btcd-paper-inp" name="zohoFormField" value={field.zohoFormField} disabled={!isNotRequired} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        {
            deskConf.default.fields[orgId].fields.map(ticketField => (
              isNotRequired ? ticketField.required === false
              && (
                <option key={ticketField.displayLabel} value={ticketField.apiName}>
                  {ticketField.displayLabel}
                </option>
              ) : (
                <option key={ticketField.displayLabel} value={ticketField.apiName}>
                  {ticketField.displayLabel}
                </option>
              )
            ))

        }
      </select>
      <button
        onClick={() => addMap(i)}
        className={`icn-btn sh-sm ml-2 ${!isNotRequired && 'mr-8'}`}
        type="button"
      >
        +
      </button>
      {
        isNotRequired && (
          <button onClick={() => delMap(i)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
            <span className="btcd-icn icn-trash-2" />
          </button>
        )
      }
    </div>
  )
}
