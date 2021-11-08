import { useState } from 'react'
import { useFela } from 'react-fela'
import ut from '../../../../styles/2.utilities'
import sizeControlStyle from '../../../../styles/sizeControl.style'
import CustomInputControl from './CustomInputControl'

export default function SizeControl({ label, className, width, options = [], sizeHandler, unit, inputHandler, value, name, min = 1, max = 100, id }) {
  const [val, setval] = useState(10)
  const { css } = useFela()
  const onChangeHandler = value => {
    setval(value)
  }
  console.log(unit)
  console.log(unit?.match(/rem|em\w+/gi))
  // const step = (unit && unit?.match(/em|rem/gi)) ? 0.001 : 1
  const step = 1

  return (
    <div className={`${css(sizeControlStyle.container)} ${className}`} style={{ width }}>
      <CustomInputControl
        className={css(sizeControlStyle.input)}
        label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        width={`${width - 20}px`}
        onChange={v => inputHandler({ value: v, unit, id })}
      />
      <select
        value={unit}
        className={css(sizeControlStyle.selectt, ut.fontBody)}
        name={name}
        onChange={({ target: { value: valu } }) => sizeHandler({ unitKey: valu, unitValue: value, id })}
      >
        {options.length === 0 && (
          <>
            <option value="px">px</option>
            <option value="%">%</option>
            <option value="em">em</option>
            <option value="rem">rem</option>
          </>
        )}

        {options && options?.map((item, i) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}
