/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import bitsFetch from '../../../Utils/bitsFetch'
import Loader from '../../Loaders/Loader'
import ZohoCrmFieldMap from './ZohoCrmFieldMap'
import { FromSaveContext } from '../../../pages/FormDetails'
import ZohoCrmActions from './ZohoCrmActions'

function EditZohoCRM({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()
  const saveForm = useContext(FromSaveContext)

  const [crmConf, setCrmConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [isLayoutClearable, setisLayoutClearable] = useState(false)
  const [isFieldMappingClearable, setisFieldMappingClearable] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })
  const [tab, settab] = useState(0)

  useEffect(() => {
    const newConf = { ...crmConf }
    if (crmConf.default && crmConf.default.layouts && !crmConf.default.layouts[crmConf.module]) {
      refreshLayouts()
    } else if (integrations[id].module) {
      if (isLayoutClearable) {
        const layouts = [...Object.keys(crmConf.default.layouts[crmConf.module])]
        if (layouts.length === 1) {
          [newConf.layout] = layouts
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crmConf.module])

  useEffect(() => {
    if (integrations[id].layout
      && isFieldMappingClearable
    ) {
      const newConf = { ...crmConf }
      newConf.field_map = [{ formField: '', zohoFormField: '' }]
      if (crmConf.default && crmConf.default.layouts && newConf.default.layouts[crmConf.module][crmConf.layout] && newConf.default.layouts[crmConf.module][crmConf.layout].required) {
        newConf.field_map = newConf.default.layouts[crmConf.module][crmConf.layout].required.map(field => ({ formField: '', zohoFormField: field }))
      }
      setCrmConf({ ...crmConf, ...newConf })
    } else {
      setisFieldMappingClearable(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crmConf.layout])

  const handleInput = e => {
    crmConf[e.target.name] = e.target.value
    setCrmConf({ ...crmConf })
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
    bitsFetch(refreshModulesRequestParams, 'bitforms_zcrm_refresh_modules')
      .then(result => {
        if (result && result.success) {
          const newConf = { ...crmConf }
          if (result.data.modules) {
            newConf.default = { ...newConf.default, modules: result.data.modules }
          }
          if (result.data.tokenDetails) {
            newConf.tokenDetails = result.data.tokenDetails
          }
          setCrmConf({ ...crmConf, ...newConf })
        } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
          setSnackbar({ show: true, msg: `Modules refresh failed Cause:${result.data.data || result.data}. please try again` })
        } else {
          setSnackbar({ show: true, msg: 'Modules refresh failed. please try again' })
        }
        setisLoading(false)
      })
      .catch(() => setisLoading(false))
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
    bitsFetch(refreshLayoutsRequestParams, 'bitforms_zcrm_refresh_layouts')
      .then(result => {
        if (result && result.success) {
          const newConf = { ...crmConf }
          if (result.data.layouts) {
            if (!newConf.default.layouts) {
              newConf.default.layouts = {}
            }
            newConf.default.layouts[newConf.module] = { ...result.data.layouts }
            const layouts = [...Object.keys(result.data.layouts)]
            if (layouts.length === 1) {
              [newConf.layout] = layouts
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
        setisLoading(false)
      })
      .catch(() => setisLoading(false))
  }

  const addFieldMap = () => {
    crmConf.field_map.push({ formField: '', zohoFormField: '' })
    setCrmConf({ ...crmConf })
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-100 d-in-b">Integration Name:</b>
        <input className="btcd-paper-inp w-7" onChange={handleInput} name="name" value={crmConf.name} type="text" placeholder="Integration Name..." />
      </div>

      <br />
      <b className="wdt-100 d-in-b">Module:</b>
      <select onChange={handleInput} name="module" value={crmConf.module} className="btcd-paper-inp w-7">
        <option>Select Module</option>
        {
          crmConf?.default?.modules && Object.keys(crmConf.default.modules).map(moduleApiName => (
            <option key={moduleApiName} value={moduleApiName}>
              {crmConf.default.modules[moduleApiName].plural_label}
            </option>
          ))
        }
      </select>
      <button onClick={refreshModules} className="icn-btn sh-sm ml-2 mr-2" type="button" disabled={isLoading}>&#x21BB;</button>
      <br />
      <div className="flx mt-2">
        <button onClick={() => settab(0)} className={`btcd-s-tab-link ${tab === 0 && 's-t-l-active'}`} type="button">New Record</button>
        <button onClick={() => settab(1)} className={`btcd-s-tab-link ${tab === 1 && 's-t-l-active'}`} type="button">Related List</button>
      </div>
      <div className="btcd-hr" />
      <br />
      <br />
      <b className="wdt-100 d-in-b">Layout:</b>
      <select onChange={handleInput} name="layout" value={crmConf.layout} className="btcd-paper-inp w-7">
        <option>Select Layout</option>
        {
          crmConf.default && crmConf.default.layouts && crmConf.default.layouts[crmConf.module] && Object.keys(crmConf.default.layouts[crmConf.module]).map(layoutApiName => (
            <option key={layoutApiName} value={layoutApiName}>
              {layoutApiName}
            </option>
          ))
        }
      </select>
      <button onClick={refreshLayouts} className="icn-btn sh-sm ml-2 mr-2" type="button" disabled={isLoading}>&#x21BB;</button>
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
      {
        crmConf.module && crmConf?.default?.layouts?.[crmConf.module]?.[crmConf.layout]?.fields
        && (
          <>
            <div className="mt-4"><b className="wdt-100">Field Map</b></div>
            <div className="btcd-hr mt-1" />
            <div className="mt-3 txt-center d-in-b w-4 txt-dp"><b className="wdt-100">Form Fields</b></div>
            <div className="mt-3 txt-center d-in-b w-4 txt-dp"><b className="wdt-100">Zoho Fields</b></div>

            {crmConf.field_map.map((itm, i) => (
              <ZohoCrmFieldMap
                key={`crm-m-${i + 9}`}
                i={i}
                field={itm}
                crmConf={crmConf}
                formFields={formFields}
                setCrmConf={setCrmConf}
              />
            ))}

            <div className="txt-center mt-2 w-9"><button onClick={() => addFieldMap()} className="icn-btn sh-sm" type="button">+</button></div>

            <br />
            <br />
            <div className="mt-4"><b className="wdt-100">Actions</b></div>
            <div className="btcd-hr mt-1" />

            <ZohoCrmActions
              formFields={formFields}
              crmConf={crmConf}
              setCrmConf={setCrmConf}
            />
          </>
        )
      }

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
