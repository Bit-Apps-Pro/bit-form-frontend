/* eslint-disable no-param-reassign */

import { useEffect } from 'react'
import { NavLink, useParams, Redirect, useHistory } from 'react-router-dom'
import { __ } from '../Utils/i18nwrap'

function EmailTemplateEdit({ mailTem, setMailTem, formFields, saveForm }) {
  console.log('%c $render EmailTemplateEdit', 'background:purple;padding:3px;border-radius:5px;color:white')

  const { formType, formID, id } = useParams()
  const history = useHistory()

  useEffect(() => {
    if (typeof tinymce !== 'undefined' && formFields.length > 0) {
      const s = document.querySelectorAll('.form-fields-em')
      for (let i = 0; i < s.length; i += 1) {
        s[i].style.display = 'none'
      }
      // eslint-disable-next-line no-undef
      tinymce.init({
        // mode: "exact",
        // elements: 'pre-details',
        // statusbar: false,
        // skin: 'lightgray',
        selector: '.btcd-editor',
        plugins: 'link hr lists wpview wpemoji',
        theme: 'modern',
        menubar: false,
        branding: false,
        resize: 'verticle',
        min_width: 300,
        convert_urls: false,
        toolbar: 'formatselect bold italic |  alignleft aligncenter alignright | outdent indent | link | undo redo | hr | toogleCode | addFormField | toggleCode',
        setup(editor) {
          editor.on('Paste Change input Undo Redo', () => {
            handleBody(editor.getContent(), editor.targetElm.getAttribute('data-idx'))
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
              myTextarea.value = editor.getContent({ source_view: true })
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

    return function cleanup() {
      if (typeof tinymce !== 'undefined') {
        // eslint-disable-next-line no-undef
        tinymce.remove()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFields])

  const handleTitle = e => {
    mailTem[id].title = e.target.value
    setMailTem([...mailTem])
  }

  const handleSubject = e => {
    mailTem[id].sub = e.target.value
    setMailTem([...mailTem])
  }

  const handleBody = val => {
    mailTem[id].body = val
    setMailTem([...mailTem])
  }

  const addFieldToSubject = e => {
    mailTem[id].sub += e.target.value
    setMailTem([...mailTem])
  }

  const addFieldToBody = e => {
    mailTem[id].body += e.target.value
    setMailTem([...mailTem])
  }

  const save = () => {
    history.push(`/form/settings/${formType}/${formID}/email-templates`)
    saveForm()
  }

  return (
    mailTem.length < 1 ? <Redirect to={`/form/settings/edit/${formID}/email-templates`} /> : (
      <div style={{ width: 900 }}>
        <NavLink to={`/form/settings/${formType}/${formID}/email-templates`} className="btn btcd-btn-o-gray">
          <span className="btcd-icn icn-arrow_back" />
          &nbsp;
          {__('Back', 'bitform')}
        </NavLink>

        <button onClick={save} className="btn blue f-right" type="button">{__('Update Template', 'bitform')}</button>

        <div className="mt-3 flx">
          <b style={{ width: 102 }}>
            {__('Template Name:', 'bitform')}
            {' '}
          </b>
          <input onChange={handleTitle} type="text" className="btcd-paper-inp w-9" placeholder="Name" value={mailTem[id].title} />
        </div>
        <div className="mt-3 flx">
          <b style={{ width: 100 }}>{__('Subject:', 'bitform')}</b>
          <input onChange={handleSubject} type="text" className="btcd-paper-inp w-7" placeholder={__('Email Subject Here', 'bitform')} value={mailTem[id].sub} />
          <select onChange={addFieldToSubject} className="btcd-paper-inp ml-2" style={{ width: 150 }}>
            <option value="">{__('Add form field', 'bitform')}</option>
            {formFields !== null && formFields.map(f => !f.type.match(/^(file-up|recaptcha)$/) && <option key={f.key} value={`\${${f.key}}`}>{f.name}</option>)}
          </select>
        </div>

        <div className="mt-3">
          <div><b>{__('Body:', 'bitform')}</b></div>

          <label htmlFor={`t-m-e-${id}-${formID}`} className="mt-2 w-10">
            <select onChange={addFieldToBody} className="btcd-paper-inp mt-2 form-fields-em w-5">
              <option value="">{__('Add form field', 'bitform')}</option>
              {formFields !== null && formFields.map(f => !f.type.match(/^(file-up|recaptcha)$/) && <option key={f.key} value={`\${${f.key}}`}>{f.name}</option>)}
            </select>
            <textarea
              id={`t-m-e-${id}-${formID}`}
              onChange={e => handleBody(e.target.value)}
              className="btcd-editor btcd-paper-inp mt-1"
              rows="5"
              value={mailTem[id].body}
            />
          </label>
        </div>

      </div>
    )
  )
}

export default EmailTemplateEdit
