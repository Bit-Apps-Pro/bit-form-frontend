import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

export default function Grow({ children, open, overflw = 'auto' }) {
  const [H, setH] = useState(open ? 'auto' : 0)
  const [tgl, setTgl] = useState(open || false)

  useEffect(() => {
    setTgl(open)
  }, [open])

  const getAbsoluteHeight = (el) => {
    const styles = window.getComputedStyle(el)
    const margin = parseFloat(styles.marginTop)
      + parseFloat(styles.marginBottom)
    return Math.ceil(el.offsetHeight + margin)
  }

  const setAccHeight = (el) => setH(getAbsoluteHeight(el))

  return (
    <div style={{ height: H, transition: 'height 300ms', overflow: H === 'auto' ? overflw : 'hidden' }}>
      <CSSTransition
        in={tgl}
        timeout={300}
        onEntering={setAccHeight}
        onEntered={() => setH('auto')}
        onExit={el => setH(el.offsetHeight)}
        onExiting={() => setH(0)}
        unmountOnExit
        style={{ overflow: tgl ? overflw : 'hidden' }}
      >
        <div className="body">
          {children}
        </div>
      </CSSTransition>
    </div>
  )
}
