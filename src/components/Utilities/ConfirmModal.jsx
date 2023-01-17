import { useFela } from 'react-fela'
import ut from '../../styles/2.utilities'
import { __ } from '../../Utils/i18nwrap'
import Btn from './Btn'
import Modal from './Modal'

function ConfirmModal({
  close, action, mainMdlCls, show, btnTxt, body, btn2Txt, btn2Action, btnClass, title, className, children, warning, cancelBtn = true,
}) {
  const { css } = useFela()
  return (
    <Modal
      sm
      show={show}
      setModal={close}
      className={mainMdlCls}
      title={title || 'Confirmation'}
      warning={warning || false}
    >
      <div className={`txt-center atn-btns flx flx-center ${className || 'flx-col'}`}>
        <div className={`content p-4 ${!className && 'confirm-content'}`}>
          {body}
          {children}
        </div>
        <div className={`d-flx flx-center ${warning && 'mt-3'}`}>
          {(!btn2Txt && cancelBtn) && (
            <Btn size="md" width="150px" onClick={close} rounded variant="default" className={css(ut.mr2)}>
              {__('Cancel')}
            </Btn>
          )}
          {btn2Txt && (
            <Btn size="md" width="150px" variant="success" rounded onClick={btn2Action}>
              {btn2Txt}
            </Btn>
          )}

          <Btn size="md" width="150px" variant="danger" rounded onClick={action} className={css(ut.mr2)}>
            {btnTxt}
          </Btn>
        </div>
      </div>
    </Modal>

  )
}

export default ConfirmModal
