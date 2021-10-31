import { useState } from 'react'
import { useFela } from 'react-fela'
import ut from '../../../../styles/2.utilities'
import sizeControlStyle from '../../../../styles/sizeControl.style'
import CustomInputControl from './CustomInputControl'

export default function SizeControl({ label, className, width, options = [], sizeHandler, byteType, inputHandler, value }) {
  const [val, setval] = useState(10)
  const { css } = useFela()
  console.log('ssssssssss', sizeVal)
  const onChangeHandler = value => {
    setval(value)
  }

  return (
    <div className={`${css(sizeControlStyle.container)} ${className}`} style={{ width }}>
      <CustomInputControl
        className={css(sizeControlStyle.input)}
        label={label}
        value={value}
        min={1}
        max={100}
        width={`${width - 20}px`}
        onChange={inputHandler}
      />
      <select name="" value={byteType} className={css(sizeControlStyle.selectt, ut.fontBody)} onChange={sizeHandler}>
        {!options && (
          <>
            <option value="px">px</option>
            <option value="percent">%</option>
            <option value="em">em</option>
            <option value="rem">rem</option>
          </>
        )}

        {options?.map((item, i) => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}
