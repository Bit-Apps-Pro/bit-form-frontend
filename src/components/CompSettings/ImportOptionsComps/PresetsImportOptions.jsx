import { useEffect, useState } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import LoaderSm from '../../Loaders/LoaderSm'

export default function PresetsImportOptions({ importOpts, setImportOpts }) {
  const isPro = typeof bits !== 'undefined' && bits.isPro
  const [loading, setLoading] = useState(false)
  const presetVersion = 1.0
  const presetURL = 'https://static.bitapps.pro/bitform/options-presets.json'

  useEffect(() => {
    if (!isPro) return
    let oldPresets = localStorage.getItem('bf-options-presets')
    if (oldPresets) {
      oldPresets = JSON.parse(oldPresets)
    }

    if (!oldPresets || (oldPresets && Number(oldPresets.version) < presetVersion)) {
      setLoading(true)
      fetch(presetURL)
        .then(resp => resp.json())
        .then(res => {
          if (res.data) {
            const { data } = res
            importOpts.data = data
            importOpts.presetNames = Object.keys(data)
            localStorage.setItem('bf-options-presets', JSON.stringify(res))
            setImportOpts({ ...importOpts })
          }
          setLoading(false)
        })
    } else {
      const { data } = oldPresets
      importOpts.data = data
      importOpts.presetNames = Object.keys(data)
      setImportOpts({ ...importOpts })
    }
  }, [])

  const setPresetName = val => {
    importOpts.preset = val
    if (val && importOpts?.data?.[val]?.length) {
      importOpts.headers = Object.keys(importOpts.data[val][0])
      importOpts.lbl = importOpts.headers[0]
      importOpts.vlu = importOpts.headers[0]
    } else {
      delete importOpts.headers
      delete importOpts.lbl
      delete importOpts.vlu
    }
    setImportOpts({ ...importOpts })
  }

  const handleImportInput = e => {
    const { name, value } = e.target
    importOpts[name] = value
    setImportOpts({ ...importOpts })
  }

  return (
    <div className="mt-2">
      {loading && (
        <div className="flx mb-2">
          <LoaderSm size="20" clr="#022217" className="mr-1" />
          <p className="m-0">Presets are loading from server. This process is only for the first time.</p>
        </div>
      )}
      <div>
        <b>Preset</b>
        <MultiSelect
          className="btcd-paper-drpdwn mt-1 w-10"
          options={importOpts?.presetNames?.map(preset => ({ label: preset, value: preset }))}
          defaultValue={importOpts.preset}
          onChange={setPresetName}
          singleSelect
          closeOnSelect
        />
      </div>
      {importOpts.headers && (
        <div className="flx mt-3 w-10">
          <div className="w-5 mr-2">
            <b>Label</b>
            <select name="lbl" id="" className="btcd-paper-inp mt-1" onChange={handleImportInput} value={importOpts.lbl || ''}>
              <option value="">Select Label</option>
              {importOpts.headers.map(op => (<option key={op} value={op}>{op}</option>))}
            </select>
          </div>
          <div className="w-5">
            <b>Value</b>
            <select name="vlu" id="" className="btcd-paper-inp mt-1" onChange={handleImportInput} value={importOpts.vlu || ''}>
              <option value="">Select Value</option>
              {importOpts.headers.map(op => (<option key={op} value={op}>{op}</option>))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
