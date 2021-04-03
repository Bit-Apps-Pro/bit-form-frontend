/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SnackMsg from '../../ElmSettings/Childs/SnackMsg';
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers';
import WebHooksStepTwo from '../IntegrationHelpers/WebHooksStepTwo';
import IntegromatLayouts from './IntegromatLayouts';

function EditIntegromat({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()

  const [integromat, setIntegromat] = useState({ ...integrations[id] })
  const [snack, setSnackbar] = useState({ show: false })

  console.log('user integromat', integromat)

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="mt-3">
        <IntegromatLayouts
          formID={formID}
          formFields={formFields}
          integromat={integromat}
          setIntegromat={setIntegromat}
          setSnackbar={setSnackbar}
        />
      </div>
      {console.log('integromat', integromat)}

      <WebHooksStepTwo
        edit
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, integromat, history, id, 1)}
      />
      <br />
    </div>
  )
}

export default EditIntegromat
