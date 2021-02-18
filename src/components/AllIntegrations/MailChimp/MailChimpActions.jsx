/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useEffect, useState } from 'react'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'

export default function MailChimpActions({ sheetConf, setSheetConf, formFields }) {
  const [updateMdl, setUpdateMdl] = useState(false)

  const actionHandler = (e, type) => {
    const newConf = { ...sheetConf }
    // if (typ === 'update') {
    //   if (val.target.checked && !newConf?.actions?.update) {
    //     newConf.actions.update = { insert: true, criteria: '', firstMatch: false }
    //     setUpdateMdl(true)
    //   } else {
    //     delete newConf.actions.update
    //   }
    // }
    // setSheetConf({ ...newConf })
    console.log(newConf)
  }
  useEffect(() => {
    if (!updateMdl && !sheetConf.actions?.update?.criteria) {
      const newConf = { ...sheetConf }
      delete newConf.actions.update
      setSheetConf({ ...newConf })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateMdl])

  return (
    <div className="pos-rel">
      <div className="d-flx flx-wrp">
        <TableCheckBox checked={true} onchange={(e) => actionHandler(e, 'update')} className="wdt-200 mt-4 mr-2" value="user_share" title={__('Update Mail Chimp', 'bitform')} subTitle={__('Update Responses with Mail Chimp?', 'bitform')} />
      </div>
    </div>
  )
}
