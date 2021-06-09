import { useState } from 'react'

import { NavLink, useRouteMatch, Link } from 'react-router-dom'
import { __ } from '../Utils/i18nwrap'
import Table from './Utilities/Table'
import Button from './Utilities/Button'
import bitsFetch from '../Utils/bitsFetch'
import ConfirmModal from './Utilities/ConfirmModal'

export default function EmailTemplate({ mailTem, setMailTem, formID }) {
  const [confMdl, setconfMdl] = useState({ show: false })

  const { url } = useRouteMatch()

  const duplicateTem = i => {
    mailTem.splice(i + 1, 0, { title: mailTem[i].title, sub: mailTem[i].sub, body: mailTem[i].body })
    setMailTem([...mailTem])
  }

  const delTem = (i, templateData) => {
    if (templateData.original.id) {
      bitsFetch({ formID, id: templateData.original.id }, 'bitforms_delete_mailtemplate')
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
    confMdl.btnTxt = __('Delete', 'bitform')
    confMdl.body = __('Are you sure to delete this template', 'bitform')
    confMdl.btnClass = ''
    confMdl.action = () => { delTem(i, templateData); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const temDupConf = i => {
    confMdl.btnTxt = __('Dulicate', 'bitform')
    confMdl.body = __('Are you sure to duplicate this template?', 'bitform')
    confMdl.btnClass = 'blue'
    confMdl.action = () => { duplicateTem(i); closeConfMdl() }
    confMdl.show = true
    setconfMdl({ ...confMdl })
  }

  const col = [
    {
      Header: __('Template Name', 'bitform'),
      accessor: 'title',
      Cell: row => (
        <NavLink to={`${url}/${row.row.index}`}>
          {row.cell.value}
        </NavLink>
      ),
    },
    {
      Header: __('Action', 'bitform'),
      accessor: 'action',
      Cell: row => (
        <>
          <Button onClick={() => temDupConf(row.row.index)} className="icn-btn mr-2 tooltip pos-rel" style={{ '--tooltip-txt': `'${__('Duplicate', 'bitform')}'` }}>
            <span className="btcd-icn icn-file_copy" />
          </Button>
          <NavLink to={`${url}/${row.row.index}`} className="icn-btn mr-2 flx flx-center tooltip pos-rel" style={{ '--tooltip-txt': `'${__('Edit', 'bitform')}'` }}>
            <span className="btcd-icn icn-document-edit" />
          </NavLink>
          <Button onClick={() => temDelConf(row.row.index, row.row)} className="icn-btn tooltip pos-rel" style={{ '--tooltip-txt': `'${__('Delete', 'bitform')}'` }}>
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
      <h2>{__('Email Templates', 'bitform')}</h2>
      <h5>
        How to setup Email Templates & Send Email Notification:
        &nbsp;
        <a href="https://youtu.be/HpMUF5EO-Gg" target="_blank" rel="noreferrer" style={{ color: 'red' }}>
          YouTube
        </a>
        {/* &nbsp;
        <a href="https://bitpress.pro" target="_blank" rel="noreferrer" style={{ color: '#0575f1' }}>
          Documentation
        </a> */}
      </h5>
      <div className="">
        <Link to={`${url}/new`} className="btn blue">
          <span className="btcd-icn icn-layout" />
          &nbsp;
          {__('Add New Template', 'bitform')}
        </Link>
        {mailTem.length > 0 ? (
          <Table
            height="60vh"
            className="btcd-neu-table mr-1"
            columns={col}
            data={mailTem}
          />
        )
          : (
            <div className="txt-center btcd-empty">
              <span className="btcd-icn icn-stack" />
              {__('Empty', 'bitform')}
            </div>
          )}
      </div>
    </div>
  )
}
