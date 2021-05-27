import DownloadIcon from '../../Icons/DownloadIcon'
import { __ } from '../../Utils/i18nwrap'
import CheckBox from '../Utilities/CheckBox'
import FileUploadImportOptions, { generateNewFileUploadedOptions } from './ImportOptionsComps/FileUploadImportOptions'
import PresetsImportOptions, { generateNewPresetsOptions } from './ImportOptionsComps/PresetsImportOptions'

export default function ImportOptions({ importOpts, setImportOpts, elmId, elmData, updateData, lblKey, valKey }) {
  const isPro = typeof bits !== 'undefined' && bits.isPro
  const generateNewOptions = () => {
    if (!isPro) return []
    const { dataSrc } = importOpts
    if (dataSrc === 'fileupload') {
      return generateNewFileUploadedOptions(importOpts, lblKey, valKey)
    }

    if (dataSrc === 'presets') {
      return generateNewPresetsOptions(importOpts, lblKey, valKey)
    }

    return []
  }

  const handleInput = e => {
    const { name, value } = e.target
    if (name === 'dataSrc') {
      importOpts = { show: true }
    }
    importOpts[name] = value
    setImportOpts({ ...importOpts })
  }

  const handleImport = () => {
    const opts = generateNewOptions()
    if (importOpts.type === 'merge') elmData.opt = elmData.opt.concat(opts)
    else elmData.opt = opts

    updateData({ id: elmId, data: elmData })
    setImportOpts({ dataSrc: 'fileupload' })
  }

  const newOptions = generateNewOptions()

  return (
    <div className="mt-2">
      <div>
        <b>Data Source</b>
        <select name="dataSrc" className="btcd-paper-inp mt-1" onChange={handleInput} value={importOpts.dataSrc}>
          <option value="fileupload">File Upload</option>
          <option value="presets">Presets</option>
        </select>
      </div>

      {importOpts.dataSrc === 'fileupload' && (
        <FileUploadImportOptions
          importOpts={importOpts}
          setImportOpts={setImportOpts}
        />
      )}
      {importOpts.dataSrc === 'presets' && (
        <PresetsImportOptions
          importOpts={importOpts}
          setImportOpts={setImportOpts}
        />
      )}
      {!!newOptions.length && (
        <div className="mt-2">
          <b>Preview:</b>
          <table border="1" className="btcd-table txt-center mt-2">
            <thead className="thead">
              <tr className="tr">
                <th className="th">Label</th>
                <th className="th">Value</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {newOptions.slice(0, 5).map((opt, indx) => (
                <tr key={indx} className="tr">
                  <td className="td">{opt[lblKey]}</td>
                  <td className="td">{opt[valKey]}</td>
                </tr>
              ))}
            </tbody>
            {(newOptions.length - 5 > 0) && (
              <tfoot className="tfoot">
                <tr className="tr">
                  <td className="td" colSpan="2">
                    {`+${newOptions.length - 5} more ( Total ${newOptions.length} )`}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}
      <div className="mt-1">
        <CheckBox name="type" onChange={handleInput} radio title={__('Replace Previous Options', 'bitform')} value="replace" checked={importOpts.type !== 'merge'} />
        <br />
        <CheckBox name="type" onChange={handleInput} radio title={__('Merge with Previous Options', 'bitform')} value="merge" checked={importOpts.type === 'merge'} />
      </div>
      <button onClick={handleImport} className="btn blue" type="button" disabled={!newOptions.length || false}>
        <DownloadIcon size="15" />
        &nbsp;
        {__('Import', 'bitform')}
      </button>
    </div>
  )
}
