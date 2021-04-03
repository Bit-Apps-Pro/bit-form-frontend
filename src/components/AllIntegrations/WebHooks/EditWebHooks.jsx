/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SnackMsg from '../../ElmSettings/Childs/SnackMsg';
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers';
import WebHooksStepTwo from '../IntegrationHelpers/WebHooksStepTwo';
import WebHooksLayouts from './WebHooksLayouts';

function EditWebHooks({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()

  const [webHooks, setWebHooks] = useState({ ...integrations[id] })
  const [snack, setSnackbar] = useState({ show: false })

  console.log(webHooks)

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="mt-3">
        <WebHooksLayouts
          formID={formID}
          formFields={formFields}
          webHooks={webHooks}
          setWebHooks={setWebHooks}
          setSnackbar={setSnackbar}
        />
      </div>
      {console.log('WebHooks', webHooks)}

      <WebHooksStepTwo
        edit
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, webHooks, history, id, 1)}
      />
      <br />
    </div>
  )
}

export default EditWebHooks
