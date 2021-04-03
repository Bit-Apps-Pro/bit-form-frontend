/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SnackMsg from '../../ElmSettings/Childs/SnackMsg';
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers';
import WebHooksStepTwo from '../IntegrationHelpers/WebHooksStepTwo';
import PabblyLayouts from './PabblyLayouts';

function EditPabbly({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()

  const [pabbly, setPabbly] = useState({ ...integrations[id] })
  const [snack, setSnackbar] = useState({ show: false })

  console.log('user pabbly', pabbly)

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="mt-3">
        <PabblyLayouts
          formID={formID}
          formFields={formFields}
          pabbly={pabbly}
          setPabbly={setPabbly}
          setSnackbar={setSnackbar}
        />
      </div>
      {console.log('pabbly', pabbly)}

      <WebHooksStepTwo
        edit
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, pabbly, history, id, 1)}
      />
      <br />
    </div>
  )
}

export default EditPabbly
