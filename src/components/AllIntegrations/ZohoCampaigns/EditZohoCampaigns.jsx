/* eslint-disable no-param-reassign */
import React, { useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Loader from '../../Loaders/Loader'
import ZohoCampaignsFieldMap from './ZohoCampaignsFieldMap'
import { FormSaveContext } from '../../../pages/FormDetails'
import { listChange, refreshLists, refreshContactFields } from './ZohoCampaignsCommonFunc'
import saveIntegConfig from '../IntegrationHelpers/IntegrationHelpers'

function EditZohoRecruit({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()
  const saveForm = useContext(FormSaveContext)

  const [campaignsConf, setCampaignsConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })

  console.log('campaignsConf', campaignsConf)

  const handleInput = (e) => {
    let newConf = { ...campaignsConf }
    newConf[e.target.name] = e.target.value

    switch (e.target.name) {
      case 'workspace':
        newConf = listChange(e.target.value, newConf, formID, setCampaignsConf, setisLoading, setSnackbar)
        break;
      default:
        break;
    }
    setCampaignsConf({ ...newConf })
  }

  const saveConfig = () => {
    if (campaignsConf.field_map[0].formField.length === 0) {
      setSnackbar({ show: true, msg: 'Please map mandatory fields' })
      return
    }
    saveIntegConfig(integrations, setIntegration, allIntegURL, campaignsConf, history, saveForm, id, 1)
  }

  const addFieldMap = (i) => {
    const newConf = { ...campaignsConf }
    if (i !== 0) {
      newConf.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
    } else {
      newConf.field_map.push({ formField: '', zohoFormField: '' })
    }

    setCampaignsConf({ ...newConf })
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-100 d-in-b">Integration Name:</b>
        <input className="btcd-paper-inp w-7" onChange={event => handleInput(event)} name="name" value={campaignsConf.name} type="text" placeholder="Integration Name..." />
      </div>
      <br />
      <br />
      <b className="wdt-100 d-in-b">List:</b>
      <select onChange={event => handleInput(event)} name="list" value={campaignsConf.list} className="btcd-paper-inp w-7">
        <option value="">Select List</option>
        {
            campaignsConf?.default?.lists && campaignsConf.default.lists.map(listApiName => (
              <option value={listApiName.listkey}>
                {listApiName.listname}
              </option>
            ))
          }
      </select>
      <button onClick={() => refreshLists(formID, campaignsConf, setCampaignsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Campaigns Lists"' }} type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <br />
      {isLoading && (
        <Loader style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
          transform: 'scale(0.7)',
        }}
        />
      )}

      <div className="mt-4">
        <b className="wdt-100">Map Fields</b>
        <button onClick={() => refreshContactFields(campaignsConf.list, formID, campaignsConf, setCampaignsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Campaigns Contact Fields"' }} type="button" disabled={isLoading}>&#x21BB;</button>
      </div>
      <div className="btcd-hr mt-1" />
      {campaignsConf.default?.fields?.[campaignsConf.list]
        && (
          <>
            <div className="flx flx-around mt-2 mb-1">
              <div className="txt-dp"><b>Form Fields</b></div>
              <div className="txt-dp"><b>Zoho Fields</b></div>
            </div>

            {campaignsConf.field_map.map((itm, i) => (
              <ZohoCampaignsFieldMap
                i={i}
                field={itm}
                campaignsConf={campaignsConf}
                formFields={formFields}
                setCampaignsConf={setCampaignsConf}
              />
            ))}
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(campaignsConf.field_map.length)} className="icn-btn sh-sm" type="button">+</button></div>
          </>
        )}

      <div className="txt-center w-9 mt-3">
        <button onClick={saveConfig} className="btn btcd-btn-lg green sh-sm flx" type="button">
          Save
        </button>
      </div>
    </div>
  )
}

export default EditZohoRecruit
