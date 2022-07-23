/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $tempStyles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../Utils/FormBuilderHelper'
import SpaceControl from '../CompSettings/StyleCustomize/ChildComp/SpaceControl'

export default function SpacingControlMenu() {
  const { fieldKey, element } = useParams()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const tempStyles = useRecoilValue($tempStyles)
  const tempThemeVars = tempStyles.themeVars

  const { '--fld-m': fldMargin,
    '--fld-p': fldPadding } = themeVars

  const FldMarginHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--fld-m'] = `${v}`
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Field Margin', v, { themeVars: getLatestState('themeVars') }))
  }

  const FldPaddingHandler = (v) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle['--fld-p'] = `${v}`
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Field Padding', v, { themeVars: getLatestState('themeVars') }))
  }

  const undoHandler = (value) => {
    if (!tempThemeVars[value]) return
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle[value] = tempThemeVars[value]
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Undo Field Spacing', tempThemeVars[value], { themeVars: getLatestState('themeVars') }))
  }

  return (
    <>
      <SpaceControl isResetable={tempThemeVars['--fld-m']} undoHandler={() => undoHandler('--fld-m')} value={fldMargin} title="Field Margin" onChange={val => FldMarginHandler(val)} unitOption={['px', 'em', 'rem']} />
      <SpaceControl isResetable={tempThemeVars['--fld-p']} undoHandler={() => undoHandler('--fld-p')} value={fldPadding} title="Field Padding" onChange={val => FldPaddingHandler(val)} unitOption={['px', 'em', 'rem']} />
    </>
  )
}
