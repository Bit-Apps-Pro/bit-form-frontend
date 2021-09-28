import { useFela } from 'react-fela'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import borderStyle from '../../../../styles/borderStyle.style'
import SimpleDropdown from '../../../Utilities/SimpleDropdown'
import BoxSizeControl from './BoxSizeControl'
import ColorPickerInput from './ColorPickerInput'

export default function BorderStyle() {
  const { css } = useFela()
  const options = [
    { icn: <ChevronDownIcn size={12} />, label: 'Solid', value: 'solid' },
    { icn: <ChevronDownIcn size={12} />, label: 'Dashed', value: 'dashed' },
    { icn: <ChevronDownIcn size={12} />, label: 'Dotted', value: 'dotted' },
  ]

  return (
    <div className="d-flx flx-col">
      <ColorPickerInput title="Color" />
      <div className="flx flx-between mt-2">
        <span className={css(borderStyle.title)}>Type</span>
        <SimpleDropdown options={options} w={120} h={30} />
      </div>
      <BoxSizeControl title="Width" />
    </div>
  )
}
