/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/MailChimpIntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { handleInput } from './MailChimpCommonFunc'
import MailChimpIntegLayout from './MailChimpIntegLayout'

function EditMailChimp({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()

  const [sheetConf, setSheetConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-150 d-in-b">{__('Integration Name:', 'bitform')}</b>
        <input className="btcd-paper-inp w-7" onChange={e => handleInput(e, sheetConf, setSheetConf)} name="name" value={sheetConf.name} type="text" placeholder={__('Integration Name...', 'bitform')} />
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

      {console.log('sheet info', sheetConf)}

      <IntegrationStepThree
        edit
        saveConfig={() => saveIntegConfig(integrations, setIntegration, allIntegURL, sheetConf, history, id, 1)}
        disabled={sheetConf.spreadsheetId === '' || sheetConf.worksheetName === '' || sheetConf.field_map.length < 1}
      />
      <br />
    </div>
  )
}

export default EditMailChimp
