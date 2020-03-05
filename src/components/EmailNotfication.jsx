import React, { useState } from 'react'
import SingleToggle2 from './ElmSettings/Childs/SingleToggle2'
import Modal from './Modal'

export default function EmailNotfication() {
  console.log('render EmailNotfication')
  const notify = [
    { status: 1, label: 'Hello text', email_sub: 'email subject here ...' },
    { status: 1, label: 'Hello text', email_sub: 'email subject here ...' },
    { status: 0, label: 'Hello text', email_sub: 'email subject here ...' },
    { status: 1, label: 'Hello text', email_sub: 'email subject here ...' },
    { status: 1, label: 'Hello text', email_sub: 'email subject here ...' },
    { status: 0, label: 'Again Hello text', email_sub: 'New email subject here ...' },
  ]

  const [dupDiag, setDupDiag] = useState(false)
  return (
    <div className="btcd-eml-not">
      <Modal
        sm
        show={dupDiag}
        setModal={setDupDiag}
        title="Duplicate"
      >
        <h2>asda</h2>
      </Modal>
      <div className="flx flx-between">
        <h2>Email Notification</h2>
        <button className="btn btn-lg blue blue-sh" type="button">Add New</button>
      </div>
      <div className="btcd-em-n-t-wrp">
        <table className="btcd-em-n-t">
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th>Label</th>
              <th>Email Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notify.map((itm, i) => (
              <tr key={`em-${i + 2}`}>
                <td>{i + 1}</td>
                <td><SingleToggle2 checked={itm.status} /></td>
                <td>{itm.label}</td>
                <td>{itm.email_sub}</td>
                <td>
                  <button onClick={() => setDupDiag(true)} className="btcd-menu-btn sh-sm tooltip" style={{ '--tooltip-txt': '"Duplicate"' }} type="button" aria-label="Duplicate"><span className="btcd-icn icn-copy" /></button>
                  <button className="btcd-menu-btn sh-sm tooltip" style={{ '--tooltip-txt': '"Edit"' }} type="button" aria-label="Edit"><span className="btcd-icn icn-edit" /></button>
                  <button className="btcd-menu-btn sh-sm tooltip" style={{ '--tooltip-txt': '"Delete"' }} type="button" aria-label="Delete"><span className="btcd-icn icn-trash-2" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
