/* eslint-disable no-param-reassign */
import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { FormSaveContext } from '../../../pages/FormDetails'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { checkMappedFields, handleInput } from './ZohoCampaignsCommonFunc'
import ZohoCampaignsIntegLayout from './ZohoCampaignsIntegLayout'

function EditZohoRecruit({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()
  const saveForm = useContext(FormSaveContext)

  const [campaignsConf, setCampaignsConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })

  console.log('campaignsConf', campaignsConf)

  const saveConfig = () => {
    if (!checkMappedFields(campaignsConf)) {
      setSnackbar({ show: true, msg: 'Please map mandatory fields' })
      return
    }
    saveIntegConfig(integrations, setIntegration, allIntegURL, campaignsConf, history, saveForm, id, 1)
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-100 d-in-b">Integration Name:</b>
        <input className="btcd-paper-inp w-7" onChange={e => handleInput(e, formID, campaignsConf, setCampaignsConf)} name="name" value={campaignsConf.name} type="text" placeholder="Integration Name..." />
      </div>
      <br />
      <br />

      <ZohoCampaignsIntegLayout
        formID={formID}
        formFields={formFields}
        handleInput={(e) => handleInput(e, formID, campaignsConf, setCampaignsConf, setisLoading, setSnackbar)}
        campaignsConf={campaignsConf}
        setCampaignsConf={setCampaignsConf}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
      />

      <IntegrationStepThree
        edit
        saveConfig={saveConfig}
        disabled={campaignsConf.list === '' || campaignsConf.table === '' || campaignsConf.field_map.length < 1}
      />
    </div>
  )
}

export default EditZohoRecruit
