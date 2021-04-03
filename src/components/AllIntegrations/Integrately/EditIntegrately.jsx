/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SnackMsg from '../../ElmSettings/Childs/SnackMsg';
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers';
import WebHooksStepTwo from '../IntegrationHelpers/WebHooksStepTwo';
import IntegratelyLayouts from './IntegratelyLayouts';

function EditIntegrately({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()

  const [integrately, setIntegrately] = useState({ ...integrations[id] })
  const [snack, setSnackbar] = useState({ show: false })

  console.log('user integrately', integrately)

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="mt-3">
        <IntegratelyLayouts
          formID={formID}
          formFields={formFields}
          integrately={integrately}
          setIntegrately={setIntegrately}
          setSnackbar={setSnackbar}
        />
      </div>
      {console.log('integrately', integrately)}

      <WebHooksStepTwo
        edit
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, integrately, history, id, 1)}
      />
      <br />
    </div>
  )
}

export default EditIntegrately
