/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef } from 'react'
import { ColorPicker as Picker } from 'react-color-gradient-picker'
import 'react-color-gradient-picker/dist/index.css'
import { useFela } from 'react-fela'
import { CSSTransition } from 'react-transition-group'
import app from '../../../../styles/app.style'
import hexToRGBA from '../../../../Utils/hex2RGBA'
import { __ } from '../../../../Utils/i18nwrap'
import useComponentVisible from './useComponentVisible'


export default function ColorPicker({ value, onChange, alwGradient = true }) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  const [gradient, setgradient] = useState(false)
  const { css } = useFela()
  const nodeRef = useRef(null)
  let isGradient = false

  let picrVal = { red: 0, green: 0, blue: 0, alpha: 0 }

  if (value !== undefined && !value.match(/gradient/g) && value?.[0] !== '#') {
    const [r, g, b, a] = value.replace(/!important|rgba?|\(|\)/g, '').split(',')
    picrVal = { red: Number(r), green: Number(g), blue: Number(b), alpha: Number(a) }
  } else if (value?.[0] === '#') {
    picrVal = hexToRGBA(value)
  } else if (value !== undefined) {
    isGradient = true
    let i = 1
    const str = value.split(',')
    const color = {
      degree: 0,
      type: 'linear',
      points: [],
    }
    if (str[0].match(/radial/g)) {
      color.type = 'radial'
      i = 0
    }
    for (; i < str.length - 1; i += 4) {
      const rgba = {}
      rgba.red = parseInt(str[i].replace(/\D/g, ''), 10)
      rgba.green = parseInt(str[i + 1], 10)
      rgba.blue = parseInt(str[i + 2], 10)
      const [a, l] = str[i + 3].split(')')
      rgba.alpha = parseInt(a, 10)
      rgba.left = parseInt(l, 10)
      color.points.push({ ...rgba })
    }
    color.degree = Number(str[0].replace(/\D/g, ''))
    picrVal = color
  }

  return (
    <div ref={ref} className="pos-rel">
      <div
        aria-label="color picker"
        title={__('Color Picker')}
        onClick={() => setIsComponentVisible(!isComponentVisible)}
        onKeyPress={() => setIsComponentVisible(!isComponentVisible)}
        tabIndex="0"
        role="button"
        className="br-50 clr-pick"
        style={{ background: value.replace('!important', '') }}
      />
      <CSSTransition
        nodeRef={nodeRef}
        in={isComponentVisible}
        timeout={150}
        classNames="btc-pk"
        unmountOnExit
        onEntered={() => isGradient && setgradient(true)}
        onExit={() => setgradient(false)}
      >
        <div ref={nodeRef} className="pos-rel">
          <div className="btc-pick">
            <div className="txt-center">
              <button onClick={(() => setgradient(false))} className={`btcd-btn-sm ${css(app.btn)} mr-1 ${gradient ? 'btcd-btn-o-blue' : 'blue'}`} type="button">{__('Solid')}</button>
              {alwGradient && <button onClick={(() => setgradient(true))} className={`btcd-btn-sm ${css(app.btn)} ${gradient ? 'blue' : 'btcd-btn-o-blue'}`} type="button">{__('Gradient')}</button>}
            </div>
            <Picker
              onChange={onChange}
              onEndChange={onChange}
              {...isGradient && { gradient: picrVal }}
              {...!isGradient && { color: picrVal }}
              isGradient={gradient}
            />
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}
