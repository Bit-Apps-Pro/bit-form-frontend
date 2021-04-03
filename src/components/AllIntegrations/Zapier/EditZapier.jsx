/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SnackMsg from '../../ElmSettings/Childs/SnackMsg';
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers';
import WebHooksStepTwo from '../IntegrationHelpers/WebHooksStepTwo';
import ZapierLayouts from './ZapierLayouts';

function EditZapier({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()

  const [zapier, setZapier] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })

  console.log('user zapier', zapier)

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="mt-3">
        <ZapierLayouts
          formID={formID}
          formFields={formFields}
          zapier={zapier}
          setZapier={setZapier}
          setSnackbar={setSnackbar}
        />
      </div>
      {console.log('zapier', zapier)}

      <WebHooksStepTwo
        edit
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, zapier, history, id, 1)}
      />
      <br />
    </div>
  )
}

export default EditZapier
