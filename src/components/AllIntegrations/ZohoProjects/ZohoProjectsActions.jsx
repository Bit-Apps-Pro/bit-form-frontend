/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import ConfirmModal from '../../ConfirmModal'
import TableCheckBox from '../../ElmSettings/Childs/TableCheckBox'
import Loader from '../../Loaders/Loader'
import { refreshUsers, refreshTaskLays, refreshTags, refreshGroups } from './ZohoProjectsCommonFunc'

export default function ZohoProjectsActions({ event, projectsConf, setProjectsConf, formID, formFields, setSnackbar }) {
  const [isLoading, setisLoading] = useState(false)
  const [actionMdl, setActionMdl] = useState({ show: false })

  const allUsers = () => {
    let allUsers = []

    if (projectsConf?.projectId) {
      if (projectsConf?.default?.users?.[projectsConf.portalId]?.[projectsConf.projectId]?.length > 0) {
        allUsers = projectsConf.default.users[projectsConf.portalId][projectsConf.projectId]
      }
    } else if (event !== 'project' && projectsConf?.subEvent.includes('project')) {
      if (projectsConf?.default?.users?.[projectsConf.portalId].length > 0) {
        let owner = '',
          users = ''
        if (projectsConf.actions.project.owner)
          owner = projectsConf.default.users[projectsConf.portalId].filter(user => user.userId === projectsConf.actions.project.owner)

        if (projectsConf.actions.project.users)
          users = projectsConf?.actions?.project?.users?.split(',').map(user => projectsConf.default.users[projectsConf.portalId].filter(usr => usr.userEmail === user)).map(filteredUser => filteredUser[0])

        if (owner && users) {
          users.push(owner[0])
          allUsers = users
        } else if (owner && !users) {
          allUsers = owner
        } else if (users && !owner) {
          allUsers = users
        }
      }
    } else if (projectsConf?.default?.users?.[projectsConf.portalId].length > 0) {
      allUsers = projectsConf.default.users[projectsConf.portalId]
    }

    return allUsers
  }

  const actionHandler = (val, typ) => {
    const newConf = { ...projectsConf }
    if (val !== '') newConf.actions[event][typ] = val
    else delete newConf.actions[event][typ]
    setProjectsConf({ ...newConf })
  }

  const openUsersModal = (attr) => {
    if (projectsConf?.projectId && !projectsConf.default?.users?.[projectsConf.portalId]?.[projectsConf.projectId]) {
      refreshUsers(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)
    } else if (!projectsConf.default?.users?.[projectsConf.portalId]) {
      refreshUsers(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)
    }
    if (!attr) setActionMdl({ show: 'owner' })
    else setActionMdl({ show: attr })
    if (attr === 'users' && !projectsConf?.actions?.project?.role) {
      projectsConf.actions.project.role = 'employee'
    }
  }

  const openTaskLayModal = () => {
    if (!projectsConf.default?.taskLays?.[projectsConf.portalId]) {
      refreshTaskLays(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)
    }
    setActionMdl({ show: 'task_layout' })
  }

  const openGroupModal = () => {
    if (!projectsConf.default?.groups?.[projectsConf.portalId]) {
      refreshGroups(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)
    }
    setActionMdl({ show: 'group' })
  }

  const getTags = () => {
    const arr = [
      { title: 'Zoho Projects Tags', type: 'group', childs: [] },
      { title: 'Form Fields', type: 'group', childs: [] },
    ]

    if (projectsConf.default.tags?.[projectsConf.portalId]) {
      arr[0].childs = Object.values(projectsConf.default.tags?.[projectsConf.portalId]).map(tag => ({ label: tag.tagName, value: tag.tagId }))
    }

    arr[1].childs = formFields.map(itm => ({ label: itm.name, value: `\${${itm.key}}` }))
    return arr
  }

  const clsActionMdl = () => {
    setActionMdl({ show: false })
  }

  return (
    <div className="pos-rel">
      <div className="d-flx flx-wrp">

        {event !== 'tasklist' && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TableCheckBox onChange={() => openUsersModal()} checked={'owner' in projectsConf.actions[event]} className="wdt-200 mt-4 mr-2" value={`${event}_owner`} title={`${event.charAt(0).toUpperCase() + event.slice(1)} Owner`} subTitle={`Add an owner to ${event}  pushed to Zoho Projects.`} />
            {!projectsConf.actions[event].owner && (
              <small style={{ marginLeft: 30, marginTop: 10, color: 'red' }}>
                {`${event} owner is required`}
              </small>
            )}
          </div>
        )}

        {event === 'project' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TableCheckBox onChange={openTaskLayModal} checked={'tasklayoutid' in projectsConf.actions.project} className="wdt-200 mt-4 mr-2" value="Task_Owner" title="Task Layout" subTitle="Add a layout to project pushed to Zoho Projects." />
              {!projectsConf.actions.project.tasklayoutid && <small style={{ marginLeft: 30, marginTop: 10, color: 'red' }}>task layout is required</small>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TableCheckBox onChange={() => setActionMdl({ show: 'access' })} checked={'public' in projectsConf.actions.project} className="wdt-200 mt-4 mr-2" value="Project_Access" title="Project Access" subTitle="Change the access control of project" />
              {!projectsConf.actions.project.public && <small style={{ marginLeft: 30, marginTop: 10, color: 'red' }}>project access is required</small>}
            </div>
            <TableCheckBox onChange={() => openUsersModal('users')} checked={'users' in projectsConf.actions.project} className="wdt-200 mt-4 mr-2" value="Project_User" title="Project user" subTitle="Assign users to project pushed to Zoho Projects." />
            <TableCheckBox onChange={openGroupModal} checked={'group_id' in projectsConf.actions.project} className="wdt-200 mt-4 mr-2" value="Project_Group" title="Group Name" subTitle="Add a group to project pushed to Zoho Projects." />
          </>
        )}

        {(event === 'milestone' || event === 'tasklist' || event === 'issue') && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TableCheckBox onChange={() => setActionMdl({ show: 'flag' })} checked={'flag' in projectsConf.actions[event]} className="wdt-200 mt-4 mr-2" value={`${event}_flag`} title={`${event.charAt(0).toUpperCase() + event.slice(1)} Flag`} subTitle={`Add a flag to ${event} pushed to Zoho Projects.`} />
              {!projectsConf.actions[event].flag && <small style={{ marginLeft: 30, marginTop: 10, color: 'red' }}>{`${event} flag is required`}</small>}
            </div>
          </>
        )}

        {event === 'issue' && (
          <>
            <TableCheckBox onChange={() => openUsersModal('followers')} checked={'followers' in projectsConf.actions[event]} className="wdt-200 mt-4 mr-2" value="Issue_Followers" title="Issue Followers" subTitle="Add followers to issue pushed to Zoho Projects" />
            {projectsConf?.projectId && ['severity', 'classification', 'module', 'priority']
              .map(act => <TableCheckBox key={act} onChange={() => setActionMdl({ show: act })} checked={(act === 'priority' ? 'reproducible_id' : `${act}_id`) in projectsConf.actions[event]} className="wdt-200 mt-4 mr-2" value={act} title={`Issue ${act.charAt(0).toUpperCase() + act.slice(1)}`} subTitle={`Add ${act} to issue pushed to Zoho Projects`} />)}
          </>
        )}

        {(event === 'task' || event === 'subtask' || event === 'issue') && (
          <div className="coming-feature pos-rel mt-2">
            <TableCheckBox onChange={() => setActionMdl({ show: 'attachments' })} checked={'attachments' in projectsConf.actions[event]} className="wdt-200 mt-4 mr-2" value={`${event}_attachments`} title={`${event.charAt(0).toUpperCase() + event.slice(1)} Attachments`} subTitle={`Add attachments to ${event} pushed to Zoho Projects.`} />
          </div>
        )}

        <div className="coming-feature pos-rel mt-2">
          <TableCheckBox onChange={() => setActionMdl({ show: 'tags' })} checked={'tags' in projectsConf.actions[event]} className="wdt-200 mt-4 mr-2" value={`${event}_tags`} title={`${event.charAt(0).toUpperCase() + event.slice(1)} Tags`} subTitle={`Add tags to ${event} pushed to Zoho Projects.`} />
        </div>
      </div>

      {/* Modals */}
      {event !== 'tasklist' && (
        <ConfirmModal
          className="custom-conf-mdl"
          mainMdlCls="o-v"
          btnClass="blue"
          btnTxt="Ok"
          show={actionMdl.show === 'owner'}
          close={clsActionMdl}
          action={clsActionMdl}
          title={`${event.charAt(0).toUpperCase() + event.slice(1)} Owner`}
        >
          <div className="btcd-hr mt-2" />
          {isLoading ? (
            <Loader style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 45,
              transform: 'scale(0.5)',
            }}
            />
          )
            : (
              <div className="flx flx-between mt-2">
                {(event === 'task' || event === 'subtask')
                  ? (
                    <MultiSelect
                      defaultValue={projectsConf.actions[event].owner}
                      className="mt-2 w-9"
                      onChange={(val) => actionHandler(val, 'owner')}
                      options={allUsers().map(user => ({ label: user.userName, value: user.userId }))}
                    />
                  )
                  : (
                    <select
                      value={projectsConf.actions[event].owner}
                      className="btcd-paper-inp"
                      onChange={e => actionHandler(e.target.value, 'owner')}
                    >
                      <option value="">Select Owner</option>
                      {allUsers().length > 0 && allUsers().map(user => <option key={user.userId} value={user.userId}>{user.userName}</option>)}
                    </select>
                  )}

                <button onClick={() => refreshUsers(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Portal Users"' }} type="button" disabled={isLoading}>&#x21BB;</button>
              </div>
            )}
        </ConfirmModal>
      )}

      {event === 'project' && (
        <>
          <ConfirmModal
            className="custom-conf-mdl"
            mainMdlCls="o-v"
            btnClass="blue"
            btnTxt="Ok"
            show={actionMdl.show === 'task_layout'}
            close={clsActionMdl}
            action={clsActionMdl}
            title="Task Layout"
          >
            <div className="btcd-hr mt-2" />
            {isLoading ? (
              <Loader style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,
                transform: 'scale(0.5)',
              }}
              />
            )
              : (
                <div className="flx flx-between mt-2">
                  <select
                    value={projectsConf.actions.project.tasklayoutid}
                    className="btcd-paper-inp"
                    onChange={e => actionHandler(e.target.value, 'tasklayoutid')}
                  >
                    <option value="">Select Layout</option>
                    {projectsConf.default?.taskLays?.[projectsConf.portalId]?.map(taskLay => <option key={taskLay.taskLayId} value={taskLay.taskLayId}>{taskLay.taskLayName}</option>)}
                  </select>
                  <button onClick={() => refreshTaskLays(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Task Layouts"' }} type="button" disabled={isLoading}>&#x21BB;</button>
                </div>
              )}
          </ConfirmModal>

          <ConfirmModal
            className="custom-conf-mdl"
            mainMdlCls="o-v"
            btnClass="blue"
            btnTxt="Ok"
            show={actionMdl.show === 'access'}
            close={clsActionMdl}
            action={clsActionMdl}
            title="Access Control"
          >
            <div className="btcd-hr mt-2" />
            <div className="flx flx-between mt-2">
              <select
                value={projectsConf.actions.project.public}
                className="btcd-paper-inp"
                onChange={e => actionHandler(e.target.value, 'public')}
              >
                <option value="">Select Access</option>
                <option value="no">Private</option>
                <option value="yes">Public</option>
              </select>
            </div>

          </ConfirmModal>

          <ConfirmModal
            className="custom-conf-mdl"
            mainMdlCls="o-v"
            btnClass="blue"
            btnTxt="Ok"
            show={actionMdl.show === 'users'}
            close={clsActionMdl}
            action={clsActionMdl}
            title="Assign Project Users"
          >
            <div className="btcd-hr mt-2" />
            {isLoading ? (
              <Loader style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,
                transform: 'scale(0.5)',
              }}
              />
            )
              : (
                <>
                  <div className="flx flx-between mt-2">
                    <MultiSelect
                      defaultValue={projectsConf.actions[event].users}
                      className="mt-2 w-9"
                      onChange={(val) => actionHandler(val, 'users')}
                      options={allUsers().map(user => ({ label: user.userName, value: user.userEmail }))}
                    />
                    <button onClick={() => refreshUsers(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Project Users"' }} type="button" disabled={isLoading}>&#x21BB;</button>
                  </div>
                  <select
                    value={projectsConf.actions.project.role}
                    className="btcd-paper-inp mt-3"
                    onChange={e => actionHandler(e.target.value, 'role')}
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="contractor">Contractor</option>
                  </select>
                </>
              )}
          </ConfirmModal>

          <ConfirmModal
            className="custom-conf-mdl"
            mainMdlCls="o-v"
            btnClass="blue"
            btnTxt="Ok"
            show={actionMdl.show === 'group'}
            close={clsActionMdl}
            action={clsActionMdl}
            title="Project Group"
          >
            <div className="btcd-hr mt-2" />
            {isLoading ? (
              <Loader style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,
                transform: 'scale(0.5)',
              }}
              />
            )
              : (
                <div className="flx flx-between mt-2">
                  <select
                    value={projectsConf.actions.project.group_id}
                    className="btcd-paper-inp"
                    onChange={e => actionHandler(e.target.value, 'group_id')}
                  >
                    <option value="">Select Group</option>
                    {projectsConf.default?.groups?.[projectsConf.portalId]?.map(group => <option key={group.groupId} value={group.groupId}>{group.groupName}</option>)}
                  </select>
                  <button onClick={() => refreshGroups(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Project Groups"' }} type="button" disabled={isLoading}>&#x21BB;</button>
                </div>
              )}
          </ConfirmModal>
        </>
      )}

      {(event === 'tasklist' || event === 'milestone' || event === 'issue') && (
        <ConfirmModal
          className="custom-conf-mdl"
          mainMdlCls="o-v"
          btnClass="blue"
          btnTxt="Ok"
          show={actionMdl.show === 'flag'}
          close={clsActionMdl}
          action={clsActionMdl}
          title={`${event.charAt(0).toUpperCase() + event.slice(1)} Flag`}
        >
          <div className="btcd-hr mt-2" />
          <div className="flx flx-between mt-2">
            <select
              value={projectsConf.actions[event].flag}
              className="btcd-paper-inp"
              onChange={e => actionHandler(e.target.value, 'flag')}
            >
              <option value="">Select Flag</option>
              <option value={event === 'issue' ? 'Internal' : 'internal'}>Internal</option>
              <option value={event === 'issue' ? 'External' : 'external'}>External</option>
            </select>
          </div>
        </ConfirmModal>
      )}

      {(event === 'task' || event === 'subtask' || event === 'issue') && (
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
            defaultValue={projectsConf.actions[event].attachments}
            className="mt-2 w-9"
            onChange={(val) => actionHandler(val, 'attachments')}
            options={formFields.filter(itm => (itm.type === 'file-up')).map(itm => ({ label: itm.name, value: itm.key }))}
          />
        </ConfirmModal>
      )}

      {event === 'issue' && (
        <>
          <ConfirmModal
            className="custom-conf-mdl"
            mainMdlCls="o-v"
            btnClass="blue"
            btnTxt="Ok"
            show={actionMdl.show === 'followers'}
            close={clsActionMdl}
            action={clsActionMdl}
            title="Issue Followers"
          >
            <div className="btcd-hr mt-2" />
            {isLoading ? (
              <Loader style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 45,
                transform: 'scale(0.5)',
              }}
              />
            )
              : (
                <div className="flx flx-between mt-2">
                  <MultiSelect
                    defaultValue={projectsConf.actions[event].bug_followers}
                    className="mt-2 w-9"
                    onChange={(val) => actionHandler(val, 'bug_followers')}
                    options={projectsConf.default?.users?.[projectsConf.portalId].map(user => ({ label: user.userName, value: user.userId }))}
                  />
                  <button onClick={() => refreshUsers(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Portal Users"' }} type="button" disabled={isLoading}>&#x21BB;</button>
                </div>
              )}
          </ConfirmModal>

          {projectsConf?.projectId && ['severity', 'classification', 'module', 'priority']
            .map(act => <ConfirmModal
              key={act}
              className="custom-conf-mdl"
              mainMdlCls="o-v"
              btnClass="blue"
              btnTxt="Ok"
              show={actionMdl.show === act}
              close={clsActionMdl}
              action={clsActionMdl}
              title={`Issue ${act.charAt(0).toUpperCase() + act.slice(1)}`}
            >
              <div className="btcd-hr mt-2" />
              <div className="flx flx-between mt-2">
                <select
                  value={projectsConf.actions[event][act === 'priority' ? 'reproducible_id' : `${act}_id`]}
                  className="btcd-paper-inp"
                  onChange={e => actionHandler(e.target.value, act === 'priority' ? 'reproducible_id' : `${act}_id`)}
                >
                  <option value="">{`Select ${act.charAt(0).toUpperCase() + act.slice(1)}`}</option>
                  {projectsConf.default?.fields?.[projectsConf.portalId]?.[projectsConf.projectId]?.[event]?.defaultfields?.[`${act}_details`] && Object.values(projectsConf.default.fields[projectsConf.portalId][projectsConf.projectId][event].defaultfields[`${act}_details`]).map(field =>
                    <option key={field[`${act}_id`]} value={field[`${act}_id`]}>
                      {field[`${act}_name`]}
                    </option>
                  )}
                </select>
              </div>
            </ConfirmModal>
            )}
        </>
      )}

      <ConfirmModal
        className="custom-conf-mdl"
        mainMdlCls="o-v"
        btnClass="blue"
        btnTxt="Ok"
        show={actionMdl.show === 'tags'}
        close={clsActionMdl}
        action={clsActionMdl}
        title={`${event.charAt(0).toUpperCase() + event.slice(1)} Tags`}
      >
        <div className="btcd-hr mt-2" />
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
            <div className="flx flx-between mt-2">
              <MultiSelect
                className="msl-wrp-options"
                defaultValue={projectsConf.actions[event].tags}
                options={getTags()}
                onChange={(val) => actionHandler(val, 'tags')}
                customValue
              />
              <button onClick={() => refreshTags(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)} className="icn-btn sh-sm ml-2 mr-2 tooltip" style={{ '--tooltip-txt': '"Refresh Tags"' }} type="button" disabled={isLoading}>&#x21BB;</button>
            </div>
          )}
      </ConfirmModal>

    </div>
  )
}
