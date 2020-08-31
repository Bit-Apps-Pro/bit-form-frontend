import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Steps from '../../ElmSettings/Childs/Steps'
import CopyText from '../../ElmSettings/Childs/CopyText'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import ConfirmModal from '../../ConfirmModal'
import bitsFetch from '../../../Utils/bitsFetch'
import Loader from '../../Loaders/Loader'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import ZohoAnalyticsFieldMap from './ZohoAnalyticsFieldMap'
import { workspaceChange, tableChange, refreshWorkspaces, refreshTables, refreshTableHeaders } from './ZohoAnalyticsCommonFunc'
import ZohoAnalyticsActions from './ZohoAnalyticsActions'
import { FromSaveContext } from '../../../pages/FormDetails'

function ZohoAnalytics({ formFields, setIntegration, integrations, allIntegURL }) {
  const saveForm = useContext(FromSaveContext)
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '', ownerEmail: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const [actionMdl, setActionMdl] = useState({ show: false })
  const [analyticsConf, setAnalyticsConf] = useState({
    name: 'Zoho Analytics API',
    type: 'Zoho Analytics',
    clientId: '',
    clientSecret: '',
    workspace: '',
    table: '',
    ownerEmail: 'mdshakhawathosen122@gmail.com',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
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
      localStorage.setItem('__bitforms_zohoAnalytics', JSON.stringify(grantTokenResponse))
      window.close()
    }
  }, [])

  const handleInput = (e) => {
    let newConf = { ...analyticsConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    setError({ ...rmError })
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

  const nextPage = val => {
    if (val === 3) {
      if (analyticsConf.actions?.update && analyticsConf.actions?.update?.criteria === '' && actionMdl.show !== 'criteria') {
        setActionMdl({ show: 'criteria' })
        return
      }
      setActionMdl({ show: 'false' })

      document.querySelector('.btcd-s-wrp').scrollTop = 0
      if (analyticsConf.workspace !== '' && analyticsConf.table !== '' && analyticsConf.field_map.length > 0) {
        setstep(val)
      }
    } else {
      setstep(val)
      if (val === 2 && !analyticsConf.workspace) {
        refreshWorkspaces(formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar)
      }
    }
  }

  const addMap = (i) => {
    const newConf = { ...analyticsConf }
    if (i !== 0) {
      newConf.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
    } else {
      newConf.field_map.push({ formField: '', zohoFormField: '' })
    }

    setAnalyticsConf({ ...newConf })
  }

  const saveConfig = () => {
    integrations.push(analyticsConf)
    setIntegration([...integrations])
    saveForm()
    history.push(allIntegURL)
  }

  const checkValidEmail = email => {
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return (true)
    }
    return (false)
  }

  const handleAuthorize = () => {
    const newConf = { ...analyticsConf }
    if (!newConf.dataCenter || !newConf.clientId || !newConf.clientSecret || !checkValidEmail(newConf.ownerEmail)) {
      setError({
        dataCenter: !newConf.dataCenter ? 'Data center cann\'t be empty' : '',
        clientId: !newConf.clientId ? 'Client ID cann\'t be empty' : '',
        clientSecret: !newConf.clientSecret ? 'Secret key cann\'t be empty' : '',
        ownerEmail: !checkValidEmail(newConf.ownerEmail) ? 'Email is invalid' : '',
      })
      return
    }

    const apiEndpoint = `https://accounts.zoho.${newConf.dataCenter}/oauth/v2/auth?scope=ZohoAnalytics.metadata.read,ZohoAnalytics.data.read,ZohoAnalytics.data.create,ZohoAnalytics.data.update&client_id=${newConf.clientId}&response_type=code&prompt=Consent&access_type=offline&redirect_uri=${encodeURIComponent(window.location.href)}/redirect`
    const authWindow = window.open(apiEndpoint, 'zohoAnalytics', 'width=400,height=609,toolbar=off')
    const popupURLCheckTimer = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(popupURLCheckTimer)
        let grantTokenResponse = {}
        let isauthRedirectLocation = false
        const bitformsZohoAnalytics = localStorage.getItem('__bitforms_zohoAnalytics')
        if (bitformsZohoAnalytics) {
          isauthRedirectLocation = true
          grantTokenResponse = JSON.parse(bitformsZohoAnalytics)
          localStorage.removeItem('__bitforms_zohoAnalytics')
        }
        if (!grantTokenResponse.code || grantTokenResponse.error || !grantTokenResponse || !isauthRedirectLocation) {
          const errorCause = grantTokenResponse.error ? `Cause: ${grantTokenResponse.error}` : ''
          setSnackbar({ show: true, msg: `Authorization failed ${errorCause}. please try again` })
        } else {
          setAnalyticsConf({ ...newConf, accountServer: grantTokenResponse['accounts-server'] })
          tokenHelper(grantTokenResponse)
        }
      }
    }, 500)
  }

  const tokenHelper = (grantToken) => {
    const newConf = { ...analyticsConf }
    const tokenRequestParams = { ...grantToken }
    tokenRequestParams.dataCenter = newConf.dataCenter
    tokenRequestParams.clientId = newConf.clientId
    tokenRequestParams.clientSecret = newConf.clientSecret
    tokenRequestParams.redirectURI = `${encodeURIComponent(window.location.href)}/redirect`
    const response = bitsFetch(tokenRequestParams, 'bitforms_zanalysis_generate_token')
      .then(result => result)
    response.then(result => {
      if (result && result.success) {
        setAnalyticsConf({ ...newConf, tokenDetails: result.data })
        setisAuthorized(true)
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Authorization failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Authorization failed. please try again' })
      }
    })
  }

  console.log('analyticsConf', analyticsConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3"><b>Integration Name:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="name" value={analyticsConf.name} type="text" placeholder="Integration Name..." />

        <small className="d-blk mt-2">
          <a className="btcd-link" href="https://api-console.zoho.com/" rel="noreferrer" target="_blank">Zoho Api console</a>
        </small>

        <div className="mt-3"><b>Data Center:</b></div>
        <select onChange={event => handleInput(event)} name="dataCenter" value={analyticsConf.dataCenter} className="btcd-paper-inp w-9 mt-1">
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
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="clientId" value={analyticsConf.clientId} type="text" placeholder="Client id..." />
        <div style={{ color: 'red' }}>{error.clientId}</div>

        <div className="mt-3"><b>Client secret:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="clientSecret" value={analyticsConf.clientSecret} type="text" placeholder="Client secret..." />
        <div style={{ color: 'red' }}>{error.clientSecret}</div>

        <div className="mt-3"><b>Zoho Analytics Owner Email:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="ownerEmail" value={analyticsConf.ownerEmail} type="email" placeholder="Owner Email" />
        <div style={{ color: 'red' }}>{error.ownerEmail}</div>

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
        <button onClick={() => refreshTables(analyticsConf.workspace, formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Analytics Tables"' }} type="button" disabled={isLoading}>&#x21BB;</button>
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
              <div className="mt-4">
                <b className="wdt-100">Map Fields</b>
                <button onClick={() => refreshTableHeaders(analyticsConf.workspace, analyticsConf.table, formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Analytics Table Headers"' }} type="button" disabled={isLoading}>&#x21BB;</button>
              </div>
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
              <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addMap(analyticsConf.field_map.length)} className="icn-btn sh-sm" type="button">+</button></div>
              <br />
              <br />
              <div className="mt-4"><b className="wdt-100">Actions</b></div>
              <div className="btcd-hr mt-1" />

              <ZohoAnalyticsActions
                analyticsConf={analyticsConf}
                setAnalyticsConf={setAnalyticsConf}
              />
            </>
          )}
        <button
          onClick={() => nextPage(3)}
          disabled={analyticsConf.module === '' || analyticsConf.field_map.length < 1}
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
      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="red"
        btnTxt="Ok"
        show={actionMdl.show === 'criteria'}
        close={() => setActionMdl({ show: false })}
        action={() => nextPage(3)}
        title="Warning!!!"
        warning
      >
        <div className="btcd-hr mt-2" />
        <div className="mt-5">Without any criteria, all data of table will get replaced.</div>
      </ConfirmModal>
    </div>
  )
}

export default ZohoAnalytics
