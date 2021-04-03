// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import { useHistory, useParams } from 'react-router-dom';
import SnackMsg from '../../ElmSettings/Childs/SnackMsg';
import Steps from '../../ElmSettings/Childs/Steps';
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers';
import WebHooksStepTwo from '../IntegrationHelpers/WebHooksStepTwo';
import ZohoFlowLayouts from './ZohoFlowLayouts';

function ZohoFlow({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [step, setstep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const [zohoFlow, setZohoFlow] = useState({
    name: 'Zoho Flow Web Hooks',
    type: 'Zoho Flow',
    method: 'POST',
    url: process.env.NODE_ENV === 'development' ? 'https://hooks..com/hooks/catch/8430229/o7gwcin/' : '',
  })
  console.log('zohoFlow', zohoFlow)
  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={2} active={step} /></div>

      {/* STEP 1 */}
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <ZohoFlowLayouts
          formID={formID}
          formFields={formFields}
          zohoFlow={zohoFlow}
          setZohoFlow={setZohoFlow}
          step={step}
          setstep={setstep}
          setSnackbar={setSnackbar}
          create
        />
      </div>

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, minHeight: step === 2 && `${900}px` }}>

        <WebHooksStepTwo
          step={step}
          saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, zohoFlow, history)}
        />

      </div>
    </div>
  )
}

export default ZohoFlow
