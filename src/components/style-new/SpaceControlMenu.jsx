/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $tempThemeVars, $themeVars } from '../../GlobalStates'
import SpaceControl from '../CompSettings/StyleCustomize/ChildComp/SpaceControl'

export default function SpaceControlMenu({ value: spacing, objectPaths }) {
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const tempThemeVars = useRecoilValue($tempThemeVars)
  const { object, paths } = objectPaths

  const marginHandler = (v) => {
    if (object === 'themeVars') {
      setThemeVars(preStyle => produce(preStyle, drftStyle => {
        drftStyle[paths.margin] = `${v}`
      }))
    }
  }

  const paddingHandler = (v) => {
    if (object === 'themeVars') {
      setThemeVars(preStyle => produce(preStyle, drftStyle => {
        drftStyle[paths.padding] = `${v}`
      }))
    }
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
  const getMargin = () => (object === 'themeVars') && themeVars[paths.margin]
  const getPadding = () => (object === 'themeVars') && themeVars[paths.padding]

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
