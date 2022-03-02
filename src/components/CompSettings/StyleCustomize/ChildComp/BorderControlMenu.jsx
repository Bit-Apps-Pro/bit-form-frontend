/* eslint-disable no-console */
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { $styles } from '../../../../GlobalStates/StylesState'
import { $themeVars } from '../../../../GlobalStates/ThemeVarsState'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import ut from '../../../../styles/2.utilities'
import { getElmDataBasedOnElement } from '../../../../Utils/Helpers'
import editorConfig from '../../../style-new/NewStyleEditorConfig'
import SimpleColorPickerTooltip from '../../../style-new/SimpleColorPickerTooltip'
import { getObjByKey, getValueByObjPath, getValueFromStateVar, setStyleStateObj } from '../../../style-new/styleHelpers'
import SimpleDropdown from '../../../Utilities/SimpleDropdown'
import SpaceControl from './SpaceControl'

export default function BorderControlMenu({ objectPaths, state = '' }) {
  const { css } = useFela()
  const { fieldKey, element } = useParams()
  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [styles, setStyles] = useRecoilState($styles)

  const { object, paths } = objectPaths
  const stateObj = getObjByKey(object, { themeVars, styles })
  const fldStyleObj = styles?.fields?.[fieldKey]

  let borderPropObj
  try {
    if (!fldStyleObj) {
      borderPropObj = editorConfig.formWrapper.properties.border
    } else {
      const { fieldType } = fldStyleObj
      const { elementKey } = getElmDataBasedOnElement(element)
      borderPropObj = editorConfig[fieldType][elementKey].properties.border
    }
  } catch (error) {
    console.log(error.message)
    console.error('😅 no style object found according to this field')
  }
  const borderPropKeys = Object.keys(borderPropObj)

  const border = getValueFromStateVar(themeVars, getValueByObjPath(stateObj, paths[borderPropKeys[0]]))
  const borderColor = getValueFromStateVar(themeVars, getValueByObjPath(stateObj, paths['border-color']))
  const borderWidth = getValueFromStateVar(themeVars, getValueByObjPath(stateObj, paths['border-width']))
  const borderRadius = getValueFromStateVar(themeVars, getValueByObjPath(stateObj, paths['border-radius']))

  const onSizeChange = (pathName, val) => {
    setStyleStateObj(object, pathName, val, { setThemeVars, setStyles })
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
            value={border}
            onChange={val => onSizeChange(paths[borderPropKeys[0]], val)}
            w={130}
            h={30}
          />
        </div>
      )}
      {borderPropObj['border-color'] && (
        <div className={css(ut.flxcb, ut.mb2)}>
          <span className={css(ut.fs12, ut.fs12, ut.fw500)}>Color</span>
          <SimpleColorPickerTooltip
            action={{ onChange: val => onSizeChange(paths['border-color'], val) }}
            value={borderColor}
          />
        </div>
      )}

      {borderPropObj['border-width'] && (
        <SpaceControl
          value={borderWidth}
          className={css(ut.mb2)}
          onChange={val => onSizeChange(paths['border-width'], val)}
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
          onChange={val => onSizeChange(paths['border-radius'], val)}
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
