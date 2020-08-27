/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Loader from '../../Loaders/Loader'
import ZohoAnalyticsFieldMap from './ZohoAnalyticsFieldMap'
import { FromSaveContext } from '../../../pages/FormDetails'
import { workspaceChange, tableChange, refreshWorkspaces, refreshTables } from './ZohoAnalyticsCommonFunc'
// import ZohoRecruitActions from './ZohoRecruitActions'

function EditZohoRecruit({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()
  const saveForm = useContext(FromSaveContext)

  const [analyticsConf, setAnalyticsConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })

  const handleInput = (e) => {
    let newConf = { ...analyticsConf }
    newConf[e.target.name] = e.target.value

    switch (e.target.name) {
      case 'workspace':
        newConf = workspaceChange(e.target.value, newConf, formID, setAnalyticsConf, setisLoading, setSnackbar)
        break;
      case 'table':
        newConf = tableChange(e.target.value, newConf, formID, setAnalyticsConf, setisLoading, setSnackbar)
        break;
      default:
        break;
    }
    setAnalyticsConf({ ...newConf })
  }

  const saveConfig = () => {
    integrations[id] = { ...integrations[id], ...analyticsConf }
    setIntegration([...integrations])
    saveForm()
    history.push(allIntegURL)
  }

  const addFieldMap = (i) => {
    const newConf = { ...analyticsConf }
    if (i !== 0) {
      newConf.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
    } else {
      newConf.field_map.push({ formField: '', zohoFormField: '' })
    }

    setAnalyticsConf({ ...newConf })
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-100 d-in-b">Integration Name:</b>
        <input className="btcd-paper-inp w-7" onChange={event => handleInput(event)} name="name" value={analyticsConf.name} type="text" placeholder="Integration Name..." />
      </div>
      <br />
      <br />
      <b className="wdt-100 d-in-b">Workspace:</b>
      <select onChange={event => handleInput(event)} name="workspace" value={analyticsConf.workspace} className="btcd-paper-inp w-7">
        <option value="">Select Workspace</option>
        {
          analyticsConf?.default?.workspaces && analyticsConf.default.workspaces.map(workspaceApiName => (
            <option value={workspaceApiName.workspaceName}>
              {workspaceApiName.workspaceName}
            </option>
          ))
        }
      </select>
      <button onClick={() => refreshWorkspaces(formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Analytics Workspaces"' }} type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <br />
      <b className="wdt-100 d-in-b">Table:</b>
      <select onChange={event => handleInput(event)} name="table" value={analyticsConf.table} className="btcd-paper-inp w-7">
        <option value="">Select Table</option>
        {
          analyticsConf?.default?.tables?.[analyticsConf.workspace] && Object.values(analyticsConf.default.tables[analyticsConf.workspace]).map(tableApiName => (
            <option value={tableApiName.viewName}>
              {tableApiName.viewName}
            </option>
          ))
        }
      </select>
      <button onClick={() => refreshTables(formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Analytics Tables"' }} type="button" disabled={isLoading}>&#x21BB;</button>
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
      {analyticsConf.default?.tables?.headers?.[analyticsConf.table]
        && (
          <>
            <div className="mt-4"><b className="wdt-100">Map Fields</b></div>
            <div className="btcd-hr mt-1" />
            <div className="flx flx-around mt-2 mb-1">
              <div className="txt-dp"><b>Form Fields</b></div>
              <div className="txt-dp"><b>Zoho Fields</b></div>
            </div>

            {analyticsConf.field_map.map((itm, i) => (
              <ZohoAnalyticsFieldMap
                i={i}
                field={itm}
                analyticsConf={analyticsConf}
                formFields={formFields}
                setAnalyticsConf={setAnalyticsConf}
              />
            ))}
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(analyticsConf.field_map.length)} className="icn-btn sh-sm" type="button">+</button></div>

            {/* <ZohoRecruitActions
                analyticsConf={analyticsConf}
                setAnalyticsConf={setAnalyticsConf}
              /> */}
          </>
        )}

      <div className="txt-center w-9 mt-3">
        <button onClick={saveConfig} className="btn btcd-btn-lg green sh-sm flx" type="button">
          Save
        </button>
      </div>
      <br />
    </div>
  )
}

export default EditZohoRecruit
