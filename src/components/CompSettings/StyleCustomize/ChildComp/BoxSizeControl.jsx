import { useState } from 'react'
import { useFela } from 'react-fela'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import boxSizeControlStyle from '../../../../styles/boxSizeControl.style'
import SegmentControl from '../../../Utilities/SegmentControl'
import CustomInputControl from './CustomInputControl'
import SizeControl from './SizeControl'

export default function BoxSizeControl({ title }) {
  const [controller, setController] = useState('All')
  const { css } = useFela()
  const options = [
    { label: 'All', icn: <ChevronDownIcn size={19} />, show: ['icn'] },
    { label: 'Individual', icn: <ChevronDownIcn size={19} />, show: ['icn'] },
  ]


  return (
    <div className="mt-2">
      <div className={css(boxSizeControlStyle.titlecontainer)}>
        <span className={css(boxSizeControlStyle.title)}>{title}</span>
        <SegmentControl
          square
          defaultActive="All"
          options={options}
          size={60}
          component="button"
          onChange={lbl => setController(lbl)}
          show={['icn']}
          variant="lightgray"
        />
      </div>
      <div className={css(boxSizeControlStyle.segmentcontainer)}>
        {/* {controller === 'All' && (
          <>
            <CustomInputControl
              label={<ChevronDownIcn size={19} />}
              value={val}
              min={1}
              max={100}
              width="100px"
              onChange={onChangeHandler}
            />
            <select name="" id="">
              <option value="px">px</option>
              <option value="percent">%</option>
              <option value="em">em</option>
              <option value="rem">rem</option>
            </select>
          </>
        )} */}

        <SizeControl />

        {/* {controller === 'Individual' && (
          <>
            <CustomInputControl
              label={<ChevronDownIcn size={19} />}
              value={val}
              min={1}
              max={100}
              width="100px"
              onChange={onChangeHandler}
            />
            <CustomInputControl
              label={<ChevronDownIcn size={19} />}
              value={val}
              min={1}
              max={100}
              width="100px"
              onChange={onChangeHandler}
            />
            <CustomInputControl
              label={<ChevronDownIcn size={19} />}
              value={val}
              min={1}
              max={100}
              width="100px"
              onChange={onChangeHandler}
            />
            <CustomInputControl
              label={<ChevronDownIcn size={19} />}
              value={val}
              min={1}
              max={100}
              width="100px"
              onChange={onChangeHandler}
            />
          </>
        )} */}
      </div>
    </div>
  )
}
