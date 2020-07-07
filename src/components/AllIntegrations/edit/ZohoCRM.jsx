/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'
import { useRouteMatch, useHistory, useParams } from 'react-router-dom'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import bitsFetch from '../../../Utils/bitsFetch'

function ZohoCRM({ formFields, setIntegration, integrations }) {
  const { url } = useRouteMatch()
  const history = useHistory()
  const { id, formID } = useParams()

  const [crmConf, setCrmConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [isLayoutClearable, setisLayoutClearable] = useState(false)
  const [isFieldMappingClearable, setisFieldMappingClearable] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })
  console.log('crmConf.module', crmConf.module, integrations[id].module)
  useEffect(() => {
    const newConf = { ...crmConf }
    console.log('object', integrations[id], crmConf.module)
    if (crmConf.default && crmConf.default.layouts && !crmConf.default.layouts[crmConf.module]) {
      console.log('object1', integrations[id], crmConf.module)
      refreshLayouts()
    } else if (integrations[id].module) {
      if (isLayoutClearable) {
        console.log('object2', integrations[id], crmConf.module)
        const layouts = [...Object.keys(crmConf.default.layouts[crmConf.module])]
        console.log('laouts', layouts[0], layouts)
        if (layouts.length === 1) {
          newConf.layout = layouts[0]
          console.log('===1', newConf.layout, crmConf.layout)
          if (newConf.layout === crmConf.layout) {
            newConf.field_map = newConf.default.layouts[crmConf.module][crmConf.layout].required ? newConf.default.layouts[crmConf.module][crmConf.layout].required.map(field => ({ formField: '', zohoFormField: field })) : [{ formField: '', zohoFormField: '' }]
          }
        } else {
          newConf.layout = ''
          newConf.field_map = [{ formField: '', zohoFormField: '' }]
        }
        setCrmConf({ ...crmConf, ...newConf })
      } else {
        setisLayoutClearable(true)
      }
    }
  }, [crmConf.module])
  useEffect(() => {
    console.log('layout', integrations[id].layout, crmConf.layout)
    if (integrations[id].layout
      && isFieldMappingClearable
    ) {
      console.log('newFieldlayout', integrations[id].layout, crmConf.layout)
      const newConf = { ...crmConf }
      newConf.field_map = [{ formField: '', zohoFormField: '' }]
      if (crmConf.default && crmConf.default.layouts && newConf.default.layouts[crmConf.module][crmConf.layout] && newConf.default.layouts[crmConf.module][crmConf.layout].required) {
        newConf.field_map = newConf.default.layouts[crmConf.module][crmConf.layout].required.map(field => ({ formField: '', zohoFormField: field }))
      }
      setCrmConf({ ...crmConf, ...newConf })
    } else {
      setisFieldMappingClearable(true)
    }
  }, [crmConf.layout])

  const handleInput = e => {
    crmConf[e.target.name] = e.target.value
    setCrmConf({ ...crmConf })
  }

  const handleFieldMapping = (event, index) => {
    const newConf = { ...crmConf }
    newConf.field_map[index][event.target.name] = event.target.value
    setCrmConf({ ...crmConf, ...newConf })
  }

  const addMap = i => {
    if (i !== undefined) {
      crmConf.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
    } else {
      crmConf.field_map.push({ formField: '', zohoFormField: '' })
    }
    setCrmConf({ ...crmConf })
  }

  const delMap = i => {
    if (crmConf.field_map.length > 1) {
      crmConf.field_map.splice(i, 1)
    }
    setCrmConf({ ...crmConf })
  }

  const handleAtns = e => {
    if (e.target.checked) {
      crmConf.actions.push(e.target.value)
    } else {
      crmConf.actions.splice(crmConf.actions.indexOf(e.target.value), 1)
    }
    setCrmConf({ ...crmConf })
  }

  const saveConfig = () => {
    const mappedFields = crmConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (crmConf.default.layouts[crmConf.module][crmConf.layout].required && crmConf.default.layouts[crmConf.module][crmConf.layout].required.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField))
    if (mappedFields.length > 0) {
      setSnackbar({ show: true, msg: 'Please map mandatory fields' })
      return
    }
    integrations[id] = { ...integrations[id], ...crmConf }
    console.log('mappedFields', integrations[id])
    setIntegration([...integrations])
    history.push(url.match(/\/builder\/edit\/[0-9]+\/settings.integrations/g).join())
  }

  const refreshModules = () => {
    setisLoading(true)
    const refreshModulesRequestParams = {
      formID,
      id: crmConf.id,
      dataCenter: crmConf.dataCenter,
      clientId: crmConf.clientId,
      clientSecret: crmConf.clientSecret,
      tokenDetails: crmConf.tokenDetails,
    }
    const response = bitsFetch(refreshModulesRequestParams, 'bitforms_zcrm_refresh_modules')
      .then(result => result)
    response.then(result => {
      if (result && result.success) {
        const newConf = { ...crmConf }
        if (result.data.modules) {
          newConf.default = { ...newConf.default, modules: result.data.modules }
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        console.log('newConf', newConf)
        setCrmConf({ ...crmConf, ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Modules refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Modules refresh failed. please try again' })
      }
    })
    setisLoading(false)
  }

  const refreshLayouts = () => {
    if (!crmConf.module) {
      return
    }
    setisLoading(true)
    const refreshLayoutsRequestParams = {
      formID,
      id: crmConf.id,
      module: crmConf.module,
      dataCenter: crmConf.dataCenter,
      clientId: crmConf.clientId,
      clientSecret: crmConf.clientSecret,
      tokenDetails: crmConf.tokenDetails,
    }
    const response = bitsFetch(refreshLayoutsRequestParams, 'bitforms_zcrm_refresh_layouts')
      .then(result => result)
    response.then(result => {
      if (result && result.success) {
        const newConf = { ...crmConf }
        if (result.data.layouts) {
          if (!newConf.default.layouts) {
            newConf.default.layouts = {}
          }
          newConf.default.layouts[newConf.module] = { ...result.data.layouts }
          const layouts = [...Object.keys(result.data.layouts)]
          if (layouts.length === 1) {
            newConf.layout = layouts[0]
          }
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setCrmConf({ ...crmConf, ...newConf })
        setSnackbar({ show: true, msg: 'Layouts refreshed' })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Layouts refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Layouts refresh failed. please try again' })
      }
    })
    setisLoading(false)
  }

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="flx">
        <b className="wdt-100 d-in-b">Integration Name:</b>
        <input className="btcd-paper-inp w-7" onChange={handleInput} name="name" value={crmConf.name} type="text" placeholder="Integration Name..." />
      </div>

      <br />
      <b className="wdt-100 d-in-b">Module:</b>
      <select onChange={handleInput} name="module" value={crmConf.module} className="btcd-paper-inp w-7">
        <option>Select Module</option>
        {
          crmConf.default && crmConf.default.modules && Object.keys(crmConf.default.modules).map(moduleApiName => (
            <option value={moduleApiName}>
              {crmConf.default.modules[moduleApiName].plural_label}
            </option>
          ))
        }
      </select>
      <button onClick={refreshModules} className="icn-btn sh-sm ml-2 mr-2" type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <br />
      <b className="wdt-100 d-in-b">Layout:</b>
      <select onChange={handleInput} name="layout" value={crmConf.layout} className="btcd-paper-inp w-7">
        <option>Select Layout</option>
        {
          crmConf.default && crmConf.default.layouts && crmConf.default.layouts[crmConf.module] && Object.keys(crmConf.default.layouts[crmConf.module]).map(layoutApiName => (
            <option value={layoutApiName}>
              {layoutApiName}
            </option>
          ))
        }
      </select>
      <button onClick={refreshLayouts} className="icn-btn sh-sm ml-2 mr-2" type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <br />
      {
        crmConf.module && crmConf.module && crmConf.default && crmConf.default.layouts && crmConf.default.layouts[crmConf.module] && crmConf.default.layouts[crmConf.module][crmConf.layout] && crmConf.default.layouts[crmConf.module][crmConf.layout].fields
        && (
          <>
            <div className="mt-4"><b className="wdt-100">Field Map</b></div>
            <div className="btcd-hr mt-1" />
            <div className="mt-3 txt-center d-in-b w-4 txt-dp"><b className="wdt-100">Form Fields</b></div>
            <div className="mt-3 txt-center d-in-b w-4 txt-dp"><b className="wdt-100">Zoho Fields</b></div>

            {crmConf.field_map.map((itm, i) => (
              <div key={`f-m-${i + 9}`}>
                <select className="btcd-paper-inp w-4 mr-2" name="formField" value={itm.formField} onChange={(ev) => handleFieldMapping(ev, i)}>
                  <option value="">Select Field</option>
                  {formFields.map(f => itm.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)}
                </select>
                <select className="btcd-paper-inp w-4" name="zohoFormField" value={itm.zohoFormField} onChange={(ev) => handleFieldMapping(ev, i)}>
                  <option value="">Select Field</option>
                  {
                    Object.keys(crmConf.default.layouts[crmConf.module][crmConf.layout].fields).map(fieldApiName => (
                      <option value={fieldApiName}>
                        {crmConf.default.layouts[crmConf.module][crmConf.layout].fields[fieldApiName].display_label}
                      </option>
                    ))
                  }
                </select>
                <button onClick={() => addMap(i)} className="icn-btn sh-sm ml-2 mr-2" type="button">+</button>
                {
                  crmConf.default.layouts[crmConf.module][crmConf.layout].required && crmConf.default.layouts[crmConf.module][crmConf.layout].required.indexOf(itm.zohoFormField) === -1
                  && (
                    <button onClick={() => delMap(i)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
                      <span className="btcd-icn icn-trash-2" />
                    </button>
                  )
                }
              </div>
            ))}
            <div className="txt-center w-8 mt-2"><button onClick={() => addMap()} className="icn-btn sh-sm" type="button">+</button></div>

            <br />
            <br />
            <div className="mt-4"><b className="wdt-100">Actions</b></div>
            <div className="btcd-hr mt-1" />

            <div className="d-flx flx-wrp">
              <TableCheckBox onChange={handleAtns} checked={crmConf.actions.some(i => i === 'Workflow')} className="wdt-200 mt-4" value="Workflow" title="Workflow" subTitle="Trigger CRM workflows" />
              <TableCheckBox onChange={handleAtns} checked={crmConf.actions.some(i => i === 'Attachment')} className="wdt-200 mt-4" value="Attachment" title="Attachment" subTitle="Add attachments or signatures from BitFroms to CRM." />
              <TableCheckBox onChange={handleAtns} checked={crmConf.actions.some(i => i === 'Approval')} className="wdt-200 mt-4" value="Approval" title="Approval" subTitle="Send entries to CRM approval list." />
              <TableCheckBox onChange={handleAtns} checked={crmConf.actions.some(i => i === 'Capture_GCLID')} className="wdt-200 mt-4" value="Capture_GCLID" title="Capture GCLID" subTitle="Sends the click details of AdWords Ads to Zoho CRM." />
              <TableCheckBox onChange={handleAtns} checked={crmConf.actions.some(i => i === 'Upsert_Record')} className="wdt-200 mt-4" value="Upsert_Record" title="Upsert Record" subTitle="The record is updated if it already exists else it is inserted as a new record." />
              <TableCheckBox onChange={handleAtns} checked={crmConf.actions.some(i => i === 'Assignment_Rules')} className="wdt-200 mt-4" value="Assignment_Rules" title="Assignment Rules" subTitle="Trigger Assignment Rules in Zoho CRM." />
              <TableCheckBox onChange={handleAtns} checked={crmConf.actions.some(i => i === 'Tag_Records')} className="wdt-200 mt-4" value="Tag_Records" title="Tag Records" subTitle="Add a tag to records pushed to Zoho CRM." />
            </div>
          </>
        )
      }

      <div className="txt-center">
        <button onClick={saveConfig} className="btn btcd-btn-lg green sh-sm flx" type="button">
          Save
        </button>
      </div>
      <br />
    </div>
  )
}

export default ZohoCRM
