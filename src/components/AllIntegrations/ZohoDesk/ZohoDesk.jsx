import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Steps from '../../ElmSettings/Childs/Steps'
import CopyText from '../../ElmSettings/Childs/CopyText'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import bitsFetch from '../../../Utils/bitsFetch'
import Loader from '../../Loaders/Loader'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import ZohoDeskFieldMap from './ZohoDeskFieldMap'
import { portalChange, departmentChange, refreshOrganizations, refreshDepartments, refreshFields } from './ZohoDeskCommonFunc'
import ZohoDeskActions from './ZohoDeskActions'
import saveIntegConfig from '../IntegrationHelpers/IntegrationHelpers'

function ZohoDesk({ formFields, setIntegration, integrations, allIntegURL }) {
  const { formID } = useParams()
  const history = useHistory()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const [deskConf, setDeskConf] = useState({
    name: 'Zoho Desk API',
    type: 'Zoho Desk',
    clientId: process.env.NODE_ENV === 'development' ? '1000.ADOPSXBMMW800FBDEFBH4V14Y6UKQK' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? '904a27ac7bcb1ea120c3f61c7007c0f2b7fc5ef584' : '',
    orgId: '',
    department: '',
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
      localStorage.setItem('__bitforms_zohoDesk', JSON.stringify(grantTokenResponse))
      window.close()
    }
  }, [])

  const handleInput = (e) => {
    let newConf = { ...deskConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    setError({ ...rmError })
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

  const nextPage = val => {
    if (val === 3) {
      const mappedFields = deskConf?.field_map ? deskConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && deskConf?.default?.fields?.[deskConf.orgId]?.required.indexOf(mappedField.zohoFormField) !== -1)) : []
      if (mappedFields.length > 0) {
        setSnackbar({ show: true, msg: 'Please map mandatory fields' })
        return
      }

      if (!deskConf.actions?.ticket_owner) {
        setSnackbar({ show: true, msg: 'Please select a ticket owner' })
        return
      }

      if (deskConf.department !== '' && deskConf.table !== '' && deskConf.field_map.length > 0) {
        setstep(val)
      }
    } else {
      setstep(val)
      if (val === 2 && !deskConf.department) {
        refreshOrganizations(formID, deskConf, setDeskConf, setisLoading, setSnackbar)
      }
    }
    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  const addMap = (i) => {
    const newConf = { ...deskConf }
    if (i !== 0) {
      newConf.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
    } else {
      newConf.field_map.push({ formField: '', zohoFormField: '' })
    }

    setDeskConf({ ...newConf })
  }

  const saveConfig = () => {
    saveIntegConfig(integrations, setIntegration, allIntegURL, deskConf, history)
  }

  const handleAuthorize = () => {
    const newConf = { ...deskConf }
    if (!newConf.dataCenter || !newConf.clientId || !newConf.clientSecret) {
      setError({
        dataCenter: !newConf.dataCenter ? 'Data center cann\'t be empty' : '',
        clientId: !newConf.clientId ? 'Client ID cann\'t be empty' : '',
        clientSecret: !newConf.clientSecret ? 'Secret key cann\'t be empty' : '',
      })
      return
    }

    // eslint-disable-next-line max-len
    const apiEndpoint = `https://accounts.zoho.${newConf.dataCenter}/oauth/v2/auth?scope=Desk.settings.READ,Desk.basic.READ,Desk.search.READ,Desk.contacts.READ,Desk.contacts.CREATE,Desk.contacts.UPDATE,Desk.tickets.CREATE,Desk.tickets.UPDATE&client_id=${newConf.clientId}&response_type=code&prompt=Consent&access_type=offline&redirect_uri=${encodeURIComponent(window.location.href)}/redirect`
    const authWindow = window.open(apiEndpoint, 'zohoDesk', 'width=400,height=609,toolbar=off')
    const popupURLCheckTimer = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(popupURLCheckTimer)
        let grantTokenResponse = {}
        let isauthRedirectLocation = false
        const bitformsZohoDesk = localStorage.getItem('__bitforms_zohoDesk')
        if (bitformsZohoDesk) {
          isauthRedirectLocation = true
          grantTokenResponse = JSON.parse(bitformsZohoDesk)
          localStorage.removeItem('__bitforms_zohoDesk')
        }
        if (!grantTokenResponse.code || grantTokenResponse.error || !grantTokenResponse || !isauthRedirectLocation) {
          const errorCause = grantTokenResponse.error ? `Cause: ${grantTokenResponse.error}` : ''
          setSnackbar({ show: true, msg: `Authorization failed ${errorCause}. please try again` })
        } else {
          setDeskConf({ ...newConf, accountServer: grantTokenResponse['accounts-server'] })
          tokenHelper(grantTokenResponse)
        }
      }
    }, 500)
  }

  const tokenHelper = (grantToken) => {
    const newConf = { ...deskConf }
    const tokenRequestParams = { ...grantToken }
    tokenRequestParams.dataCenter = newConf.dataCenter
    tokenRequestParams.clientId = newConf.clientId
    tokenRequestParams.clientSecret = newConf.clientSecret
    tokenRequestParams.redirectURI = `${encodeURIComponent(window.location.href)}/redirect`
    const response = bitsFetch(tokenRequestParams, 'bitforms_zdesk_generate_token')
      .then(result => result)
    response.then(result => {
      if (result && result.success) {
        setDeskConf({ ...newConf, tokenDetails: result.data })
        setisAuthorized(true)
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Authorization failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Authorization failed. please try again' })
      }
    })
  }

  console.log('deskConf', deskConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3"><b>Integration Name:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="name" value={deskConf.name} type="text" placeholder="Integration Name..." />

        <div className="mt-3"><b>Data Center:</b></div>
        <select onChange={event => handleInput(event)} name="dataCenter" value={deskConf.dataCenter} className="btcd-paper-inp w-9 mt-1">
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

        <small className="d-blk mt-5">
          To get Client ID and SECRET , Please Visit
          {' '}
          <a className="btcd-link" href="https://api-console.zoho.com/" target="_blank" rel="noreferrer">Zoho API Console</a>
        </small>

        <div className="mt-3"><b>Client id:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="clientId" value={deskConf.clientId} type="text" placeholder="Client id..." />
        <div style={{ color: 'red' }}>{error.clientId}</div>

        <div className="mt-3"><b>Client secret:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="clientSecret" value={deskConf.clientSecret} type="text" placeholder="Client secret..." />
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
              <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addMap(deskConf.field_map.length)} className="icn-btn sh-sm" type="button">+</button></div>
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
        <button
          onClick={() => nextPage(3)}
          disabled={deskConf.module === '' || deskConf.field_map.length < 1}
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

export default ZohoDesk
