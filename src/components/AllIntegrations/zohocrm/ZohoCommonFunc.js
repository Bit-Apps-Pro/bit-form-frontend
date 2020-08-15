import bitsFetch from '../../../Utils/bitsFetch'

export const handleTabChange = (tab, settab, crmConfTmp = '', setCrmConf = '', formID = '', setisLoading = '', setSnackbar = '') => {
  if (tab) {
    if (!crmConfTmp.default?.relatedlists?.[crmConfTmp.module]) {
      refreshRelatedList(formID, crmConfTmp, setCrmConf, setisLoading, setSnackbar)
    }
  }

  settab(tab)
}

export const refreshModules = (formID, crmConf, setCrmConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshModulesRequestParams = {
    formID,
    id: crmConf.id,
    dataCenter: crmConf.dataCenter,
    clientId: crmConf.clientId,
    clientSecret: crmConf.clientSecret,
    tokenDetails: crmConf.tokenDetails,
  }
  bitsFetch(refreshModulesRequestParams, 'bitforms_zcrm_refresh_modules')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...crmConf }
        if (result.data.modules) {
          newConf.default = { ...newConf.default, modules: result.data.modules }
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setCrmConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Modules refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Modules refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshLayouts = (recordTab, module, formID, crmConf, setCrmConf, setisLoading, setSnackbar) => {
  const newConf = { ...crmConf }
  if (!module) {
    return
  }
  setisLoading(true)
  const refreshLayoutsRequestParams = {
    formID,
    module,
    dataCenter: newConf.dataCenter,
    clientId: newConf.clientId,
    clientSecret: newConf.clientSecret,
    tokenDetails: newConf.tokenDetails,
  }
  bitsFetch(refreshLayoutsRequestParams, 'bitforms_zcrm_refresh_layouts')
    .then(result => {
      if (result && result.success) {
        if (result.data.layouts) {
          if (!newConf.default.layouts) {
            newConf.default.layouts = {}
          }
          newConf.default.layouts[module] = { ...result.data.layouts }
          const layouts = [...Object.keys(result.data.layouts)]
          if (layouts.length === 1) {
            if (recordTab === 0) {
              [newConf.layout] = layouts
              newConf.field_map = generateMappedField(recordTab, newConf, module, layouts)
            } else {
              [newConf.relatedlist.layout] = layouts
              newConf.relatedlist.field_map = generateMappedField(recordTab, newConf, module, layouts)
            }
          }
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setCrmConf({ ...newConf })
        setSnackbar({ show: true, msg: 'Layouts refreshed' })
      } else if ((result?.data?.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Layouts refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Layouts refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const generateMappedField = (tab, crmConf, module, layout) => {
  const newConf = { ...crmConf }
  let fieldMaps = []
  if (tab === 0) {
    fieldMaps = newConf.default?.layouts?.[module]?.[layout]?.required ? newConf.default.layouts[module][layout].required.map(field => ({ formField: '', zohoFormField: field })) : [{ formField: '', zohoFormField: '' }]
  } else {
    fieldMaps = newConf.default?.layouts?.[module]?.[layout]?.required ? newConf.default.layouts[module][layout].required.map(field => field !== 'Parent_Id' && ({ formField: '', zohoFormField: field })).filter(fieldMap => fieldMap) : [{ formField: '', zohoFormField: '' }]
  }

  return fieldMaps
}

export const refreshRelatedList = (formID, crmConf, setCrmConf, setisLoading, setSnackbar) => {
  if (!crmConf.module) {
    return
  }
  setisLoading(true)
  const relatedListRequestParams = {
    formID,
    module: crmConf.module,
    dataCenter: crmConf.dataCenter,
    clientId: crmConf.clientId,
    clientSecret: crmConf.clientSecret,
    tokenDetails: crmConf.tokenDetails,
  }
  bitsFetch(relatedListRequestParams, 'bitforms_zcrm_get_related_lists')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...crmConf }
        if (result.data.relatedLists) {
          if (!newConf.default.relatedlists) {
            newConf.default.relatedlists = {}
          }
          newConf.default.relatedlists[newConf.module] = { ...result.data.relatedLists }
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setCrmConf({ ...newConf })
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

export const refreshTags = (formID, module, crmConf, setCrmConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshTagsParams = {
    formID,
    module,
    dataCenter: crmConf.dataCenter,
    clientId: crmConf.clientId,
    clientSecret: crmConf.clientSecret,
    tokenDetails: crmConf.tokenDetails,
  }
  bitsFetch(refreshTagsParams, 'bitforms_zcrm_get_tags')
    .then(result => {
      if (result?.success) {
        const newConf = { ...crmConf }
        if (result.data.tags) {
          if (!newConf.default.tags) {
            newConf.default.tags = {}
          }
          newConf.default.tags[module] = { ...result.data.tags }
        }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setCrmConf({ ...newConf })
        setSnackbar({ show: true, msg: 'Tags refreshed' })
      } else if ((result?.data?.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Tags refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Tags refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshOwners = (formID, crmConf, setCrmConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const getOwnersParams = {
    formID,
    dataCenter: crmConf.dataCenter,
    clientId: crmConf.clientId,
    clientSecret: crmConf.clientSecret,
    tokenDetails: crmConf.tokenDetails,
  }
  bitsFetch(getOwnersParams, 'bitforms_zcrm_get_users')
    .then(result => {
      if (result?.success) {
        const newConf = { ...crmConf }
        newConf.default.crmOwner = result.data.users
        setCrmConf({ ...newConf })
        setSnackbar({ show: true, msg: 'Owners refreshed' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}
