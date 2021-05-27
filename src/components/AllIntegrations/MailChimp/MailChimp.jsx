import { useEffect, useState } from 'react'

import { __ } from '../../../Utils/i18nwrap'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../Utilities/SnackMsg'
import Steps from '../../Utilities/Steps'
import { saveIntegConfig } from '../IntegrationHelpers/MailChimpIntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { handleInput, setGrantTokenResponse, checkAddressFieldMapRequired } from './MailChimpCommonFunc'
import MailChimpIntegLayout from './MailChimpIntegLayout'
import MailChimpAuthorization from './MailChimpAuthorization'

function MailChimp({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const [sheetConf, setSheetConf] = useState({
    name: 'Mail Chimp API',
    type: 'Mail Chimp',
    clientId: process.env.NODE_ENV === 'development' ? '125452420804' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? '471dd71ee208e3cdc60e4bb91b4c29bb791832ab49946d396c' : '',
    listId: '',
    listName: '',
    tags: '',
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
  const nextPage = () => {
    if (sheetConf.actions?.address && !checkAddressFieldMapRequired(sheetConf)) {
      setSnackbar({ show: true, msg: 'Please map address required fields to continue.' })
      return
    }
    if (sheetConf.listId !== '') {
      setstep(3)
    }
  }
  document.querySelector('.btcd-s-wrp').scrollTop = 0
  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <MailChimpAuthorization
        formID={formID}
        sheetConf={sheetConf}
        setSheetConf={setSheetConf}
        step={step}
        setstep={setstep}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
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
