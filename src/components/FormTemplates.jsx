import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import bitsFetch from '../Utils/bitsFetch'

export default function FormTemplates() {
  console.log('%c $render FormTemplates', 'background:purple;padding:3px;border-radius:5px;color:white')

  const [, setTemplates] = useState(null)
  const staticTem = [{ lbl: 'Blank', img: '' }, { lbl: 'Contact Form', img: '' }]

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
    <div className="btcd-tem-lay flx">
      {staticTem.map(tem => (
        <div key={tem.lbl} className="btcd-tem flx">
          <span className="btcd-icn icn-file" style={{ fontSize: 90 }} />
          <div>{tem.lbl}</div>
          <div className="btcd-hid-btn">
            <Link to={`/form/builder/new/${tem.lbl}/fs`} className="btn btn-white sh-sm" type="button">Create</Link>
          </div>
        </div>
      ))}
      {/* {templates && templates.map(template => (
        <div key={template.title} className="btcd-tem">
          <span className="btcd-icn icn-file" style={{ fontSize: 90 }} />
          <div>{template.title}</div>
          <div className="btcd-hid-btn">
            <Link to={`form/builder/new/${template.title}/fs`} className="btn btn-white sh-sm" type="button">
              Create
            </Link>
          </div>
        </div>
      ))} */}
    </div>
  )
}
