/* eslint-disable no-undef */
import React, { useEffect, memo } from 'react'
import Accordions from './ElmSettings/Childs/Accordions'
import Button from './ElmSettings/Childs/Button'

function ConfMsg({ formSettings, setFormSettings, formFields }) {
  const handleMsgMsg = (mg, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.msg[idx].msg = mg
    setFormSettings(tmp)
  }

  useEffect(() => {
    if (typeof tinymce !== 'undefined' && formFields !== null) {
      const s = document.querySelectorAll('.form-fields')
      for (let i = 0; i < s.length; i += 1) {
        s[i].style.display = 'none'
      }

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
        toolbar: 'formatselect bold italic |  alignleft aligncenter alignright | outdent indent | link | undo redo | hr | addFormField ',
        setup(editor) {
          editor.on('Paste Change input Undo Redo', () => {
            handleMsgMsg(editor.getContent(), editor.targetElm.getAttribute('data-idx'))
          })

          editor.addButton('addFormField', {
            text: 'Form Fields ',
            tooltip: 'Add Form Field Value in Message',
            type: 'menubutton',
            icon: false,
            menu: formFields.map(i => ({ text: i.name, onClick() { editor.insertContent(`{${i.key}}`) } })),
          })
        },
      })
    }
  }, [formSettings, formFields])


  const handleMsgTitle = (e, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.msg[idx].title = e.target.value
    setFormSettings(tmp)
  }

  const addMoreMsg = () => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.msg.push({ title: `Message Title ${tmp.confirmation.type.msg.length + 1}`, msg: 'Successfully Submitted.' })
    setFormSettings(tmp)
  }

  const rmvMsg = i => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.msg.splice(i, 1)
    setFormSettings(tmp)
  }

  const addFormField = (val, i) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.msg[i].msg += val
    setFormSettings(tmp)
    // console.log(tmp)
  }

  return (
    <div>
      {formSettings.confirmation.type.msg.map((itm, i) => (
        <div key={`f-m-${i + 1}`} className="flx btcd-conf-list">
          <Accordions
            title={itm.title}
            titleEditable
            cls="mt-2 mr-2"
            onTitleChange={e => handleMsgTitle(e, i)}
          >
            <div className="flx flx-between">
              {/* <div className="f-m">Success Message:</div> */}
              <select onChange={e => addFormField(e.target.value, i)} className="btcd-paper-inp p-i-sm w-3 f-right mt-0 form-fields">
                <option value="">Add form field</option>
                {formFields !== null && formFields.map(f => <option key={f.key} value={`{${f.key}}`}>{f.name}</option>)}
              </select>
            </div>
            <textarea
              onChange={e => handleMsgMsg(e.target.value, i)}
              className="btcd-paper-inp btcd-editor"
              rows="5"
              value={itm.msg}
              data-idx={i}
            />
          </Accordions>
          <Button onClick={() => rmvMsg(i)} icn cls="sh-sm white mt-2"><span className="btcd-icn icn-trash-2" style={{ fontSize: 16 }} /></Button>
        </div>
      ))}
      <div className="txt-center"><Button onClick={addMoreMsg} icn cls="sh-sm blue tooltip mt-2" style={{ '--tooltip-txt': '"Add More Alternative Success Message"' }}><b>+</b></Button></div>
    </div>
  )
}

export default memo(ConfMsg)
