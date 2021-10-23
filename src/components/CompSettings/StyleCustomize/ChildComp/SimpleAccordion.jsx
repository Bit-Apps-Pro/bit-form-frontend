/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react'
import { useFela } from 'react-fela'
import { CSSTransition } from 'react-transition-group'
import { useRecoilValue } from 'recoil'
import { $bits } from '../../../../GlobalStates'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import ut from '../../../../styles/2.utilities'
import SimpleAccordionStyle from '../../../../styles/SimpleAccordion.style'
import { __ } from '../../../../Utils/i18nwrap'
import Cooltip from '../../../Utilities/Cooltip'
import SingleToggle from '../../../Utilities/SingleToggle'


export default function SimpleAccordion({ className, title, toggleName, children, open = false, onOpen = () => { }, switching, tip, tipProps, toggleAction, toggleChecked, isPro, disable }) {
  const bits = useRecoilValue($bits)
  const [tgl, setTgl] = useState(!disable && open || false)
  const [H, setH] = useState(open ? 'auto' : 0)

  const { css } = useFela()
  const toggleAccordion = (e) => {
    // e.preventDefault()
    if (disable) return

    if (e.type === 'keypress') {
      if (e.code === 'Space' || e.code === 'Enter') {
        setTgl(prv => !prv)
        !tgl && onOpen()
        return
      }
    }
    if (e.type === 'keyup') {
      if (e.code === 'Escape') {
        setTgl(false)
        onOpen(false)
        return
      }
    }
    if (e.type === 'click') {
      setTgl(prv => !prv)
      !tgl && onOpen()
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (disable !== undefined) setTgl(!disable); console.log({ disable }) }, [disable])

  const cancelBubble = (e) => e.stopPropagation()

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyUp={toggleAccordion}
      onKeyPress={toggleAccordion}
      className={`${className} ${tgl && 'active'}`}
    >
      <div
        className="btgl w-10"
        tabIndex="-1"
        role="button"
        onClick={toggleAccordion}
        onKeyPress={toggleAccordion}
      >
        <div className={css(SimpleAccordionStyle.flxbwn)}>
          <span className={`title ${css(SimpleAccordionStyle.dflx)}`}>
            {title}
            {tip && (
              <Cooltip {...{ ...tipProps, className: 'hover-tip' }}>
                <div className="txt-body">{__(tip, 'bitform')}</div>
              </Cooltip>
            )}

            {isPro && !bits.isPro && <span className={`${css(ut.proBadge)} ${css(ut.ml2)}`}>{__('Pro', 'bitform')}</span>}
          </span>
          <div className={css(SimpleAccordionStyle.flxbwn)}>
            <div onClick={cancelBubble} onKeyPress={cancelBubble} role="button" tabIndex="-1">
              {switching && (
                <SingleToggle className={css(ut.mr2)} name={toggleName || title} action={toggleAction} isChecked={toggleChecked} />
              )}
            </div>
            <ChevronDownIcn className="toggle-icn" size="20" rotate={!!tgl} />
          </div>
        </div>
      </div>

      <div style={{ height: H, transition: 'height 300ms', overflow: 'hidden' }}>
        <CSSTransition
          in={tgl}
          timeout={150}
          onEntering={el => setH(el.offsetHeight)}
          onEntered={() => setH('auto')}
          onExit={el => setH(el.offsetHeight)}
          onExiting={() => setH(0)}
          unmountOnExit
        >
          <div className="body" onClick={cancelBubble} onKeyPress={cancelBubble}>
            {children}
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}
