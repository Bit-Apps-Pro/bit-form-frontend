import { useState } from 'react'
import { useFela } from 'react-fela'
import BorderBottomLeftRadiusIcn from '../../../../Icons/BorderBottomLeftRadiusIcn'
import BorderBottomRightRadiusIcn from '../../../../Icons/BorderBottomRightRadiusIcn'
import BorderRadiusCornersIcn from '../../../../Icons/BorderRadiusCornersIcn'
import BorderRadiusIcn from '../../../../Icons/BorderRadiusIcn'
import BorderTopLeftRadiusIcn from '../../../../Icons/BorderTopLeftRadiusIcn'
import BorderTopRightRadiusIcn from '../../../../Icons/BorderTopRightRadiusIcn'
import boxSizeControlStyle from '../../../../styles/boxSizeControl.style'
import StyleSegmentControl from '../../../Utilities/StyleSegmentControl'
import SizeControl from './SizeControl'

export default function BoxSizeControl({ title }) {
  const [controller, setController] = useState('All')
  const { css } = useFela()
  const options = [
    { label: 'All', icn: <BorderRadiusIcn size={16} />, show: ['icn'], tip: 'Radius allside' },
    { label: 'Individual', icn: <BorderRadiusCornersIcn size={16} />, show: ['icn'], tip: 'Radius per corner' },
  ]

  return (
    <div className="mt-2">
      <div className={css(boxSizeControlStyle.titlecontainer)}>
        <span className={css(boxSizeControlStyle.title)}>{title}</span>
        <StyleSegmentControl
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
          <SizeControl label={<BorderRadiusIcn size={19} />} width={100} />
        )}

        {controller === 'Individual' && (
          <>
            <SizeControl label={<BorderTopLeftRadiusIcn size={12} />} width={100} />
            <SizeControl label={<BorderTopRightRadiusIcn size={12} />} width={100} />
            <SizeControl label={<BorderBottomLeftRadiusIcn size={12} />} width={100} />
            <SizeControl label={<BorderBottomRightRadiusIcn size={12} />} width={100} />
          </>
        )}
      </div>
    </div>
  )
}
