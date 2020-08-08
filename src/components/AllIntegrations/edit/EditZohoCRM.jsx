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
  console.log('crmConf', crmConf)
  useEffect(() => {
    const newConf = { ...crmConf }
    if (tab === 1 && !newConf.relatedlist.actions) {
      newConf.relatedlist.actions = {}
    }
    const module = tab === 0 ? crmConf.module : crmConf.relatedlist.module
    const layout = tab === 0 ? crmConf.layout : crmConf.relatedlist.layout
    // let isLayoutRefreshed = false
    if (crmConf.default && crmConf.default.layouts && !crmConf.default.layouts[module]) {
      refreshLayouts(tab)
    } else if (integrations[id].module) {
      if (isLayoutClearable) {
        const layouts = [...Object.keys(crmConf.default.layouts[module])]
        if (layouts.length === 1) {
          if (tab === 0) {
            [newConf.layout] = layouts
            if (newConf.layout === crmConf.layout) {
              newConf.field_map = newConf.default.layouts[module][layout].required ? newConf.default.layouts[module][layout].required.map(field => ({ formField: '', zohoFormField: field })) : [{ formField: '', zohoFormField: '' }]
            }
          } else {
            [newConf.relatedlist.layout] = layouts
            if (newConf.relatedlist.layout === crmConf.relatedlist.layout) {
              newConf.relatedlist.field_map = newConf.default.layouts[module][layout].required ? newConf.default.layouts[module][layout].required.map(field => field !== 'Parent_Id' && ({ formField: '', zohoFormField: field })).filter(fieldMap => fieldMap) : [{ formField: '', zohoFormField: '' }]
            }
          }
        } else if (tab === 0) {
          newConf.layout = ''
          newConf.field_map = [{ formField: '', zohoFormField: '' }]
          if (newConf?.relatedlist?.layout) {
            newConf.relatedlist.layout = ''
            newConf.relatedlist.field_map = [{ formField: '', zohoFormField: '' }]
          }
          if (newConf?.relatedlist?.module) {
            newConf.relatedlist.module = ''
          }
          if (newConf?.relatedlist?.field_map) {
            newConf.relatedlist.field_map = [{ formField: '', zohoFormField: '' }]
          }
        } else {
          newConf.relatedlist.layout = ''
          newConf.relatedlist.field_map = [{ formField: '', zohoFormField: '' }]
        }
        setCrmConf({ ...crmConf, ...newConf })
      } else {
        setisLayoutClearable(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crmConf.module, crmConf?.relatedlist?.module])

  useEffect(() => {
    const module = tab === 0 ? crmConf.module : crmConf.relatedlist.module
    const layout = tab === 0 ? crmConf.layout : crmConf.relatedlist.layout
    if (integrations[id].layout
      && isFieldMappingClearable
    ) {
      const newConf = { ...crmConf }
      if (tab === 0) {
        newConf.field_map = [{ formField: '', zohoFormField: '' }]
        if (crmConf.default && crmConf.default.layouts && newConf.default.layouts[module][layout] && newConf.default.layouts[module][layout].required) {
          newConf.field_map = newConf.default.layouts[module][layout].required.map(field => ({ formField: '', zohoFormField: field }))
        }
      } else {
        newConf.relatedlist.field_map = [{ formField: '', zohoFormField: '' }]
        if (crmConf.default && crmConf.default.layouts && newConf.default.layouts[module][layout] && newConf.default.layouts[module][layout].required) {
          newConf.relatedlist.field_map = newConf.default.layouts[module][layout].required.map(field => field !== 'Parent_Id' && ({ formField: '', zohoFormField: field })).filter(fieldMap => fieldMap)
        }
      }
      setCrmConf({ ...crmConf, ...newConf })
    } else {
      setisFieldMappingClearable(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crmConf.layout, crmConf?.relatedlist?.layout])

  const handleInput = (e, recordTab) => {
    if (recordTab === 0) {
      crmConf[e.target.name] = e.target.value
    } else {
      if (!crmConf.relatedlist) {
        crmConf.relatedlist = {}
      }
      crmConf.relatedlist[e.target.name] = e.target.value
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

  const refreshLayouts = (recordTab) => {
    const module = recordTab === 0 ? crmConf.module : crmConf?.relatedlist?.module
    if (!module) {
      return
    }
    setisLoading(true)
    const refreshLayoutsRequestParams = {
      formID,
      module,
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
            newConf.default.layouts[module] = { ...result.data.layouts }
            const layouts = [...Object.keys(result.data.layouts)]
            if (layouts.length === 1) {
              if (recordTab === 0) {
                [newConf.layout] = layouts
              } else {
                [newConf.relatedlist.layout] = layouts
                newConf.relatedlist.field_map = newConf.default.layouts[module][layouts[0]].required ? newConf.default.layouts[module][layouts[0]].required.map(field => field !== 'Parent_Id' && ({ formField: '', zohoFormField: field })).filter(fieldMap => fieldMap) : [{ formField: '', zohoFormField: '' }]
              }
            }
          }
          if (result.data.tokenDetails) {
            newConf.tokenDetails = result.data.tokenDetails
          }
          setCrmConf({ ...crmConf, ...newConf })
          setSnackbar({ show: true, msg: 'Layouts refreshed' })
        } else if ((result?.data?.data) || (!result.success && typeof result.data === 'string')) {
          setSnackbar({ show: true, msg: `Layouts refresh failed Cause:${result.data.data || result.data}. please try again` })
        } else {
          setSnackbar({ show: true, msg: 'Layouts refresh failed. please try again' })
        }
        setisLoading(false)
      })
      .catch(() => setisLoading(false))
  }

  const refreshRelatedList = () => {
    if (!crmConf.module) {
      return
    }
    setisLoading(true)
    const relatedListRequestParams = {
      formID,
      module: crmConf.module,
      dataCenter: crmConf.dataCenter,
      clientId: crmConf.clientId,
      clientSecret: crmConf.clientSecret,
      tokenDetails: crmConf.tokenDetails,
    }
    bitsFetch(relatedListRequestParams, 'bitforms_zcrm_get_related_lists')
      .then(result => {
        if (result && result.success) {
          const newConf = { ...crmConf }
          if (result.data.relatedLists) {
            if (!newConf.default.relatedlists) {
              newConf.default.relatedlists = {}
            }
            newConf.default.relatedlists[newConf.module] = { ...result.data.relatedLists }
          }
          if (result.data.tokenDetails) {
            newConf.tokenDetails = result.data.tokenDetails
          }
          setCrmConf({ ...crmConf, ...newConf })
          setSnackbar({ show: true, msg: 'RelatedLists refreshed' })
        } else if ((result?.data?.data) || (!result.success && typeof result.data === 'string')) {
          setSnackbar({ show: true, msg: `RelatedLists refresh failed Cause:${result.data.data || result.data}. please try again` })
        } else {
          setSnackbar({ show: true, msg: 'RelatedLists refresh failed. please try again' })
        }
        setisLoading(false)
      })
      .catch(() => setisLoading(false))
  }

  const addFieldMap = () => {
    if (tab === 0) {
      crmConf.field_map.push({ formField: '', zohoFormField: '' })
    } else {
      if (!crmConf.relatedlist.field_map) {
        crmConf.relatedlist.field_map = []
      }
      crmConf.relatedlist.field_map.push({ formField: '', zohoFormField: '' })
    }
    setCrmConf({ ...crmConf })
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
      {tab === 0 && <button onClick={refreshModules} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh CRM Modules"' }} type="button" disabled={isLoading}>&#x21BB;</button>}
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
            <button onClick={refreshRelatedList} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh CRM Related Lists"' }} type="button" disabled={isLoading}>&#x21BB;</button>
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
      <button onClick={() => refreshLayouts(tab)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh CRM Layouts"' }} type="button" disabled={isLoading}>&#x21BB;</button>
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
