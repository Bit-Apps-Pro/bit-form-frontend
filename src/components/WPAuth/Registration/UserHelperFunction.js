// eslint-disable-next-line no-unused-vars
import { __ } from '../../../Utils/i18nwrap'

export const addFieldMap = (authType, fldProp, i, confTmp, setConf) => {
  const newConf = { ...confTmp }
  newConf[authType][fldProp].splice(i, 0, {})

  setConf({ ...newConf })
}

export const delFieldMap = (authType, fldProp, i, confTmp, setConf) => {
  const newConf = { ...confTmp }
  if (newConf[authType][fldProp].length > 1) {
    newConf[authType][fldProp].splice(i, 1)
  }

  setConf({ ...newConf })
}

export const handleFieldMapping = (authType, fldProp, event, index, conftTmp, setConf, formFields, setSnackbar) => {
  const newConf = { ...conftTmp }

  const fldEmail = formFields?.find(f => f.key === event.target.value)

  if (newConf[authType][fldProp][index].userField === 'user_email' && fldEmail?.typ !== 'email') {
    setSnackbar({ show: true, msg: 'should be selected email field..' })
    return
  }
  newConf[authType][fldProp][index][event.target.name] = event.target.value
  setConf({ ...newConf })
}

export const checkMappedUserFields = (data, type, field) => {
  const mappedFields = data[type] ? data[type].filter(mappedField => !mappedField.formField && mappedField[field] && mappedField.required) : []
  if (mappedFields.length > 0) {
    return false
  }
  return true
}
export const checkMappedMetaboxFields = data => {
  const mappedFields = data?.metabox_map ? data.metabox_map.filter(mappedField => !mappedField.formField && mappedField.metaboxField && mappedField.required) : []
  if (mappedFields.length > 0) {
    return false
  }

  return true
}
