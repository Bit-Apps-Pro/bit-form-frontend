import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Steps from '../../ElmSettings/Childs/Steps'
import CopyText from '../../ElmSettings/Childs/CopyText'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import bitsFetch from '../../../Utils/bitsFetch'
import Loader from '../../Loaders/Loader'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { teamChange, folderChange, refreshTeams, refreshTeamFolders, refreshSubFolders } from './ZohoWorkDriveCommonFunc'
import ZohoWorkDriveActions from './ZohoWorkDriveActions'
import saveIntegConfig from '../IntegrationHelpers/IntegrationHelpers'

function ZohoWorkDrive({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { formID } = useParams()
  const [isAuthorized, setisAuthorized] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  const [step, setstep] = useState(1)
  const [error, setError] = useState({ dataCenter: '', clientId: '', clientSecret: '' })
  const [snack, setSnackbar] = useState({ show: false })
  const [workDriveConf, setWorkDriveConf] = useState({
    name: 'Zoho WorkDrive API',
    type: 'Zoho WorkDrive',
    clientId: process.env.NODE_ENV === 'development' ? '1000.67J41WQIOYYH44QY0QUBJDRK2M2J5I' : '',
    clientSecret: process.env.NODE_ENV === 'development' ? 'bc98018ebc5f2af8c51d9bf5e013ac2208b2322fd9' : '',
    team: '',
    folder: '',
    folderMap: [],
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
      localStorage.setItem('__bitforms_zohoWorkDrive', JSON.stringify(grantTokenResponse))
      window.close()
    }
  }, [])

  const handleInput = (e, ind) => {
    let newConf = { ...workDriveConf }
    const rmError = { ...error }
    rmError[e.target.name] = ''
    setError({ ...rmError })
    newConf[e.target.name] = e.target.value

    switch (e.target.name) {
      case 'team':
        newConf = teamChange(newConf, formID, setWorkDriveConf, setisLoading, setSnackbar)
        break;
      case 'folder':
        newConf.folderMap = newConf.folderMap.slice(0, ind)
        newConf = folderChange(newConf, formID, setWorkDriveConf, setisLoading, setSnackbar)
        break;
      default:
        break;
    }
    setWorkDriveConf({ ...newConf })
  }

  const nextPage = val => {
    if (val === 3) {
      if (workDriveConf.team !== '' && workDriveConf.folder !== '') {
        setstep(val)
      }
    } else {
      setstep(val)
      if (val === 2 && !workDriveConf.team) {
        refreshTeams(formID, workDriveConf, setWorkDriveConf, setisLoading, setSnackbar)
      }
    }

    document.querySelector('.btcd-s-wrp').scrollTop = 0
  }

  const saveConfig = () => {
    saveIntegConfig(integrations, setIntegration, allIntegURL, workDriveConf, history)
  }

  const handleAuthorize = () => {
    const newConf = { ...workDriveConf }
    if (!newConf.dataCenter || !newConf.clientId || !newConf.clientSecret) {
      setError({
        dataCenter: !newConf.dataCenter ? 'Data center cann\'t be empty' : '',
        clientId: !newConf.clientId ? 'Client ID cann\'t be empty' : '',
        clientSecret: !newConf.clientSecret ? 'Secret key cann\'t be empty' : '',
      })
      return
    }

    const apiEndpoint = `https://accounts.zoho.${newConf.dataCenter}/oauth/v2/auth?scope=WorkDrive.team.READ,WorkDrive.workspace.READ,WorkDrive.workspace.CREATE,WorkDrive.workspace.UPDATE,WorkDrive.files.READ,WorkDrive.files.CREATE&client_id=${newConf.clientId}&response_type=code&prompt=Consent&access_type=offline&redirect_uri=${encodeURIComponent(window.location.href)}/redirect`
    const authWindow = window.open(apiEndpoint, 'zohoWorkDrive', 'width=400,height=609,toolbar=off')
    const popupURLCheckTimer = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(popupURLCheckTimer)
        let grantTokenResponse = {}
        let isauthRedirectLocation = false
        const bitformsZohoWorkDrive = localStorage.getItem('__bitforms_zohoWorkDrive')
        if (bitformsZohoWorkDrive) {
          isauthRedirectLocation = true
          grantTokenResponse = JSON.parse(bitformsZohoWorkDrive)
          localStorage.removeItem('__bitforms_zohoWorkDrive')
        }
        if (!grantTokenResponse.code || grantTokenResponse.error || !grantTokenResponse || !isauthRedirectLocation) {
          const errorCause = grantTokenResponse.error ? `Cause: ${grantTokenResponse.error}` : ''
          setSnackbar({ show: true, msg: `Authorization failed ${errorCause}. please try again` })
        } else {
          setWorkDriveConf({ ...newConf, accountServer: grantTokenResponse['accounts-server'] })
          tokenHelper(grantTokenResponse)
        }
      }
    }, 500)
  }

  const tokenHelper = (grantToken) => {
    const newConf = { ...workDriveConf }
    const tokenRequestParams = { ...grantToken }
    tokenRequestParams.dataCenter = newConf.dataCenter
    tokenRequestParams.clientId = newConf.clientId
    tokenRequestParams.clientSecret = newConf.clientSecret
    tokenRequestParams.redirectURI = `${encodeURIComponent(window.location.href)}/redirect`
    const response = bitsFetch(tokenRequestParams, 'bitforms_zworkdrive_generate_token')
      .then(result => result)
    response.then(result => {
      if (result && result.success) {
        setWorkDriveConf({ ...newConf, tokenDetails: result.data })
        setisAuthorized(true)
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Authorization failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Authorization failed. please try again' })
      }
    })
  }

  console.log('workDriveConf', workDriveConf);

  return (
    <div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <div className="txt-center w-9 mt-2"><Steps step={3} active={step} /></div>

      {/* STEP 1 */}
      <div className="btcd-stp-page" style={{ ...{ width: step === 1 && 900 }, ...{ height: step === 1 && `${100}%` } }}>
        <div className="mt-3"><b>Integration Name:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="name" value={workDriveConf.name} type="text" placeholder="Integration Name..." />

        <div className="mt-3"><b>Data Center:</b></div>
        <select onChange={event => handleInput(event)} name="dataCenter" value={workDriveConf.dataCenter} className="btcd-paper-inp w-9 mt-1">
          <option value="">--Select a data center--</option>
          <option value="com">zoho.com</option>
          <option value="eu">zoho.eu</option>
          <option value="com.cn">zoho.com.cn</option>
          <option value="in">zoho.in</option>
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
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="clientId" value={workDriveConf.clientId} type="text" placeholder="Client id..." />
        <div style={{ color: 'red' }}>{error.clientId}</div>

        <div className="mt-3"><b>Client secret:</b></div>
        <input className="btcd-paper-inp w-9 mt-1" onChange={event => handleInput(event)} name="clientSecret" value={workDriveConf.clientSecret} type="text" placeholder="Client secret..." />
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
        <b className="wdt-100 d-in-b">Team:</b>
        <select onChange={event => handleInput(event)} name="team" value={workDriveConf.team} className="btcd-paper-inp w-7">
          <option value="">Select Team</option>
          {
            workDriveConf?.default?.teams && workDriveConf.default.teams.map(teamApi => (
              <option key={teamApi.teamId} value={teamApi.teamId}>
                {teamApi.teamName}
              </option>
            ))
          }
        </select>
        <button onClick={() => refreshTeams(formID, workDriveConf, setWorkDriveConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh WorkDrive Teams"' }} type="button" disabled={isLoading}>&#x21BB;</button>
        <br />
        <br />
        <b className="wdt-100 d-in-b">Folder:</b>
        <select onChange={event => handleInput(event, 0)} name="folder" value={workDriveConf.folderMap[0]} className="btcd-paper-inp w-7">
          <option value="">Select Folder</option>
          {
            workDriveConf?.default?.teamFolders?.[workDriveConf.team] && Object.values(workDriveConf.default.teamFolders[workDriveConf.team]).map(teamFolderApi => (
              <option key={teamFolderApi.teamFolderId} value={teamFolderApi.teamFolderId}>
                {teamFolderApi.teamFolderName}
              </option>
            ))
          }
        </select>
        <button onClick={() => refreshTeamFolders(formID, workDriveConf, setWorkDriveConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh WorkDrive Team Folders"' }} type="button" disabled={isLoading}>&#x21BB;</button>
        <br />
        {workDriveConf.folderMap.map((folder, i) => (
          <div key={folder}>
            <br />
            <div className="flx">
              <b className="wdt-100 d-in-b" />
              <div className="d-in-b" style={{ width: (i + 1) * 10, height: 30 }} />
              <div className="flx sub-folder w-7">
                <select onChange={event => handleInput(event, i + 1)} name="folder" value={workDriveConf.folderMap[i + 1]} className="btcd-paper-inp">
                  <option value={workDriveConf.folderMap[i]}>/ root</option>
                  {
                  workDriveConf?.default?.folders?.[folder] && workDriveConf.default.folders[folder].map(folderApi => (
                    <option key={folderApi.folderId} value={folderApi.folderId}>
                      {folderApi.folderName}
                    </option>
                  ))
                }
                </select>
                <button onClick={() => refreshSubFolders(formID, workDriveConf, setWorkDriveConf, setisLoading, setSnackbar, i)} className="d-non icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Sub Folders"' }} type="button" disabled={isLoading}>&#x21BB;</button>
              </div>
            </div>
          </div>
        ))}
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
        {workDriveConf.folder && (
        <>
          <div className="mt-4"><b className="wdt-100">Actions</b></div>
          <div className="btcd-hr mt-1" />
          <ZohoWorkDriveActions
            workDriveConf={workDriveConf}
            setWorkDriveConf={setWorkDriveConf}
            formFields={formFields}
            formID={formID}
            setisLoading={setisLoading}
            setSnackbar={setSnackbar}
          />
        </>
        )}
        <button
          onClick={() => nextPage(3)}
          disabled={workDriveConf.team === '' || workDriveConf.folder === ''}
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

export default ZohoWorkDrive
