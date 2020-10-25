import bitsFetch from '../../../Utils/bitsFetch'

export const handleInput = (e, signConf, setSignConf, formID, setisLoading, setSnackbar, isNew, error, setError) => {
  console.log('e', e)
  let newConf = { ...signConf }
  if (isNew) {
    const rmError = { ...error }
    rmError[e.target.name] = ''
    setError({ ...rmError })
  }
  newConf[e.target.name] = e.target.value

  switch (e.target.name) {
    case 'template':
      newConf = templateChange(newConf, formID, setSignConf, setisLoading, setSnackbar)
      break;
    default:
      break;
  }
  setSignConf({ ...newConf })
}

export const templateChange = (signConf, formID, setSignConf, setisLoading, setSnackbar) => {
  const newConf = { ...signConf }
  newConf.table = ''
  newConf.field_map = [{ formField: '', zohoFormField: '' }]
  delete newConf.templateActions

  if (!newConf?.default?.templateDetails?.[signConf.template]) {
    refreshTemplateDetails(formID, newConf, setSignConf, setisLoading, setSnackbar)
  }

  return newConf
}

export const refreshTemplates = (formID, signConf, setSignConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshModulesRequestParams = {
    formID,
    id: signConf.id,
    dataCenter: signConf.dataCenter,
    clientId: signConf.clientId,
    clientSecret: signConf.clientSecret,
    tokenDetails: signConf.tokenDetails,
    ownerEsign: signConf.ownerEsign,
  }
  bitsFetch(refreshModulesRequestParams, 'bitforms_zsign_refresh_templates')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...signConf }
        if (!newConf.default) {
          newConf.default = {}
        }
        if (result.data.templates) {
          newConf.default.templates = result.data.templates
        }
        setSnackbar({ show: true, msg: 'Templates refreshed' })
        setSignConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Templates refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Templates refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshTemplateDetails = (formID, signConf, setSignConf, setisLoading, setSnackbar) => {
  const { template } = signConf
  setisLoading(true)
  const refreshModulesRequestParams = {
    formID,
    id: signConf.id,
    dataCenter: signConf.dataCenter,
    clientId: signConf.clientId,
    clientSecret: signConf.clientSecret,
    tokenDetails: signConf.tokenDetails,
    ownerEsign: signConf.ownerEsign,
    template,
  }
  bitsFetch(refreshModulesRequestParams, 'bitforms_zsign_refresh_template_details')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...signConf }
        if (!newConf.default) {
          newConf.default = {}
        }
        if (!newConf.default.templateDetails) newConf.default.templateDetails = {}
        if (result.data.templateDetails) {
          newConf.default.templateDetails[template] = result.data.templateDetails
        }
        setSnackbar({ show: true, msg: 'Template Details refreshed' })
        setSignConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Template Details refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Template Details refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}
