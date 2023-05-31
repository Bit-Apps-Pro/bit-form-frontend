/* eslint-disable no-param-reassign */
import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles } from '../../../GlobalStates/StylesState'
import { $themeVars } from '../../../GlobalStates/ThemeVarsState'
import ut from '../../../styles/2.utilities'
import sc from '../../../styles/commonStyleEditorStyle'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../../Utils/FormBuilderHelper'
import SizeControl from '../../CompSettings/StyleCustomize/ChildComp/SizeControl'
import { assignNestedObj, getNumFromStr, getStrFromStr, getValueByObjPath, getValueFromStateVar, unitConverter } from '../styleHelpers'
import ThemeStylePropertyBlock from '../ThemeStylePropertyBlock'

export default function ButtonQuickTweaks() {
  const { css } = useFela()
  const { element, fieldKey } = useParams()
  const [styles, setStyles] = useRecoilState($styles)
  const themeVars = useRecoilValue($themeVars)
  const fldStyleObj = styles?.fields?.[fieldKey]
  const { fieldSize } = fldStyleObj
  const propertyPath = (elemnKey, property) => `fields->${fieldKey}->classes->.${fieldKey}-${elemnKey}->${property}`

  const getPropValue = (prop = 'width') => {
    let brsValue = getValueByObjPath(styles, propertyPath('btn', prop))
    brsValue = getValueFromStateVar(themeVars, brsValue)
    if (!brsValue) brsValue = '0px'
    return [getNumFromStr(brsValue), getStrFromStr(brsValue)]
  }
  const [fldWidthVal, fldWidthUnit] = getPropValue('width')
  const [fldHeightVal, fldHeightUnit] = getPropValue('height')

  const onchangeHandler = ({ value, unit }, prvUnit, prop = 'width') => {
    const convertvalue = unitConverter(unit, value, prvUnit)
    const v = `${convertvalue}${unit}`
    setStyles(prvStyle => create(prvStyle, drftStyle => {
      assignNestedObj(drftStyle, propertyPath('btn', prop), v)
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, prop, v, { styles: getLatestState('styles') }))
  }

  const setBtnSize = (elementKey, value) => {
    const btnSizeValues = {
      'small-2': ['12px', '7px 10px'],
      'small-1': ['14px', '9px 15px'],
      medium: ['16px', '11px 20px'],
      'large-1': ['18px', '12px 22px'],
      'large-2': ['21px', '14px 24px'],
    }

    const propertyPaths = [
      propertyPath(elementKey, 'font-size'),
      propertyPath(elementKey, 'padding'),
    ]
    const values = btnSizeValues[value]
    setStyles(prvStyle => create(prvStyle, drftStyle => {
      drftStyle.fields[fieldKey].fieldSize = value
      propertyPaths.map((path, index) => {
        assignNestedObj(drftStyle, path, values[index])
      })
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Button Size', value, { styles: getLatestState('styles') }))
  }
  return (
    <>
      <ThemeStylePropertyBlock label="Size">
        <select
          data-testid="btn-size-ctrl"
          value={fieldSize}
          onChange={e => setBtnSize('btn', e.target.value)}
          className={css(sc.select)}
        >
          {Object.keys(sizes).map((key) => <option key={key} value={key}>{sizes[key]}</option>)}
        </select>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Width">
        <div className={css(ut.flxc)}>
          <SizeControl
            min={0}
            max={100}
            inputHandler={({ unit, value }) => onchangeHandler({ unit, value }, fldWidthUnit, 'width')}
            sizeHandler={({ unitKey, unitValue }) => onchangeHandler({ unit: unitKey, value: unitValue }, fldWidthUnit, 'width')}
            value={fldWidthVal || 0}
            unit={fldWidthUnit || 'px'}
            width="128px"
            options={['px', 'em', 'rem', '%']}
            dataTestId="btn-width"
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Height">
        <div className={css(ut.flxc)}>
          <SizeControl
            min={0}
            max={100}
            inputHandler={({ unit, value }) => onchangeHandler({ unit, value }, fldHeightUnit, 'height')}
            sizeHandler={({ unitKey, unitValue }) => onchangeHandler({ unit: unitKey, value: unitValue }, fldHeightUnit, 'height')}
            value={fldHeightVal || 0}
            unit={fldHeightUnit || 'px'}
            width="128px"
            options={['px', 'em', 'rem', '%']}
            dataTestId="btn-height"
          />
        </div>
      </ThemeStylePropertyBlock>
    </>
  )
}

const sizes = {
  'small-2': 'Extra Small',
  'small-1': 'Small',
  medium: 'Medium(Default)',
  // large: 'Large',
  'large-1': 'Large',
  'large-2': 'Extra Large',
}
