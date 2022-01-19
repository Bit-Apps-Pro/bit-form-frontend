import { __ } from '../../../Utils/i18nwrap'
import bitsFetch from '../../../Utils/bitsFetch'

export const refreshCrmList = (formID, autonamiConf, setAutonamiConf, setisLoading, setSnackbar) => {
  setisLoading(true)
  bitsFetch({}, 'bitforms_refresh_autonami_lists')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...autonamiConf }
        if (!newConf.default) {
          newConf.default = {}
        }
        if (result.data.autonamiList) {
          newConf.default.autonamiList = result.data.autonamiList
        }
        if (result.data.autonamiTags) {
          newConf.default.autonamiTags = result.data.autonamiTags
        }
        setSnackbar({ show: true, msg: __('Autonami list refreshed', 'bitform') })
        setAutonamiConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `${__('Autonami list refresh failed Cause:', 'bitform')}${result.data.data || result.data}. ${__('please try again', 'bitform')}` })
      } else {
        setSnackbar({ show: true, msg: __('Autonami list refresh failed. please try again', 'bitform') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const refreshAutonamiHeader = (autonamiConf, setAutonamiConf, setisLoading, setSnackbar) => {
  bitsFetch({}, 'bitforms_autonami_headers')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...autonamiConf }
        if (result.data.autonamiFlelds) {
          newConf.default.fields = result.data.autonamiFlelds
          const { fields } = newConf.default
          newConf.field_map = Object.values(fields).filter(f => f.required).map(f => ({ formField: '', autonamiField: f.key, required: true }))
          setSnackbar({ show: true, msg: __('Autonami fields refreshed', 'bitform') })
        } else {
          setSnackbar({ show: true, msg: __('No Autonami fields found. Try changing the header row number or try again', 'bitform') })
        }
        setAutonamiConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: __('Autonami fields refresh failed. please try again', 'bitform') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

export const handleInput = (e, autonamiConf, setAutonamiConf) => {
  const newConf = { ...autonamiConf }
  newConf.name = e.target.value
  setAutonamiConf({ ...newConf })
}
export const checkMappedFields = autonamiConf => {
  const mappedFields = autonamiConf?.field_map ? autonamiConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.autonamiField && mappedField.required)) : []
  if (mappedFields.length > 0) {
    return false
  }
  return true
}
