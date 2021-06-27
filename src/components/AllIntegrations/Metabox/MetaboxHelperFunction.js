// eslint-disable-next-line no-unused-vars
import { __ } from '../../../Utils/i18nwrap'

export const addFieldMap = (fldProp, i, confTmp, setConf) => {
  const newConf = { ...confTmp }
  newConf[fldProp].splice(i, 0, {})

  setConf({ ...newConf })
}

export const delFieldMap = (fldProp, i, confTmp, setConf) => {
  const newConf = { ...confTmp }
  if (newConf[fldProp].length > 1) {
    newConf[fldProp].splice(i, 1)
  }

  setConf({ ...newConf })
}

export const handleFieldMapping = (fldProp, event, index, conftTmp, setConf) => {
  const newConf = { ...conftTmp }
  newConf[fldProp][index][event.target.name] = event.target.value

  setConf({ ...newConf })
}

export const checkMappedPostFields = data => {
  const mappedFields = data?.post_map ? data.post_map.filter(mappedField => !mappedField.formField && mappedField.postField && mappedField.required) : []
  if (mappedFields.length > 0) {
    return false
  }
  return true
}
export const checkMappedAcfFields = data => {
  const mappedFields = data?.metabox_map ? data.metabox_map.filter(mappedField => !mappedField.formField && mappedField.acfField && mappedField.required) : []
  if (mappedFields.length > 0) {
    return false
  }

  return true
}

// export const refreshPostTypes = (postTypes, setPostTypes, setisLoading, setSnackbar) => {
//   bitsFetch({}, 'bitforms_get_post_type')
//     .then(result => {
//       if (result && result.success) {
//         //const newConf = { ...postTypes }
//         if (res?.data?.post_types) {
//           setPostTypes(Object.values(res?.data?.post_types))
//           setSnackbar({ show: true, msg: __('Post Types refreshed', 'bitform') })
//         } 
//       } else {
//         setSnackbar({ show: true, msg: __('Fluent CRM fields refresh failed. please try again', 'bitform') })
//       }
//       setisLoading(false)
//     })
//     .catch(() => setisLoading(false))
// }
