/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Loader from '../../Loaders/Loader'
import ZohoCrmFieldMap from './ZohoCrmFieldMap'
import { FromSaveContext } from '../../../pages/FormDetails'
import { refreshModules, refreshLayouts, refreshRelatedList, generateMappedField } from './ZohoCommonFunc'
import ZohoCrmActions from './ZohoCrmActions'

function EditZohoCRM({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()
  const saveForm = useContext(FromSaveContext)

  const [crmConf, setCrmConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })
  const [tab, settab] = useState(0)
  console.log('crmConf', crmConf)

  useEffect(() => {
    if (tab) {
      if (!crmConf.default?.relatedlists || !crmConf.default?.relatedlists[crmConf.module]) {
        refreshRelatedList(formID, crmConf, setCrmConf, setisLoading, setSnackbar)
      }
    }
  }, [tab])

  const moduleChange = (module, crmConfTmp) => {
    let newConf = { ...crmConfTmp }
    newConf.actions = {}
    newConf.layout = ''
    newConf.relatedlist.module = ''
    newConf.relatedlist.layout = ''
    newConf.relatedlist.actions = {}
    newConf.relatedlist.field_map = [{ formField: '', zohoFormField: '' }]

    if (tab === 0) {
      newConf.module = module
    } else {
      newConf.relatedlist.module = module
    }

    if (!newConf?.default?.layouts?.[module]) {
      refreshLayouts(tab, module, formID, newConf, setCrmConf, setisLoading, setSnackbar)
    } else {
      const layouts = [...Object.keys(newConf.default.layouts[module])]
      if (layouts.length == 1) {
        if (tab === 0) {
          [newConf.layout] = layouts
          newConf = layoutChange(newConf.layout, newConf)
        } else {
          [newConf.relatedlist.layout] = layouts
          newConf = layoutChange(newConf.relatedlist.layout, newConf)
        }
      }
    }

    return newConf

  }

  const layoutChange = (layout, crmConfTmp) => {
    const newConf = { ...crmConfTmp }
    newConf.actions = {}
    newConf.layout = ''
    const module = tab === 0 ? newConf.module : newConf.relatedlist.module
    if (tab === 0) {
      newConf.layout = layout
      newConf.field_map = [{ formField: '', zohoFormField: '' }]
      if (newConf?.default?.layouts?.[module]?.[layout]?.required) {
        newConf.field_map = generateMappedField(tab, newConf, module, layout)
      }
    } else {
      newConf.relatedlist.layout = layout
      newConf.relatedlist.field_map = [{ formField: '', zohoFormField: '' }]
      if (newConf?.default?.layouts?.[module]?.[layout]?.required) {
        newConf.relatedlist.field_map = generateMappedField(tab, newConf, module, layout)
      }
    }

    return newConf
  }

  const handleInput = (e, recordTab) => {
    let returnConf = {}
    const newConf = { ...crmConf }
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
        returnConf = moduleChange(e.target.value, newConf)
        break;
      case 'layout':
        returnConf = layoutChange(e.target.value, newConf)
        break;
    }
    setCrmConf({ ...newConf, ...returnConf })
  }

  const saveConfig = () => {
    const mappedFields = crmConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (crmConf.default.layouts[crmConf.module][crmConf.layout].required && crmConf.default.layouts[crmConf.module][crmConf.layout].required.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField))
    if (mappedFields.length > 0) {
      setSnackbar({ show: true, msg: 'Please map mandatory fields' })
      return
    }
    integrations[id] = { ...integrations[id], ...crmConf }
    setIntegration([...integrations])
    saveForm()
    history.push(allIntegURL)
  }

  const addFieldMap = () => {
    const newConf = { ...crmConf }
    if (tab === 0) {
      newConf.field_map.push({ formField: '', zohoFormField: '' })
    } else {
      if (!newConf.relatedlist.field_map) {
        newConf.relatedlist.field_map = []
      }
      newConf.relatedlist.field_map.push({ formField: '', zohoFormField: '' })
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
        <button onClick={() => settab(0)} className={`btcd-s-tab-link ${tab === 0 && 's-t-l-active'}`} type="button">New Record</button>
        <button onClick={() => settab(1)} className={`btcd-s-tab-link ${tab === 1 && 's-t-l-active'}`} type="button">Related List</button>
      </div>
      <div className="btcd-hr" />
      <br />
      <br />
      {
        tab === 1
        && (
          <>
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
          </>
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
              <ZohoCrmFieldMap
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
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap()} className="icn-btn sh-sm" type="button">+</button></div>
            <br />
            <br />
            <div className="mt-4"><b className="wdt-100">Actions</b></div>
            <div className="btcd-hr mt-1" />

            <ZohoCrmActions
              formFields={formFields}
              crmConf={crmConf}
              setCrmConf={setCrmConf}
              tab={tab}
              formID={formID}
              setSnackbar={setSnackbar}
            />
          </>
        )}
      {tab === 1
        && crmConf?.default?.layouts?.[crmConf?.relatedlist?.module]?.[crmConf?.relatedlist?.layout]?.fields
        && (
          <>
            <div className="mt-4"><b className="wdt-100">Field Map</b></div>
            <div className="btcd-hr mt-1" />
            <div className="flx flx-around mt-2 mb-1">
              <div className="txt-dp"><b>Form Fields</b></div>
              <div className="txt-dp"><b>Zoho Fields</b></div>
            </div>

            {crmConf?.relatedlist?.field_map?.map((itm, i) => (
              <ZohoCrmFieldMap
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
            <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addFieldMap()} className="icn-btn sh-sm" type="button">+</button></div>
            <br />
            <br />
            <div className="mt-4"><b className="wdt-100">Actions</b></div>
            <div className="btcd-hr mt-1" />

            <ZohoCrmActions
              formFields={formFields}
              crmConf={crmConf}
              setCrmConf={setCrmConf}
              tab={tab}
              formID={formID}
              setSnackbar={setSnackbar}
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

export default EditZohoCRM
