import React from 'react'
import MtInput from '../../ElmSettings/Childs/MtInput'

export default function ZohoCrmFieldMap({ i, formFields, field, crmConf, setCrmConf, setSnackbar }) {
  const isNotRequired = crmConf?.default?.layouts?.[crmConf.module]?.[crmConf.layout]?.required?.indexOf(field.zohoFormField) === -1
  //  console.log('ssssss', field)
  const addMap = ind => {
    crmConf.field_map.splice(ind, 0, { formField: '', zohoFormField: '' })
    setCrmConf({ ...crmConf })
  }

  const delMap = ind => {
    if (crmConf.field_map.length > 1) {
      crmConf.field_map.splice(ind, 1)
    }
    setCrmConf({ ...crmConf })
  }

  const handleFieldMapping = (event, index) => {
    if (event.target.name === 'formField'
      && crmConf.field_map[index].zohoFormField !== ''
      && crmConf.default.layouts[crmConf.module][crmConf.layout].fields[crmConf.field_map[index].zohoFormField].data_type === 'fileupload'
      && formFields[formFields.map(fld => fld.key).indexOf(event.target.value)].type !== 'file-up'
    ) {
      setSnackbar({ show: true, msg: 'Please select file field' })
      return
    }
    if (event.target.name === 'zohoFormField'
      && crmConf.field_map[index].formField !== ''
      && crmConf.default.layouts[crmConf.module][crmConf.layout].fields[event.target.value].data_type === 'fileupload'
      && formFields[formFields.map(fld => fld.key).indexOf(crmConf.field_map[index].formField)].type !== 'file-up'
    ) {
      setSnackbar({ show: true, msg: 'Please select file field' })
      return
    }
    const newConf = { ...crmConf }
    newConf.field_map[index][event.target.name] = event.target.value
    setCrmConf({ ...crmConf, ...newConf })
  }

  const handleCustomValue = (e, ind) => {
    const newConf = { ...crmConf }
    newConf.field_map[ind].customValue = e.target.value
    setCrmConf({ ...crmConf, ...newConf })
  }

  return (
    <div
      className={`flx flx-around mt-2 ${isNotRequired && 'mr-1'}`}
    >
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        {formFields.map(f => field.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)}
        <option value="custom">Custom...</option>
      </select>

      {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i)} label="Custom Value" className="mr-2" type="text" placeholder="Custom Value" />}

      <select className="btcd-paper-inp" disabled={!isNotRequired} name="zohoFormField" value={field.zohoFormField} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        {
          Object.keys(crmConf.default.layouts[crmConf.module][crmConf.layout].fields).map(fieldApiName => (
            <option key={fieldApiName} value={fieldApiName}>
              {crmConf.default.layouts[crmConf.module][crmConf.layout].fields[fieldApiName].display_label}
            </option>
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
