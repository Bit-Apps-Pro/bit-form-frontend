// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import bitsFetch from '../../../Utils/bitsFetch'

export const handleInput = (e, activeCampaingConf, setActiveCampaingConf) => {
  const newConf = { ...activeCampaingConf }
  newConf.name = e.target.value
  setActiveCampaingConf({ ...newConf })
}
export const refreshActiveCampaingHeader = (activeCampaingConf, setActiveCampaingConf, setIsLoading, setSnackbar) => {
  const refreshListsRequestParams = {
    api_key: activeCampaingConf.api_key,
    api_url: activeCampaingConf.api_url,
   }
  bitsFetch(refreshListsRequestParams, 'bitforms_aCampaign_headers')
    .then(result => {
      if (result && result.success) {
        const newConf = { ...activeCampaingConf }
        if (result.data.activeCampaignField) {
          if (!newConf.default) {
            newConf.default = {}
          }
            newConf.default.fields = result.data.activeCampaignField
            const fields = newConf.default.fields
            newConf.field_map = Object.values(fields).filter(f => f.required).map(f => ({ formField: '', activeCampaignField: f.fieldId, required: true }))
          setSnackbar({ show: true, msg: __('ActiveCampaign fields refreshed', 'bitform') })
        } else {
          setSnackbar({ show: true, msg: __('No ActiveCampaign fields found. Try changing the header row number or try again', 'bitform') })
        }

        setActiveCampaingConf({ ...newConf })
      } else {
        setSnackbar({ show: true, msg: __('ActiveCampaign fields refresh failed. please try again', 'bitform') })
      }
      setIsLoading(false)
    })
  .catch(() => setIsLoading(false))
}

export const checkMappedFields = activeCampaingConf => {
  const mappedFields = activeCampaingConf?.field_map ? activeCampaingConf.field_map.filter(mappedField => (!mappedField.formField && mappedField.activeCampaignField && mappedField.required)) : []
  if (mappedFields.length > 0) {
    return false
  }
  return true
}
