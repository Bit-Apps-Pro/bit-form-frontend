import React, { useEffect, memo } from 'react'
import Accordions from './ElmSettings/Childs/Accordions'
import Button from './ElmSettings/Childs/Button'

function ConfMsg({ formSettings, setFormSettings }) {

  const handleMsgMsg = (mg, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.msg[idx].msg = mg
    setFormSettings(tmp)
  }

  useEffect(() => {
    if (typeof tinymce !== 'undefined') {
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
        resize: 'both',
        min_width: 300,
        // max_width: 800,
        toolbar: 'formatselect bold italic | alignleft aligncenter alignright | outdent indent | link | undo redo | hr lists| emoticons ',
        setup(editor) {
          editor.on('Paste Change input Undo Redo', () => {
            handleMsgMsg(editor.getContent(), editor.targetElm.getAttribute('data-idx'))
          })
        },
      })
    }
  }, [formSettings])

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
            <div className="f-m">Success Message:</div>
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
