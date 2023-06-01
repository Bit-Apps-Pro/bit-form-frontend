import { create } from 'mutative'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { $fields } from '../../../GlobalStates/GlobalStates'
import { $styles } from '../../../GlobalStates/StylesState'
import ut from '../../../styles/2.utilities'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../../Utils/FormBuilderHelper'
import { deepCopy } from '../../../Utils/Helpers'
import SizeControl from '../../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SimpleDropdown from '../../Utilities/SimpleDropdown'
import { assignNestedObj, getNumFromStr, getStrFromStr, getValueByObjPath, unitConverter } from '../styleHelpers'
import ThemeStylePropertyBlock from '../ThemeStylePropertyBlock'

export default function PaypalFieldQuickTweaks() {
  const { css } = useFela()
  const { element, fieldKey } = useParams()
  const [styles, setStyles] = useAtom($styles)
  const [fields, setFields] = useAtom($fields)
  const fieldData = deepCopy(fields[fieldKey])

  const propertyPath = (elemnKey, property) => `fields->${fieldKey}->classes->.${fieldKey}-${elemnKey}->${property}`
  const paypalLayouts = [
    { value: 'vertical', label: 'Vertical' },
    { value: 'horizontal', label: 'Horizontal' },
    { value: 'standalone', label: 'Standalone' },
  ]
  const paypalColors = [
    { value: 'gold', label: 'Gold' },
    { value: 'blue', label: 'Blue' },
    { value: 'silver', label: 'Silver' },
    { value: 'white', label: 'White' },
    { value: 'black', label: 'Black' },
  ]

  const paypalShape = [
    { value: 'rect', label: 'Rectangle' },
    { value: 'pill', label: 'Pill' },
  ]

  const paypalLabels = [
    { value: 'paypal', label: 'Paypal' },
    { value: 'checkout', label: 'Paypal Checkout' },
    { value: 'buynow', label: 'Paypal Buy Now' },
    { value: 'pay', label: 'Pay with Paypal' },
  ]

  const widthValue = getValueByObjPath(styles, propertyPath('paypal-wrp', 'max-width'))
  const [fldWrpWidthVal, fldWrpWidthUnit] = [getNumFromStr(widthValue), getStrFromStr(widthValue)]

  const paypalStyleHandler = (name, value) => {
    fieldData.style[name] = value
    setFields(allFields => create(allFields, draft => { draft[fieldKey] = fieldData }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, `Paypal ${name}`, value, { fields: getLatestState('fields') }))
  }
  const onchangeHandler = ({ value, unit }, prvUnit, prop = 'border-radius') => {
    const convertvalue = unitConverter(unit, value, prvUnit)
    const v = `${convertvalue}${unit}`
    setStyles(prvStyle => create(prvStyle, drftStyle => {
      assignNestedObj(drftStyle, propertyPath('paypal-wrp', prop), v)
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, prop, v, { styles: getLatestState('styles') }))
  }
  return (
    <>
      <ThemeStylePropertyBlock label="Max Width">
        <div className={css(ut.flxc)}>
          <SizeControl
            min={150}
            max={750}
            inputHandler={({ unit, value }) => onchangeHandler({ unit, value }, fldWrpWidthUnit, 'max-width')}
            sizeHandler={({ unitKey, unitValue }) => onchangeHandler({ unit: unitKey, value: unitValue }, fldWrpWidthUnit, 'max-width')}
            value={fldWrpWidthVal || 0}
            unit={fldWrpWidthUnit || 'px'}
            width="128px"
            options={['px', 'em', 'rem', '%']}
            dataTestId="paypal-btn-width"
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Height">
        <div className={css(ut.flxc)}>
          <SizeControl
            min={25}
            max={55}
            inputHandler={({ unit, value }) => paypalStyleHandler('height', value)}
            sizeHandler={({ unitKey, unitValue }) => paypalStyleHandler('height', unitValue)}
            value={fieldData.style.height}
            unit="px"
            width="128px"
            options={['px']}
            dataTestId="paypal-btn-width"
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Layout">
        <div className={css(ut.flxc)}>
          <SimpleDropdown
            options={paypalLayouts}
            value={String(fieldData.style.layout)}
            onChange={val => paypalStyleHandler('layout', val)}
            w={130}
            h={30}
            id="paypal-layout"
            cls={css({ mnh: 30, pt: '4px !important' })}
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Color">
        <div className={css(ut.flxc)}>
          <SimpleDropdown
            options={paypalColors}
            value={String(fieldData.style.color)}
            onChange={val => paypalStyleHandler('color', val)}
            w={130}
            h={30}
            id="paypal-color"
            cls={css({ mnh: 30, pt: '4px !important' })}
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Shape">
        <div className={css(ut.flxc)}>
          <SimpleDropdown
            options={paypalShape}
            value={String(fieldData.style.shape)}
            onChange={val => paypalStyleHandler('shape', val)}
            w={130}
            h={30}
            id="paypal-shape"
            cls={css({ mnh: 30, pt: '4px !important' })}
          />
        </div>
      </ThemeStylePropertyBlock>
      <ThemeStylePropertyBlock label="Label">
        <div className={css(ut.flxc)}>
          <SimpleDropdown
            options={paypalLabels}
            value={String(fieldData.style.label)}
            onChange={val => paypalStyleHandler('label', val)}
            w={130}
            h={30}
            id="paypal-label"
            cls={css({ mnh: 30, pt: '4px !important' })}
          />
        </div>
      </ThemeStylePropertyBlock>
    </>
  )
}
