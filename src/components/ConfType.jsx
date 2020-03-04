/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import Accordions from './ElmSettings/Childs/Accordions'
import Button from './ElmSettings/Childs/Button'

export default function ConfType(props) {
  console.log('%c $render FormSettings', 'background:lightgreen;padding:3px;border-radius:5px;')
  const { formSettings, setFormSettings } = props

  const [pos, setPos] = React.useState(0);

  const handlePos = ind => {
    setPos(ind)
  }

  const handleMsgTitle = (e, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.msg[idx].title = e.target.value
    setFormSettings(tmp)
  }

  const handleUrlTitle = (e, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.url[idx].title = e.target.value
    setFormSettings(tmp)
  }

  const handleMsgMsg = (mg, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.msg[idx].msg = mg
    setFormSettings(tmp)
  }

  const handlePage = (e, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.url[idx].url = e.target.value
    setFormSettings(tmp)
  }

  const handleLink = (val, i) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.url[i].url = val
    setFormSettings(tmp)
  }

  const getUrlParams = url => url.match(/(\?|&)([^=]+)=([^&]+)/gi)

  const handleParam = (typ, val, pram, i) => {
    const tmp = { ...formSettings }
    if (typ === 'key') {
      tmp.confirmation.type.url[i].url = tmp.confirmation.type.url[i].url.replace(pram, `${pram.charAt(0)}${val}=${pram.split('=')[1]}`)
    } else {
      tmp.confirmation.type.url[i].url = tmp.confirmation.type.url[i].url.replace(pram, `${pram.split('=')[0]}=${val}`)
    }
    setFormSettings(tmp)
  }

  useEffect(() => {
    if (typeof tinymce !== 'undefined') {
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
  }, [])

  return (
    <div className="btcd-f-c-t">
      <div><b>Confirmation Type:</b></div>
      <div>
        <button
          onClick={() => handlePos(0)}
          className={`btcd-f-c-t-o ${pos === 0 && 'btcd-f-c-t-o-a'}`}
          type="button"
        >
          Same Page With a Message
        </button>
        <button
          onClick={() => handlePos(1)}
          className={`btcd-f-c-t-o ${pos === 1 && 'btcd-f-c-t-o-a'}`}
          type="button"
        >
          Redirect to another Page
        </button>
      </div>

      <div className="btcd-f-c-t-d">
        <div style={{ display: pos === 0 ? 'block' : 'none' }}>
          {formSettings.confirmation.type.msg.map((itm, i) => (
            <Accordions
              key={`f-m-${i + 1}`}
              title={itm.title}
              titleEditable
              cls="mt-2"
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
          ))}
        </div>

        <div style={{ display: pos === 1 ? 'block' : 'none' }}>
          {formSettings.confirmation.type.url.map((itm, i) => (
            <Accordions
              key={`f-u-${i + 1}`}
              title={itm.title}
              titleEditable
              cls="mt-2"
              onTitleChange={e => handleUrlTitle(e, i)}
            >
              <div className="f-m">Select A Page:</div>
              <select className="btcd-paper-inp" onChange={e => handlePage(e, i)}>
                <option value="">Custom Link</option>
                <option value="https://www.Page-1.com?aaa=wwww&ssss=dddd">Page 1</option>
                <option value="https://www.Page-2.com?aaa=wwww&ssss=dddd">Page 2</option>
                <option value="https://www.Page-3.com?aaa=wwww&ssss=dddd">Page 3</option>
              </select>
              <br />
              <br />
              <div className="f-m">Link:</div>
              <input onChange={e => handleLink(e.target.value, i)} className="btcd-paper-inp" type="text" value={itm.url} />
              <br />
              <br />
              <div className="f-m">Add Url Parameter: (optional)</div>
              <div className="btcd-param-t-wrp mt-1">
                <div className="btcd-param-t">
                  <div className="tr">
                    <div className="td">Key</div>
                    <div className="td">Value</div>
                  </div>
                  {getUrlParams(itm.url) !== null && getUrlParams(itm.url).map((item, childIdx) => (
                    <div key={`url-p-${childIdx + 11}`} className="tr">
                      <div className="td"><input onChange={e => handleParam('key', e.target.value, item, i)} type="text" value={item.split('=')[0].substr(1)} /></div>
                      <div className="td">
                        <span className="tooltip" style={{ '--tooltip-txt': '"Get Form Field"', height: 200, width: 200, background: 'red', position: 'relative' }}></span>

                        <input onChange={e => handleParam('val', e.target.value, item, i)} type="text" value={item.split('=')[1]} />
                        <select className="tooltip" style={{ '--tooltip-txt': '"Get Form Field"' }} name="">
                          <option disabled selected>Select form field value</option>
                        </select>
                      </div>
                    </div>
                  ))}
                  <Button icn>+</Button>
                </div>
              </div>

            </Accordions>
          ))}
        </div>

      </div>
    </div>
  );
}
