import { useState } from 'react'
import { useFela } from 'react-fela'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useNavigate, useParams } from 'react-router-dom'
import BackIcn from '../../../Icons/BackIcn'
import app from '../../../styles/app.style'
import { __ } from '../../../Utils/i18nwrap'
import SnackMsg from '../../Utilities/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import NextBtn from '../NextBtn'
import MailPoetAuthorization from './MailPoetAuthorization'
import { checkMappedFields, refreshNewsLetter } from './MailPoetCommonFunc'
import MailPoetIntegLayout from './MailPoetIntegLayout'

export default function MailPoet({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const { formID } = useParams()
  const [isLoading, setisLoading] = useState(false)
  const { css } = useFela
  const [step, setStep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const [mailPoetConf, setMailPoetConf] = useState({
    name: 'Mail Poet',
    type: 'Mail Poet',
    field_map: [
      { formField: '', mailPoetField: '' },
    ],
    actions: {},
  })

  const nextPage = (val) => {
    setTimeout(() => {
      document.getElementById('btcd-settings-wrp').scrollTop = 0
    }, 300)
    if (val === 3) {
      if (!checkMappedFields(mailPoetConf)) {
        setSnackbar({ show: true, msg: 'Please map all required fields to continue.' })
        return
      }
      if (mailPoetConf.name !== '' && mailPoetConf.field_map.length > 0) {
        setStep(val)
      }
    } else {
      setStep(val)
      if (val === 2 && mailPoetConf.name) {
        refreshNewsLetter(formID, mailPoetConf, setMailPoetConf, setisLoading, setSnackbar)
      }
    }
  }

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2 cal-width">
        {/* <Steps step={3} active={step} /> */}
      </div>

      {/* STEP 1 */}
      <MailPoetAuthorization
        formID={formID}
        mailPoetConf={mailPoetConf}
        setMailPoetConf={setMailPoetConf}
        step={step}
        nextPage={nextPage}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
      />

      {/* STEP 2 */}
      <div
        className="btcd-stp-page"
        style={{ width: step === 2 && 900, height: step === 2 && `${100}%`, minHeight: step === 2 && `${200}px` }}
      >
        <MailPoetIntegLayout
          formID={formID}
          formFields={formFields}
          mailPoetConf={mailPoetConf}
          setMailPoetConf={setMailPoetConf}
          setSnackbar={setSnackbar}
        />
        <br />
        <br />
        <br />
        <NextBtn
          nextPageHandler={() => nextPage(3)}
          disabled={mailPoetConf.lists === '' || mailPoetConf.field_map.length < 1}
        />
        {/* <button
          onClick={() => nextPage(3)}
          disabled={mailPoetConf.lists === '' || mailPoetConf.field_map.length < 1}
          className={`${css(app.btn)} f-right btcd-btn-lg green sh-sm flx`}
          type="button"
        >
          {__('Next')}
          <BackIcn className="ml-1 rev-icn" />
        </button> */}
      </div>

      {/* STEP 3 */}
      <IntegrationStepThree
        step={step}
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, mailPoetConf, history)}
      />
    </div>
  )
}
