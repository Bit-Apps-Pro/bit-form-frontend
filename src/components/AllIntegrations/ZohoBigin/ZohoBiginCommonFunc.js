import { getRecoil } from 'recoil-nexus'
import { $bits } from '../../../GlobalStates/GlobalStates'
import bitsFetch from '../../../Utils/bitsFetch'
import { sprintf, __ } from '../../../Utils/i18nwrap'

export const handleInput = (e, recordTab, biginConf, setBiginConf, formID, setisLoading, setSnackbar, isNew, error, setError) => {
  let newConf = { ...biginConf }

  if (recordTab === 0) {
    if (isNew) {
      const rmError = { ...error }
      rmError[e.target.name] = ''
      setError({ ...rmError })
    }
    newConf[e.target.name] = e.target.value
  } else {
    newConf.relatedlists[recordTab - 1][e.target.name] = e.target.value
  }

  switch (e.target.name) {
    case 'module':
      newConf = moduleChange(recordTab, newConf, formID, setBiginConf, setisLoading, setSnackbar)
      break
    default:
      break
  }
  setBiginConf({ ...newConf })
}

export const handleTabChange = (recordTab, settab, biginConf, setBiginConf, formID, setisLoading, setSnackbar) => {
  if (recordTab) {
    !biginConf?.default?.relatedlists?.[biginConf.module] && refreshRelatedList(formID, biginConf, setBiginConf, setisLoading, setSnackbar)
  }

  settab(recordTab)
}

export const moduleChange = (recordTab, biginConf, formID, setBiginConf, setisLoading, setSnackbar) => {
  const newConf = { ...biginConf }
  const module = recordTab === 0 ? newConf.module : newConf.relatedlists[recordTab - 1].module

  if (recordTab === 0) {
    newConf.actions = {}
    newConf.field_map = [{ formField: '', zohoFormField: '' }]
    newConf.upload_field_map = [{ formField: '', zohoFormField: '' }]

    if (recordTab) newConf.relatedlists[recordTab - 1] = {}
  } else {
    newConf.relatedlists[recordTab - 1].field_map = [{ formField: '', zohoFormField: '' }]
    newConf.relatedlists[recordTab - 1].upload_field_map = [{ formField: '', zohoFormField: '' }]
    newConf.relatedlists[recordTab - 1].actions = {}
  }

  if (!newConf.default?.moduleData?.[module]) {
    getFields(recordTab, formID, newConf, setBiginConf, setisLoading, setSnackbar)
  } else if (recordTab === 0) {
    newConf.field_map = generateMappedField(recordTab, newConf)
    if (Object.keys(newConf.default.moduleData[module].fileUploadFields).length > 0) {
      newConf.upload_field_map = generateMappedField(recordTab, newConf, true)
    }
  } else {
    newConf.relatedlists[recordTab - 1].field_map = generateMappedField(recordTab, newConf)
    if (Object.keys(newConf.default.moduleData[module].fileUploadFields).length > 0) {
      newConf.relatedlists[recordTab - 1].upload_field_map = generateMappedField(recordTab, newConf, true)
    }
  }

  return newConf
}

