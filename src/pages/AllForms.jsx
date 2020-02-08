/* eslint-disable no-undef */
import React, { useState, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'
import Table from '../components/Table'
import SingleToggle2 from '../components/ElmSettings/Childs/SingleToggle2'
import CopyText from '../components/ElmSettings/Childs/CopyText'
import Progressbar from '../components/ElmSettings/Childs/Progressbar'
import MenuBtn from '../components/ElmSettings/Childs/MenuBtn'
import Modal from '../components/Modal'
import FormTemplates from '../components/FormTemplates'
import bitsFetch, { prepareData } from '../Utils/bitsFetch'
import { BitappsContext } from '../Utils/BitappsContext'

export default function AllFroms() {
  const [modal, setModal] = useState(false)
  const { allFormsData } = useContext(BitappsContext)
  const { allForms, allFormsDispatchHandler } = allFormsData
  console.log('In AllForm fn[default]', allForms)
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
    { Header: '#', accessor: 'sl', Cell: value => <>{Number(value.row.id) + 1}</>, width: 50 },
    { Header: 'Status', accessor: 'status', Cell: value => <SingleToggle2 action={(e) => handleStatus(e, value.row.original.formID)} checked={value.row.original.status} />, width: 70 },
    { Header: 'Form Name', accessor: 'formName', Cell: v => <Link to={`/builder/edit/${v.row.original.formID}/responses`} className="btcd-tabl-lnk">{v.row.values.formName}</Link>, width: 250 },
    { Header: 'Short Code', accessor: 'shortcode', Cell: val => <CopyText value={val.row.values.shortcode} />, width: 220 },
    { Header: 'Views', accessor: 'views', width: 80 },
    { Header: 'Completion Rate', accessor: 'conversion', Cell: val => <Progressbar value={val.row.values.conversion} />, width: 170 },
    { Header: 'Responses', accessor: 'entries', Cell: value => <Link to={`formEntries/${value.row.original.formID}`} className="btcd-tabl-lnk">{value.row.values.entries}</Link>, width: 100 },
    { Header: 'Created', accessor: 'created_at', width: 160 },
    { Header: 'Actions', accessor: 'actions', Cell: val => <MenuBtn formID={val.row.original.formID} />, width: 100 },
  ]

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      bitsFetch(prepareData({}), 'bitapps_get_all_form')
        .then(res => {
          if (res !== undefined && res.success) {
            const dbForms = res.data.map(form => ({ formID: form.id, status: form.status !== '0', formName: form.form_name, shortcode: `bitapps id='${form.id}'`, entries: form.entries, views: form.views, conversion: ((form.entries / (form.views === '0' ? 1 : form.views)) * 100).toPrecision(3), created_at: form.created_at }))
            setData(dbForms)
          }
        })
    }
  }, [])

  const setBulkStatus = (e, rows) => {
    const status = e.target.innerHTML === 'Enable'
    const rowID = []
    const formID = []
    for (let i = 0; i < rows.length; i += 1) {
      rowID.push(rows[i].id)
      formID.push(rows[i].original.formID)
    }
    const tmp = [...data]
    const newData = [...data]
    for (let i = 0; i < rowID.length; i += 1) {
      newData[i].status = status
    }
    setData(newData)
    let ajaxData = { formID, status }
    if (process.env.NODE_ENV === 'development') {
      ajaxData = prepareData(ajaxData)
    }
    bitsFetch(ajaxData, 'bitapps_bulk_status_change')
      .then(res => {
        if (res !== undefined && !res.success) {
          setData(tmp)
        }
      })
  }

  const setBulkDelete = (e, rows) => {
    const rowID = []
    const formID = []
    for (let i = 0; i < rows.length; i += 1) {
      rowID.push(rows[i].id)
      formID.push(rows[i].original.formID)
    }
    const newData = [...data]
    const tmp = [...data]
    for (let i = rowID.length - 1; i >= 0; i -= 1) {
      newData.splice(Number(rowID[i]), 1)
    }
    setData(newData)
    let ajaxData = { formID }
    if (process.env.NODE_ENV === 'development') {
      ajaxData = prepareData(ajaxData)
    }
    bitsFetch(ajaxData, 'bitapps_bulk_delete')
      .then(res => {
        if (res !== undefined && !res.success) {
          setData(tmp)
        }
      })
  }

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
        <Table
          height="78vh"
          columns={cols}
          data={allForms}
          rowSeletable
          resizable
          columnHidable
          setBulkStatus={setBulkStatus}
          setBulkDelete={setBulkDelete}
        />
      </div>
    </div>
  )
}
