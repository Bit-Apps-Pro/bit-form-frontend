/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { checkMappedFields, handleInput } from './ZohoMarketingHubCommonFunc'
import ZohoMarketingHubIntegLayout from './ZohoMarketingHubIntegLayout'

function EditZohoMarketingHub({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()

  const [marketingHubConf, setMarketingHubConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })

  console.log('marketingHubConf', marketingHubConf)

  const saveConfig = () => {
    if (!checkMappedFields(marketingHubConf)) {
      setSnackbar({ show: true, msg: 'Please map mandatory fields' })
      return
    }
    saveIntegConfig(integrations, setIntegration, allIntegURL, marketingHubConf, history, id, 1)
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-100 d-in-b">Integration Name:</b>
        <input className="btcd-paper-inp w-7" onChange={e => handleInput(e, formID, marketingHubConf, setMarketingHubConf)} name="name" value={marketingHubConf.name} type="text" placeholder="Integration Name..." />
      </div>
      <br />
      <br />

      <ZohoMarketingHubIntegLayout
        formID={formID}
        formFields={formFields}
        handleInput={(e) => handleInput(e, formID, marketingHubConf, setMarketingHubConf, setisLoading, setSnackbar)}
        marketingHubConf={marketingHubConf}
        setMarketingHubConf={setMarketingHubConf}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
      />

      <IntegrationStepThree
        edit
        saveConfig={saveConfig}
        disabled={marketingHubConf.list === '' || marketingHubConf.table === '' || marketingHubConf.field_map.length < 1}
      />
    </div>
  )
}

export default EditZohoMarketingHub
