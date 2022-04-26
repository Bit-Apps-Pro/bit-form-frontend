/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles, $tempStyles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import SpaceControl from '../CompSettings/StyleCustomize/ChildComp/SpaceControl'
import { getValueByObjPath } from './styleHelpers'

export default function SpaceControlMenu({ value: spacing, objectPaths, id }) {
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  const tempStyles = useRecoilValue($tempStyles)
  const tempThemeVars = tempStyles.themeVars
  const { object, paths } = objectPaths

  const spaceHandler = (val, propertyPath) => {
    if (object === 'themeVars') {
      setThemeVars(preStyle => produce(preStyle, drftStyle => {
        drftStyle[propertyPath] = `${val}`
      }))
    }
    if (object === 'styles') {
      setStyles(prvStyle => produce(prvStyle, drft => {
        console.log('paths', paths, propertyPath)

        const value = getValueByObjPath(drft, propertyPath)
        const isAlreadyImportant = value?.match(/!important/gi)?.[0]
        if (isAlreadyImportant) {
          val = `${val} !important`
        }
        assignNestedObj(drft, propertyPath, val)
      }))
    }
  }

  const undoHandler = (v) => {
    if (object === 'themeVars') {
      // if (!tempThemeVars[v]) return
      setThemeVars(preStyle => produce(preStyle, drftStyle => {
        drftStyle[v] = tempThemeVars[v] || '0px'
      }))
    }
  }

  const getVal = (propertyPath) => {
    if (object === 'themeVars') return themeVars[propertyPath]
    if (object === 'styles') {
      let value = getValueByObjPath(styles, propertyPath)
      const isCssVar = value?.match(/var/gi)?.[0]
      if (isCssVar === 'var') {
        const getVarProperty = value.replaceAll(/\(|var|,.*|\)/gi, '')
        value = themeVars[getVarProperty]
      }
      return value
    }
  }

  const checkIsResetable = (v) => (object === 'themeVars') && (tempThemeVars[v] !== themeVars[v])

  return (
    <>
      {paths?.margin && (
        <SpaceControl
          stateObjName={objectPaths.object}
          propertyPath={objectPaths.paths.margin}
          undoHandler={() => undoHandler(paths.margin)}
          value={getVal(paths.margin)}
          title="Margin"
          onChange={val => spaceHandler(val, paths.margin)}
          unitOption={['px', 'em', 'rem']}
          dataTestId={`${id}-mrgn`}
        />
      )}
      {paths?.padding && (
        <SpaceControl
          stateObjName={objectPaths.object}
          propertyPath={objectPaths.paths.padding}
          undoHandler={() => undoHandler(paths.padding)}
          value={getVal(paths.padding)}
          title="Padding"
          onChange={val => spaceHandler(val, paths.padding)}
          unitOption={['px', 'em', 'rem']}
          dataTestId={`${id}-paddng`}
        />
      )}
    </>
  )
}
