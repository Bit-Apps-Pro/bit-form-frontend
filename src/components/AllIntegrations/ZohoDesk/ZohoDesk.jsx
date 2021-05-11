import { __ } from '../../../Utils/i18nwrap'
import { useEffect, useState } from 'react'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../Utilities/SnackMsg'
import Steps from '../../Utilities/Steps'
import { saveIntegConfig, setGrantTokenResponse } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { checkMappedFields, handleInput, refreshOrganizations } from './ZohoDeskCommonFunc'
import ZohoDeskIntegLayout from './ZohoDeskIntegLayout'
import ZohoDeskAuthorization from './ZohoDeskAuthorization'

function ZohoDesk({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const [deskConf, setDeskConf] = useState({
    name: 'Zoho Desk API',
    type: 'Zoho Desk',
    clientId: process.env.NODE_ENV === 'development' ? '1000.3NJI1INPTI67F97ZTP6HXSBWAKJ8MG' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? '6c358da44a5c32f9c1ec7a1d2fa4439ba4f0c89832' : '',
    orgId: '',
    department: '',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
    actions: {},
  })

  useEffect(() => {
    window.opener && setGrantTokenResponse('zohoDesk')
  }, [])

  const nextPage = val => {
    if (val === 3) {
      if (!checkMappedFields(deskConf)) {
        setSnackbar({ show: true, msg: __('Please map mandatory fields', 'bitform') })
        return
      }

      if (!deskConf.actions?.ticket_owner) {
        setSnackbar({ show: true, msg: __('Please select a ticket owner', 'bitform') })
        return
      }

      if (deskConf.department !== '' && deskConf.table !== '' && deskConf.field_map.length > 0) {
        setstep(val)
      }
    } else {
      setstep(val)
      if (val === 2 && !deskConf.department) {
        refreshOrganizations(formID, deskConf, setDeskConf, setisLoading, setSnackbar)
      }
    }
    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  console.log('deskConf', deskConf)

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <ZohoDeskAuthorization
        formID={formID}
        deskConf={deskConf}
        setDeskConf={setDeskConf}
        step={step}
        setstep={setstep}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>
        <ZohoDeskIntegLayout
          formID={formID}
          formFields={formFields}
          handleInput={(e) => handleInput(e, deskConf, setDeskConf, formID, setisLoading, setSnackbar)}
          deskConf={deskConf}
          setDeskConf={setDeskConf}
          isLoading={isLoading}
          setisLoading={setisLoading}
          setSnackbar={setSnackbar}
        />

        <button
          onClick={() => nextPage(3)}
          disabled={deskConf.department === '' || deskConf.table === '' || deskConf.field_map.length < 1}
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
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, deskConf, history)}
      />
    </div>
  )
}

export default ZohoDesk
