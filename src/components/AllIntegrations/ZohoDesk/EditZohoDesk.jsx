/* eslint-disable no-param-reassign */
import React, { useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Loader from '../../Loaders/Loader'
import ZohoDeskFieldMap from './ZohoDeskFieldMap'
import { portalChange, departmentChange, refreshOrganizations, refreshDepartments, refreshFields } from './ZohoDeskCommonFunc'
import ZohoDeskActions from './ZohoDeskActions'
import { FormSaveContext } from '../../../pages/FormDetails'
import saveIntegConfig from '../IntegrationHelpers/IntegrationHelpers'

function EditZohoRecruit({ formFields, setIntegration, integrations, allIntegURL }) {
  const { id, formID } = useParams()
  const history = useHistory()
  const [deskConf, setDeskConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })
  const saveForm = useContext(FormSaveContext)

  console.log('deskConf', deskConf)

  const handleInput = (e) => {
    let newConf = { ...deskConf }
    newConf[e.target.name] = e.target.value

    switch (e.target.name) {
      case 'orgId':
        newConf = portalChange(newConf, formID, setDeskConf, setisLoading, setSnackbar)
        break;
      case 'department':
        newConf = departmentChange(newConf, formID, setDeskConf, setisLoading, setSnackbar)
        break;
      default:
        break;
    }
    setDeskConf({ ...newConf })
  }

  const saveConfig = () => {
    const mappedFields = deskConf?.field_map ? deskConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && deskConf?.default?.fields?.[deskConf.orgId]?.required.indexOf(mappedField.zohoFormField) !== -1)) : []
    if (mappedFields.length > 0) {
      setSnackbar({ show: true, msg: 'Please map mandatory fields' })
      return
    }
    if (!deskConf.actions?.ticket_owner) {
      setSnackbar({ show: true, msg: 'Please select a ticket owner' })
      return
    }
    saveIntegConfig(integrations, setIntegration, allIntegURL, deskConf, history, saveForm, id, 1)
  }

  const addFieldMap = (i) => {
    const newConf = { ...deskConf }
    if (i !== 0) {
      newConf.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
    } else {
      newConf.field_map.push({ formField: '', zohoFormField: '' })
    }

    setDeskConf({ ...newConf })
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-100 d-in-b">Integration Name:</b>
        <input className="btcd-paper-inp w-7" onChange={event => handleInput(event)} name="name" value={deskConf.name} type="text" placeholder="Integration Name..." />
      </div>
      <br />
      <br />
      <b className="wdt-100 d-in-b">Portal:</b>
      <select onChange={event => handleInput(event)} name="orgId" value={deskConf.orgId} className="btcd-paper-inp w-7">
        <option value="">Select Portal</option>
        {
            deskConf?.default?.organizations && deskConf.default.organizations.map(organization => (
              <option value={organization.orgId}>
                {organization.portalName}
              </option>
            ))
          }
      </select>
      <button onClick={() => refreshOrganizations(formID, deskConf, setDeskConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Desk Portals"' }} type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <br />
      <b className="wdt-100 d-in-b">Department:</b>
      <select onChange={event => handleInput(event)} name="department" value={deskConf.department} className="btcd-paper-inp w-7">
        <option value="">Select Department</option>
        {
            deskConf?.default?.departments && deskConf.default.departments[deskConf?.orgId]?.map(department => (
              <option value={department.departmentId}>
                {department.departmentName}
              </option>
            ))
          }
      </select>
      <button onClick={() => refreshDepartments(formID, deskConf, setDeskConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Desk Departments"' }} type="button" disabled={isLoading}>&#x21BB;</button>
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
        <button onClick={() => refreshFields(formID, deskConf, setDeskConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Desk Fields"' }} type="button" disabled={isLoading}>&#x21BB;</button>
      </div>
      <div className="btcd-hr mt-1" />
      {deskConf.default?.fields?.[deskConf?.orgId]
          && (
            <>
              <div className="flx flx-around mt-2 mb-1">
                <div className="txt-dp"><b>Form Fields</b></div>
                <div className="txt-dp"><b>Zoho Fields</b></div>
              </div>

              {deskConf.field_map.map((itm, i) => (
                <ZohoDeskFieldMap
                  i={i}
                  field={itm}
                  deskConf={deskConf}
                  formFields={formFields}
                  setDeskConf={setDeskConf}
                />
              ))}
              <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(deskConf.field_map.length)} className="icn-btn sh-sm" type="button">+</button></div>
              <br />
              <br />
              <div className="mt-4"><b className="wdt-100">Actions</b></div>
              <div className="btcd-hr mt-1" />

              <ZohoDeskActions
                deskConf={deskConf}
                setDeskConf={setDeskConf}
                formID={formID}
                formFields={formFields}
                setSnackbar={setSnackbar}
              />
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
