/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import React, { useState, memo, useCallback, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import bitsFetch from '../Utils/bitsFetch'
import Table from '../components/Table'
import TableAction from '../components/ElmSettings/Childs/TableAction'
import EditEntryData from '../components/EditEntryData'
import Drawer from '../components/Drawer'
import TableFileLink from '../components/ElmSettings/Childs/TableFileLink'
import ConfirmModal from '../components/ConfirmModal'
import SnackMsg from '../components/ElmSettings/Childs/SnackMsg'
import { AllFormContext } from '../Utils/AllFormContext'
import noData from '../resource/img/nodata.jpg'

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
  const { reportsData } = useContext(AllFormContext)
  const { reports, reportsDispatch } = reportsData
  const [report] = useState(0)
  useEffect(() => {
    // setisloading(true)
    bitsFetch({ id: formID }, 'bitforms_get_form_entry_count')
      .then(response => {
        if (response !== undefined && response.success) {
          if ('reports' in response.data && response.data.reports.length > 0) {
            if (response.data.reports[0] && response.data.reports[0].details !== undefined && 'order' in response.data.reports[0].details.order) {
              setEntryLabels(response.data.reports[0].details.order)
            }
            console.log('STA--fetchLabel')
            reportsDispatch({ type: 'set', reports: response.data.reports })
          } else {
            tableHeaderHandler(response.data.Labels)
          }
        }
      })
  }, [])

  const tableHeaderHandler = (labels) => {
    const cols = labels.map(val => ({
      Header: val.name,
      accessor: val.key,
      minWidth: 50,
      ...'type' in val && val.type.match(/^(file-up|check)$/) && {
        Cell: row => {
          if (row.cell.value !== null && row.cell.value !== undefined && row.cell.value !== '') {
            if (val.type === 'file-up') {
              // eslint-disable-next-line max-len
              return JSON.parse(row.cell.value).map((itm, i) => <TableFileLink key={`file-n-${row.cell.row.index + i}`} fname={itm} link={`${typeof bits !== 'undefined' ? `${bits.baseDLURL}formID=${formID}&entryID=${row.cell.row.original.entry_id}&fileID=${itm}` : `http://192.168.1.11/wp-content/uploads/bitforms/${formID}/${row.cell.row.original.entry_id}`}`} />)
            } // JSON.parse(row.cell.value).join(', ')
          }
          return null
        },
      },
    }))
    cols.unshift({ Header: '#', accessor: 'sl', Cell: value => <>{Number(value.state.pageIndex * value.state.pageSize) + Number(value.row.id) + 1}</>, width: 40 })
    cols.push({
      id: 't_action',
      width: 70,
      maxWidth: 70,
      minWidth: 70,
      sticky: 'right',
      Header: <span className="btcd-icn btcd-icn-sm icn-settings ml-2" title="Settings" />,
      accessor: 'table_ac',
      Cell: val => <TableAction edit={() => editData(val.row)} del={() => delConfMdl(val.row, { fetchData: val.fetchData, data: { pageIndex: val.state.pageIndex, pageSize: val.state.pageSize, sortBy: val.state.sortBy, filters: val.state.filters, globalFilter: val.state.globalFilter } })} dup={() => dupConfMdl(val.row, val.data, { fetchData: val.fetchData, data: { pageIndex: val.state.pageIndex, pageSize: val.state.pageSize, sortBy: val.state.sortBy, filters: val.state.filters, globalFilter: val.state.globalFilter } })} />,
    })
    setEntryLabels(cols)
  }
  const fetchData = useCallback(({ pageSize, pageIndex, sortBy, filters, globalFilter }) => {
    // eslint-disable-next-line no-plusplus
    const fetchId = ++fetchIdRef.current
    setisloading(true)
    if (fetchId === fetchIdRef.current) {
      const startRow = pageSize * pageIndex
      bitsFetch({ id: formID, offset: startRow, pageSize, sortBy, filters, globalFilter }, 'bitforms_get_form_entries').then(res => {
        if (res !== undefined && res.success) {
          // if (totalData > 0) {
          setPageCount(Math.ceil(res.data.count / pageSize))
          if (res.data.Labels && entryLabels.length === 0) {
            tableHeaderHandler(res.data.Labels)
          }
          // }
          setAllResp(res.data.entries)
        }
        setisloading(false)
      })
    }
  }, [delConfMdl, dupConfMdl, editData, formID])

  const setBulkDelete = useCallback((rows, action) => {
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
    const ajaxData = { formID, entries }

    bitsFetch(ajaxData, 'bitforms_bulk_delete_form_entries')
      .then(res => {
        if (res.success) {
          if (action && action.fetchData && action.data) {
            action.fetchData(action.data)
          }
          setSnackbar({ show: true, msg: res.data.message })
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const bulkDuplicateData = useCallback((rows, tmpData, action) => {
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
    // const newData = tmpData !== undefined ? [...tmpData] : [...allResp]
    const newData = JSON.parse(JSON.stringify(tmpData))

    const ajaxData = { formID, entries }
    bitsFetch(ajaxData, 'bitforms_duplicate_form_entries')
      .then(res => {
        if (res.success && res.data.message !== 'undefined') {
          if (action && action.fetchData && action.data) {
            action.fetchData(action.data)
          } else {
            let duplicatedEntry
            let duplicatedEntryCount = 0
            Object.entries(res.data.details).forEach(([resEntryId, duplicatedId]) => {
              duplicatedEntryCount += 1
              console.log('duplicatedEntry ', resEntryId, tmpData)
              duplicatedEntry = JSON.parse(JSON.stringify(newData[rowID[resEntryId]]))
              // duplicatedEntry = [...newData.slice(rowID[resEntryId], parseInt(rowID[resEntryId], 10) + 1)]
              duplicatedEntry.entry_id = duplicatedId
              newData[rowID[resEntryId]].entry_id = resEntryId
              newData.unshift(duplicatedEntry)
              newData.pop()
            })
            setAllResp(newData)
          }
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

  const dupConfMdl = useCallback((row, data, pCount) => {
    confMdl.btnTxt = 'Duplicate'
    confMdl.btnClass = 'blue'
    confMdl.body = 'Are you sure to duplicate this entry'
    confMdl.action = () => { bulkDuplicateData(row, data, pCount); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }, [bulkDuplicateData, closeConfMdl, confMdl])

  return (
    <div id="form-res">
      <div className="af-header flx flx-between">
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
          loading={isloading}
          columns={entryLabels}
          data={allResp}
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
          report={report}
        />
        {!isloading && allResp.length === 0 && (
          <div className="btcd-no-data txt-center">
            <img src={noData} alt="no data found" />
            <div className="mt-2">No Response Found.</div>
          </div>
        )}

      </div>
    </div>
  )
}

export default memo(FormEntries)
