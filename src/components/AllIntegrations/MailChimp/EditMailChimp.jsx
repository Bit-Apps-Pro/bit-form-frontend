/* eslint-disable no-param-reassign */

import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { __ } from '../../../Utils/i18nwrap'
import SnackMsg from '../../Utilities/SnackMsg'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { saveIntegConfig } from '../IntegrationHelpers/MailChimpIntegrationHelpers'
import { handleInput } from './MailChimpCommonFunc'
import MailChimpIntegLayout from './MailChimpIntegLayout'

function EditMailChimp({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useNavigate()
  const { id, formID } = useParams()

  const [sheetConf, setSheetConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-150 d-in-b">{__('Integration Name:')}</b>
        <input
          className="btcd-paper-inp w-6"
          onChange={e => handleInput(e, sheetConf, setSheetConf)}
          name="name"
          value={sheetConf.name}
          type="text"
          placeholder={__('Integration Name...')}
        />
      </div>
      <br />
      <br />

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

      <IntegrationStepThree
        edit
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, sheetConf, history, id, 1)}
        disabled={sheetConf.listId === '' || sheetConf.field_map.length < 1}
      />
      <br />
    </div>
  )
}

export default EditMailChimp
