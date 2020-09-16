import bitsFetch from '../../../Utils/bitsFetch'

export const handleInput = (e, analyticsConf, setAnalyticsConf, formID, setisLoading, setSnackbar, isNew, error, setError) => {
  let newConf = { ...analyticsConf }
  if (isNew) {
    const rmError = { ...error }
    rmError[e.target.name] = ''
    setError({ ...rmError })
  }
  newConf[e.target.name] = e.target.value

  switch (e.target.name) {
    case 'workspace':
      newConf = workspaceChange(newConf, formID, setAnalyticsConf, setisLoading, setSnackbar)
      break;
    case 'table':
      newConf = tableChange(newConf, formID, setAnalyticsConf, setisLoading, setSnackbar)
      break;
    default:
      break;
  }
  setAnalyticsConf({ ...newConf })
}

export const workspaceChange = (analyticsConf, formID, setAnalyticsConf, setisLoading, setSnackbar) => {
  const newConf = { ...analyticsConf }
  newConf.table = ''
  newConf.field_map = [{ formField: '', zohoFormField: '' }]

  if (!newConf?.default?.tables?.[analyticsConf.workspace]) {
    refreshTables(formID, newConf, setAnalyticsConf, setisLoading, setSnackbar)
  } else if (Object.keys(newConf?.default?.tables?.[analyticsConf.workspace]).length === 1) {
    newConf.table = newConf?.default?.tables?.[analyticsConf.workspace][0].viewName

    if (!newConf?.default?.tables?.headers?.[newConf.table]) {
      refreshTableHeaders(formID, newConf, setAnalyticsConf, setisLoading, setSnackbar)
    }
  }

  return newConf
}

export const tableChange = (analyticsConf, formID, setAnalyticsConf, setisLoading, setSnackbar) => {
  const newConf = { ...analyticsConf }
  newConf.field_map = [{ formField: '', zohoFormField: '' }]

  if (!newConf?.default?.tables?.headers?.[analyticsConf.table]) {
    refreshTableHeaders(formID, newConf, setAnalyticsConf, setisLoading, setSnackbar)
  }

  return newConf
}

export const refreshWorkspaces = (formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshModulesRequestParams = {
    formID,
    id: analyticsConf.id,
    dataCenter: analyticsConf.dataCenter,
    clientId: analyticsConf.clientId,
    clientSecret: analyticsConf.clientSecret,
    tokenDetails: analyticsConf.tokenDetails,
    ownerEmail: analyticsConf.ownerEmail,
  }
  bitsFetch(refreshModulesRequestParams, 'bitforms_zanalytics_refresh_workspaces')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...analyticsConf }
        if (!newConf.default) {
          newConf.default = {}
        }
        if (result.data.workspaces) {
          newConf.default.workspaces = result.data.workspaces
        }
        setSnackbar({ show: true, msg: 'Workspaces refreshed' })
        setAnalyticsConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Workspaces refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Workspaces refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshTables = (formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar) => {
  const { workspace } = analyticsConf
  if (!workspace) {
    return
  }

  setisLoading(true)
  const refreshTablesRequestParams = {
    formID,
    workspace,
    dataCenter: analyticsConf.dataCenter,
    clientId: analyticsConf.clientId,
    clientSecret: analyticsConf.clientSecret,
    tokenDetails: analyticsConf.tokenDetails,
    ownerEmail: analyticsConf.ownerEmail,
  }
  bitsFetch(refreshTablesRequestParams, 'bitforms_zanalytics_refresh_tables')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...analyticsConf }
        if (result.data.tables) {
          if (!newConf.default.tables) {
            newConf.default.tables = {}
          }
          newConf.default.tables[workspace] = result.data.tables
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setSnackbar({ show: true, msg: 'Tables refreshed' })
        setAnalyticsConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: 'Tables refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshTableHeaders = (formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar) => {
  const { workspace, table } = analyticsConf
  if (!table) {
    return
  }

  setisLoading(true)
  const refreshTableHeadersRequestParams = {
    formID,
    workspace,
    table,
    dataCenter: analyticsConf.dataCenter,
    clientId: analyticsConf.clientId,
    clientSecret: analyticsConf.clientSecret,
    tokenDetails: analyticsConf.tokenDetails,
    ownerEmail: analyticsConf.ownerEmail,
  }
  bitsFetch(refreshTableHeadersRequestParams, 'bitforms_zanalytics_refresh_table_headers')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...analyticsConf }
        if (result.data.table_headers) {
          if (!newConf.default.tables.headers) {
            newConf.default.tables.headers = {}
          }
          newConf.default.tables.headers[table] = result.data.table_headers
          setSnackbar({ show: true, msg: 'Table Headers refreshed' })
        } else {
          setSnackbar({ show: true, msg: "Zoho didn't provide column names for this table" })
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setAnalyticsConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: 'Table Headers refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}
