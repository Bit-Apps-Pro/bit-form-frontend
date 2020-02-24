/* eslint-disable no-undef */
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import bitsFetch, { prepareData } from '../Utils/bitsFetch'
import Table from '../components/Table'
import CopyText from '../components/ElmSettings/Childs/CopyText'
import TableAction from '../components/ElmSettings/Childs/TableAction'
import Progressbar from '../components/ElmSettings/Childs/Progressbar'
import { BitappsContext } from '../Utils/BitappsContext'
import Snackbar from '../components/ElmSettings/Childs/Snackbar'


export default function FormEntries() {
  const { allRes, snackBar } = useContext(BitappsContext)
  const { allResp, setAllResp } = allRes
  const { message, view } = snackBar
  const { formID } = useParams()
  const [pageSize, setPageSize] = useState(10)
  const [entryCount, setEntryCount] = useState(0)
  const { setsnackView, snackView } = view
  const { setsnackMessage } = message

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
      width: 50,
      sticky: 'right',
      Header: <span className="btcd-icn btcd-icn-sm icn-settings ml-2" title="Settings" />,
      accessor: 'table_ac',
      Cell: val => <TableAction edit={editData} del={delData} dup={dupData} id={val.row} />,
    },
  ])

  const [data, setData] = useState([
    { formID: 333, status: 0, formName: 'member', shortcode: 'test', entries: 23, views: 79, conversion: 96, created_at: '2 Dec', minWidth: 50 },
    { formID: 111, status: 1, formName: 'lace', shortcode: 'guitar', entries: 5, views: 38, conversion: 57, created_at: '2 Dec', minWidth: 50 },
    { formID: 222, status: 1, formName: 'toys', shortcode: 'camp', entries: 12, views: 75, conversion: 28, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'girlfriend', shortcode: 'yard', entries: 0, views: 89, conversion: 89, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'environment', shortcode: 'love', entries: 20, views: 65, conversion: 67, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'bread', shortcode: 'bait', entries: 21, views: 26, conversion: 47, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'farm', shortcode: 'bone', entries: 8, views: 85, conversion: 80, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'location', shortcode: 'string', entries: 19, views: 3, conversion: 14, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'conclusion', shortcode: 'story', entries: 16, views: 84, conversion: 18, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'shirt', shortcode: 'rain', entries: 20, views: 66, conversion: 3, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'singer', shortcode: 'leader', entries: 10, views: 75, conversion: 82, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'year', shortcode: 'recording', entries: 26, views: 81, conversion: 82, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'point', shortcode: 'ear', entries: 5, views: 35, conversion: 88, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'attack', shortcode: 'rail', entries: 25, views: 46, conversion: 85, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'development', shortcode: 'carriage', entries: 6, views: 45, conversion: 83, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'fog', shortcode: 'letter', entries: 6, views: 43, conversion: 59, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'boot', shortcode: 'yam', entries: 16, views: 20, conversion: 9, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'governor', shortcode: 'difficulty', entries: 1, views: 51, conversion: 5, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'worker', shortcode: 'wilderness', entries: 4, views: 92, conversion: 11, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'emphasis', shortcode: 'stream', entries: 7, views: 5, conversion: 51, created_at: '2 Dec', minWidth: 50 },
    { formID: 123, status: 0, formName: 'currency', shortcode: 'pain', entries: 15, views: 7, conversion: 85, created_at: '2 Dec', minWidth: 50 },
  ])

  useEffect(() => {
    const fdata = process.env.NODE_ENV === 'development' ? prepareData({ id: formID }) : { id: formID }

    bitsFetch(fdata, 'bitapps_get_form_entry_count')
      .then(response => {
        if (response !== undefined && response.success) {
          setEntryCount(response.data.count)
          const cols = response.data.Labels.map(val => ({ Header: val.name, accessor: val.key, minWidth: 50 }))
          cols.push({
            id: 't_action',
            width: 60,
            sticky: 'right',
            Header: <span className="btcd-icn btcd-icn-sm icn-settings ml-2" title="Settings" />,
            accessor: 'table_ac',
            Cell: val => <TableAction edit={editData} del={delData} dup={dupData} id={val.row} />,
          })
          setEntryLabels(cols)
        }
      })
    bitsFetch(fdata, 'bitapps_get_form_entries').then(res => {
      if (res !== undefined && res.success) {
        setAllResp(res.data)
      }
    })
  }, [formID])

  const getPageSize = (changedPageSize, changedPageIndex) => {
    // eslint-disable-next-line no-param-reassign
    changedPageIndex = changedPageIndex === 0 ? 1 : changedPageIndex
    bitsFetch({ id: formID, offset: (changedPageIndex - 1) * pageSize, changedPageSize }, 'bitapps_get_form_entries').then(res => {
      setAllResp(res.data)
    })
    setPageSize(changedPageSize)
  }

  const getPageIndex = (changedPageIndex) => {
    if (entryCount > pageSize) {
      bitsFetch({ id: formID, offset: changedPageIndex * pageSize, pageSize }, 'bitapps_get_form_entries').then(res => {
        setAllResp(res.data)
      })
    }
  }

  const setBulkDelete = rows => {
    const rowID = []
    const entries = []
    for (let i = 0; i < rows.length; i += 1) {
      rowID.push(rows[i].id)
      entries.push(rows[i].original.entry_id)
    }

    const newData = [...data]
    for (let i = rowID.length - 1; i >= 0; i -= 1) {
      newData.splice(Number(rowID[i]), 1)
    }
    let ajaxData = { formID, entries }
    if (process.env.NODE_ENV === 'development') {
      ajaxData = prepareData(ajaxData)
    }
    bitsFetch(ajaxData, 'bitapps_bulk_delete_form_entries')
      .then(res => {
        if (res.success) {
          setsnackMessage('Entries Deleted successfully')
          setData(newData)
          setsnackView(true)
        }
      })
  }

  const setEntriesCol = newCols => {
    setEntryLabels(newCols)
  }

  const bulkDuplicateData = rows => {
    console.log('duplicate', rows, data)
  }

  const editData = id => {
    console.log('edit', id, data)
  }

  const delData = id => {
    const tmp = [...data]
    tmp.splice(1, 1)
    setData(tmp)
    console.log('temp', tmp, data)
    //console.log('del', id)
  }

  const dupData = id => {
    console.log('dup', id, allResp)
  }

  console.count(";render")
  return (
    <div id="form-res">
      <button onClick={() => console.log(data)}>data</button>
      {console.log('re rendered')}
      <div className="af-header">
        <h2>Form Responses</h2>
      </div>
      <div className="forms">
        <Table
          className="btcd-entries-f"
          height="60vh"
          columns={entryLabels}
          data={allResp}
          rowSeletable
          resizable
          columnHidable
          hasAction
          getPageSize={getPageSize}
          pageCount={((entryCount / pageSize) % 1 === 0) ? (entryCount / pageSize) : Math.floor(entryCount / pageSize) + 1}
          getPageIndex={getPageIndex}
          setBulkDelete={setBulkDelete}
          setTableCols={setEntriesCol}
          duplicateData={bulkDuplicateData}
          edit={editData}
          del={delData}
          dup={dupData}
        />
      </div>
      {
        snackView
        && <Snackbar />
      }
    </div>
  )
}