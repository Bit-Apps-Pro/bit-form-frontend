
import { __ } from '../../../Utils/i18nwrap'
import { useEffect, useState } from 'react'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Steps from '../../ElmSettings/Childs/Steps'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { checkMappedFields, handleInput, refreshLists, setGrantTokenResponse } from './ZohoMarketingHubCommonFunc'
import ZohoMarketingHubIntegLayout from './ZohoMarketingHubIntegLayout'
import ZohoMarketingHubAuthorization from './ZohoMarketingHubAuthorization'

function ZohoMarketingHub({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const [marketingHubConf, setMarketingHubConf] = useState({
    name: 'Zoho Marketing Hub API',
    type: 'Zoho Marketing Hub',
    clientId: process.env.NODE_ENV === 'development' ? '1000.3NJI1INPTI67F97ZTP6HXSBWAKJ8MG' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? '6c358da44a5c32f9c1ec7a1d2fa4439ba4f0c89832' : '',
    list: '',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
  })

  useEffect(() => {
    window.opener && setGrantTokenResponse()
  }, [])

  const nextPage = val => {
    if (val === 3) {
      if (!checkMappedFields(marketingHubConf)) {
        setSnackbar({ show: true, msg: __('Please map mandatory fields', 'bitform') })
        return
      }

      if (marketingHubConf.list !== '' && marketingHubConf.table !== '' && marketingHubConf.field_map.length > 0) {
        setstep(val)
      }
    } else {
      setstep(val)
      if (val === 2 && !marketingHubConf.list) {
        refreshLists(formID, marketingHubConf, setMarketingHubConf, setisLoading, setSnackbar)
      }
    }

    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  console.log('marketingHubConf', marketingHubConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <ZohoMarketingHubAuthorization
        formID={formID}
        marketingHubConf={marketingHubConf}
        setMarketingHubConf={setMarketingHubConf}
        step={step}
        setstep={setstep}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>
        <ZohoMarketingHubIntegLayout
          formID={formID}
          formFields={formFields}
          handleInput={(e) => handleInput(e, formID, marketingHubConf, setMarketingHubConf, setisLoading, setSnackbar)}
          marketingHubConf={marketingHubConf}
          setMarketingHubConf={setMarketingHubConf}
          isLoading={isLoading}
          setisLoading={setisLoading}
          setSnackbar={setSnackbar}
        />

        <button
          onClick={() => nextPage(3)}
          disabled={marketingHubConf.list === '' || marketingHubConf.table === '' || marketingHubConf.field_map.length < 1}
          className="btn f-right btcd-btn-lg green sh-sm flx"
          type="button"
        >
          {__('Next', 'bitform')}
          {' '}
&nbsp;
          <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
        </button>

      </div>

      {/* STEP 3 */}
      <IntegrationStepThree
        step={step}
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, marketingHubConf, history)}
      />
    </div>
  )
}

export default ZohoMarketingHub
