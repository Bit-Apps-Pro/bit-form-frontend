// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useState, useEffect } from 'react'
import bitsFetch from '../../Utils/bitsFetch'
import LoaderSm from '../Loaders/LoaderSm'

export default function MailSendTest({ setsnack, settab }) {
    const [isTestLoading, setisTestLoading] = useState(false)
    const [toEmail, setToEmail] = useState('')
    const [toSubject, setToSubject] = useState('')
    const [toMessage, setToMessage] = useState('')
    const testEmailHandle = (e) => {
        if (toEmail === '') {
          alert('Email Field is required')
          return false
        } if (toSubject === '') {
          alert('Subject Field is required')
          return false
        }
        if (toMessage === '') {
          alert('Message Field is required')
          return false
        }
        e.preventDefault()
        setisTestLoading(true)
        bitsFetch({ to: toEmail, subject: toSubject, message: toMessage },
          'bitforms_test_email').then((res) => {
            if (res !== undefined && res.success) {
              if (res.data) {
                setsnack({ ...{ show: true, msg: __('mail send successfully', 'bitform') } })
              } else {
                setsnack({ ...{ show: true, msg: __('wrong smtp configuration,please try again', 'bitform') } })
              }
            } else {
              setsnack({ ...{ show: true, msg: __('mail test fail,please try again', 'bitform') } })
            }
            setisTestLoading(false)
          })
      }

      const emailHandle = (e) => {
        setToEmail(e.target.value)
      }
      const subjectHandle = (e) => {
        setToSubject(e.target.value)
      }
      const messageHandle = (e) => {
        setToMessage(e.target.value)
      }

      useEffect(() => {
        settab('test_mail')
      }, [])

    return (
      <div>
        <h2>
          {__('Email Test', 'bitform')}
          {' '}
        </h2>
        <div className="mt-2">
          <label htmlFor="form_email_address">
            {__('To:', 'bitform')}
            <input id="to" name="to" value={toEmail} onChange={(e) => emailHandle(e)} className="btcd-paper-inp mt-1" placeholder="" type="text" />
          </label>
        </div>
        <div className="mt-2">
          <label htmlFor="form_name">
            {__('Subject:', 'bitform')}
            <input id="subject" name="subject" value={toSubject} onChange={(e) => subjectHandle(e)} className="btcd-paper-inp mt-1" placeholder="" type="text" />
          </label>
        </div>
        <div className="mt-2">
          <label htmlFor="message">
            {__('Message:', 'bitform')}
            <input id="message" name="message" value={toMessage} onChange={(e) => messageHandle(e)} className="btcd-paper-inp mt-1" placeholder="" type="text" />
          </label>
        </div>
        <button onClick={(e) => testEmailHandle(e)} type="submit" className="btn f-left btcd-btn-lg blue sh-sm flx" disabled={isTestLoading}>
          {__('Send Test', 'bitform')}
          {isTestLoading && <LoaderSm size="20" clr="#fff" className="ml-2" />}
        </button>
      </div>
    )
}
