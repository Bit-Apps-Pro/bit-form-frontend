/* eslint-disable jsx-a11y/no-static-element-interactions */
import Tippy from '@tippyjs/react'
import { useEffect, useRef, useState } from 'react'
import { useFela } from 'react-fela'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import customInputControlStyle from '../../../../styles/customInputControl.style'

const SliderInput = ({ min, max, step, val, onChangeHandler }) => {
  const { css } = useFela()
  const rangeRef = useRef(null)

  useEffect(() => {
    rangeRef.current.style.backgroundSize = `${(val - min) * 100 / (max - min)}% 100%`
  }, [max, min, val])

  return (
    <div className="flx">
      <span>{min}</span>
      &nbsp;
      <input
        type="range"
        ref={rangeRef}
        className={css(customInputControlStyle.range)}
        min={min}
        max={max}
        step={step}
        onChange={onChangeHandler}
        value={val}
      />
      &nbsp;
      <span>{max}</span>
    </div>
  )
}

export default function CustomInputControl(
  { width,
    label,
    value,
    min,
    max,
    step = 1,
    onChange,
    showRangeTip = true,
    resizeValueByLabel = true,
    changeValueOnScroll = true,
    showArrow = true },
) {
  const { css } = useFela()
  const [val, setval] = useState(value)
  const [visible, setVisible] = useState(false)

  const handleValueBasedOnPointer = e => {
    const startpos = e.clientX
    let startval = parseFloat(val)
    if (isNaN(startval)) startval = min
    document.onmousemove = (ev) => {
      const moved = Math.floor(ev.clientX - startpos)
      const inc = Math.round(Math.sign(moved) * Math.pow(Math.abs(moved) / 10, 1.2))
      let newVal = startval + inc
      if (newVal < min) newVal = min
      if (newVal > max) newVal = max
      setval(newVal)
    }
    document.onmouseup = () => {
      document.onmousemove = null
    }
  }

  const onChangeHandler = e => {
    const inputVal = e.target.value
    setval(inputVal)

    if (onChange) onChange()
  }

  const stepUp = () => {
    setval(oldValue => {
      const newVal = Number(oldValue) + (step || 1)
      if (newVal < min) return min
      if (newVal > max) return max
      return newVal
    })
  }

  const stepDown = () => {
    setval(oldValue => {
      const newVal = oldValue - (step || 1)
      if (newVal < min) return min
      if (newVal > max) return max
      return newVal
    })
  }

  return (
    <div className={css(customInputControlStyle.container, visible ? customInputControlStyle.visible : '')} style={{ width: width || '100%' }}>
      <span
        className={css(customInputControlStyle.label, resizeValueByLabel ? customInputControlStyle.resizer : '')}
        onMouseDown={resizeValueByLabel ? handleValueBasedOnPointer : undefined}
      >
        {label}
      </span>
      <Tippy
        inertia
        placement="bottom"
        duration={350}
        interactiveBorder={20}
        theme="light-border"
        animation="shift-away-extreme"
        interactive
        maxWidth="auto"
        arrow
        content={<SliderInput min={min} max={max} step={step} val={val} onChangeHandler={onChangeHandler} />}
        visible={visible}
        onClickOutside={() => setVisible(false)}
      >
        <div
          className={css(customInputControlStyle.inputcontainer)}
        >
          <input
            className={`${css(customInputControlStyle.input)} ${showArrow && 'pr-4'}`}
            type="number"
            min={min}
            max={max}
            step={step}
            onChange={onChangeHandler}
            onFocusCapture={showRangeTip ? () => setVisible(true) : undefined}
            onWheelCapture={!changeValueOnScroll ? e => e.target.blur() : undefined}
            value={val}
          />
          {showArrow && (
            <>
              <button
                type="button"
                className={css(customInputControlStyle.button, customInputControlStyle.inc)}
                onClick={stepUp}
              >
                <ChevronDownIcn size={9} viewBox="6 9 12 6" />
              </button>
              <button
                type="button"
                className={css(customInputControlStyle.button, customInputControlStyle.dec)}
                onClick={stepDown}
              >
                <ChevronDownIcn size={9} viewBox="6 9 12 6" />
              </button>
            </>
          )}
        </div>
      </Tippy>
    </div>
  )
}
