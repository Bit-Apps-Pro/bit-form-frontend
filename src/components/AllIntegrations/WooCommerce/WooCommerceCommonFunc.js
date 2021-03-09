// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import bitsFetch from '../../../Utils/bitsFetch'
import { deepCopy } from '../../../Utils/Helpers'

export const handleInput = (e, wcConf, setWcConf, setisLoading, setSnackbar) => {
  let newConf = { ...wcConf }
  const { name, value } = e.target
  newConf[name] = value

  switch (name) {
    case 'module':
      newConf = moduleChange(newConf, setWcConf, setisLoading, setSnackbar)
      break;
    default:
      break;
  }
  setWcConf(newConf)
}

export const moduleChange = (wcConf, setWcConf, setisLoading, setSnackbar) => {
  let newConf = { ...wcConf }
  newConf.field_map = []

  if (!newConf?.default?.fields?.[wcConf.module]) {
    refreshFields(newConf, setWcConf, setisLoading, setSnackbar)
  } else {
    newConf = generateMappedFields(newConf)
  }

  return newConf
}

export const refreshFields = (wcConf, setWcConf, setisLoading, setSnackbar) => {
  const { module } = wcConf
  if (!module) {
    return
  }

  setisLoading(true)
  bitsFetch({ module }, 'bitforms_wc_refresh_fields')
    .then(result => {
      if (result && result.success) {
        let newConf = deepCopy(wcConf)
        if (result.data) {
          if (!newConf.default) newConf.default = {}
          if (!newConf.default.fields) {
            newConf.default.fields = {}
          }
          newConf.default.fields[module] = result.data
          newConf = generateMappedFields(newConf)
          console.log('newConf', newConf)
          setWcConf(newConf)
          setSnackbar({ show: true, msg: __('Fields refreshed', 'bitform') })
        }
      } else {
        setSnackbar({ show: true, msg: __('Fields refresh failed. please try again', 'bitform') })
      }
      setisLoading(false)
    })
    .catch(() => setisLoading(false))
}

const generateMappedFields = wcConf => {
  const newConf = { ...wcConf }
  if (newConf.module === 'customer') {
    newConf.default.fields.customer.required.forEach(reqFld => {
      if (!newConf.field_map.find(fld => fld.wcField === reqFld)) {
        newConf.field_map.push({ formField: '', wcField: reqFld, required: true })
      }
    })
  }
  if (!newConf.field_map.length) newConf.field_map = [{ formField: '', wcField: '' }]
  return newConf
}
