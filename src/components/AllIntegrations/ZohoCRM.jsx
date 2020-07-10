import React, { useState, useEffect } from 'react'
import { useRouteMatch, useHistory, useParams } from 'react-router-dom'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import Steps from '../ElmSettings/Childs/Steps'
import TableCheckBox from '../ElmSettings/Childs/TableCheckBox'
import CopyText from '../ElmSettings/Childs/CopyText'
import SnackMsg from '../ElmSettings/Childs/SnackMsg'
import bitsFetch from '../../Utils/bitsFetch'
import Loader from '../Loaders/Loader'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import ConfirmModal from '../ConfirmModal'

function ZohoCRM({ formFields, setIntegration, integrations }) {
  const { url } = useRouteMatch()
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const [actionMdl, setActionMdl] = useState({ show: false, action: () => { } })
  const [crmConf, setCrmConf] = useState({
    name: 'Zoho CRM API',
    type: 'Zoho CRM',
    clientId: '1000.W366Q8LPE5H74VDGZWXDIV6SL96HRH',
    clientSecret: '1e7f458dd609c4aed2870c6c2c724b1822b13f20cc',
    module: '',
    layout: '',
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
        console.log('queryParams', queryParams)
        queryParams.forEach(element => {
          const gtKeyValue = element.split('=')
          if (gtKeyValue[1]) {
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
    newConf.layout = ''
    newConf.field_map = [{ formField: '', zohoFormField: '' }]
    setCrmConf({ ...crmConf, ...newConf })
    if (crmConf.default && (!crmConf.default.layouts || (crmConf.default.layouts && !crmConf.default.layouts[crmConf.module]))) {
      console.log('INMODULE', crmConf.default)
      refreshLayouts()
    }
  }, [crmConf.module])

  useEffect(() => {
    const newConf = { ...crmConf }
    newConf.field_map = [{ formField: '', zohoFormField: '' }]
    if (crmConf.default && crmConf.default.layouts && newConf.default.layouts[crmConf.module] && newConf.default.layouts[crmConf.module][crmConf.layout] && newConf.default.layouts[crmConf.module][crmConf.layout].required) {
      newConf.field_map = newConf.default.layouts[crmConf.module][crmConf.layout].required.map(field => ({ formField: '', zohoFormField: field }))
    }
    setCrmConf({ ...crmConf, ...newConf })
  }, [crmConf.layout])

  const handleInput = e => {
    const rmError = { ...error }
    rmError[e.target.name] = ''
    setError({ ...rmError })
    crmConf[e.target.name] = e.target.value
    setCrmConf({ ...crmConf })
  }

  const handleFieldMapping = (event, index) => {
    const newConf = { ...crmConf }
    newConf.field_map[index][event.target.name] = event.target.value
    setCrmConf({ ...crmConf, ...newConf })
  }

  const nextPage = val => {
    if (val === 3) {
      const mappedFields = crmConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (crmConf.default.layouts[crmConf.module][crmConf.layout].required && crmConf.default.layouts[crmConf.module][crmConf.layout].required.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField))
      console.log('mappedFields', mappedFields, crmConf.field_map, crmConf.module)
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

  const saveConfig = () => {
    const mappedFields = crmConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && (crmConf.default.layouts[crmConf.module][crmConf.layout].required && crmConf.default.layouts[crmConf.module][crmConf.layout].required.indexOf(mappedField.zohoFormField) !== -1) && mappedField.zohoFormField))
    console.log('mappedFields', mappedFields, crmConf.field_map)
    if (mappedFields.length > 0) {
      setSnackbar({ show: true, msg: 'Please map mandatory fields' })
      return
    }
    integrations.push(crmConf)
    setIntegration([...integrations])
    history.push(url.match(/\/builder\/edit\/[0-9]+\/settings.integrations/g).join())
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
            console.log('layouts', layouts)
            newConf.layout = layouts[0]
          }
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        console.log('newConf', newConf)
        setCrmConf({ ...crmConf, ...newConf })
        setSnackbar({ show: true, msg: 'Layouts refreshed' })
      } else if ((result && result?.data?.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Layouts refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Layouts refresh failed. please try again' })
      }
    })
    setisLoading(false)
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
        console.log('grantTokenResponse', localStorage, grantTokenResponse)
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
    console.log('grantToken', grantToken, crmConf)
    const tokenRequestParams = { ...grantToken }
    tokenRequestParams.dataCenter = crmConf.dataCenter
    tokenRequestParams.clientId = crmConf.clientId
    tokenRequestParams.clientSecret = crmConf.clientSecret
    tokenRequestParams.redirectURI = `${encodeURIComponent(window.location.href)}/redirect`
    const response = bitsFetch(tokenRequestParams, 'bitforms_zcrm_generate_token')
      .then(result => result)
    response.then(result => {
      if (result && result.success) {
        console.log('result.data', result.data)
        setCrmConf({ ...crmConf, tokenDetails: result.data })
        setisAuthorized(true)
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Authorization failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Authorization failed. please try again' })
      }
    })
  }

  const clsActionMdl = () => {
    setActionMdl({ show: false })
  }

  const actioHandler = (val, typ) => {
    if (typ === 'attachment') {
      if (val !== '') {
        crmConf.actions.attachment = val
      } else {
        delete crmConf.actions.attachment
      }
    }
    if (typ === 'approval') {
      if (val.target.checked) {
        crmConf.actions.approval = true
      } else {
        delete crmConf.actions.approval
      }
    }
    setCrmConf(JSON.parse(JSON.stringify(crmConf)))
  }

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt="Ok"
        show={actionMdl.show === 'attachment'}
        close={clsActionMdl}
        action={clsActionMdl}
        title="Select Attachment"
      >
        <div className="btcd-hr mt-1" />
        <div className="mt-3">Select file upload fields</div>
        <MultiSelect
          className="mt-2 w-9"
          onChange={(val) => actioHandler(val, 'attachment')}
          options={formFields.map(itm => ({ label: itm.name, value: itm.key }))}
        />
      </ConfirmModal>
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3"><b>Integration Name:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={handleInput} name="name" value={crmConf.name} type="text" placeholder="Integration Name..." />

        <div className="mt-3"><b>Data Center:</b></div>
        <select onChange={handleInput} name="dataCenter" value={crmConf.dataCenter} className="btcd-paper-inp w-9 mt-1">
          <option value="">--Select a data center--</option>
          <option value="com">zoho.com</option>
          <option value="eu">zoho.eu</option>
          <option value="com.au">zoho.com.au</option>
          <option value="in">zoho.in</option>
        </select>
        <div style={{ color: 'red' }}>{error.dataCenter}</div>

        <div className="mt-3"><b>Client id:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={handleInput} name="clientId" value={crmConf.clientId} type="text" placeholder="Client id..." />
        <div style={{ color: 'red' }}>{error.clientId}</div>

        <div className="mt-3"><b>Client secret:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={handleInput} name="clientSecret" value={crmConf.clientSecret} type="text" placeholder="Client secret..." />
        <div style={{ color: 'red' }}>{error.clientSecret}</div>

        <div className="mt-3"><b>Redirect URI:</b></div>
        <CopyText value={`${window.location.href}/redirect`} setSnackbar={setSnackbar} className="cpyTxt" />

        <button onClick={handleAuthorize} className="btn btcd-btn-lg green sh-sm flx" type="button" disabled={isAuthorized}>
          {isAuthorized ? 'Authorized ✔' : 'Authorize'}
        </button>
        <br />
        <button onClick={() => nextPage(2)} className="btn f-right btcd-btn-lg green sh-sm flx" type="button" disabled={!isAuthorized}>
          Next &nbsp;
          <div className="btcd-icn icn-arrow_back rev-icn d-in-b" />
        </button>
      </div>

      <div className="btcd-stp-page" style={{ width: step === 2 && 900, height: step === 2 && `${100}%` }}>
        <br />
        <b className="wdt-100 d-in-b">Module:</b>
        <select onChange={handleInput} name="module" value={crmConf.module} className="btcd-paper-inp w-7">
          <option value="">Select Module</option>
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
          <option value="">Select Layout</option>
          {
             crmConf?.default?.layouts?.[crmConf.module] && Object.keys(crmConf.default.layouts[crmConf.module]).map(layoutApiName => (
              <option value={layoutApiName}>
                {layoutApiName}
              </option>
            ))
          }
        </select>
        <button onClick={refreshLayouts} className="icn-btn sh-sm ml-2 mr-2" type="button" disabled={isLoading}>&#x21BB;</button>
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
        {
          crmConf?.default?.layouts?.[crmConf.module]?.[crmConf.layout]?.fields
          && (
            <>
              <div className="mt-4"><b className="wdt-100">Field Map</b></div>
              <div className="btcd-hr mt-1" />
              <div className="flx flx-around mt-2 mb-1">
                <div className="txt-dp"><b>Form Fields</b></div>
                <div className="txt-dp"><b>Zoho Fields</b></div>
              </div>

              {crmConf.field_map.map((itm, i) => (
                <MapField
                  i={i}
                  field={itm}
                  crmConf={crmConf}
                  formFields={formFields}
                  handleFieldMapping={handleFieldMapping}
                  addMap={addMap}
                  delMap={delMap}
                />
              ))}
              <div className="txt-center  mt-2" style={{ marginRight: 85 }}><button onClick={() => addMap()} className="icn-btn sh-sm" type="button">+</button></div>
              <br />
              <br />
              <div className="mt-4"><b className="wdt-100">Actions</b></div>
              <div className="btcd-hr mt-1" />

              <div className="d-flx flx-wrp">
                <TableCheckBox onChange={actioHandler} checked={'workflow' in crmConf.actions} className="wdt-200 mt-4" value="Workflow" title="Workflow" subTitle="Trigger CRM workflows" />
                <TableCheckBox onChange={() => setActionMdl({ show: 'attachment' })} checked={'attachment' in crmConf.actions} className="wdt-200 mt-4" value="Attachment" title="Attachment" subTitle="Add attachments or signatures from BitFroms to CRM." />
                <TableCheckBox onChange={(e) => actioHandler(e, 'approval')} checked={'approval' in crmConf.actions} className="wdt-200 mt-4" value="Approval" title="Approval" subTitle="Send entries to CRM approval list." />
                <TableCheckBox onChange={actioHandler} checked={crmConf.actions.Capture_GCLID} className="wdt-200 mt-4" value="Capture_GCLID" title="Capture GCLID" subTitle="Sends the click details of AdWords Ads to Zoho CRM." />
                <TableCheckBox onChange={actioHandler} checked={crmConf.actions.Upsert_Record} className="wdt-200 mt-4" value="Upsert_Record" title="Upsert Record" subTitle="The record is updated if it already exists else it is inserted as a new record." />
                <TableCheckBox onChange={actioHandler} checked={crmConf.actions.Assignment_Rules} className="wdt-200 mt-4" value="Assignment_Rules" title="Assignment Rules" subTitle="Trigger Assignment Rules in Zoho CRM." />
                <TableCheckBox onChange={actioHandler} checked={crmConf.actions.Tag_Records} className="wdt-200 mt-4" value="Tag_Records" title="Tag Records" subTitle="Add a tag to records pushed to Zoho CRM." />
              </div>
            </>
          )
        }
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

      <div className="btcd-stp-page txt-center" style={{ width: step === 3 && 900, height: step === 3 && `${100}% ` }}>
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

