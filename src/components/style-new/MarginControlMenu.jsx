import produce from 'immer'
import { useRecoilState } from 'recoil'
import { $themeVars } from '../../GlobalStates'
import SpaceControl from '../CompSettings/StyleCustomize/ChildComp/SpaceControl'

export default function MarginControlMenu() {
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const { '--fld-m': fidMargin } = themeVars

  const fieldMarginHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--fld-m'] = `${v}`
    }))
  }
  return (
    <>
      <SpaceControl value={fidMargin} title="Field Margin" onChange={val => fieldMarginHandler(val)} unitOption={['px', 'em', 'rem']} />
    </>
  )
}
