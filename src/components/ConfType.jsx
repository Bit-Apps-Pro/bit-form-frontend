/* eslint-disable no-undef */
import React from 'react';
import { useRef } from 'react';

export default function ConfType(props) {
  let conf = 0;
  if (props.formSettings.confirmation.type === 'page') {
    conf = 1;
  } else if (props.formSettings.confirmation.type === 'url') {
    conf = 2;
  }
  const a = useRef(null)
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
    if (typeof tinymce !== 'undefined') {
      console.log('GG', typeof tinymce)
      /* wp.editor.remove()
      console.log('here in tinymce')
      wp.editor.initialize(
        'wp-bitapps-editor',
        {
          tinymce: {
            // wpautop: true,
            plugins: 'charmap colorpicker compat3x directionality fullscreen hr image lists media paste tabfocus textcolor wordpress wpautoresize wpdialogs wpeditimage wpemoji wpgallery wplink wptextpattern wpview',
            toolbar1: 'wpemoji formatselect bold italic | bullist numlist | blockquote | alignleft aligncenter alignright | link unlink | wp_more ',
          },
          quicktags: true,
        },
      ) */
      tinymce.init({
        mode: 'textareas',
        plugins: 'charmap colorpicker compat3x directionality fullscreen hr image lists media paste tabfocus textcolor wordpress wpautoresize wpdialogs wpeditimage wpemoji wpgallery wplink wptextpattern wpview',
        // mode: "exact",
        // elements: 'pre-details',
        theme: 'modern',
        // skin: 'lightgray',
        menubar: false,
        // statusbar: false,
        branding: false,
        toolbar: [
          'emoticons wpemoji bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link | undo redo',
        ],
        external_plugins: { emoticons: 'http:\/\/192.168.1.11\/wp-content\/plugins\/tinymce-advanced\/mce\/emoticons\/plugin.min.js' },
      })
    }
  }, []);

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
        <div className="btcd-f-c-t-d-0" style={{ height: pos === 0 && 130 }}>
          <div className="f-m">
            <b>Success Message: </b>
          </div>
          <textarea
            ref={a}
            onChange={handleMsg}
            className="btcd-paper-inp"
            style={{ width: '95%' }}
            rows="5"
            value={msg}
            id="wp-bitapps-editor"
          />
          <textarea
            onChange={handleMsg}
            className="btcd-paper-inp"
            style={{ width: '95%' }}
            rows="5"
            value={msg}
            id="wp-bitapps-editor2"
          />
        </div>
        <div className="btcd-f-c-t-d-0" style={{ height: pos === 1 && 70 }}>
          <div className="">
            <b>Select A Page</b>
          </div>
          <select value={page} onChange={handlePage} className="btcd-paper-inp">
            <option value="Page 1">Page 1</option>
            <option value="Page 2">Page 2</option>
            <option value="Page 3">Page 3</option>
          </select>
        </div>
        <div className="btcd-f-c-t-d-0" style={{ height: pos === 2 && 70 }}>
          <div className="f-m">
            <b>Custom URL:</b>
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
