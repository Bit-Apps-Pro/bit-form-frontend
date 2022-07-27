/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $savedStyles, $savedThemeColors, $savedThemeVars } from '../../GlobalStates/SavedStylesAndVars'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import StyleResetIcn from '../../Icons/StyleResetIcn'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import Tip from '../Utilities/Tip'
import { getValueByObjPath } from './styleHelpers'

export default function ResetStyle({ stateObjName, propertyPath, id }) {
  // const { lightThemeColors: tmpLightThemeColors,
  //   darkThemeColors: tmpDarkThemeColors } = useRecoilValue($tempStyles)
  const tmpThemeColors = useRecoilValue($savedThemeColors)
  const tmpThemeVars = useRecoilValue($savedThemeVars)
  const tmpStyles = useRecoilValue($savedStyles)
  const [themeColors, setThemeColors] = useRecoilState($themeColors)
  const [themeVar, setThemeVar] = useRecoilState($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
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
        setThemeVar(prvStyle => produce(prvStyle, drft => { drft[path] = tmpThemeVars[path] }))
        break
      case 'themeColors':
        if (!tmpThemeColors[path]) return
        setThemeColors(prvStyle => produce(prvStyle, drft => {
          drft[path] = tmpThemeColors[path]
        }))
        break
      case 'styles':
        const value = tmpStyles && Object.keys(tmpStyles).length > 0 && getValueByObjPath(tmpStyles, path)
        if (value) {
          setStyles(prvStyle => produce(prvStyle, drft => {
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

  return (
    <Tip msg="Reset style">
      <button
        onClick={reset}
        className={css(st.resetBtn)}
        type="button"
        style={{ visibility: show ? 'visible' : 'hidden' }}
        data-testid={`${id}-reset-style`}
      >
        <StyleResetIcn size="20" />
      </button>
    </Tip>
  )
}

const st = {
  resetBtn: {
    se: 20,
    flx: 'center',
    p: 3,
    brs: 20,
    b: 'none',
    bd: 'none',
    curp: 1,
    cr: 'var(--white-0-0-29)',
    mr: 3,
    ':hover': { bd: 'var(--white-0-95)', cr: 'var(--white-0-29)' },
  },
}
