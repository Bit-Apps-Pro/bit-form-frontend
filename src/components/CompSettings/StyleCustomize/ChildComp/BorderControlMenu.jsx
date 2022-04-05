/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $styles } from '../../../../GlobalStates/StylesState'
import { $themeColors } from '../../../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../../../GlobalStates/ThemeVarsState'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import ut from '../../../../styles/2.utilities'
import { getElmDataBasedOnElement } from '../../../../Utils/Helpers'
import editorConfig from '../../../style-new/NewStyleEditorConfig'
import SimpleColorPickerTooltip from '../../../style-new/SimpleColorPickerTooltip'
import { getObjByKey, getValueByObjPath, getValueFromStateVar, setStyleStateObj, splitValueBySpaces } from '../../../style-new/styleHelpers'
import SimpleDropdown from '../../../Utilities/SimpleDropdown'
import SpaceControl from './SpaceControl'

/**
 * @Function BorderControlMenu
 * @param {objectPaths}  Array|Object
 * @When BorderControlMenu are Array
 * {
 *    @index 0=> ThemVars
 *    @index 1 => ThemeColors
 *    @ThemeVars|@ThemeColors Object.paths 1st property is border
 * }
 * @When BorderControlMenu is object
 * {
 *   @Object.paths 1st property is border
 * }
 * @returns
 */
export default function BorderControlMenu({ objectPaths }) {
  const { css } = useFela()
  const { fieldKey, element, rightBar } = useParams()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  const [themeColors, setThemeColors] = useRecoilState($themeColors)

  const fldStyleObj = styles?.fields?.[fieldKey]
  let borderPropObj
  try {
    if (!fldStyleObj && rightBar === 'theme-customize') {
      borderPropObj = editorConfig[element].properties.border
    } else {
      const { fieldType } = fldStyleObj
      const { elementKey } = getElmDataBasedOnElement(element)
      borderPropObj = editorConfig[fieldType][elementKey].properties.border
    }
  } catch (error) {
    console.log(error.message)
    console.error('😅 no style object found according to this field')
    return <></>
  }

  const borderPropKeys = Object.keys(borderPropObj)
  const stateObj = (objName) => getObjByKey(objName, { themeVars, styles, themeColors })

  let borderPath
  let borderWidthPath
  let borderRadiusPath
  const obj = { border: '', borderWidth: '', borderRadius: '' }

  /**
   * When objectPaths is Array
   * 0 => ThemeVars {borderWidth, borderRadius}
   * 1 => ThemeColors {border}
   */
  if (Array.isArray(objectPaths)) {
    const [themeVarsObj, themeColorsObj] = objectPaths
    // set state
    obj.borderWidth = themeVarsObj.object
    obj.borderRadius = themeVarsObj.object
    obj.border = themeColorsObj.object

    borderWidthPath = themeVarsObj.paths['border-width']
    borderRadiusPath = themeVarsObj.paths['border-radius']
    borderPath = themeColorsObj.paths[borderPropKeys[0]]
  } else {
    const { paths } = objectPaths
    borderWidthPath = paths['border-width']
    borderRadiusPath = paths['border-radius']
    borderPath = paths[borderPropKeys[0]]

    // set state
    obj.borderWidth = objectPaths.object
    obj.borderRadius = objectPaths.object
    obj.border = objectPaths.object
  }

  const border = getValueFromStateVar(themeColors, getValueByObjPath(stateObj(obj.border), borderPath))
  const borderWidth = getValueFromStateVar(themeVars, getValueByObjPath(stateObj(obj.borderWidth), borderWidthPath))
  const borderRadius = getValueFromStateVar(themeVars, getValueByObjPath(stateObj(obj.borderRadius), borderRadiusPath))
  const borderValue = extractBorderValue(border)

  const onSizeChange = (pathName, val) => {
    const stateObjName = obj.borderWidth || obj.borderRadius
    const index = getValueByObjPath(stateObj(stateObjName), pathName).indexOf('!important')
    const newVal = index >= 0 ? `${val} !important` : val
    setStyleStateObj(stateObjName, pathName, newVal, { setThemeVars, setStyles })
  }

  const borderHandler = (prop, val) => {
    const stateObjName = obj.border
    const newBorderStyleStr = Object.entries(borderValue).map(([shName, shVal]) => {
      if (shName === prop) {
        return val
      }
      return shVal
    }).join(' ')
    setStyleStateObj(stateObjName, borderPath, newBorderStyleStr, { setThemeColors, setStyles })
  }

  const options = [
    { icn: <ChevronDownIcn size={12} />, label: 'Solid', value: 'solid' },
    { icn: <ChevronDownIcn size={12} />, label: 'Dashed', value: 'dashed' },
    { icn: <ChevronDownIcn size={12} />, label: 'Dotted', value: 'dotted' },
    { icn: <ChevronDownIcn size={12} />, label: 'Double', value: 'double' },
    { icn: <ChevronDownIcn size={12} />, label: 'Groove', value: 'groove' },
    { icn: <ChevronDownIcn size={12} />, label: 'Ridge', value: 'ridge' },
    { icn: <ChevronDownIcn size={12} />, label: 'Inset', value: 'inset' },
    { icn: <ChevronDownIcn size={12} />, label: 'Outset', value: 'outset' },
    { icn: <ChevronDownIcn size={12} />, label: 'None', value: 'none' },
  ]

  return (
    <>
      {borderPropObj[borderPropKeys[0]] && (
        <>
          <div className={css(ut.flxcb, ut.mb2)}>
            <span className={css(ut.fs12, ut.fw500)}>Type</span>
            <SimpleDropdown
              options={options}
              value={borderValue.borderStyle}
              onChange={val => borderHandler('borderStyle', val)}
              w={130}
              h={30}
            />
          </div>
          <div className={css(ut.flxcb, ut.mb2)}>
            <span className={css(ut.fs12, ut.fs12, ut.fw500)}>Color</span>
            <SimpleColorPickerTooltip
              action={{ onChange: val => borderHandler('borderColor', val) }}
              value={borderValue.borderColor}
            />
          </div>
        </>
      )}

      {borderPropObj['border-width'] && (
        <SpaceControl
          value={borderWidth}
          className={css(ut.mb2)}
          onChange={val => onSizeChange(borderWidthPath, val)}
          title="Width"
          unitOption={['px', 'em', 'rem']}
          min="0"
          max="10"
          width="128px"
        />
      )}

      {borderPropObj['border-radius'] && (
        <SpaceControl
          value={borderRadius}
          className={css(ut.mb2)}
          onChange={val => onSizeChange(borderRadiusPath, val)}
          title="Radius"
          unitOption={['px', 'em', 'rem', '%']}
          min="0"
          max="20"
          width="128px"
        />
      )}
    </>
  )
}

const extractBorderValue = (border) => {
  const [borderStyle, borderColor] = splitValueBySpaces(border)
  return { borderStyle, borderColor }
}
