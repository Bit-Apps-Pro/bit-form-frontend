/* eslint-disable no-undef */
import React, { useState } from 'react'
import Accordions from './ElmSettings/Childs/Accordions'

export default function ConfType(props) {
  console.log('%c $render FormSettings', 'background:lightgreen;padding:3px;border-radius:5px;')
  const { formSettings, setFormSettings } = props
  let conf = 0;
  if (props.formSettings.confirmation.type === 'page') {
    conf = 1;
  } else if (props.formSettings.confirmation.type === 'url') {
    conf = 2;
  }

  const [pos, setPos] = React.useState(conf);
  const [url, setUrl] = React.useState('');
  const [page, setPage] = React.useState('');
  const [msg, setMsg] = React.useState('');

  function handlePos(ind) {
    setPos(ind);
    const st = props.formSettings;
    switch (ind) {
      case 0:
        st.confirmation = { type: 'msg', txt: msg };
        break;
      case 1:
        st.confirmation = { type: 'page', page };
        break;
      case 2:
        st.confirmation = { type: 'url', url };
        break;
      default:
        break;
    }

    props.setFormSettings(st);
  }

  function handleUrl(e) {
    setUrl(e.target.value);
    const tmp = props.formSettings;
    tmp.confirmation = { type: 'url', url: e.target.value };
    props.setFormSettings(tmp);
  }

  function handleMsg(e) {
    setMsg(e.target.value);
    const tmp = props.formSettings;
    tmp.confirmation = { type: 'msg', msg: e.target.value };
    props.setFormSettings(tmp);
  }

  function handlePage(e) {
    setPage(e.target.value);
    const tmp = props.formSettings;
    tmp.confirmation = { type: 'page', page: e.target.value };
    props.setFormSettings(tmp);
  }

  const handleMsgTitle = (e, idx) => {
    const tmp = { ...formSettings }
    tmp.confirmation.type.msg[idx] = e.target.value
    setFormSettings(tmp)
    console.log(e.target.value, idx)
  }

  React.useEffect(() => {
    switch (props.formSettings.confirmation.type) {
      case 'url':
        setUrl(props.formSettings.confirmation.url);
        break;
      case 'msg':
        setMsg(props.formSettings.confirmation.msg);
        break;
      case 'page':
        setPage(props.formSettings.confirmation.page);
        break;
      default:
        break;
    }
    if (process.env.NODE_ENV === 'production' && typeof wp !== 'undefined') {
      wp.editor.remove()
      wp.editor.initialize(
        'wp-bitapps-editor',
        {
          tinymce: {
            wpautop: true,
            plugins: 'charmap colorpicker compat3x directionality fullscreen hr image lists media paste tabfocus textcolor wordpress wpautoresize wpdialogs wpeditimage wpemoji wpgallery wplink wptextpattern wpview',
            toolbar1: 'formatselect bold italic | bullist numlist | blockquote | alignleft aligncenter alignright | link unlink | wp_more | spellchecker',
          },
          quicktags: true,
        },
      )
    }
  }, [])

  return (
    <div className="btcd-f-c-t">
      <div>
        <b>Confirmation Type:</b>
      </div>
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
        <button
          onClick={() => handlePos(2)}
          className={`btcd-f-c-t-o ${pos === 2 && 'btcd-f-c-t-o-a'}`}
          type="button"
        >
          {' '}
          Redirect to a Custom Link
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
              onTitleChange={(e) => handleMsgTitle(e, i)}
            >
              <div className="f-m">Success Message:</div>
              <textarea
                onChange={handleMsg}
                className="btcd-paper-inp"
                rows="5"
                value={itm.msg}
                id="wp-bitapps-editor"
              />
            </Accordions>
          ))}
        </div>

        <div style={{ display: pos === 1 ? 'block' : 'none' }}>
          <div className="">
            Select A Page
          </div>
          <select value={page} onChange={handlePage} className="btcd-paper-inp">
            <option value="Page 1">Page 1</option>
            <option value="Page 2">Page 2</option>
            <option value="Page 3">Page 3</option>
          </select>
        </div>

        <div style={{ display: pos === 2 ? 'block' : 'none' }}>
          <div className="f-m">
            Custom URL:
          </div>
          <input
            onChange={handleUrl}
            className="btcd-paper-inp"
            text="text"
            value={url}
          />
        </div>
      </div>
    </div>
  );
}
