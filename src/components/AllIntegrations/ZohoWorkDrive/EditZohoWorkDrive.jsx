/* eslint-disable no-param-reassign */
import React, { useState, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import SnackMsg from '../../ElmSettings/Childs/SnackMsg'
import Loader from '../../Loaders/Loader'
import { FormSaveContext } from '../../../pages/FormDetails'
import { teamChange, folderChange, refreshTeams, refreshTeamFolders, refreshSubFolders } from './ZohoWorkDriveCommonFunc'
import saveIntegConfig from '../IntegrationHelpers/IntegrationHelpers'
import ZohoWorkDriveActions from './ZohoWorkDriveActions'

function EditZohoRecruit({ formFields, setIntegration, integrations, allIntegURL }) {
  const history = useHistory()
  const { id, formID } = useParams()
  const saveForm = useContext(FormSaveContext)

  const [workDriveConf, setWorkDriveConf] = useState({ ...integrations[id] })
  const [isLoading, setisLoading] = useState(false)
  const [snack, setSnackbar] = useState({ show: false })

  console.log('workDriveConf', workDriveConf)

  const handleInput = (e, ind) => {
    let newConf = { ...workDriveConf }
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

  const saveConfig = () => {
    saveIntegConfig(integrations, setIntegration, allIntegURL, workDriveConf, history, saveForm, id, 1)
  }

  return (
    <div style={{ width: 900 }}>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <div className="flx mt-3">
        <b className="wdt-100 d-in-b">Integration Name:</b>
        <input className="btcd-paper-inp w-7" onChange={event => handleInput(event)} name="name" value={workDriveConf.name} type="text" placeholder="Integration Name..." />
      </div>
      <br />
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

      <div className="txt-center w-9 mt-3">
        <button onClick={saveConfig} className="btn btcd-btn-lg green sh-sm flx" type="button">
          Save
        </button>
      </div>
    </div>
  )
}

export default EditZohoRecruit
