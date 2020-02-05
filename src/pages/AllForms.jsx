/* eslint-disable no-undef */
import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Table from '../components/Table'
import SingleToggle2 from '../components/ElmSettings/Childs/SingleToggle2'
import CopyText from '../components/ElmSettings/Childs/CopyText'
import Progressbar from '../components/ElmSettings/Childs/Progressbar'
import MenuBtn from '../components/ElmSettings/Childs/MenuBtn'
import Modal from '../components/Modal'
import FormTemplates from '../components/FormTemplates'
import bitsFetch, { prepareData } from '../Utils/bitsFetch'

export default function AllFroms() {
  const [modal, setModal] = useState(false)

  const onRowSelect = rows => {
    console.log(rows)
  }

  const handleStatus = (e, id) => {
    const el = e.target
    let data = { id, status: el.checked }
    data = process.env.NODE_ENV === 'development' ? prepareData(data) : data
    bitsFetch(data, 'bitapps_change_status')
      .then(res => {
        if (!res.success) {
          el.checked = !el.checked
        }
      })
  }

  const cols = [
    { Header: '#', accessor: 'sl', Cell: value => <>{Number(value.row.id) + 1}</> },
    { Header: 'Status', accessor: 'status', Cell: value => <SingleToggle2 action={(e) => handleStatus(e, value.row.original.formID)} checked={value.row.original.status} /> },
    { Header: 'Form Name', accessor: 'formName', Cell: v => <Link to={`/builder/edit/${v.row.original.formID}`} className="btcd-tabl-lnk">{v.row.values.formName}</Link> },
    { Header: 'Short Code', accessor: 'shortcode', Cell: val => <CopyText value={val.row.values.shortcode} /> },
    { Header: 'Views', accessor: 'views' },
    { Header: 'Completion Rate', accessor: 'conversion', Cell: val => <Progressbar value={val.row.values.conversion} /> },
    { Header: 'Responses', accessor: 'entries', Cell: value => <Link to={`formEntries/${value.row.original.formID}`} className="btcd-tabl-lnk">{value.row.values.entries}</Link> },
    { Header: 'Created', accessor: 'created_at' },
    { Header: 'Actions', accessor: 'actions', Cell: val => <MenuBtn formID={val.row.original.formID} /> },
  ]

  const Forms = [
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
  ]
  const [data, setData] = useState(Forms)

  if (process.env.NODE_ENV === 'production') {
    if (bits.allForms !== null) {
      const dbForms = bits.allForms.map(form => ({ formID: form.id, status: form.status !== '0', formName: form.form_name, shortcode: `bitapps id='${form.id}'`, entries: form.entries, views: form.views, conversion: ((form.entries / (form.views === '0' ? 1 : form.views)) * 100).toPrecision(3), created_at: form.created_at }))
      setData(dbForms)
    }
  }

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      bitsFetch(prepareData({}), 'bitapps_get_all_form')
        .then(res => {
          if (res !== undefined && res.success) {
            dbForms = res.data.map(form => ({ formID: form.id, status: form.status !== '0', formName: form.form_name, shortcode: `bitapps id='${form.id}'`, entries: form.entries, views: form.views, conversion: ((form.entries / (form.views === '0' ? 1 : form.views)) * 100).toPrecision(3), created_at: form.created_at }))
            setData(dbForms)
          }
        })
    }
  }, [])

  return (
    <div id="all-forms">
      <Modal
        show={modal}
        setModal={setModal}
        title="Create Form"
        subTitle="Choose a Template"
      >
        <div className="btcd-tem-lay">
          <div className="btcd-tem">
            <span className="btcd-icn icn-file-empty" style={{ fontSize: 90 }} />
            <div>Blank</div>
            <div className="btcd-hid-btn">
              <NavLink to="/builder/new/blank" className="btn btn-white sh-sm" type="button">Create</NavLink>
            </div>
          </div>
          <div className="btcd-tem">
            <span className="btcd-icn icn-file-empty" style={{ fontSize: 90 }} />
            <div>Contact Form</div>
            <div className="btcd-hid-btn">
              <NavLink to="builder/new/contact_form" className="btn btn-white sh-sm" type="button">Create</NavLink>
            </div>
          </div>
        </div>
        {modal && <FormTemplates />}
      </Modal>

      <div className="af-header">
        <h2>Forms</h2>
        <button onClick={() => setModal(true)} type="button" className="btn round btn-lg blue blue-sh">Create From</button>
      </div>
      <div className="forms">
        <Table columns={cols} data={data} rowSeletable onRowSelect={onRowSelect} />
      </div>
    </div>
  )
}
