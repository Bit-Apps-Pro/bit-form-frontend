import React from 'react'
import Modal from './Modal'

function ConfirmModal({ close, action, show, btnTxt, body, btn2Txt, btn2Action, btnClass }) {
  return (
    <Modal
      sm
      show={show}
      setModal={close}
      title="Confirmation"
    >
      <div className="txt-center atn-btns">
        <div className="flx flx-center content">
          {body}
        </div>
        {!btn2Txt && <button onClick={close} className="btn btcd-btn-o-gray green w-4 mr-2 br-50" type="button">Cancel</button>}
        {btn2Txt && <button onClick={btn2Action} className="btn green w-4 mr-2 br-50" type="button">{btn2Txt}</button>}
        <button onClick={action} className={`btn ${btnClass || 'red'} w-4 br-50`} type="button">{btnTxt}</button>
      </div>
    </Modal>

  )
}

export default ConfirmModal
