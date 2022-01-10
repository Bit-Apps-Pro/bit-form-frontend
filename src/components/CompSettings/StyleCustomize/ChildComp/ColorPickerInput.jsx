import { useFela } from 'react-fela'
import CloseIcn from '../../../../Icons/CloseIcn'
import ut from '../../../../styles/2.utilities'
import colorPickerInputStyle from '../../../../styles/colorPickerInput.style'
import SimpleColorPickerMenuV2 from '../../../style-new/SimpleColorPickerMenuV2'
import Downmenu from '../../../Utilities/Downmenu'

export default function ColorPickerInput({ title }) {
  const { css } = useFela()

  return (
    <div className={css(ut.flxcb)}>
      <span className={css(colorPickerInputStyle.title)}>{title}</span>
      <div className={css(colorPickerInputStyle.inputcontainer)}>
        <Downmenu>
          <span className={css(colorPickerInputStyle.colorbox)} />
          <SimpleColorPickerMenuV2 />
        </Downmenu>
        <input aria-label="color pircker input" className={css(colorPickerInputStyle.input)} value="#FF0000" type="text" />
        <button type="button" className={css(colorPickerInputStyle.button)}>
          <CloseIcn size={10} />
        </button>
      </div>
    </div>
  )
}
