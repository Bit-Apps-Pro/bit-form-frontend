/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react'
import { useFela } from 'react-fela'
import { CSSTransition } from 'react-transition-group'
import SortIcn from '../../../../Icons/SortIcn'
import ut from '../../../../styles/2.utilities'
import { fieldTool } from '../../../../Utils/StaticData/fieldTool'

export default function LayerAccordion({ className,
  title,
  children,
  open = false,
  actionComponent,
  offset = 0,
  tag,
  onClick }) {
  const [tgl, setTgl] = useState((open) || false)
  const [H, setH] = useState(open ? 'auto' : 0)

  const { css } = useFela()
  const toggleAccordion = (e) => {
    // e.preventDefault()

    if (e.type === 'keypress') {
      if (e.code === 'Space' || e.code === 'Enter') {
        setTgl(prv => !prv)
        return
      }
    }
    if (e.type === 'keyup') {
      if (e.code === 'Escape') {
        setTgl(false)
        return
      }
    }
    if (e.type === 'click') {
      setTgl(prv => !prv)
    }
  }

  const cancelBubble = (e) => e.stopPropagation()

  const getAbsoluteHeight = (el) => {
    const styles = window.getComputedStyle(el)
    const margin = parseFloat(styles.marginTop)
      + parseFloat(styles.marginBottom)
    return Math.ceil(el.offsetHeight + margin)
  }

  const showFldTitle = (typ) => fieldTool[typ] || typ

  const setAccHeight = (el) => setH(getAbsoluteHeight(el))

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyUp={toggleAccordion}
      onKeyPress={toggleAccordion}
      className={`${className} ${tgl && 'active'}`}
      onClick={onClick}
    >
      <div
        className={`btgl ${css({ w: '100%' })}`}
        tabIndex="-1"
        role="button"
        onClick={toggleAccordion}
        onKeyPress={toggleAccordion}
      >
        <div className={css(ut.flxc, cls.titlebar)} style={{ paddingLeft: offset * 2 }}>
          <SortIcn className={`toggle-icn ${css(cls.icn)} `} size="9" style={{ transform: `rotate(${tgl ? 180 : 90}deg)` }} />
          <div className={css(cls.flxbwn)}>
            <div className={css(ut.flxc)}>
              <span className={`title ${css(cls.dflx, ut.fw500)}`}>
                {showFldTitle(title)}
              </span>
              <span className={css(cls.titleTag)}>{tag}</span>
            </div>
            <div onClick={cancelBubble} onKeyPress={cancelBubble} role="button" tabIndex="-1">
              {actionComponent && actionComponent}
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: H, transition: 'height 300ms', overflow: H === 'auto' ? 'auto' : 'hidden' }}>
        <CSSTransition
          in={tgl}
          timeout={300}
          onEntering={setAccHeight}
          onEntered={() => setH('auto')}
          onExit={el => setH(el.offsetHeight)}
          onExiting={() => setH(0)}
          unmountOnExit
          style={{ overflow: tgl ? 'auto' : 'hidden' }}
        >
          <div
            className={`body ${css(cls.body)}`}
            onClick={cancelBubble}
            onKeyPress={cancelBubble}
            style={{ paddingLeft: offset * 4 }}
          >
            {children}
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}
const cls = {
  flxbwn: { flx: 'between' },
  titlebar: {
    ws: 'nowrap',
    ow: 'hidden',
    fw: 500,
    ':hover': { bd: '#eeeff7' },
  },
  dflx: {
    flx: 'align-center',
    fw: 400,
    fs: 13,
    lh: 2,
    curp: 1,
    '& .hover-tip': { oy: 0 },
  },
  ':hover': { bd: 'var(--b-50-95)' },
  icn: {
    cr: '#c6c6c6',
    mr: 4,
    ml: 4,
    mt: -1,
    tn: 'transform 250ms',
  },
  body: { fs: 12 },
  titleTag: {
    p: '1px 5px',
    bd: '#EDF2F7',
    brs: 5,
    cr: 'gray',
    fs: 11,
    fw: 400,
    b: '1px solid #d8dde2',
    ml: '7px',
    curp: 1,
  },
}
