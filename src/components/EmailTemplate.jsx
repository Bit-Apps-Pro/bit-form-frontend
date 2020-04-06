import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import Table from './Table'
import Button from './ElmSettings/Childs/Button'
import bitsFetch from '../Utils/bitsFetch'

export default function EmailTemplate({ mailTem, setMailTem, formID }) {
  console.log('%c $render EmailTemplate', 'background:green;padding:3px;border-radius:5px;color:white')

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

  const addTem = () => {
    mailTem.push({ title: 'New Template', sub: 'Email Subject', body: 'Email Body' })
    setMailTem([...mailTem])
  }

  const col = [
    { Header: 'Template Name', accessor: 'title' },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: row => (
        <>
          <Button onClick={() => duplicateTem(row.row.index)} className="icn-btn mr-2 tooltip pos-rel" style={{ '--tooltip-txt': '"Duplicate"' }}>
            <span className="btcd-icn icn-file_copy" />
          </Button>
          <NavLink to={`${url}/${row.row.index}`} className="icn-btn mr-2 flx flx-center tooltip pos-rel" style={{ '--tooltip-txt': '"Edit"' }}>
            <span className="btcd-icn icn-document-edit" />
          </NavLink>
          <Button onClick={() => delTem(row.row.index, row.row)} className="icn-btn tooltip pos-rel" style={{ '--tooltip-txt': '"Delete"' }}>
            <span className="btcd-icn icn-trash-fill" />
          </Button>
        </>
      ),
    },
  ]

  return (
    <div className="w-7">
      <h2>Email Templates</h2>
      <div className="">
        <button onClick={addTem} type="button" className="btn blue sh-sm">Add a Template</button>
        <Table
          height="60vh"
          className="btcd-neu-table"
          columns={col}
          data={mailTem}
        />

      </div>
    </div>
  )
}
