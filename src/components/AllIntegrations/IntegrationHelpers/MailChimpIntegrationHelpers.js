
import { __ } from '../../../Utils/i18nwrap'
import bitsFetch from '../../../Utils/bitsFetch'

export const saveIntegConfig = (allintegs, setIntegration, allIntegURL, confTmp, history, id, edit) => {
  const integs = [...allintegs]
  if (edit) {
    integs[id] = { ...allintegs[id], ...confTmp }
    integs.push({ editItegration: true })
    setIntegration([...integs])
    history.push(allIntegURL)
  } else {
    const newInteg = [...integs]
    newInteg.push(confTmp)
    newInteg.push({ newItegration: true })
    setIntegration(newInteg)
    history.push(allIntegURL)
  }
}

export const setGrantTokenResponse = (integ) => {
  // console.log('this is setGrant')
  const grantTokenResponse = {}
  const authWindowLocation = window.location.href
  const queryParams = authWindowLocation.replace(`${window.opener.location.href}/redirect`, '').split('&')
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

  const apiEndpoint = `https://login.mailchimp.com/oauth2/authorize?response_type=code&client_id=${confTmp.clientId}&redirect_uri=${encodeURIComponent(window.location.href)}`
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
        const code = grantTokenResponse.code.split('#')
        grantTokenResponse.code = code[0]
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

export const addFieldMap = (i, confTmp, setConf, uploadFields, tab) => {
  const newConf = { ...confTmp }
  if (tab) {
    uploadFields ? newConf.relatedlists[tab - 1].upload_field_map.splice(i, 0, {}) : newConf.relatedlists[tab - 1].field_map.splice(i, 0, {})
  } else {
    uploadFields ? newConf.upload_field_map.splice(i, 0, {}) : newConf.field_map.splice(i, 0, {})
  }

  setConf({ ...newConf })
}

export const delFieldMap = (i, confTmp, setConf, uploadFields, tab) => {
  const newConf = { ...confTmp }
  if (tab) {
    if (uploadFields) {
      if (newConf.relatedlists[tab - 1].upload_field_map.length > 1) {
        newConf.relatedlists[tab - 1].upload_field_map.splice(i, 1)
      }
    } else if (newConf.relatedlists[tab - 1].field_map.length > 1) {
      newConf.relatedlists[tab - 1].field_map.splice(i, 1)
    }
  } else if (uploadFields) {
    if (newConf.upload_field_map.length > 1) {
      newConf.upload_field_map.splice(i, 1)
    }
  } else if (newConf.field_map.length > 1) {
    newConf.field_map.splice(i, 1)
  }

  setConf({ ...newConf })
}

export const handleFieldMapping = (event, index, conftTmp, setConf, uploadFields, tab) => {
  const newConf = { ...conftTmp }
  if (tab) {
    if (uploadFields) newConf.relatedlists[tab - 1].upload_field_map[index][event.target.name] = event.target.value
    else newConf.relatedlists[tab - 1].field_map[index][event.target.name] = event.target.value
  } else if (uploadFields) newConf.upload_field_map[index][event.target.name] = event.target.value
  else newConf.field_map[index][event.target.name] = event.target.value

  if (event.target.value === 'custom') {
    if (tab) {
      newConf.relatedlists[tab - 1].field_map[index].customValue = ''
    } else newConf.field_map[index].customValue = ''
  }

  setConf({ ...newConf })
}

export const handleCustomValue = (event, index, conftTmp, setConf, tab) => {
  const newConf = { ...conftTmp }
  if (tab) {
    newConf.relatedlists[tab - 1].field_map[index].customValue = event.target.value
  } else {
    newConf.field_map[index].customValue = event.target.value
  }
  setConf({ ...newConf })
}
export const handleAddress = (event, index, confTmp, setConf, addressField, tab) => {
  const newConf = { ...confTmp }
  newConf.address_field[index][event.target.name] = event.target.value
  setConf({ ...newConf })
}

export const addAddressFieldMap = (i, confTmp, setConf) => {
  const newConf = { ...confTmp }
  if (!newConf.address_field) newConf.address_field = []
  newConf.address_field.push({})
  setConf({ ...newConf })
}

export const delAddressFieldMap = (i, confTmp, setConf) => {
  const newConf = { ...confTmp }
  if (newConf.address_field && newConf.address_field.length > 1) newConf.address_field.splice(i, 1)
  setConf({ ...newConf })
}
