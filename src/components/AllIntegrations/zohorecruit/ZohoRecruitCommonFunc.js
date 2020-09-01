import bitsFetch from '../../../Utils/bitsFetch'

export const handleTabChange = (recordTab, settab, recruitConf = '', setRecruitConf = '', formID = '', setisLoading = '', setSnackbar = '') => {
  if (recordTab) {
    !recruitConf.default.relatedlists?.[recruitConf.module] && refreshRelatedList(formID, recruitConf, setRecruitConf, setisLoading, setSnackbar)
  }

  settab(recordTab)
}

export const moduleChange = (module, recordTab, recruitConf, formID, setRecruitConf, setisLoading, setSnackbar) => {
  const newConf = { ...recruitConf }

  if (recordTab === 0) {
    newConf.module = module
    newConf.relatedlist.module = ''
    newConf.field_map = [{ formField: '', zohoFormField: '' }]
    newConf.upload_field_map = [{ formField: '', zohoFormField: '' }]
    newConf.relatedlist.field_map = [{ formField: '', zohoFormField: '' }]
    newConf.relatedlist.upload_field_map = [{ formField: '', zohoFormField: '' }]
    newConf.actions = {}
    newConf.relatedlist.actions = {}
  } else {
    newConf.relatedlist.module = module
    newConf.relatedlist.field_map = [{ formField: '', zohoFormField: '' }]
    newConf.relatedlist.upload_field_map = [{ formField: '', zohoFormField: '' }]
    newConf.relatedlist.actions = {}
  }

  if (!newConf.default?.moduleData?.[module]) {
    getFields(module, recordTab, formID, newConf, setRecruitConf, setisLoading, setSnackbar)
  } else if (recordTab === 0) {
    newConf.field_map = generateMappedField(newConf, module, 0)
    if (Object.keys(newConf.default.moduleData[module].fileUploadFields).length > 0) {
      newConf.upload_field_map = generateMappedField(newConf, module, 1)
    }
  } else {
    newConf.relatedlist.field_map = generateMappedField(newConf, module, 0)
    if (Object.keys(newConf.default.moduleData[module].fileUploadFields).length > 0) {
      newConf.relatedlist.upload_field_map = generateMappedField(newConf, module, 1)
    }
  }

  return newConf
}

export const refreshModules = (formID, recruitConf, setRecruitConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshModulesRequestParams = {
    formID,
    id: recruitConf.id,
    dataCenter: recruitConf.dataCenter,
    clientId: recruitConf.clientId,
    clientSecret: recruitConf.clientSecret,
    tokenDetails: recruitConf.tokenDetails,
  }
  bitsFetch(refreshModulesRequestParams, 'bitforms_zrecruit_refresh_modules')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...recruitConf }
        if (result.data.modules) {
          newConf.default = { ...newConf.default, modules: result.data.modules }
        }
        setRecruitConf({ ...newConf })
        setSnackbar({ show: true, msg: 'Modules refreshed' })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Modules refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Modules refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshRelatedList = (formID, recruitConf, setRecruitConf, setisLoading, setSnackbar) => {
  if (!recruitConf.module) {
    return
  }
  setisLoading(true)
  const relatedListRequestParams = {
    formID,
    module: recruitConf.module,
    dataCenter: recruitConf.dataCenter,
    clientId: recruitConf.clientId,
    clientSecret: recruitConf.clientSecret,
    tokenDetails: recruitConf.tokenDetails,
  }
  bitsFetch(relatedListRequestParams, 'bitforms_zrecruit_refresh_related_lists')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...recruitConf }
        if (result.data.related_modules) {
          if (!newConf.default.relatedlists) {
            newConf.default.relatedlists = {}
          }
          newConf.default.relatedlists[newConf.module] = { ...result.data.related_modules }
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setRecruitConf({ ...newConf })
        setSnackbar({ show: true, msg: 'RelatedLists refreshed' })
      } else if ((result?.data?.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `RelatedLists refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'RelatedLists refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const getFields = (module, recordTab, formID, recruitConf, setRecruitConf, setisLoading, setSnackbar) => {
  if (!module) {
    return
  }

  setisLoading(true)
  const getFieldsRequestParams = {
    formID,
    module,
    dataCenter: recruitConf.dataCenter,
    clientId: recruitConf.clientId,
    clientSecret: recruitConf.clientSecret,
    tokenDetails: recruitConf.tokenDetails,
  }
  bitsFetch(getFieldsRequestParams, 'bitforms_zrecruit_get_fields')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...recruitConf }
        if (result.data.fieldDetails) {
          if (!newConf.default.moduleData) {
            newConf.default.moduleData = {}
          }
          newConf.default.moduleData[module] = { ...result.data.fieldDetails }
          if (recordTab === 0) {
            newConf.field_map = generateMappedField(newConf, module, 0)
            if (Object.keys(newConf.default.moduleData[module].fileUploadFields).length > 0) {
              newConf.upload_field_map = generateMappedField(newConf, module, 1)
            }
          } else {
            newConf.relatedlist.field_map = generateMappedField(newConf, module, 0)
            if (Object.keys(newConf.default.moduleData[module].fileUploadFields).length > 0) {
              newConf.relatedlist.upload_field_map = generateMappedField(newConf, module, 1)
            }
          }
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setRecruitConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: 'Layouts refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const generateMappedField = (recruitConf, module, uploadFields) => {
  if (uploadFields) {
    return recruitConf.default.moduleData[module].requiredFileUploadFields.length > 0 ? recruitConf.default.moduleData[module].requiredFileUploadFields?.map(field => ({ formField: '', zohoFormField: field })) : [{ formField: '', zohoFormField: '' }]
  }
  return recruitConf.default.moduleData[module].required.length > 0 ? recruitConf.default.moduleData[module].required?.map(field => ({ formField: '', zohoFormField: field })) : [{ formField: '', zohoFormField: '' }]
}
