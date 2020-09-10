/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import ConfirmModal from '../../ConfirmModal'
import TitleModal from '../../TitleModal'
import Loader from '../../Loaders/Loader'
import { refreshUsers } from './ZohoWorkDriveCommonFunc'

export default function ZohoWorkDriveActions({ workDriveConf, setWorkDriveConf, formFields, formID, setSnackbar }) {
  const folder = workDriveConf.folderMap ? workDriveConf.folderMap[0] : workDriveConf.folder
  const [isLoading, setisLoading] = useState(false)
  const [actionMdl, setActionMdl] = useState({ show: false })
  const [users, setUsers] = useState([])

  const actionHandler = (val, typ, share) => {
    const newConf = { ...workDriveConf }
    if (typ === 'create_folder') {
      if (val.target.checked) {
        newConf.actions.create_folder = { name: '', suffix: false }
      } else {
        delete newConf.actions.create_folder
        delete newConf.actions.share.folder
      }
    } else if (typ === 'attachments') {
      if (val !== '') {
        newConf.actions.attachments = val
      } else {
        delete newConf.actions.attachments
        delete newConf.actions.share.file
      }
    } else if (typ === 'share') {
      if (!newConf.actions.share) {
        newConf.actions.share = {}
      }
      if (share === 'folder') {
        if (val !== '') newConf.actions.share.folder = { users: val, access: newConf.actions.share?.folder?.access || '34' }
        else delete newConf.actions.share.folder
      } else if (share === 'file') {
        if (val !== '') newConf.actions.share.file = { users: val, access: newConf.actions.share?.file?.access || '34' }
        else delete newConf.actions.share.file
      }
    } else if (typ === 'access') {
      if (!newConf.actions.share) {
        newConf.actions.share = {}
      }
      if (share === 'folder') {
        newConf.actions.share.folder = { ...newConf.actions.share.folder, access: val.target.value }
      } else if (share === 'file') {
        newConf.actions.share.file = { ...newConf.actions.share.file, access: val.target.value }
      }
    } else if (typ === 'mail') {
      if (!newConf.actions.share) {
        newConf.actions.share = {}
      }
      if (share === 'folder') {
        if (val.target.checked) newConf.actions.share.folder = { ...newConf.actions.share.folder, mail: true }
        else newConf.actions.share.folder = { ...newConf.actions.share.folder, mail: false }
      } else if (share === 'file') {
        if (val.target.checked) newConf.actions.share.file = { ...newConf.actions.share.file, mail: true }
        else newConf.actions.share.file = { ...newConf.actions.share.file, mail: false }
      }
    }

    setWorkDriveConf({ ...newConf })
  }

  console.log('workDriveConf', workDriveConf)

  const setCreateFolderSettings = (e, type, field) => {
    const newConf = { ...workDriveConf }
    if (type === 'name') {
      if (field) newConf.actions.create_folder.name += e.target.value
      else newConf.actions.create_folder.name = e.target.value
    } else if (e.target.checked) newConf.actions.create_folder.suffix = true
    else newConf.actions.create_folder.suffix = false
    setWorkDriveConf({ ...newConf })
  }

  const clsActionMdl = () => {
    setActionMdl({ show: false })
  }

  const openCreateFolderMdl = () => {
    if (!workDriveConf.actions?.create_folder) {
      workDriveConf.actions.create_folder = { name: '', suffix: false }
    }

    setActionMdl({ show: 'create_folder' })
  }

  const getFileUpFields = () => formFields.filter(itm => (itm.type === 'file-up')).map(itm => ({ label: itm.name, value: itm.key }))

  useEffect(() => {
    const usersOption = []
    if (workDriveConf.team && !workDriveConf.default?.users?.[workDriveConf.team]) {
      refreshUsers(formID, workDriveConf, setWorkDriveConf, setisLoading, setSnackbar)
    }

    if (workDriveConf.default?.users?.[workDriveConf.team]) {
      usersOption[0] = { label: 'All Users', value: 'all_users' }
      const teamUsers = workDriveConf.default.users[workDriveConf.team]

      for (let i = 0; i < teamUsers.length; i += 1) {
        usersOption[i + 1] = { label: teamUsers[i].userName, value: teamUsers[i].userId }
      }
    }

    setUsers(usersOption)
  }, [formID, setSnackbar, setWorkDriveConf, workDriveConf, workDriveConf.team])

  return (
    <div className="pos-rel">
      <div className="d-flx flx-wrp">
        <TitleModal action={openCreateFolderMdl}>
          <TableCheckBox onChange={(e) => actionHandler(e, 'create_folder')} checked={'create_folder' in workDriveConf?.actions} className="wdt-200 mt-4 mr-2" value="Create_Folder" title="Create New Folder" subTitle="Create a new folder in the selected folder" />
        </TitleModal>
        <TableCheckBox onChange={() => setActionMdl({ show: 'attachments' })} checked={'attachments' in workDriveConf.actions} className="wdt-200 mt-4 mr-2" value="Attachment" title="Upload Files" subTitle="Add attachments from BitForm to Zoho Workdrive folder." />
      </div>

      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt="Ok"
        show={actionMdl.show === 'create_folder'}
        close={clsActionMdl}
        action={clsActionMdl}
        title="Create New Folder"
      >
        <div className="btcd-hr mt-2" />
        <div className="mt-2">Add field value to use as folder name</div>
        <select
          value=""
          className="btcd-paper-inp mt-2 w-5"
          onChange={e => setCreateFolderSettings(e, 'name', 1)}
        >
          <option value="">Select Field</option>
          {formFields !== null && formFields.map(f => !f.type.match(/^(file-up|recaptcha)$/) && <option key={f.key} value={`\${${f.key}}`}>{f.name}</option>)}
        </select>
        <input type="text" className="btcd-paper-inp mt-2" value={workDriveConf.actions?.create_folder?.name} onChange={e => setCreateFolderSettings(e, 'name')} placeholder="New Folder Name" />
        <TableCheckBox onChange={(e) => setCreateFolderSettings(e, 'suffix')} checked={workDriveConf?.actions?.create_folder?.suffix} className="wd-100 mt-4 mr-2" value="Add_Suffix" title="Add Random Number" subTitle="Zoho doesn't support duplicate folder name, if you want to make it uniquely you can add random number after the folder name." />

        {workDriveConf.default?.teamFolders?.[workDriveConf.team]?.[folder]?.type === 'private'
        && (
        <>
          <div className="btcd-hr mt-2" />
          <div className="mt-2">Share with users: (optional)</div>
          {isLoading ? (
            <Loader style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 45,
              transform: 'scale(0.5)',
            }}
            />
          ) : (
            <div className="flx flx-between mt-1">
              <MultiSelect
                defaultValue={workDriveConf.actions?.share?.folder?.users}
                className="mt-2 w-9"
                onChange={(val) => actionHandler(val, 'share', 'folder')}
                options={users}
              />
              <button onClick={() => refreshUsers(formID, workDriveConf, setWorkDriveConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Team Users"' }} type="button" disabled={isLoading}>&#x21BB;</button>
            </div>
          )}
          <select
            value={workDriveConf.actions?.share?.folder?.access || ''}
            className="btcd-paper-inp mt-1 w-5"
            onChange={e => actionHandler(e, 'access', 'folder')}
          >
            {!workDriveConf.actions?.share?.folder?.users
              ? <option value="">Access Level</option>
              : (
                <>
                  <option value="34">View</option>
                  <option value="5">Edit</option>
                  <option value="3">Organize</option>
                  <option value="7">Upload</option>
                </>
              )}
          </select>
          {workDriveConf.actions?.share?.folder?.users && <TableCheckBox onChange={(e) => actionHandler(e, 'mail', 'folder')} checked={workDriveConf?.actions?.share?.folder?.mail} className="wd-100 mt-4 mr-2" value="Send_Mail" title="Send Notification Mail" />}
        </>
        )}
      </ConfirmModal>

      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt="Ok"
        show={actionMdl.show === 'attachments'}
        close={clsActionMdl}
        action={clsActionMdl}
        title="Select Attachment"
      >
        <div className="btcd-hr mt-2" />
        <div className="mt-2">Select file upload fields</div>
        <MultiSelect
          defaultValue={workDriveConf.actions.attachments}
          className="mt-2 w-9"
          onChange={(val) => actionHandler(val, 'attachments')}
          options={getFileUpFields()}
        />

        {workDriveConf.default?.teamFolders?.[workDriveConf.team]?.[folder]?.type === 'private'
        && (
        <>
          <div className="btcd-hr mt-2" />
          <div className="mt-2">Share with users: (optional)</div>
          {isLoading ? (
            <Loader style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 45,
              transform: 'scale(0.5)',
            }}
            />
          ) : (
            <div className="flx flx-between mt-1">
              <MultiSelect
                defaultValue={workDriveConf.actions?.share?.file?.users}
                className="mt-2 w-9"
                onChange={(val) => actionHandler(val, 'share', 'file')}
                options={users}
              />
              <button onClick={() => refreshUsers(formID, workDriveConf, setWorkDriveConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Team Users"' }} type="button" disabled={isLoading}>&#x21BB;</button>
            </div>
          )}
          <select
            value={workDriveConf.actions?.share?.file?.access || ''}
            className="btcd-paper-inp mt-1 w-5"
            onChange={e => actionHandler(e, 'access', 'file')}
          >
            {!workDriveConf.actions?.share?.file?.users
              ? <option value="">Access Level</option>
              : (
                <>
                  <option value="34">View</option>
                  <option value="5">Edit</option>
                  <option value="4">Share</option>
                  <option value="6">View and Comment</option>
                </>
              )}
          </select>
          {workDriveConf.actions?.share?.file?.users && <TableCheckBox onChange={(e) => actionHandler(e, 'mail', 'file')} checked={workDriveConf?.actions?.share?.file?.mail} className="wd-100 mt-4 mr-2" value="Send_Mail" title="Send Notification Mail" />}
        </>
        )}
      </ConfirmModal>

    </div>
  )
}
