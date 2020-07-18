import React from 'react'
import Modal from './Modal'

function ConfirmModal({ close, action, mainMdlCls, show, btnTxt, body, btn2Txt, btn2Action, btnClass, title, className, children }) {
  return (
    <Modal
      sm
      show={show}
      setModal={close}
      className={mainMdlCls}
      title={title || 'Confirmation'}
    >
      <div className={`txt-center atn-btns flx flx-center ${className}`}>
        <div className="content">
          {body}
          {children}
        </div>
        <div className="txt-center">
          {!btn2Txt && <button onClick={close} className="btn btcd-btn-o-gray green w-4 mr-2 br-50" type="button">Cancel</button>}
          {btn2Txt && <button onClick={btn2Action} className="btn green w-4 mr-2 br-50" type="button">{btn2Txt}</button>}
          <button onClick={action} className={`btn ${btnClass || 'red'} w-4 br-50`} type="button">{btnTxt}</button>
        </div>
      </div>
    </Modal>

  )
}

export default ConfirmModal
