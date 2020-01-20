import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
/* eslint-disable no-undef */
export default function Modal(props) {
  const handleClickOutside = e => {
    e.target.classList.contains("btcd-modal-wrp") && props.setModal(false);
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onKeyPress={handleClickOutside}
      onClick={handleClickOutside}
      className={`btcd-modal-wrp ${props.show && "btcd-modal-show"}`}
    >
      <div className="btcd-modal">
        <div className="btcd-modal-content">
          <button
            onClick={() => props.setModal(false)}
            className="icn-btn btcd-mdl-close"
            aria-label="modal-close"
            type="button"
          >
            &#x02A2F;
          </button>
          <h2 className="btcd-mdl-title">{props.title}</h2>
          <small className="btcd-mdl-subtitle">{props.subTitle}</small>
          <div className="btcd-mdl-div" />
          {props.children}
          {props.show && <Templates />}
        </div>
      </div>
    </div>
  );
}

function Templates() {
  const [templates, setTemplates] = useState(null);
  useEffect(() => {
    const fetchTemplates = async () => {
      const result = await axios.post(bits.ajaxURL, null, {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          action: "bitapps_templates",
          _ajax_nonce: bits.nonce
        }
      })

      setTemplates(JSON.parse(result.data.data))
    }
    if(!templates){
      fetchTemplates()
    }
  })
  return (
    templates &&
    templates.map(template => (
      <div className="btcd-tem">
        <span className="btcd-icn icn-file-empty" style={{ fontSize: 90 }} />
        <div>{template.title}</div>
        <div className="btcd-hid-btn">
          <Link to={`builder/${template.title}`} className="btn btn-white sh-sm" type="button">
            Create
          </Link>
        </div>
      </div>
    ))
  )
}
