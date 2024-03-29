import bitsFetch from '../../../Utils/bitsFetch'
import { deepCopy } from '../../../Utils/Helpers'
import { sprintf, __ } from '../../../Utils/i18nwrap'

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
      break
    default:
      break
  }
  setSheetConf({ ...newConf })
}

export const checkAddressFieldMapRequired = sheetConf => {
  const requiredFleld = sheetConf?.address_field ? sheetConf.address_field.filter(field => !field.formField && field.mailChimpAddressField && field.required) : []
  if (requiredFleld.length > 0) {
    return false
  }
  return true
}

export const listChange = (sheetConf, formID, setSheetConf, setisLoading, setSnackbar) => {
  const newConf = deepCopy(sheetConf)
  newConf.field_map = [{ formField: '', mailChimpField: '' }]

  if (!newConf?.default?.fields?.[sheetConf.listId]) {
    refreshTags(formID, newConf, setSheetConf, setisLoading, setSnackbar)
    refreshFields(formID, newConf, setSheetConf, setisLoading, setSnackbar)
  }
  return newConf
}

export const refreshAudience = (formID, sheetConf, setSheetConf, setisLoading, setSnackbar) => {
  setisLoading(true)
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
        setSnackbar({ show: true, msg: __('Audience list refreshed') })
        setSheetConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: sprintf(__('Audience list refresh failed Cause: %s. please try again'), result.data.data || result.data) })
      } else {
        setSnackbar({ show: true, msg: __('Audience list failed. please try again') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshTags = (formID, sheetConf, setSheetConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshModulesRequestParams = {
    formID,
    clientId: sheetConf.clientId,
    clientSecret: sheetConf.clientSecret,
    tokenDetails: sheetConf.tokenDetails,
    listId: sheetConf.listId,
  }
  bitsFetch(refreshModulesRequestParams, 'bitforms_mChimp_refresh_tags')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...sheetConf }
        if (result.data.audienceTags) {
          newConf.default.audienceTags = result.data.audienceTags
        }
        setSnackbar({ show: true, msg: __('Audience tags refreshed') })
        setSheetConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: sprintf(__('Audience tags refresh failed Cause: %s. please try again'), result.data.data || result.data) })
      } else {
        setSnackbar({ show: true, msg: __('Audience tags failed. please try again') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshFields = (formID, sheetConf, setSheetConf, setisLoading, setSnackbar) => {
  const { listId } = sheetConf
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
        setSnackbar({ show: true, msg: __('Fields refreshed') })
        setSheetConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: __('Fields refresh failed. please try again') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const setGrantTokenResponse = (integ) => {
  // console.log('this is setGrant')
  const grantTokenResponse = {}
  const authWindowLocation = window.location.href
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
      clientId: !confTmp.clientId ? __('Client ID cann\'t be empty') : '',
      clientSecret: !confTmp.clientSecret ? __('Secret key cann\'t be empty') : '',
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
          const [code] = grantTokenResponse.code.split('#')
          grantTokenResponse.code = code
        }
      }
      if (!grantTokenResponse.code || grantTokenResponse.error || !grantTokenResponse || !isauthRedirectLocation) {
        const errorCause = grantTokenResponse.error ? `Cause: ${grantTokenResponse.error}` : ''
        setSnackbar({ show: true, msg: `${__('Authorization failed')} ${errorCause}. ${__('please try again')}` })
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
        setSnackbar({ show: true, msg: __('Authorized Successfully') })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `${__('Authorization failed Cause:')}${result.data.data || result.data}. ${__('please try again')}` })
      } else {
        setSnackbar({ show: true, msg: __('Authorization failed. please try again') })
      }
      setisLoading(false)
    })
}

export const checkMappedFields = (sheetconf) => {
  const mappedFleld = sheetconf.field_map ? sheetconf.field_map.filter(mapped => (!mapped.formField && !mapped.mailChimpField)) : []
  if (mappedFleld.length > 0) {
    return false
  }
  return true
}
