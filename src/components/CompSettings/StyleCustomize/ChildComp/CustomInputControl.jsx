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
    rangeRef.current.style.backgroundSize = `${((val - min) * 100) / (max - min)}% 100%`
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
        onInput={onChangeHandler}
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
    className,
    value,
    min,
    max,
    step = 1,
    onChange,
    showRangeTip = false,
    resizeValueByLabel = true,
    changeValueOnScroll = true,
    showArrow = true },
) {
  const { css } = useFela()
  const [visible, setVisible] = useState(false)

  const handleValueBasedOnPointer = e => {
    const startpos = e.clientX
    let startval = parseFloat(value)
    if (Number.isNaN(startval)) startval = min
    document.onmousemove = (ev) => {
      const moved = Math.floor(ev.clientX - startpos)
      const inc = Math.round(Math.sign(moved) * (Math.abs(moved) / 10) ** 1.2)
      let newVal = startval + inc
      if (newVal < min) newVal = min
      if (newVal > max) newVal = max
      if (onChange) onChange(newVal)
    }
    document.onmouseup = () => {
      document.onmousemove = null
    }
  }

  const getStepByEvent = (e) => {
    let stp = 0
    if (e.altKey && !e.shiftKey && !e.ctrlKey) stp = 0.1
    if (!e.altKey && e.shiftKey && !e.ctrlKey) stp = 10
    if (!e.altKey && !e.shiftKey && e.ctrlKey) stp = 100
    return stp
  }

  const onChangeHandler = ({ target: { valueAsNumber } }) => {
    if (onChange) onChange(valueAsNumber)
  }

  const handleArrowKey = e => {
    if (e.code === 'ArrowDown' || e.code === 'ArrowUp') {
      e.preventDefault()
      if (e.code === 'ArrowDown') {
        onChange((e.target.valueAsNumber + (getStepByEvent(e) || step)) * -1)
        return
      }
      onChange(e.target.valueAsNumber + (getStepByEvent(e) || step))
    }
  }

  const stepUp = (e) => {
    let newVal = Number(value) + (getStepByEvent(e) || step)
    if (!Number.isInteger(newVal)) {
      newVal = parseFloat(newVal.toFixed(3))
    }
    if (newVal < min) newVal = min
    if (newVal > max) newVal = max
    if (onChange) onChange(newVal)
  }

  const stepDown = (e) => {
    let newVal = Number(value) - (getStepByEvent(e) || step)
    if (!Number.isInteger(newVal)) {
      newVal = parseFloat(newVal.toFixed(3))
    }
    if (newVal < min) newVal = min
    if (newVal > max) newVal = max
    if (onChange) onChange(newVal)
  }

  return (
    <div className={`${css(customInputControlStyle.container, visible ? customInputControlStyle.visible : '')} ${className}`} style={{ width: width || '100%' }}>
      {label && (
        <span
          className={css(customInputControlStyle.label, resizeValueByLabel ? customInputControlStyle.resizer : '')}
          onMouseDown={resizeValueByLabel ? handleValueBasedOnPointer : undefined}
        >
          {label}
        </span>
      )}
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
        content={<SliderInput min={min} max={max} step={step} val={value} onChangeHandler={onChangeHandler} />}
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
            onKeyDown={handleArrowKey}
            onFocusCapture={showRangeTip ? () => setVisible(true) : undefined}
            onWheelCapture={!changeValueOnScroll ? e => e.target.blur() : undefined}
            value={value}
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
