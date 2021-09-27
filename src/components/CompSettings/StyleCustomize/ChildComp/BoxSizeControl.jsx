import { useState } from 'react'
import { useFela } from 'react-fela'
import BoxCornersIcn from '../../../../Icons/BoxCornersIcn'
import BoxIcn from '../../../../Icons/BoxIcn'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import ChevronLeft from '../../../../Icons/ChevronLeft'
import ChevronRightIcon from '../../../../Icons/ChevronRightIcon'
import boxSizeControlStyle from '../../../../styles/boxSizeControl.style'
import SegmentControl from '../../../Utilities/SegmentControl'
import SizeControl from './SizeControl'

export default function BoxSizeControl({ title }) {
  const [controller, setController] = useState('All')
  const { css } = useFela()
  const options = [
    { label: 'All', icn: <BoxIcn size={16} />, show: ['icn'] },
    { label: 'Individual', icn: <BoxCornersIcn size={16} />, show: ['icn'] },
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
        {controller === 'All' && (
          <SizeControl label={<ChevronDownIcn size={19} />} width={100} />
        )}

        {controller === 'Individual' && (
          <>
            <SizeControl label={<ChevronDownIcn size={19} />} width={100} />
            <SizeControl label={<ChevronRightIcon size={19} />} width={100} />
            <SizeControl label={<ChevronLeft size={19} />} width={100} />
            <SizeControl label={<ChevronDownIcn size={19} />} width={100} />
          </>
        )}
      </div>
    </div>
  )
}
