/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react'
import { useFela } from 'react-fela'
import { CSSTransition } from 'react-transition-group'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import Cooltip from '../../../Utilities/Cooltip'
import SingleToggle from '../../../Utilities/SingleToggle'
import SimpleAccordionStyle from '../../../../styles/SimpleAccordion.style'

SimpleAccordion.defaultProps = {
  onOpen: () => { },
  open: false,
}

export default function SimpleAccordion({ className, title, children, open, onOpen, switching, tip, tipProps }) {
  const [tgl, setTgl] = useState(open)
  const [H, setH] = useState(open ? 'auto' : 0)

  const { css } = useFela()

  const toggleAccordion = (val) => {
    setTgl(val)
    val && onOpen()
  }

  // useEffect(() => {
  //   toggleAccordion(open)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [open])

  return (
    <div className={`${className} ${tgl && 'active'}`}>
      <div
        className="btgl w-10"
        tabIndex="0"
        role="button"
        onClick={() => toggleAccordion(!tgl)}
        onKeyPress={() => toggleAccordion(!tgl)}
      >
        <div className={`${css(SimpleAccordionStyle.flxbwn)} ${SimpleAccordionStyle.hrv_tip}`}>
          <span className={`title ${css(SimpleAccordionStyle.dflx)}`}>
            {title}
            {tip && (
              <span className="ml-2 hover-tip">
                <Cooltip {...tipProps}>
                  {tip}
                </Cooltip>
              </span>
            )}
          </span>
          <div className={css(SimpleAccordionStyle.flxbwn)}>
            {switching && (
              <SingleToggle />
            )}
            <ChevronDownIcn size="20" rotate={!!tgl} />
          </div>
          {/* <span className={`btcd-icn icn-${tgl ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}`} /> */}
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
          <div className="body">
            {children}
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}
