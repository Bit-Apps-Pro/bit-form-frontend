import { useAtomValue } from 'jotai'
import { $bits } from '../../../GlobalStates/GlobalStates'
import TrashIcn from '../../../Icons/TrashIcn'
import { __ } from '../../../Utils/i18nwrap'
import { SmartTagField } from '../../../Utils/StaticData/SmartTagField'
import MtInput from '../../Utilities/MtInput'
import { generateMappedField } from './HubspotCommonFunc'
import { addFieldMap, delFieldMap, handleCustomValue, handleFieldMapping } from './IntegrationHelpers'

export default function HubspotFieldMap({
  i, formFields, field, hubspotConf, setHubspotConf, actionName, hubspotFields,
}) {
  if (hubspotConf?.field_map?.length === 1 && field.hubspotField === '') {
    const newConf = { ...hubspotConf }
    const tmp = generateMappedField(newConf, actionName)
    newConf.field_map = tmp
    setHubspotConf(newConf)
  }

  const requiredFlds = hubspotFields.filter(fld => fld.required === true) || []
  const nonRequiredFlds = hubspotFields.filter(fld => fld.required === false) || []

  const bits = useAtomValue($bits)
  const { isPro } = bits

  return (
    <div className="flx mt-2 mb-2 bits-field-map">
      <div className="pos-rel flx">
        <div className="flx integ-fld-wrp">
          <select
            className="btcd-paper-inp mr-2"
            name="formField"
            value={field.formField || ''}
            onChange={(ev) => handleFieldMapping(ev, i, hubspotConf, setHubspotConf)}
          >
            <option value="">{__('Select Field')}</option>
            <optgroup label="Form Fields">
              {

                formFields?.map(f => (
                  <option key={`ff-rm-${f.key}`} value={f.key}>
                    {f.name}
                  </option>
                ))
              }
            </optgroup>
            <option value="custom">{__('Custom...')}</option>
            <optgroup label={`General Smart Codes ${isPro ? '' : '(PRO)'}`}>
              {isPro && SmartTagField?.map(f => (
                <option key={`ff-rm-${f.name}`} value={f.name}>
                  {f.label}
                </option>
              ))}
            </optgroup>
          </select>

          {field.formField === 'custom'
            && (
              <MtInput
                onChange={e => handleCustomValue(e, i, hubspotConf, setHubspotConf)}
                label={__('Custom Value')}
                className="mr-2"
                type="text"
                value={field.customValue}
                placeholder={__('Custom Value')}
              />
            )}

          <select
            className="btcd-paper-inp"
            disabled={i < requiredFlds.length}
            name="hubspotField"
            value={i < requiredFlds?.length ? (requiredFlds[i].key || '') : (field.hubspotField || '')}
            onChange={(ev) => handleFieldMapping(ev, i, hubspotConf, setHubspotConf)}
          >
            <option value="">{__('Select Field')}</option>
            {
              i < requiredFlds.length ? (
                <option key={requiredFlds[i].key} value={requiredFlds[i].key}>
                  {requiredFlds[i].label}
                </option>
              ) : (
                nonRequiredFlds.map(({ key, label }) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))
              )
            }
          </select>
        </div>
        {
          i >= requiredFlds.length && (
            <>
              <button
                onClick={() => addFieldMap(i, hubspotConf, setHubspotConf)}
                className="icn-btn sh-sm ml-2 mr-1"
                type="button"
              >
                +
              </button>
              <button
                onClick={() => delFieldMap(i, hubspotConf, setHubspotConf)}
                className="icn-btn sh-sm ml-1"
                type="button"
                aria-label="btn"
              >
                <TrashIcn size="15" />
              </button>
            </>
          )
        }
      </div>
    </div>
  )
}
