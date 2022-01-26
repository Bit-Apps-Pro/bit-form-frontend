import { ColorPicker } from 'react-color-gradient-picker'
import 'react-color-gradient-picker/dist/index.css'
import { useFela } from 'react-fela'
import ut from '../../styles/2.utilities'

export default function SimpleGradientColorPicker({ isGradient = true, changeHandler }) {
  const { css } = useFela()
  return (
    <div className={css(ut.w10, style.container)}>
      <ColorPicker isGradient={isGradient} onChange={changeHandler} onEndChange={changeHandler} />
    </div>
  )
}

const style = { container: { '& > .ui-color-picker': { w: '100%' } } }
