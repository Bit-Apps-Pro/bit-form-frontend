/* eslint-disable no-param-reassign */
import React, { useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Loader from '../../Loaders/Loader'
import ZohoRecruitFieldMap from './ZohoRecruitFieldMap'
import { FormSaveContext } from '../../../pages/FormDetails'
import { handleTabChange, moduleChange, refreshModules, refreshRelatedList } from './ZohoRecruitCommonFunc'
import ZohoRecruitActions from './ZohoRecruitActions'
import saveIntegConfig from '../IntegrationHelpers/IntegrationHelpers'

function EditZohoRecruit({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()
  const saveForm = useContext(FormSaveContext)

  const [recruitConf, setRecruitConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })
  const [tab, settab] = useState(0)

  console.log('editRecruitConf', recruitConf)

  const handleInput = (e) => {
    let newConf = { ...recruitConf }
    if (tab === 0) {
      newConf[e.target.name] = e.target.value
    } else {
      newConf.relatedlist[e.target.name] = e.target.value
    }

    switch (e.target.name) {
      case 'module':
        newConf = moduleChange(e.target.value, tab, newConf, formID, setRecruitConf, setisLoading, setSnackbar)
        break;
      default:
        break;
    }
    setRecruitConf({ ...newConf })
  }

  const saveConfig = () => {
    saveIntegConfig(integrations, setIntegration, allIntegURL, recruitConf, history, saveForm, id, 1)
  }

  const addFieldMap = (i, uploadFields) => {
    const newConf = { ...recruitConf }
    if (tab === 0) {
      if (uploadFields) {
        if (i !== 0) {
          newConf.upload_field_map.splice(i, 0, { formField: '', zohoFormField: '' })
        } else {
          newConf.upload_field_map.push({ formField: '', zohoFormField: '' })
        }
      } else if (i !== 0) {
        newConf.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
      } else {
        newConf.field_map.push({ formField: '', zohoFormField: '' })
      }
    } else if (uploadFields) {
      if (i !== 0) {
        newConf.relatedlist.upload_field_map.splice(i, 0, { formField: '', zohoFormField: '' })
      } else {
        newConf.relatedlist.upload_field_map.push({ formField: '', zohoFormField: '' })
      }
    } else if (i !== 0) {
      newConf.relatedlist.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
    } else {
      newConf.relatedlist.field_map.push({ formField: '', zohoFormField: '' })
    }

    setRecruitConf({ ...newConf })
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="flx mt-3">
        <b className="wdt-100 d-in-b">Integration Name:</b>
        <input className="btcd-paper-inp w-7" onChange={event => handleInput(event)} name="name" value={recruitConf.name} type="text" placeholder="Integration Name..." />
      </div>
      <br />
      <br />
      <b className="wdt-100 d-in-b">Module:</b>
      <select onChange={event => handleInput(event)} name="module" value={recruitConf.module} className="btcd-paper-inp w-7" disabled={tab === 1}>
        <option>Select Module</option>
        {
          Object.keys(recruitConf.default.modules)?.map(moduleApiName => (
            <option key={moduleApiName} value={moduleApiName}>
              {recruitConf.default.modules[moduleApiName].pl}
            </option>
          ))
        }
      </select>
      <button onClick={() => refreshModules(formID, recruitConf, setRecruitConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Recruit Modules"' }} type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <div className="flx mt-2">
        <button onClick={() => handleTabChange(0, settab)} className={`btcd-s-tab-link ${tab === 0 && 's-t-l-active'}`} type="button">New Record</button>
        <button onClick={() => handleTabChange(1, settab, recruitConf, setRecruitConf, formID, setisLoading, setSnackbar)} className={`btcd-s-tab-link ${tab === 1 && 's-t-l-active'}`} type="button">Related List</button>
      </div>
      <div className="btcd-hr" />
      <br />
      {
        tab === 1
        && (
          <>
            <b className="wdt-100 d-in-b">Related List:</b>
            <select onChange={event => handleInput(event, tab)} name="module" value={recruitConf?.relatedlist?.module} className="btcd-paper-inp w-7" disabled={!recruitConf.module}>
              <option value="">Select Related Module</option>
              {
                recruitConf?.default.relatedlists?.[recruitConf.module] && Object.values(recruitConf.default.relatedlists[recruitConf.module]).map(relatedlistApiName => (
                  <option value={relatedlistApiName.aMod}>
                    {relatedlistApiName.pl}
                  </option>
                ))
              }
            </select>
            <button onClick={() => refreshRelatedList(formID, recruitConf, setRecruitConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh CRM Related Lists"' }} type="button" disabled={isLoading}>&#x21BB;</button>
            <br />
            <br />
          </>
        )
      }
      {
        isLoading && (
          <Loader style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
            transform: 'scale(0.6)',
          }}
          />
        )
      }
      {tab === 0
        && recruitConf?.default?.moduleData?.[recruitConf.module]?.fields
        && (
          <>
            <div className="mt-4"><b className="wdt-100">Field Map</b></div>
            <div className="btcd-hr mt-1" />
            <div className="flx flx-around mt-2 mb-1">
              <div className="txt-dp"><b>Form Fields</b></div>
              <div className="txt-dp"><b>Zoho Fields</b></div>
            </div>

            {recruitConf.field_map.map((itm, i) => (
              <ZohoRecruitFieldMap
                key={`crm-m-${i + 9}`}
                i={i}
                field={itm}
                recruitConf={recruitConf}
                formFields={formFields}
                setRecruitConf={setRecruitConf}
                tab={tab}
              />
            ))}
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(recruitConf.field_map.length, 0)} className="icn-btn sh-sm" type="button">+</button></div>
            <br />
            <br />
            {recruitConf.default?.moduleData?.[recruitConf.module]?.fileUploadFields.length !== 0 && (
              <>
                <div className="mt-4"><b className="wdt-100">Map Attachments</b></div>
                <div className="btcd-hr mt-1" />
                <div className="flx flx-around mt-2 mb-1">
                  <div className="txt-dp"><b>Form Fields</b></div>
                  <div className="txt-dp"><b>Zoho Fields</b></div>
                </div>

                {recruitConf.upload_field_map.map((itm, i) => (
                  <ZohoRecruitFieldMap
                    key={`crm-m-${i + 9}`}
                    uploadFields={1}
                    i={i}
                    field={itm}
                    recruitConf={recruitConf}
                    formFields={formFields}
                    setRecruitConf={setRecruitConf}
                    tab={tab}
                  />
                ))}
                <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(recruitConf.upload_field_map.length, 1)} className="icn-btn sh-sm" type="button">+</button></div>
                <br />
                <br />
              </>
            )}
            <div className="mt-4"><b className="wdt-100">Actions</b></div>
            <div className="btcd-hr mt-1" />

            <ZohoRecruitActions
              recruitConf={recruitConf}
              setRecruitConf={setRecruitConf}
              tab={tab}
            />
          </>
        )}
      {tab === 1
        && recruitConf.default?.moduleData?.[recruitConf?.relatedlist?.module]?.fields
        && (
          <>
            <div className="mt-4"><b className="wdt-100">Map Fields</b></div>
            <div className="btcd-hr mt-1" />
            <div className="flx flx-around mt-2 mb-1">
              <div className="txt-dp"><b>Form Fields</b></div>
              <div className="txt-dp"><b>Zoho Fields</b></div>
            </div>

            {recruitConf.relatedlist.field_map.map((itm, i) => (
              <ZohoRecruitFieldMap
                key={`crm-m-${i + 9}`}
                i={i}
                field={itm}
                recruitConf={recruitConf}
                formFields={formFields}
                setRecruitConf={setRecruitConf}
                tab={tab}
              />
            ))}
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(recruitConf.relatedlist.field_map.length, 0)} className="icn-btn sh-sm" type="button">+</button></div>
            <br />
            <br />
            {Object.keys(recruitConf.default?.moduleData?.[recruitConf.relatedlist.module]?.fileUploadFields).length !== 0 && (
              <>
                <div className="mt-4"><b className="wdt-100">Map Attachments</b></div>
                <div className="btcd-hr mt-1" />
                <div className="flx flx-around mt-2 mb-1">
                  <div className="txt-dp"><b>Form Fields</b></div>
                  <div className="txt-dp"><b>Zoho Fields</b></div>
                </div>

                {recruitConf.relatedlist.upload_field_map.map((itm, i) => (
                  <ZohoRecruitFieldMap
                    key={`crm-m-${i + 9}`}
                    uploadFields={1}
                    i={i}
                    field={itm}
                    recruitConf={recruitConf}
                    formFields={formFields}
                    setRecruitConf={setRecruitConf}
                    tab={tab}
                  />
                ))}
                <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(recruitConf.relatedlist.upload_field_map.length, 1)} className="icn-btn sh-sm" type="button">+</button></div>
                <br />
                <br />
              </>
            )}
            <div className="mt-4"><b className="wdt-100">Actions</b></div>
            <div className="btcd-hr mt-1" />

            <ZohoRecruitActions
              recruitConf={recruitConf}
              setRecruitConf={setRecruitConf}
              tab={tab}
            />
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
