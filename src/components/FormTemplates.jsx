import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function FormTemplates() {
  const [templates, setTemplates] = useState(null)
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      const fetchTemplates = async () => {
        // eslint-disable-next-line no-undef
        const result = await axios.post(bits.ajaxURL, null, {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            action: 'bitapps_templates',
            // eslint-disable-next-line no-undef
            _ajax_nonce: bits.nonce,
          },
        })

        setTemplates(JSON.parse(result.data.data))
      }
      if (!templates) {
        fetchTemplates()
      }
    }
  })
  return (
    templates
    && templates.map(template => (
      <div className="btcd-tem">
        <span className="btcd-icn icn-file-empty" style={{ fontSize: 90 }} />
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