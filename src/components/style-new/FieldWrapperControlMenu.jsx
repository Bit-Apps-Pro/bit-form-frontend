/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $tempThemeVars, $themeVars } from '../../GlobalStates'
import SpaceControl from '../CompSettings/StyleCustomize/ChildComp/SpaceControl'

export default function FieldWrapperControlMenu() {
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const { '--fw-m': wrpMagin, '--fw-p': wrpPadding } = themeVars
  const tempThemeVars = useRecoilValue($tempThemeVars)

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
  const undoHandler = (value) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle[value] = tempThemeVars[value] || '0px'
    }))
  }
  return (
    <>
      <SpaceControl disabled={!tempThemeVars['--fw-m']} undoHandler={() => undoHandler('--fw-m')} value={wrpMagin} title="Field Wrapper Margin" onChange={val => marginHandler(val)} unitOption={['px', 'em', 'rem']} />
      <SpaceControl disabled={!tempThemeVars['--fw-p']} undoHandler={() => undoHandler('--fw-p')} value={wrpPadding} title="Field Wrapper Padding" onChange={val => paddingHandler(val)} unitOption={['px', 'em', 'rem']} />
    </>
  )
}
