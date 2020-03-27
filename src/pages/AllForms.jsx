/* eslint-disable no-undef */
import React, { useState, useContext, useCallback } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Table from '../components/Table'
import SingleToggle2 from '../components/ElmSettings/Childs/SingleToggle2'
import CopyText from '../components/ElmSettings/Childs/CopyText'
import Progressbar from '../components/ElmSettings/Childs/Progressbar'
import MenuBtn from '../components/ElmSettings/Childs/MenuBtn'
import Modal from '../components/Modal'
import FormTemplates from '../components/FormTemplates'
import bitsFetch from '../Utils/bitsFetch'
import { BitappsContext } from '../Utils/BitappsContext'

export default function AllFroms() {
  console.log('%c $render AllFroms', 'background:yellow;padding:3px;border-radius:5px;')

  const [modal, setModal] = useState(false)
  const { allFormsData, snackMsg } = useContext(BitappsContext)
  const { allForms, allFormsDispatchHandler } = allFormsData
  const { setSnackbar } = snackMsg


  const handleStatus = (e, id) => {
    const el = e.target
    const data = { id, status: el.checked }
    bitsFetch(data, 'bitapps_change_status')
      .then(res => {
        if (!res.success) {
          el.checked = !el.checked
        } else {
          allFormsDispatchHandler({ type: 'update', data: { formID: id, status: data.status } })
          setSnackbar({ show: true, msg: res.data })
        }
      })
  }

  const [cols, setCols] = useState([
    { width: 70, minWidth: 60, Header: 'Status', accessor: 'status', Cell: value => <SingleToggle2 action={(e) => handleStatus(e, value.row.original.formID)} checked={value.row.original.status} /> },
    { width: 250, minWidth: 80, Header: 'Form Name', accessor: 'formName', Cell: v => <Link to={`/builder/edit/${v.row.original.formID}/responses`} className="btcd-tabl-lnk">{v.row.values.formName}</Link> },
    { width: 220, minWidth: 200, Header: 'Short Code', accessor: 'shortcode', Cell: val => <CopyText value={val.row.values.shortcode} /> },
    { width: 80, minWidth: 60, Header: 'Views', accessor: 'views' },
    { width: 170, minWidth: 130, Header: 'Completion Rate', accessor: 'conversion', Cell: val => <Progressbar value={val.row.values.conversion} /> },
    { width: 100, minWidth: 60, Header: 'Responses', accessor: 'entries', Cell: value => <Link to={`formEntries/${value.row.original.formID}`} className="btcd-tabl-lnk">{value.row.values.entries}</Link> },
    { width: 160, minWidth: 60, Header: 'Created', accessor: 'created_at' },
    { sticky: 'right', width: 100, minWidth: 60, Header: 'Actions', accessor: 't_action', Cell: val => <MenuBtn formID={val.row.original.formID} index={val.row.id} /> },
  ])

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      bitsFetch(null, 'bitapps_get_all_form')
        .then(res => {
          if (res !== undefined && res.success && typeof res.data === 'object') {
            const dbForms = res.data.map(form => ({ formID: form.id, status: form.status !== '0', formName: form.form_name, shortcode: `bitapps id='${form.id}'`, entries: form.entries, views: form.views, conversion: ((form.entries / (form.views === '0' ? 1 : form.views)) * 100).toPrecision(3), created_at: form.created_at }))
            allFormsDispatchHandler({ data: dbForms, type: 'set' })
          }
        })
    }
  }, [])

  const setBulkStatus = useCallback(rows => {
    const status = e.target.innerHTML === 'Enable'
    const rowID = []
    const formID = []
    for (let i = 0; i < rows.length; i += 1) {
      rowID.push(rows[i].id)
      formID.push(rows[i].original.formID)
    }
    const tmp = [...allForms]
    const newData = [...allForms]
    for (let i = 0; i < rowID.length; i += 1) {
      newData[rowID[i]].status = status
    }
    allFormsDispatchHandler({ data: newData, type: 'set' })
    const ajaxData = { formID, status }

    bitsFetch(ajaxData, 'bitapps_bulk_status_change')
      .then(res => {
        if (res !== undefined && !res.success) {
          allFormsDispatchHandler({ data: tmp, type: 'set' })
        } else if (res.success) {
          setSnackbar({ show: true, msg: res.data })
        }
      })
  }, [])

  const setBulkDelete = useCallback(rows => {
    const rowID = []
    const formID = []
    for (let i = 0; i < rows.length; i += 1) {
      rowID.push(rows[i].id)
      formID.push(rows[i].original.formID)
    }
    const newData = [...allForms]
    const tmp = [...allForms]
    for (let i = rowID.length - 1; i >= 0; i -= 1) {
      newData.splice(Number(rowID[i]), 1)
    }
    allFormsDispatchHandler({ data: newData, type: 'set' })
    const ajaxData = { formID }

    bitsFetch(ajaxData, 'bitapps_bulk_delete_form')
      .then(res => {
        if (res !== undefined && !res.success) {
          allFormsDispatchHandler({ data: tmp, type: 'set' })
        } else if (res.success) {
          setSnackbar({ show: true, msg: res.data })
        }
      })
  }, [])

  const setTableCols = useCallback(newCols => {
    setCols(newCols)
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
            <span className="btcd-icn icn-file" style={{ fontSize: 90 }} />
            <div>Blank</div>
            <div className="btcd-hid-btn">
              <NavLink to="/builder/new/blank" className="btn btn-white sh-sm" type="button">Create</NavLink>
            </div>
          </div>
          <div className="btcd-tem">
            <span className="btcd-icn icn-file" style={{ fontSize: 90 }} />
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
        <button onClick={() => setModal(true)} type="button" className="btn round btcd-btn-lg blue blue-sh">Create From</button>
      </div>
      <div className="forms">
        <Table
          className="f-table btcd-all-frm"
          height={500}
          columns={cols}
          data={allForms}
          rowSeletable
          resizable
          columnHidable
          setBulkStatus={setBulkStatus}
          setBulkDelete={setBulkDelete}
          setTableCols={setTableCols}
        />
      </div>
    </div>
  )
}
