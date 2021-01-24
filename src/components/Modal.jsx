import { CSSTransition } from 'react-transition-group';

export default function Modal(props) {
  console.log('%c $render Modal', 'background:black;padding:3px;border-radius:5px;color:white')
  const handleClickOutside = e => {
    if (e.target.classList.contains('btcd-modal-wrp')) {
      props.setModal(false)
    }
  }

  return (
    <CSSTransition
      in={props.show}
      timeout={500}
      classNames="btc-mdl-trn"
      unmountOnExit
    >
      <div
        role="button"
        tabIndex={0}
        onKeyPress={handleClickOutside}
        onClick={handleClickOutside}
        className="btcd-modal-wrp flx"
      >
        <div
          className={`btcd-modal ${props.sm && 'btcd-m-sm'} ${props.lg && 'btcd-m-lg'} ${props.className}`}
          style={props.style}
        >
          <div className="btcd-modal-content">
            {props.hdrActn}
            <button onClick={() => props.setModal(false)} className="icn-btn btcd-mdl-close" aria-label="modal-close" type="button"><span className="btcd-icn icn-clear" /></button>
            <h2 className="btcd-mdl-title flx" style={{ color: props.warning ? 'red' : '' }}>{props.title}</h2>
            <small className="btcd-mdl-subtitle">{props.subTitle}</small>
            {!props.sm && <div className="btcd-mdl-div" />}
            {props.children}
          </div>
        </div>
      </div>
    </CSSTransition>
  )
}
