import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Steps from '../../ElmSettings/Childs/Steps'
import { handleMailChimpAuthorize, saveIntegConfig, setGrantTokenResponse } from '../IntegrationHelpers/MailChimpIntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { handleInput, refreshAudience } from './MailChimpCommonFunc'
import MailChimpIntegLayout from './MailChimpIntegLayout'
import MailChimpAuthorization from './MailChimpAuthorization'

function MailChimp({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ clientId: '', clientSecret: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const [sheetConf, setSheetConf] = useState({
    name: 'Mail Chimp API',
    type: 'Mail Chimp',
    clientId: process.env.NODE_ENV === 'development' ? '157302588119' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? '9290588c73ca930093a977efbf961f578fe54858fdba29804b' : '',
    listId: '',
    listName: '',
    field_map: [
      { formField: '', mailChimpField: '' },
    ],
    address_field: [],
    actions: {},
  })
  console.log('sheetConf', sheetConf)

  useEffect(() => {
    window.opener && setGrantTokenResponse('mailChimp')
  }, [])

  const nextPage = val => {
    if (val === 3) {
      if (sheetConf.listId !== '') {
        setstep(val)
      }
    } else {
      setstep(val)
      if (val === 2 && !sheetConf.listId) {
        refreshAudience(formID, sheetConf, setSheetConf, setisLoading, setSnackbar)
      }
    }
    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }
  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <MailChimpAuthorization
        step={step}
        confTmp={sheetConf}
        handleInput={(e) => handleInput(e, sheetConf, setSheetConf, formID, setisLoading, setSnackbar, true, error, setError)}
        error={error}
        setSnackbar={setSnackbar}
        handleAuthorize={() => handleMailChimpAuthorize('mailChimp', 'mChimp', sheetConf, setSheetConf, setError, setisAuthorized, setisLoading, setSnackbar)}
        isLoading={isLoading}
        isAuthorized={isAuthorized}
        nextPage={nextPage}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>

        <MailChimpIntegLayout
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
          disabled={!sheetConf.listId || sheetConf.field_map.length < 1}
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
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, sheetConf, history)}
      />
    </div>
  )
}

export default MailChimp
