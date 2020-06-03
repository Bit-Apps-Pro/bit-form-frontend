/* eslint-disable no-undef */
import React, { useState, useEffect, useContext, useCallback, memo, lazy } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Table from '../components/Table'
import SingleToggle2 from '../components/ElmSettings/Childs/SingleToggle2'
import CopyText from '../components/ElmSettings/Childs/CopyText'
import Progressbar from '../components/ElmSettings/Childs/Progressbar'
import MenuBtn from '../components/ElmSettings/Childs/MenuBtn'
import Modal from '../components/Modal'
import FormTemplates from '../components/FormTemplates'
import bitsFetch from '../Utils/bitsFetch'
import { AllFormContext } from '../Utils/AllFormContext'
import ConfirmModal from '../components/ConfirmModal'
import SnackMsg from '../components/ElmSettings/Childs/SnackMsg'

const Welcome = lazy(() => import('./Welcome'))

function AllFroms() {
  console.log('%c $render AllFroms', 'background:yellow;padding:3px;border-radius:5px;')

  const [modal, setModal] = useState(false)
  const { allFormsData } = useContext(AllFormContext)
  const [snack, setSnackbar] = useState({ show: false })
  const { allForms, allFormsDispatchHandler } = allFormsData
  const [confMdl, setconfMdl] = useState({ show: false, btnTxt: '' })

  const handleStatus = (e, id) => {
    const status = e.target.checked
    const data = { id, status }
    allFormsDispatchHandler({ type: 'update', data: { formID: id, status: data.status } })
    bitsFetch(data, 'bitforms_change_status')
      .then(res => {
        if ('success' in res && !res.success) {
          allFormsDispatchHandler({ type: 'update', data: { formID: id, status: data.status } })
          setSnackbar({ ...{ show: true, msg: 'Failed to change Form Status' } })
        }
      }).catch(() => {
        allFormsDispatchHandler({ type: 'update', data: { formID: id, status: !status } })
        setSnackbar({ ...{ show: true, msg: 'Failed to change Form Status' } })
      })
  }

  const formatDate = dt => {
    let d = new Date(dt)
    if (`${d}` === 'Invalid Date') {
      d = new Date(dt.split(' ').join('T'))
    }
    const ye = new Intl.DateTimeFormat('en', { year: '2-digit' }).format(d)
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    const hr = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(d)
    return (
      <div style={{ lineHeight: 0.7, fontWeight: 500 }}>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        {da}-{mo}-{ye}
        <br />
        <br />
        <small>{hr}</small>
      </div>
    )
  }

  const [cols, setCols] = useState([
    { width: 70, minWidth: 60, Header: 'Status', accessor: 'status', Cell: value => <SingleToggle2 className="flx" action={(e) => handleStatus(e, value.row.original.formID)} checked={value.row.original.status} /> },
    { width: 250, minWidth: 80, Header: 'Form Name', accessor: 'formName', Cell: v => <Link to={`/builder/edit/${v.row.original.formID}/responses`} className="btcd-tabl-lnk">{v.row.values.formName}</Link> },
    { width: 220, minWidth: 200, Header: 'Short Code', accessor: 'shortcode', Cell: val => <CopyText value={`[${val.row.values.shortcode}]`} setSnackbar={setSnackbar} className="cpyTxt" /> },
    { width: 80, minWidth: 60, Header: 'Views', accessor: 'views' },
    { width: 170, minWidth: 130, Header: 'Completion Rate', accessor: 'conversion', Cell: val => <Progressbar value={val.row.values.conversion} /> },
    { width: 100, minWidth: 60, Header: 'Responses', accessor: 'entries', Cell: value => <Link to={`formEntries/${value.row.original.formID}`} className="btcd-tabl-lnk">{value.row.values.entries}</Link> },
    { width: 160, minWidth: 60, Header: 'Created', accessor: 'created_at', Cell: row => formatDate(row.row.original.created_at) },
    { sticky: 'right', width: 100, minWidth: 60, Header: 'Actions', accessor: 't_action', Cell: val => <MenuBtn formID={val.row.original.formID} index={val.row.id} del={() => showDelModal(val.row.original.formID, val.row.index)} dup={(e) => showDupMdl(val.row.original.formID)} /> },
  ])

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      bitsFetch(null, 'bitforms_get_all_form')
        .then(res => {
          if (res !== undefined && res.success && typeof res.data === 'object') {
            const dbForms = res.data.map(form => ({ formID: form.id, status: form.status !== '0', formName: form.form_name, shortcode: `bitforms id='${form.id}'`, entries: form.entries, views: form.views, conversion: ((form.entries / (form.views === '0' ? 1 : form.views)) * 100).toPrecision(3), created_at: form.created_at }))
            allFormsDispatchHandler({ data: dbForms, type: 'set' })
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setBulkStatus = useCallback((e, rows) => {
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

    bitsFetch(ajaxData, 'bitforms_bulk_status_change')
      .then(res => {
        if (res !== undefined && !res.success) {
          allFormsDispatchHandler({ data: tmp, type: 'set' })
        } else if (res.success) {
          setSnackbar({ show: true, msg: res.data })
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setBulkDelete = useCallback(rows => {
    const rowID = []
    const formID = []
    for (let i = 0; i < rows.length; i += 1) {
      rowID.push(rows[i].id)
      formID.push(rows[i].original.formID)
    }
    const newData = [...allForms]
    for (let i = rowID.length - 1; i >= 0; i -= 1) {
      newData.splice(Number(rowID[i]), 1)
    }
    allFormsDispatchHandler({ data: newData, type: 'set' })
    const ajaxData = { formID }

    bitsFetch(ajaxData, 'bitforms_bulk_delete_form')
      .then(res => {
        if (res === undefined || !res.success) {
          allFormsDispatchHandler({ data: tmp, type: 'set' })
        } else if (res.success) {
          setSnackbar({ show: true, msg: res.data })
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = (formID, index) => {
    bitsFetch({ id: formID }, 'bitforms_delete_aform').then(response => {
      if (response.success) {
        allFormsDispatchHandler({ type: 'remove', data: index })
        setSnackbar({ show: true, msg: 'Form Deleted !' })
      }
    })
  }

  const handleDuplicate = formID => {
    bitsFetch({ id: formID }, 'bitforms_duplicate_aform').then(response => {
      if (response.success) {
        const { data } = response
        allFormsDispatchHandler({ type: 'add', data: { formID: data.id, status: true, formName: data.form_name, shortcode: `bitforms id='${data.id}'`, entries: 0, views: 0, conversion: (0).toPrecision(3), created_at: data.created_at } })
        setSnackbar({ show: true, msg: 'Form Duplicated Successfully.' })
      }
    })
  }

  const setTableCols = useCallback(newCols => {
    setCols(newCols)
  }, [])

  const closeConfMdl = () => {
    confMdl.show = false
    setconfMdl({ ...confMdl })
  }

  const showDelModal = (formID, index) => {
    confMdl.action = () => { handleDelete(formID, index); closeConfMdl() }
    confMdl.btnTxt = 'Delete'
    confMdl.btn2Txt = null
    confMdl.btnClass = ''
    confMdl.body = 'Are you sure to delete this form ?'
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const showDupMdl = formID => {
    confMdl.action = () => { handleDuplicate(formID); closeConfMdl() }
    confMdl.btnTxt = 'Duplicate'
    confMdl.btn2Txt = null
    confMdl.btnClass = 'blue'
    confMdl.body = 'Are you sure to duplicate this form ?'
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  return (
    <div id="all-forms">
      <SnackMsg snack={snack} setSnackbar={setSnackbar} />
      <ConfirmModal
        show={confMdl.show}
        body={confMdl.body}
        action={confMdl.action}
        close={closeConfMdl}
        btnTxt={confMdl.btnTxt}
        btn2Txt={confMdl.btn2Txt}
        btn2Action={confMdl.btn2Action}
        btnClass={confMdl.btnClass}
      />
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
          {modal && <FormTemplates />}
        </div>
      </Modal>

      {allForms.length > 0 ? (
        <>
          <div className="af-header flx flx-between">
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
        </>
      ) : <Welcome setModal={setModal} />}
    </div>
  )
}

export default memo(AllFroms)
