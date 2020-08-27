/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Loader from '../../Loaders/Loader'
import ZohoCRMFieldMap from './ZohoCRMFieldMap'
import { FromSaveContext } from '../../../pages/FormDetails'
import { handleTabChange, moduleChange, layoutChange, refreshModules, refreshLayouts, refreshRelatedList } from './ZohoCRMCommonFunc'
import ZohoCRMActions from './ZohoCRMActions'

function EditZohoCRM({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()
  const saveForm = useContext(FromSaveContext)
  /* eslint-disable-next-line no-undef */
  const isPro = typeof bits !== 'undefined' && bits.isPro

  const [crmConf, setCrmConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })
  const [tab, settab] = useState(0)
  console.log('crmConf', crmConf)

  const handleInput = (e, recordTab) => {
    let newConf = { ...crmConf }
    if (recordTab === 0) {
      newConf.actions = {}
      newConf[e.target.name] = e.target.value
    } else {
      newConf.relatedlist.actions = {}
      if (!newConf.relatedlist) {
        newConf.relatedlist = {}
      }
      newConf.relatedlist[e.target.name] = e.target.value
    }

    switch (e.target.name) {
      case 'module':
        newConf = moduleChange(e.target.value, tab, newConf, formID, setCrmConf, setisLoading, setSnackbar)
        break;
      case 'layout':
        newConf = layoutChange(e.target.value, tab, newConf, formID, setCrmConf, setisLoading, setSnackbar)
        break;
    }
    setCrmConf({ ...newConf })
  }

  const saveConfig = () => {
    const mappedFields = crmConf?.field_map ? crmConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (crmConf.default.layouts[crmConf.module][crmConf.layout].required && crmConf.default.layouts[crmConf.module][crmConf.layout].required.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField)) : []
    const mappedUploadFields = crmConf?.upload_field_map ? crmConf.upload_field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (crmConf.default.layouts[crmConf.module][crmConf.layout].requiredFileUploadFields && crmConf.default.layouts[crmConf.module][crmConf.layout].requiredFileUploadFields.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField)) : []
    if (mappedFields.length > 0 || mappedUploadFields.length > 0) {
      setSnackbar({ show: true, msg: 'Please map mandatory fields' })
      return
    }
    integrations[id] = { ...integrations[id], ...crmConf }
    setIntegration([...integrations])
    saveForm()
    history.push(allIntegURL)
  }

  const addFieldMap = (i, uploadFields) => {
    const newConf = { ...crmConf }
    if (tab === 0) {
      if (uploadFields) {
        if (i !== 0) {
          newConf.upload_field_map.splice(i, 0, { formField: '', zohoFormField: '' })
        } else {
          newConf.upload_field_map.push({ formField: '', zohoFormField: '' })
        }
      } else {
        if (i !== 0) {
          newConf.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
        } else {
          newConf.field_map.push({ formField: '', zohoFormField: '' })
        }
      }
    } else {
      if (uploadFields) {
        if (i !== 0) {
          newConf.relatedlist.upload_field_map.splice(i, 0, { formField: '', zohoFormField: '' })
        } else {
          newConf.relatedlist.upload_field_map.push({ formField: '', zohoFormField: '' })
        }
      } else {
        if (i !== 0) {
          newConf.relatedlist.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
        } else {
          newConf.relatedlist.field_map.push({ formField: '', zohoFormField: '' })
        }
      }
    }
    setCrmConf({ ...newConf })
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-100 d-in-b">Integration Name:</b>
        <input className="btcd-paper-inp w-7" onChange={event => handleInput(event, 0)} name="name" value={crmConf.name} type="text" placeholder="Integration Name..." />
      </div>

      <br />
      <b className="wdt-100 d-in-b">Module:</b>
      <select onChange={event => handleInput(event, tab)} name="module" value={crmConf.module} className="btcd-paper-inp w-7" disabled={tab === 1}>
        <option>Select Module</option>
        {
          crmConf?.default?.modules && Object.keys(crmConf.default.modules).map(moduleApiName => (
            <option key={moduleApiName} value={moduleApiName}>
              {crmConf.default.modules[moduleApiName].plural_label}
            </option>
          ))
        }
      </select>
      {tab === 0 && <button onClick={() => refreshModules(formID, crmConf, setCrmConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh CRM Modules"' }} type="button" disabled={isLoading}>&#x21BB;</button>}
      <br />
      <div className="flx mt-2">
        <button onClick={() => handleTabChange(0, settab)} className={`btcd-s-tab-link ${tab === 0 && 's-t-l-active'}`} type="button">New Record</button>
        <button onClick={() => handleTabChange(1, settab, crmConf, setCrmConf, formID, setisLoading, setSnackbar)} className={`btcd-s-tab-link ${tab === 1 && 's-t-l-active'}`} type="button">Related List</button>
      </div>
      <div className="btcd-hr" />
      <br />
      <br />
      {
        tab === 1
        && (
          <div className="pos-rel">
            {!isPro && (
              <div className="pro-blur flx">
                <div className="pro">Available On <a href="https://bitpress.pro/" target="_blank"><span className="txt-pro">Premium</span></a></div>
              </div>)}
            <b className="wdt-100 d-in-b">Related List:</b>
            <select onChange={event => handleInput(event, tab)} name="module" value={crmConf?.relatedlist?.module} className="btcd-paper-inp w-7" disabled={!crmConf.module}>
              <option value="">Select Related Module</option>
              {
                crmConf?.default?.relatedlists?.[crmConf.module] && Object.keys(crmConf.default.relatedlists[crmConf.module]).map(relatedlistApiName => (
                  <option value={crmConf.default.relatedlists[crmConf.module][relatedlistApiName].module}>
                    {relatedlistApiName}
                  </option>
                ))
              }
            </select>
            <button onClick={() => refreshRelatedList(formID, crmConf, setCrmConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh CRM Related Lists"' }} type="button" disabled={isLoading}>&#x21BB;</button>
            <br />
            <br />
          </div>
        )
      }
      <b className="wdt-100 d-in-b">Layout:</b>
      {
        tab === 0
          ? (
            <select onChange={event => handleInput(event, tab)} name="layout" value={crmConf.layout} className="btcd-paper-inp w-7">
              <option value="">Select Layout</option>
              {
                crmConf?.default?.layouts?.[crmConf.module] && Object.keys(crmConf.default.layouts[crmConf.module]).map(layoutApiName => (
                  <option value={layoutApiName}>
                    {layoutApiName}
                  </option>
                ))
              }
            </select>
          )
          : (
            <select onChange={event => handleInput(event, tab)} name="layout" value={crmConf?.relatedlist?.layout} className="btcd-paper-inp w-7" disabled={!crmConf?.relatedlist?.module}>
              <option value="">Select Layout</option>
              {
                crmConf?.default?.layouts?.[crmConf?.relatedlist?.module] && Object.keys(crmConf.default.layouts[crmConf?.relatedlist?.module]).map(layoutApiName => (
                  <option value={layoutApiName}>
                    {layoutApiName}
                  </option>
                ))
              }
            </select>
          )
      }
      <button onClick={() => refreshLayouts(tab, crmConf.module, formID, crmConf, setCrmConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh CRM Layouts"' }} type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <br />
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
        && crmConf?.default?.layouts?.[crmConf.module]?.[crmConf.layout]?.fields
        && (
          <>
            <div className="mt-4"><b className="wdt-100">Field Map</b></div>
            <div className="btcd-hr mt-1" />
            <div className="flx flx-around mt-2 mb-1">
              <div className="txt-dp"><b>Form Fields</b></div>
              <div className="txt-dp"><b>Zoho Fields</b></div>
            </div>

            {crmConf.field_map.map((itm, i) => (
              <ZohoCRMFieldMap
                key={`crm-m-${i + 9}`}
                i={i}
                field={itm}
                crmConf={crmConf}
                formFields={formFields}
                setCrmConf={setCrmConf}
                tab={tab}
                setSnackbar={setSnackbar}
              />
            ))}
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(crmConf.field_map.length, 0)} className="icn-btn sh-sm" type="button">+</button></div>
            <br />
            <br />
            {Object.keys(crmConf.default.layouts[crmConf.module][crmConf.layout]?.fileUploadFields).length !== 0 && (
              <div className="pos-rel">
                {!isPro && (
                  <div className="pro-blur flx">
                    <div className="pro">Available On <a href="https://bitpress.pro/" target="_blank"><span className="txt-pro">Premium</span></a></div>
                  </div>)}
                <div className="mt-4"><b className="wdt-100">Map File Upload Fields</b></div>
                <div className="btcd-hr mt-1" />
                <div className="flx flx-around mt-2 mb-1">
                  <div className="txt-dp"><b>Form Fields</b></div>
                  <div className="txt-dp"><b>Zoho Fields</b></div>
                </div>

                {crmConf.upload_field_map?.map((itm, i) => (
                  <ZohoCRMFieldMap
                    key={`crm-m-${i + 9}`}
                    i={i}
                    uploadFields={1}
                    field={itm}
                    crmConf={crmConf}
                    formFields={formFields}
                    setCrmConf={setCrmConf}
                    tab={tab}
                    setSnackbar={setSnackbar}
                  />
                ))}
                <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(crmConf.upload_field_map.length, 1)} className="icn-btn sh-sm" type="button">+</button></div>
                <br />
                <br />
              </div>
            )}
            <div className="mt-4"><b className="wdt-100">Actions</b></div>
            <div className="btcd-hr mt-1" />

            <ZohoCRMActions
              formFields={formFields}
              crmConf={crmConf}
              setCrmConf={setCrmConf}
              tab={tab}
              formID={formID}
              setSnackbar={setSnackbar}
            />
          </>
        )
      }
      {
        tab === 1
        && crmConf.default?.layouts?.[crmConf?.relatedlist?.module]?.[crmConf?.relatedlist?.layout]?.fields
        && (
          <div className="pos-rel">
            {!isPro && (
              <div className="pro-blur flx">
                <div className="pro">Available On <a href="https://bitpress.pro/" target="_blank"><span className="txt-pro">Premium</span></a></div>
              </div>)}
            <div className="mt-4"><b className="wdt-100">Field Map</b></div>
            <div className="btcd-hr mt-1" />
            <div className="flx flx-around mt-2 mb-1">
              <div className="txt-dp"><b>Form Fields</b></div>
              <div className="txt-dp"><b>Zoho Fields</b></div>
            </div>

            {crmConf?.relatedlist?.field_map?.map((itm, i) => (
              <ZohoCRMFieldMap
                key={`crm-m-${i + 9}`}
                i={i}
                field={itm}
                crmConf={crmConf}
                formFields={formFields}
                setCrmConf={setCrmConf}
                tab={tab}
                setSnackbar={setSnackbar}
              />
            ))}
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(crmConf.relatedlist.field_map.length, 0)} className="icn-btn sh-sm" type="button">+</button></div>
            <br />
            <br />
            {crmConf.default.layouts[crmConf.relatedlist.module]?.[crmConf.relatedlist.layout] && Object.keys(crmConf.default.layouts[crmConf.relatedlist.module][crmConf.relatedlist.layout].fileUploadFields).length !== 0 && (
              <>
                <div className="mt-4"><b className="wdt-100">File Upload Field Map</b></div>
                <div className="btcd-hr mt-1" />
                <div className="flx flx-around mt-2 mb-1">
                  <div className="txt-dp"><b>Form Fields</b></div>
                  <div className="txt-dp"><b>Zoho Fields</b></div>
                </div>

                {crmConf.relatedlist.upload_field_map.map((itm, i) => (
                  <ZohoCRMFieldMap
                    key={`crm-m-${i + 9}`}
                    i={i}
                    uploadFields={1}
                    field={itm}
                    crmConf={crmConf}
                    formFields={formFields}
                    setCrmConf={setCrmConf}
                    tab={tab}
                    setSnackbar={setSnackbar}
                  />
                ))}
                <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap(crmConf.relatedlist.upload_field_map.length, 1)} className="icn-btn sh-sm" type="button">+</button></div>
                <br />
                <br />
              </>
            )}
            <div className="mt-4"><b className="wdt-100">Actions</b></div>
            <div className="btcd-hr mt-1" />

            <ZohoCRMActions
              formFields={formFields}
              crmConf={crmConf}
              setCrmConf={setCrmConf}
              tab={tab}
              formID={formID}
              setSnackbar={setSnackbar}
            />
          </div>
        )
      }

      <div className="txt-center w-9 mt-3">
        <button onClick={saveConfig} className="btn btcd-btn-lg green sh-sm flx" type="button">
          Save
        </button>
      </div>
      <br />
    </div >
  )
}

export default EditZohoCRM
