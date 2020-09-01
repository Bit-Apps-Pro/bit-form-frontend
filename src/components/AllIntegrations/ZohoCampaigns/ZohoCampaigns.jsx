import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Steps from '../../ElmSettings/Childs/Steps'
import CopyText from '../../ElmSettings/Childs/CopyText'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import ConfirmModal from '../../ConfirmModal'
import bitsFetch from '../../../Utils/bitsFetch'
import Loader from '../../Loaders/Loader'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import ZohoCampaignsFieldMap from './ZohoCampaignsFieldMap'
import { listChange, refreshLists, refreshContactFields } from './ZohoCampaignsCommonFunc'
// import ZohoCampaignsActions from './ZohoCampaignsActions'
import { FromSaveContext } from '../../../pages/FormDetails'

function ZohoCampaigns({ formFields, setIntegration, integrations, allIntegURL }) {
  const saveForm = useContext(FromSaveContext)
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const [actionMdl, setActionMdl] = useState({ show: false })
  const [campaignsConf, setCampaignsConf] = useState({
    name: 'Zoho Campaigns API',
    type: 'Zoho Campaigns',
    clientId: process.env.NODE_ENV === 'development' ? '1000.ADOPSXBMMW800FBDEFBH4V14Y6UKQK' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? '904a27ac7bcb1ea120c3f61c7007c0f2b7fc5ef584' : '',
    list: '',
    field_map: [
      { formField: '', zohoFormField: '' },
    ],
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
      localStorage.setItem('__bitforms_zohoCampaigns', JSON.stringify(grantTokenResponse))
      window.close()
    }
  }, [])

  const handleInput = (e) => {
    let newConf = { ...campaignsConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    setError({ ...rmError })
    newConf[e.target.name] = e.target.value

    switch (e.target.name) {
      case 'list':
        newConf = listChange(e.target.value, newConf, formID, setCampaignsConf, setisLoading, setSnackbar)
        break;
      default:
        break;
    }
    setCampaignsConf({ ...newConf })
  }

  const nextPage = val => {
    if (val === 3) {
      if (campaignsConf.field_map[0].formField.length === 0) {
        setSnackbar({ show: true, msg: 'Please map mandatory fields' })
        return
      }
      setActionMdl({ show: 'false' })

      document.querySelector('.btcd-s-wrp').scrollTop = 0
      if (campaignsConf.list !== '' && campaignsConf.table !== '' && campaignsConf.field_map.length > 0) {
        setstep(val)
      }
    } else {
      setstep(val)
      if (val === 2 && !campaignsConf.list) {
        refreshLists(formID, campaignsConf, setCampaignsConf, setisLoading, setSnackbar)
      }
    }
  }

  const addMap = (i) => {
    const newConf = { ...campaignsConf }
    if (i !== 0) {
      newConf.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
    } else {
      newConf.field_map.push({ formField: '', zohoFormField: '' })
    }

    setCampaignsConf({ ...newConf })
  }

  const saveConfig = () => {
    integrations.push(campaignsConf)
    setIntegration([...integrations])
    saveForm()
    history.push(allIntegURL)
  }

  const handleAuthorize = () => {
    const newConf = { ...campaignsConf }
    if (!newConf.dataCenter || !newConf.clientId || !newConf.clientSecret) {
      setError({
        dataCenter: !newConf.dataCenter ? 'Data center cann\'t be empty' : '',
        clientId: !newConf.clientId ? 'Client ID cann\'t be empty' : '',
        clientSecret: !newConf.clientSecret ? 'Secret key cann\'t be empty' : '',
      })
      return
    }

    const apiEndpoint = `https://accounts.zoho.${newConf.dataCenter}/oauth/v2/auth?scope=ZohoCampaigns.contact.READ,ZohoCampaigns.contact.CREATE&client_id=${newConf.clientId}&response_type=code&prompt=Consent&access_type=offline&redirect_uri=${encodeURIComponent(window.location.href)}/redirect`
    const authWindow = window.open(apiEndpoint, 'zohoCampaigns', 'width=400,height=609,toolbar=off')
    const popupURLCheckTimer = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(popupURLCheckTimer)
        let grantTokenResponse = {}
        let isauthRedirectLocation = false
        const bitformsZohoCampaigns = localStorage.getItem('__bitforms_zohoCampaigns')
        if (bitformsZohoCampaigns) {
          isauthRedirectLocation = true
          grantTokenResponse = JSON.parse(bitformsZohoCampaigns)
          localStorage.removeItem('__bitforms_zohoCampaigns')
        }
        if (!grantTokenResponse.code || grantTokenResponse.error || !grantTokenResponse || !isauthRedirectLocation) {
          const errorCause = grantTokenResponse.error ? `Cause: ${grantTokenResponse.error}` : ''
          setSnackbar({ show: true, msg: `Authorization failed ${errorCause}. please try again` })
        } else {
          setCampaignsConf({ ...newConf, accountServer: grantTokenResponse['accounts-server'] })
          tokenHelper(grantTokenResponse)
        }
      }
    }, 500)
  }

  const tokenHelper = (grantToken) => {
    const newConf = { ...campaignsConf }
    const tokenRequestParams = { ...grantToken }
    tokenRequestParams.dataCenter = newConf.dataCenter
    tokenRequestParams.clientId = newConf.clientId
    tokenRequestParams.clientSecret = newConf.clientSecret
    tokenRequestParams.redirectURI = `${encodeURIComponent(window.location.href)}/redirect`
    const response = bitsFetch(tokenRequestParams, 'bitforms_zcampaigns_generate_token')
      .then(result => result)
    response.then(result => {
      if (result && result.success) {
        setCampaignsConf({ ...newConf, tokenDetails: result.data })
        setisAuthorized(true)
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Authorization failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Authorization failed. please try again' })
      }
    })
  }

  console.log('campaignsConf', campaignsConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3"><b>Integration Name:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="name" value={campaignsConf.name} type="text" placeholder="Integration Name..." />

        <small className="d-blk mt-2">
          <a className="btcd-link" href="https://api-console.zoho.com/" rel="noreferrer" target="_blank">Zoho Api console</a>
        </small>

        <div className="mt-3"><b>Data Center:</b></div>
        <select onChange={event => handleInput(event)} name="dataCenter" value={campaignsConf.dataCenter} className="btcd-paper-inp w-9 mt-1">
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
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="clientId" value={campaignsConf.clientId} type="text" placeholder="Client id..." />
        <div style={{ color: 'red' }}>{error.clientId}</div>

        <div className="mt-3"><b>Client secret:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="clientSecret" value={campaignsConf.clientSecret} type="text" placeholder="Client secret..." />
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
        <b className="wdt-100 d-in-b">List:</b>
        <select onChange={event => handleInput(event)} name="list" value={campaignsConf.list} className="btcd-paper-inp w-7">
          <option value="">Select List</option>
          {
            campaignsConf?.default?.lists && campaignsConf.default.lists.map(listApiName => (
              <option value={listApiName.listkey}>
                {listApiName.listname}
              </option>
            ))
          }
        </select>
        <button onClick={() => refreshLists(formID, campaignsConf, setCampaignsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Campaigns Lists"' }} type="button" disabled={isLoading}>&#x21BB;</button>
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
          <button onClick={() => refreshContactFields(campaignsConf.list, formID, campaignsConf, setCampaignsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Campaigns Contact Fields"' }} type="button" disabled={isLoading}>&#x21BB;</button>
        </div>
        <div className="btcd-hr mt-1" />
        {campaignsConf.default?.fields?.[campaignsConf.list]
          && (
            <>
              <div className="flx flx-around mt-2 mb-1">
                <div className="txt-dp"><b>Form Fields</b></div>
                <div className="txt-dp"><b>Zoho Fields</b></div>
              </div>

              {campaignsConf.field_map.map((itm, i) => (
                <ZohoCampaignsFieldMap
                  i={i}
                  field={itm}
                  campaignsConf={campaignsConf}
                  formFields={formFields}
                  setCampaignsConf={setCampaignsConf}
                />
              ))}
              {/* <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addMap(campaignsConf.field_map.length)} className="icn-btn sh-sm" type="button">+</button></div> */}
            </>
          )}
        <button
          onClick={() => nextPage(3)}
          disabled={campaignsConf.module === '' || campaignsConf.field_map.length < 1}
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

export default ZohoCampaigns
