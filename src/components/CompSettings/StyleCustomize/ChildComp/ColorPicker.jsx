import React, { useState, useEffect } from 'react'
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
    picrVal = { red: Number(r), green: Number(g), blue: Number(b), alpha: Number(a) }
  } else if (value !== undefined) {
    isGradient = true
  }

  const [gradient, setgradient] = useState(false)

  let a = 'linear-gradient(113deg,rgba(0, 0, 0, 1) 0%,rgba(178, 249, 255, 1) 0%,rgba(234, 251, 255, 1) 49.05271530151367%,rgba(239, 255, 234, 1) 100%)'
  a = a.split(',')
  let i = 1
  while (i < a.length - 1) {
    let rgba = {}
    console.log('sssssss', a[i], a[i + 1], a[i + 2], a[i + 3])
    for (let j = i; j < i + 3; j += 1) {
      // if(j){}
      rgba.red = Number(a[j].replace(/\D/g, ''))
      // const element = a[j]
      console.log('sssss', Number(a[j].replace(/\D/g, '')))
      if (j === i + 2) {
        let t = a[j + 1].split(')')
        // console.log('ssssssooooooooo', a[j + 1], parseInt(t[0], 10), parseInt(t[1], 10))
      }
    }
    i += 4
    console.log('sssss-------------')
  }
  // console.log('ssssss', a)

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
        classNames="btc-pk"
        unmountOnExit
        onEntered={() => isGradient && setgradient(true)}
      >
        <div className="pos-rel">
          <div className="btc-pick">
            <div className="txt-center">
              <button onClick={(() => setgradient(false))} className={`btcd-btn-sm btn mr-1 ${gradient ? 'btcd-btn-o-blue' : 'blue'}`} type="button">Solid</button>
              <button onClick={(() => setgradient(true))} className={`btcd-btn-sm btn ${gradient ? 'blue' : 'btcd-btn-o-blue'}`} type="button">Gradient</button>
            </div>
            <Picker
              onChange={onChange}
              color={picrVal}
              isGradient={gradient}
            />
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}
