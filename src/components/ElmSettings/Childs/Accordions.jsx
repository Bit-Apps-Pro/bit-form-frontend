/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, memo } from 'react'
import Button from './Button'

function Accordions({ title, subtitle, children, titleEditable, onTitleChange, cls, notScroll, header }) {
  console.log('%c $render Accordions', 'background:aquamarine;padding:3px;border-radius:5px;')

  const [tgl, setTgl] = useState(false)
  const inp = useRef(null)

  const handleTgl = e => {
    if (!e.target.classList.contains('edit')) {
      setTgl(!tgl)
    }
  }
  const focusEdit = () => {
    inp.current.focus()
  }
  return (
    <div className={`btcd-accr sh-sm ${cls}`}>
      <div className={`btcd-accr-btn ${tgl && 'blue'} flx flx-between`} onClick={handleTgl} onKeyPress={handleTgl} role="button" tabIndex={0}>
        <div className="btcd-accr-title w-10">
          <div>
            <input title={title} ref={inp} className={titleEditable && 'edit'} style={{ color: tgl ? 'white' : 'inherit' }} type="text" onChange={onTitleChange} value={title} readOnly={titleEditable === undefined} />
            {titleEditable !== undefined && <div className="edit" onClick={focusEdit} onKeyPress={focusEdit} role="button" tabIndex={0} aria-label="focus edit"><span className="btcd-icn icn-edit" style={{ color: tgl ? 'white' : 'gray' }} /></div>}
            {!tgl && header}
          </div>
          {subtitle !== undefined && <small>{subtitle}</small>}
        </div>

        <Button icn>
          <span className={`btcd-icn icn-${tgl ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}`} style={{ color: tgl ? 'white' : 'inherit' }} />
        </Button>
      </div>
      <section className="btcd-accr-cont" style={{ ...{ maxHeight: tgl ? 5000 : 0 }, ...{ overflowX: tgl && notScroll ? 'visible' : 'auto' } }}>
        <div>{children}</div>
      </section>
    </div>
  )
}


export default memo(Accordions)
