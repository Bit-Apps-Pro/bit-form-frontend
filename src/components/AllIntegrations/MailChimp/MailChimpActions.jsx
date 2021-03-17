/* eslint-disable no-param-reassign */

import { __ } from '../../../Utils/i18nwrap'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'

export default function MailChimpActions({ sheetConf, setSheetConf, formFields, address }) {
  const actionHandler = (e, type) => {
    const newConf = { ...sheetConf }
    if (type === 'update') {
      if (e.target.checked) {
        newConf.actions.update = true
      } else {
        delete newConf.actions.update
      }
    }
    if (type === 'address') {
      if (e.target.checked) {
        newConf.actions.address = true
        newConf.address_field = address.filter(addr => addr.required).map(adr => ({ formField: '', mailChimpAddressField: adr.tag, required: true }))
      } else {
        delete newConf.actions.address
        newConf.address_field = ''
      }
    }
    setSheetConf({ ...newConf })
  }

  return (

    <div className="pos-rel d-flx w-8">
      <TableCheckBox checked={sheetConf.actions?.address || false} onChange={(e) => actionHandler(e, 'address')} className="wdt-200 mt-4 mr-2" value="address" title={__('Add Address Field', 'bitform')} subTitle={__('Add Address Field', 'bitform')} />
      <TableCheckBox checked={sheetConf.actions?.update || false} onChange={(e) => actionHandler(e, 'update')} className="wdt-200 mt-4 mr-2" value="user_share" title={__('Update Mail Chimp', 'bitform')} subTitle={__('Update Responses with MailChimp exist Aduience?', 'bitform')} />
    </div>
  )
}
