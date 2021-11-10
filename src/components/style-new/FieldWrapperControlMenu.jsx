import produce from 'immer'
import { useRecoilState } from 'recoil'
import { $themeVars } from '../../GlobalStates'
import SpaceControl from '../CompSettings/StyleCustomize/ChildComp/SpaceControl'

export default function FieldWrapperControlMenu() {
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const { '--fw-m': wrpMagin, '--fw-p': wrpPadding } = themeVars

  const marginHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--fw-m'] = `${v}`
    }))
  }
  const paddingHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--fw-p'] = `${v}`
    }))
  }
  return (
    <>
      <SpaceControl value={wrpMagin} title="Field Wrapper Margin" onChange={val => marginHandler(val)} unitOption={['px', 'em', 'rem']} />
      <SpaceControl value={wrpPadding} title="Field Wrapper Padding" onChange={val => paddingHandler(val)} unitOption={['px', 'em', 'rem']} />
    </>
  )
}
