import bitsFetch from '../../../Utils/bitsFetch'

const clearLowerEvents = (projectsConf, name) => {
  const newConf = { ...projectsConf }
  const eventIdSeq = ['projectId', 'milestoneId', 'tasklistFlag', 'tasklistId', 'taskId']
  eventIdSeq.splice(eventIdSeq.indexOf(name) + 1)
    // eslint-disable-next-line array-callback-return
    .map(event => {
      if (newConf?.[event]) { newConf[event] = '' }
    })

  return { ...newConf }
}

export const regenerateMappedField = (formID, projectsConf, setProjectsConf, setisLoading, setSnackbar) => {
  const newConf = { ...projectsConf }
  newConf.subEvent.map(event => {
    if ((newConf?.projectId && !newConf?.default?.fields?.[newConf.portalId]?.[newConf.projectId]?.[event]) || !newConf?.default?.fields?.[newConf.portalId]?.[event]) {
      refreshFields(formID, newConf, setProjectsConf, setisLoading, setSnackbar, event)
    } else newConf.field_map[event] = generateMappedField(newConf, event)
  })
  return { ...newConf }
}

export const handleInput = (e, projectsConf, setProjectsConf, formID, setisLoading, setSnackbar, isNew, error, setError) => {
  let newConf = { ...projectsConf }
  const inputName = e.target.name
  const inputValue = e.target.value
  if (isNew) {
    const rmError = { ...error }
    rmError[inputName] = ''
    setError({ ...rmError })
  }
  newConf[inputName] = inputValue

  switch (inputName) {
    case 'portalId':
      newConf = portalChange(newConf, formID, setProjectsConf, setisLoading, setSnackbar)
      break;
    case 'event':
      newConf.subEvent = [inputValue]
      newConf.field_map = {}
      newConf.actions[inputValue] = {}
      newConf = eventChange(clearLowerEvents(newConf), formID, setProjectsConf, setisLoading, setSnackbar)
      break;
    case 'projectId':
    case 'milestoneId':
    case 'tasklistId':
    case 'taskId': {
      // clear lower event value
      newConf = clearLowerEvents(newConf, inputName)
      // close create new event
      const subEvent = inputName.split('Id')[0]
      if (newConf.subEvent.includes(subEvent)) newConf.subEvent.splice(newConf.subEvent.indexOf(subEvent), 1)

      if (!['project', 'milestone'].includes(newConf.event) && subEvent === 'project' && !projectsConf?.default?.milestones?.[newConf.portalId]) {
        refreshMilestones(formID, newConf, setProjectsConf, setisLoading, setSnackbar)
      }
      if (newConf.event === 'subtask' && subEvent !== 'task') {
        refreshTasks(formID, newConf, setProjectsConf, setisLoading, setSnackbar)
      }
      newConf = regenerateMappedField(formID, newConf, setProjectsConf, setisLoading, setSnackbar)
    }
      break;
    case 'tasklistFlag':
      newConf.tasklistId = ''
      if (inputValue && newConf.subEvent.includes('tasklist')) newConf.subEvent.splice(newConf.subEvent.indexOf('tasklist'), 1)
      if (inputValue && ['task', 'subtask'].includes(newConf.event) && !projectsConf?.default?.milestones?.[newConf.portalId]?.[inputValue]) {
        refreshTasklists(formID, newConf, setProjectsConf, setisLoading, setSnackbar)
      }
      break;
    default:
      break;
  }

  setProjectsConf({ ...newConf })
}

export const portalChange = (projectsConf, formID, setProjectsConf, setisLoading, setSnackbar) => {
  const newConf = { ...projectsConf }
  newConf.event = ''
  newConf.field_map = {}
  newConf.actions = {}

  if (!projectsConf.default.tags?.[newConf.portalId]) refreshTags(formID, projectsConf, setProjectsConf, setisLoading, setSnackbar)

  if (!projectsConf.default.projects?.[newConf.portalId]) refreshProjects(formID, newConf, setProjectsConf, setisLoading, setSnackbar)

  return newConf
}

