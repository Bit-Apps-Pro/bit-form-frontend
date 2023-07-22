/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SnackMsg from '../../Utilities/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import WebHooksLayouts from '../IntegrationHelpers/WebHooksIntegration'
import WebHooksStepTwo from '../IntegrationHelpers/WebHooksStepTwo'

function EditThriveAutomator({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const { id, formID } = useParams()

  const [thriveAutomator, setThriveAutomator] = useState({ ...integrations[id] })
  const [snack, setSnackbar] = useState({ show: false })

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="mt-3">
        <WebHooksLayouts
          formID={formID}
          formFields={formFields}
          webHooks={thriveAutomator}
          setWebHooks={setThriveAutomator}
          setSnackbar={setSnackbar}
        />
      </div>

      <WebHooksStepTwo
        edit
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, thriveAutomator, history, id, 1)}
      />
      <br />
    </div>
  )
}

export default EditThriveAutomator