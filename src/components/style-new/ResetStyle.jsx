/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useAtom, useAtomValue } from 'recoil'
import { $savedStyles, $savedThemeColors, $savedThemeVars } from '../../GlobalStates/SavedStylesAndVars'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import StyleResetIcn from '../../Icons/StyleResetIcn'
import st from '../../styles/ResetButton.style'
import Tip from '../Utilities/Tip'
import { assignNestedObj, getValueByObjPath } from './styleHelpers'

export default function ResetStyle({ stateObjName, propertyPath, id }) {
  const tmpThemeColors = useAtomValue($savedThemeColors)
  const tmpThemeVars = useAtomValue($savedThemeVars)
  const tmpStyles = useAtomValue($savedStyles)
  const [themeColors, setThemeColors] = useAtom($themeColors)
  const [themeVar, setThemeVar] = useAtom($themeVars)
  const [styles, setStyles] = useAtom($styles)
  const { css } = useFela()
  let show = false
  switch (stateObjName) {
    case 'styles':
      if (Array.isArray(propertyPath)) {
        propertyPath.forEach(property => {
          const styleVlu = getValueByObjPath(styles, property)
          const tempStyleVlue = getValueByObjPath(tmpStyles, property)
          if (tempStyleVlue !== '' && styleVlu !== tempStyleVlue) show = true
        })
      } else {
        const styleVlu = getValueByObjPath(styles, propertyPath)
        const tempStyleVlue = getValueByObjPath(tmpStyles, propertyPath)
        if (tempStyleVlue !== '' && styleVlu !== tempStyleVlue) show = true
      }
      break

    case 'themeVars':
      if (Array.isArray(propertyPath)) {
        propertyPath.forEach(property => {
          if (tmpThemeVars?.[property] && themeVar?.[property] !== tmpThemeVars?.[property]) {
            show = true
          }
        })
      } else if (tmpThemeVars?.[propertyPath] && themeVar?.[propertyPath] !== tmpThemeVars?.[propertyPath]) {
        show = true
      }
      break

    case 'themeColors':
      if (Array.isArray(propertyPath)) {
        propertyPath.forEach(property => {
          if (tmpThemeColors?.[property] && tmpThemeColors?.[property] !== themeColors?.[property]) {
            show = true
          }
        })
      } else if (tmpThemeColors?.[propertyPath] && tmpThemeColors?.[propertyPath] !== themeColors?.[propertyPath]) {
        show = true
      }
      break

    default:
      break
  }

  const resetValue = (path) => {
    switch (stateObjName) {
      case 'themeVars':
        if (!tmpThemeVars[path]) return
        setThemeVar(prvStyle => create(prvStyle, drft => { drft[path] = tmpThemeVars[path] }))
        break
      case 'themeColors':
        if (!tmpThemeColors[path]) return
        setThemeColors(prvStyle => create(prvStyle, drft => {
          drft[path] = tmpThemeColors[path]
        }))
        break
      case 'styles':
        const value = tmpStyles && Object.keys(tmpStyles).length > 0 && getValueByObjPath(tmpStyles, path)
        if (value) {
          setStyles(prvStyle => create(prvStyle, drft => {
            assignNestedObj(drft, path, value)
          }))
        }
        break

      default:
        break
    }
  }

  const reset = () => {
    if (Array.isArray(propertyPath)) propertyPath.forEach(path => resetValue(path))
    else resetValue(propertyPath)
  }

  if (!show) return ''

  return (
    <Tip msg="Reset style">
      <button
        onClick={reset}
        className={css(st.resetBtn)}
        type="button"
        data-testid={`${id}-reset-style`}
      >
        <StyleResetIcn size="20" />
      </button>
    </Tip>
  )
}
