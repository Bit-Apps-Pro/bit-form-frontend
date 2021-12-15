/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $colorScheme, $darkThemeColors, $lightThemeColors, $styles, $tempStyles, $themeVars } from '../../GlobalStates'
import StyleResetIcn from '../../Icons/StyleResetIcn'
import sc from '../../styles/commonStyleEditorStyle'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import { getStyleValueFromObjectPath } from './styleHelpers'

export default function ResetStyle({ objectKey, stateName, objectPaths, stateObjName, propertyPath }) {
  const { lightThemeColors: tmpLightThemeColors,
    darkThemeColors: tmpDarkThemeColors,
    themeVars: tmpThemeVars,
    styles: tmpStyles } = useRecoilValue($tempStyles)
  const [themeVar, setThemeVar] = useRecoilState($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  const { css } = useFela()
  const colorScheme = useRecoilValue($colorScheme)
  const [darkThemeColors, setDarkThemeColors] = useRecoilState($darkThemeColors)
  const [lightThemeColors, setLightThemeColors] = useRecoilState($lightThemeColors)

  let show = false
  switch (stateObjName) {
    case 'styles':
      const styleVlu = getStyleValueFromObjectPath(styles, propertyPath)
      const tempStyleVlue = tmpStyles && Object.keys(tmpStyles).length > 0 && getStyleValueFromObjectPath(tmpStyles, propertyPath)
      if (styleVlu !== tempStyleVlue) show = true
      break

    case 'themeVars':
      if (tmpThemeVars?.[propertyPath] && themeVar?.[propertyPath] !== tmpThemeVars?.[propertyPath]) {
        console.log('reset ', tmpThemeVars?.[propertyPath], themeVar?.[propertyPath])
        show = true
      }
      break

    case 'themeColors':
      if (colorScheme === 'light') {
        if (tmpLightThemeColors?.[propertyPath] && tmpLightThemeColors?.[propertyPath] !== lightThemeColors?.[propertyPath]) {
          show = true
        }
      } else if (colorScheme === 'dark') {
        if (tmpDarkThemeColors?.[propertyPath] && tmpDarkThemeColors?.[propertyPath] !== darkThemeColors?.[propertyPath]) {
          show = true
        }
      }
      break

    default:
      break
  }

  const resetValue = () => {
    switch (stateObjName) {
      case 'themeVars':
        if (!tmpThemeVars[propertyPath]) return
        setThemeVar(prvStyle => produce(prvStyle, drft => { drft[propertyPath] = tmpThemeVars[propertyPath] }))
        break
      case 'themeColors':
        if (colorScheme === 'light') {
          if (!tmpLightThemeColors[propertyPath]) return
          setLightThemeColors(prvStyle => produce(prvStyle, drft => {
            drft[propertyPath] = tmpLightThemeColors[propertyPath]
          }))
        } else {
          if (!tmpDarkThemeColors[propertyPath]) return
          setDarkThemeColors(prvStyle => produce(prvStyle, drft => {
            drft[propertyPath] = tmpDarkThemeColors[propertyPath]
          }))
        }
        break
      case 'styles':
        const value = tmpStyles && Object.keys(tmpStyles).length > 0 && getStyleValueFromObjectPath(tmpStyles, propertyPath)
        if (value) {
          setStyles(prvStyle => produce(prvStyle, drft => {
            assignNestedObj(drft, propertyPath, value)
          }))
        }
        break

      default:
        break
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
