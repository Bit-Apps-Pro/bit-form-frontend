import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $themeVars, $styles } from '../../../../GlobalStates'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import ut from '../../../../styles/2.utilities'
import SimpleColorPickerTooltip from '../../../style-new/SimpleColorPickerTooltip'
import { getStyleStateObj, getStyleValueFromObjectPath, setStyleStateObj, splitValueBySpaces } from '../../../style-new/styleHelpers'
import SimpleDropdown from '../../../Utilities/SimpleDropdown'
import SpaceControl from './SpaceControl'

export default function BorderControlMenu({ objectPaths }) {
  const { css } = useFela()

  const [themeVars, setThemeVars] = useRecoilState($themeVars)
  const [styles, setStyles] = useRecoilState($styles)

  const { object, paths } = objectPaths

  const stateObj = getStyleStateObj(object, { themeVars, styles })

  const borderStyle = getStyleValueFromObjectPath(stateObj, paths.border)
  const borderWidth = getStyleValueFromObjectPath(stateObj, paths.borderWidth)
  const borderRadius = getStyleValueFromObjectPath(stateObj, paths.borderRadius)

  const extractBorderStyle = () => {
    const [type, color] = splitValueBySpaces(borderStyle)

    return { type, color }
  }

  const borderStyleValues = extractBorderStyle()

  const generateBorderStyleValue = (name, val) => {
    const newBorderStyleValue = Object.entries(borderStyleValues).map(([shName, shVal]) => {
      if (shName === name) {
        return `${val || ''}`
      }
      return `${shVal || ''}`
    }).join(' ')

    setStyleStateObj(object, paths.border, newBorderStyleValue, { setThemeVars, setStyles })
  }

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
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>Type</span>
        <SimpleDropdown options={options} value={borderStyleValues.type} onChange={val => generateBorderStyleValue('type', val)} w={130} h={30} />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fs12, ut.fw500)}>Color</span>
        <SimpleColorPickerTooltip action={{ onChange: val => generateBorderStyleValue('color', val) }} value={borderStyleValues.color} />
      </div>
      {paths.borderWidth && (
        <SpaceControl value={borderWidth} className={css(ut.mb2)} onChange={val => onSizeChange(paths.borderWidth, val)} title="Width" unitOption={['px', 'em', 'rem']} />
      )}
      {paths.borderRadius && (
        <SpaceControl value={borderRadius} className={css(ut.mb2)} onChange={val => onSizeChange(paths.borderRadius, val)} title="Radius" unitOption={['px', 'em', 'rem', '%']} />
      )}
    </>
  )
}
