import React, { useState } from 'react'
import { NavLink, useRouteMatch, Link } from 'react-router-dom'
import Table from './Table'
import Button from './ElmSettings/Childs/Button'
import bitsFetch from '../Utils/bitsFetch'
import ConfirmModal from './ConfirmModal'

export default function EmailTemplate({ mailTem, setMailTem, formID }) {
  console.log('%c $render EmailTemplate', 'background:green;padding:3px;border-radius:5px;color:white')

  const [confMdl, setconfMdl] = useState({ show: false })
  const { url } = useRouteMatch()

  const duplicateTem = i => {
    mailTem.splice(i + 1, 0, { title: mailTem[i].title, sub: mailTem[i].sub, body: mailTem[i].body })
    setMailTem([...mailTem])
  }

  const delTem = (i, templateData) => {
    if (templateData.original.id) {
      bitsFetch({ formID, id: templateData.original.id }, 'bitapps_delete_mailtemplate')
        .then(res => {
          if (res !== undefined && res.success) {
            mailTem.splice(i, 1)
            setMailTem([...mailTem])
          }
        })
    } else {
      mailTem.splice(i, 1)
      setMailTem([...mailTem])
    }
  }

  const closeConfMdl = () => {
    confMdl.show = false
    setconfMdl({ ...confMdl })
  }

  const temDelConf = (i, templateData) => {
    confMdl.btnTxt = 'Delete'
    confMdl.body = 'Are you sure to delete this template'
    confMdl.btnClass = ''
    confMdl.action = () => { delTem(i, templateData); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const temDupConf = i => {
    confMdl.btnTxt = 'Dulicate'
    confMdl.body = 'Are you sure to duplicate this template'
    confMdl.btnClass = 'blue'
    confMdl.action = () => { duplicateTem(i); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const col = [
    { Header: 'Template Name', accessor: 'title' },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: row => (
        <>
          <Button onClick={() => temDupConf(row.row.index)} className="icn-btn mr-2 tooltip pos-rel" style={{ '--tooltip-txt': '"Duplicate"' }}>
            <span className="btcd-icn icn-file_copy" />
          </Button>
          <NavLink to={`${url}/${row.row.index}`} className="icn-btn mr-2 flx flx-center tooltip pos-rel" style={{ '--tooltip-txt': '"Edit"' }}>
            <span className="btcd-icn icn-document-edit" />
          </NavLink>
          <Button onClick={() => temDelConf(row.row.index, row.row)} className="icn-btn tooltip pos-rel" style={{ '--tooltip-txt': '"Delete"' }}>
            <span className="btcd-icn icn-trash-fill" />
          </Button>
        </>
      ),
    },
  ]

  return (
    <div className="w-7">
      <ConfirmModal
        show={confMdl.show}
        close={closeConfMdl}
        btnTxt={confMdl.btnTxt}
        btnClass={confMdl.btnClass}
        body={confMdl.body}
        action={confMdl.action}
      />
      <h2>Email Templates</h2>
      <div className="">
        <Link to={`${url}/new`} className="btn blue sh-sm">
          <span className="btcd-icn icn-layout" />
          &nbsp;Add New Template
        </Link>
        {mailTem.length > 0 ? (
          <Table
            height="60vh"
            className="btcd-neu-table"
            columns={col}
            data={mailTem}
          />
        )
          : (
            <div className="txt-center btcd-empty">
              <span className="btcd-icn icn-stack" />
              Empty
            </div>
          )}
      </div>
    </div>
  )
}
