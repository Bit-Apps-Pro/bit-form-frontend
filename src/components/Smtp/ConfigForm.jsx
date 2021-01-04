// eslint-disable-next-line import/no-extraneous-dependencies
import { __ } from '@wordpress/i18n'
import { useRef, useState } from 'react'
import bitsFetch from '../../Utils/bitsFetch'
import LoaderSm from '../Loaders/LoaderSm'
import CheckBox from '../ElmSettings/Childs/CheckBox'

export default function ConfigForm({ mail, setMail, status, smtpStatus, setsnack }) {
  const [isLoading, setIsLoading] = useState(false)
  // const [isShowing, setIsShowing] = useState(true)

  const formRef = useRef(null)
  const handleSubmit = (e) => {
    const formmail = new FormData(formRef.current)
    e.preventDefault()
    setIsLoading(true)
    bitsFetch(formmail,
      'bitforms_mail_config').then((res) => {
        if (res !== undefined && res.success) {
          setsnack({ ...{ show: true, msg: __('smtp Config save successfully', 'bitform') } })
          setIsLoading(false)
        }
      })
  }
  const handleInput = (typ, val, isNumber) => {
    const tmpMail = { ...mail }
    if (isNumber) {
      tmpMail[typ] = Number(val)
    } else {
      tmpMail[typ] = val
    }
    setMail(tmpMail)
  }

  const handleStatus = (e) => {
    smtpStatus(Number(e.target.value))
    // if (e.target.value == 1) {
    //   setIsShowing(true)
    // } else {
    //   setIsShowing(false)
    // }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
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
      {/* {isShowing && ( */}
      {/* <div> */}
      <div className="mt-2">
        <label htmlFor="form_email_address">
          {__('From Email Address', 'bitform')}
          <input id="form_email_address" onChange={(e) => handleInput(e.target.name, e.target.value)} name="form_email_address" className="btcd-paper-inp mt-1" value={mail.form_email_address} placeholder="From Email Address" type="text" required />
        </label>
      </div>
      <div className="mt-2">
        <label htmlFor="from_name">
          {__('From Name', 'bitform')}
          <input id="form_name" onChange={(e) => handleInput(e.target.name, e.target.value)} value={mail.form_name} name="form_name" className="btcd-paper-inp mt-1" placeholder="From Name" type="text" required />
        </label>
      </div>
      <div className="mt-2">
        <label htmlFor="re_email_address">
          {__('Reply-To Email Address', 'bitform')}
          <input id="re_email_address" onChange={(e) => handleInput(e.target.name, e.target.value)} value={mail.re_email_address} name="re_email_address" className="btcd-paper-inp mt-1" placeholder="Reply-To Email Address" type="text" required />
        </label>
      </div>
      <div className="mt-2">
        <label htmlFor="smtp_host">
          {__('SMTP Host', 'bitform')}
          <input id="smtp_host" value={mail.smtp_host} onChange={(e) => handleInput(e.target.name, e.target.value)} name="smtp_host" className="btcd-paper-inp mt-1" placeholder="SMTP Host" type="text" required />
        </label>
      </div>
      <div className="mt-2">
        <label htmlFor="encryption">
          {__('Type of Encryption', 'bitform')}
          <CheckBox radio name="encryption" id="encryption" onChange={e => handleInput(e.target.name, e.target.value)} checked={mail.encryption === 'tls'} title={<small className="txt-dp">TLS</small>} value="tls" />
          <CheckBox radio name="encryption" id="encryption" onChange={e => handleInput(e.target.name, e.target.value)} checked={mail.encryption === 'ssl'} title={<small className="txt-dp">SSL</small>} value="ssl" />
        </label>
      </div>
      <div className="mt-2">
        <label htmlFor="encryption">
          {__('SMTP Port', 'bitform')}
          <CheckBox radio name="port" onChange={(e) => handleInput(e.target.name, e.target.value)} checked={mail.port === '587'} title={<small className="txt-dp">587</small>} value="587" />
          <CheckBox radio name="port" onChange={(e) => handleInput(e.target.name, e.target.value)} checked={mail.port === '465'} title={<small className="txt-dp">465</small>} value="465" />
        </label>
      </div>
      <div className="mt-2">
        <label htmlFor="encryption">
          {__('SMTP Authentication', 'bitform')}
          <CheckBox radio name="smtp_auth" onChange={e => handleInput(e.target.name, e.target.value)} checked={mail.smtp_auth === '1'} title={<small className="txt-dp">Yes</small>} value="1" />
          <CheckBox radio name="smtp_auth" onChange={e => handleInput(e.target.name, e.target.value)} checked={mail.smtp_auth === '0'} title={<small className="txt-dp">No</small>} value="0" />
        </label>
      </div>
      <div className="mt-2">
        <label htmlFor="smtp_user_name">
          {__('SMTP Username', 'bitform')}
          <input id="smtp_user_name" value={mail.smtp_user_name} onChange={(e) => handleInput(e.target.name, e.target.value)} name="smtp_user_name" className="btcd-paper-inp mt-1" placeholder=" SMTP Username" type="text" required />
        </label>
      </div>
      <div className="mt-2">
        <label htmlFor="smtp_password">
          {__('SMTP Password', 'bitform')}
          <input id="smtp_password" onChange={(e) => handleInput(e.target.name, e.target.value)} value={mail.smtp_password} name="smtp_password" className="btcd-paper-inp mt-1" placeholder="SMTP Password" type="password" required />
        </label>
      </div>
      {/* </div>
      )} */}
      <div className="mt-2">
        <label htmlFor="status">
          {__('Enable SMTP', 'bitform')}
          <CheckBox radio name="status" onChange={e => handleStatus(e)} checked={status === 1} title={<small className="txt-dp">Yes</small>} value="1" />
          <CheckBox radio name="status" onChange={e => handleStatus(e)} checked={status === 0} title={<small className="txt-dp">No</small>} value="0" />
        </label>
      </div>
      <button type="submit" className="btn f-left btcd-btn-lg blue sh-sm flx">
        {__('Save Changes', 'bitform')}
        {isLoading && <LoaderSm size="20" clr="#fff" className="ml-2" />}
      </button>
    </form>
  )
}
