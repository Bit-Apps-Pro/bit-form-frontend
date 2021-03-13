/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'

export default function MailPoetActions({ mailPoetConf, setMailPoetConf, formFields }) {
  const actionHandler = (e, type) => {
    const newConf = { ...mailPoetConf }
    if (type === 'update') {
      if (e.target.checked) {
        newConf.actions.update = true
      } else {
        delete newConf.actions.update
      }
    }
    setMailPoetConf({ ...newConf })
  }

  return (

    <div className="pos-rel d-flx w-8">
      <TableCheckBox checked={mailPoetConf.actions?.update || false} onChange={(e) => actionHandler(e, 'update')} className="wdt-200 mt-4 mr-2" value="user_share" title={__('Update MailPoet', 'bitform')} subTitle={__('Update Responses with Mailpoet exist Subscriber?', 'bitform')} />
    </div>
  )
}