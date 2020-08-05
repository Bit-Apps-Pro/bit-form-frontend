import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import bitsFetch from '../Utils/bitsFetch'

export default function FormTemplates() {
  console.log('%c $render FormTemplates', 'background:purple;padding:3px;border-radius:5px;color:white')

  const [templates, setTemplates] = useState(null)
  useEffect(() => {
    let mount = true
    bitsFetch(null, 'bitforms_templates')
      .then(res => {
        if (typeof res !== 'undefined' && res.success && mount) {
          setTemplates(JSON.parse(res.data))
        }
      })
    return function cleanup() { mount = false }
  }, [])

  return (
    templates
    && templates.map(template => (
      <div key={template.title} className="btcd-tem">
        <span className="btcd-icn icn-file" style={{ fontSize: 90 }} />
        <div>{template.title}</div>
        <div className="btcd-hid-btn">
          <Link to={`form/builder/new/${template.title}`} className="btn btn-white sh-sm" type="button">
            Create
          </Link>
        </div>
      </div>
    ))
  )
}
