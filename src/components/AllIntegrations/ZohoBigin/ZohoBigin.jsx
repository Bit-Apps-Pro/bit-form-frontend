import { useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Steps from '../../ElmSettings/Childs/Steps'
import { handleAuthorize, saveIntegConfig, setGrantTokenResponse } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepOne from '../IntegrationHelpers/IntegrationStepOne'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { checkMappedFields, handleInput, refreshModules } from './ZohoBiginCommonFunc'
import ZohoBiginIntegLayout from './ZohoBiginIntegLayout'

function ZohoBigin({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const [tab, settab] = useState(0)
  const scopes = 'ZohoBigin.settings.modules.READ,ZohoBigin.settings.fields.READ,ZohoBigin.settings.tags.READ,ZohoBigin.users.READ,ZohoBigin.modules.ALL'
  const [biginConf, setBiginConf] = useState({
    name: 'Zoho Bigin API',
    type: 'Zoho Bigin',
    clientId: process.env.NODE_ENV === 'development' ? '1000.8YJRJQ5R5GBMFB9NSTO369X8XTW66P' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? 'cf2a97054162619aa35f421088cc7023fb64439d85' : '',
    module: '',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
    relatedlists: [],
    actions: {},
  })

  useEffect(() => {
    window.opener && setGrantTokenResponse('zohoBigin')
  }, [])

  const nextPage = val => {
    if (val === 3) {
      // if (!checkMappedFields(biginConf)) {
      //   setSnackbar({ show: true, msg: __('Please map mandatory fields', 'bitform') })
      //   return
      // }
      // if (biginConf.module !== '' && biginConf.field_map.length > 0) {
      // }
      setstep(val)
    } else {
      setstep(val)
      if (val === 2 && !biginConf.module) {
        refreshModules(formID, biginConf, setBiginConf, setisLoading, setSnackbar)
      }
    }

    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  console.log('biginConf', biginConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <IntegrationStepOne
        step={step}
        confTmp={biginConf}
        handleInput={(e) => handleInput(e, tab, biginConf, setBiginConf, formID, setisLoading, setSnackbar, true, error, setError)}
        error={error}
        setSnackbar={setSnackbar}
        handleAuthorize={() => handleAuthorize('zohoBigin', 'zbigin', scopes, biginConf, setBiginConf, setError, setisAuthorized, setisLoading, setSnackbar)}
        isLoading={isLoading}
        isAuthorized={isAuthorized}
        nextPage={nextPage}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>

        <ZohoBiginIntegLayout
          tab={tab}
          settab={settab}
          formID={formID}
          formFields={formFields}
          handleInput={(e) => handleInput(e, tab, biginConf, setBiginConf, formID, setisLoading, setSnackbar)}
          biginConf={biginConf}
          setBiginConf={setBiginConf}
          isLoading={isLoading}
          setisLoading={setisLoading}
          setSnackbar={setSnackbar}
        />

        <button
          onClick={() => nextPage(3)}
          // disabled={biginConf.module === '' || biginConf.field_map.length < 1}
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
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, biginConf, history)}
      />
    </div>
  )
}

export default ZohoBigin
