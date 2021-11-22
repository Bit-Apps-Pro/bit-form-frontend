/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $tempThemeVars, $themeVars } from '../../GlobalStates'
import SpaceControl from '../CompSettings/StyleCustomize/ChildComp/SpaceControl'

export default function SpacingControlMenu() {
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const tempThemeVars = useRecoilValue($tempThemeVars)

  const { '--fld-m': fldMargin,
    '--fld-p': fldPadding } = themeVars

  const FldMarginHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--fld-m'] = `${v}`
    }))
  }

  const FldPaddingHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--fld-p'] = `${v}`
    }))
  }

  const undoHandler = (value) => {
    if (!tempThemeVars[value]) return
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle[value] = tempThemeVars[value]
    }))
  }

  return (
    <>
      <SpaceControl isValue={tempThemeVars['--fld-m']} undoHandler={() => undoHandler('--fld-m')} value={fldMargin} title="Field Margin" onChange={val => FldMarginHandler(val)} unitOption={['px', 'em', 'rem']} />
      <SpaceControl isValue={tempThemeVars['--fld-p']} undoHandler={() => undoHandler('--fld-p')} value={fldPadding} title="Field Padding" onChange={val => FldPaddingHandler(val)} unitOption={['px', 'em', 'rem']} />
    </>
  )
}
