/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $colorScheme, $darkThemeColors, $lightThemeColors, $styles, $tempStyles, $themeVars } from '../../GlobalStates'
import StyleResetIcn from '../../Icons/StyleResetIcn'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import Tip from '../Utilities/Tip'
import { getValueByObjPath } from './styleHelpers'

export default function ResetStyle({ stateObjName, propertyPath }) {
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

  // console.log({ stateObjName, lightThemeColors, propertyPath },
  //   'lightThemeColors', lightThemeColors[propertyPath],
  //   'temlighThemeColors', tmpLightThemeColors,
  //   darkThemeColors[propertyPath] === tmpDarkThemeColors[propertyPath],
  // )
  let show = false
  switch (stateObjName) {
    case 'styles':
      if (Array.isArray(propertyPath)) {
        propertyPath.forEach(property => {
          const styleVlu = getValueByObjPath(styles, property)
          const tempStyleVlue = getValueByObjPath(tmpStyles, property)
          if (styleVlu !== tempStyleVlue) show = true
        })
      } else {
        const styleVlu = getValueByObjPath(styles, propertyPath)
        const tempStyleVlue = getValueByObjPath(tmpStyles, propertyPath)
        console.log({ styleVlu, tempStyleVlue, styles })
        if (styleVlu !== tempStyleVlue) show = true
      }
      break

    case 'themeVars':
      if (Array.isArray(propertyPath)) {
        propertyPath.forEach(property => {
          if (tmpThemeVars?.[property] && themeVar?.[property] !== tmpThemeVars?.[property]) {
            // console.log('reset ', tmpThemeVars?.[property], themeVar?.[property])
            show = true
          }
        })
      } else if (tmpThemeVars?.[propertyPath] && themeVar?.[propertyPath] !== tmpThemeVars?.[propertyPath]) {
        show = true
      }
      break

    case 'themeColors':
      if (colorScheme === 'light') {
        if (Array.isArray(propertyPath)) {
          propertyPath.forEach(property => {
            if (tmpLightThemeColors?.[property] && tmpLightThemeColors?.[property] !== lightThemeColors?.[property]) {
              show = true
            }
          })
        } else if (tmpLightThemeColors?.[propertyPath] && tmpLightThemeColors?.[propertyPath] !== lightThemeColors?.[propertyPath]) {
          show = true
        }
      } else if (colorScheme === 'dark') {
        if (Array.isArray(propertyPath)) {
          propertyPath.forEach(property => {
            if (tmpDarkThemeColors?.[property] && tmpDarkThemeColors?.[property] !== darkThemeColors?.[property]) {
              show = true
            }
          })
        } else if (tmpDarkThemeColors?.[propertyPath] && tmpDarkThemeColors?.[propertyPath] !== darkThemeColors?.[propertyPath]) {
          show = true
        }
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
        if (colorScheme === 'light') {
          if (!tmpLightThemeColors[path]) return
          setLightThemeColors(prvStyle => produce(prvStyle, drft => {
            drft[path] = tmpLightThemeColors[path]
          }))
        } else {
          if (!tmpDarkThemeColors[path]) return
          setDarkThemeColors(prvStyle => produce(prvStyle, drft => {
            drft[path] = tmpDarkThemeColors[path]
          }))
        }
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
