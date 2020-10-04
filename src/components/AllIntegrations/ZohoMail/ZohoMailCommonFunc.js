import bitsFetch from '../../../Utils/bitsFetch'

export const handleInput = (e, mailConf, setMailConf, formID, setisLoading, setSnackbar, isNew, error, setError) => {
  let newConf = { ...mailConf }
  if (isNew) {
    const rmError = { ...error }
    rmError[e.target.name] = ''
    setError({ ...rmError })
  }
  newConf[e.target.name] = e.target.value

  switch (e.target.name) {
    case 'workspace':
      newConf = workspaceChange(newConf, formID, setMailConf, setisLoading, setSnackbar)
      break;
    case 'table':
      newConf = tableChange(newConf, formID, setMailConf, setisLoading, setSnackbar)
      break;
    default:
      break;
  }
  setMailConf({ ...newConf })
}

export const workspaceChange = (mailConf, formID, setMailConf, setisLoading, setSnackbar) => {
  const newConf = { ...mailConf }
  newConf.table = ''
  newConf.field_map = [{ formField: '', zohoFormField: '' }]

  if (!newConf?.default?.tables?.[mailConf.workspace]) {
    refreshTables(formID, newConf, setMailConf, setisLoading, setSnackbar)
  } else if (Object.keys(newConf?.default?.tables?.[mailConf.workspace]).length === 1) {
    newConf.table = newConf?.default?.tables?.[mailConf.workspace][0].viewName

    if (!newConf?.default?.tables?.headers?.[newConf.table]) {
      refreshTableHeaders(formID, newConf, setMailConf, setisLoading, setSnackbar)
    }
  }

  return newConf
}

export const tableChange = (mailConf, formID, setMailConf, setisLoading, setSnackbar) => {
  const newConf = { ...mailConf }
  newConf.field_map = [{ formField: '', zohoFormField: '' }]

  if (!newConf?.default?.tables?.headers?.[mailConf.table]) {
    refreshTableHeaders(formID, newConf, setMailConf, setisLoading, setSnackbar)
  }

  return newConf
}

export const refreshWorkspaces = (formID, mailConf, setMailConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshModulesRequestParams = {
    formID,
    id: mailConf.id,
    dataCenter: mailConf.dataCenter,
    clientId: mailConf.clientId,
    clientSecret: mailConf.clientSecret,
    tokenDetails: mailConf.tokenDetails,
    ownerEmail: mailConf.ownerEmail,
  }
  bitsFetch(refreshModulesRequestParams, 'bitforms_zmail_refresh_workspaces')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...mailConf }
        if (!newConf.default) {
          newConf.default = {}
        }
        if (result.data.workspaces) {
          newConf.default.workspaces = result.data.workspaces
        }
        setSnackbar({ show: true, msg: 'Workspaces refreshed' })
        setMailConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Workspaces refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Workspaces refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshTables = (formID, mailConf, setMailConf, setisLoading, setSnackbar) => {
  const { workspace } = mailConf
  if (!workspace) {
    return
  }

  setisLoading(true)
  const refreshTablesRequestParams = {
    formID,
    workspace,
    dataCenter: mailConf.dataCenter,
    clientId: mailConf.clientId,
    clientSecret: mailConf.clientSecret,
    tokenDetails: mailConf.tokenDetails,
    ownerEmail: mailConf.ownerEmail,
  }
  bitsFetch(refreshTablesRequestParams, 'bitforms_zmail_refresh_tables')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...mailConf }
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
        setMailConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: 'Tables refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshTableHeaders = (formID, mailConf, setMailConf, setisLoading, setSnackbar) => {
  const { workspace, table } = mailConf
  if (!table) {
    return
  }

  setisLoading(true)
  const refreshTableHeadersRequestParams = {
    formID,
    workspace,
    table,
    dataCenter: mailConf.dataCenter,
    clientId: mailConf.clientId,
    clientSecret: mailConf.clientSecret,
    tokenDetails: mailConf.tokenDetails,
    ownerEmail: mailConf.ownerEmail,
  }
  bitsFetch(refreshTableHeadersRequestParams, 'bitforms_zmail_refresh_table_headers')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...mailConf }
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
        setMailConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: 'Table Headers refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}
