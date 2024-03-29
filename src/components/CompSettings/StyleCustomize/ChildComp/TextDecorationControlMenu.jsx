import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { $styles } from '../../../../GlobalStates/StylesState'
import { $themeVars } from '../../../../GlobalStates/ThemeVarsState'
import ut from '../../../../styles/2.utilities'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../../../Utils/FormBuilderHelper'
import SimpleColorPickerTooltip from '../../../style-new/SimpleColorPickerTooltip'
import {
  assignNestedObj, getNumFromStr, getObjByKey, getStrFromStr, getValueByObjPath, setStyleStateObj, unitConverter
} from '../../../style-new/styleHelpers'
import SimpleDropdown from '../../../Utilities/SimpleDropdown'
import SizeControl from './SizeControl'

export default function TextDecorationControlMenu({ objectPaths, id }) {
  const { css } = useFela()
  const { fieldKey, element } = useParams()
  const [themeVars, setThemeVars] = useAtom($themeVars)
  const [styles, setStyles] = useAtom($styles)

  const { object, paths } = objectPaths

  const stateObj = getObjByKey(object, { themeVars, styles })

  const textDcrtnLine = getValueByObjPath(stateObj, paths['text-decoration-line'])
  const textDcrtnStyle = getValueByObjPath(stateObj, paths['text-decoration-style'])
  const textDcrtnColor = getValueByObjPath(stateObj, paths['text-decoration-color'])
  const textDcrtnThickness = getValueByObjPath(stateObj, paths['text-decoration-thickness'])
  const thicknesValue = getNumFromStr(textDcrtnThickness) || '0'
  const thicknesUnit = getStrFromStr(textDcrtnThickness) || 'px'
  const thicknessHandler = ({ value, unit }) => {
    const convertvalue = unitConverter(unit, value, thicknesUnit)
    setStyles(prvStyle => create(prvStyle, drftStyle => {
      assignNestedObj(drftStyle, paths['text-decoration-thickness'], `${convertvalue}${unit}`)
    }))
  }

  const onValueChange = (pathName, val) => {
    setStyleStateObj(object, pathName, val, { setThemeVars, setStyles })
    addToBuilderHistory(generateHistoryData(element, fieldKey, pathName, val, { [object]: getLatestState(object) }))
  }

  const styleOptions = [
    { label: 'Solid', value: 'solid' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Dotted', value: 'dotted' },
    { label: 'Double', value: 'double' },
  ]

  const lineOptions = [
    { label: 'Overline', value: 'overline' },
    { label: 'Underline', value: 'underline' },
    { label: 'Line Through', value: 'line-through' },
  ]

  return (
    <>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>Line</span>
        <SimpleDropdown
          options={lineOptions}
          value={textDcrtnLine}
          onChange={val => onValueChange(paths['text-decoration-line'], val)}
          w={130}
          h={30}
          id={`${id}-txt-dec-line`}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>Style</span>
        <SimpleDropdown
          options={styleOptions}
          value={textDcrtnStyle}
          onChange={val => onValueChange(paths['text-decoration-style'], val)}
          w={130}
          h={30}
          id={`${id}-txt-dec-style`}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fs12, ut.fw500)}>Color</span>
        <SimpleColorPickerTooltip
          action={{ onChange: val => onValueChange(paths['text-decoration-color'], val) }}
          value={textDcrtnColor}
        />
      </div>
      <div className={css(ut.flxcb, ut.mb2)}>
        <span className={css(ut.fs12, ut.fw500)}>Thickness</span>
        <SizeControl
          min={0.1}
          max={100}
          inputHandler={thicknessHandler}
          sizeHandler={({ unitKey, unitValue }) => thicknessHandler({ unit: unitKey, value: unitValue })}
          value={thicknesValue || 0}
          unit={thicknesUnit || 'px'}
          width="130px"
          options={['px', 'em', 'rem', '']}
          step={thicknesUnit !== 'px' ? '0.1' : 1}
          dataTestId={`${id}-txt-dec-thickness`}
        />
      </div>
    </>
  )
}
