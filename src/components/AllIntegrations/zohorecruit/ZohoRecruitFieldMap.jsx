import MtInput from '../../ElmSettings/Childs/MtInput';
import { addFieldMap, delFieldMap, handleCustomValue, handleFieldMapping } from '../IntegrationHelpers/IntegrationHelpers';

export default function ZohoRecruitFieldMap({ i, uploadFields, formFields, field, recruitConf, setRecruitConf, tab }) {
  const module = tab === 0 ? recruitConf.module : recruitConf.relatedlists?.[tab - 1]?.module

  let isNotRequired;

  if (uploadFields) {
    isNotRequired = field.zohoFormField === '' || recruitConf.default.moduleData?.[module]?.requiredFileUploadFields?.indexOf(field.zohoFormField) === -1
  } else {
    isNotRequired = field.zohoFormField === '' || recruitConf.default.moduleData?.[module]?.required?.indexOf(field.zohoFormField) === -1
  }

  return (
    <div
      className={`flx flx-around mt-2 ${isNotRequired && 'mr-1'}`}
    >
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField} onChange={(ev) => handleFieldMapping(ev, i, recruitConf, setRecruitConf, uploadFields, tab)}>
        <option value="">Select Field</option>
        {
          uploadFields ? formFields.map(f => f.type === 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>) : formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
        }
        {!uploadFields && <option value="custom">Custom...</option>}
      </select>

      {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i, recruitConf, setRecruitConf, tab)} label="Custom Value" className="mr-2" type="text" value={field.customValue} placeholder="Custom Value" />}

      <select className="btcd-paper-inp" disabled={!isNotRequired} name="zohoFormField" value={field.zohoFormField} onChange={(ev) => handleFieldMapping(ev, i, recruitConf, setRecruitConf, uploadFields, tab)}>
        <option value="">Select Field</option>
        {
          uploadFields
            ? recruitConf.default.moduleData?.[module]?.fileUploadFields && Object.keys(recruitConf.default.moduleData[module].fileUploadFields).map(fieldApiName => (
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
            : recruitConf.default.moduleData?.[module]?.fields && Object.keys(recruitConf.default.moduleData[module].fields).map(fieldApiName => (
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
        onClick={() => addFieldMap(i, recruitConf, setRecruitConf, uploadFields, tab)}
        className={`icn-btn sh-sm ml-2 ${!isNotRequired && 'mr-8'}`}
        type="button"
      >
        +
      </button>
      {
        isNotRequired && (
          <button onClick={() => delFieldMap(i, recruitConf, setRecruitConf, uploadFields, tab)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
            <span className="btcd-icn icn-trash-2" />
          </button>
        )
      }
    </div>
  )
}
