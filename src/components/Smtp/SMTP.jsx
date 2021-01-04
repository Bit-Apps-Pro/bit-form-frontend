/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useState, useEffect } from 'react'
import bitsFetch from '../../Utils/bitsFetch'
import ConfigForm from './ConfigForm'
import MailSendTest from './MailSendTest'

export default function SMTP({ setsnack }) {
  const isPro = typeof bits !== 'undefined' && bits.isPro
  const [mail, setMail] = useState({})
  const [status, setStatus] = useState('')

  useEffect(() => {
    bitsFetch({ formID: 0 }, 'bitforms_get_mail_config').then((res) => {
      if (res !== undefined && res.success) {
        if (!res.data.errors) {
          setMail(JSON.parse(res.data[0].integration_details))
          setStatus(Number(res.data[0].status))
        }
      }
    })
  }, [])

  return (
    <div className="btcd-captcha w-5">
      <h2>{__('SMTP Configuration', 'bitform')}</h2>
      <br />
      <div className="btcd-hr" />
      <div className="pos-rel">
        {!isPro && (
          <div className="pro-blur flx" style={{ height: '101%', left: -15, width: '104%' }}>
            <div className="pro">
              {__('Available On', 'bitform')}
              <a href="https://bitpress.pro/" target="_blank" rel="noreferrer">
                <span className="txt-pro">
                  {' '}
                  {__('Premium', 'bitform')}
                </span>
              </a>
            </div>
          </div>
        )}
        <ConfigForm mail={mail} setMail={setMail} status={status} smtpStatus={setStatus} setsnack={setsnack} />
        <br />
        <br />
        <MailSendTest setsnack={setsnack} />
      </div>
    </div>
  )
}
