import { useState } from 'react'
import { useFela } from 'react-fela'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import sizeControlStyle from '../../../../styles/sizeControl.style'
import SimpleDropdown from '../../../Utilities/SimpleDropdown'
import CustomInputControl from './CustomInputControl'

export default function SizeControl({ }) {
  const [val, setval] = useState(10)
  const { css } = useFela()

  const onChangeHandler = value => {
    console.log({ value })
    setval(value)
  }

  const options = [
    { label: 'px', value: 'px' },
    { label: '%', value: 'percent' },
    { label: 'em', value: 'em' },
    { label: 'rem', value: 'rem' },
  ]

  return (
    <div className={css(sizeControlStyle.container)}>
      <CustomInputControl
        className={css(sizeControlStyle.input)}
        label={<ChevronDownIcn size={19} />}
        value={val}
        min={1}
        max={100}
        width="60px"
        onChange={onChangeHandler}
      />
      {/* <SimpleDropdown options={options} h={30} w={100} value="px" /> */}
      <select name="" id="" className={css(sizeControlStyle.selectt)}>
        <option value="px">px</option>
        <option value="percent">%</option>
        <option value="em">em</option>
        <option value="rem">rem</option>
      </select>
    </div>
  )
}
