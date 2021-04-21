import { __ } from '../../../Utils/i18nwrap'
import bitsFetch from '../../../Utils/bitsFetch'

export const refreshCrmList = (formID, fluentCrmConf, setFluentCrmConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  bitsFetch({}, 'bitforms_refresh_fluent_crm_lists')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...fluentCrmConf }
        if (!newConf.default) {
          newConf.default = {}
        }
        if (result.data.fluentCrmList) {
          newConf.default.fluentCrmList = result.data.fluentCrmList
        }
        if (result.data.fluentCrmTags) {
          newConf.default.fluentCrmTags = result.data.fluentCrmTags
        }
        setSnackbar({ show: true, msg: __('FluentCRM list refreshed', 'bitform') })
        setFluentCrmConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `${__('FluentCRM list refresh failed Cause:', 'bitform')}${result.data.data || result.data}. ${__('please try again', 'bitform')}` })
      } else {
        setSnackbar({ show: true, msg: __('FluentCRM list refresh failed. please try again', 'bitform') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshfluentCrmHeader = (fluentCrmConf, setFluentCrmConf, setisLoading, setSnackbar) => {
  bitsFetch({}, 'bitforms_fluent_crm_headers')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...fluentCrmConf }
        if (result.data.fluentCrmFlelds) {
            newConf.default.fields = result.data.fluentCrmFlelds
            const { fields } = newConf.default
            newConf.field_map = Object.values(fields).filter(f => f.required).map(f => ({ formField: '', fluentCRMField: f.key, required: true }))
          setSnackbar({ show: true, msg: __('Fluent CRM fields refreshed', 'bitform') })
        } else {
          setSnackbar({ show: true, msg: __('No Fluent CRM fields found. Try changing the header row number or try again', 'bitform') })
        }
        setFluentCrmConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: __('Fluent CRM fields refresh failed. please try again', 'bitform') })
      }
      setisLoading(false)
    })
  .catch(() => setisLoading(false))
}

export const handleInput = (e, fluentCrmConf, setFluentCrmConf) => {
  const newConf = { ...fluentCrmConf }
  newConf.name = e.target.value
  setFluentCrmConf({ ...newConf })
}
export const checkMappedFields = fluentCrmConf => {
  const mappedFields = fluentCrmConf?.field_map ? fluentCrmConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.fluentCRMField && mappedField.required)) : []
  if (mappedFields.length > 0) {
    return false
  }
  return true
}
