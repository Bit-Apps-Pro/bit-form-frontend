import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $bits, $fields } from '../../GlobalStates/GlobalStates'
import BackIcn from '../../Icons/BackIcn'
import app from '../../styles/app.style'
import { deepCopy } from '../../Utils/Helpers'
import { __ } from '../../Utils/i18nwrap'
import CheckBox from '../Utilities/CheckBox'
import AcfFieldOptions, { generateAcfOptions } from './ImportOptionsComps/AcfFieldOptions'
import FileUploadImportOptions from './ImportOptionsComps/FileUploadImportOptions'
import { generateNewFileUploadedOptions, generateNewPresetsOptions } from './ImportOptionsComps/importOptionsHelpers'
import PostTypeImportOptions, { generatePostOptions } from './ImportOptionsComps/PostTypeImportOptions'
import PresetsImportOptions from './ImportOptionsComps/PresetsImportOptions'
import TaxonomyImportOption, { generateTermsOptions } from './ImportOptionsComps/TaxonomyImportOption'
import UserImportOption, { generateUserOptions } from './ImportOptionsComps/UserImportOption'

export default function ImportOptions({ importOpts, setImportOpts, lblKey, valKey, setEditOptionType }) {
  const bits = useRecoilValue($bits)
  const { isPro } = bits
  const { css } = useFela()
  const { fieldKey: fldKey } = useParams()
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fldKey])
  const generateNewOptions = () => {
    if (!isPro) return []
    const { dataSrc } = importOpts

    if (dataSrc === 'fileupload') {
      return generateNewFileUploadedOptions(importOpts, lblKey, valKey)
    }

    if (dataSrc === 'presets') {
      return generateNewPresetsOptions(importOpts, lblKey, valKey)
    }

    if (dataSrc === 'user') {
      return generateUserOptions(importOpts, lblKey, valKey)
    }

    if (dataSrc === 'terms') {
      return generateTermsOptions(importOpts, lblKey, valKey)
    }
    if (dataSrc === 'post') {
      return generatePostOptions(importOpts, lblKey, valKey)
    }
    if (dataSrc === 'acf') {
      return generateAcfOptions(importOpts, lblKey, valKey)
    }

    return []
  }

  const handleInput = e => {
    const { name, value } = e.target
    let tmpOpts = { ...importOpts }
    const { fieldObject, disabled } = { ...importOpts }
    if (name === 'dataSrc') {
      tmpOpts = { show: true }
    }
    tmpOpts.fieldObject = fieldObject
    tmpOpts.disabled = disabled
    tmpOpts[name] = value
    setImportOpts({ ...tmpOpts })
  }

  const handleImport = () => {
    const opts = generateNewOptions()

    if (importOpts?.dataSrc === 'user') fieldData.customType = importOpts?.fieldObject
    if (importOpts?.dataSrc === 'terms') fieldData.customType = importOpts?.fieldObject
    if (importOpts?.dataSrc === 'post') fieldData.customType = importOpts?.fieldObject
    if (importOpts?.dataSrc === 'acf') fieldData.customType = importOpts?.fieldObject
    if (importOpts.type === 'merge') {
      if (fieldData.customType) fieldData.custom_type.oldOpt = fieldData.opt
      fieldData.opt = fieldData.opt.concat(opts)
    } else {
      fieldData.opt = opts
    }
    const dataSrc = fieldData?.customType?.type || 'fileupload'
    let fieldObject = null
    let disabled = false
    if (fieldData?.customType?.type) {
      disabled = true
      fieldObject = fieldData?.customType
    }
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fldKey] = fieldData }))
    setImportOpts({ dataSrc, fieldObject, disabled })
    setEditOptionType('Visual')
  }

  const newOptions = generateNewOptions()

  return (
    <div className="mt-2">
      <div>
        <b>Data Source</b>
        <select name="dataSrc" className="btcd-paper-inp mt-1" onChange={handleInput} value={importOpts.dataSrc} disabled={importOpts?.disabled}>
          <option value="fileupload">File Upload</option>
          <option value="presets">Presets</option>
          <option value="post">Posts</option>
          <option value="terms">Terms</option>
          <option value="user">Users</option>
          <option value="acf">ACF Field Option</option>
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

      {importOpts.dataSrc === 'post' && (
        <PostTypeImportOptions
          importOpts={importOpts}
          setImportOpts={setImportOpts}
        />
      )}

      {importOpts.dataSrc === 'user' && (
        <UserImportOption
          importOpts={importOpts}
          setImportOpts={setImportOpts}
        />
      )}

      {importOpts.dataSrc === 'terms' && (
        <TaxonomyImportOption
          importOpts={importOpts}
          setImportOpts={setImportOpts}
        />
      )}

      {importOpts.dataSrc === 'acf' && (
        <AcfFieldOptions
          importOpts={importOpts}
          setImportOpts={setImportOpts}
        />
      )}

      {!!newOptions.length && (
        <div className="mt-3">
          <b>Preview:</b>
          <table border="1" className="btcd-table txt-center mt-3">
            <thead className="thead">
              <tr className="tr">
                <th className="th">Label</th>
                <th className="th">Value</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {newOptions.slice(0, 5).map((opt, indx) => (
                <tr key={`imp-${indx * 2}`} className="tr">
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
      {(importOpts.dataSrc === 'presets' || importOpts.dataSrc === 'fileupload') && (
        <div className="mt-1">
          <CheckBox name="type" onChange={handleInput} radio title={__('Replace Previous Options', 'bitform')} value="replace" checked={importOpts.type !== 'merge'} />
          <br />
          <CheckBox name="type" onChange={handleInput} radio title={__('Merge with Previous Options', 'bitform')} value="merge" checked={importOpts.type === 'merge'} />
        </div>

      )}
      <button onClick={handleImport} className={`${css(app.btn)} blue`} type="button" disabled={!newOptions.length || false}>
        <BackIcn size="15" />
        &nbsp;
        {__('Import & Edit', 'bitform')}
      </button>
    </div>
  )
}
