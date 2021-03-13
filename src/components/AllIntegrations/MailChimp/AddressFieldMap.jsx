// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'

import { delAddressFieldMap, handleAddress } from '../IntegrationHelpers/MailChimpIntegrationHelpers'

export default function AddressFieldMap({ i, formFields, field, sheetConf, setSheetConf, addressField }) {
  const isRequired = field.required
  const address = addressField.filter((addr => !addr.required));
  return (
    <div
      className="flx flx-around mt-2 mr-1"
    >
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField || ''} onChange={(ev) => handleAddress(ev, i, sheetConf, setSheetConf)}>
        <option value="">{__('Select Field', 'bitform')}</option>
        {
          formFields.map(f => f.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)
        }
      </select>
      <select className="btcd-paper-inp" name="mailChimpAddressField" value={field.mailChimpAddressField || ''} onChange={(ev) => handleAddress(ev, i, sheetConf, setSheetConf, addressField)} disabled={isRequired}>
        <option value="">{__('Select Field', 'bitform')}</option>
        {isRequired ?
          Object.values(addressField).map((listField, indx) => (
            <option key={indx} value={listField.tag}>
              {listField.name}
            </option>
          ))
          :
          Object.values(address).map((listField, indx) => (
            <option key={indx} value={listField.tag}>
              {listField.name}
            </option>
          ))
        }
      </select>
      {!isRequired && (
        <button onClick={() => delAddressFieldMap(i, sheetConf, setSheetConf)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
          <span className="btcd-icn icn-trash-2" />
        </button>
      )}
    </div>
  )
}