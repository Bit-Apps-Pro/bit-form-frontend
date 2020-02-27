import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import bitsFetch from '../Utils/bitsFetch'

export default function FormTemplates() {
  const [templates, setTemplates] = useState(null)
  useEffect(() => {
    bitsFetch(null, 'bitapps_templates')
      .then(res => {
        if (res.success) {
          setTemplates(JSON.parse(res.data))
        }
      })
  }, [])

  return (
    templates
    && templates.map(template => (
      <div key={template.title} className="btcd-tem">
        <span className="btcd-icn icn-file" style={{ fontSize: 90 }} />
        <div>{template.title}</div>
        <div className="btcd-hid-btn">
          <Link to={`builder/new/${template.title}`} className="btn btn-white sh-sm" type="button">
            Create
          </Link>
        </div>
      </div>
    ))
  )
}
