import React from 'react'
import MtInput from '../../ElmSettings/Childs/MtInput'

export default function ZohoRecruitFieldMap({ i, uploadFields, formFields, field, recruitConf, setRecruitConf, setSnackbar }) {
  const { module } = recruitConf
  let isNotRequired;

  if (uploadFields) {
    isNotRequired = field.zohoFormField === '' || recruitConf.default.moduleData[module].requiredFileUploadFields?.indexOf(field.zohoFormField) === -1
  } else {
    isNotRequired = field.zohoFormField === '' || recruitConf.default.moduleData[module].required?.indexOf(field.zohoFormField) === -1
  }

  const addMap = ind => {
    const newConf = { ...recruitConf }
    if (uploadFields) {
      newConf.upload_field_map.splice(ind, 0, { formField: '', zohoFormField: '' })
    } else {
      newConf.field_map.splice(ind, 0, { formField: '', zohoFormField: '' })
    }
    setRecruitConf({ ...newConf })
  }

  const delMap = ind => {
    const newConf = { ...recruitConf }
    if (uploadFields) {
      if (newConf.upload_field_map.length > 1) {
        newConf.upload_field_map.splice(ind, 1)
      }
    } else if (newConf.field_map.length > 1) {
      newConf.field_map.splice(ind, 1)
    }
    setRecruitConf({ ...newConf })
  }

  const handleFieldMapping = (event, index) => {
    const newConf = { ...recruitConf }
    if (uploadFields) {
      const selectedZohoField = newConf.upload_field_map[index].zohoFormField
      const selectedformField = newConf.upload_field_map[index].formField
      if (event.target.name === 'formField'
        && selectedZohoField !== ''
        && formFields[formFields.map(fld => fld.key).indexOf(event.target.value)].type !== 'file-up'
      ) {
        setSnackbar({ show: true, msg: 'Please select file field' })
        return
      }
      if (event.target.name === 'zohoFormField'
        && selectedformField !== ''
        && formFields[formFields.map(fld => fld.key).indexOf(selectedformField)].type !== 'file-up'
      ) {
        setSnackbar({ show: true, msg: 'Please select file field' })
        return
      }
      newConf.upload_field_map[index][event.target.name] = event.target.value
    } else {
      newConf.field_map[index][event.target.name] = event.target.value
    }
    setRecruitConf({ ...newConf })
  }

  const handleCustomValue = (e, ind) => {
    const newConf = { ...recruitConf }
    newConf.field_map[ind].customValue = e.target.value
    setRecruitConf({ ...newConf })
  }

  return (
    <div
      className={`flx flx-around mt-2 ${isNotRequired && 'mr-1'}`}
    >
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        {
          uploadFields ? formFields.map(f => f.type === 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>) : formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
        }
        {!uploadFields && <option value="custom">Custom...</option>}
      </select>

      {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i)} label="Custom Value" className="mr-2" type="text" value={field.customValue} placeholder="Custom Value" />}

      <select className="btcd-paper-inp" disabled={!isNotRequired} name="zohoFormField" value={field.zohoFormField} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        {
          uploadFields
            ? Object.keys(recruitConf.default.moduleData[module].fileUploadFields).map(fieldApiName => (
              isNotRequired ? recruitConf.default.moduleData[module].fileUploadFields[fieldApiName].required === 'false'
                && (
                  <option key={fieldApiName} value={fieldApiName}>
                    {recruitConf.default.moduleData[module].fileUploadFields[fieldApiName].display_label}
                  </option>
                ) : (
                  <option key={fieldApiName} value={fieldApiName}>
                    {recruitConf.default.moduleData[module].fileUploadFields[fieldApiName].display_label}
                  </option>
                )
            ))
            : Object.keys(recruitConf.default.moduleData[module].fields).map(fieldApiName => (
              isNotRequired ? recruitConf.default.moduleData[module].fields[fieldApiName].required === 'false'
                && (
                  <option key={fieldApiName} value={fieldApiName}>
                    {recruitConf.default.moduleData[module].fields[fieldApiName].display_label}
                  </option>
                ) : (
                  <option key={fieldApiName} value={fieldApiName}>
                    {recruitConf.default.moduleData[module].fields[fieldApiName].display_label}
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
