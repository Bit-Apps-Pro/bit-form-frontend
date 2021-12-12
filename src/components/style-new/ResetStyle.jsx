/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles, $tempStyles, $themeColors, $themeVars } from '../../GlobalStates'
import StyleResetIcn from '../../Icons/StyleResetIcn'
import sc from '../../styles/commonStyleEditorStyle'

export default function ResetStyle({ objectKey, stateName, objectPaths }) {
  const { themeColors: tmpThemeColors, themeVars: tmpThemeVars, tempStyles } = useRecoilValue($tempStyles)
  const [themeColor, setThemeColor] = useRecoilState($themeColors)
  const [themeVar, setThemeVar] = useRecoilState($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  const { css } = useFela()

  let show = false
  if (objectPaths?.object === 'fieldStyle') {
    console.log(objectPaths, tempStyles)
    const styleValue = styles.fields[objectPaths.fk].classes[objectPaths.selector][objectPaths.property]
    const tempStyleValue = tempStyles.fields && tempStyles?.fields[objectPaths.fk]?.classes[objectPaths.selector][objectPaths.property]
    if (styleValue !== tempStyleValue) {
      show = true
    }
  } else if (stateName === 'themeVars') {
    if (tmpThemeVars?.[objectKey] && themeVar?.[objectKey] !== tmpThemeVars?.[objectKey]) {
      console.log('reset ', tmpThemeVars?.[objectKey], themeVar?.[objectKey])
      show = true
    }
  } else if (stateName === 'themeColors') {
    if (tmpThemeColors?.[objectKey] && tmpThemeColors?.[objectKey] !== themeColor?.[objectKey]) {
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
    if (objectPaths.object === 'fieldStyle') {
      const value = tempStyles.fields[objectPaths.fk].classes[objectPaths.selector][objectPaths.property]
      setStyles(prvStyle => produce(prvStyle, drft => {
        drft.fields[objectPaths.fk].classes[objectPaths.selector][objectPaths.property] = value
      }))
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
