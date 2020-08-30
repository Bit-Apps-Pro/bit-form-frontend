import React from 'react'
import MtInput from '../../ElmSettings/Childs/MtInput'

export default function ZohoCRMFieldMap({ i, formFields, uploadFields, field, crmConf, setCrmConf, tab, setSnackbar }) {
  const module = tab === 0 ? crmConf.module : crmConf.relatedlist.module
  const layout = tab === 0 ? crmConf.layout : crmConf.relatedlist.layout

  let isNotRequired;

  if (uploadFields) {
    isNotRequired = field.zohoFormField === '' || crmConf.default.layouts[module][layout]?.requiredFileUploadFields?.indexOf(field.zohoFormField) === -1
  } else {
    isNotRequired = field.zohoFormField === '' || crmConf.default.layouts[module][layout]?.required?.indexOf(field.zohoFormField) === -1
  }

  const addMap = ind => {
    const newConf = { ...crmConf }
    if (tab === 0) {
      if (uploadFields) {
        newConf.upload_field_map.splice(ind, 0, { formField: '', zohoFormField: '' })
      } else {
        newConf.field_map.splice(ind, 0, { formField: '', zohoFormField: '' })
      }
    } else if (uploadFields) {
      newConf.relatedlist.upload_field_map.splice(ind, 0, { formField: '', zohoFormField: '' })
    } else {
      newConf.relatedlist.field_map.splice(ind, 0, { formField: '', zohoFormField: '' })
    }
    setCrmConf({ ...newConf })
  }

  const delMap = ind => {
    const newConf = { ...crmConf }
    if (tab === 0) {
      if (uploadFields) {
        if (newConf.upload_field_map.length > 1) {
          newConf.upload_field_map.splice(ind, 1)
        }
      } else if (newConf.field_map.length > 1) {
        newConf.field_map.splice(ind, 1)
      }
    } else if (uploadFields) {
      if (newConf.relatedlist.upload_field_map.length > 1) {
        newConf.relatedlist.upload_field_map.splice(ind, 1)
      }
    } else if (newConf.relatedlist.field_map.length > 1) {
      newConf.relatedlist.field_map.splice(ind, 1)
    }
    setCrmConf({ ...newConf })
  }

  const handleFieldMapping = (event, index) => {
    const newConf = { ...crmConf }
    if (uploadFields) {
      const selectedZohoField = tab === 0 ? newConf.upload_field_map[index].zohoFormField : newConf.relatedlist.upload_field_map[index].zohoFormField
      const selectedformField = tab === 0 ? newConf.upload_field_map[index].formField : newConf.relatedlist.upload_field_map[index].formField
      if (event.target.name === 'formField'
        && selectedZohoField !== ''
        && newConf.default.layouts[module][layout].fileUploadFields[selectedZohoField].data_type === 'fileupload'
        && formFields[formFields.map(fld => fld.key).indexOf(event.target.value)].type !== 'file-up'
      ) {
        setSnackbar({ show: true, msg: 'Please select file field' })
        return
      }
      if (event.target.name === 'zohoFormField'
        && selectedformField !== ''
        && newConf.default.layouts[module][layout].fileUploadFields[event.target.value].data_type === 'fileupload'
        && formFields[formFields.map(fld => fld.key).indexOf(selectedformField)].type !== 'file-up'
      ) {
        setSnackbar({ show: true, msg: 'Please select file field' })
        return
      }
      if (tab === 0) {
        newConf.upload_field_map[index][event.target.name] = event.target.value
      } else {
        newConf.relatedlist.upload_field_map[index][event.target.name] = event.target.value
      }
    } else if (tab === 0) {
      if (event.target.value === 'custom') {
        newConf.field_map[index][event.target.name] = event.target.value
        newConf.field_map[index].customValue = ''
      } else {
        newConf.field_map[index][event.target.name] = event.target.value
      }
    } else if (event.target.value === 'custom') {
      newConf.relatedlist.field_map[index][event.target.name] = event.target.value
      newConf.relatedlist.field_map[index].customValue = ''
    } else {
      newConf.relatedlist.field_map[index][event.target.name] = event.target.value
    }
    setCrmConf({ ...newConf })
  }

  const handleCustomValue = (e, ind) => {
    const newConf = { ...crmConf }
    if (tab === 0) {
      newConf.field_map[ind].customValue = e.target.value
    } else {
      newConf.relatedlist.field_map[ind].customValue = e.target.value
    }
    setCrmConf({ ...newConf })
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

      {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i)} label="Custom Value" className="mr-2" type="text" value={field.zohoFormField} placeholder="Custom Value" />}

      <select className="btcd-paper-inp" disabled={!isNotRequired} name="zohoFormField" value={field.zohoFormField} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        {
          uploadFields ? Object.keys(crmConf.default.layouts[module][layout].fileUploadFields).filter(fld => fld.required !== true).map(fieldApiName => (
            isNotRequired ? !crmConf.default.layouts[module][layout].fileUploadFields[fieldApiName].required && (
              <option key={fieldApiName} value={fieldApiName}>
                {crmConf.default.layouts[module][layout].fileUploadFields[fieldApiName].display_label}
              </option>
            ) : (
                <option key={fieldApiName} value={fieldApiName}>
                  {crmConf.default.layouts[module][layout].fileUploadFields[fieldApiName].display_label}
                </option>
              )
          )) : Object.keys(crmConf.default.layouts[module][layout].fields).filter(fld => fld.required !== true).map(fieldApiName => (
            isNotRequired ? !crmConf.default.layouts[module][layout].fields[fieldApiName].required
              && (
                <option key={fieldApiName} value={fieldApiName}>
                  {crmConf.default.layouts[module][layout].fields[fieldApiName].display_label}
                </option>
              ) : (
                <option key={fieldApiName} value={fieldApiName}>
                  {crmConf.default.layouts[module][layout].fields[fieldApiName].display_label}
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
