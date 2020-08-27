import bitsFetch from '../../../Utils/bitsFetch'

export const handleTabChange = (recordTab, settab, crmConfTmp = '', setCrmConf = '', formID = '', setisLoading = '', setSnackbar = '') => {
  if (recordTab) {
    !crmConfTmp.default.relatedlists?.[crmConfTmp.module] && refreshRelatedList(formID, crmConfTmp, setCrmConf, setisLoading, setSnackbar)
  }

  settab(recordTab)
}

export const moduleChange = (module, recordTab, crmConfTmp, formID, setCrmConf, setisLoading, setSnackbar) => {
  let newConf = { ...crmConfTmp }

  if (recordTab === 0) {
    newConf.module = module
    newConf.actions = {}
    newConf.layout = ''
    newConf.relatedlist.module = ''
    newConf.relatedlist.layout = ''
    newConf.relatedlist.actions = {}
    newConf.relatedlist.field_map = [{ formField: '', zohoFormField: '' }]
    newConf.relatedlist.upload_field_map = [{ formField: '', zohoFormField: '' }]
  } else {
    newConf.relatedlist.module = module
    newConf.relatedlist.layout = ''
    newConf.relatedlist.actions = {}
    newConf.relatedlist.field_map = [{ formField: '', zohoFormField: '' }]
    newConf.relatedlist.upload_field_map = [{ formField: '', zohoFormField: '' }]
  }

  if (!newConf.default.layouts?.[module]) {
    refreshLayouts(recordTab, module, formID, newConf, setCrmConf, setisLoading, setSnackbar)
  } else {
    const layouts = Object.keys(newConf.default.layouts?.[module])
    if (layouts.length === 1) {
      newConf = layoutChange(layouts, recordTab, newConf, formID, setCrmConf, setisLoading, setSnackbar)
    }
  }

  return newConf
}

export const layoutChange = (layout, recordTab, crmConfTmp, formID, setCrmConf, setisLoading, setSnackbar) => {
  const newConf = { ...crmConfTmp }

  const module = recordTab === 0 ? newConf.module : newConf.relatedlist.module
  if (recordTab === 0) {
    newConf.layout = layout
    newConf.actions = {}

    newConf.field_map = newConf.default.layouts[module][layout].required ? generateMappedField(newConf, module, layout, 0) : [{ formField: '', zohoFormField: '' }]

    newConf.upload_field_map = Object.keys(newConf.default.layouts[module][layout].requiredFileUploadFields).length > 0 ? generateMappedField(newConf, module, layout, 1) : [{ formField: '', zohoFormField: '' }]
  } else {
    newConf.relatedlist.layout = layout
    newConf.relatedlist.actions = {}

    newConf.relatedlist.field_map = newConf.default.layouts[module][layout]?.required ? generateMappedField(newConf, module, layout, 0) : [{ formField: '', zohoFormField: '' }]

    newConf.relatedlist.upload_field_map = Object.keys(newConf.default.layouts[module][layout]?.requiredFileUploadFields).length > 0 ? generateMappedField(newConf, module, layout, 1) : [{ formField: '', zohoFormField: '' }]
  }

  !newConf.default.tags?.[module] && refreshTags(formID, module, newConf, setCrmConf, setisLoading, setSnackbar)

  return newConf
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
        newConf.default = result.data.modules && { ...newConf.default, modules: result.data.modules }
        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setSnackbar({ show: true, msg: 'Modules refreshed' })
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
          if (!newConf.default.layouts) newConf.default.layouts = {}
          newConf.default.layouts[module] = { ...result.data.layouts }
          const layouts = [...Object.keys(result.data.layouts)]
          if (layouts.length === 1) {
            if (recordTab === 0) {
              [newConf.layout] = layouts
              newConf.field_map = generateMappedField(newConf, module, layouts, 0)
              if (Object.keys(result.data.layouts[layouts].fileUploadFields).length > 0) {
                newConf.upload_field_map = generateMappedField(newConf, module, layouts, 1)
              }
            } else {
              [newConf.relatedlist.layout] = layouts
              newConf.relatedlist.field_map = generateMappedField(newConf, module, layouts, 0)

              console.log('length', Object.keys(result.data.layouts[layouts].fileUploadFields).length)
              if (Object.keys(result.data.layouts[layouts].fileUploadFields).length > 0) {
                newConf.relatedlist.upload_field_map = generateMappedField(newConf, module, layouts, 1)
                console.log('check', newConf.relatedlist.upload_field_map)
              }
            }

            console.log('rubel', newConf)
            if (!newConf.default.tags?.[module]) refreshTags(formID, module, newConf, setCrmConf, setisLoading, setSnackbar)
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

export const generateMappedField = (crmConf, module, layout, uploadFields) => {
  if (uploadFields) {
    return crmConf.default.layouts[module][layout].requiredFileUploadFields.length > 0 ? crmConf.default.layouts[module][layout].requiredFileUploadFields.map(field => ({ formField: '', zohoFormField: field })) : [{ formField: '', zohoFormField: '' }]
  }
  return crmConf.default.layouts[module][layout].required.length > 0 ? crmConf.default.layouts[module][layout].required.map(field => ({ formField: '', zohoFormField: field })) : [{ formField: '', zohoFormField: '' }]
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

export const refreshAssigmentRules = (module, crmConf, setCrmConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const getAssigmentRulesParams = {
    module,
    dataCenter: crmConf.dataCenter,
    clientId: crmConf.clientId,
    clientSecret: crmConf.clientSecret,
    tokenDetails: crmConf.tokenDetails,
  }
  bitsFetch(getAssigmentRulesParams, 'bitforms_zcrm_get_assignment_rules')
    .then(result => {
      if (result?.success) {
        const newConf = { ...crmConf }
        if (!newConf.default.assignmentRules) {
          newConf.default.assignmentRules = {}
        }

        newConf.default.assignmentRules[module] = { ...result.data.assignmentRules }
        setCrmConf({ ...newConf })
        setSnackbar({ show: true, msg: 'Assignment Rules refreshed' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}
