/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SnackMsg from '../../ElmSettings/Childs/SnackMsg';
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers';
import WebHooksStepTwo from '../IntegrationHelpers/WebHooksStepTwo';
import ZohoFlowLayouts from './ZohoFlowLayouts';

function EditZohoFlow({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()

  const [zohoFlow, setZohoFlow] = useState({ ...integrations[id] })
  const [snack, setSnackbar] = useState({ show: false })

  console.log('user zohoFlow', zohoFlow)

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="mt-3">
        <ZohoFlowLayouts
          formID={formID}
          formFields={formFields}
          zohoFlow={zohoFlow}
          setZohoFlow={setZohoFlow}
          setSnackbar={setSnackbar}
        />
      </div>
      {console.log('zohoFlow', zohoFlow)}

      <WebHooksStepTwo
        edit
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, zohoFlow, history, id, 1)}
      />
      <br />
    </div>
  )
}

export default EditZohoFlow
