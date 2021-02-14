/* eslint-disable jsx-a11y/label-has-associated-control */
// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useState, useEffect } from 'react'
import { Panel, Tab, Tabs } from '@bumaga/tabs'
import bitsFetch from '../../Utils/bitsFetch'
import ConfigForm from './ConfigForm'
import MailSendTest from './MailSendTest'

export default function SMTP({ setsnack }) {
  const isPro = typeof bits !== 'undefined' && bits.isPro
  const [tab, settab] = useState('mail_config')
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
    <div className="btcd-captcha w-5" style={{ overflow: 'scroll', padding: 10 }}>
      {/* <h2>{__('SMTP Configuration', 'bitform')}</h2>
      <br />
      <div className="btcd-hr" /> */}
      <div className="pos-rel">
        {!isPro && (
          <div className="pro-blur flx" style={{ height: '111%', left: -15, width: '104%' }}>
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
        <Tabs>
          <Tab>
            <button className={`btcd-s-tab-link ${tab === 'mail_config' && 's-t-l-active'}`} style={{ padding: 9 }} type="button">
              {__('Configuration', 'bitform')}
            </button>
          </Tab>
          <Tab>
            <button className={`btcd-s-tab-link ${tab === 'test_mail' && 's-t-l-active'}`} style={{ padding: 9 }} type="button">
              {__('Mail Test', 'bitform')}
            </button>
          </Tab>
          <Panel>
            <ConfigForm
              settab={settab}
              mail={mail}
              setMail={setMail}
              status={status}
              smtpStatus={setStatus}
              setsnack={setsnack}
            />
          </Panel>
          <Panel>
            <MailSendTest
              settab={settab}
              setsnack={setsnack}
            />
          </Panel>
        </Tabs>
      </div>
    </div>
  )
}
