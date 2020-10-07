/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { checkMappedFields, checkRequiredActions, handleInput } from './ZohoProjectsCommonFunc'
import ZohoProjectsIntegLayout from './ZohoProjectsIntegLayout'

function EditZohoRecruit({ formFields, setIntegration, integrations, allIntegURL }) {
  const { id, formID } = useParams()
  const history = useHistory()
  const [projectsConf, setProjectsConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })

  console.log('projectsConf', projectsConf)

  const saveConfig = () => {
    if (!checkMappedFields(projectsConf)) {
      setSnackbar({ show: true, msg: 'please map mandatory fields' })
      return
    }
    if (!checkRequiredActions(projectsConf)) {
      setSnackbar({ show: true, msg: 'please fill up the required actions' })
      return
    }
    saveIntegConfig(integrations, setIntegration, allIntegURL, projectsConf, history, id, 1)
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-150 d-in-b">Integration Name:</b>
        <input className="btcd-paper-inp w-7" onChange={e => handleInput(e, projectsConf, setProjectsConf)} name="name" value={projectsConf.name} type="text" placeholder="Integration Name..." />
      </div>
      <br />
      <br />

      <ZohoProjectsIntegLayout
        formID={formID}
        formFields={formFields}
        handleInput={(e) => handleInput(e, projectsConf, setProjectsConf, formID, setisLoading, setSnackbar)}
        projectsConf={projectsConf}
        setProjectsConf={setProjectsConf}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
      />

      <IntegrationStepThree
        edit
        saveConfig={saveConfig}
        disabled={projectsConf.department === '' || projectsConf.table === '' || projectsConf.field_map.length < 1}
      />
    </div>
  )
}

export default EditZohoRecruit