export const eventChange = (projectsConf, formID, setProjectsConf, setisLoading, setSnackbar) => {
  const newConf = { ...projectsConf }
  newConf.field_map = {}
  newConf.field_map[newConf.event] = [{ formField: '', zohoFormField: '' }]

  if (newConf?.event && !newConf?.default?.fields?.[newConf.portalId]?.[newConf.event]) {
    refreshFields(formID, newConf, setProjectsConf, setisLoading, setSnackbar)
  } else {
    newConf.field_map[newConf.event] = generateMappedField(newConf)
  }

  return newConf
}

export const refreshPortals = (formID, projectsConf, setProjectsConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshPortalsRequestParams = {
    formID,
    id: projectsConf.id,
    dataCenter: projectsConf.dataCenter,
    clientId: projectsConf.clientId,
    clientSecret: projectsConf.clientSecret,
    tokenDetails: projectsConf.tokenDetails,
  }
  bitsFetch(refreshPortalsRequestParams, 'bitforms_zprojects_refresh_portals')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...projectsConf }
        if (result.data.portals) {
          if (Object.keys(result.data.portals).length > 0) {
            newConf.default = { ...newConf.default, portals: result.data.portals }
            setSnackbar({ show: true, msg: 'Portals refreshed' })
          } else setSnackbar({ show: true, msg: 'No Portal Found' })
        }
        if (result.data.tokenDetails) newConf.tokenDetails = result.data.tokenDetails
        setSnackbar({ show: true, msg: 'Portals refreshed' })
        setProjectsConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Portals refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Portals refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshProjects = (formID, projectsConf, setProjectsConf, setisLoading, setSnackbar) => {
  const { id, portalId } = projectsConf
  setisLoading(true)
  const refreshProjectsRequestParams = {
    formID,
    id,
    dataCenter: projectsConf.dataCenter,
    clientId: projectsConf.clientId,
    clientSecret: projectsConf.clientSecret,
    tokenDetails: projectsConf.tokenDetails,
    portalId,
  }
  bitsFetch(refreshProjectsRequestParams, 'bitforms_zprojects_refresh_projects')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...projectsConf }
        if (!newConf.default.projects) newConf.default.projects = {}
        if (result.data.projects) {
          if (Object.keys(result.data.projects).length > 0) {
            newConf.default.projects[portalId] = result.data.projects
            setSnackbar({ show: true, msg: 'Projects refreshed' })
          } else setSnackbar({ show: true, msg: 'No Project Found' })
        }
        if (result.data.tokenDetails) newConf.tokenDetails = result.data.tokenDetails

        setProjectsConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Projects refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Projects refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshMilestones = (formID, projectsConf, setProjectsConf, setisLoading, setSnackbar) => {
  const { id, portalId, projectId } = projectsConf
  setisLoading(true)
  const refreshMilestonesRequestParams = {
    formID,
    id,
    dataCenter: projectsConf.dataCenter,
    clientId: projectsConf.clientId,
    clientSecret: projectsConf.clientSecret,
    tokenDetails: projectsConf.tokenDetails,
    portalId,
    projectId,
  }
  bitsFetch(refreshMilestonesRequestParams, 'bitforms_zprojects_refresh_milestones')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...projectsConf }
        if (result.data.milestones) {
          if (!newConf.default.milestones) newConf.default.milestones = {}
          if (Object.keys(result.data.milestones).length > 0) {
            newConf.default.milestones[projectId] = result.data.milestones
            setSnackbar({ show: true, msg: 'Milestones refreshed' })
          } else setSnackbar({ show: true, msg: 'No Milestone Found' })
        }
        if (result.data.tokenDetails) newConf.tokenDetails = result.data.tokenDetails

        setProjectsConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Milestones refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Milestones refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshTasklists = (formID, projectsConf, setProjectsConf, setisLoading, setSnackbar) => {
  const { id, portalId, projectId, tasklistFlag } = projectsConf
  setisLoading(true)
  const refreshTasklistsRequestParams = {
    formID,
    id,
    dataCenter: projectsConf.dataCenter,
    clientId: projectsConf.clientId,
    clientSecret: projectsConf.clientSecret,
    tokenDetails: projectsConf.tokenDetails,
    portalId,
    projectId,
    tasklistFlag,
  }
  if (projectsConf?.milestoneId) refreshTasklistsRequestParams.milestoneId = projectsConf.milestoneId
  bitsFetch(refreshTasklistsRequestParams, 'bitforms_zprojects_refresh_tasklists')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...projectsConf }
        if (Object.keys(result.data.tasklists).length > 0) {
          if (!newConf.default.tasklists) newConf.default.tasklists = {}
          if (!newConf.default.tasklists[portalId]) newConf.default.tasklists[portalId] = {}
          if (projectsConf?.milestoneId) {
            if (!newConf.default.tasklists[portalId][projectsConf.milestoneId]) newConf.default.tasklists[portalId][projectsConf.milestoneId] = {}
            newConf.default.tasklists[portalId][projectsConf.milestoneId][tasklistFlag] = result.data.tasklists
          } else {
            newConf.default.tasklists[portalId][tasklistFlag] = result.data.tasklists
          }
          setSnackbar({ show: true, msg: 'Tasklists refreshed' })
        } else {
          setSnackbar({ show: true, msg: 'No Tasklist Found' })
        }
        if (result.data.tokenDetails) newConf.tokenDetails = result.data.tokenDetails

        setProjectsConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Tasklists refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Tasklists refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshTasks = (formID, projectsConf, setProjectsConf, setisLoading, setSnackbar) => {
  const { id, portalId, projectId } = projectsConf
  setisLoading(true)
  const refreshTasksRequestParams = {
    formID,
    id,
    dataCenter: projectsConf.dataCenter,
    clientId: projectsConf.clientId,
    clientSecret: projectsConf.clientSecret,
    tokenDetails: projectsConf.tokenDetails,
    portalId,
    projectId,
  }
  if (projectsConf?.milestoneId) refreshTasksRequestParams.milestoneId = projectsConf.milestoneId
  if (projectsConf?.tasklistId) refreshTasksRequestParams.tasklistId = projectsConf.tasklistId

  bitsFetch(refreshTasksRequestParams, 'bitforms_zprojects_refresh_tasks')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...projectsConf }
        if (Object.keys(result.data.tasks).length > 0) {
          if (!newConf.default.tasks) newConf.default.tasks = {}
          if (!newConf.default.tasks[portalId]) newConf.default.tasks[portalId] = {}
          if (projectsConf?.milestoneId) {
            if (projectsConf?.tasklistId) {
              if (!newConf.default.tasks[portalId][projectsConf?.milestoneId]) newConf.default.tasks[portalId][projectsConf?.milestoneId] = {}
              newConf.default.tasks[portalId][projectsConf?.milestoneId][projectsConf?.tasklistId] = result.data.tasks
            } else {
              newConf.default.tasks[portalId][projectsConf?.milestoneId] = result.data.tasks
            }
          } else if (projectsConf?.tasklistId) newConf.default.tasks[portalId][projectsConf?.tasklistId] = result.data.tasks
          else newConf.default.tasks[portalId] = result.data.tasks
          setSnackbar({ show: true, msg: 'Tasks refreshed' })
        } else {
          setSnackbar({ show: true, msg: 'No Task Found' })
        }
        if (result.data.tokenDetails) newConf.tokenDetails = result.data.tokenDetails
        setProjectsConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Tasks refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Tasks refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshFields = (formID, projectsConf, setProjectsConf, setisLoading, setSnackbar, eve) => {
  let event
  if (!eve) { event = projectsConf.event } else { event = eve }
  const { portalId } = projectsConf
  setisLoading(true)
  const refreshFieldsRequestParams = {
    formID,
    dataCenter: projectsConf.dataCenter,
    clientId: projectsConf.clientId,
    clientSecret: projectsConf.clientSecret,
    tokenDetails: projectsConf.tokenDetails,
    portalId,
    event,
  }
  if (projectsConf?.projectId) refreshFieldsRequestParams.projectId = projectsConf.projectId
  bitsFetch(refreshFieldsRequestParams, 'bitforms_zprojects_refresh_fields')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...projectsConf }
        if (result.data.fields) {
          if (!newConf.default.fields) {
            newConf.default.fields = {}
          }
          if (!newConf.default.fields[portalId]) newConf.default.fields[portalId] = {}
          if (projectsConf?.projectId) {
            if (!newConf.default.fields[portalId][projectsConf.projectId]) newConf.default.fields[portalId][projectsConf.projectId] = {}
            newConf.default.fields[portalId][newConf.projectId][event] = { ...result.data }
          } else {
            newConf.default.fields[portalId][event] = { ...result.data }
          }

          newConf.field_map[event] = generateMappedField(newConf, event)
          setSnackbar({ show: true, msg: 'Fields refreshed' })
        } else {
          setSnackbar({ show: true, msg: `Fields refresh failed Cause:${result.data.data || result.data}. please try again` })
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setProjectsConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: 'Fields refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshUsers = (formID, projectsConf, setProjectsConf, setisLoading, setSnackbar) => {
  const { id, portalId } = projectsConf
  setisLoading(true)
  const refreshOwnersRequestParams = {
    formID,
    id,
    dataCenter: projectsConf.dataCenter,
    clientId: projectsConf.clientId,
    clientSecret: projectsConf.clientSecret,
    tokenDetails: projectsConf.tokenDetails,
    portalId: projectsConf.portalId,
  }
  bitsFetch(refreshOwnersRequestParams, 'bitforms_zprojects_refresh_users')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...projectsConf }
        if (!newConf.default.users) {
          newConf.default.users = {}
        }
        if (result.data.users) {
          if (Object.keys(result.data.users).length > 0) {
            newConf.default.users[portalId] = result.data.users
            setSnackbar({ show: true, msg: 'Owners refreshed' })
          } else setSnackbar({ show: true, msg: 'No Owner Found' })
        }
        if (result.data.tokenDetails) newConf.tokenDetails = result.data.tokenDetails
        setProjectsConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Owners refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Owners refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshTaskLays = (formID, projectsConf, setProjectsConf, setisLoading, setSnackbar) => {
  const { id, portalId } = projectsConf
  setisLoading(true)
  const refreshOwnersRequestParams = {
    formID,
    id,
    dataCenter: projectsConf.dataCenter,
    clientId: projectsConf.clientId,
    clientSecret: projectsConf.clientSecret,
    tokenDetails: projectsConf.tokenDetails,
    portalId,
  }
  bitsFetch(refreshOwnersRequestParams, 'bitforms_zprojects_refresh_task_layouts')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...projectsConf }
        if (!newConf.default.taskLays) {
          newConf.default.taskLays = {}
        }
        if (result.data.taskLays) {
          if (Object.keys(result.data.taskLays).length > 0) {
            newConf.default.taskLays[portalId] = result.data.taskLays
            setSnackbar({ show: true, msg: 'Task Layouts refreshed' })
          } else setSnackbar({ show: true, msg: 'No Task Layout Found' })
        }
        if (result.data.tokenDetails) newConf.tokenDetails = result.data.tokenDetails
        setProjectsConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Task Layouts refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Task Layouts refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshGroups = (formID, projectsConf, setProjectsConf, setisLoading, setSnackbar) => {
  const { id, portalId } = projectsConf
  setisLoading(true)
  const refreshOwnersRequestParams = {
    formID,
    id,
    dataCenter: projectsConf.dataCenter,
    clientId: projectsConf.clientId,
    clientSecret: projectsConf.clientSecret,
    tokenDetails: projectsConf.tokenDetails,
    portalId,
  }
  bitsFetch(refreshOwnersRequestParams, 'bitforms_zprojects_refresh_groups')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...projectsConf }
        if (!newConf.default.groups) {
          newConf.default.groups = {}
        }
        if (result.data.groups) {
          if (Object.keys(result.data.groups).length > 0) {
            newConf.default.groups[portalId] = result.data.groups
            setSnackbar({ show: true, msg: 'Project Groups refreshed' })
          } else setSnackbar({ show: true, msg: 'No Project Group Found' })
        }
        if (result.data.tokenDetails) newConf.tokenDetails = result.data.tokenDetails
        setProjectsConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Project Groups refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Project Groups refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshTags = (formID, projectsConf, setProjectsConf, setisLoading, setSnackbar) => {
  const { id, portalId } = projectsConf
  setisLoading(true)
  const refreshProductsRequestParams = {
    formID,
    id,
    dataCenter: projectsConf.dataCenter,
    clientId: projectsConf.clientId,
    clientSecret: projectsConf.clientSecret,
    tokenDetails: projectsConf.tokenDetails,
    portalId,
  }
  bitsFetch(refreshProductsRequestParams, 'bitforms_zprojects_refresh_tags')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...projectsConf }
        if (!newConf.default.tags) {
          newConf.default.tags = {}
        }
        if (result.data.tags) {
          if (Object.keys(result.data.tags).length > 0) {
            newConf.default.tags[portalId] = result.data.tags
            setSnackbar({ show: true, msg: 'Tags refreshed' })
          } else setSnackbar({ show: true, msg: 'No Tag Found' })
        }
        if (result.data.tokenDetails) newConf.tokenDetails = result.data.tokenDetails
        setProjectsConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Tags refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Tags refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const generateMappedField = (projectsConf, eve) => {
  let event
  if (!eve) { event = projectsConf.event } else { event = eve }

  if (projectsConf?.projectId) {
    return (projectsConf.default.fields[projectsConf.portalId][projectsConf.projectId][event].required.length > 0 ? projectsConf.default.fields[projectsConf.portalId][projectsConf.projectId][event].required?.map(field => ({ formField: '', zohoFormField: field })) : [{ formField: '', zohoFormField: '' }])
  }
  return (projectsConf.default.fields[projectsConf.portalId][event].required.length > 0 ? projectsConf.default.fields[projectsConf.portalId][event].required?.map(field => ({ formField: '', zohoFormField: field })) : [{ formField: '', zohoFormField: '' }])
}

