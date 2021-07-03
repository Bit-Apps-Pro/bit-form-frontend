import { useEffect, useState } from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import { useRecoilValue } from 'recoil'
import { $bits } from '../../../GlobalStates'
import { deepCopy } from '../../../Utils/Helpers'
import { __ } from '../../../Utils/i18nwrap'
import ZohoMailActions from './ZohoMailActions'

export default function ZohoMailIntegLayout({ formFields, mailConf, setMailConf }) {
  const bits = useRecoilValue($bits)

  const mailOptions = () => {
    const mail = []
    if (bits.userMail && Array.isArray(bits.userMail)) {
      mail.push(...bits.userMail)
    }
    const flds = []

    formFields.map(fld => {
      if (fld.type === 'email') {
        flds.push({ label: fld.name, value: `\${${fld.key}}` })
      }
    })
    mail.push({ title: 'Form Fields', type: 'group', childs: flds })
    return mail
  }

  const timyMceInit = () => {
    if (typeof tinymce !== 'undefined' && formFields.length > 0) {
      const s = document.querySelectorAll('.form-fields-em')
      for (let i = 0; i < s.length; i += 1) {
        s[i].style.display = 'none'
      }
      // eslint-disable-next-line no-undef
      tinymce.init({
        selector: '#body-content',
        plugins: 'link hr lists wpview wpemoji',
        theme: 'modern',
        menubar: false,
        branding: false,
        resize: 'verticle',
        min_width: 300,
        toolbar: 'formatselect bold italic | alignleft aligncenter alignright | outdent indent | link | undo redo | hr | addFormField | toggleCode',
        setup(editor) {
          editor.on('Paste Change input Undo Redo', () => {
            handleMailBody(editor.getContent())
          })

          editor.addButton('addFormField', {
            text: 'Form Fields ',
            tooltip: 'Add Form Field Value in Message',
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
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    window.tinymce && tinymce.remove()
  }, [])

  useEffect(() => {
    timyMceInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFields])

  const handleInput = (val, typ) => {
    setMailConf(prevState => {
      const tmp = { ...prevState }
      tmp[typ] = val
      return tmp
    })
  }

  const handleMailBody = val => {
    const tmp = deepCopy(mailConf)
    tmp.body = val
    setMailConf({ ...tmp })
  }

  const addFieldToSubject = e => {
    const newConf = { ...mailConf }
    newConf.subject += e.target.value
    setMailConf({ ...newConf })
    e.target.value = ''
  }

  return (
    <div style={{ width: 875 }}>
      <div className="flx">
        <b style={{ width: 100 }}>{__('Type:', 'bitform')}</b>
        <select onChange={(e) => handleInput(e.target.value, 'mailType')} className="btcd-paper-inp" style={{ width: 150 }} value={mailConf.mailType}>
          <option value="">{__('Select type', 'bitform')}</option>
          <option value="send">{__('Send Email', 'bitform')}</option>
          <option value="draft">{__('Save as Draft', 'bitform')}</option>
        </select>
      </div>

      <div className="flx">
        <b style={{ width: 100 }}>To:</b>
        <MultiSelect
          className="w-7 mt-2 btcd-paper-drpdwn"
          defaultValue={mailConf.to}
          placeholder={__('Add Email Receiver', 'bitform')}
          onChange={(e) => handleInput(e, 'to')}
          options={mailOptions()}
          customValue
        />
      </div>

      <div className="flx">
        <b style={{ width: 100 }}>{__('CC:', 'bitform')}</b>
        <MultiSelect
          className="w-7 mt-2 btcd-paper-drpdwn"
          defaultValue={mailConf.cc}
          placeholder={__('Add Email CC', 'bitform')}
          onChange={(e) => handleInput(e, 'cc')}
          options={mailOptions()}
          customValue
        />
      </div>

      <div className="flx">
        <b style={{ width: 100 }}>{__('BCC:', 'bitform')}</b>
        <MultiSelect
          className="w-7 mt-2 btcd-paper-drpdwn"
          defaultValue={mailConf.bcc}
          placeholder={__('Add Email BCC', 'bitform')}
          onChange={(e) => handleInput(e, 'bcc')}
          options={mailOptions()}
          customValue
        />
      </div>

      <div className="mt-2 flx">
        <b style={{ width: 100 }}>{__('Subject:', 'bitform')}</b>
        <input type="text" onChange={(e) => handleInput(e.target.value, 'subject')} className="btcd-paper-inp w-7" placeholder={__('Email Subject Here', 'bitform')} value={mailConf.subject || ''} />
        <select onChange={addFieldToSubject} className="btcd-paper-inp ml-2" style={{ width: 150 }}>
          <option value="">{__('Add form field', 'bitform')}</option>
          {formFields !== null && formFields.map(f => !f.type.match(/^(file-up|recaptcha)$/) && <option key={f.key} value={`\${${f.key}}`}>{f.name}</option>)}
        </select>
      </div>

      <div className="mt-3">
        <div className="flx flx-between">
          <b>{__('Body:', 'bitform')}</b>
        </div>
        <label htmlFor="body-content" className="mt-2 w-10">
          <textarea
            id="body-content"
            className="btcd-paper-inp mt-1"
            rows="5"
            value={mailConf.body || ''}
            onChange={(e) => handleInput(e.target.value, 'body')}
          />
        </label>
      </div>
      <br />
      <br />
      <div className="mt-4"><b className="wdt-100">{__('Actions', 'bitform')}</b></div>
      <div className="btcd-hr mt-1" />
      <ZohoMailActions
        mailConf={mailConf}
        setMailConf={setMailConf}
        formFields={formFields}
      />
    </div>
  )
}
