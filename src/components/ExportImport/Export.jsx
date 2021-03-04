import { useState } from 'react'
import Modal from '../Modal'
import bitsFetch from '../../Utils/bitsFetch'
import ExportAdvance from './ExportAdvance'
import CheckBox from '../ElmSettings/Childs/CheckBox'

export default function Export({ showExportMdl, close, cols, formID }) {
  const [advanceOption, setAdvanceOption] = useState(false)
  const [custom, setCustom] = useState(false)
  const [customRowInput, setcustomRowInput] = useState(null)
  const [sortType, setsortType] = useState('ASC')
  const [sortTypeField, setsortTypeField] = useState('bitforms_form_entry_id')
  const [filterField, setfilterField] = useState(1)
  const [selectedFields, setselectedFields] = useState([])
  const [exportType, setExportType] = useState('csv')

  const columns = cols.filter((col) => col.Header !== '#' && typeof col.Header !== 'object')
  const showAdvanceOption = (e) => {
    e.target.checked ? setAdvanceOption(true) : setAdvanceOption(false)
  }
  const getEntry = (e) => {
    e.preventDefault()
    bitsFetch({ formId: formID, limit: custom ? customRowInput : null, sortBy: sortType, sortField: sortTypeField, fileds: [] },
      'bitforms_filter_export_data').then((res) => {
        if (res !== undefined && res.success) {
          const colHeadeing = []
          columns.map((col, index) => {
            colHeadeing[index] = col.Header
          })
          const heading = [colHeadeing]
          // eslint-disable-next-line no-undef
          const ws = XLSX.utils.json_to_sheet(res.data)
          /* add to workbook */
          const wb = XLSX.utils.book_new()
          XLSX.utils.sheet_add_aoa(ws, heading)
          XLSX.utils.book_append_sheet(wb, ws)
          /* generate an XLSX file */
          XLSX.writeFile(wb, `bitform ${formID}.${exportType}`)
        }
      })
  }
  const checkSelected = (e) => {
    e.target.checked = true
  }

  const customRow = (e) => {
    if (e.target.value === 'custom') {
      return setCustom(true)
    }
    return setCustom(false)
  }

  const setRowNumber = (e) => {
    setcustomRowInput(e.target.value)
  }

  const filterFieldHandle = (e) => {
    setfilterField(Number(e.target.value))
  }

  const selectedFiledHandler = (event) => {
    console.log(selectedFields)
    if (event.target.checked) {
      setselectedFields([...selectedFields, event.target.value])
    } else {
      setselectedFields(selectedFields.splice(selectedFields.indexOf(event.target.value), 1))
    }
  }
  const exportTypeHandle = (type) => {
    setExportType(type)
  }

  const shortFieldHandle = (e) => {
    setsortTypeField(e.target.value)
  }

  const sortTypeHandle = (e) => {
    setsortType(e.target.value)
  }

  return (
    <div>
      <Modal md show={showExportMdl} setModal={close} title="Export Data" style={{ overflowX: 'scroll', overflowY: 'scroll' }}>
        <div>

          <div className="mt-3 flx">
            <b style={{ width: 200 }}>How many rows export: </b>
            <select className="btcd-paper-inp ml-2" style={{ width: 250 }} onChange={(e) => customRow(e)}>
              <option selected disabled>Choose your option</option>
              <option value="all">All</option>
              <option value="custom">Custom input number</option>
            </select>
          </div>
          <div
            className="mt-3 flx"
            style={{ display: custom ? 'block' : 'none' }}
          >
            <b style={{ width: 200 }}>Enter your row number </b>
            <input type="text" style={{ width: 250 }} name="title" onChange={(e) => setRowNumber(e)} className="btcd-paper-inp mt-2" placeholder="Enter Your Export Row Number" />
          </div>
          <div className="mt-3 flx">
            <b style={{ width: 200 }}>Sort By </b>
            <select className="btcd-paper-inp ml-2" style={{ width: 250 }} onChange={(e) => sortTypeHandle(e)}>
              {/* <option selected disabled>Choose your sort type</option> */}
              <option value="ASC">ASC</option>
              <option value="DESC">DESC</option>
            </select>
          </div>
          <div className="mt-3 flx">
            <b style={{ width: 200 }}>Selects the sort field</b>
            <select className="btcd-paper-inp ml-2" onChange={(e) => shortFieldHandle(e)} style={{ width: 250 }}>
              <option value="bitforms_form_entry_id">id</option>
              {columns.map((col) => (
                <option value={col.accessor}>{col.Header}</option>
              ))}
            </select>
          </div>
          <div className="mt-3 flx">
            <b style={{ width: 200 }}>Export File Format : </b>
            <select className="btcd-paper-inp ml-2" style={{ width: 250 }} onChange={e => exportTypeHandle(e.target.value)}>
              {/* <option selected disabled>Choose Type</option> */}
              <option value="csv">CSV</option>
              <option value="xlsx">Xlsx</option>
              <option value="xls">Xls</option>
              <option value="fods">Fods</option>
              <option value="ods">Ods</option>
              <option value="prn">Prn</option>
              <option value="txt">Text</option>
              <option value="html">Html</option>
              <option value="eth">Eth</option>
            </select>
          </div>

          <div className="mt-3 flx">
            <b style={{ width: 200 }}>Exported all field ?</b>
            <CheckBox radio onChange={e => filterFieldHandle(e)} checked={filterField === 1} title={<small className="txt-dp">Yes</small>} value="1" />
            <CheckBox radio onChange={e => filterFieldHandle(e)} checked={filterField === 2} title={<small className="txt-dp">No</small>} value="2" />
          </div>
          <div className="mt-3 flx">
            <b style={{ width: 200 }}> </b>
            {filterField === 2 && (
              columns.map((col) => (
                <CheckBox CheckBox onChange={e => selectedFiledHandler(e)} style={{ display: 'block' }} title={<small className="txt-dp">{col.Header}</small>} value={col.accessor} />
              ))
            )}
          </div>

          <div className="mt-4">
            <CheckBox CheckBox onChange={e => showAdvanceOption(e)} title={<small className="txt-dp">Advanced  Options</small>} checked={advanceOption} value="1" />
            {/* <a className="wdt-100" style={{ cursor: 'pointer' }} onClick={(e) => showAdvanceOption(e)}></a> */}
          </div>
          {advanceOption && (
            <ExportAdvance />
          )}
          <div>
            <button type="button" onClick={e => getEntry(e)} className="btn btn-md blue btcd-mdl-btn">Export</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
