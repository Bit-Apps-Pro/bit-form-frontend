import { __ } from '../../../Utils/i18nwrap'
import MtInput from '../../Utilities/MtInput'
import { addFieldMap, delFieldMap, handleCustomValue, handleFieldMapping } from '../IntegrationHelpers/IntegrationHelpers'

export default function CptFieldMap({ i, formFields, field, dataConf, setDataConf }) {
  const posts = [
    {
      key: 'post_title',
      name: 'Post Title',
    },
    {
      key: 'post_name',
      name: 'Post Name',
    },
    {
      key: 'post_excert',
      name: 'Post Excert',
    },
    {
      key: 'post_content',
      name: 'Post Content',
    },
  ]

  return (
    <div className="flx mt-2 mr-1">
      <div className="flx integ-fld-wrp">
        <select className="btcd-paper-inp mr-2" name="formField" value={field.formField || ''} onChange={(ev) => handleFieldMapping(ev, i, dataConf, setDataConf)}>
          <option value="">{__('Select Field', 'bitform')}</option>
          {
            formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
          }
          <option value="custom">{__('Custom...', 'bitform')}</option>
        </select>

        {field.formField === 'custom' && <MtInput label={__('Custom Value', 'bitform')} className="mr-2" type="text" onChange={ev => handleCustomValue(ev, i, dataConf, setDataConf)} value={field.customValue} placeholder={__('Custom Value', 'bitform')} />}

        <select className="btcd-paper-inp" name="postFormField" value={field.postFormField || ''} onChange={(ev) => handleFieldMapping(ev, i, dataConf, setDataConf)}>
          <option value="">{__('Select Field', 'bitform')}</option>
          {
            posts.map(header => (
              <option key={`${header.key}-1`} value={header.key}>
                {header.name}
              </option>
            ))
          }
        </select>
      </div>
      <button
        onClick={() => addFieldMap(i, dataConf, setDataConf)}
        className="icn-btn sh-sm ml-2 mr-1"
        type="button"
      >
        +
      </button>
      <button onClick={() => delFieldMap(i, dataConf, setDataConf)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
        <span className="btcd-icn icn-trash-2" />
      </button>
    </div>
  )
}
