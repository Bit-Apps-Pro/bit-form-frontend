/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import { NavLink, useParams, useHistory } from 'react-router-dom'

function EmailTemplateEdit({ mailTem, setMailTem }) {
  console.log('%c $render EmailTemplateEdit', 'background:purple;padding:3px;border-radius:5px;color:white')

  const [tem, setTem] = useState({ title: 'New Template', sub: 'Email Subject', body: 'Email Body' })

  const { formType, formID, id } = useParams()
  const history = useHistory()

  const handleTitle = e => {
    tem.title = e.target.value
    setTem({ ...tem })
  }

  const handleSubject = e => {
    tem.sub = e.target.value
    setTem({ ...tem })
  }

  const handleBody = e => {
    tem.body = e.target.value
    setTem({ ...tem })
  }
  const save = () => {
    mailTem.push(tem)
    setMailTem([...mailTem])
    history.push(`/builder/${formType}/${formID}/settings/email-templates`)
  }

  return (
    <div className="w-7">
      <NavLink to={`/builder/${formType}/${formID}/settings/email-templates`} className="btn btcd-btn-o-gray">
        <span className="btcd-icn icn-arrow_back" />
        &nbsp;
        Back
      </NavLink>

      <button onClick={save} className="btn blue f-right" type="button">Save</button>

      <div className="mt-3 flx">
        <b style={{ width: 135 }}>Template Name: </b>
        <input onChange={handleTitle} type="text" className="btcd-paper-inp w-7" placeholder="Name" value={tem.title} />
      </div>
      <div className="mt-3 flx">
        <b style={{ width: 135 }}>Subject:</b>
        <input onChange={handleSubject} type="text" className="btcd-paper-inp w-7" placeholder="Email Subject Here" value={tem.sub} />
      </div>

      <div className="mt-3">
        <div><b>Body:</b></div>

        <label htmlFor={`t-m-e-${id}-${formID}`} className="mt-2 w-10">
          <textarea
            id={`t-m-e-${id}-${formID}`}
            onChange={handleBody}
            className="btcd-editor btcd-paper-inp mt-1"
            rows="5"
            value={tem.body}
          />
        </label>
      </div>


    </div>
  )
}

export default EmailTemplateEdit
