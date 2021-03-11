// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import MtInput from '../../ElmSettings/Childs/MtInput'
import { addFieldMap, delFieldMap, handleCustomValue, handleFieldMapping } from '../IntegrationHelpers/GoogleIntegrationHelpers'

export default function GoogleSheetFieldMap({ i, formFields, field, sheetConf, setSheetConf }) {
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

        <select className="btcd-paper-inp" name="googleSheetField" value={field.googleSheetField || ''} onChange={(ev) => handleFieldMapping(ev, i, sheetConf, setSheetConf)}>
          <option value="">{__('Select Field', 'bitform')}</option>
          {
            sheetConf.default?.headers?.[sheetConf.spreadsheetId]?.[sheetConf.worksheetName]?.[sheetConf.headerRow] && Object.values(sheetConf.default.headers[sheetConf.spreadsheetId][sheetConf.worksheetName][sheetConf.headerRow]).map((header, indx) => (
              <option key={indx} value={header}>
                {header}
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
