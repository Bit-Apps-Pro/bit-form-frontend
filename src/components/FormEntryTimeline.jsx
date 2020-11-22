import { useEffect, useState } from 'react'
import bitsFetch from '../Utils/bitsFetch'
import { dateTimeFormatter } from '../Utils/Helpers'
import Loader from './Loaders/Loader'

export default function FormEntryTimeline({ formID, entryID, allLabels, settab }) {
  // eslint-disable-next-line no-undef
  const dateTimeFormat = `${bits.dateFormat} ${bits.timeFormat}`
  const [log, setLog] = useState([])
  const [logShowMore, setLogShowMore] = useState([])
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

  const truncate = (str, n) => ((str.length > n) ? `${str.substr(0, n - 1)}&hellip;` : str);

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

  const showMore = id => {
    const newLogShowMore = [...logShowMore]
    newLogShowMore.push(id)
    setLogShowMore([...newLogShowMore])
  }

  const showLess = id => {
    const newLogShowMore = [...logShowMore]
    newLogShowMore.splice(newLogShowMore.indexOf(id), 1)
    setLogShowMore([...newLogShowMore])
  }

  // eslint-disable-next-line consistent-return
  const renderNoteLog = data => {
    const logShow = logShowMore.find(log => log === data.id)
    const note = JSON.parse(data.content)
    if (data.content !== null) {
      return (
        <>
          <p>
            Note
            {' '}
            {data.action_type === 'create' && 'Added'}
            {data.action_type === 'update' && 'Updated'}
            {data.action_type === 'delete' && 'Deleted'}
            :
          </p>
          {note.title && <h4>{note.title}</h4>}
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: logShow ? note.content : truncate(note.content, 20) }}
          />
          {(!logShow && note.content.length > 20) && <small role="button" tabIndex="0" className="btcd-link cp" onClick={() => showMore(data.id)} onKeyDown={() => showMore(data.id)}>Read More</small>}
          {logShow && <small role="button" tabIndex="0" className="btcd-link cp" onClick={() => showLess(data.id)} onKeyDown={() => showLess(data.id)}>Show Less</small>}
        </>
      )
    } if (data.content === null && data.action_type === 'update') {
      return <p>Note no change</p>
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
                {dateTimeFormatter(data.created_at, dateTimeFormat)}
              </span>
              <div>
                {data.log_type === 'entry' ? renderLog(data) : renderNoteLog(data)}
              </div>
            </div>
          ))
      }
    </>
  )
}
