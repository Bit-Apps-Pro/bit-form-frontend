import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Steps from '../ElmSettings/Childs/Steps'
import CopyText from '../ElmSettings/Childs/CopyText'
import SnackMsg from '../ElmSettings/Childs/SnackMsg'
import bitsFetch from '../../Utils/bitsFetch'
import Loader from '../Loaders/Loader'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import ZohoCrmFieldMap from './edit/ZohoCrmFieldMap'
import ZohoCrmActions from './edit/ZohoCrmActions'
import { FromSaveContext } from '../../pages/FormDetails'

function ZohoCRM({ formFields, setIntegration, integrations, allIntegURL }) {
  const saveForm = useContext(FromSaveContext)
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const [tab, settab] = useState(0)
  const [crmConf, setCrmConf] = useState({
    name: 'Zoho CRM API',
    type: 'Zoho CRM',
    clientId: '1000.67VVR9O5MP40PTURJ62OHBRCWKHAKH',
    clientSecret: '128b8daec4a960137d3b5ed92c8a2d1d27eaa52c09',
    module: '',
    layout: '',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
    relatedlist: {},
    actions: {},
  })

  useEffect(() => {
    if (window.opener) {
      const grantTokenResponse = {}
      const authWindowLocation = window.location.href
      const queryParams = authWindowLocation.replace(`${window.opener.location.href}/redirect`, '').split('&')
      if (queryParams) {
        queryParams.forEach(element => {
          const gtKeyValue = element.split('=')
          if (gtKeyValue[1]) {
            // eslint-disable-next-line prefer-destructuring
            grantTokenResponse[gtKeyValue[0]] = gtKeyValue[1]
          }
        })
      }
      localStorage.setItem('__bitforms_zohoCrm', JSON.stringify(grantTokenResponse))
      window.close()
    }
  }, [])

  useEffect(() => {
    const newConf = { ...crmConf }
    const module = tab === 0 ? crmConf.module : crmConf.relatedlist.module
    if (tab === 0) {
      newConf.layout = ''
      newConf.field_map = [{ formField: '', zohoFormField: '' }]
    } else {
      newConf.relatedlist.layout = ''
      newConf.relatedlist.field_map = [{ formField: '', zohoFormField: '' }]
    }
    setCrmConf({ ...crmConf, ...newConf })
    if (crmConf.default && (!crmConf.default.layouts || (crmConf.default.layouts && !crmConf.default.layouts[module]))) {
      refreshLayouts(tab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crmConf.module, crmConf.relatedlist.module])

  useEffect(() => {
    const newConf = { ...crmConf }
    const module = tab === 0 ? crmConf.module : crmConf.relatedlist.module
    const layout = tab === 0 ? crmConf.layout : crmConf.relatedlist.layout
    if (tab === 0) {
      newConf.field_map = [{ formField: '', zohoFormField: '' }]
    } else {
      newConf.relatedlist.field_map = [{ formField: '', zohoFormField: '' }]
    }
    if (crmConf.default && crmConf.default.layouts && newConf.default.layouts[module] && newConf.default.layouts[module][layout] && newConf.default.layouts[module][layout].required) {
      newConf.field_map = newConf.default.layouts[module][layout].required.map(field => ({ formField: '', zohoFormField: field }))
    }
    setCrmConf({ ...crmConf, ...newConf })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crmConf.layout, crmConf?.relatedlist?.layout])

  const handleInput = (e, recordTab) => {
    console.log('recordTab', recordTab)
    if (recordTab === 0) {
      const rmError = { ...error }
      rmError[e.target.name] = ''
      setError({ ...rmError })
      crmConf[e.target.name] = e.target.value
    } else {
      if (!crmConf.relatedlist) {
        crmConf.relatedlist = {}
      }
      crmConf.relatedlist[e.target.name] = e.target.value
    }
    setCrmConf({ ...crmConf })
  }
  console.log('crmConf', crmConf)

  const nextPage = val => {
    window.scrollTo(0, 0)

    if (val === 3) {
      const mappedFields = crmConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (crmConf.default.layouts[crmConf.module][crmConf.layout].required && crmConf.default.layouts[crmConf.module][crmConf.layout].required.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField))
      if (mappedFields.length > 0) {
        setSnackbar({ show: true, msg: 'Please map mandatory fields' })
        return
      }
      if (crmConf.module !== '' && crmConf.layout !== '' && crmConf.field_map.length > 0) {
        setstep(val)
      }
    } else {
      setstep(val)
      if (val === 2 && !crmConf.module) {
        refreshModules()
      }
    }
  }

  const addMap = i => {
    if (tab === 0) {
      if (i !== undefined) {
        crmConf.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
      } else {
        crmConf.field_map.push({ formField: '', zohoFormField: '' })
      }
    } else if (i !== undefined) {
      crmConf.relatedlist.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
    } else {
      if (!crmConf.relatedlist.field_map) {
        crmConf.relatedlist.field_map = []
      }
      crmConf.relatedlist.field_map.push({ formField: '', zohoFormField: '' })
    }
    setCrmConf({ ...crmConf })
  }

  const saveConfig = () => {
    const mappedFields = crmConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (crmConf.default.layouts[crmConf.module][crmConf.layout].required && crmConf.default.layouts[crmConf.module][crmConf.layout].required.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField))
    if (mappedFields.length > 0) {
      setSnackbar({ show: true, msg: 'Please map mandatory fields' })
      return
    }
    integrations.push(crmConf)
    setIntegration([...integrations])
    saveForm()
    history.push(allIntegURL)
  }

  const refreshModules = () => {
    setisLoading(true)

    const refreshModulesRequestParams = {
      formID,
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

  const handleAuthorize = () => {
    if (!crmConf.dataCenter || !crmConf.clientId || !crmConf.clientSecret) {
      setError({
        dataCenter: !crmConf.dataCenter ? 'Data center cann\'t be empty' : '',
        clientId: !crmConf.clientId ? 'Client ID cann\'t be empty' : '',
        clientSecret: !crmConf.clientSecret ? 'Secret key cann\'t be empty' : '',
      })
      return
    }
    const apiEndpoint = `https://accounts.zoho.${crmConf.dataCenter}/oauth/v2/auth?scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.Read,zohocrm.files.CREATE&response_type=code&client_id=${crmConf.clientId}&access_type=offline&redirect_uri=${encodeURIComponent(window.location.href)}/redirect`
    const authWindow = window.open(apiEndpoint, 'zohoCRM', 'width=400,height=609,toolbar=off')
    const popupURLCheckTimer = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(popupURLCheckTimer)
        let grantTokenResponse = {}
        let isauthRedirectLocation = false
        const bitformsZohoCrm = localStorage.getItem('__bitforms_zohoCrm')
        if (bitformsZohoCrm) {
          isauthRedirectLocation = true
          grantTokenResponse = JSON.parse(bitformsZohoCrm)
          localStorage.removeItem('__bitforms_zohoCrm')
        }
        if (!grantTokenResponse.code || grantTokenResponse.error || !grantTokenResponse || !isauthRedirectLocation) {
          const errorCause = grantTokenResponse.error ? `Cause: ${grantTokenResponse.error}` : ''
          setSnackbar({ show: true, msg: `Authorization failed ${errorCause}. please try again` })
        } else {
          setCrmConf({ ...crmConf, accountServer: grantTokenResponse['accounts-server'] })
          tokenHelper(grantTokenResponse)
        }
      }
    }, 500)
  }

  const tokenHelper = (grantToken) => {
    const tokenRequestParams = { ...grantToken }
    tokenRequestParams.dataCenter = crmConf.dataCenter
    tokenRequestParams.clientId = crmConf.clientId
    tokenRequestParams.clientSecret = crmConf.clientSecret
    tokenRequestParams.redirectURI = `${encodeURIComponent(window.location.href)}/redirect`
    const response = bitsFetch(tokenRequestParams, 'bitforms_zcrm_generate_token')
      .then(result => result)
    response.then(result => {
      if (result && result.success) {
        setCrmConf({ ...crmConf, tokenDetails: result.data })
        setisAuthorized(true)
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Authorization failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Authorization failed. please try again' })
      }
    })
  }

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3"><b>Integration Name:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event, tab)} name="name" value={crmConf.name} type="text" placeholder="Integration Name..." />

        <div className="mt-3"><b>Data Center:</b></div>
        <select onChange={event => handleInput(event, tab)} name="dataCenter" value={crmConf.dataCenter} className="btcd-paper-inp w-9 mt-1">
          <option value="">--Select a data center--</option>
          <option value="com">zoho.com</option>
          <option value="eu">zoho.eu</option>
          <option value="com.au">zoho.com.au</option>
          <option value="in">zoho.in</option>
        </select>
        <div style={{ color: 'red' }}>{error.dataCenter}</div>

        <div className="mt-3"><b>Homepage URL:</b></div>
        <CopyText value={`${window.location.origin}`} setSnackbar={setSnackbar} className="field-key-cpy w-5 ml-0" />

        <div className="mt-3"><b>Authorized Redirect URIs:</b></div>
        <CopyText value={`${window.location.href}/redirect`} setSnackbar={setSnackbar} className="field-key-cpy w-5 ml-0" />

        <div className="mt-3"><b>Client id:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event, tab)} name="clientId" value={crmConf.clientId} type="text" placeholder="Client id..." />
        <div style={{ color: 'red' }}>{error.clientId}</div>

        <div className="mt-3"><b>Client secret:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event, tab)} name="clientSecret" value={crmConf.clientSecret} type="text" placeholder="Client secret..." />
        <div style={{ color: 'red' }}>{error.clientSecret}</div>

        <button onClick={handleAuthorize} className="btn btcd-btn-lg green sh-sm flx" type="button" disabled={isAuthorized}>
          {isAuthorized ? 'Authorized ✔' : 'Authorize'}
        </button>
        <br />
        <button onClick={() => nextPage(2)} className="btn f-right btcd-btn-lg green sh-sm flx" type="button" disabled={!isAuthorized}>
          Next &nbsp;
          <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
        </button>
      </div>

      {/* STEP 2 */}
      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>
        <br />
        <b className="wdt-100 d-in-b">Module:</b>
        <select onChange={event => handleInput(event, tab)} name="module" value={crmConf.module} className="btcd-paper-inp w-7" disabled={tab === 1}>
          <option value="">Select Module</option>
          {
            crmConf.default && crmConf.default.modules && Object.keys(crmConf.default.modules).map(moduleApiName => (
              <option value={moduleApiName}>
                {crmConf.default.modules[moduleApiName].plural_label}
              </option>
            ))
          }
        </select>
        {tab === 0 && <button onClick={refreshModules} className="icn-btn sh-sm ml-2 mr-2" type="button" disabled={isLoading}>&#x21BB;</button>}
        <br />
        <div className="flx mt-2">
          <button onClick={() => settab(0)} className={`btcd-s-tab-link ${tab === 0 && 's-t-l-active'}`} type="button">New Record</button>
          <button onClick={() => settab(1)} className={`btcd-s-tab-link ${tab === 1 && 's-t-l-active'}`} type="button">Related List</button>
        </div>
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
                    <option value={relatedlistApiName}>
                      {relatedlistApiName}
                    </option>
                  ))
                }
              </select>
              <button onClick={refreshRelatedList} className="icn-btn sh-sm ml-2 mr-2" type="button" disabled={isLoading}>&#x21BB;</button>
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
        <button onClick={() => refreshLayouts(tab)} className="icn-btn sh-sm ml-2 mr-2" type="button" disabled={isLoading}>&#x21BB;</button>
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
              <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addMap()} className="icn-btn sh-sm" type="button">+</button></div>
              <br />
              <br />
              <div className="mt-4"><b className="wdt-100">Actions</b></div>
              <div className="btcd-hr mt-1" />

              <ZohoCrmActions
                formFields={formFields}
                crmConf={crmConf}
                setCrmConf={setCrmConf}
                tab={tab}
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
              <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addMap()} className="icn-btn sh-sm" type="button">+</button></div>
              <br />
              <br />
              <div className="mt-4"><b className="wdt-100">Actions</b></div>
              <div className="btcd-hr mt-1" />

              <ZohoCrmActions
                formFields={formFields}
                crmConf={crmConf}
                setCrmConf={setCrmConf}
                tab={tab}
              />
            </>
          )}
        <button
          onClick={() => nextPage(3)}
          disabled={crmConf.module === '' || crmConf.layout === '' || crmConf.field_map.length < 1}
          className="btn f-right btcd-btn-lg green sh-sm flx"
          type="button"
        >
          Next &nbsp;
          <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
        </button>

      </div>

      {/* STEP 3 */}
      <div className="btcd-stp-page txt-center" style={{ width: step === 3 && '90%', height: step === 3 && '100%' }}>
        <h2 className="ml-3">Successfully Integrated</h2>
        <button onClick={saveConfig} className="btn btcd-btn-lg green sh-sm flx" type="button">
          Finish & Save
          ✔
        </button>
      </div>
    </div>
  )
}

export default ZohoCRM
