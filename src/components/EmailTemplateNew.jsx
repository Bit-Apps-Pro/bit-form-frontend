/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-param-reassign */
import { produce } from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $bits, $fieldsArr, $mailTemplates } from '../GlobalStates/GlobalStates'
import BackIcn from '../Icons/BackIcn'
import app from '../styles/app.style'
import { __ } from '../Utils/i18nwrap'
import { SmartTagField } from '../Utils/StaticData/SmartTagField'
import Modal from './Utilities/Modal'
import TinyMCE from './Utilities/TinyMCE'

function EmailTemplateNew() {
  const [tem, setTem] = useState({ title: 'New Template', sub: 'Email Subject', body: 'Email Body' })
  const [mailTem, setMailTem] = useRecoilState($mailTemplates)
  const formFields = useRecoilValue($fieldsArr)
  const [showTemplateModal, setTemplateModal] = useState(false)
  const { formType, formID } = useParams()
  const navigate = useNavigate()
  const { css } = useFela()

  const bits = useRecoilValue($bits)
  const { isPro } = bits

  const handleBody = value => {
    setTem(prevState => produce(prevState, draft => {
      draft.body = value
    }))
  }

  const handleInput = ({ target: { name, value } }) => {
    setTem(prev => ({ ...prev, [name]: value }))
  }

  const save = () => {
    const newMailTem = produce(mailTem, draft => {
      draft.push(tem)
      draft.push({ updateTem: 1 })
    })
    setMailTem(newMailTem)
    navigate(`/form/settings/${formType}/${formID}/email-templates`)
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
        title={__('Browse Template')}
      >
        <h4 className="txt-dp">{__('Email Templates Coming soon')}</h4>
      </Modal>

      <NavLink to={`/form/settings/${formType}/${formID}/email-templates`} className={`${css(app.btn)} btcd-btn-o-gray`}>
        <BackIcn className="mr-1" />
        {__('Back', 'bitfrom')}
      </NavLink>

      <button id="secondary-update-btn" onClick={save} className={`${css(app.btn)} blue f-right`} type="button">{__('Save Template')}</button>

      <div className="mt-3 flx">
        <b style={{ width: 103 }}>
          {__('Template Name:')}
          {' '}
        </b>
        <input onChange={handleInput} name="title" type="text" className="btcd-paper-inp w-9" placeholder="Name" value={tem.title} />
      </div>
      <div className="mt-3 flx">
        <b style={{ width: 100 }}>Subject:</b>
        <input onChange={handleInput} name="sub" type="text" className="btcd-paper-inp w-7" placeholder="Email Subject Here" value={tem.sub} />
        <select onChange={addFieldToSubject} className="btcd-paper-inp ml-2" style={{ width: 150 }}>
          <option value="">{__('Add field')}</option>
          <optgroup label="Form Fields">
            {formFields !== null && formFields.map(f => !f.type.match(/^(file-up|recaptcha)$/) && <option key={f.key} value={`\${${f.key}}`}>{f.name}</option>)}
          </optgroup>
          <optgroup label={`General Smart Codes ${isPro ? '' : '(PRO)'}`}>
            {isPro && SmartTagField?.map(f => (
              <option key={`ff-rm-${f.name}`} value={`\${${f.name}}`}>
                {f.label}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div className="mt-3">
        <b>{__('Body:')}</b>
        {/* <div className="flx flx-between">
          <button className="btn" onClick={() => setTemplateModal(true)} type="button">{__('Choose Template')}</button>
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
