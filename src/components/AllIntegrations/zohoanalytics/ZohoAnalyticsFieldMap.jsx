// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import MtInput from '../../ElmSettings/Childs/MtInput'

export const addFieldMap = (indx, analyticsConf, setAnalyticsConf) => {
  const newConf = { ...analyticsConf }
  newConf.field_map.splice(indx, 0, {})

  setAnalyticsConf(newConf)
}

export default function ZohoAnalyticsFieldMap({ i, formFields, field, analyticsConf, setAnalyticsConf }) {
  const delFieldMap = (indx) => {
    const newConf = { ...analyticsConf }
    if (newConf.field_map.length > 1) {
      newConf.field_map.splice(indx, 1)
    }

    setAnalyticsConf(newConf)
  }

  const handleFieldMapping = (event, indx) => {
    const newConf = { ...analyticsConf }
    newConf.field_map[indx][event.target.name] = event.target.value

    if (event.target.value === 'custom') {
      newConf.field_map[indx].customValue = ''
    }

    setAnalyticsConf(newConf)
  }

  const handleCustomValue = (event, indx) => {
    const newConf = { ...analyticsConf }
    newConf.field_map[indx].customValue = event.target.value
    setAnalyticsConf(newConf)
  }

  return (
    <div
      className="flx flx-around mt-2 mr-1"
    >
      <div className="flx integ-fld-wrp">
        <select className="btcd-paper-inp mr-2" name="formField" value={field.formField || ''} onChange={(ev) => handleFieldMapping(ev, i)}>
          <option value="">{__('Select Field', 'bitform')}</option>
          {
            formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
          }
          <option value="custom">{__('Custom...', 'bitform')}</option>
        </select>

        {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i)} label={__('Custom Value', 'bitform')} className="mr-2" type="text" value={field.customValue} placeholder={__('Custom Value', 'bitform')} />}

        <select className="btcd-paper-inp" name="zohoFormField" value={field.zohoFormField || ''} onChange={(ev) => handleFieldMapping(ev, i)}>
          <option value="">{__('Select Field', 'bitform')}</option>
          {
            Object.values(analyticsConf.default.tables.headers[analyticsConf.table]).map(header => (
              <option key={`${header}-1`} value={header}>
                {header}
              </option>
            ))
          }
        </select>
      </div>
      <button
        onClick={() => addFieldMap(i, analyticsConf, setAnalyticsConf)}
        className="icn-btn sh-sm ml-2 mr-1"
        type="button"
      >
        +
      </button>
      <button onClick={() => delFieldMap(i)} className="icn-btn sh-sm ml-2" type="button" aria-label="btn">
        <span className="btcd-icn icn-trash-2" />
      </button>
    </div>
  )
}
