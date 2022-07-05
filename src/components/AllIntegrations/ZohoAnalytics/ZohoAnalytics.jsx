import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { useHistory, useParams } from 'react-router-dom'
import BackIcn from '../../../Icons/BackIcn'
import app from '../../../styles/app.style'
import { __ } from '../../../Utils/i18nwrap'
import SnackMsg from '../../Utilities/SnackMsg'
import Steps from '../../Utilities/Steps'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import ZohoAnalyticsAuthorization from './ZohoAnalyticsAuthorization'
import { handleInput, setGrantTokenResponse } from './ZohoAnalyticsCommonFunc'
import ZohoAnalyticsIntegLayout from './ZohoAnalyticsIntegLayout'

export default function ZohoAnalytics({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const { css } = useFela()
  const [isLoading, setisLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const [analyticsConf, setAnalyticsConf] = useState({
    name: 'Zoho Analytics API',
    type: 'Zoho Analytics',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
    actions: {},
  })

  useEffect(() => {
    window.opener && setGrantTokenResponse()
  }, [])

  const nextPage = () => {
    setTimeout(() => {
      document.getElementById('btcd-settings-wrp').scrollTop = 0
    }, 300)
    if (analyticsConf.workspace !== '' && analyticsConf.table !== '' && analyticsConf.field_map.length > 0) {
      setStep(3)
    }
  }

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2">
        <Steps step={3} active={step} />
      </div>

      {/* STEP 1 */}
      <ZohoAnalyticsAuthorization
        formID={formID}
        analyticsConf={analyticsConf}
        setAnalyticsConf={setAnalyticsConf}
        step={step}
        setStep={setStep}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
      />

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
          onClick={nextPage}
          disabled={analyticsConf.workspace === '' || analyticsConf.table === '' || analyticsConf.field_map.length < 1}
          className={`${css(app.btn)} f-right btcd-btn-lg green sh-sm flx`}
          type="button"
        >
          {__('Next')}
          <BackIcn className="ml-1 rev-icn" />
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