export const checkMappedFields = projectsConf => {
  let allOk = true
  // eslint-disable-next-line array-callback-return
  projectsConf.subEvent.map(event => {
    let mappedFields = []
    if (projectsConf?.projectId) {
      mappedFields = projectsConf?.field_map?.[event] ? projectsConf.field_map[event].filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && projectsConf?.default?.fields?.[projectsConf.portalId]?.[projectsConf.projectId]?.[event]?.required.indexOf(mappedField.zohoFormField) !== -1)) : []
    } else {
      mappedFields = projectsConf?.field_map?.[event] ? projectsConf.field_map[event].filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && projectsConf?.default?.fields?.[projectsConf.portalId]?.[event]?.required.indexOf(mappedField.zohoFormField) !== -1)) : []
    }

    if (mappedFields.length > 0) {
      allOk = false
    }
  })
  if (allOk) return true
  return false
}

export const checkRequiredActions = projectsConf => {
  let allOk = true
  const required = {
    project: ['owner', 'tasklayoutid', 'public'],
    milestone: ['owner', 'flag'],
    tasklist: ['flag'],
    task: ['owner'],
    subtask: ['owner'],
    issue: ['owner', 'flag'],
  }
  projectsConf.subEvent.map(event => {
    required[event].map(act => {
      if (!projectsConf.actions[event][act]) allOk = false
    })
  })

  if (allOk) return true
  return false
}
