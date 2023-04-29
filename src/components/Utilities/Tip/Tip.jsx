/* eslint-disable react/jsx-props-no-spreading */
import Tippy from '@tippyjs/react'
import { animateFill } from 'tippy.js'
import 'tippy.js/dist/tippy.css'
// import 'tippy.js/themes/translucent.css'
import 'tippy.js/themes/light-border.css'
import 'tippy.js/themes/material.css'
// import 'tippy.js/themes/light.css'
// import 'tippy.js/animations/scale.css'
// import 'tippy.js/dist/svg-arrow.css'
import { useFela } from 'react-fela'
import 'tippy.js/animations/shift-away.css'
import 'tippy.js/dist/backdrop.css'

export default function Tip({
  className,
  children,
  width = 'auto',
  delay = 0,
  msg = '',
  theme = 'material',
  place = 'bottom',
  felaStyle = {},
  whiteSpaceNowrap = false,
  trigger = 'mouseenter',
  singleton = null,
  interactive = true,
}) {
  const { css } = useFela()
  const style = { fw: 400, ff: '"Roboto", sans-serif', fs: 12, letterSpacing: '.3px', ...whiteSpaceNowrap && { whiteSpace: 'nowrap' } }
  return (
    <Tippy
      trigger={trigger}
      placement={place}
      plugins={theme === 'material' && [animateFill]}
      duration={150}
      delay={delay}
      theme={theme}
      animation="shift-away"
      moveTransition="transform 0.2s ease-out"
      maxWidth={width}
      arrow={false}
      {...interactive && { interactive }}
      {...singleton && { singleton }}
      // offset={[00, 0]}
      content={<span className={css([style, felaStyle])}>{msg}</span>}
    >
      {children && <span className={className}>{children}</span>}
    </Tippy>
  )
}
