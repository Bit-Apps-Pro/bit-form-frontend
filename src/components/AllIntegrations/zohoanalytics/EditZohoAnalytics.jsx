/* eslint-disable no-param-reassign */
import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { FormSaveContext } from '../../../pages/FormDetails'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { handleInput } from './ZohoAnalyticsCommonFunc'
import ZohoAnalyticsIntegLayout from './ZohoAnalyticsIntegLayout'

function EditZohoRecruit({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()
  const saveForm = useContext(FormSaveContext)

  const [analyticsConf, setAnalyticsConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })
  const [actionMdl, setActionMdl] = useState({ show: false })

  const saveConfig = () => {
    if (analyticsConf.actions?.update && analyticsConf.actions?.update.criteria === '' && actionMdl.show !== 'criteria') {
      setActionMdl({ show: 'criteria' })
      return
    }
    saveIntegConfig(integrations, setIntegration, allIntegURL, analyticsConf, history, saveForm, id, 1)
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-100 d-in-b">Integration Name:</b>
        <input className="btcd-paper-inp w-7" onChange={e => handleInput(e, analyticsConf, setAnalyticsConf)} name="name" value={analyticsConf.name} type="text" placeholder="Integration Name..." />
      </div>
      <br />
      <br />

      <ZohoAnalyticsIntegLayout
        formID={formID}
        formFields={formFields}
        handleInput={(e) => handleInput(e, analyticsConf, setAnalyticsConf, formID, setisLoading, setSnackbar)}
        analyticsConf={analyticsConf}
        setAnalyticsConf={setAnalyticsConf}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
        actionMdl={actionMdl}
        setActionMdl={setActionMdl}
        action={saveConfig}
      />

      <IntegrationStepThree
        edit
        saveConfig={saveConfig}
        disabled={analyticsConf.workspace === '' || analyticsConf.table === '' || analyticsConf.field_map.length < 1}
      />
      <br />
    </div>
  )
}

export default EditZohoRecruit
