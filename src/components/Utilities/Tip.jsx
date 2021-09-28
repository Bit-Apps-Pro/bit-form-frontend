import Tippy from '@tippyjs/react'
import { animateFill } from 'tippy.js'
import 'tippy.js/dist/tippy.css'
// import 'tippy.js/themes/translucent.css'
import 'tippy.js/themes/material.css'
// import 'tippy.js/animations/scale.css'
// import 'tippy.js/dist/svg-arrow.css'
import 'tippy.js/dist/backdrop.css'
import 'tippy.js/animations/shift-away.css'
import { useFela } from 'react-fela'

export default function Tip({ className, children, width = 'auto', msg = '', place = 'bottom', trigger = 'mouseenter' }) {
  const { css } = useFela()
  const style = { fw: 400 }
  return (
    <Tippy
      trigger={trigger}
      animateFill
      placement={place}
      plugins={[animateFill]}
      duration={150}
      theme="material"
      animation="shift-away"
      interactive
      maxWidth={width}
      // arrow
      content={<span className={css(style)}>{msg}</span>}
    >
      <span>{children}</span>
    </Tippy>
  )
}
