import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAsyncDebounce } from 'react-table'
import CacheIcn from '../Icons/CacheIcn'
import bitsFetch from '../Utils/bitsFetch'
import { __ } from '../Utils/i18nwrap'
import SingleToggle2 from './Utilities/SingleToggle2'

export default function General() {
  const [appConf, setAppConf] = useState({})

  const saveSettings = (name) => {
    const config = { ...appConf }
    const saveProm = bitsFetch({ config }, 'bitforms_save_generel_settings')
      .then((res) => {
        if ('success' in res && res.success) {
          return 'Save successfully done'
        }
        delete config[name]
        setAppConf({ ...config })
      }).catch(() => 'Failed to save')
    toast.promise(saveProm, {
      success: data => data,
      failed: data => data,
      loading: __('Saving Generel Settings...'),
    })
  }
  const debouncedUpdateConfig = useAsyncDebounce(saveSettings, 500)

  useEffect(() => {
    const loadApiKeyProm = bitsFetch({}, 'bitforms_get_generel_settings').then((res) => {
      if (res !== undefined && res.success) {
        setAppConf(res.data)
      }
      if (res?.data) return 'Fetched.'
      return 'Error'
    })
    toast.promise(loadApiKeyProm, {
      success: data => data,
      error: __('Error Occured'),
      loading: __('Fetching Generel Settings...'),
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handler = ({ target: { name, checked } }) => {
    const config = { ...appConf }
    if (checked) {
      config[name] = true
    } else {
      delete config[name]
    }
    setAppConf(config)
    debouncedUpdateConfig(name)
  }

  return (
    <div>
      <h2>{__('Global Settings')}</h2>

      <div className="w-8 mt-3">
        <div className="flx flx-between sh-sm br-10 btcd-setting-opt">
          <div className="flx">
            <span className="mr-2">
              <CacheIcn size="16" />
            </span>
            <b>{__('Generate Token after page load to prevent conflict with cache plugins.')}</b>
          </div>
          <SingleToggle2 action={handler} name="cache_plugin" checked={appConf?.cache_plugin} className="flx" />
        </div>
      </div>

    </div>
  )
}
