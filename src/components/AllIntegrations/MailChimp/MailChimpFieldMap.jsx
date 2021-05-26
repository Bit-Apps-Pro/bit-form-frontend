import { __ } from '../../../Utils/i18nwrap'
import MtInput from '../../Utilities/MtInput'
import { addFieldMap, delFieldMap, handleCustomValue, handleFieldMapping } from '../IntegrationHelpers/MailChimpIntegrationHelpers'

export default function MailChimpFieldMap({ i, formFields, field, sheetConf, setSheetConf }) {

  return (
    <div
      className="flx mt-2 mr-1"
    >
      <div className="flx integ-fld-wrp">
        <select className="btcd-paper-inp mr-2" name="formField" value={field.formField || ''} onChange={(ev) => handleFieldMapping(ev, i, sheetConf, setSheetConf)}>
          <option value="">{__('Select Field', 'bitform')}</option>
          {
            formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
          }
          <option value="custom">{__('Custom...', 'bitform')}</option>
        </select>

        {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i, sheetConf, setSheetConf)} label={__('Custom Value', 'bitform')} className="mr-2" type="text" value={field.customValue} placeholder={__('Custom Value', 'bitform')} />}

        <select className="btcd-paper-inp" name="mailChimpField" value={field.mailChimpField || ''} onChange={(ev) => handleFieldMapping(ev, i, sheetConf, setSheetConf)}>
          <option value="">{__('Select Field', 'bitform')}</option>
          {
            sheetConf.default?.fields?.[sheetConf.listId] && Object.values(sheetConf.default.fields[sheetConf.listId]).map((listField, indx) => (
              <option key={indx} value={listField.tag}>
                {listField.name}
              </option>
            ))
          }
        </select>
      </div>
      <button
        onClick={() => addFieldMap(i, sheetConf, setSheetConf)}
        className="icn-btn sh-sm ml-2 mr-1"
        type="button"
      >
        +
      </button>
      <button onClick={() => delFieldMap(i, sheetConf, setSheetConf)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
        <span className="btcd-icn icn-trash-2" />
      </button>
    </div>
  )
}
