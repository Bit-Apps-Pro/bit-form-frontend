import { __ } from '@wordpress/i18n'
import { useEffect, useState } from 'react'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Steps from '../../ElmSettings/Childs/Steps'
import { handleAuthorize, saveIntegConfig, setGrantTokenResponse } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepOne from '../IntegrationHelpers/IntegrationStepOne'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { checkMappedFields, handleInput, refreshApplications } from './ZohoCreatorCommonFunc'
import ZohoCreatorIntegLayout from './ZohoCreatorIntegLayout'

function ZohoCreator({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '', accountOwner: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const scopes = 'ZohoCreator.dashboard.READ,ZohoCreator.meta.application.READ,ZohoCreator.meta.form.READ,ZohoCreator.form.CREATE,ZohoCreator.report.CREATE,ZohoCreator.report.UPDATE'
  const [creatorConf, setCreatorConf] = useState({
    name: 'Zoho Creator API',
    type: 'Zoho Creator',
    clientId: process.env.NODE_ENV === 'development' ? '1000.YN34H0SNYOASNVTOYPKPO158PD8VTD' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? '04e7b570f25f7702d93a84a3ab8121880788782464' : '',
    accountOwner: '',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
    actions: {},
  })

  useEffect(() => {
    window.opener && setGrantTokenResponse('zohoCreator')
  }, [])

  const nextPage = val => {
    if (val === 3) {
      if (!checkMappedFields(creatorConf)) {
        setSnackbar({ show: true, msg: __('Please map mandatory fields', 'bitform') })
        return
      }

      setstep(val)
    } else {
      if (!creatorConf.accountOwner) {
        setError({
          accountOwner: __('Account Owner Name is mandatory!', 'bitform'),
        })
        return
      }
      setstep(val)
      if (val === 2 && !creatorConf.department) {
        refreshApplications(formID, creatorConf, setCreatorConf, setisLoading, setSnackbar)
      }
    }
    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  console.log('creatorConf', creatorConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <IntegrationStepOne
        step={step}
        confTmp={creatorConf}
        handleInput={(e) => handleInput(e, creatorConf, setCreatorConf, formID, setisLoading, setSnackbar, true, error, setError)}
        error={error}
        setSnackbar={setSnackbar}
        handleAuthorize={() => handleAuthorize('zohoCreator', 'zcreator', scopes, creatorConf, setCreatorConf, setError, setisAuthorized, setisLoading, setSnackbar)}
        isLoading={isLoading}
        isAuthorized={isAuthorized}
        nextPage={nextPage}
      >
        <div className="mt-3"><b>{__('Owner Name (Your Zoho Creator screen name):', 'bitform')}</b></div>
        <input className="btcd-paper-inp w-6 mt-1" onChange={(e) => handleInput(e, creatorConf, setCreatorConf)} name="accountOwner" value={creatorConf.accountOwner} type="text" placeholder={__('Your Zoho Creator screen name...', 'bitform')} />
        <div style={{ color: 'red' }}>{error.accountOwner}</div>
      </IntegrationStepOne>

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>
        <ZohoCreatorIntegLayout
          formID={formID}
          formFields={formFields}
          handleInput={(e) => handleInput(e, creatorConf, setCreatorConf, formID, setisLoading, setSnackbar)}
          creatorConf={creatorConf}
          setCreatorConf={setCreatorConf}
          isLoading={isLoading}
          setisLoading={setisLoading}
          setSnackbar={setSnackbar}
        />

        <button
          onClick={() => nextPage(3)}
          // disabled={creatorConf.department === '' || creatorConf.table === '' || creatorConf.field_map.length < 1}
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
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, creatorConf, history)}
      />
    </div>
  )
}

export default ZohoCreator
