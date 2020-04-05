/* eslint-disable no-param-reassign */
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

function EmailTemplateEdit({ mailTem, setMailTem }) {
  console.log('%c $render EmailTemplateEdit', 'background:purple;padding:3px;border-radius:5px;color:white')

  const { formType, formID, id } = useParams()

  const handleTitle = e => {
    mailTem[id].title = e.target.value
    setMailTem([...mailTem])
  }

  const handleSubject = e => {
    mailTem[id].sub = e.target.value
    setMailTem([...mailTem])
  }

  const handleBody = e => {
    mailTem[id].body = e.target.value
    setMailTem([...mailTem])
  }

  return (
    <div className="w-7">
      <NavLink to={`/builder/${formType}/${formID}/settings/email-templates`} className="btn btcd-btn-o-gray">
        <span className="btcd-icn icn-arrow_back" />
        {' '}
        Back
      </NavLink>

      <div className="mt-3 flx">
        <b style={{ width: 135 }}>Template Name: </b>
        <input onChange={handleTitle} type="text" className="btcd-paper-inp w-7" placeholder="Name" value={mailTem[id].title} />
      </div>
      <div className="mt-3 flx">
        <b style={{ width: 135 }}>Subject:</b>
        <input onChange={handleSubject} type="text" className="btcd-paper-inp w-7" placeholder="Email Subject Here" value={mailTem[id].sub} />
      </div>

      <div className="mt-3">
        <div><b>Body:</b></div>

        <label className="mt-2 w-10">
          <textarea
            onChange={handleBody}
            className="btcd-editor btcd-paper-inp"
            rows="5"
            value={mailTem[id].body}
          />
        </label>
      </div>


    </div>
  )
}

export default EmailTemplateEdit
