import { useEffect, useState } from 'react'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Steps from '../../ElmSettings/Childs/Steps'
import { handleAuthorize, saveIntegConfig, setGrantTokenResponse } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepOne from '../IntegrationHelpers/IntegrationStepOne'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { handleInput, refreshTemplates } from './ZohoSignCommonFunc'
import ZohoSignIntegLayout from './ZohoSignIntegLayout'

function ZohoSign({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const scopes = 'ZohoSign.templates.CREATE,ZohoSign.templates.READ,ZohoSign.templates.UPDATE'
  const [signConf, setSignConf] = useState({
    name: 'Zoho Sign API',
    type: 'Zoho Sign',
    clientId: process.env.NODE_ENV === 'development' ? '1000.01ZB6YV7B8BEIXGPX6821NIK29K0HZ' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? '79d6d0bf4b8104aea4c167a2e2e10d78a916af7c6b' : '',
  })

  useEffect(() => {
    window.opener && setGrantTokenResponse('zohoSign')
  }, [])

  const nextPage = val => {
    if (val === 2) {
      if (!signConf?.default?.templates) {
        refreshTemplates(formID, signConf, setSignConf, setisLoading, setSnackbar)
      }
    }
    setstep(val)
    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  console.log('signConf', signConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <IntegrationStepOne
        step={step}
        confTmp={signConf}
        handleInput={(e) => handleInput(e, signConf, setSignConf, formID, setisLoading, setSnackbar, true, error, setError)}
        error={error}
        setSnackbar={setSnackbar}
        handleAuthorize={() => handleAuthorize('zohoSign', 'zsign', scopes, signConf, setSignConf, setError, setisAuthorized, setisLoading, setSnackbar)}
        isLoading={isLoading}
        isAuthorized={isAuthorized}
        nextPage={nextPage}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>
        <ZohoSignIntegLayout
          formID={formID}
          formFields={formFields}
          signConf={signConf}
          setSignConf={setSignConf}
          isLoading={isLoading}
          setisLoading={setisLoading}
          setSnackbar={setSnackbar}
        />

        <button
          onClick={() => nextPage(3)}
          disabled={signConf.template === ''}
          className="btn f-right btcd-btn-lg green sh-sm flx"
          type="button"
        >
          Next &nbsp;
          <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
        </button>

      </div>

      {/* STEP 3 */}
      <IntegrationStepThree
        step={step}
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, signConf, history)}
      />
    </div>
  )
}

export default ZohoSign
