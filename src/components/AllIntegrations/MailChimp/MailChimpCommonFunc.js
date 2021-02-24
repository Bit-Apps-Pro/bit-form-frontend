// eslint-disable-next-line import/no-extraneous-dependencies
import { __, sprintf } from '@wordpress/i18n'
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
    case 'listId':
      newConf = listChange(newConf, formID, setSheetConf, setisLoading, setSnackbar)
      console.log('new config', newConf)
      break;
    default:
      break;
  }
  setSheetConf({ ...newConf })
}

export const listChange = (sheetConf, formID, setSheetConf, setisLoading, setSnackbar) => {
  const newConf = deepCopy(sheetConf)
  newConf.field_map = [{ formField: '', mailChimpField: '' }]

  if (!newConf?.default?.fields?.[sheetConf.listId]) {
    refreshFields(formID, newConf, setSheetConf, setisLoading, setSnackbar)
  }
  return newConf
}

export const refreshAudience = (formID, sheetConf, setSheetConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  console.log( 'audience config', sheetConf)
  const refreshModulesRequestParams = {
    formID,
    clientId: sheetConf.clientId,
    clientSecret: sheetConf.clientSecret,
    tokenDetails: sheetConf.tokenDetails,
  }
  bitsFetch(refreshModulesRequestParams, 'bitforms_mChimp_refresh_audience')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...sheetConf }
        if (!newConf.default) {
          newConf.default = {}
        }
        if (result.data.audiencelist) {
          newConf.default.audiencelist = result.data.audiencelist
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setSnackbar({ show: true, msg: __('Audience list refreshed', 'bitform') })
        setSheetConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: sprintf(__('Audience list refresh failed Cause: %s. please try again', 'bitform'), result.data.data || result.data) })
      } else {
        setSnackbar({ show: true, msg: __('Audience list failed. please try again', 'bitform') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshFields = (formID, sheetConf, setSheetConf, setisLoading, setSnackbar) => {
  const { listId } = sheetConf
  console.log('mail chimp list id', listId)
  if (!listId) {
    return
  }
  setisLoading(true)
  const refreshSpreadsheetsRequestParams = {
    formID,
    listId,
    clientId: sheetConf.clientId,
    clientSecret: sheetConf.clientSecret,
    tokenDetails: sheetConf.tokenDetails,
  }
  bitsFetch(refreshSpreadsheetsRequestParams, 'bitforms_mChimp_refresh_fields')
    .then(result => {
      if (result && result.success) {
        console.log('audience field', result)
        const newConf = { ...sheetConf }
        if (result.data.audienceField) {
          if (!newConf.default.fields) {
            newConf.default.fields = {}
          }
          newConf.default.fields[listId] = result.data.audienceField
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setSnackbar({ show: true, msg: __('Fields refreshed', 'bitform') })
        setSheetConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: __('Fields refresh failed. please try again', 'bitform') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}
