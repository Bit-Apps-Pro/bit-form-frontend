import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

export default function Grow({ children, open }) {
  const [H, setH] = useState(open ? 'auto' : 0)
  const [tgl, setTgl] = useState(open || false)

  useEffect(() => {
    setTgl(open)
  }, [open])

  return (
    <div style={{ height: H, transition: 'height 300ms' }}>
      <CSSTransition
        in={tgl}
        timeout={150}
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
  )
}
