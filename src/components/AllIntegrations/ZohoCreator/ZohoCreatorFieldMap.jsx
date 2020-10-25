import React from 'react'
import MtInput from '../../ElmSettings/Childs/MtInput'
import { addFieldMap, delFieldMap, handleCustomValue, handleFieldMapping } from '../IntegrationHelpers/IntegrationHelpers'

export default function ZohoCreatorFieldMap({ i, formFields, uploadFields, field, creatorConf, setCreatorConf }) {
  const { applicationId, formId } = creatorConf
  let isNotRequired;

  if (uploadFields) isNotRequired = field.zohoFormField === '' || creatorConf.default?.fields?.[applicationId]?.[formId]?.requiredFileUploadFields?.indexOf(field.zohoFormField) === -1
  else isNotRequired = field.zohoFormField === '' || creatorConf.default?.fields?.[applicationId]?.[formId]?.required?.indexOf(field.zohoFormField) === -1

  return (
    <div
      className={`flx flx-around mt-2 ${isNotRequired && 'mr-1'}`}
    >
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField} onChange={(ev) => handleFieldMapping(ev, i, creatorConf, setCreatorConf, uploadFields)}>
        <option value="">Select Field</option>
        {
          formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
        }
        <option value="custom">Custom...</option>
      </select>

      {field.formField === 'custom' && <MtInput onChange={ev => handleCustomValue(ev, i, creatorConf, setCreatorConf)} label="Custom Value" className="mr-2" type="text" value={field.customValue} placeholder="Custom Value" />}

      <select className="btcd-paper-inp" name="zohoFormField" value={field.zohoFormField} disabled={!isNotRequired} onChange={(ev) => handleFieldMapping(ev, i, creatorConf, setCreatorConf, uploadFields)}>
        <option value="">Select Field</option>
        {
          uploadFields ? creatorConf.default?.fields?.[applicationId]?.[formId]?.fileUploadFields && Object.values(creatorConf.default.fields[applicationId][formId].fileUploadFields).map(apiField => (
            isNotRequired
              ? apiField.required === false && (
                <option key={apiField.displayLabel} value={apiField.apiName}>
                  {apiField.displayLabel}
                </option>
              )
              : (
                <option key={apiField.displayLabel} value={apiField.apiName}>
                  {apiField.displayLabel}
                </option>
              )
          ))
            : creatorConf.default?.fields?.[applicationId]?.[formId]?.fields && Object.values(creatorConf.default.fields[applicationId][formId].fields).map(apiField => (
              isNotRequired
                ? apiField.required === false && (
                  <option key={apiField.displayLabel} value={apiField.apiName}>
                    {apiField.displayLabel}
                  </option>
                )
                : (
                  <option key={apiField.displayLabel} value={apiField.apiName}>
                    {apiField.displayLabel}
                  </option>
                )
            ))
        }
      </select>
      <button
        onClick={() => addFieldMap(i, creatorConf, setCreatorConf, uploadFields)}
        className={`icn-btn sh-sm ml-2 ${!isNotRequired && 'mr-8'}`}
        type="button"
      >
        +
      </button>
      {
        isNotRequired && (
          <button onClick={() => delFieldMap(i, creatorConf, setCreatorConf, uploadFields)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
            <span className="btcd-icn icn-trash-2" />
          </button>
        )
      }
    </div>
  )
}
