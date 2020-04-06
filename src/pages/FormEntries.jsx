/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import React, { useState, useContext, memo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import bitsFetch from '../Utils/bitsFetch'
import Table from '../components/Table'
import CopyText from '../components/ElmSettings/Childs/CopyText'
import TableAction from '../components/ElmSettings/Childs/TableAction'
import Progressbar from '../components/ElmSettings/Childs/Progressbar'
import { BitappsContext } from '../Utils/BitappsContext'
import { SnackContext } from '../Utils/SnackContext'
import EditEntryData from '../components/EditEntryData'
import Drawer from '../components/Drawer'
import TableFileLink from '../components/ElmSettings/Childs/TableFileLink'
import Modal from '../components/Modal'
import ConfirmModal from '../components/ConfirmModal'

function FormEntries() {
  console.log('%c $render FormEntries', 'background:skyblue;padding:3px;border-radius:5px')

  const { allRes } = useContext(BitappsContext)
  const { setSnackbar } = useContext(SnackContext)
  const { allResp, setAllResp } = allRes
  const { formID } = useParams()
  const fetchIdRef = React.useRef(0)
  const [pageCount, setPageCount] = React.useState(0)
  const [showEditMdl, setShowEditMdl] = useState(false)
  const [entryID, setEntryID] = useState(null)
  const [rowDtl, setRowDtl] = useState({ show: false, data: {} })
  let totalData = 0

  const [entryLabels, setEntryLabels] = useState([
    { Header: '#', accessor: 'sl', Cell: value => <>{Number(value.row.id) + 1}</> },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Short Code', accessor: 'shortcode', Cell: val => <CopyText value={val.row.values.shortcode} /> },
    { Header: 'Views', accessor: 'views' },
    { Header: 'Completion Rate', accessor: 'conversion', Cell: val => <Progressbar value={val.row.values.conversion} /> },
    { Header: 'ress', accessor: 'entries' },
    { Header: 'Created', accessor: 'created_at' },
    {
      id: 't_action',
      width: 70,
      maxWidth: 70,
      minWidth: 70,
      sticky: 'right',
      accessor: 'table_ac',
      Header: <span className="btcd-icn btcd-icn-sm icn-settings ml-2" title="Settings" />,
      Cell: val => <TableAction edit={editData} del={setBulkDelete} dup={bulkDuplicateData} id={val.row} dataSrc="entries" />,
    },
  ])

  const fetchData = useCallback(({ pageSize, pageIndex }) => {
    // eslint-disable-next-line no-plusplus
    const fetchId = ++fetchIdRef.current
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
              Cell: val => <TableAction edit={editData} del={setBulkDelete} dup={bulkDuplicateData} id={val.row} dataSrc="entries" />,
            })

            setEntryLabels(cols)
          }
        })
    }
    setTimeout(() => {
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex
        bitsFetch({ id: formID, offset: startRow, pageSize }, 'bitapps_get_form_entries').then(res => {
          if (res !== undefined && res.success) {
            if (totalData > 0) {
              setPageCount(Math.ceil(totalData / pageSize))
            }
            setAllResp(res.data)
          }
        })
      }
    }, 1000)
  }, [formID])

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
  }, [allResp])

  const setEntriesCol = useCallback(newCols => {
    setEntryLabels(newCols)
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
  }, [allResp])

  const editData = useCallback(id => {
    setEntryID(id.original.entry_id)
    setShowEditMdl(true)
  }, [])

  const closeRowDetail = () => {
    rowDtl.show = false
    setRowDtl({ ...rowDtl })
  }

  const printObject = data => {
    const d = []
    for (const i in data) {
      if (data.hasOwnProperty.call(data, i)) {
        d.push({ key: i, value: data[i] })
      }
    }
    return d
  }

  const onRowClick = useCallback(row => {
    rowDtl.data = row
    rowDtl.show = true
    setRowDtl({ ...rowDtl })
  }, [rowDtl])

  const setModal = () => {
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }
  const closeEditMdl = () => {
    confMdl.show = false
    setconfMdl({ ...confMdl })
  }

  return (
    <div id="form-res">
      <div className="af-header">
        <h2>Form Responses</h2>
      </div>

      {showEditMdl
        && (
          <EditEntryData
            close={setShowEditMdl}
            formID={formID}
            entryID={entryID}
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
            {printObject(rowDtl.data).map((itm, i) => (
              <tr key={`rw-d-${i + 2}`}>
                <th>{itm.key}</th>
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
          rowSeletable
          resizable
          columnHidable
          hasAction
          rowClickable
          setTableCols={setEntriesCol}
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
