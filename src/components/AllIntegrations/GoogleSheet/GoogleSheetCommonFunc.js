
import { __, sprintf } from '../../../Utils/i18nwrap'
import bitsFetch from '../../../Utils/bitsFetch'
import { deepCopy } from '../../../Utils/Helpers'

export const handleInput = (e, sheetConf, setSheetConf, formID, setisLoading, setSnackbar, isNew, error, setError) => {
  let newConf = { ...sheetConf }
  if (isNew) {
    const rmError = { ...error }
    rmError[e.target.name] = ''
    setError({ ...rmError })
  }
  newConf[e.target.name] = e.target.value
  switch (e.target.name) {
    case 'spreadsheetId':
      newConf = spreadSheetChange(newConf, formID, setSheetConf, setisLoading, setSnackbar)
      break;
    case 'worksheetName':
      newConf = worksheetChange(newConf, formID, setSheetConf, setisLoading, setSnackbar)
      break;
    default:
      break;
  }
  setSheetConf({ ...newConf })
}

export const spreadSheetChange = (sheetConf, formID, setSheetConf, setisLoading, setSnackbar) => {
  const newConf = deepCopy(sheetConf)
  newConf.worksheetName = ''
  newConf.headerRow = 'A1'
  newConf.field_map = [{ formField: '', googleSheetField: '' }]

  if (!newConf?.default?.worksheets?.[sheetConf.spreadsheetId]) {
    refreshWorksheets(formID, newConf, setSheetConf, setisLoading, setSnackbar)
  } else if (Object.keys(newConf?.default?.worksheets?.[sheetConf.spreadsheetId]).length === 1) {
    newConf.worksheetName = newConf?.default?.worksheets?.[sheetConf.spreadsheetId][0].properties.title

    if (!newConf?.default?.worksheets?.headers?.[newConf.worksheetName]) {
      refreshWorksheetHeaders(formID, newConf, setSheetConf, setisLoading, setSnackbar)
    }
  }

  return newConf
}

export const worksheetChange = (sheetConf, formID, setSheetConf, setisLoading, setSnackbar) => {
  const newConf = { ...sheetConf }
  newConf.headerRow = 'A1'
  newConf.field_map = [{ formField: '', googleSheetField: '' }]

  if (!newConf?.default?.worksheets?.headers?.[sheetConf.worksheetName]) {
    refreshWorksheetHeaders(formID, newConf, setSheetConf, setisLoading, setSnackbar)
  }

  return newConf
}

export const refreshSpreadsheets = (formID, sheetConf, setSheetConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshModulesRequestParams = {
    formID,
    id: sheetConf.id,
    clientId: sheetConf.clientId,
    clientSecret: sheetConf.clientSecret,
    tokenDetails: sheetConf.tokenDetails,
    ownerEmail: sheetConf.ownerEmail,
  }
  bitsFetch(refreshModulesRequestParams, 'bitforms_gsheet_refresh_spreadsheets')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...sheetConf }
        if (!newConf.default) {
          newConf.default = {}
        }
        if (result.data.spreadsheets) {
          newConf.default.spreadsheets = result.data.spreadsheets
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setSnackbar({ show: true, msg: __('Spreadsheet refreshed', 'bitform') })
        setSheetConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: sprintf(__('Spreadsheet refresh failed Cause: %s. please try again', 'bitform'), result.data.data || result.data) })
      } else {
        setSnackbar({ show: true, msg: __('Spreadsheet refresh failed. please try again', 'bitform') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshWorksheets = (formID, sheetConf, setSheetConf, setisLoading, setSnackbar) => {
  const { spreadsheetId } = sheetConf
  if (!spreadsheetId) {
    return
  }
  setisLoading(true)
  const refreshSpreadsheetsRequestParams = {
    formID,
    spreadsheetId,
    clientId: sheetConf.clientId,
    clientSecret: sheetConf.clientSecret,
    tokenDetails: sheetConf.tokenDetails,
  }
  bitsFetch(refreshSpreadsheetsRequestParams, 'bitforms_gsheet_refresh_worksheets')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...sheetConf }
        if (result.data.worksheets) {
          if (!newConf.default.worksheets) {
            newConf.default.worksheets = {}
          }
          newConf.default.worksheets[spreadsheetId] = result.data.worksheets
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setSnackbar({ show: true, msg: __('Worksheets refreshed', 'bitform') })
        setSheetConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: __('Worksheets refresh failed. please try again', 'bitform') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshWorksheetHeaders = (formID, sheetConf, setSheetConf, setisLoading, setSnackbar) => {
  const { spreadsheetId, worksheetName, header, headerRow } = sheetConf
  if (!spreadsheetId && !worksheetName && !header && !headerRow) {
    return
  }

  setisLoading(true)
  const refreshWorksheetHeadersRequestParams = {
    formID,
    spreadsheetId,
    worksheetName,
    header,
    headerRow,
    clientId: sheetConf.clientId,
    clientSecret: sheetConf.clientSecret,
    tokenDetails: sheetConf.tokenDetails,
  }
  bitsFetch(refreshWorksheetHeadersRequestParams, 'bitforms_gsheet_refresh_worksheet_headers')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...sheetConf }
        console.log('worksheed header', result.data.worksheet_headers.length)
        if (result.data.worksheet_headers?.length > 0) {
          if (!newConf.default.headers) {
            newConf.default.headers = {}
          }
          if (!newConf.default.headers[spreadsheetId]) {
            newConf.default.headers[spreadsheetId] = {}
          }
          if (!newConf.default.headers[spreadsheetId][worksheetName]) {
            newConf.default.headers[spreadsheetId][worksheetName] = {}
          }
          newConf.default.headers[spreadsheetId][worksheetName][headerRow] = result.data.worksheet_headers
          if (result.data.tokenDetails) {
            newConf.tokenDetails = result.data.tokenDetails
          }
          setSnackbar({ show: true, msg: __('Worksheet Headers refreshed', 'bitform') })
        } else {
          setSnackbar({ show: true, msg: __('No Worksheet headers found. Try changing the header row number or try again', 'bitform') })
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setSheetConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: __('Worksheet Headers refresh failed. please try again', 'bitform') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}