function MapField({ i, formFields, field, handleFieldMapping, crmConf, addMap, delMap }) {

  const isNotRequired = crmConf?.default?.layouts?.[crmConf.module]?.[crmConf.layout]?.required?.indexOf(field.zohoFormField) === -1

  return (
    <div key={`f-m-${i + 9}`} className="flx flx-around mt-1 mr-1">
      <select className="btcd-paper-inp mr-2" name="formField" value={field.formField} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        {formFields.map(f => field.type !== 'file-up' && <option key={`ff-zhcrm-${f.key}`} value={f.key}>{f.name}</option>)}
      </select>
      <select className="btcd-paper-inp"/*  disabled={!isNotRequired} */ name="zohoFormField" value={field.zohoFormField} onChange={(ev) => handleFieldMapping(ev, i)}>
        <option value="">Select Field</option>
        {
          Object.keys(crmConf.default.layouts[crmConf.module][crmConf.layout].fields).map(fieldApiName => (
            <option value={fieldApiName}>
              {crmConf.default.layouts[crmConf.module][crmConf.layout].fields[fieldApiName].display_label}
            </option>
          ))
        }
      </select>
      <button
        onClick={() => addMap(i)}
        className={`icn-btn sh-sm ml-2 ${!isNotRequired && 'mr-8'}`}
        type="button"
      >
        +
      </button>
      {
        isNotRequired && (
          <button onClick={() => delMap(i)} className="icn-btn sh-sm ml-1" type="button" aria-label="btn">
            <span className="btcd-icn icn-trash-2" />
          </button>
        )
      }
    </div>
  )
}
