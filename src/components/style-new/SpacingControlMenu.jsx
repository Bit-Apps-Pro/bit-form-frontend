/* eslint-disable no-param-reassign */
import { create } from 'mutative'
import { useParams } from 'react-router-dom'
import { useAtom, useAtomValue } from 'recoil'
import { $savedThemeVars } from '../../GlobalStates/SavedStylesAndVars'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../Utils/FormBuilderHelper'
import SpaceControl from '../CompSettings/StyleCustomize/ChildComp/SpaceControl'

export default function SpacingControlMenu() {
  const { fieldKey, element } = useParams()
  const [themeVars, setThemeVars] = useAtom($themeVars)
  const savedThemeVars = useAtomValue($savedThemeVars)

  const { '--fld-m': fldMargin,
    '--fld-p': fldPadding } = themeVars

  const FldMarginHandler = (v) => {
    setThemeVars(preStyle => create(preStyle, drftStyle => {
      drftStyle['--fld-m'] = `${v}`
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Field Margin', v, { themeVars: getLatestState('themeVars') }))
  }

  const FldPaddingHandler = (v) => {
    setThemeVars(preStyle => create(preStyle, drftStyle => {
      drftStyle['--fld-p'] = `${v}`
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Field Padding', v, { themeVars: getLatestState('themeVars') }))
  }

  const undoHandler = (value) => {
    if (!savedThemeVars[value]) return
    setThemeVars(preStyle => create(preStyle, drftStyle => {
      drftStyle[value] = savedThemeVars[value]
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Undo Field Spacing', savedThemeVars[value], { themeVars: getLatestState('themeVars') }))
  }

  return (
    <>
      <SpaceControl isResetable={savedThemeVars['--fld-m']} undoHandler={() => undoHandler('--fld-m')} value={fldMargin} title="Field Margin" onChange={val => FldMarginHandler(val)} unitOption={['px', 'em', 'rem']} />
      <SpaceControl isResetable={savedThemeVars['--fld-p']} undoHandler={() => undoHandler('--fld-p')} value={fldPadding} title="Field Padding" onChange={val => FldPaddingHandler(val)} unitOption={['px', 'em', 'rem']} />
    </>
  )
}
