
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
  console.log('audience config', sheetConf)
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

export const setGrantTokenResponse = (integ) => {
  // console.log('this is setGrant')
  const grantTokenResponse = {}
  const authWindowLocation = window.location.href
  console.log(authWindowLocation)
  const queryParams = authWindowLocation.replace(`${window.opener.location.href}`, '').split('&')
  if (queryParams) {
    queryParams.forEach(element => {
      const gtKeyValue = element.split('=')
      if (gtKeyValue[1]) {
        // eslint-disable-next-line prefer-destructuring
        grantTokenResponse[gtKeyValue[0]] = gtKeyValue[1]
      }
    })
  }
  localStorage.setItem(`__bitforms_${integ}`, JSON.stringify(grantTokenResponse))
  window.close()
}

export const handleMailChimpAuthorize = (integ, ajaxInteg, confTmp, setConf, setError, setisAuthorized, setisLoading, setSnackbar) => {
  if (!confTmp.clientId || !confTmp.clientSecret) {
    setError({
      clientId: !confTmp.clientId ? __('Client ID cann\'t be empty', 'bitform') : '',
      clientSecret: !confTmp.clientSecret ? __('Secret key cann\'t be empty', 'bitform') : '',
    })
    return
  }
  setisLoading(true)

  const apiEndpoint = `https://login.mailchimp.com/oauth2/authorize?client_id=${confTmp.clientId}&redirect_uri=${encodeURIComponent(window.location.href)}&response_type=code`
  const authWindow = window.open(apiEndpoint, integ, 'width=400,height=609,toolbar=off')
  const popupURLCheckTimer = setInterval(() => {
    if (authWindow.closed) {
      clearInterval(popupURLCheckTimer)
      let grantTokenResponse = {}
      let isauthRedirectLocation = false
      const bitsMailChimp = localStorage.getItem(`__bitforms_${integ}`)
      if (bitsMailChimp) {
        isauthRedirectLocation = true
        grantTokenResponse = JSON.parse(bitsMailChimp)
        localStorage.removeItem(`__bitforms_${integ}`)
        if (grantTokenResponse.code.search('#')) {
          const code = grantTokenResponse.code.split('#')
          grantTokenResponse.code = code[0]
        }
      }
      if (!grantTokenResponse.code || grantTokenResponse.error || !grantTokenResponse || !isauthRedirectLocation) {
        const errorCause = grantTokenResponse.error ? `Cause: ${grantTokenResponse.error}` : ''
        setSnackbar({ show: true, msg: `${__('Authorization failed', 'bitform')} ${errorCause}. ${__('please try again', 'bitform')}` })
        setisLoading(false)
      } else {
        const newConf = { ...confTmp }
        newConf.accountServer = grantTokenResponse['accounts-server']
        tokenHelper(ajaxInteg, grantTokenResponse, newConf, setConf, setisAuthorized, setisLoading, setSnackbar)
      }
    }
  }, 500)
}

const tokenHelper = (ajaxInteg, grantToken, confTmp, setConf, setisAuthorized, setisLoading, setSnackbar) => {
  const tokenRequestParams = { ...grantToken }
  tokenRequestParams.clientId = confTmp.clientId
  tokenRequestParams.clientSecret = confTmp.clientSecret
  tokenRequestParams.redirectURI = window.location.href

  bitsFetch(tokenRequestParams, `bitforms_${ajaxInteg}_generate_token`)
    .then(result => result)
    .then(result => {
      if (result && result.success) {
        const newConf = { ...confTmp }
        newConf.tokenDetails = result.data
        setConf(newConf)
        setisAuthorized(true)
        setSnackbar({ show: true, msg: __('Authorized Successfully', 'bitform') })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `${__('Authorization failed Cause:', 'bitform')}${result.data.data || result.data}. ${__('please try again', 'bitform')}` })
      } else {
        setSnackbar({ show: true, msg: __('Authorization failed. please try again', 'bitform') })
      }
      setisLoading(false)
    })
}
