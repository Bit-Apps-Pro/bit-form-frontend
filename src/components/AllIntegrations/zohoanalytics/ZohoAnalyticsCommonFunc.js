import bitsFetch from '../../../Utils/bitsFetch'

export const workspaceChange = (workspace, analyticsConf, formID, setAnalyticsConf, setisLoading, setSnackbar) => {
  const newConf = { ...analyticsConf }
  newConf.workspace = workspace
  newConf.table = ''
  newConf.field_map = [{ formField: '', zohoFormField: '' }]

  if (!newConf?.default?.tables?.[workspace]) {
    refreshTables(workspace, formID, newConf, setAnalyticsConf, setisLoading, setSnackbar)
  } else if (Object.keys(newConf?.default?.tables?.[workspace]).length === 1) {
    newConf.table = newConf?.default?.tables?.[workspace][0].viewName

    if (!newConf?.default?.tables?.headers?.[newConf.table]) {
      refreshTableHeaders(workspace, newConf.table, formID, newConf, setAnalyticsConf, setisLoading, setSnackbar)
    }
  }

  return newConf
}

export const tableChange = (table, analyticsConf, formID, setAnalyticsConf, setisLoading, setSnackbar) => {
  const newConf = { ...analyticsConf }
  newConf.table = table
  newConf.field_map = [{ formField: '', zohoFormField: '' }]

  if (!newConf?.default?.tables?.headers?.[table]) {
    refreshTableHeaders(newConf.workspace, table, formID, newConf, setAnalyticsConf, setisLoading, setSnackbar)
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

            if (!newConf?.default?.tables?.headers?.[newConf.table]) {
              refreshTableHeaders(workspace, newConf.table, formID, newConf, setAnalyticsConf, setisLoading, setSnackbar)
            }
          }
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

export const refreshTableHeaders = (workspace, table, formID, analyticsConf, setAnalyticsConf, setisLoading, setSnackbar) => {
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
  bitsFetch(refreshTableHeadersRequestParams, 'bitforms_zanalysis_refresh_table_headers')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...analyticsConf }
        if (result.data.table_headers) {
          if (!newConf.default.tables.headers) {
            newConf.default.tables.headers = {}
          }
          newConf.default.tables.headers[table] = { ...result.data.table_headers }
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
