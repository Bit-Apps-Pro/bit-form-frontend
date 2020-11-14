import { useEffect, useState } from 'react'
import bitsFetch from '../Utils/bitsFetch'
import Loader from './Loaders/Loader'

export default function FormEntryTimeline({ formID, entryID, allLabels, settab }) {
  const [log, setLog] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    settab('timeline')
    setIsLoading(true)

    bitsFetch({ formID, entryID }, 'bitforms_form_log_history').then((res) => {
      if (res !== undefined && res.success) {
        setLog(res.data);
      }
      setIsLoading(false)
    })
  }, [])

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
    if (data.content === null && data.action_type === 'update') {
      return <p>No field data change</p>
    } if (data.content === null && data.action_type === 'create') {
      return <p>Form Submitted</p>
    }
    return data.content.split('b::f').map(str => (
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

  // eslint-disable-next-line consistent-return
  const renderNodeLog = data => {
    const note = JSON.parse(data.content)
    if (data.content !== null && data.action_type === 'create') {
      return (
        <>
          <p>
            Note Added:
          </p>
          {note.title && <h4>{note.title}</h4>}
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </>
      )
    } if (data.content === null && data.action_type === 'update') {
      return <p>Note no change</p>
    } if (data.content !== null && data.action_type === 'delete') {
      return (
        <>
          <p>
            Note Deleted:
          </p>
          {note.title && <h4>{note.title}</h4>}
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </>
      )
    } if (data.content !== null && data.action_type === 'update') {
      return (
        <>
          <p>
            Note Updated:
          </p>
          {note.title && <h4>{note.title}</h4>}
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </>
      )
    }
  }
  return (
    <>
      {
        isLoading
          ? (
            <Loader style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 70,
              transform: 'scale(0.7)',
            }}
            />
          )
          : log.map((data) => (
            <div key={data.id}>
              <br />
              <span>
                {new Date(data.created_at).toDateString()}
                {' '}
                {new Date(data.created_at).toLocaleTimeString()}
              </span>
              <div>
                {data.log_type === 'entry' ? renderLog(data) : renderNodeLog(data)}
              </div>
            </div>
          ))
      }
    </>
  )
}
