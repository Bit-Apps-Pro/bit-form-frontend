/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue, } from 'recoil'
import StyleResetIcn from '../../Icons/StyleResetIcn'
import sc from '../../styles/commonStyleEditorStyle'
import { $tempStyles, $themeColors, $themeVars } from '../../GlobalStates'

export default function ResetStyle({ objectKey, stateName }) {
  const { themeColors: tmpThemeColors, themeVars: tmpThemeVars } = useRecoilValue($tempStyles)
  const [themeColor, setThemeColor] = useRecoilState($themeColors)
  const [themeVar, setThemeVar] = useRecoilState($themeVars)
  const { css } = useFela()
  let show = false
  if (stateName === 'themeVars') {
    if (themeVar?.[objectKey] !== tmpThemeVars?.[objectKey]) {
      show = true
    }
  } else if (stateName === 'themeColors') {
    if (tmpThemeColors?.[objectKey] !== themeColor?.[objectKey]) {
      show = true
    }
  }
  const resetValue = () => {
    if (stateName === 'themeVars') {
      if (!tmpThemeVars[objectKey]) return
      setThemeVar(prvStyle => produce(prvStyle, drft => { drft[objectKey] = tmpThemeVars[objectKey] }))
    }
    if (stateName === 'themeColors') {
      if (!tmpThemeColors[objectKey]) return
      setThemeColor(prvStyle => produce(prvStyle, drft => { drft[objectKey] = tmpThemeColors[objectKey] }))
    }
  }

  const reset = () => {
    if (Array.isArray(objectKey)) objectKey.forEach(v => resetValue(v))
    else resetValue()
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
