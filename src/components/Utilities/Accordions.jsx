/* eslint-disable react/jsx-props-no-spreading */
import { memo, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import { CSSTransition } from 'react-transition-group'
import ChevronDownIcn from '../../Icons/ChevronDownIcn'
import EditIcn from '../../Icons/EditIcn'
import Button from './Button'
import SingleToggle2 from './SingleToggle2'

function Accordions({ title, customTitle, subtitle, children, titleEditable, onTitleChange, cls, notScroll, header, onExpand, onCollapse, toggle, action, checked }) {
  console.log('%c $render Accordions', 'background:aquamarine;padding:3px;border-radius:5px;')

  const [tgl, setTgl] = useState(false)
  const [H, setH] = useState(0)
  const inp = useRef(null)
  const { css } = useFela()

  const handleTgl = e => {
    if (!e.target.classList.contains('edit')) {
      setTgl(!tgl)
    }
  }

  const focusEdit = () => {
    inp.current.focus()
  }

  const onAccordionExpand = () => {
    setH('auto')
    if (onExpand) {
      onExpand()
    }
  }

  const onAccordionCollapse = el => {
    setH(el.offsetHeight)
    if (onCollapse) {
      onCollapse()
    }
  }

  return (
    <div className={`btcd-accr sh-sm ${cls}`}>
      <div className={`btcd-accr-btn ${tgl && 'blue'} flx flx-between`} onClick={handleTgl} onKeyPress={handleTgl} role="button" tabIndex={0}>
        <div className="btcd-accr-title w-10">
          <div className={css({ flx: 'align-center' })}>
            {customTitle}
            {title !== undefined && <input aria-label="accrodions" title={title} ref={inp} className={titleEditable && 'edit'} style={{ color: tgl ? 'white' : 'inherit' }} type="text" onChange={onTitleChange} value={title} readOnly={titleEditable === undefined} />}
            {titleEditable && <div className="edit-icn" onClick={focusEdit} onKeyPress={focusEdit} role="button" tabIndex={0} aria-label="focus edit"><span style={{ color: tgl ? 'white' : 'gray' }}><EditIcn /></span></div>}
            {!tgl && header}
          </div>
          {subtitle !== undefined && <small>{subtitle}</small>}
        </div>
        {toggle && (
          <SingleToggle2 action={action} checked={checked} className="flx" />)}
        <Button icn>
          <ChevronDownIcn size="20" rotate={!!tgl} />
        </Button>
      </div>

      <div className={`o-h ${tgl && 'delay-overflow'}`} style={{ height: H, transition: 'height 300ms' }}>
        <CSSTransition
          in={tgl}
          timeout={300}
          onEntering={el => setH(el.offsetHeight)}
          onEntered={onAccordionExpand}
          onExiting={() => setH(0)}
          onExit={el => onAccordionCollapse(el)}
          unmountOnExit
        >
          <div className="p-2">
            {children}
          </div>
        </CSSTransition>
      </div>

    </div>
  )
}

export default memo(Accordions)
