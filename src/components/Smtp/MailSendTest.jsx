/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useRef, useState, useEffect } from 'react'
import bitsFetch from '../../Utils/bitsFetch'
import LoaderSm from '../Loaders/LoaderSm'

export default function MailSendTest({ setsnack, settab }) {
    const [isTestLoading, setisTestLoading] = useState(false)
    const formRef = useRef(null)
    const handleSubmit = (e) => {
      const testEmailData = new FormData(formRef.current)
        e.preventDefault()
        setisTestLoading(true)
        bitsFetch(testEmailData,
          'bitforms_test_email').then((res) => {
            if (res !== undefined && res.success) {
              if (res.data) {
                setsnack({ ...{ show: true, msg: __('mail send successfully', 'bitform') } })
              } else {
                setsnack({ ...{ show: true, msg: __(`${res?.data?.errors?.[0]}`, 'bitform') } })
              }
            } else {
              setsnack({ ...{ show: true, msg: __(`${res?.data?.errors?.[0]}`, 'bitform') } })
            }
            setisTestLoading(false)
          })
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
        <div>
          <form
            method="POST"
            onSubmit={handleSubmit}
            ref={formRef}
            onKeyDown={e => {
              e.key === 'Enter'
                && e.target.tagName !== 'TEXTAREA'
                && e.preventDefault()
            }}
          >
            <div className="mt-2">
              <label htmlFor="form_email_address">
                {__('To:', 'bitform')}
                <input id="to" name="to" className="btcd-paper-inp mt-1" placeholder="Enter Your Email" type="email" required />
              </label>
            </div>
            <div className="mt-2">
              <label htmlFor="form_name">
                {__('Subject:', 'bitform')}
                <input id="subject" name="subject" className="btcd-paper-inp mt-1" placeholder="Enter Your Subject" type="text" required />
              </label>
            </div>
            <div className="mt-2">
              <label htmlFor="message">
                {__('Message:', 'bitform')}
                <input id="message" name="message" className="btcd-paper-inp mt-1" placeholder="Enter Your Message" type="text" required />
              </label>
            </div>
            <button type="submit" className="btn f-left btcd-btn-lg blue sh-sm flx" disabled={isTestLoading}>
              {__('Send Test', 'bitform')}
              {isTestLoading && <LoaderSm size="20" clr="#fff" className="ml-2" />}
            </button>
          </form>
        </div>
      </div>
    )
}
