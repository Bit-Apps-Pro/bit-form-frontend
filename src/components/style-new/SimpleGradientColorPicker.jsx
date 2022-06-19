import { ColorPicker } from 'react-color-gradient-picker'
import 'react-color-gradient-picker/dist/index.css'
import { useFela } from 'react-fela'
import ut from '../../styles/2.utilities'

export default function SimpleGradientColorPicker({ isGradient = true, gradient, changeHandler }) {
  const { css } = useFela()
  return (
    <div className={css(ut.w10, style.container)}>
      <ColorPicker isGradient={isGradient} gradient={gradient} onChange={changeHandler} onEndChange={changeHandler} />
    </div>
  )
}

const style = {
  container: {
    '& > .ui-color-picker': {
      w: '100%',
      m: 0,
    },
    '& .ui-color-picker>.gradient-controls': { p: '0px 0px 0px 5px' },
    '& .ui-color-picker>.picker-area': { p: 0 },
    '& .ui-color-picker>.color-preview-area': { p: 0 },
  },
}
