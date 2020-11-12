import { useState, useEffect } from 'react'
import bitsFetch from '../Utils/bitsFetch'

export default function FormEntryTimeline({ formID, entryID, allLabels, settab }) {
  const [log, setLog] = useState([])
  useEffect(() => {
    settab('timeline')
  }, [])
  useEffect(() => {
    // eslint-disable-next-line no-undef
    bitsFetch({ formID, entryID }, 'bitforms_form_log_history').then((res) => {
      if (res !== undefined && res.success) {
        setLog(res.data);
      }
    })
  }, [entryID, formID])

  const replaceFieldWithLabel = str => {
    const pattern = /\${\w[^ ${}]*}/g
    const pattern2 = /[\]["]/g
    const key = str.match(pattern)?.[0] || ''
    const field = key ? allLabels.find(label => `$\{${label.key}}` === key) : ''
    const fieldName = field ? field.adminLbl : ''
    const replacedField = fieldName ? str.replace(pattern, fieldName) : ''
    return replacedField ? replacedField.replace(pattern2, '') : 'Field Deleted'
  }

  const renderLog = data => {
    if (data.meta_key === null && data.log_type === 'update') {
      return <p>No field data change</p>
    } if (data.meta_key === null && data.log_type === 'Create') {
      return <p>Form Submitted</p>
    }
    return data.meta_key.split('b::f').map((str, i) => (
      <p key={str}>
        {' '}
        <span
          className="btcd-icn icn-document-edit"
          style={{ fontSize: 16 }}
        />
        {replaceFieldWithLabel(str)}
      </p>
    ))
  }

  return (
    <>
      {log.map((data) => (
        <div key={data.id}>
          <br />
          <span>
            {new Date(data.created_at).toDateString()}
            {' '}
            {new Date(data.created_at).toLocaleTimeString()}
          </span>
          <div>
            {renderLog(data)}
          </div>
        </div>
      ))}
    </>
  )
}
