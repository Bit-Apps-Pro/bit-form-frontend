/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import bitsFetch, { prepareData } from '../Utils/bitsFetch'
import Table from '../components/Table'
import CopyText from '../components/ElmSettings/Childs/CopyText'
import Progressbar from '../components/ElmSettings/Childs/Progressbar'
import MenuBtn from '../components/ElmSettings/Childs/MenuBtn'


export default function FormEntries() {
  const { formID } = useParams()
  const [pageSize, setPageSize] = useState(10)
  const [entryCount, setEntryCount] = useState(0)
  const [entryLabels, setEntryLabels] = useState([
    { Header: '#', accessor: 'sl', Cell: value => <>{Number(value.row.id) + 1}</> },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Short Code', accessor: 'shortcode', Cell: val => <CopyText value={val.row.values.shortcode} /> },
    { Header: 'Views', accessor: 'views' },
    { Header: 'Completion Rate', accessor: 'conversion', Cell: val => <Progressbar value={val.row.values.conversion} /> },
    { Header: 'Responses', accessor: 'entries' },
    { Header: 'Created', accessor: 'created_at' },
    { Header: 'Actions', accessor: 'actions', Cell: val => <MenuBtn formID={val.row.original.formID} /> },
  ])
  const [data, setData] = useState([
    { formID: 333, status: 0, formName: 'member', shortcode: 'test', entries: 23, views: 79, conversion: 96, created_at: '2 Dec' },
    { formID: 111, status: 1, formName: 'lace', shortcode: 'guitar', entries: 5, views: 38, conversion: 57, created_at: '2 Dec' },
    { formID: 222, status: 1, formName: 'toys', shortcode: 'camp', entries: 12, views: 75, conversion: 28, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'girlfriend', shortcode: 'yard', entries: 0, views: 89, conversion: 89, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'environment', shortcode: 'love', entries: 20, views: 65, conversion: 67, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'bread', shortcode: 'bait', entries: 21, views: 26, conversion: 47, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'farm', shortcode: 'bone', entries: 8, views: 85, conversion: 80, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'location', shortcode: 'string', entries: 19, views: 3, conversion: 14, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'conclusion', shortcode: 'story', entries: 16, views: 84, conversion: 18, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'shirt', shortcode: 'rain', entries: 20, views: 66, conversion: 3, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'singer', shortcode: 'leader', entries: 10, views: 75, conversion: 82, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'year', shortcode: 'recording', entries: 26, views: 81, conversion: 82, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'point', shortcode: 'ear', entries: 5, views: 35, conversion: 88, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'attack', shortcode: 'rail', entries: 25, views: 46, conversion: 85, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'development', shortcode: 'carriage', entries: 6, views: 45, conversion: 83, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'fog', shortcode: 'letter', entries: 6, views: 43, conversion: 59, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'boot', shortcode: 'yam', entries: 16, views: 20, conversion: 9, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'governor', shortcode: 'difficulty', entries: 1, views: 51, conversion: 5, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'worker', shortcode: 'wilderness', entries: 4, views: 92, conversion: 11, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'emphasis', shortcode: 'stream', entries: 7, views: 5, conversion: 51, created_at: '2 Dec' },
    { formID: 123, status: 0, formName: 'currency', shortcode: 'pain', entries: 15, views: 7, conversion: 85, created_at: '2 Dec' },
  ])
  useEffect(() => {
    const fdata = process.env.NODE_ENV === 'development' ? prepareData({ id: formID }) : { id: formID }

    bitsFetch(fdata, 'bitapps_get_form_entry_count')
      .then(response => {
        if (response.success) {
          console.log('object', formID, response)
          setEntryCount(response.data.count)
          const cols = response.data.Labels.map(val => ( { Header: val, accessor: val.split(' ').join('_')}))
          console.log('In COLS', cols)
          setEntryLabels(cols)
        }
      })
    bitsFetch(fdata, 'bitapps_get_form_entries').then(response => {
      if (response.success) {
        setData(response.data)
      }
    })
  }, [])

  const getPageSize = (changedPageSize, changedPageIndex) => {
    console.log('getPageSize', changedPageIndex, pageSize)
    // eslint-disable-next-line no-param-reassign
    changedPageIndex = changedPageIndex === 0 ? 1 : changedPageIndex
    if (entryCount > pageSize) {
      bitsFetch({ id: formID, offset: (changedPageIndex - 1) * pageSize, changedPageSize }, 'bitapps_get_form_entries').then(response => {
        setData(response.data)
      })
    }
    setPageSize(changedPageSize)
  }
  const getPageIndex = (changedPageIndex) => {
    console.log('chgedbject', changedPageIndex, pageSize)
    if (entryCount > pageSize) {
      bitsFetch({ id: formID, offset: changedPageIndex * pageSize, pageSize }, 'bitapps_get_form_entries').then(response => {
        setData(response.data)
        console.log('Data', data)
      })
    }
  }
  return (
    <div id="all-forms">
      <div className="af-header">
        <h2>Form Responses</h2>
      </div>
      <div className="forms">
        <Table columns={entryLabels} data={data} getPageSize={getPageSize} pageCount={Math.floor(entryCount / pageSize) + 1} getPageIndex={getPageIndex} />
      </div>
    </div>
  )
}
