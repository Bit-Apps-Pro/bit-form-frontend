/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles, $tempStyles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import ut from '../../styles/2.utilities'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import { getNumFromStr, getStrFromStr, getValueByObjPath } from './styleHelpers'

export default function SizeControlMenu({ objectPaths }) {
  const { css } = useFela()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  const tempStyles = useRecoilValue($tempStyles)
  const tempThemeVars = tempStyles.themeVars
  const { object, paths } = objectPaths

  const sizeHandler = (val, propertyPath) => {
    const tempValue = getNumFromStr(val.unitValue)
    if (object === 'themeVars') {
      setThemeVars(preStyle => produce(preStyle, drftStyle => {
        drftStyle[propertyPath] = `${tempValue}${val.unitKey}`
      }))
    }
    if (object === 'styles') {
      setStyles(prvStyle => produce(prvStyle, drft => {
        const value = getValueByObjPath(drft, propertyPath)
        const isAlreadyImportant = value?.match(/!important/gi)?.[0]
        if (isAlreadyImportant) {
          val = `${tempValue}${val.unitKey} !important`
        }
        assignNestedObj(drft, propertyPath, `${tempValue}${val.unitKey}`)
      }))
    }
  }

  const inputHandler = (val, propertyPath) => {
    if (object === 'themeVars') {
      setThemeVars(preStyle => produce(preStyle, drftStyle => {
        drftStyle[propertyPath] = `${val.value}${val.unit}`
      }))
    }
    if (object === 'styles') {
      setStyles(prvStyle => produce(prvStyle, drft => {
        const value = getValueByObjPath(drft, propertyPath)
        const isAlreadyImportant = value?.match(/!important/gi)?.[0]
        if (isAlreadyImportant) {
          val = `${val.value}${val.unit} !important`
        }
        assignNestedObj(drft, propertyPath, `${val.value}${val.unit}`)
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

  const widthValue = getVal(paths?.width)
  const heightValue = getVal(paths?.height)
  // const checkIsResetable = (v) => (object === 'themeVars') && (tempThemeVars[v] !== themeVars[v])

  return (
    <>
      <div className={css(ut.flxcb, ut.mb2, { pt: 2 })}>
        <span className={css(ut.fs12, ut.fs12, ut.fw500)}>Width</span>
        <SizeControl
          stateObjName={objectPaths.object}
          propertyPath={objectPaths.paths.width}
          undoHandler={() => undoHandler(paths.width)}
          value={getNumFromStr(widthValue || 0)}
          title="width"
          width={100}
          unit={getStrFromStr(widthValue || 'px')}
          sizeHandler={val => sizeHandler(val, paths?.width)}
          inputHandler={val => inputHandler(val, paths?.width)}
        />
      </div>

      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fs12, ut.fw500)}>Height</span>
        <SizeControl
          stateObjName={objectPaths.object}
          propertyPath={objectPaths.paths.height}
          undoHandler={() => undoHandler(paths.height)}
          value={getNumFromStr(heightValue || 0)}
          title="height"
          width={100}
          unit={getStrFromStr(heightValue || 'px')}
          sizeHandler={val => sizeHandler(val, paths?.height)}
          inputHandler={val => inputHandler(val, paths?.height)}
        />
      </div>
    </>
  )
}
