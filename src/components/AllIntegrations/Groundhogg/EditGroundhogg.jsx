/* eslint-disable no-param-reassign */
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { __ } from '../../../Utils/i18nwrap'
import SnackMsg from '../../Utilities/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { handleInput } from './GroundhoggCommonFunc'
import GroundhoggIntegLayout from './GroundhoggIntegLayout'

function EditGroundhogg({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const { id, formID } = useParams()

  const [groundhoggConf, setGroundhoggConf] = useState({ ...integrations[id] })
  const [isLoading, setIsLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })

  const isDisabled = !((groundhoggConf.mainAction === '2' && groundhoggConf.addTagToUser !== ''))

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-200 d-in-b">{__('Integration Name:')}</b>
        <input
          className="btcd-paper-inp w-5"
          onChange={e => handleInput(e, groundhoggConf, setGroundhoggConf)}
          name="name"
          value={groundhoggConf.name}
          type="text"
          placeholder={__('Integration Name...')}
        />
      </div>
      <br />

      <GroundhoggIntegLayout
        formFields={formFields}
        handleInput={(e) => handleInput(e, groundhoggConf, setGroundhoggConf, setIsLoading, setSnackbar, formID)}
        groundhoggConf={groundhoggConf}
        setGroundhoggConf={setGroundhoggConf}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSnackbar={setSnackbar}
      />

      <IntegrationStepThree
        edit
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, groundhoggConf, history, id, 1)}
      />
      <br />
    </div>
  )
}

export default EditGroundhogg
