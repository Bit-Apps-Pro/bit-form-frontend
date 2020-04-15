/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import React, { useState, memo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import bitsFetch from '../Utils/bitsFetch'
import Table from '../components/Table'
import TableAction from '../components/ElmSettings/Childs/TableAction'
import EditEntryData from '../components/EditEntryData'
import Drawer from '../components/Drawer'
import TableFileLink from '../components/ElmSettings/Childs/TableFileLink'
import ConfirmModal from '../components/ConfirmModal'
import SnackMsg from '../components/ElmSettings/Childs/SnackMsg'

function FormEntries() {
  console.log('%c $render FormEntries', 'background:skyblue;padding:3px;border-radius:5px')

  const [snack, setSnackbar] = useState({ show: false, msg: '' })
  const [isloading, setisloading] = useState(false)
  const [allResp, setAllResp] = useState([])
  const { formID } = useParams()
  const fetchIdRef = React.useRef(0)
  const [pageCount, setPageCount] = React.useState(0)
  const [showEditMdl, setShowEditMdl] = useState(false)
  const [entryID, setEntryID] = useState(null)
  const [rowDtl, setRowDtl] = useState({ show: false, data: {} })
  const [confMdl, setconfMdl] = useState({ show: false })
  const [entryLabels, setEntryLabels] = useState([])

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    let totalData = 0
    // eslint-disable-next-line no-plusplus
    const fetchId = ++fetchIdRef.current
    setisloading(true)
    if (totalData === 0) {
      bitsFetch({ id: formID }, 'bitapps_get_form_entry_count')
        .then(response => {
          if (response !== undefined && response.success) {
            totalData = response.data.count
            setPageCount(((response.data.count / 10) % 1 === 0) ? (response.data.count / 10) : Math.floor(response.data.count / 10) + 1)
            const cols = response.data.Labels.map(val => ({
              Header: val.name,
              accessor: val.key,
              minWidth: 50,
              ...'type' in val && val.type.match(/^(file-up|check)$/) && {
                Cell: row => {
                  if (row.cell.value !== null && row.cell.value !== undefined && row.cell.value !== '') {
                    if (val.type === 'file-up') {
                      // eslint-disable-next-line max-len
                      return JSON.parse(row.cell.value).map((itm, i) => <TableFileLink key={`file-n-${row.cell.row.index + i}`} fname={itm} link={`${typeof bits !== 'undefined' ? `${bits.baseDLURL}formID=${formID}&entryID=${row.cell.row.original.entry_id}&fileID=${itm}` : `http://192.168.1.11/wp-content/uploads/bitapps/${formID}/${row.cell.row.original.entry_id}`}`} />)
                    } JSON.parse(row.cell.value).join(', ')
                  }
                  return null
                },
              },
            }))

            cols.unshift({ Header: '#', accessor: 'sl', Cell: value => <>{Number(value.row.id) + 1}</>, width: 40 })
            cols.push({
              id: 't_action',
              width: 70,
              maxWidth: 70,
              minWidth: 70,
              sticky: 'right',
              Header: <span className="btcd-icn btcd-icn-sm icn-settings ml-2" title="Settings" />,
              accessor: 'table_ac',
              Cell: val => <TableAction edit={() => editData(val.row)} del={() => delConfMdl(val.row, val.data)} dup={() => dupConfMdl(val.row, val.data)} />,
            })
            setEntryLabels(cols)
          }
        })
    }
    // setTimeout(() => {
    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * pageIndex
      bitsFetch({ id: formID, offset: startRow, pageSize }, 'bitapps_get_form_entries').then(res => {
        if (res !== undefined && res.success) {
          if (totalData > 0) {
            setPageCount(Math.ceil(totalData / pageSize))
          }
          setAllResp(res.data)
        }
        setisloading(false)
      })
    }
    // }, 1000)
  }, [delConfMdl, dupConfMdl, editData, formID])

  const setBulkDelete = useCallback((rows, tmpData) => {
    const rowID = []
    const entries = []
    if (typeof rows[0] === 'object') {
      for (let i = 0; i < rows.length; i += 1) {
        rowID.push(rows[i].id)
        entries.push(rows[i].original.entry_id)
      }
    } else {
      rowID.push(rows.id)
      entries.push(rows.original.entry_id)
    }
    const newData = tmpData !== undefined ? [...tmpData] : [...allResp]
    for (let i = rowID.length - 1; i >= 0; i -= 1) {
      newData.splice(Number(rowID[i]), 1)
    }
    const ajaxData = { formID, entries }

    bitsFetch(ajaxData, 'bitapps_bulk_delete_form_entries')
      .then(res => {
        if (res.success) {
          setAllResp(newData)
          setSnackbar({ show: true, msg: res.data.message })
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const bulkDuplicateData = useCallback((rows, tmpData) => {
    const rowID = []
    const entries = []
    if (typeof rows[0] === 'object') {
      for (let i = 0; i < rows.length; i += 1) {
        rowID[rows[i].original.entry_id] = rows[i].id
        entries.push(rows[i].original.entry_id)
      }
    } else {
      rowID[rows.original.entry_id] = rows.id
      entries.push(rows.original.entry_id)
    }
    const newData = tmpData !== undefined ? [...tmpData] : [...allResp]

    const ajaxData = { formID, entries }
    bitsFetch(ajaxData, 'bitapps_duplicate_form_entries')
      .then(res => {
        if (res.success && res.data.message !== 'undefined') {
          Object.entries(res.data.details).forEach(([entryId, duplicatedId]) => {
            allResp[rowID[entryId]].entry_id = duplicatedId
            newData.push(allResp[rowID[entryId]])
          })
          setAllResp(newData)
          setSnackbar({ show: true, msg: res.data.message })
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const editData = useCallback(id => {
    setEntryID(id.original.entry_id)
    setShowEditMdl(true)
  }, [])

  const closeRowDetail = useCallback(() => {
    rowDtl.show = false
    setRowDtl({ ...rowDtl })
  }, [rowDtl])

  const onRowClick = useCallback((row, idx) => {
    if (rowDtl.show && rowDtl.idx === idx) {
      rowDtl.show = false
    } else {
      rowDtl.data = row
      rowDtl.idx = idx
      rowDtl.show = true
    }
    setRowDtl({ ...rowDtl })
  }, [rowDtl])

  const closeConfMdl = useCallback(() => {
    confMdl.show = false
    setconfMdl({ ...confMdl })
  }, [confMdl])

  const delConfMdl = useCallback((row, data) => {
    confMdl.btnTxt = 'Delete'
    confMdl.body = 'Are you sure to delete this entry'
    confMdl.btnClass = ''
    confMdl.action = () => { setBulkDelete(row, data); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }, [closeConfMdl, confMdl, setBulkDelete])

  const dupConfMdl = useCallback((row, data) => {
    confMdl.btnTxt = 'Duplicate'
    confMdl.btnClass = 'blue'
    confMdl.body = 'Are you sure to duplicate this entry'
    confMdl.action = () => { bulkDuplicateData(row, data); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }, [bulkDuplicateData, closeConfMdl, confMdl])

  return (
    <div id="form-res">
      <div className="af-header">
        <h2>Form Responses</h2>
      </div>
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />

      <ConfirmModal
        show={confMdl.show}
        close={closeConfMdl}
        btnTxt={confMdl.btnTxt}
        btnClass={confMdl.btnClass}
        body={confMdl.body}
        action={confMdl.action}
      />

      {showEditMdl
        && (
          <EditEntryData
            close={setShowEditMdl}
            formID={formID}
            entryID={entryID}
            allResp={allResp}
            setAllResp={setAllResp}
            setSnackbar={setSnackbar}
          />
        )}

      <Drawer
        title="Response Details"
        subTitle="adsff"
        show={rowDtl.show}
        close={closeRowDetail}
      >
        <table className="btcd-row-detail-tbl">
          <tbody>
            <tr className="txt-dp">
              <th>Title</th>
              <th>Value</th>
            </tr>
            {rowDtl.show && rowDtl.data.map((itm, i) => typeof itm.column.Header !== 'function'
              && typeof itm.column.Header !== 'object'
              && itm.column.Header !== '#' && (
                <tr key={`rw-d-${i + 2}`}>
                  <th>{itm.column.Header}</th>
                  <td>{itm.value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Drawer>

      <div className="forms">
        <Table
          className="f-table btcd-entries-f"
          height="60vh"
          columns={entryLabels}
          data={allResp}
          loading={isloading}
          rowSeletable
          resizable
          columnHidable
          hasAction
          rowClickable
          setTableCols={setEntryLabels}
          fetchData={fetchData}
          setBulkDelete={setBulkDelete}
          duplicateData={bulkDuplicateData}
          pageCount={pageCount}
          edit={editData}
          onRowClick={onRowClick}
        />
      </div>
    </div>
  )
}

export default memo(FormEntries)
