/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { lazy, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SnackMsg from '../../Utilities/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import WebHooksStepTwo from '../IntegrationHelpers/WebHooksStepTwo'

const WebHooksIntegration = lazy(() => import('../IntegrationHelpers/WebHooksIntegration'))

function EditN8NIO({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const { id, formID } = useParams()

  const [n8nIO, setN8NIO] = useState({ ...integrations[id] })
  const [snack, setSnackbar] = useState({ show: false })

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="mt-3">
        <WebHooksIntegration
          formID={formID}
          formFields={formFields}
          webHooks={n8nIO}
          setWebHooks={setN8NIO}
          setSnackbar={setSnackbar}
        />
      </div>

      <WebHooksStepTwo
        edit
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, n8nIO, history, id, 1)}
      />
      <br />
    </div>
  )
}

export default EditN8NIO
