/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

import { memo, useEffect, useState } from 'react'
import { __ } from '../Utils/i18nwrap'
import { deepCopy } from '../Utils/Helpers'
import ConfirmModal from './ConfirmModal'
import Accordions from './ElmSettings/Childs/Accordions'
import Button from './ElmSettings/Childs/Button'

function ConfMsg({ formSettings, setFormSettings, formFields, removeIntegration }) {
  const [confMdl, setConfMdl] = useState({ show: false, action: null })

  const handleMsgMsg = (mg, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.successMsg[idx].msg = mg
    setFormSettings(tmp)
  }

  const tinyMceInit = () => {
    if (typeof tinymce !== 'undefined' && formFields.length > 0) {
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
        toolbar: 'formatselect bold italic |  alignleft aligncenter alignright | outdent indent | link | undo redo | hr | addFormField | toggleCode',
        setup(editor) {
          editor.on('Paste Change input Undo Redo', () => {
            handleMsgMsg(editor.getContent(), editor.targetElm.getAttribute('data-idx'))
          })

          editor.addButton('addFormField', {
            text: __('Form Fields', 'bitform'),
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
    tinyMceInit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSettings, formFields])

  const handleMsgTitle = (e, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.successMsg[idx].title = e.target.value
    setFormSettings(tmp)
  }

  const addMoreMsg = () => {
    const tmpFormSettings = deepCopy(formSettings)
    if (!('confirmation' in tmpFormSettings)) {
      tmpFormSettings.confirmation = { type: { successMsg: [] } }
      tmpFormSettings.confirmation.type.successMsg.push({ title: `Untitled Message ${tmpFormSettings.confirmation.type.successMsg.length + 1}`, msg: __('Successfully Submitted.', 'bitform') })
    } else if ('successMsg' in tmpFormSettings.confirmation.type) {
      tmpFormSettings.confirmation.type.successMsg.push({ title: `Untitled Message ${tmpFormSettings.confirmation.type.successMsg.length + 1}`, msg: __('Successfully Submitted.', 'bitform') })
    } else {
      tmpFormSettings.confirmation.type = { successMsg: [], ...tmpFormSettings.confirmation.type }
      tmpFormSettings.confirmation.type.successMsg.push({ title: `Untitled Message ${tmpFormSettings.confirmation.type.successMsg.length + 1}`, msg: __('Successfully Submitted.', 'bitform') })
    }
    setFormSettings(tmpFormSettings)
  }

  const addFormField = (val, i) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.successMsg[i].msg += val
    setFormSettings(tmp)
  }

  const closeMdl = () => {
    confMdl.show = false
    setConfMdl({ ...confMdl })
  }

  const showDelConf = (i) => {
    confMdl.show = true
    confMdl.action = () => rmvMsg(i)
    setConfMdl({ ...confMdl })
  }

  const rmvMsg = async i => {
    const tmpData = formSettings.confirmation.type.successMsg[i]
    formSettings.confirmation.type.successMsg.splice(i, 1)
    setFormSettings({ ...formSettings })
    confMdl.show = false
    setConfMdl({ ...confMdl })
    window.tinymce && tinymce.remove()
    if (tmpData.id !== undefined) {
      const status = await removeIntegration(tmpData.id, 'msg')
      if (!status) {
        formSettings.confirmation.type.successMsg.splice(i, 0, tmpData)
        setFormSettings({ ...formSettings })
      }
    }
  }

  return (
    <div>
      <ConfirmModal
        action={confMdl.action}
        show={confMdl.show}
        body={__('Are you sure to delete this message ?', 'bitform')}
        btnTxt={__('Delete', 'bitform')}
        close={closeMdl}
      />

      {'confirmation' in formSettings
        && formSettings.confirmation.type.successMsg !== undefined
        ? formSettings.confirmation.type.successMsg.map((itm, i) => (
          <div key={`f-m-${i + 1}`} className="flx">
            <Accordions
              title={itm.title}
              titleEditable
              cls="mt-2 mr-2 w-9"
              onTitleChange={e => handleMsgTitle(e, i)}
              onExpand={tinyMceInit}
            >
              <div className="flx flx-between">
                <select onChange={e => addFormField(e.target.value, i)} className="btcd-paper-inp p-i-sm w-3 f-right mt-0 form-fields">
                  <option value="">{__('Add form field', 'bitform')}</option>
                  {formFields !== null && formFields.map(f => !f.type.match(/^(file-up|recaptcha)$/) && <option key={f.key} value={`\${${f.key}}`}>{f.name}</option>)}
                </select>
              </div>
              <textarea
                onChange={e => handleMsgMsg(e.target.value, i)}
                className="btcd-paper-inp btcd-editor mt-2"
                rows="5"
                value={itm.msg}
                data-idx={i}
              />
            </Accordions>
            <Button onClick={() => showDelConf(i)} icn className="sh-sm white mt-2"><span className="btcd-icn icn-trash-2" style={{ fontSize: 16 }} /></Button>
          </div>
        )) : (
          <div className="txt-center btcd-empty">
            <span className="btcd-icn icn-stack" />
            {__('Empty', 'bitform')}
          </div>
        )}
      <div className="txt-center"><Button onClick={addMoreMsg} icn className="sh-sm blue tooltip mt-2" style={{ '--tooltip-txt': `'${__('Add More Alternative Success Message', 'bitform')}'` }}><span className="btcd-icn icn-clear icn-rotate-45" /></Button></div>
    </div>
  )
}

export default memo(ConfMsg)
