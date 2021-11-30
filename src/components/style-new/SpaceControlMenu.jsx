/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles, $tempStyles, $themeVars } from '../../GlobalStates'
import SpaceControl from '../CompSettings/StyleCustomize/ChildComp/SpaceControl'
import { getStyleStateObj, getStyleValueFromObjectPath, setStyleStateObj } from './styleHelpers'

export default function SpaceControlMenu({ value: spacing, objectPaths }) {
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  const tempStyles = useRecoilValue($tempStyles)
  const tempThemeVars = tempStyles.themeVars
  const { object, paths } = objectPaths

  const spaceHandler = (val, property) => {
    if (object === 'themeVars') {
      setThemeVars(preStyle => produce(preStyle, drftStyle => {
        drftStyle[property] = `${val}`
      }))
    }
  }

  // const stateObj = getStyleStateObj(object, { themeVars, styles })

  const undoHandler = (v) => {
    if (object === 'themeVars') {
      // if (!tempThemeVars[v]) return
      setThemeVars(preStyle => produce(preStyle, drftStyle => {
        drftStyle[v] = tempThemeVars[v] || '0px'
      }))
    }
  }

  const getVal = (v) => (object === 'themeVars') && themeVars[v]
  const checkIsResetable = (v) => (object === 'themeVars') && (tempThemeVars[v] !== themeVars[v])

  return (
    <>
      {paths?.margin && (
        <SpaceControl
          isValue={checkIsResetable(paths.margin)}
          undoHandler={() => undoHandler(paths.margin)}
          value={getVal(paths.margin)}
          title="Margin"
          onChange={val => spaceHandler(val, paths.margin)}
          unitOption={['px', 'em', 'rem']}
        />
      )}
      {paths?.padding && (
        <SpaceControl
          isResetable={checkIsResetable(paths.padding)}
          undoHandler={() => undoHandler(paths.padding)}
          value={getVal(paths.padding)}
          title="Padding"
          onChange={val => spaceHandler(val, paths.padding)}
          unitOption={['px', 'em', 'rem']}
        />
      )}
    </>
  )
}
