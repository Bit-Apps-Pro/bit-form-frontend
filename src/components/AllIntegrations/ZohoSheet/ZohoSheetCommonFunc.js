import bitsFetch from '../../../Utils/bitsFetch'

export const handleInput = (e, sheetConf, setSheetConf, formID, setisLoading, setSnackbar, isNew, error, setError) => {
  let newConf = { ...sheetConf }
  if (isNew) {
    const rmError = { ...error }
    rmError[e.target.name] = ''
    setError({ ...rmError })
  }
  newConf[e.target.name] = e.target.value

  switch (e.target.name) {
    case 'workbook':
      newConf = workbookChange(newConf, formID, setSheetConf, setisLoading, setSnackbar)
      break;
    case 'worksheet':
      newConf = worksheetChange(newConf, formID, setSheetConf, setisLoading, setSnackbar)
      break;
    default:
      break;
  }
  setSheetConf({ ...newConf })
}

export const workbookChange = (sheetConf, formID, setSheetConf, setisLoading, setSnackbar) => {
  const newConf = { ...sheetConf }
  newConf.worksheet = ''
  newConf.field_map = [{ formField: '', zohoFormField: '' }]

  if (!newConf?.default?.worksheets?.[sheetConf.workbook]) {
    refreshWorksheets(formID, newConf, setSheetConf, setisLoading, setSnackbar)
  } else if (Object.keys(newConf?.default?.worksheets?.[sheetConf.workbook]).length === 1) {
    newConf.worksheet = newConf?.default?.worksheets?.[sheetConf.workbook][0].viewName

    if (!newConf?.default?.worksheets?.headers?.[newConf.worksheet]) {
      refreshWorksheetHeaders(formID, newConf, setSheetConf, setisLoading, setSnackbar)
    }
  }

  return newConf
}

export const worksheetChange = (sheetConf, formID, setSheetConf, setisLoading, setSnackbar) => {
  const newConf = { ...sheetConf }
  newConf.field_map = [{ formField: '', zohoFormField: '' }]

  if (!newConf?.default?.worksheets?.headers?.[sheetConf.worksheet]) {
    refreshWorksheetHeaders(formID, newConf, setSheetConf, setisLoading, setSnackbar)
  }

  return newConf
}

export const refreshWorkbooks = (formID, sheetConf, setSheetConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshModulesRequestParams = {
    formID,
    id: sheetConf.id,
    dataCenter: sheetConf.dataCenter,
    clientId: sheetConf.clientId,
    clientSecret: sheetConf.clientSecret,
    tokenDetails: sheetConf.tokenDetails,
    ownerEmail: sheetConf.ownerEmail,
  }
  bitsFetch(refreshModulesRequestParams, 'bitforms_zsheet_refresh_workbooks')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...sheetConf }
        if (!newConf.default) {
          newConf.default = {}
        }
        if (result.data.workbooks) {
          newConf.default.workbooks = result.data.workbooks
        }
        setSnackbar({ show: true, msg: 'Workbooks refreshed' })
        setSheetConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Workbooks refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Workbooks refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshWorksheets = (formID, sheetConf, setSheetConf, setisLoading, setSnackbar) => {
  const { workbook } = sheetConf
  if (!workbook) {
    return
  }

  setisLoading(true)
  const refreshWorksheetsRequestParams = {
    formID,
    workbook,
    dataCenter: sheetConf.dataCenter,
    clientId: sheetConf.clientId,
    clientSecret: sheetConf.clientSecret,
    tokenDetails: sheetConf.tokenDetails,
  }
  bitsFetch(refreshWorksheetsRequestParams, 'bitforms_zsheet_refresh_worksheets')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...sheetConf }
        if (result.data.worksheets) {
          if (!newConf.default.worksheets) {
            newConf.default.worksheets = {}
          }
          newConf.default.worksheets[workbook] = result.data.worksheets
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setSnackbar({ show: true, msg: 'Worksheets refreshed' })
        setSheetConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: 'Worksheets refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshWorksheetHeaders = (formID, sheetConf, setSheetConf, setisLoading, setSnackbar) => {
  const { workbook, worksheet, headerRow } = sheetConf
  if (!worksheet) {
    return
  }

  setisLoading(true)
  const refreshWorksheetHeadersRequestParams = {
    formID,
    workbook,
    worksheet,
    headerRow,
    dataCenter: sheetConf.dataCenter,
    clientId: sheetConf.clientId,
    clientSecret: sheetConf.clientSecret,
    tokenDetails: sheetConf.tokenDetails,
    ownerEmail: sheetConf.ownerEmail,
  }
  bitsFetch(refreshWorksheetHeadersRequestParams, 'bitforms_zsheet_refresh_worksheet_headers')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...sheetConf }
        if (result.data.worksheet_headers.length > 0) {
          if (!newConf.default.worksheets.headers) {
            newConf.default.worksheets.headers = {}
          }
          newConf.default.worksheets.headers[worksheet] = result.data.worksheet_headers
          setSnackbar({ show: true, msg: 'Worksheet Headers refreshed' })
        } else {
          setSnackbar({ show: true, msg: 'No Worksheet headers found. Try changing the header row number or try again' })
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setSheetConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: 'Worksheet Headers refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}
