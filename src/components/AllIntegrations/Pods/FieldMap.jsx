import TrashIcn from '../../../Icons/TrashIcn'
import { __ } from '../../../Utils/i18nwrap'
import { addFieldMap, delFieldMap, handleFieldMapping } from './PodHelperFunction'

export default function PodsFieldMap({ i, type, formFields, field, dataConf, setDataConf, podFields }) {
  const fldType = {
    pod: {
      propName: 'pod_map',
      fldName: 'podFormField',
    },
    post: {
      propName: 'post_map',
      fldName: 'postFormField',
    },
  }

  const { propName, fldName } = fldType[type]

  const isRequired = !!podFields.find(fl => fl.key === field[fldName] && fl.required)

  return (
    <div className="flx mt-2 mr-1">
      <div className="flx integ-fld-wrp">
        <select className="btcd-paper-inp mr-2" name="formField" value={field.formField || ''} onChange={(ev) => handleFieldMapping(propName, ev, i, dataConf, setDataConf)}>
          <option value="">{__('Select Field', 'bitform')}</option>
          {
            formFields.map(f => f.type !== 'file-up33' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
          }
        </select>

        <select className="btcd-paper-inp" name={fldName} value={field[fldName] || ''} onChange={(ev) => handleFieldMapping(propName, ev, i, dataConf, setDataConf)} disabled={isRequired}>
          <option value="">{__('Select Field', 'bitform')}</option>
          {
            podFields?.map(header => (
              <option key={`${header.key}-1`} value={header.key}>
                {`${header.name}`}
              </option>
            ))
          }
        </select>
      </div>

      {
        isRequired
          ? (
            <>
              <button
                onClick={() => addFieldMap(propName, i, dataConf, setDataConf)}
                className="icn-btn sh-sm ml-2 mr-1"
                type="button"
              >
                +
              </button>
            </>
          )
          : (
            <>
              <button
                onClick={() => addFieldMap(propName, i, dataConf, setDataConf)}
                className="icn-btn sh-sm ml-2 mr-1"
                type="button"
              >
                +
              </button>
              <button onClick={() => delFieldMap(propName, i, dataConf, setDataConf)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
                <TrashIcn />
              </button>
            </>
          )
      }

    </div>
  )
}