export const refreshModules = (formID, biginConf, setBiginConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshModulesRequestParams = {
    formID,
    id: biginConf.id,
    dataCenter: biginConf.dataCenter,
    clientId: biginConf.clientId,
    clientSecret: biginConf.clientSecret,
    tokenDetails: biginConf.tokenDetails,
  }
  bitsFetch(refreshModulesRequestParams, 'bitforms_zbigin_refresh_modules')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...biginConf }
        if (!newConf.default) {
          newConf.default = {}
        }
        if (result.data.modules) {
          newConf.default.modules = result.data.modules
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setBiginConf({ ...newConf })
        setSnackbar({ show: true, msg: __('Modules refreshed') })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: sprintf(__('Modules refresh failed Cause: %s. please try again'), result.data.data || result.data) })
      } else {
        setSnackbar({ show: true, msg: __('Modules refresh failed. please try again') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshRelatedList = (formID, biginConf, setBiginConf, setisLoading, setSnackbar) => {
  if (!biginConf.module) {
    return
  }
  setisLoading(true)
  const relatedListRequestParams = {
    formID,
    module: biginConf.module,
    dataCenter: biginConf.dataCenter,
    clientId: biginConf.clientId,
    clientSecret: biginConf.clientSecret,
    tokenDetails: biginConf.tokenDetails,
  }
  bitsFetch(relatedListRequestParams, 'bitforms_zbigin_refresh_related_lists')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...biginConf }
        if (result.data.related_modules) {
          if (!newConf.default.relatedlists) {
            newConf.default.relatedlists = {}
          }
          newConf.default.relatedlists[newConf.module] = result.data.related_modules
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setBiginConf({ ...newConf })
        setSnackbar({ show: true, msg: __('RelatedLists refreshed') })
      } else if ((result?.data?.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `${__('RelatedLists refresh failed Cause:')}${result.data.data || result.data}. ${__('please try again')}` })
      } else {
        setSnackbar({ show: true, msg: __('RelatedLists refresh failed. please try again') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const getFields = (recordTab, formID, biginConf, setBiginConf, setisLoading, setSnackbar) => {
  const module = recordTab === 0 ? biginConf.module : biginConf.relatedlists[recordTab - 1].module
  if (!module) {
    return
  }

  setisLoading(true)
  const getFieldsRequestParams = {
    formID,
    module,
    dataCenter: biginConf.dataCenter,
    clientId: biginConf.clientId,
    clientSecret: biginConf.clientSecret,
    tokenDetails: biginConf.tokenDetails,
  }
  bitsFetch(getFieldsRequestParams, 'bitforms_zbigin_refresh_fields')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...biginConf }
        if (result.data.fieldDetails) {
          if (!newConf.default.moduleData) {
            newConf.default.moduleData = {}
          }
          newConf.default.moduleData[module] = result.data.fieldDetails
          if (recordTab === 0) {
            newConf.field_map = generateMappedField(recordTab, newConf)
            if (Object.keys(newConf.default.moduleData[module].fileUploadFields).length > 0) {
              newConf.upload_field_map = generateMappedField(recordTab, newConf, true)
            }
          } else {
            newConf.relatedlists[recordTab - 1].field_map = generateMappedField(recordTab, newConf)
            if (Object.keys(newConf.default.moduleData[module].fileUploadFields).length > 0) {
              newConf.relatedlists[recordTab - 1].upload_field_map = generateMappedField(recordTab, newConf, true)
            }
          }
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setBiginConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: __('Fields refresh failed. please try again') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshTags = (recordTab, formID, biginConf, setBiginConf, setisLoading, setSnackbar) => {
  const module = recordTab === 0 ? biginConf.module : biginConf.relatedlists[recordTab - 1].module
  if (!module) {
    return
  }

  setisLoading(true)
  const getTagsRequestParams = {
    formID,
    module,
    dataCenter: biginConf.dataCenter,
    clientId: biginConf.clientId,
    clientSecret: biginConf.clientSecret,
    tokenDetails: biginConf.tokenDetails,
  }
  bitsFetch(getTagsRequestParams, 'bitforms_zbigin_refresh_tags')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...biginConf }
        if (result.data.tags) {
          if (!newConf.default.moduleData) {
            newConf.default.moduleData = {}
          }
          newConf.default.moduleData[module].tags = result.data.tags
          setSnackbar({ show: true, msg: __('Tags Refreshed') })
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setBiginConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: __('Tags refresh failed. please try again') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshUsers = (formID, biginConf, setBiginConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const getUsersRequestParams = {
    formID,
    dataCenter: biginConf.dataCenter,
    clientId: biginConf.clientId,
    clientSecret: biginConf.clientSecret,
    tokenDetails: biginConf.tokenDetails,
  }
  bitsFetch(getUsersRequestParams, 'bitforms_zbigin_refresh_users')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...biginConf }
        if (result.data.users) {
          if (!newConf.default) {
            newConf.default = {}
          }
          newConf.default.users = result.data.users
          setSnackbar({ show: true, msg: __('Users Refreshed') })
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setBiginConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: __('Users refresh failed. please try again') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const generateMappedField = (recordTab, biginConf, uploadFields) => {
  const module = recordTab === 0 ? biginConf.module : biginConf.relatedlists[recordTab - 1].module
  if (uploadFields) {
    return biginConf.default.moduleData[module].requiredFileUploadFields.length > 0 ? biginConf.default.moduleData[module].requiredFileUploadFields?.map(field => ({ formField: '', zohoFormField: field })) : [{ formField: '', zohoFormField: '' }]
  }
  return biginConf.default.moduleData[module].required.length > 0 ? biginConf.default.moduleData[module].required?.map(field => ({ formField: '', zohoFormField: field })) : [{ formField: '', zohoFormField: '' }]
}

export const checkMappedFields = (biginConf) => {
  const mappedFields = biginConf?.field_map ? biginConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && biginConf?.default?.moduleData?.[biginConf.module]?.required.indexOf(mappedField.zohoFormField) !== -1)) : []
  const mappedRelatedFields = biginConf.relatedlists.map(relatedlist => relatedlist.field_map.filter(mappedField => !mappedField.formField && mappedField.zohoFormField))

  if (mappedFields.length > 0 || mappedRelatedFields.find(relatedField => relatedField.length)) {
    return false
  }

  return true
}

export const handleAuthorize = (confTmp, setConf, setError, setisAuthorized, setisLoading, setSnackbar) => {
  if (!confTmp.dataCenter || !confTmp.clientId || !confTmp.clientSecret) {
    setError({
      dataCenter: !confTmp.dataCenter ? __('Data center cann\'t be empty') : '',
      clientId: !confTmp.clientId ? __('Client ID cann\'t be empty') : '',
      clientSecret: !confTmp.clientSecret ? __('Secret key cann\'t be empty') : '',
    })
    return
  }
  const bits = getRecoil($bits)
  setisLoading(true)
  const scopes = 'ZohoBigin.settings.modules.READ,ZohoBigin.settings.fields.READ,ZohoBigin.settings.tags.READ,ZohoBigin.users.READ,ZohoBigin.modules.ALL'
  const apiEndpoint = `https://accounts.zoho.${confTmp.dataCenter}/oauth/v2/auth?scope=${scopes}&response_type=code&client_id=${confTmp.clientId}&prompt=Consent&access_type=offline&state=${encodeURIComponent(window.location.href)}/redirect&redirect_uri=${encodeURIComponent(bits.zohoRedirectURL)}`
  const authWindow = window.open(apiEndpoint, 'zohoBigin', 'width=400,height=609,toolbar=off')
  const popupURLCheckTimer = setInterval(() => {
    if (authWindow.closed) {
      clearInterval(popupURLCheckTimer)
      let grantTokenResponse = {}
      let isauthRedirectLocation = false
      const bitformsZoho = localStorage.getItem('__bitforms_zohoBigin')
      if (bitformsZoho) {
        isauthRedirectLocation = true
        grantTokenResponse = JSON.parse(bitformsZoho)
        localStorage.removeItem('__bitforms_zohoBigin')
      }
      if (!grantTokenResponse.code || grantTokenResponse.error || !grantTokenResponse || !isauthRedirectLocation) {
        const errorCause = grantTokenResponse.error ? `Cause: ${grantTokenResponse.error}` : ''
        setSnackbar({ show: true, msg: `${__('Authorization failed')} ${errorCause}. ${__('please try again')}` })
        setisLoading(false)
      } else {
        const newConf = { ...confTmp }
        newConf.accountServer = grantTokenResponse['accounts-server']
        tokenHelper(grantTokenResponse, newConf, setConf, setisAuthorized, setisLoading, setSnackbar)
      }
    }
  }, 500)
}

const tokenHelper = (grantToken, confTmp, setConf, setisAuthorized, setisLoading, setSnackbar) => {
  const bits = getRecoil($bits)
  const tokenRequestParams = { ...grantToken }
  tokenRequestParams.dataCenter = confTmp.dataCenter
  tokenRequestParams.clientId = confTmp.clientId
  tokenRequestParams.clientSecret = confTmp.clientSecret
  tokenRequestParams.redirectURI = encodeURIComponent(bits.zohoRedirectURL)
  bitsFetch(tokenRequestParams, 'bitforms_zbigin_generate_token')
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
