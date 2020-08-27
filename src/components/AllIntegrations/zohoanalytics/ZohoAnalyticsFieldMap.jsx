import React from 'react'
import MtInput from '../../ElmSettings/Childs/MtInput'

export default function ZohoAnalyticsFieldMap({ i, formFields, field, analyticsConf, setAnalyticsConf }) {
  const { table } = analyticsConf

  const addMap = ind => {
    const newConf = { ...analyticsConf }

    newConf.field_map.splice(ind, 0, { formField: '', zohoFormField: '' })

    setAnalyticsConf({ ...newConf })
  }

  const delMap = ind => {
    const newConf = { ...analyticsConf }
    if (newConf.field_map.length > 1) {
      newConf.field_map.splice(ind, 1)
    }
    setAnalyticsConf({ ...newConf })
  }

  const handleFieldMapping = (event, index) => {
    const newConf = { ...analyticsConf }
    newConf.field_map[index][event.target.name] = event.target.value
    setAnalyticsConf({ ...newConf })
  }

  const handleCustomValue = (e, ind) => {
    const newConf = { ...analyticsConf }
    newConf.field_map[ind].customValue = e.target.value
    setAnalyticsConf({ ...newConf })
  }

  return (
    <div
      className="flx flx-around mt-2 mr-1"
    >
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        {
          formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
        }
        <option value="custom">Custom...</option>
      </select>

      {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i)} label="Custom Value" className="mr-2" type="text" placeholder="Custom Value" />}

      <select className="btcd-paper-inp" name="zohoFormField" value={field.zohoFormField} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        {
          Object.values(analyticsConf.default.tables.headers[table]).map(header => (
            <option key={`${header}-1`} value={header}>
              {header}
            </option>
          ))
        }
      </select>
      <button
        onClick={() => addMap(i)}
        className="icn-btn sh-sm ml-2 mr-8"
        type="button"
      >
        +
      </button>
      <button onClick={() => delMap(i)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
        <span className="btcd-icn icn-trash-2" />
      </button>
    </div>
  )
}
