/* eslint-disable no-param-reassign */

import { useState, useEffect, useReducer } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom'
import { __ } from '../Utils/i18nwrap';
import Modal from './Utilities/Modal'
import '../resource/css/tinymce.css'

const mailTemReducer = (state, { name, value }) => {
  const tmp = { ...state }
  tmp[name] = value
  return tmp
}

function EmailTemplateNew({ tem: templtMainState, setTem: setTemplateMainState, mailTem, setMailTem, formFields, saveForm }) {
  console.log('%c $render EmailTemplateEdit', 'background:purple;padding:3px;border-radius:5px;color:white')
  const [tem, setTem] = useReducer(mailTemReducer, templtMainState)
  const [showTemplateModal, setTemplateModal] = useState(false)
  const { formType, formID, id } = useParams()
  const history = useHistory()

  const handleBody = value => {
    setTem({ name: 'body', value })
  }

  const tinyMceInit = () => {
    if (typeof tinymce !== 'undefined' && formFields.length > 0) {
      const s = document.querySelectorAll('.form-fields')
      for (let i = 0; i < s.length; i += 1) {
        s[i].style.display = 'none'
      }
      // eslint-disable-next-line no-undef
      tinymce.init({
        selector: '.btcd-editor',
        plugins: 'link hr lists wpview wpemoji',
        theme: 'modern',
        menubar: false,
        branding: false,
        resize: 'verticle',
        min_width: 300,
        toolbar: 'formatselect bold italic | alignleft aligncenter alignright | outdent indent | link | undo redo | hr | toogleCode | addFormField',
        convert_urls: false,
        setup(editor) {
          editor.on('Paste Change input Undo Redo', () => {
            handleBody(editor.getContent())
          })

          editor.addButton('addFormField', {
            text: __('Form Fields ', 'bitform'),
            tooltip: __('Add Form Field Value in Message', 'bitform'),
            type: 'menubutton',
            icon: false,
            menu: formFields.map(i => !i.type.match(/^(file-up|recaptcha)$/) && ({ text: i.name, onClick() { editor.insertContent(`\${${i.key}}`) } })),
          })

          editor.addButton('toogleCode', {
            text: '</>',
            tooltip: __('Toggle preview', 'bitform'),
            icon: false,
            onclick(e) {
              // eslint-disable-next-line no-undef
              const $ = tinymce.dom.DomQuery
              const myTextarea = $('textarea')
              const myIframe = $(editor.iframeElement)
              myTextarea.value = editor.getContent({
                source_view: true,
              });
              myIframe.toggleClass('hidden')
              myTextarea.toggleClass('visible')
              if ($('iframe.hidden').length > 0) {
                myTextarea.prependTo('.mce-edit-area')
              } else {
                myIframe.value = myTextarea.value
                myTextarea.appendTo('body')
              }
            },
          })
        },
      })
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.tinymce && tinymce.remove()
  }, [])

  const { title, sub } = tem
  useEffect(() => {
    tinyMceInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFields, title, sub, handleBody])

  const handleInput = ({ target: { name, value } }) => {
    setTem({ name, value })
  }

  const save = () => {
    mailTem.push(tem)
    setMailTem([...mailTem])
    history.push(`/form/settings/${formType}/${formID}/email-templates`)
    saveForm()
  }

  const addFieldToSubject = e => {
    tem.sub += e.target.value
    setTem({ name: 'sub', value: tem.sub })
    e.target.value = ''
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
        <span className="btcd-icn icn-arrow_back" />
        &nbsp;
        {__('Back', 'bitfrom')}
      </NavLink>

      <button onClick={save} className="btn blue f-right" type="button">{__('Save Template', 'bitform')}</button>

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
        <div className="flx flx-between">
          <b>{__('Body:', 'bitform')}</b>
          <button className="btn" onClick={() => setTemplateModal(true)} type="button">{__('Choose Template', 'bitform')}</button>
        </div>
        <label htmlFor={`t-m-e-${id}-${formID}`} className="mt-2 w-10">
          <textarea
            id={`t-m-e-${id}-${formID}`}
            onChange={e => handleBody(e.target.value)}
            className="btcd-editor btcd-paper-inp mt-1"
            rows="5"
            value={tem.body}
          />
        </label>
      </div>

    </div>
  )
}

export default EmailTemplateNew
