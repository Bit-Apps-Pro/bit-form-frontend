import { useFela } from 'react-fela'
import CloseIcn from '../../../../Icons/CloseIcn'
import colorPickerInputStyle from '../../../../styles/colorPickerInput.style'
import Downmenu from '../../../Utilities/Downmenu'

export default function ColorPickerInput({ title }) {
  const { css } = useFela()

  return (
    <div className="flx flx-between">
      <span className={css(colorPickerInputStyle.title)}>{title}</span>
      <div className={css(colorPickerInputStyle.inputcontainer)}>
        <Downmenu>
          <span className={css(colorPickerInputStyle.colorbox)}>&nbsp;</span>
          <div>
            color picker
          </div>
        </Downmenu>
        <input className={css(colorPickerInputStyle.input)} value="#FF0000" type="text" />
        <button type="button" className={css(colorPickerInputStyle.button)}>
          <CloseIcn size={10} />
        </button>
      </div>
    </div>
  )
}
