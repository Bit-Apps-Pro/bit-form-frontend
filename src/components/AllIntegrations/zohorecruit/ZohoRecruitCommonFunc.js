import bitsFetch from '../../../Utils/bitsFetch'

export const moduleChange = (module, recruitConf, formID, setRecruitConf, setisLoading, setSnackbar) => {
  let newConf = { ...recruitConf }
  newConf.module = module
  newConf.actions = {}

  if (!newConf.default?.moduleData?.[module]) {
    getFields(module, formID, newConf, setRecruitConf, setisLoading, setSnackbar)
  }else{
    newConf.field_map = generateMappedField(newConf, module, 0)
    if(Object.keys(newConf.default.moduleData[module].fileUploadFields).length > 0){
      newConf.upload_field_map = generateMappedField(newConf, module, 1)
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
        setSnackbar({ show: true, msg: `Modules refreshed` })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Modules refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Modules refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const getFields = (module, formID, recruitConf, setRecruitConf, setisLoading, setSnackbar) => {
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
          newConf.default.moduleData[module] = {...result.data.fieldDetails}
          newConf.field_map = generateMappedField(newConf, module, 0)
          if(Object.keys(newConf.default.moduleData[module].fileUploadFields).length > 0) {
            newConf.upload_field_map = generateMappedField(newConf, module, 1)
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
  const newConf = { ...recruitConf }
  let fieldMaps = []

  if(uploadFields){
    fieldMaps = newConf.default.moduleData[module].requiredFileUploadFields?.map(field => ({ formField: '', zohoFormField: field })) || [{ formField: '', zohoFormField: '' }]
  }else{
    fieldMaps = newConf.default.moduleData[module].required?.map(field => ({ formField: '', zohoFormField: field })) || [{ formField: '', zohoFormField: '' }]
  }

  return fieldMaps
}