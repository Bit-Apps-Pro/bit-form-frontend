import bitsFetch from '../../../Utils/bitsFetch'

export const handleInput = (e, formID, campaignsConf, setCampaignsConf, setisLoading, setSnackbar, isNew, error, setError) => {
  let newConf = { ...campaignsConf }
  if (isNew) {
    const rmError = { ...error }
    rmError[e.target.name] = ''
    setError({ ...rmError })
  }
  newConf[e.target.name] = e.target.value

  switch (e.target.name) {
    case 'list':
      newConf = listChange(newConf, formID, setCampaignsConf, setisLoading, setSnackbar)
      break;
    default:
      break;
  }
  setCampaignsConf({ ...newConf })
}

export const listChange = (campaignsConf, formID, setCampaignsConf, setisLoading, setSnackbar) => {
  const newConf = { ...campaignsConf }
  newConf.field_map = [{ formField: '', zohoFormField: 'Contact Email' }]

  if (!newConf?.default?.fields?.[newConf.list]) {
    refreshContactFields(formID, newConf, setCampaignsConf, setisLoading, setSnackbar)
  }
  return newConf
}

export const refreshLists = (formID, campaignsConf, setCampaignsConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshListsRequestParams = {
    formID,
    id: campaignsConf.id,
    dataCenter: campaignsConf.dataCenter,
    clientId: campaignsConf.clientId,
    clientSecret: campaignsConf.clientSecret,
    tokenDetails: campaignsConf.tokenDetails,
  }
  bitsFetch(refreshListsRequestParams, 'bitforms_zcampaigns_refresh_lists')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...campaignsConf }
        if (result.data.lists) {
          newConf.default = { ...newConf.default, lists: result.data.lists }
        }
        setSnackbar({ show: true, msg: 'Lists refreshed' })
        setCampaignsConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Lists refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Lists refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshContactFields = (formID, campaignsConf, setCampaignsConf, setisLoading, setSnackbar) => {
  const { list } = campaignsConf
  if (!list) {
    return
  }

  setisLoading(true)
  const refreshContactFieldsRequestParams = {
    formID,
    list,
    dataCenter: campaignsConf.dataCenter,
    clientId: campaignsConf.clientId,
    clientSecret: campaignsConf.clientSecret,
    tokenDetails: campaignsConf.tokenDetails,
  }
  bitsFetch(refreshContactFieldsRequestParams, 'bitforms_zcampaigns_refresh_contact_fields')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...campaignsConf }
        if (result.data.fields) {
          if (!newConf.default.fields) {
            newConf.default.fields = {}
          }

          newConf.default.fields[list] = result.data

          setSnackbar({ show: true, msg: 'Contact Fields refreshed' })
        } else {
          setSnackbar({ show: true, msg: "Zoho didn't provide fields names for this list" })
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setCampaignsConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: 'Contact Fields refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const checkMappedFields = (campaignsConf) => {
  const mappedFields = campaignsConf?.field_map ? campaignsConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.zohoFormField && campaignsConf?.default?.fields?.[campaignsConf.list]?.required.indexOf(mappedField.zohoFormField) !== -1)) : []
  if (mappedFields.length > 0) {
    return false
  }

  return true
}
