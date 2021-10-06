// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useState } from 'react'
import { useFela } from 'react-fela'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useHistory, useParams } from 'react-router-dom'
import BackIcn from '../../../Icons/BackIcn'
import app from '../../../styles/app.style'
import SnackMsg from '../../Utilities/SnackMsg'
import Steps from '../../Utilities/Steps'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import ActiveCampaignAuthorization from './ActiveCampaignAuthorization'
import { checkMappedFields } from './ActiveCampaignCommonFunc'
import ActiveCampaignIntegLayout from './ActiveCampaignIntegLayout'

function ActiveCampaign({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const { css } = useFela()
  const [activeCampaingConf, setActiveCampaingConf] = useState({
    name: 'Active Campaign API',
    type: 'ActiveCampaign',
    api_url: process.env.NODE_ENV === 'development' ? 'https://bitcode.api-us1.com' : '',
    api_key: process.env.NODE_ENV === 'development' ? 'ff38f360de82ec99e1ac0fc5d83cbb5404ade1ab3a62c723ce089e2ad4da3f6cd362e779' : '',
    field_map: [
      { formField: '', activeCampaignField: '' },
    ],
    actions: {},
  })
  const nextPage = (val) => {
    setTimeout(() => {
      document.getElementById('btcd-settings-wrp').scrollTop = 0
    }, 300)
    if (val === 3) {
      if (!checkMappedFields(activeCampaingConf)) {
        setSnackbar({ show: true, msg: 'Please map all required fields to continue.' })
        return
      }
      if (!activeCampaingConf?.listId) {
        setSnackbar({ show: true, msg: 'Please select list to continue.' })
        return
      }
      if (activeCampaingConf.name !== '' && activeCampaingConf.field_map.length > 0) {
        setstep(3)
      }
    }
  }
  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <ActiveCampaignAuthorization
        formID={formID}
        activeCampaingConf={activeCampaingConf}
        setActiveCampaingConf={setActiveCampaingConf}
        step={step}
        setstep={setstep}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSnackbar={setSnackbar}
      />
      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, minHeight: step === 2 && `${900}px` }}>

        <ActiveCampaignIntegLayout
          formID={formID}
          formFields={formFields}
          activeCampaingConf={activeCampaingConf}
          setActiveCampaingConf={setActiveCampaingConf}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setSnackbar={setSnackbar}
        />
        <button
          onClick={() => nextPage(3)}
          disabled={!activeCampaingConf?.listId || activeCampaingConf.field_map.length < 1}
          className={`${css(app.btn)} f-right btcd-btn-lg green sh-sm flx`}
          type="button"
        >
          {__('Next', 'bitform')}
          {' '}
          &nbsp;
          <BackIcn className="ml-1 rev-icn" />
        </button>

      </div>

      {/* STEP 3 */}
      <IntegrationStepThree
        step={step}
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, activeCampaingConf, history)}
      />
    </div>
  )
}

export default ActiveCampaign
