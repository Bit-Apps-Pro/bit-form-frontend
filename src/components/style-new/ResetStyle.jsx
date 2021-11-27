import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { $tempStyles, $themeColors, $themeVars } from '../../GlobalStates'
import StyleResetIcn from '../../Icons/StyleResetIcn'
import sc from '../../styles/commonStyleEditorStyle'

export default function ResetStyle({ themeVar, stateName }) {
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

  const reset = (value) => {
    console.log('reset value', value, stateName)
    if (Array.isArray(value)) value.forEach(v => resetValue(v))
    else resetValue(value)
  }
  return (
    <button onClick={() => reset(themeVar)} className={css(sc.resetBtn)} type="button">
      <StyleResetIcn size="40" />
    </button>
  )
}
