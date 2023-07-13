// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from 'react'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useNavigate, useParams } from 'react-router-dom'
import tutorialLinks from '../../../Utils/StaticData/tutorialLinks'
import SnackMsg from '../../Utilities/SnackMsg'
import Steps from '../../Utilities/Steps'
import TutorialLink from '../../Utilities/TutorialLink'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import WebHooksIntegration from '../IntegrationHelpers/WebHooksIntegration'
import WebHooksStepTwo from '../IntegrationHelpers/WebHooksStepTwo'

function SperseIO({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const { formID } = useParams()
  const [step, setstep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const [sperseIO, setSperseIO] = useState({
    name: 'Automate Hub by Sperse.IO Web Hooks',
    type: 'Automate Hub SperseIO',
    method: 'POST',
    url: '',
  })

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2 cal-width"><Steps step={2} active={step} /></div>
      <TutorialLink
        title={tutorialLinks.sperseIO.title}
        youTubeLink={tutorialLinks.sperseIO.link}
      />
      {/* STEP 1 */}
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <WebHooksIntegration
          formID={formID}
          formFields={formFields}
          webHooks={sperseIO}
          setWebHooks={setSperseIO}
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
          saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, sperseIO, history)}
        />
      </div>
    </div>
  )
}

export default SperseIO
