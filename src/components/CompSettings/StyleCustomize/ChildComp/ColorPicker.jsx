import React from 'react'
import { ColorPicker as Picker } from 'react-color-gradient-picker';
import 'react-color-gradient-picker/dist/index.css';
import { CSSTransition } from 'react-transition-group';
import useComponentVisible from './useComponentVisible';

export default function ColorPicker({ value, onChange }) {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false)

  let isGradient = false
  let picrVal = { red: 0, green: 0, blue: 0, alpha: 0 }

  if (value !== undefined && !value.includes('gradient')) {
    const [r, g, b, a] = value.match(/\d|\W /g).join('').split(',')
    picrVal = { red: Number(r), green: Number(g), blue: Number(b), alpha: Number(a) }
  } else if (value !== undefined) {
    isGradient = true
  }

  return (
    <div ref={ref} className="pos-rel">
      <CSSTransition
        in={isComponentVisible}
        timeout={150}
        classNames="btc-pk"
        unmountOnExit
      >
        <div className="btc-pick">
          <Picker
            onEndChange={onChange}
            color={picrVal}
            isGradient={isGradient}
          />
        </div>
      </CSSTransition>
      <div
        aria-label="color picker"
        onClick={() => setIsComponentVisible(!isComponentVisible)}
        onKeyPress={() => setIsComponentVisible(!isComponentVisible)}
        tabIndex="0"
        role="button"
        className="br-50 clr-pick"
        style={{ background: value }}
      />

    </div>
  )
}
