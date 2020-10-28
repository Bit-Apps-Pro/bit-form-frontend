import { useEffect, useState } from 'react';
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Steps from '../../ElmSettings/Childs/Steps'
import { handleAuthorize, saveIntegConfig, setGrantTokenResponse } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepOne from '../IntegrationHelpers/IntegrationStepOne'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { checkMappedFields, handleInput, refreshLists } from './ZohoCampaignsCommonFunc'
import ZohoCampaignsIntegLayout from './ZohoCampaignsIntegLayout'

function ZohoCampaigns({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const scopes = 'ZohoCampaigns.contact.READ,ZohoCampaigns.contact.CREATE,ZohoCampaigns.contact.UPDATE'
  const [campaignsConf, setCampaignsConf] = useState({
    name: 'Zoho Campaigns API',
    type: 'Zoho Campaigns',
    clientId: process.env.NODE_ENV === 'development' ? '1000.BWH0YC45BQ9PQMTZGKW5J3VUKUO18N' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? 'a01e54cfa1bb3de6283fbbb4d0d5ccee7404b29847' : '',
    list: '',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
  })

  useEffect(() => {
    window.opener && setGrantTokenResponse('zohoCampaigns')
  }, [])

  const nextPage = val => {
    if (val === 3) {
      if (!checkMappedFields(campaignsConf)) {
        setSnackbar({ show: true, msg: 'Please map mandatory fields' })
        return
      }

      if (campaignsConf.list !== '' && campaignsConf.table !== '' && campaignsConf.field_map.length > 0) {
        setstep(val)
      }
    } else {
      setstep(val)
      if (val === 2 && !campaignsConf.list) {
        refreshLists(formID, campaignsConf, setCampaignsConf, setisLoading, setSnackbar)
      }
    }

    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  console.log('campaignsConf', campaignsConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <IntegrationStepOne
        step={step}
        confTmp={campaignsConf}
        handleInput={(e) => handleInput(e, formID, campaignsConf, setCampaignsConf, setisLoading, setSnackbar, true, error, setError)}
        error={error}
        setSnackbar={setSnackbar}
        handleAuthorize={() => handleAuthorize('zohoCampaigns', 'zcampaigns', scopes, campaignsConf, setCampaignsConf, setError, setisAuthorized, setisLoading, setSnackbar)}
        isLoading={isLoading}
        isAuthorized={isAuthorized}
        nextPage={nextPage}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>
        <ZohoCampaignsIntegLayout
          formID={formID}
          formFields={formFields}
          handleInput={(e) => handleInput(e, formID, campaignsConf, setCampaignsConf, setisLoading, setSnackbar)}
          campaignsConf={campaignsConf}
          setCampaignsConf={setCampaignsConf}
          isLoading={isLoading}
          setisLoading={setisLoading}
          setSnackbar={setSnackbar}
        />

        <button
          onClick={() => nextPage(3)}
          disabled={campaignsConf.list === '' || campaignsConf.table === '' || campaignsConf.field_map.length < 1}
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
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, campaignsConf, history)}
      />
    </div>
  )
}

export default ZohoCampaigns
