/* eslint-disable no-param-reassign */

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { __ } from '../../../Utils/i18nwrap'
import SnackMsg from '../../Utilities/SnackMsg'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { saveIntegConfig } from '../IntegrationHelpers/MailChimpIntegrationHelpers'
import { handleInput, isDisabled } from './SendFoxCommonFunc'
import SendFoxIntegLayout from './SendFoxIntegLayout'

function EditSendFox({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const { id, formID } = useParams()

  const [sendFoxConf, setSendFoxConf] = useState({ ...integrations[id] })
  const [isLoading, setIsLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-200 d-in-b">{__('Integration Name:')}</b>
        <input
          className="btcd-paper-inp w-5"
          onChange={e => handleInput(e, sendFoxConf, setSendFoxConf)}
          name="name"
          value={sendFoxConf.name}
          type="text"
          placeholder={__('Integration Name...')}
        />
      </div>
      <br />

      <SendFoxIntegLayout
        formFields={formFields}
        handleInput={(e) => handleInput(e, sendFoxConf, setSendFoxConf, setIsLoading, setSnackbar, formID)}
        sendFoxConf={sendFoxConf}
        setSendFoxConf={setSendFoxConf}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSnackbar={setSnackbar}
      />

      <IntegrationStepThree
        edit
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, sendFoxConf, history, id, 1)}
        disabled={isDisabled(sendFoxConf)}
      />
      <br />
    </div>
  )
}

export default EditSendFox
