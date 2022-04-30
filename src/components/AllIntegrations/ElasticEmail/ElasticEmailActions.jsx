/* eslint-disable no-param-reassign */

import { __ } from '../../../Utils/i18nwrap'
import TableCheckBox from '../../Utilities/TableCheckBox'

export default function ElasticEmailActions({ elasticEmailConf, setElasticEmailConf, formFields }) {
  const actionHandler = (e, type) => {
    const newConf = { ...elasticEmailConf }
    if (type === 'sendActivation') {
      if (e.target.checked) {
        newConf.actions.sendActivation = true
      } else {
        delete newConf.actions.sendActivation
      }
    }
    setElasticEmailConf({ ...newConf })
  }

  return (

    <div className="pos-rel d-flx w-8">
      <TableCheckBox checked={elasticEmailConf.actions?.sendActivation || false} onChange={(e) => actionHandler(e, 'sendActivation')} className="wdt-200 mt-4 mr-2" value="sendActivation" title={__('Send Activation Email', 'bitform')} subTitle={__('Add Send Activation Email', 'bitform')} />
    </div>
  )
}
