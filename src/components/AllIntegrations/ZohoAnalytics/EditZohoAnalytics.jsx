/* eslint-disable no-param-reassign */
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { __ } from '../../../Utils/i18nwrap'
import SnackMsg from '../../Utilities/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { handleInput } from './ZohoAnalyticsCommonFunc'
import ZohoAnalyticsIntegLayout from './ZohoAnalyticsIntegLayout'

function EditZohoRecruit({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const { id, formID } = useParams()

  const [analyticsConf, setAnalyticsConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-100 d-in-b">{__('Integration Name:')}</b>
        <input className="btcd-paper-inp w-7" onChange={e => handleInput(e, analyticsConf, setAnalyticsConf)} name="name" value={analyticsConf.name} type="text" placeholder={__('Integration Name...')} />
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
        step={2}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
      />

      <IntegrationStepThree
        edit
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, analyticsConf, history, id, 1)}
        disabled={analyticsConf.workspace === '' || analyticsConf.table === '' || analyticsConf.field_map.length < 1}
      />
      <br />
    </div>
  )
}

export default EditZohoRecruit
