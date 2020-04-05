import React from 'react'
import Modal from './Modal'

function ConfirmModal({ close, action, show, btnTxt, body }) {
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
        <button onClick={close} className="btn btcd-btn-o-gray w-4 mr-2 br-50" type="button">Cancel</button>
        <button onClick={action} className="btn red w-4 br-50" type="button">{btnTxt}</button>
      </div>
    </Modal>

  )
}

export default ConfirmModal
