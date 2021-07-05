/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */

import { useState } from 'react'
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { __ } from '../Utils/i18nwrap'
import Modal from './Utilities/Modal'
// import '../resource/css/tinymce.css'
import BackIcn from '../Icons/BackIcn'
import { $fieldsArr, $mailTemplates } from '../GlobalStates'
import TinyMCE from './Utilities/TinyMCE'
import { deepCopy } from '../Utils/Helpers'

function EmailTemplateNew({ saveForm }) {
  console.log('%c $render EmailTemplate new', 'background:purple;padding:3px;border-radius:5px;color:white')
  const [tem, setTem] = useState({ title: 'New Template', sub: 'Email Subject', body: 'Email Body' })
  const [mailTem, setMailTem] = useRecoilState($mailTemplates)
  const formFields = useRecoilValue($fieldsArr)
  const [showTemplateModal, setTemplateModal] = useState(false)
  const { formType, formID } = useParams()
  const history = useHistory()

  const handleBody = value => {
    setTem(prev => ({ ...prev, body: value }))
  }

  const handleInput = ({ target: { name, value } }) => {
    setTem(prev => ({ ...prev, [name]: value }))
  }

  const save = () => {
    const newMailTem = deepCopy(mailTem)
    newMailTem.push(tem)
    setMailTem(newMailTem)
    history.push(`/form/settings/${formType}/${formID}/email-templates`)
    saveForm('email-template', newMailTem)
  }

  const addFieldToSubject = ({ target: { value } }) => {
    setTem(prv => ({ ...prv, sub: prv.sub + value }))
    setTimeout(() => { value = '' }, 100)
  }

  return (
    <div style={{ width: 900 }}>
      <Modal
        show={showTemplateModal}
        setModal={setTemplateModal}
        title={__('Browse Template', 'bitform')}
      >
        <h4 className="txt-dp">{__('Email Templates Coming soon', 'bitform')}</h4>
      </Modal>

      <NavLink to={`/form/settings/${formType}/${formID}/email-templates`} className="btn btcd-btn-o-gray">
        <BackIcn className="mr-1" />
        {__('Back', 'bitfrom')}
      </NavLink>

      <button id="secondary-update-btn" onClick={save} className="btn blue f-right" type="button">{__('Save Template', 'bitform')}</button>

      <div className="mt-3 flx">
        <b style={{ width: 103 }}>
          {__('Template Name:', 'bitform')}
          {' '}
        </b>
        <input onChange={handleInput} name="title" type="text" className="btcd-paper-inp w-9" placeholder="Name" value={tem.title} />
      </div>
      <div className="mt-3 flx">
        <b style={{ width: 100 }}>Subject:</b>
        <input onChange={handleInput} name="sub" type="text" className="btcd-paper-inp w-7" placeholder="Email Subject Here" value={tem.sub} />
        <select onChange={addFieldToSubject} className="btcd-paper-inp ml-2" style={{ width: 150 }}>
          <option value="">{__('Add form field', 'bitform')}</option>
          {formFields !== null && formFields.map(f => !f.type.match(/^(file-up|recaptcha)$/) && <option key={f.key} value={`\${${f.key}}`}>{f.name}</option>)}
        </select>
      </div>

      <div className="mt-3">
        <b>{__('Body:', 'bitform')}</b>
        {/* <div className="flx flx-between">
          <button className="btn" onClick={() => setTemplateModal(true)} type="button">{__('Choose Template', 'bitform')}</button>
        </div> */}
        <label htmlFor={`mail-tem-${formID}`} className="mt-2 w-10">
          <TinyMCE
            id={`mail-tem-${formID}`}
            formFields={formFields}
            value={tem.body}
            onChangeHandler={handleBody}
            width="100%"
          />
        </label>
      </div>

    </div>
  )
}

export default EmailTemplateNew
