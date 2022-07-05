import { useRecoilValue } from 'recoil'
import { $bits } from '../../../GlobalStates/GlobalStates'
import TrashIcn from '../../../Icons/TrashIcn'
import { __ } from '../../../Utils/i18nwrap'
import { SmartTagField } from '../../../Utils/StaticData/SmartTagField'
import MtInput from '../../Utilities/MtInput'
import { addFieldMap, delFieldMap, handleCustomValue, handleFieldMapping } from '../IntegrationHelpers/IntegrationHelpers'

export default function ZohoSheetFieldMap({ i, formFields, field, sheetConf, setSheetConf }) {
  const bits = useRecoilValue($bits)
  const { isPro } = bits
  return (
    <div
      className="flx mt-2 mr-1"
    >
      <div className="flx integ-fld-wrp">
        <select className="btcd-paper-inp mr-2" name="formField" value={field.formField || ''} onChange={(ev) => handleFieldMapping(ev, i, sheetConf, setSheetConf)}>
          <option value="">{__('Select Field')}</option>
          <optgroup label="Form Fields">
            {
              formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
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

        {field.formField === 'custom' && <MtInput onChange={e => handleCustomValue(e, i, sheetConf, setSheetConf)} label={__('Custom Value')} className="mr-2" type="text" value={field.customValue} placeholder={__('Custom Value')} />}

        <select className="btcd-paper-inp" name="zohoFormField" value={field.zohoFormField || ''} onChange={(ev) => handleFieldMapping(ev, i, sheetConf, setSheetConf)}>
          <option value="">{__('Select Field')}</option>
          {
            sheetConf.default.worksheets?.headers?.[sheetConf.worksheet]?.[sheetConf.headerRow] && Object.values(sheetConf.default.worksheets.headers[sheetConf.worksheet][sheetConf.headerRow]).map(header => (
              <option key={`${header}-1`} value={header}>
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
        <TrashIcn />
      </button>
    </div>
  )
}
