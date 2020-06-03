import React from 'react'

export default function Modal(props) {
  console.log('%c $render Modal', 'background:black;padding:3px;border-radius:5px;color:white')

  const handleClickOutside = e => {
    if (e.target.classList.contains('btcd-modal-wrp')) {
      props.setModal(false)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyPress={handleClickOutside}
      onClick={handleClickOutside}
      className={`btcd-modal-wrp ${props.show && 'btcd-modal-show'}`}
    >
      <div className={`btcd-modal ${props.sm && 'btcd-m-sm'} ${props.lg && 'btcd-m-lg'}`}>
        <div className="btcd-modal-content">
          {props.hdrActn}
          <button onClick={() => props.setModal(false)} className="icn-btn btcd-mdl-close" aria-label="modal-close" type="button"><span className="btcd-icn icn-clear" /></button>
          <h2 className="btcd-mdl-title flx">{props.title}</h2>
          <small className="btcd-mdl-subtitle">{props.subTitle}</small>
          {!props.sm && <div className="btcd-mdl-div" />}
          {props.children}
        </div>
      </div>
    </div>
  );
}
