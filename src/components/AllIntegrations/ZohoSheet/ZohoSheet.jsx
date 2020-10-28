import { useEffect, useState } from 'react';
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Steps from '../../ElmSettings/Childs/Steps'
import { handleAuthorize, saveIntegConfig, setGrantTokenResponse } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepOne from '../IntegrationHelpers/IntegrationStepOne'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { handleInput, refreshWorkbooks } from './ZohoSheetCommonFunc'
import ZohoSheetIntegLayout from './ZohoSheetIntegLayout'

function ZohoSheet({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '', ownerEmail: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const scopes = 'ZohoSheet.dataAPI.READ,ZohoSheet.dataAPI.UPDATE'
  const [sheetConf, setSheetConf] = useState({
    name: 'Zoho Sheet API',
    type: 'Zoho Sheet',
    clientId: process.env.NODE_ENV === 'development' ? '1000.01ZB6YV7B8BEIXGPX6821NIK29K0HZ' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? '79d6d0bf4b8104aea4c167a2e2e10d78a916af7c6b' : '',
    workbook: '',
    worksheet: '',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
    headerRow: 1,
    actions: {},
  })

  useEffect(() => {
    window.opener && setGrantTokenResponse('zohoSheet')
  }, [])

  const nextPage = val => {
    if (val === 3) {
      if (sheetConf.workbook !== '' && sheetConf.worksheet !== '' && sheetConf.field_map.length > 0) {
        setstep(val)
      }
    } else {
      setstep(val)
      if (val === 2 && !sheetConf.workbook) {
        refreshWorkbooks(formID, sheetConf, setSheetConf, setisLoading, setSnackbar)
      }
    }

    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  console.log('sheetConf', sheetConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <IntegrationStepOne
        step={step}
        confTmp={sheetConf}
        handleInput={(e) => handleInput(e, sheetConf, setSheetConf, formID, setisLoading, setSnackbar, true, error, setError)}
        error={error}
        setSnackbar={setSnackbar}
        handleAuthorize={() => handleAuthorize('zohoSheet', 'zsheet', scopes, sheetConf, setSheetConf, setError, setisAuthorized, setisLoading, setSnackbar)}
        isLoading={isLoading}
        isAuthorized={isAuthorized}
        nextPage={nextPage}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>

        <ZohoSheetIntegLayout
          formID={formID}
          formFields={formFields}
          handleInput={(e) => handleInput(e, sheetConf, setSheetConf, formID, setisLoading, setSnackbar)}
          sheetConf={sheetConf}
          setSheetConf={setSheetConf}
          isLoading={isLoading}
          setisLoading={setisLoading}
          setSnackbar={setSnackbar}
        />

        <button
          onClick={() => nextPage(3)}
          disabled={sheetConf.workbook === '' || sheetConf.worksheet === '' || sheetConf.field_map.length < 1}
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
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, sheetConf, history)}
      />
    </div>
  )
}

export default ZohoSheet
