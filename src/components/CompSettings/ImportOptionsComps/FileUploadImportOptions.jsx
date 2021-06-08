import { csvToJson, getFileExts, isType } from '../../../Utils/Helpers'
import { checkIfHasColonLblVlu } from './importOptionsHelpers'

export default function FileUploadImportOptions({ importOpts, setImportOpts }) {
  const handleImportFile = e => {
    // eslint-disable-next-line no-undef
    const isPro = typeof bits !== 'undefined' && bits.isPro
    if (!isPro) return []
    const file = e.target.files[0]
    if (!file?.name) { console.warn('file missing'); return }
    importOpts = { show: true, dataSrc: 'fileupload' }
    const ext = getFileExts(file.name)
    const reader = new FileReader()
    if (ext === 'txt' || ext === 'json' || ext === 'csv' || ext === 'tsv') {
      reader.readAsText(file)
    } else if (ext === 'xlsx' || ext === 'xls') {
      reader.readAsArrayBuffer(file)
    }
    reader.onload = () => {
      importOpts.dataTyp = ext
      const data = reader.result
      if (ext === 'txt') {
        importOpts.data = data
      } else if (ext === 'json') {
        try {
          importOpts.data = JSON.parse(data)
        } catch (err) {
          setImportOpts({ ...importOpts })
          console.warn(err)
          return
        }

        const extracted = extractJSONheaders(importOpts.data)
        if (extracted?.headers) importOpts.headers = extracted.headers
        if (extracted?.lbl) importOpts.lbl = extracted.lbl
        if (extracted?.vlu) importOpts.vlu = extracted.vlu
      } else if (ext === 'csv' || ext === 'tsv') {
        importOpts.data = csvToJson(data, ext === 'tsv' ? '\t' : ',')
        importOpts.headers = getHeaderNames(importOpts.data[0])
        if (importOpts.headers.length) {
          importOpts = setDefaultLblVlu(importOpts.headers[0], importOpts)
        }
      } else if (ext === 'xlsx' || ext === 'xls') {
        if (!XLSX) { console.warn('sheet.js not loaded!'); return }
        const dataArr = new Uint8Array(data)
        const workbook = XLSX.read(dataArr, { type: 'array' })
        importOpts.dataTyp = ext
        const { length } = workbook.SheetNames
        if (length === 1) {
          importOpts.data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
          importOpts.headers = getHeaderNames(importOpts.data[0])
          if (importOpts.headers.length) {
            importOpts = setDefaultLblVlu(importOpts.headers[0], importOpts)
          }
        } else if (length > 1) {
          importOpts.workbook = workbook
        }
      }
      setImportOpts({ ...importOpts })
    }
  }

  const setDefaultLblVlu = (header, importState) => ({ ...importState, lbl: header, vlu: header })

  const extractJSONheaders = data => {
    const headers = getHeaderNames(data[0])
    if (isType('array', data) && data.length > 1 && isType('object', data[0])) {
      return {
        headers,
        lbl: headers[0] || '',
        vlu: headers[0] || '',
      }
    }
    if (isType('object', data) || (isType('array', data) && data.length === 1 && isType('object', data[0]))) {
      return { headers: ['key', 'value'], lbl: 'key', vlu: 'value' }
    }
  }

  const handleImportInput = e => {
    const { name, value } = e.target
    importOpts[name] = value
    if (name === 'separator') {
      const hasColonKeyVlu = checkIfHasColonLblVlu(value, importOpts)
      if (hasColonKeyVlu) {
        importOpts.headers = ['key', 'value']
        importOpts.lbl = 'key'
        importOpts.vlu = 'value'
      }
    } else if (name === 'sheetName') {
      delete importOpts.lbl
      delete importOpts.vlu
      if (value) {
        importOpts.data = XLSX.utils.sheet_to_json(importOpts.workbook.Sheets[value])
        importOpts.headers = getHeaderNames(importOpts.data[0])
      } else {
        delete importOpts.headers
        delete importOpts.data
      }
    }
    setImportOpts({ ...importOpts })
  }

  const getHeaderNames = obj => (isType('object', obj) ? Object.keys(obj) : [])

  return (
    <div className="mt-2">
      <div>
        <b>Upload File (txt, json, xls, xlsx, csv, tsv)</b>
        <input type="file" onChange={handleImportFile} accept=".json,.txt,.xls,.xlsx,.csv,.tsv" className="btcd-paper-inp mt-1" />
      </div>
      {importOpts.dataTyp === 'txt' && (
        <div className="mt-3">
          <b>Separator</b>
          <select name="separator" className="btcd-paper-inp mt-1" onChange={handleImportInput} value={importOpts.separator || ''}>
            <option value="">Select Separator</option>
            <option value="comma">Comma</option>
            <option value="space">Space</option>
            <option value="newline">New Line</option>
          </select>
        </div>
      )}
      {importOpts?.workbook?.SheetNames?.length > 1 && (
        <div className="mt-3">
          <b>Sheet Name</b>
          <select name="sheetName" id="" className="btcd-paper-inp mt-1" onChange={handleImportInput} value={importOpts.sheetName || ''}>
            <option value="">Select Sheet</option>
            {importOpts.workbook.SheetNames.map(sheet => <option key={sheet} value={sheet}>{sheet}</option>)}
          </select>
        </div>
      )}
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
