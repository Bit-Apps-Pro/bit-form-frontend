import React from 'react'

export default function EmailNotfication(props) {
  return (
    <div className="btcd-eml-not">
      <div className="flx flx-between">
        <h2>Email Notification</h2>
        <button className="btn btn-lg blue blue-sh" type="button">Add New</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Label</th>
              <th>Email Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
