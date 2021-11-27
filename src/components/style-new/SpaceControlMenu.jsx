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

  const stateObj = getStyleStateObj(object, { themeVars, styles })

  const marginHandler = (v) => {
    setStyleStateObj(object, paths.margin, v, { setThemeVars, setStyles })

    // if (object === 'themeVars') {
    //   setThemeVars(preStyle => produce(preStyle, drftStyle => {
    //     drftStyle[paths.margin] = `${v}`
    //   }))
    // }
  }

  const paddingHandler = (v) => {
    setStyleStateObj(object, paths.padding, v, { setThemeVars, setStyles })

    // if (object === 'themeVars') {
    //   setThemeVars(preStyle => produce(preStyle, drftStyle => {
    //     drftStyle[paths.padding] = `${v}`
    //   }))
    // }
  }

  const undoHandler = (v) => {
    if (object === 'themeVars') {
      if (!tempThemeVars[v]) return
      setThemeVars(preStyle => produce(preStyle, drftStyle => {
        drftStyle[v] = tempThemeVars[v] || '0px'
      }))
    }
  }

  const isValue = (v) => (object === 'themeVars') && tempThemeVars[v]
  const getMargin = () => getStyleValueFromObjectPath(stateObj, paths.margin)
  const getPadding = () => getStyleValueFromObjectPath(stateObj, paths.padding)

  return (
    <>
      {paths?.margin && (
        <SpaceControl isValue={isValue(paths.margin)} undoHandler={() => undoHandler(paths.margin)} value={getMargin()} title="Margin" onChange={val => marginHandler(val)} unitOption={['px', 'em', 'rem']} />
      )}
      {paths?.padding && (
        <SpaceControl isValue={isValue(paths.padding)} undoHandler={() => undoHandler(paths.padding)} value={getPadding()} title="Padding" onChange={val => paddingHandler(val)} unitOption={['px', 'em', 'rem']} />
      )}
    </>
  )
}
