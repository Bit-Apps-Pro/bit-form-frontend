/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $styles } from '../../../../GlobalStates/StylesState'
import { $themeColors } from '../../../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../../../GlobalStates/ThemeVarsState'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import ut from '../../../../styles/2.utilities'
import editorConfig from '../../../style-new/NewStyleEditorConfig'
import SimpleColorPickerTooltip from '../../../style-new/SimpleColorPickerTooltip'
import { getObjByKey, getValueByObjPath, getValueFromStateVar, setStyleStateObj } from '../../../style-new/styleHelpers'
import SimpleDropdown from '../../../Utilities/SimpleDropdown'
import SpaceControl from './SpaceControl'

/**
 * @Function BorderControlMenu
 * @param {objectPaths, hslaPaths}  Array|Object
 * @param {id} String
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
export default function BorderControlMenu({ objectPaths, hslaPaths, id }) {
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
      const elementKey = element
      borderPropObj = editorConfig[fieldType][elementKey].properties.border
    }
  } catch (error) {
    console.log(error.message)
    console.error(`😅 no style object found according to this field "${element}"`)
    return <></>
  }

  const borderPropKeys = Object.keys(borderPropObj)
  const stateObj = (objName) => getObjByKey(objName, { themeVars, styles, themeColors })

  let borderPath
  let borderColorPath
  let borderWidthPath
  let borderRadiusPath
  const obj = { border: '', borderColor: '', borderWidth: '', borderRadius: '' }

  /**
   * When objectPaths is Array
   * 0 => ThemeVars {borderWidth, borderRadius}
   * 1 => ThemeColors {border}
   */
  if (Array.isArray(objectPaths)) {
    const [themeVarsObj, themeColorsObj] = objectPaths
    // set state
    obj.border = themeVarsObj.object
    obj.borderColor = themeColorsObj.object
    obj.borderWidth = themeVarsObj.object
    obj.borderRadius = themeVarsObj.object

    borderPath = themeVarsObj.paths[borderPropKeys[0]]
    borderColorPath = themeColorsObj.paths['border-color']
    borderWidthPath = themeVarsObj.paths['border-width']
    borderRadiusPath = themeVarsObj.paths['border-radius']
  } else {
    const { paths } = objectPaths
    borderPath = paths[borderPropKeys[0]]
    borderColorPath = paths['border-color']
    borderWidthPath = paths['border-width']
    borderRadiusPath = paths['border-radius']

    // set state
    obj.border = objectPaths.object
    obj.borderColor = objectPaths.object
    obj.borderWidth = objectPaths.object
    obj.borderRadius = objectPaths.object
  }

  const borderValue = getValueFromStateVar(themeVars, getValueByObjPath(stateObj(obj.border), borderPath))
  const borderColor = getValueFromStateVar(themeColors, getValueByObjPath(stateObj(obj.borderColor), borderColorPath))
  const borderWidth = getValueFromStateVar(themeVars, getValueByObjPath(stateObj(obj.borderWidth), borderWidthPath))
  const borderRadius = getValueFromStateVar(themeVars, getValueByObjPath(stateObj(obj.borderRadius), borderRadiusPath))

  const onValueChange = (stateObjName, pathName, val, prop) => {
    // const stateObjName = obj.borderWidth || obj.borderRadius
    const index = getValueByObjPath(stateObj(stateObjName), pathName).indexOf('!important')
    const newVal = index >= 0 ? `${val} !important` : val
    setStyleStateObj(stateObjName, pathName, newVal, { setThemeVars, setThemeColors, setStyles })
    if (prop === 'borderColor' && hslaPaths) {
      const v = val.match(/[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/gi)
      const { h, s, l, a } = hslaPaths
      setThemeColors(prvColor => produce(prvColor, (draft) => {
        draft[h] = v[0]
        draft[s] = v[1]
        draft[l] = v[2]
        draft[a] = v[3]
      }))
    }
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
        <div className={css(ut.flxcb, ut.mb2)}>
          <span className={css(ut.fs12, ut.fw500)}>Type</span>
          <SimpleDropdown
            options={options}
            value={borderValue}
            onChange={val => onValueChange(obj.border, borderPath, val)}
            w={130}
            h={30}
            id={`${id}-style`}
          />
        </div>
      )}
      {borderPropObj['border-color'] && (
        <div className={css(ut.flxcb, ut.mb2)}>
          <span className={css(ut.fs12, ut.fs12, ut.fw500)}>Color</span>
          <SimpleColorPickerTooltip
            action={{ onChange: val => onValueChange(obj.borderColor, borderColorPath, val, 'borderColor') }}
            value={borderColor}
          />
        </div>
      )}
      {borderPropObj['border-width'] && (
        <SpaceControl
          value={borderWidth}
          className={css(ut.mb2)}
          onChange={val => onValueChange(obj.borderWidth, borderWidthPath, val)}
          title="Width"
          unitOption={['px', 'em', 'rem']}
          min="0"
          max="10"
          width="128px"
          dataTestId={`${id}-wdth`}
        />
      )}

      {borderPropObj['border-radius'] && (
        <SpaceControl
          value={borderRadius}
          className={css(ut.mb2)}
          onChange={val => onValueChange(obj.borderRadius, borderRadiusPath, val)}
          title="Radius"
          unitOption={['px', 'em', 'rem', '%']}
          min="0"
          max="20"
          width="128px"
          dataTestId={`${id}-rdus`}
        />
      )}
    </>
  )
}
