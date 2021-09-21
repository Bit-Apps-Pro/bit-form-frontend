/* eslint-disable react/jsx-props-no-spreading */
import Tippy from '@tippyjs/react'
import { roundArrow } from 'tippy.js'
import 'tippy.js/dist/tippy.css'
// import 'tippy.js/themes/translucent.css'
// import 'tippy.js/themes/material.css'
import 'tippy.js/themes/light-border.css'
import 'tippy.js/animations/scale.css'
import 'tippy.js/dist/svg-arrow.css'
import 'tippy.js/animations/shift-away-extreme.css'

export default function Downmenu({ className, children, width = 'auto', place = 'bottom', onShow, onHide, arrow = true, trigger = 'click' }) {
  return (
    <Tippy
      inertia
      trigger={trigger}
      placement={place}
      duration={350}
      interactiveBorder={20}
      {...onShow && { onShow }}
      {...onHide && { onHide }}
      theme="light-border"
      animation="shift-away-extreme"
      interactive
      maxWidth={width}
      arrow={arrow && roundArrow}
      content={children[1]}
    >
      <span>{children[0]}</span>
    </Tippy>
  )
}
