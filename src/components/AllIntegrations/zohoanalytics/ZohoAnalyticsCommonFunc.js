import bitsFetch from '../../../Utils/bitsFetch'

export const workspaceChange = (workspace, analyticsConf, formID, setAnalyticsConf, setisLoading, setSnackbar) => {
  const newConf = { ...analyticsConf }
  newConf.workspace = workspace
  newConf.actions = {}

  if (!newConf.default?.tables?.[workspace]) {
    refreshTables(workspace, formID, newConf, setAnalyticsConf, setisLoading, setSnackbar)
  }

  return newConf
}

export const tableChange = (table, analyticsConf, formID, setAnalyticsConf, setisLoading, setSnackbar) => {
  const newConf = { ...analyticsConf }
  newConf.table = table

  if (!newConf.default?.tables.headers?.[table]) {
    getTableHeaders(newConf.workspace, table, formID, newConf, setAnalyticsConf, setisLoading, setSnackbar)
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
  bitsFetch(refreshModulesRequestParams, 'bitforms_zanalysis_refresh_workspaces')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...analyticsConf }
        if (result.data.workspaces) {
          newConf.default = { ...newConf.default, workspaces: result.data.workspaces }
        }
        setAnalyticsConf({ ...newConf })
        setSnackbar({ show: true, msg: 'Workspaces refreshed' })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Workspaces refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Workspaces refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshTables = (workspace, formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar) => {
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
  bitsFetch(refreshTablesRequestParams, 'bitforms_zanalysis_refresh_tables')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...analyticsConf }
        if (result.data.tables) {
          if (!newConf.default.tables) {
            newConf.default.tables = {}
          }
          newConf.default.tables[workspace] = { ...result.data.tables }

          if (Object.keys(result.data.tables).length === 1) {
            newConf.table = result.data.tables[0].viewName
            getTableHeaders(workspace, result.data.tables[0].viewName, formID, newConf, setAnalyticsConf, setisLoading, setSnackbar)
          }
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setAnalyticsConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: 'Tables refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const getTableHeaders = (workspace, table, formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar) => {
  if (!table) {
    return
  }

  setisLoading(true)
  const refreshTablesRequestParams = {
    formID,
    workspace,
    table,
    dataCenter: analyticsConf.dataCenter,
    clientId: analyticsConf.clientId,
    clientSecret: analyticsConf.clientSecret,
    tokenDetails: analyticsConf.tokenDetails,
    ownerEmail: analyticsConf.ownerEmail,
  }
  bitsFetch(refreshTablesRequestParams, 'bitforms_zanalysis_get_table_headers')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...analyticsConf }
        if (result.data.table_headers) {
          if (!newConf.default.tables.headers) {
            newConf.default.tables.headers = {}
          }
          newConf.default.tables.headers[table] = { ...result.data.table_headers }
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
