import { useFela } from 'react-fela'
import { useSetRecoilState } from 'recoil'
import 'tippy.js/animations/shift-away.css'
import 'tippy.js/dist/backdrop.css'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/material.css'
import { $proModal } from '../../GlobalStates/GlobalStates'
import proHelperData from '../../Utils/StaticData/proHelperData'

export default function ProBadge({ className, children, width = 'auto', icnSize = 18, tip = false, proProperty }) {
  const { css } = useFela()
  const setProModal = useSetRecoilState($proModal)
  return (
    // <Tippy
    //   animateFill
    //   plugins={[animateFill]}
    //   duration={150}
    //   theme="material"
    //   animation="shift-away"
    //   interactive
    //   maxWidth={width}
    //   content={<div className={css(c.tipBody)}>{children}</div>}
    // >
    <div
      role="button"
      tabIndex="0"
      data-tipbtn
      className={`${css(c.popper_icn)} ${className}`}
      onClick={() => setProModal({ show: true, ...proHelperData[proProperty] })}
      onKeyDown={() => setProModal({ show: true, ...proHelperData[proProperty] })}
    >
      {/* {tip ? children : <ProBadgeIcn size={icnSize} />} */}
      <span className={css(c.proBadge)}>PRO</span>
    </div>
    // </Tippy>
  )
}

const c = {
  proBadge: {
    bd: '#999999',
    cr: '#fff',
    fs: 10,
    fw: 700,
    brs: 8,
    p: '2px 4px',
    ml: 5,
    ':hover': {
      cur: 'pointer',
    },
  },
  popper_icn: {
    dy: 'inline-grid',
    placeContent: 'center',
    cr: 'var(--dp-blue-bg)',
    oy: 1,
    ml: 5,
    ':hover': {
      // oy: 1,
      cur: 'help',
    },
    cur: 'pointer !important',
  },
  tipBody: { fw: 300, p: 2 },
}
