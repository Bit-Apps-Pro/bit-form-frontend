// eslint-disable-next-line import/no-extraneous-dependencies
import { lazy, useState } from 'react'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useNavigate, useParams } from 'react-router-dom'
import tutorialLinks from '../../../Utils/StaticData/tutorialLinks'
import SnackMsg from '../../Utilities/SnackMsg'
import Steps from '../../Utilities/Steps'
import TutorialLink from '../../Utilities/TutorialLink'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import WebHooksStepTwo from '../IntegrationHelpers/WebHooksStepTwo'

const WebHooksIntegration = lazy(() => import('../IntegrationHelpers/WebHooksIntegration'))

function Integromat({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const { formID } = useParams()
  const [step, setstep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const [integromat, setIntegromat] = useState({
    name: 'Integromat Web Hooks',
    type: 'Integromat',
    method: 'POST',
    url: process.env.NODE_ENV === 'development' ? 'https://hook.integromat.com/6uopree96tiv94js0lty85l1yp4f92xf' : '',
    apiConsole: 'https://www.integromat.com/',
  })
  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2 cal-width"><Steps step={2} active={step} /></div>
      <TutorialLink
        title={tutorialLinks.integromat.title}
        youTubeLink={tutorialLinks.integromat.link}
      />
      {/* STEP 1 */}
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <WebHooksIntegration
          formID={formID}
          formFields={formFields}
          webHooks={integromat}
          setWebHooks={setIntegromat}
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
          saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, integromat, history)}
        />
      </div>
    </div>
  )
}

export default Integromat
