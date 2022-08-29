/* eslint-disable no-param-reassign */

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { __ } from '../../../Utils/i18nwrap'
import SnackMsg from '../../Utilities/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { checkMappedFields, handleInput } from './FluentCrmCommonFunc'
import FluentCrmIntegLayout from './FluentCrmIntegLayout'

function EditFluentCrm({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const { id, formID } = useParams()

  const [fluentCrmConf, setFluentCrmConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })
  const saveConfig = () => {
    if (!checkMappedFields(fluentCrmConf)) {
      setSnackbar({ show: true, msg: 'Please map all required fields to continue.' })
      return
    } saveIntegConfig(integrations, setIntegration, allIntegURL, fluentCrmConf, history, id, 1)
  }
  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-200 d-in-b">{__('Integration Name:')}</b>
        <input className="btcd-paper-inp w-5" onChange={e => handleInput(e, fluentCrmConf, setFluentCrmConf)} name="name" value={fluentCrmConf.name} type="text" placeholder={__('Integration Name...')} />
      </div>
      <br />
      <br />

      <FluentCrmIntegLayout
        formID={formID}
        formFields={formFields}
        fluentCrmConf={fluentCrmConf}
        setFluentCrmConf={setFluentCrmConf}
        isLoading={isLoading}
        step={2}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
      />

      <IntegrationStepThree
        edit
        saveConfig={saveConfig}
        disabled={fluentCrmConf.list_id === '' || fluentCrmConf.field_map.length < 1}
      />
      <br />
    </div>
  )
}

export default EditFluentCrm
