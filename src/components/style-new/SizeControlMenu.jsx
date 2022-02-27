/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useState } from 'react'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles, $tempStyles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import ut from '../../styles/2.utilities'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SingleToggle from '../Utilities/SingleToggle'
import { getNumFromStr, getStrFromStr, getValueByObjPath } from './styleHelpers'

export default function SizeControlMenu({ objectPaths }) {
  const { css } = useFela()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  const tempStyles = useRecoilValue($tempStyles)
  const [aspectRatio, setAspectRation] = useState(true)
  const tempThemeVars = tempStyles.themeVars
  const { object, paths } = objectPaths

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

  const setStateValueHandler = (value, propertyPath) => {
    if (object === 'themeVars') {
      setThemeVars(preStyle => produce(preStyle, drftStyle => {
        drftStyle[propertyPath] = `${value}`
      }))
    } else if (object === 'styles') {
      setStyles(prvStyle => produce(prvStyle, drft => {
        const prevValue = getValueByObjPath(drft, propertyPath)
        const isAlreadyImportant = prevValue?.match(/!important/gi)?.[0]
        if (isAlreadyImportant) {
          value = `${value} !important`
        }
        assignNestedObj(drft, propertyPath, `${value}`)
      }))
    }
  }

  const ratioControl = (value, unit, propName) => {
    if (aspectRatio) {
      const oldW = getNumFromStr(widthValue) || 1
      const oldWUnit = getStrFromStr(widthValue)

      const oldH = getNumFromStr(heightValue) || 1
      const oldHUnit = getStrFromStr(heightValue)
      if (propName === 'width') {
        const newH = Number((value * oldH) / oldW).toFixed(2)
        setStateValueHandler(`${value}${unit}`, paths.width)
        setStateValueHandler(`${newH}${oldHUnit}`, paths.height)
      } else if (propName === 'height') {
        const newW = Number((value * oldW) / oldH).toFixed(2)
        setStateValueHandler(`${newW}${oldWUnit}`, paths.width)
        setStateValueHandler(`${value}${unit}`, paths.height)
      }
    } else {
      setStateValueHandler(`${value}${unit}`, paths[propName])
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

  return (
    <>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fs12, ut.fw500)}>Width</span>
        <SizeControl
          stateObjName={objectPaths.object}
          propertyPath={objectPaths.paths.width}
          undoHandler={() => undoHandler(paths.width)}
          value={getNumFromStr(widthValue || 0)}
          title="width"
          width={100}
          unit={getStrFromStr(widthValue || 'px')}
          sizeHandler={val => ratioControl(val.unitValue, val.unitKey, 'width')}
          inputHandler={val => ratioControl(val.value, val.unit, 'width')}
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
          sizeHandler={val => ratioControl(val.unitValue, val.unitKey, 'height')}
          inputHandler={val => ratioControl(val.value, val.unit, 'height')}
        />
      </div>
      <SingleToggle
        title="Follow Aspect Ratio"
        action={() => setAspectRation(prevState => !prevState)}
        isChecked={aspectRatio}
        className={css({ fs: 12 })}
      />
    </>
  )
}
