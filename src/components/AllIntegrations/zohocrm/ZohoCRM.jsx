import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Steps from '../../ElmSettings/Childs/Steps'
import CopyText from '../../ElmSettings/Childs/CopyText'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import bitsFetch from '../../../Utils/bitsFetch'
import Loader from '../../Loaders/Loader'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import ZohoCRMFieldMap from './ZohoCRMFieldMap'
import { handleTabChange, moduleChange, layoutChange, refreshModules, refreshLayouts, refreshRelatedList } from './ZohoCRMCommonFunc'
import ZohoCRMActions from './ZohoCRMActions'
import { FromSaveContext } from '../../../pages/FormDetails'

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
    clientId: '1000.6D7WFLXQVP74SO1XSED5UH137PRX2Z',
    clientSecret: 'a934cc52edea787a82a7dba5982b151c0576a53c91',
    module: '',
    layout: '',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
    relatedlist: {},
    actions: {}
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

  const handleInput = (e, recordTab) => {
    let newConf = { ...crmConf }
    if (recordTab === 0) {
      const rmError = { ...error }
      rmError[e.target.name] = ''
      setError({ ...rmError })
      newConf[e.target.name] = e.target.value
    } else {
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
  console.log('crmConf', crmConf)

  const nextPage = val => {
    document.querySelector(".btcd-s-wrp").scrollTop = 0

    if (val === 3) {
      const mappedFields = crmConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (crmConf.default.layouts[crmConf.module][crmConf.layout].required && crmConf.default.layouts[crmConf.module][crmConf.layout].required.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField))
      const mappedUploadFields = crmConf.upload_field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (crmConf.default.layouts[crmConf.module][crmConf.layout].requiredFileUploadFields && crmConf.default.layouts[crmConf.module][crmConf.layout].requiredFileUploadFields.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField))
      if (mappedFields.length > 0 || mappedUploadFields.length > 0) {
        setSnackbar({ show: true, msg: 'Please map mandatory fields' })
        return
      }
      if (crmConf.module !== '' && crmConf.layout !== '' && crmConf.field_map.length > 0) {
        setstep(val)
      }
    } else {
      setstep(val)
      if (val === 2 && !crmConf.module) {
        refreshModules(formID, crmConf, setCrmConf, setisLoading, setSnackbar)
      }
    }
  }

  const addMap = (i, uploadFields) => {
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

  const saveConfig = () => {
    const mappedFields = crmConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && crmConf.default.layouts[crmConf.module][crmConf.layout].required.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField)
    const mappedUploadFields = crmConf.upload_field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && crmConf.default.layouts[crmConf.module][crmConf.layout].requiredFileUplaodFields.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField)
    if (mappedFields.length > 0 || mappedUploadFields.length > 0) {
      setSnackbar({ show: true, msg: 'Please map mandatory fields' })
      return
    }
    integrations.push(crmConf)
    setIntegration([...integrations])
    saveForm()
    history.push(allIntegURL)
  }

  const handleAuthorize = () => {
    const newConf = { ...crmConf }
    if (!newConf.dataCenter || !newConf.clientId || !newConf.clientSecret) {
      setError({
        dataCenter: !newConf.dataCenter ? 'Data center cann\'t be empty' : '',
        clientId: !newConf.clientId ? 'Client ID cann\'t be empty' : '',
        clientSecret: !newConf.clientSecret ? 'Secret key cann\'t be empty' : '',
      })
      return
    }
    const apiEndpoint = `https://accounts.zoho.${newConf.dataCenter}/oauth/v2/auth?scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.Read,zohocrm.files.CREATE&response_type=code&client_id=${newConf.clientId}&access_type=offline&redirect_uri=${encodeURIComponent(window.location.href)}/redirect`
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
          setCrmConf({ ...newConf, accountServer: grantTokenResponse['accounts-server'] })
          tokenHelper(grantTokenResponse)
        }
      }
    }, 500)
  }

  const tokenHelper = (grantToken) => {
    const newConf = { ...crmConf }
    const tokenRequestParams = { ...grantToken }
    tokenRequestParams.dataCenter = newConf.dataCenter
    tokenRequestParams.clientId = newConf.clientId
    tokenRequestParams.clientSecret = newConf.clientSecret
    tokenRequestParams.redirectURI = `${encodeURIComponent(window.location.href)}/redirect`
    const response = bitsFetch(tokenRequestParams, 'bitforms_zcrm_generate_token')
      .then(result => result)
    response.then(result => {
      if (result && result.success) {
        setCrmConf({ ...newConf, tokenDetails: result.data })
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


        <small className="d-blk mt-2">
          <a className="btcd-link" href="https://api-console.zoho.com/" target="_blank">Zoho Api console</a>
        </small>

        <div className="mt-3"><b>Data Center:</b></div>
        <select onChange={event => handleInput(event, tab)} name="dataCenter" value={crmConf.dataCenter} className="btcd-paper-inp w-9 mt-1">
          <option value="">--Select a data center--</option>
          <option value="com">zoho.com</option>
          <option value="eu">zoho.eu</option>
          <option value="com.cn">zoho.com.cn</option>
          <option value="in">zoho.in</option>
          <option value="com.au">zoho.com.au</option>
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
            crmConf?.default?.modules && Object.keys(crmConf.default.modules).map(moduleApiName => (
              <option value={moduleApiName}>
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
        <br />
        {
          tab === 1
          && (
            <>
              <b className="wdt-100 d-in-b">Related List:</b>
              <select onChange={event => handleInput(event, tab)} name="module" value={crmConf?.relatedlist?.module} className="btcd-paper-inp w-7" disabled={!crmConf.module}>
                <option value="">Select Related Module</option>
                {
                  crmConf?.default?.relatedlists?.[crmConf.module] && Object.values(crmConf.default.relatedlists[crmConf.module]).map(relatedlistApiName => (
                    <option value={relatedlistApiName.module} >
                      {relatedlistApiName.name}
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
        <button onClick={() => refreshLayouts(tab, tab === 0 ? crmConf.module : crmConf.relatedlist.module, formID, crmConf, setCrmConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh CRM Layouts"' }} type="button" disabled={isLoading}>&#x21BB;</button>
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
          && crmConf.default?.layouts?.[crmConf.module]?.[crmConf.layout]?.fields
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
              <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addMap(crmConf.field_map.length, 0)} className="icn-btn sh-sm" type="button">+</button></div>
              <br />
              <br />
              {Object.keys(crmConf.default.layouts[crmConf.module][crmConf.layout]?.fileUploadFields).length !== 0 && (
                <>
                  <div className="mt-4"><b className="wdt-100">Map File Upload Fields</b></div>
                  <div className="btcd-hr mt-1" />
                  <div className="flx flx-around mt-2 mb-1">
                    <div className="txt-dp"><b>Form Fields</b></div>
                    <div className="txt-dp"><b>Zoho Fields</b></div>
                  </div>

                  {crmConf.upload_field_map.map((itm, i) => (
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
                  <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addMap(crmConf.upload_field_map.length, 1)} className="icn-btn sh-sm" type="button">+</button></div>
                  <br />
                  <br />
                </>
              )}
              <div className="mt-4"><b className="wdt-100">Actions</b></div>
              <div className="btcd-hr mt-1" />

              <ZohoCRMActions
                formID={formID}
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
          && crmConf.default?.layouts?.[crmConf?.relatedlist?.module]?.[crmConf?.relatedlist?.layout]?.fields
          && (
            <>
              <div className="mt-4"><b className="wdt-100">Field Map</b></div>
              <div className="btcd-hr mt-1" />
              <div className="flx flx-around mt-2 mb-1">
                <div className="txt-dp"><b>Form Fields</b></div>
                <div className="txt-dp"><b>Zoho Fields</b></div>
              </div>

              {crmConf.relatedlist.field_map?.map((itm, i) => (
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
              <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addMap(crmConf.relatedlist.field_map.length, 0)} className="icn-btn sh-sm" type="button">+</button></div>
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
                  <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addMap(crmConf.relatedlist.upload_field_map.length, 1)} className="icn-btn sh-sm" type="button">+</button></div>
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
    </div >
  )
}

export default ZohoCRM
