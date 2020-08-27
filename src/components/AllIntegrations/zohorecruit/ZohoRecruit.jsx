import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Steps from '../../ElmSettings/Childs/Steps'
import CopyText from '../../ElmSettings/Childs/CopyText'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import bitsFetch from '../../../Utils/bitsFetch'
import Loader from '../../Loaders/Loader'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import ZohoRecruitFieldMap from './ZohoRecruitFieldMap'
import { moduleChange, refreshModules } from './ZohoRecruitCommonFunc'
import ZohoRecruitActions from './ZohoRecruitActions'
import { FromSaveContext } from '../../../pages/FormDetails'

function ZohoRecruit({ formFields, setIntegration, integrations, allIntegURL }) {
  const saveForm = useContext(FromSaveContext)
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const [recruitConf, setRecruitConf] = useState({
    name: 'Zoho Recruit API',
    type: 'Zoho Recruit',
    clientId: '1000.FI16AZ8YXNE7O3A3G5MALAWBZMTOVG',
    clientSecret: '97297574b97f3bd081f2cb56e4ae1db3127bcabed7',
    module: '',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
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
      localStorage.setItem('__bitforms_zohoRecruit', JSON.stringify(grantTokenResponse))
      window.close()
    }
  }, [])

  const handleInput = (e) => {
    let newConf = { ...recruitConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    setError({ ...rmError })
    newConf[e.target.name] = e.target.value

    switch (e.target.name) {
      case 'module':
        newConf = moduleChange(e.target.value, newConf, formID, setRecruitConf, setisLoading, setSnackbar)
        break;
    }
    setRecruitConf({ ...newConf })
  }

  const nextPage = val => {
    document.querySelector(".btcd-s-wrp").scrollTop = 0

    if (val === 3) {
      const mappedFields = recruitConf?.field_map ? recruitConf?.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (recruitConf.default.moduleData[recruitConf.module].required && recruitConf.default.moduleData[recruitConf.module].required.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField)) : []
      const mappedUploadFields = recruitConf?.upload_field_map ? recruitConf.upload_field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (recruitConf.default.moduleData[recruitConf.module].requiredFileUploadFields && recruitConf.default.moduleData[recruitConf.module].requiredFileUploadFields.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField)) : []
      if (mappedFields.length > 0 || mappedUploadFields.length > 0) {
        setSnackbar({ show: true, msg: 'Please map mandatory fields' })
        return
      }
      if (recruitConf.module !== '' && recruitConf.field_map.length > 0) {
        setstep(val)
      }
    } else {
      setstep(val)
      if (val === 2 && !recruitConf.module) {
        refreshModules(formID, recruitConf, setRecruitConf, setisLoading, setSnackbar)
      }
    }
  }

  const addMap = (i, uploadFields) => {
    const newConf = { ...recruitConf }
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

    setRecruitConf({ ...newConf })
  }

  const saveConfig = () => {
    const mappedFields = recruitConf?.field_map ? recruitConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (recruitConf.default.moduleData[recruitConf.module].required && recruitConf.default.moduleData[recruitConf.module].required.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField)) : []
    const mappedUploadFields = recruitConf?.upload_field_map ? recruitConf.upload_field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (recruitConf.default.moduleData[recruitConf.module].requiredFileUploadFields && recruitConf.default.moduleData[recruitConf.module].requiredFileUploadFields.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField)) : []
    if (mappedFields.length > 0 || mappedUploadFields.length > 0) {
      setSnackbar({ show: true, msg: 'Please map mandatory fields' })
      return
    }
    integrations.push(recruitConf)
    setIntegration([...integrations])
    saveForm()
    history.push(allIntegURL)
  }

  const handleAuthorize = () => {
    const newConf = { ...recruitConf }
    if (!newConf.dataCenter || !newConf.clientId || !newConf.clientSecret) {
      setError({
        dataCenter: !newConf.dataCenter ? 'Data center cann\'t be empty' : '',
        clientId: !newConf.clientId ? 'Client ID cann\'t be empty' : '',
        clientSecret: !newConf.clientSecret ? 'Secret key cann\'t be empty' : '',
      })
      return
    }
    const apiEndpoint = `https://accounts.zoho.${newConf.dataCenter}/oauth/v2/auth?scope=ZohoRecruit.users.ALL,ZohoRecruit.modules.all&client_id=${newConf.clientId}&response_type=code&access_type=offline&redirect_uri=${encodeURIComponent(window.location.href)}/redirect`
    const authWindow = window.open(apiEndpoint, 'zohoRecruit', 'width=400,height=609,toolbar=off')
    const popupURLCheckTimer = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(popupURLCheckTimer)
        let grantTokenResponse = {}
        let isauthRedirectLocation = false
        const bitformsZohoRecruit = localStorage.getItem('__bitforms_zohoRecruit')
        console.log('bitforms', bitformsZohoRecruit)
        if (bitformsZohoRecruit) {
          isauthRedirectLocation = true
          grantTokenResponse = JSON.parse(bitformsZohoRecruit)
          localStorage.removeItem('__bitforms_zohoRecruit')
        }
        if (!grantTokenResponse.code || grantTokenResponse.error || !grantTokenResponse || !isauthRedirectLocation) {
          const errorCause = grantTokenResponse.error ? `Cause: ${grantTokenResponse.error}` : ''
          setSnackbar({ show: true, msg: `Authorization failed ${errorCause}. please try again` })
        } else {
          setRecruitConf({ ...newConf, accountServer: grantTokenResponse['accounts-server'] })
          tokenHelper(grantTokenResponse)
        }
      }
    }, 500)
  }

  const tokenHelper = (grantToken) => {
    const newConf = { ...recruitConf }
    const tokenRequestParams = { ...grantToken }
    tokenRequestParams.dataCenter = newConf.dataCenter
    tokenRequestParams.clientId = newConf.clientId
    tokenRequestParams.clientSecret = newConf.clientSecret
    tokenRequestParams.redirectURI = `${encodeURIComponent(window.location.href)}/redirect`
    const response = bitsFetch(tokenRequestParams, 'bitforms_zrecruit_generate_token')
      .then(result => result)
    response.then(result => {
      if (result && result.success) {
        setRecruitConf({ ...newConf, tokenDetails: result.data })
        setisAuthorized(true)
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Authorization failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Authorization failed. please try again' })
      }
    })
  }

  console.log('recruitConf', recruitConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3"><b>Integration Name:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="name" value={recruitConf.name} type="text" placeholder="Integration Name..." />


        <small className="d-blk mt-2">
          <a className="btcd-link" href="https://api-console.zoho.com/" target="_blank">Zoho Api console</a>
        </small>

        <div className="mt-3"><b>Data Center:</b></div>
        <select onChange={event => handleInput(event)} name="dataCenter" value={recruitConf.dataCenter} className="btcd-paper-inp w-9 mt-1">
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
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="clientId" value={recruitConf.clientId} type="text" placeholder="Client id..." />
        <div style={{ color: 'red' }}>{error.clientId}</div>

        <div className="mt-3"><b>Client secret:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="clientSecret" value={recruitConf.clientSecret} type="text" placeholder="Client secret..." />
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
        <select onChange={event => handleInput(event)} name="module" value={recruitConf.module} className="btcd-paper-inp w-7">
          <option value="">Select Module</option>
          {
            recruitConf.default && recruitConf.default.modules && Object.keys(recruitConf.default.modules).map(moduleApiName => (
              <option value={moduleApiName}>
                {recruitConf.default.modules[moduleApiName].pl}
              </option>
            ))
          }
        </select>
        <button onClick={() => refreshModules(formID, recruitConf, setRecruitConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Recruit Modules"' }} type="button" disabled={isLoading}>&#x21BB;</button>
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
        {recruitConf.default?.moduleData?.[recruitConf.module]?.fields
          && (
            <>
              <div className="mt-4"><b className="wdt-100">Map Fields</b></div>
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
                  setSnackbar={setSnackbar}
                />
              ))}
              <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addMap(recruitConf.field_map.length, 0)} className="icn-btn sh-sm" type="button">+</button></div>
              <br />
              <br />
              {Object.keys(recruitConf.default?.moduleData?.[recruitConf.module]?.fileUploadFields).length !== 0 && (
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
                      setSnackbar={setSnackbar}
                    />
                  ))}
                  <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addMap(recruitConf.upload_field_map.length, 1)} className="icn-btn sh-sm" type="button">+</button></div>
                  <br />
                  <br />
                </>
              )}
              <div className="mt-4"><b className="wdt-100">Actions</b></div>
              <div className="btcd-hr mt-1" />

              <ZohoRecruitActions
                recruitConf={recruitConf}
                setRecruitConf={setRecruitConf}
              />
            </>
          )}
        <button
          onClick={() => nextPage(3)}
          disabled={recruitConf.module === '' || recruitConf.field_map.length < 1}
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

export default ZohoRecruit
