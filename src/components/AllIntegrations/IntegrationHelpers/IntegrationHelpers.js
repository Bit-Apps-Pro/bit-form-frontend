import bitsFetch from '../../../Utils/bitsFetch'

export const saveIntegConfig = (allintegs, setIntegration, allIntegURL, deskConf, history, saveForm, id, edit) => {
  const integs = [...allintegs]

  if (edit) {
    integs[id] = { ...allintegs[id], ...deskConf }
    setIntegration([...integs])
    saveForm()
    history.push(allIntegURL)
  } else {
    const newInteg = [...integs]
    newInteg.push(deskConf)
    newInteg.push({ newItegration: true })
    setIntegration(newInteg)
    history.push(allIntegURL)
  }
}

export const setGrantTokenResponse = (integ) => {
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

export const handleAuthorize = (integ, ajaxInteg, scopes, confTmp, setConf, setError, setisAuthorized, setisLoading, setSnackbar) => {
  if (!confTmp.dataCenter || !confTmp.clientId || !confTmp.clientSecret) {
    setError({
      dataCenter: !confTmp.dataCenter ? 'Data center cann\'t be empty' : '',
      clientId: !confTmp.clientId ? 'Client ID cann\'t be empty' : '',
      clientSecret: !confTmp.clientSecret ? 'Secret key cann\'t be empty' : '',
    })
    return
  }
  setisLoading(true)
  const apiEndpoint = `https://accounts.zoho.${confTmp.dataCenter}/oauth/v2/auth?scope=${scopes}&response_type=code&client_id=${confTmp.clientId}&prompt=Consent&access_type=offline&redirect_uri=${encodeURIComponent(window.location.href)}/redirect`
  const authWindow = window.open(apiEndpoint, integ, 'width=400,height=609,toolbar=off')
  const popupURLCheckTimer = setInterval(() => {
    if (authWindow.closed) {
      clearInterval(popupURLCheckTimer)
      let grantTokenResponse = {}
      let isauthRedirectLocation = false
      const bitformsZohoCrm = localStorage.getItem(`__bitforms_${integ}`)
      if (bitformsZohoCrm) {
        isauthRedirectLocation = true
        grantTokenResponse = JSON.parse(bitformsZohoCrm)
        localStorage.removeItem(`__bitforms_${integ}`)
      }
      if (!grantTokenResponse.code || grantTokenResponse.error || !grantTokenResponse || !isauthRedirectLocation) {
        const errorCause = grantTokenResponse.error ? `Cause: ${grantTokenResponse.error}` : ''
        setSnackbar({ show: true, msg: `Authorization failed ${errorCause}. please try again` })
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
  tokenRequestParams.dataCenter = confTmp.dataCenter
  tokenRequestParams.clientId = confTmp.clientId
  tokenRequestParams.clientSecret = confTmp.clientSecret
  tokenRequestParams.redirectURI = `${encodeURIComponent(window.location.href)}/redirect`
  bitsFetch(tokenRequestParams, `bitforms_${ajaxInteg}_generate_token`)
    .then(result => result)
    .then(result => {
      if (result && result.success) {
        const newConf = { ...confTmp }
        newConf.tokenDetails = result.data
        setConf(newConf)
        setisAuthorized(true)
        setSnackbar({ show: true, msg: 'Authorized Successfully' })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Authorization failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Authorization failed. please try again' })
      }
      setisLoading(false)
    })
}

export const addFieldMap = (i, confTmp, setConf, uploadFields, tab) => {
  const newConf = { ...confTmp }
  if (tab) {
    uploadFields ? newConf.relatedlist.upload_field_map.splice(i, 0, { formField: '', zohoFormField: '' }) : newConf.relatedlist.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
  } else {
    uploadFields ? newConf.upload_field_map.splice(i, 0, { formField: '', zohoFormField: '' }) : newConf.field_map.splice(i, 0, { formField: '', zohoFormField: '' })
  }

  setConf({ ...newConf })
}

export const delFieldMap = (i, confTmp, setConf, uploadFields, tab) => {
  const newConf = { ...confTmp }
  if (tab) {
    if (uploadFields) {
      if (newConf.relatedlist.upload_field_map.length > 1) {
        newConf.relatedlist.upload_field_map.splice(i, 1)
      }
    } else if (newConf.relatedlist.field_map.length > 1) {
      newConf.relatedlist.field_map.splice(i, 1)
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
  if (tab === 1) {
    if (uploadFields) newConf.relatedlist.upload_field_map[index][event.target.name] = event.target.value
    else newConf.relatedlist.field_map[index][event.target.name] = event.target.value
  } else if (uploadFields) newConf.upload_field_map[index][event.target.name] = event.target.value
  else newConf.field_map[index][event.target.name] = event.target.value

  if (event.target.value === 'custom') {
    if (tab === 1) {
      newConf.relatedlist.field_map[index].customValue = ''
    } else newConf.field_map[index].customValue = ''
  }

  setConf({ ...newConf })
}

export const handleCustomValue = (event, index, conftTmp, setConf, tab) => {
  const newConf = { ...conftTmp }
  if (tab === 1) {
    newConf.relatedlist.field_map[index].customValue = event.target.value
  } else {
    newConf.field_map[index].customValue = event.target.value
  }
  setConf({ ...newConf })
}
