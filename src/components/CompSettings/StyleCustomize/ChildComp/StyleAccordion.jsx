import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

export default function StyleAccordion({ className, title, children }) {
  const [tgl, setTgl] = useState(false)
  const [H, setH] = useState(0)

  return (
    <div className={`${className} ${tgl && 'active'}`}>
      <div
        className="tgl"
        tabIndex="0"
        role="button"
        onClick={() => setTgl(!tgl)}
        onKeyPress={() => setTgl(!tgl)}
      >
        <div className="flx flx-between">
          <span>{title}</span>
          <span className={`btcd-icn icn-${tgl ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}`} />
        </div>
      </div>

      <div style={{ height: H, transition: 'height 300ms' }}>
        <CSSTransition
          in={tgl}
          timeout={300}
          onEntering={el => setH(el.offsetHeight)}
          onEntered={() => setH('auto')}
          onExit={el => setH(el.offsetHeight)}
          onExiting={() => setH(0)}
          unmountOnExit
        >
          <div className="body">
            {children}
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}
