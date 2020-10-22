/* eslint-disable no-param-reassign */
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import { saveIntegConfig } from '../IntegrationHelpers/IntegrationHelpers'
import IntegrationStepThree from '../IntegrationHelpers/IntegrationStepThree'
import { checkMappedFields, handleInput } from './ZohoRecruitCommonFunc'
import ZohoRecruitIntegLayout from './ZohoRecruitIntegLayout'

function EditZohoRecruit({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()
  const [recruitConf, setRecruitConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })
  const [tab, settab] = useState(0)

  console.log('editRecruitConf', recruitConf)

  const saveConfig = () => {
    if (!checkMappedFields(recruitConf)) {
      setSnackbar({ show: true, msg: 'Please map mandatory fields' })
      return
    }
    saveIntegConfig(integrations, setIntegration, allIntegURL, recruitConf, history, id, 1)
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="flx mt-3">
        <b className="wdt-100 d-in-b">Integration Name:</b>
        <input className="btcd-paper-inp w-7" onChange={event => handleInput(event, tab, recruitConf, setRecruitConf)} name="name" value={recruitConf.name} type="text" placeholder="Integration Name..." />
      </div>
      <br />
      <br />

      <ZohoRecruitIntegLayout
        tab={tab}
        settab={settab}
        formID={formID}
        formFields={formFields}
        handleInput={(e) => handleInput(e, tab, recruitConf, setRecruitConf, formID, setisLoading, setSnackbar)}
        recruitConf={recruitConf}
        setRecruitConf={setRecruitConf}
        isLoading={isLoading}
        setisLoading={setisLoading}
        setSnackbar={setSnackbar}
      />

      <IntegrationStepThree
        edit
        saveConfig={saveConfig}
        disabled={recruitConf.module === '' || recruitConf.field_map.length < 1}
      />
      <br />
    </div>
  )
}

export default EditZohoRecruit
