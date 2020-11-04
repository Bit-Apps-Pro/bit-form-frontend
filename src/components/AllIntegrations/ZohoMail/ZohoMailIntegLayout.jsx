import { useEffect, useReducer, useState } from 'react';
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import ZohoMailActions from './ZohoMailActions';

const mailReducer = (state, { val, typ }) => {
  const newstate = { ...state }
  newstate[typ] = val
  return newstate
}

export default function ZohoMailIntegLayout({ formFields, mailConf: mcf, setMailConf }) {
  const [mailConf, setmailconfig] = useReducer(mailReducer, mcf)

  const mailOptions = () => {
    const mail = []
    // eslint-disable-next-line no-undef
    if (typeof bits !== 'undefined' && bits.userMail && Array.isArray(bits.userMail)) {
      // eslint-disable-next-line no-undef
      mail.push(...bits.userMail)
    }
    const flds = []
    // eslint-disable-next-line array-callback-return
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
        toolbar: 'formatselect bold italic | alignleft aligncenter alignright | outdent indent | link | undo redo | hr | addFormField ',
        setup(editor) {
          editor.on('Paste Change input Undo Redo', () => {
            handleInput(editor.getContent(), 'body')
          })

          editor.addButton('addFormField', {
            text: 'Form Fields ',
            tooltip: 'Add Form Field Value in Message',
            type: 'menubutton',
            icon: false,
            menu: formFields.map(i => !i.type.match(/^(file-up|recaptcha)$/) && ({ text: i.name, onClick() { editor.insertContent(`\${${i.key}}`) } })),
          })
        },
      })
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    tinymce.remove()
  }, [])

  useEffect(() => {
    timyMceInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formFields])

  useEffect(() => {
    setMailConf(mailConf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mailConf])

  const handleInput = (val, typ) => {
    setmailconfig({ val, typ })
  }

  const addFieldToSubject = e => {
    mailConf.subject += e.target.value
    setmailconfig({ val: mailConf.subject, typ: 'subject' })
    e.target.value = ''
  }

  return (
    <div style={{ width: 875 }}>
      <div className="flx">
        <b style={{ width: 100 }}>Type:</b>
        <select onChange={(e) => handleInput(e.target.value, 'mailType')} className="btcd-paper-inp" style={{ width: 150 }} value={mailConf.mailType}>
          <option value="">Select type</option>
          <option value="send">Send Email</option>
          <option value="draft">Save as Draft</option>
        </select>
      </div>

      <div className="flx">
        <b style={{ width: 100 }}>To:</b>
        <MultiSelect
          className="w-7 mt-2 btcd-paper-drpdwn"
          defaultValue={mailConf.to}
          placeholder="Add Email Receiver"
          onChange={(e) => handleInput(e, 'to')}
          options={mailOptions()}
          customValue
        />
      </div>

      <div className="flx">
        <b style={{ width: 100 }}>CC:</b>
        <MultiSelect
          className="w-7 mt-2 btcd-paper-drpdwn"
          defaultValue={mailConf.cc}
          placeholder="Add Email CC"
          onChange={(e) => handleInput(e, 'cc')}
          options={mailOptions()}
          customValue
        />
      </div>

      <div className="flx">
        <b style={{ width: 100 }}>BCC:</b>
        <MultiSelect
          className="w-7 mt-2 btcd-paper-drpdwn"
          defaultValue={mailConf.bcc}
          placeholder="Add Email BCC"
          onChange={(e) => handleInput(e, 'bcc')}
          options={mailOptions()}
          customValue
        />
      </div>

      <div className="mt-2 flx">
        <b style={{ width: 100 }}>Subject:</b>
        <input type="text" onChange={(e) => handleInput(e.target.value, 'subject')} className="btcd-paper-inp w-7" placeholder="Email Subject Here" value={mailConf.subject || ''} />
        <select onChange={addFieldToSubject} className="btcd-paper-inp ml-2" style={{ width: 150 }}>
          <option value="">Add form field</option>
          {formFields !== null && formFields.map(f => !f.type.match(/^(file-up|recaptcha)$/) && <option key={f.key} value={`\${${f.key}}`}>{f.name}</option>)}
        </select>
      </div>

      <div className="mt-3">
        <div className="flx flx-between">
          <b>Body:</b>
        </div>
        <label htmlFor="body-content" className="mt-2 w-10">
          <textarea
            id="body-content"
            className="btcd-paper-inp mt-1"
            rows="5"
            value={mailConf.body}
            onChange={(e) => handleInput(e.target.value, 'body')}
          />
        </label>
      </div>
      <br />
      <br />
      <div className="mt-4"><b className="wdt-100">Actions</b></div>
      <div className="btcd-hr mt-1" />
      <ZohoMailActions
        mailConf={mailConf}
        setMailConf={setMailConf}
        formFields={formFields}
      />
    </div>
  )
}
