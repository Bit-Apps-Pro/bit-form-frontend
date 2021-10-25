import { CSSTransition } from 'react-transition-group'
import CloseIcn from '../../Icons/CloseIcn'

export default function Modal({ show, setModal, sm, lg, style, className, title, warning, hdrActn, children, subTitle, autoHeight }) {
  const handleClickOutside = e => {
    if (e.target.classList.contains('btcd-modal-wrp')) {
      setModal(false)
    }
  }
  const cancelBubble = (e) => e.stopPropagation()

  return (
    <CSSTransition
      in={show}
      timeout={210}
      classNames="btc-mdl-trn"
      unmountOnExit
    >
      <div
        role="button"
        tabIndex={0}
        onKeyDown={handleClickOutside}
        onMouseDown={handleClickOutside}
        className="btcd-modal-wrp"
      >
        <div
          tabIndex="-1"
          onClick={cancelBubble}
          onKeyPress={cancelBubble}
          role="button"
          className={`btcd-modal ${sm ? 'btcd-m-sm' : ''} ${lg ? 'btcd-m-lg' : ''} ${className} ${autoHeight ? 'auto-height' : ''}`}
          style={style}
        >
          <div className="btcd-modal-content">
            {hdrActn}
            <button onClick={() => setModal(false)} className="icn-btn btcd-mdl-close" aria-label="modal-close" type="button"><CloseIcn size={16} stroke={3} /></button>
            <h2 className="btcd-mdl-title flx" style={{ color: warning ? 'red' : '' }}>{title}</h2>
            <small className="btcd-mdl-subtitle">{subTitle}</small>
            {!sm && <div className="btcd-mdl-div" />}
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}
