import { useState } from 'react'
import { useFela } from 'react-fela'
import sizeControlStyle from '../../../../styles/sizeControl.style'
import CustomInputControl from './CustomInputControl'

export default function SizeControl({ label, className, width }) {
  const [val, setval] = useState(10)
  const { css } = useFela()

  const onChangeHandler = value => {
    setval(value)
  }

  return (
    <div className={`${css(sizeControlStyle.container)} ${className}`} style={{ width: `${width}px` }}>
      <CustomInputControl
        className={css(sizeControlStyle.input)}
        label={label}
        value={val}
        min={1}
        max={100}
        width={`${width - 20}px`}
        onChange={onChangeHandler}
      />
      <select name="" id="" className={css(sizeControlStyle.selectt)}>
        <option value="px">px</option>
        <option value="percent">%</option>
        <option value="em">em</option>
        <option value="rem">rem</option>
      </select>
    </div>
  )
}
