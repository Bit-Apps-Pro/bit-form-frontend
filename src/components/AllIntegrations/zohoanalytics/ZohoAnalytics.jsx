import { useEffect, useState } from 'react';
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Steps from '../../ElmSettings/Childs/Steps'
import { handleAuthorize, saveIntegConfig, setGrantTokenResponse } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepOne from '../IntegrationHelpers/IntegrationStepOne'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { handleInput, refreshWorkspaces } from './ZohoAnalyticsCommonFunc'
import ZohoAnalyticsIntegLayout from './ZohoAnalyticsIntegLayout'

function ZohoAnalytics({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '', ownerEmail: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const scopes = 'ZohoAnalytics.metadata.read,ZohoAnalytics.data.read,ZohoAnalytics.data.create,ZohoAnalytics.data.update,ZohoAnalytics.usermanagement.read,ZohoAnalytics.share.create'
  const [analyticsConf, setAnalyticsConf] = useState({
    name: 'Zoho Analytics API',
    type: 'Zoho Analytics',
    clientId: process.env.NODE_ENV === 'development' ? '1000.ADOPSXBMMW800FBDEFBH4V14Y6UKQK' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? '904a27ac7bcb1ea120c3f61c7007c0f2b7fc5ef584' : '',
    workspace: '',
    table: '',
    ownerEmail: process.env.NODE_ENV === 'development' ? 'mdshakhawathosen122@gmail.com' : '',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
    actions: {},
  })

  useEffect(() => {
    window.opener && setGrantTokenResponse('zohoAnalytics')
  }, [])

  const checkValidEmail = email => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    }
    return false
  }

  const nextPage = val => {
    if (val === 3) {
      if (analyticsConf.workspace !== '' && analyticsConf.table !== '' && analyticsConf.field_map.length > 0) {
        setstep(val)
      }
    } else {
      if (!checkValidEmail(analyticsConf.ownerEmail)) {
        setError({
          ownerEmail: !checkValidEmail(analyticsConf.ownerEmail) ? 'Email is invalid' : '',
        })
        return
      }
      setstep(val)
      if (val === 2 && !analyticsConf.workspace) {
        refreshWorkspaces(formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar)
      }
    }

    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  console.log('analyticsConf', analyticsConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <IntegrationStepOne
        step={step}
        confTmp={analyticsConf}
        handleInput={(e) => handleInput(e, analyticsConf, setAnalyticsConf, formID, setisLoading, setSnackbar, true, error, setError)}
        error={error}
        setSnackbar={setSnackbar}
        handleAuthorize={() => handleAuthorize('zohoAnalytics', 'zanalytics', scopes, analyticsConf, setAnalyticsConf, setError, setisAuthorized, setisLoading, setSnackbar)}
        isLoading={isLoading}
        isAuthorized={isAuthorized}
        nextPage={nextPage}
      >
        <div className="mt-3"><b>Zoho Analytics Owner Email:</b></div>
        <input className="btcd-paper-inp w-6 mt-1" onChange={e => handleInput(e, analyticsConf, setAnalyticsConf, formID, setisLoading, setSnackbar, true, error, setError)} name="ownerEmail" value={analyticsConf.ownerEmail} type="email" placeholder="Owner Email" />
        <div style={{ color: 'red' }}>{error.ownerEmail}</div>
      </IntegrationStepOne>

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>

        <ZohoAnalyticsIntegLayout
          formID={formID}
          formFields={formFields}
          handleInput={(e) => handleInput(e, analyticsConf, setAnalyticsConf, formID, setisLoading, setSnackbar)}
          analyticsConf={analyticsConf}
          setAnalyticsConf={setAnalyticsConf}
          isLoading={isLoading}
          setisLoading={setisLoading}
          setSnackbar={setSnackbar}
        />

        <button
          onClick={() => nextPage(3)}
          disabled={analyticsConf.workspace === '' || analyticsConf.table === '' || analyticsConf.field_map.length < 1}
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
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, analyticsConf, history)}
      />
    </div>
  )
}

export default ZohoAnalytics
