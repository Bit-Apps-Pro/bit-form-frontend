import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $themeColors, $styles, $themeVars } from '../../GlobalStates'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SimpleColorPicker from './SimpleColorPicker'
import { commonStyle, getNumFromStr, getStrFromStr, getValueByObjPath } from './styleHelpers'
import ThemeControl from './ThemeControl'

export default function FieldQuickTweaks({ fieldKey }) {
  const { css } = useFela()
  const themeColors = useRecoilValue($themeColors)
  const themeVars = useRecoilValue($themeVars)
  const { '--global-accent-color': accentColor } = themeColors
  const [styles, setStyles] = useRecoilState($styles)
  const propertyPath = (elemnKey, property) => `fields->${fieldKey}->classes->.${fieldKey}-${elemnKey}->${property}`

  const setSizes = ({ target: { value } }) => {
    const commonStyleClasses = commonStyle(fieldKey, value)
    const cmnStlClasses = Object.keys(commonStyleClasses)
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      const stylesClasses = drftStyle.fields[fieldKey].classes
      const cmnStlClsLen = cmnStlClasses.length

      for (let i = 0; i < cmnStlClsLen; i += 1) {
        if (Object.prototype.hasOwnProperty.call(stylesClasses, cmnStlClasses[i])) {
          const cmnClsProperty = commonStyleClasses[cmnStlClasses[i]]
          const cmnClsPropertyKey = Object.keys(cmnClsProperty)
          const cmnClsPropertyKeyLan = cmnClsPropertyKey.length

          for (let popIndx = 0; popIndx < cmnClsPropertyKeyLan; popIndx += 1) {
            const cmnClsPropertyValue = cmnClsProperty[cmnClsPropertyKey[popIndx]]
            // eslint-disable-next-line no-param-reassign
            drftStyle.fields[fieldKey].classes[cmnStlClasses[i]][cmnClsPropertyKey[popIndx]] = cmnClsPropertyValue
          }
        }
      }
    }))
  }
  const borderRadHandler = ({ value, unit }) => {
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      const fld = prvStyle.fields[fieldKey]
      if (fld.theme === 'bitformDefault' && fld.fieldType === 'text') {
        assignNestedObj(drftStyle, propertyPath('fld', 'border-radius'), `${value}${unit}`)
      } else if (fld.theme === 'bitformDefault' && fld.fieldType === 'check') {
        assignNestedObj(drftStyle, propertyPath('ck', 'border-radius'), `${value}${unit}`)
      }
    }))
  }

  const getBorderRadius = () => {
    const elementKey = styles.fields[fieldKey].fieldType === 'text' ? 'fld' : 'ck'
    let brsValue = getValueByObjPath(styles, propertyPath(elementKey, 'border-radius'))
    if (brsValue?.match(/var/gi)?.[0]) {
      brsValue = brsValue?.replaceAll(/\(|var|,.*|\)/gi, '')
      brsValue = themeVars[brsValue] !== '' ? themeVars[brsValue] : '0px'
    }
    if (!brsValue) brsValue = '0px'
    return [getNumFromStr(brsValue), getStrFromStr(brsValue)]
  }
  const [borderRadVal, borderRadUnit] = getBorderRadius()
  return (
    <>
      <SimpleColorPicker
        title="Accent Color"
        subtitle="Accent Color"
        value={accentColor}
        stateObjName="field-accent-color"
        propertyPath="--global-accent-color"
        modalId="global-primary-clr"
        fldKey={fieldKey}
      />
      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>Size</span>
        <select onChange={setSizes} className={css(sc.select)}>
          {Object.keys(sizes).map((key) => <option value={key}>{sizes[key]}</option>)}
        </select>
      </div>
      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>Theme</span>
        <ThemeControl fldKey={fieldKey} />
      </div>
      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>Border Radius</span>
        <div className={css(ut.flxc)}>
          <SizeControl
            min={0}
            max={20}
            inputHandler={borderRadHandler}
            sizeHandler={({ unitKey, unitValue }) => borderRadHandler({ unit: unitKey, value: unitValue })}
            value={borderRadVal}
            unit={borderRadUnit}
            width="110px"
            options={['px', 'em', 'rem']}
          />
        </div>
      </div>
    </>
  )
}
const sizes = {
  'small-2': 'Small-2',
  'small-1': 'Small-1',
  medium: 'Medium',
  large: 'Large',
  'large-1': 'Large-1',
}
