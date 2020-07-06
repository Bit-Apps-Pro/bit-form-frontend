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

  if (value !== undefined && !value.match(/gradient/g)) {
    const [r, g, b, a] = value.match(/\d\.\d\d|\d\d\.\d\d|\d\d\d|\d\d|\d/g)
    // picrVal = { red: parseInt(r, 10), green: parseInt(g, 10), blue: parseInt(b, 10), alpha: parseInt(a, 10) }
    picrVal = { red: Number(r), green: Number(g), blue: Number(b), alpha: Number(a) }
  } else if (value !== undefined) {
    isGradient = true
  }

  return (
    <div ref={ref} className="pos-rel">
      <div
        aria-label="color picker"
        title="Color Picker"
        onClick={() => setIsComponentVisible(!isComponentVisible)}
        onKeyPress={() => setIsComponentVisible(!isComponentVisible)}
        tabIndex="0"
        role="button"
        className="br-50 clr-pick"
        style={{ background: value }}
      />
      <CSSTransition
        in={isComponentVisible}
        timeout={150}
        classNames="btc-pk pos-rel"
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
    </div>
  )
}
