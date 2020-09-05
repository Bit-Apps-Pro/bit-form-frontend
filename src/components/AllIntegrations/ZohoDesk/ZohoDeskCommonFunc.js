import bitsFetch from '../../../Utils/bitsFetch'

export const portalChange = (deskConf, formID, setDeskConf, setisLoading, setSnackbar) => {
  const newConf = { ...deskConf }
  newConf.department = ''
  newConf.field_map = [{ formField: '', zohoFormField: '' }]
  newConf.actions = {}

  if (!newConf?.default?.departments?.[newConf.orgId]) {
    refreshDepartments(formID, newConf, setDeskConf, setisLoading, setSnackbar)
  } else if (newConf?.default?.departments?.[newConf.orgId].length === 1) newConf.field_map = generateMappedField(newConf)
  return newConf
}

export const departmentChange = (deskConf, formID, setDeskConf, setisLoading, setSnackbar) => {
  const newConf = { ...deskConf }
  newConf.field_map = [{ formField: '', zohoFormField: '' }]
  newConf.actions = {}

  if (!newConf?.default?.fields?.[newConf.orgId]) {
    refreshFields(formID, newConf, setDeskConf, setisLoading, setSnackbar)
  } else {
    newConf.field_map = generateMappedField(newConf)
  }
  return newConf
}

export const refreshOrganizations = (formID, deskConf, setDeskConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshOrganizationsRequestParams = {
    formID,
    id: deskConf.id,
    dataCenter: deskConf.dataCenter,
    clientId: deskConf.clientId,
    clientSecret: deskConf.clientSecret,
    tokenDetails: deskConf.tokenDetails,
  }
  bitsFetch(refreshOrganizationsRequestParams, 'bitforms_zdesk_refresh_organizations')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...deskConf }
        if (result.data.organizations) {
          newConf.default = { ...newConf.default, organizations: result.data.organizations }
        }
        setSnackbar({ show: true, msg: 'Portals refreshed' })
        setDeskConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Portals refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Portals refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshDepartments = (formID, deskConf, setDeskConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshDepartmentsRequestParams = {
    formID,
    id: deskConf.id,
    dataCenter: deskConf.dataCenter,
    clientId: deskConf.clientId,
    clientSecret: deskConf.clientSecret,
    tokenDetails: deskConf.tokenDetails,
    orgId: deskConf.orgId,
  }
  bitsFetch(refreshDepartmentsRequestParams, 'bitforms_zdesk_refresh_departments')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...deskConf }
        if (!newConf.default.departments) {
          newConf.default.departments = {}
        }
        if (result.data.departments) {
          newConf.default.departments[newConf.orgId] = result.data.departments
        }
        if (result.data.departments.length === 1) {
          newConf.department = result.data.departments[newConf.orgId][0].departmentName
          !newConf.default?.fields?.[newConf.orgId] && refreshFields(formID, newConf, setDeskConf, setisLoading, setSnackbar)
        }
        setSnackbar({ show: true, msg: 'Departments refreshed' })
        setDeskConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Departments refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Departments refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshFields = (formID, deskConf, setDeskConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshFieldsRequestParams = {
    formID,
    dataCenter: deskConf.dataCenter,
    clientId: deskConf.clientId,
    clientSecret: deskConf.clientSecret,
    tokenDetails: deskConf.tokenDetails,
    orgId: deskConf.orgId,
  }
  bitsFetch(refreshFieldsRequestParams, 'bitforms_zdesk_refresh_fields')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...deskConf }
        if (result.data.fields) {
          if (!newConf.default.fields) {
            newConf.default.fields = {}
          }
          newConf.default.fields[newConf.orgId] = { ...result.data }
          newConf.field_map = generateMappedField(newConf)
          setSnackbar({ show: true, msg: 'Fields refreshed' })
        } else {
          setSnackbar({ show: true, msg: `Fields refresh failed Cause:${result.data.data || result.data}. please try again` })
        }

        if (result.data.tokenDetails) {
          newConf.tokenDetails = result.data.tokenDetails
        }
        setDeskConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: 'Fields refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshOwners = (formID, deskConf, setDeskConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshOwnersRequestParams = {
    formID,
    id: deskConf.id,
    dataCenter: deskConf.dataCenter,
    clientId: deskConf.clientId,
    clientSecret: deskConf.clientSecret,
    tokenDetails: deskConf.tokenDetails,
    orgId: deskConf.orgId,
  }
  bitsFetch(refreshOwnersRequestParams, 'bitforms_zdesk_refresh_owners')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...deskConf }
        if (!newConf.default.owners) {
          newConf.default.owners = {}
        }
        if (result.data.owners) {
          newConf.default.owners[newConf.orgId] = result.data.owners
        }
        setSnackbar({ show: true, msg: 'Owners refreshed' })
        setDeskConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Owners refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Owners refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshProducts = (formID, deskConf, setDeskConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  const refreshProductsRequestParams = {
    formID,
    id: deskConf.id,
    dataCenter: deskConf.dataCenter,
    clientId: deskConf.clientId,
    clientSecret: deskConf.clientSecret,
    tokenDetails: deskConf.tokenDetails,
    orgId: deskConf.orgId,
    departmentId: deskConf.department,
  }
  bitsFetch(refreshProductsRequestParams, 'bitforms_zdesk_refresh_products')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...deskConf }
        if (!newConf.default.products) {
          newConf.default.products = {}
        }
        if (result.data.products) {
          newConf.default.products[newConf.department] = result.data.products
        }
        setSnackbar({ show: true, msg: 'Products refreshed' })
        setDeskConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `Products refresh failed Cause:${result.data.data || result.data}. please try again` })
      } else {
        setSnackbar({ show: true, msg: 'Products refresh failed. please try again' })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const generateMappedField = (recruitConf) => (recruitConf.default.fields[recruitConf.orgId].required.length > 0 ? recruitConf.default.fields[recruitConf.orgId].required?.map(field => ({ formField: '', zohoFormField: field })) : [{ formField: '', zohoFormField: '' }])
