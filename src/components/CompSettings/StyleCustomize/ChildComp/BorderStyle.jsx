import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState } from 'recoil'
import { $themeVars } from '../../../../GlobalStates'
import ChevronDownIcn from '../../../../Icons/ChevronDownIcn'
import ut from '../../../../styles/2.utilities'
import SimpleColorPickerTooltip from '../../../style-new/SimpleColorPickerTooltip'
import { getStyleValueFromObjectPath, splitValueBySpaces } from '../../../style-new/styleHelpers'
import SimpleDropdown from '../../../Utilities/SimpleDropdown'
import SpaceControl from './SpaceControl'

export default function BorderStyle({ objectPaths }) {
  const { css } = useFela()

  const [themeVars, setThemeVars] = useRecoilState($themeVars)

  const { object, paths } = objectPaths

  const borderStyle = getStyleValueFromObjectPath(object, paths.border, { themeVars })
  const borderWidth = getStyleValueFromObjectPath(object, paths.borderWidth, { themeVars })
  const borderRadius = getStyleValueFromObjectPath(object, paths.borderRadius, { themeVars })

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

    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle[paths.border] = newBorderStyleValue
    }))
  }

  const onSizeChange = (name, val) => {
    setThemeVars(preStyle => produce(preStyle, drftStyle => {
      drftStyle[name] = val
    }))
  }

  const options = [
    { icn: <ChevronDownIcn size={12} />, label: 'Solid', value: 'solid' },
    { icn: <ChevronDownIcn size={12} />, label: 'Dashed', value: 'dashed' },
    { icn: <ChevronDownIcn size={12} />, label: 'Dotted', value: 'dotted' },
  ]

  return (
    <>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(borderStyle.title, ut.fs12, ut.fw500)}>Type</span>
        <SimpleDropdown options={options} value={borderStyleValues.type} onChange={val => generateBorderStyleValue('type', val)} w={130} h={30} />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fs12, ut.fw500)}>Color</span>
        <SimpleColorPickerTooltip action={{ onChange: val => generateBorderStyleValue('color', val) }} value={borderStyleValues.color} />
      </div>
      <SpaceControl value={borderWidth} className={css(ut.mb2)} onChange={val => onSizeChange(paths.borderWidth, val)} title="Width" unitOption={['px', 'em', 'rem']} />
      <SpaceControl value={borderRadius} className={css(ut.mb2)} onChange={val => onSizeChange(paths.borderRadius, val)} title="Radius" unitOption={['px', 'em', 'rem']} />
    </>
  )
}
