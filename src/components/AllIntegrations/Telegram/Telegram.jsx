import { useState } from 'react';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import { useHistory, useParams } from 'react-router-dom';
import { __ } from '../../../Utils/i18nwrap';
import SnackMsg from '../../ElmSettings/Childs/SnackMsg';
import Steps from '../../ElmSettings/Childs/Steps';
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers';
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree';
import TelegramAuthorization from './TelegramAuthorization';
import TelegramIntegLayout from './TelegramIntegLayout';

export default function Telegram({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isLoading, setisLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [snack, setSnackbar] = useState({ show: false })
  const [telegramConf, setTelegramConf] = useState({
    name: 'Telegram',
    type: 'Telegram',
    parse_mode: 'HTML',
    bot_api_key: process.env.NODE_ENV === 'development' ? '1748780148:AAGrngQBKkEhKx5qyo3smqllw2gNc2YWnO4' : '',
    chat_id: '',
    body: '',
    actions: {},
  })

  const nextPage = (val) => {
    if (val === 3) {
      if (telegramConf.name !== '' && telegramConf.chat_id ) {
        setStep(val)
      }
    }
    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  console.log('telegramConf', telegramConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <TelegramAuthorization
        formID={formID}
        telegramConf={telegramConf}
        setTelegramConf={setTelegramConf}
        step={step}
        setstep={setStep}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
      />

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%`, minHeight: step === 2 && `${200}px` }}>
        <TelegramIntegLayout
          formID={formID}
          formFields={formFields}
          telegramConf={telegramConf}
          setTelegramConf={setTelegramConf}
          isLoading={isLoading}
          setisLoading={setisLoading}
          setSnackbar={setSnackbar}
        />
        <br />
        <br />
        <button
          onClick={() => nextPage(3)}
          disabled={telegramConf.chat_id === ''}
          className="btn f-right btcd-btn-lg green sh-sm flx"
          type="button"
        >
          {__('Next', 'bitform')}
          <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
        </button>
      </div>

      {/* STEP 3 */}
      <IntegrationStepThree
        step={step}
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, telegramConf, history)}
      />
    </div>
  )
}