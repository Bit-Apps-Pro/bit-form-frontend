/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import StyleResetIcn from '../../Icons/StyleResetIcn'
import sc from '../../styles/commonStyleEditorStyle'
import { $tempStyles, $themeColors, $themeVars } from '../../GlobalStates'

export default function ResetStyle({ themeVar, stateName, show }) {
  const { themeColors, themeVars } = useRecoilValue($tempStyles)
  const setThemeColor = useSetRecoilState($themeColors)
  const setThemeVar = useSetRecoilState($themeVars)
  const { css } = useFela()

  const resetValue = val => {
    if (stateName === 'themeVars') {
      if (!themeVars[val]) return
      setThemeVar(prvStyle => produce(prvStyle, drft => { drft[val] = themeVars[val] }))
    }
    if (stateName === 'themeColors') {
      if (!themeColors[val]) return
      setThemeColor(prvStyle => produce(prvStyle, drft => { drft[val] = themeColors[val] }))
    }
  }

  const reset = () => {
    if (Array.isArray(themeVar)) themeVar.forEach(v => resetValue(v))
    else resetValue(themeVar)
  }

  return (
    <button
      title="Reset Style"
      onClick={reset}
      className={css(sc.resetBtn)}
      type="button"
      style={{ visibility: show ? 'visible' : 'hidden' }}
    >
      <StyleResetIcn size="80" />
    </button>
  )
}
