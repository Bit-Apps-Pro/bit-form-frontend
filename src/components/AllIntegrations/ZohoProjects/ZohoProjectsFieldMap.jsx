// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import MtInput from '../../ElmSettings/Childs/MtInput'

export const addFieldMap = (i, projectsConf, setProjectsConf, event) => {
  const newConf = { ...projectsConf }

  newConf.field_map[event].splice(i, 0, { formField: '', zohoFormField: '' })

  setProjectsConf({ ...newConf })
}

export default function ZohoProjectsFieldMap({ i, event, formFields, field, projectsConf, setProjectsConf }) {
  const { portalId } = projectsConf
  let isNotRequired
  if (projectsConf?.projectId) {
    isNotRequired = field.zohoFormField === '' || projectsConf.default.fields?.[portalId]?.[projectsConf.projectId]?.[event]?.required?.indexOf(field.zohoFormField) === -1
  } else {
    isNotRequired = field.zohoFormField === '' || projectsConf.default.fields?.[portalId]?.[event]?.required?.indexOf(field.zohoFormField) === -1
  }

  let allFieldsMapped = ''

  if (projectsConf?.projectId) {
    if (projectsConf.default?.fields?.[projectsConf.portalId]?.[projectsConf.projectId]?.[event]?.fields) allFieldsMapped = projectsConf.field_map[event].length === Object.keys(projectsConf.default?.fields?.[projectsConf.portalId]?.[projectsConf.projectId]?.[event]?.fields).length
  } else if (projectsConf.default?.fields?.[projectsConf.portalId]?.[event]?.fields) allFieldsMapped = projectsConf.field_map[event].length === Object.keys(projectsConf.default?.fields?.[projectsConf.portalId]?.[event]?.fields).length

  const delFieldMap = (ind) => {
    const newConf = { ...projectsConf }

    if (newConf.field_map[event].length > 1) {
      newConf.field_map[event].splice(ind, 1)
    }

    setProjectsConf({ ...newConf })
  }

  const handleFieldMapping = (e, ind) => {
    const newConf = { ...projectsConf }

    newConf.field_map[event][ind][e.target.name] = e.target.value

    if (e.target.value === 'custom') {
      newConf.field_map[event][ind].customValue = ''
    }

    setProjectsConf({ ...newConf })
  }

  const handleCustomValue = (e, ind) => {
    const newConf = { ...projectsConf }
    newConf.field_map[event][ind].customValue = e.target.value

    setProjectsConf({ ...newConf })
  }

  return (
    <div
      className={`flx flx-around mt-2 ${isNotRequired && 'mr-1'}`}
    >
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField || ''} onChange={(ev) => handleFieldMapping(ev, i, projectsConf, setProjectsConf)}>
        <option value="">{__('Select Field', 'bitform')}</option>
        {formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)}
        <option value="custom">{__('Custom...', 'bitform')}</option>
      </select>

      {field.formField === 'custom' && <MtInput onChange={ev => handleCustomValue(ev, i)} label={__('Custom Value', 'bitform')} className="mr-2" type="text" value={field.customValue} placeholder={__('Custom Value', 'bitform')} />}

      <select className="btcd-paper-inp" name="zohoFormField" value={field.zohoFormField || ''} disabled={!isNotRequired} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">{__('Select Field', 'bitform')}</option>
        {
          projectsConf?.projectId
            ? projectsConf.default?.fields?.[portalId]?.[projectsConf.projectId]?.[event]?.fields && Object.values(projectsConf.default.fields[portalId][projectsConf.projectId][event].fields).map(pfield => (
              !isNotRequired ? pfield?.required && (
                <option key={pfield.displayLabel} value={pfield.apiName}>
                  {pfield.displayLabel}
                </option>
              ) : !pfield?.required && (
                <option key={pfield.displayLabel} value={pfield.apiName}>
                  {pfield.displayLabel}
                </option>
              )
            ))
            : projectsConf.default?.fields?.[portalId]?.[event]?.fields && Object.values(projectsConf.default.fields[portalId][event].fields).map(pfield => (
              !isNotRequired ? pfield?.required && (
                <option key={pfield.displayLabel} value={pfield.apiName}>
                  {pfield.displayLabel}
                </option>
              ) : !pfield?.required && (
                <option key={pfield.displayLabel} value={pfield.apiName}>
                  {pfield.displayLabel}
                </option>
              )
            ))
        }
      </select>

      {!allFieldsMapped && (
        <button
          onClick={() => addFieldMap(i, projectsConf, setProjectsConf, event)}
          className={`icn-btn sh-sm ml-2 ${!isNotRequired && 'mr-8'}`}
          type="button"
        >
          +
        </button>
      )}
      {isNotRequired && (
        <button onClick={() => delFieldMap(i)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
          <span className="btcd-icn icn-trash-2" />
        </button>
      )}
    </div>
  )
}
