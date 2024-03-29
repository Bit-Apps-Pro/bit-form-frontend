import { __ } from '../../../Utils/i18nwrap'
import bitsFetch from '../../../Utils/bitsFetch'

export const refreshAutonamiListsAndTags = (autonamiConf, setAutonamiConf, setIsLoading, setSnackbar) => {
  setIsLoading(true)
  bitsFetch({}, 'bitforms_autonami_lists_and_tags')
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
        setSnackbar({ show: true, msg: __('Autonami lists and tags refreshed') })
        setAutonamiConf({ ...newConf })
      } else if ((result && result.data && result.data.data) || (!result.success && typeof result.data === 'string')) {
        setSnackbar({ show: true, msg: `${__('Autonami lists and tags refresh failed Cause:')}${result.data.data || result.data}. ${__('please try again')}` })
      } else {
        setSnackbar({ show: true, msg: __('Autonami lists and tags refresh failed. please try again') })
      }
      setIsLoading(false)
    })
    .catch(() => setIsLoading(false))
}

export const getAutonamiFields = (autonamiConf, setAutonamiConf, setIsLoading, setSnackbar, refreshFields = false) => {
  bitsFetch({}, 'bitforms_autonami_fields')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...autonamiConf }
        if (!newConf.default) {
          newConf.default = {}
        }
        if (result.data.autonamiFields) {
          newConf.default.fields = result.data.autonamiFields
          if (!refreshFields) {
            const { fields } = newConf.default
            newConf.field_map = Object.values(fields).filter(f => f.required).map(f => ({ formField: '', autonamiField: f.key, required: true }))
          }
          setSnackbar({ show: true, msg: __('Autonami fields refreshed') })
        } else {
          setSnackbar({ show: true, msg: __('No Autonami fields found. Try changing the header row number or try again') })
        }
        setAutonamiConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: __('Autonami fields refresh failed. please try again') })
      }
      setIsLoading(false)
    })
    .catch(() => setIsLoading(false))
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
