/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import { addToBuilderHistory, generateHistoryData, getLatestState } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SingleToggle from '../Utilities/SingleToggle'
import { updateFieldStyleByFieldSizing } from './themes/1_bitformDefault/fieldSizeControlStyle'
import ButtonQuickTweaks from './QuickTweaks/ButtonQuickTweaks'
import PaypalFieldQuickTweaks from './QuickTweaks/PaypalFieldQuickTweaks'
import RazorpayFieldQuickTweaks from './QuickTweaks/RazorpayFieldQuickTweaks'
import TitleFieldQuickTweaks from './QuickTweaks/TitleFieldQuickTweaks'
import SimpleColorPicker from './SimpleColorPicker'
import { assignNestedObj, getNumFromStr, getStrFromStr, getValueByObjPath, getValueFromStateVar, unitConverter } from './styleHelpers'
import ThemeControl from './ThemeControl'
import ThemeStyleReset from './ThemeStyleReset'

export default function FieldQuickTweaks({ fieldKey }) {
  const { css } = useFela()
  const { element } = useParams()
  const themeVars = useRecoilValue($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  const fields = useRecoilValue($fields)
  const fieldData = deepCopy(fields[fieldKey])
  const fldStyleObj = styles?.fields?.[fieldKey]
  const { fieldType, fieldSize } = fldStyleObj
  const propertyPath = (elemnKey, property) => `fields->${fieldKey}->classes->.${fieldKey}-${elemnKey}->${property}`

  const rtlCurrencyFldCheck = () => {
    const fldType = styles.fields[fieldKey].fieldType
    const clsName = fldType === 'phone-number' ? 'phone' : fldType
    const path = propertyPath(`${clsName}-inner-wrp`, 'direction')
    const value = getValueByObjPath(styles, path)
    return value === 'rtl'
  }

  const setSizes = ({ target: { value } }) => {
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      const updateStyle = updateFieldStyleByFieldSizing(prvStyle.fields[fieldKey], fieldKey, fieldData.typ, value)
      drftStyle.fields[fieldKey] = updateStyle
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Field Size', value, { styles: getLatestState('styles') }))
  }

  const onchangeHandler = ({ value, unit }, prvUnit, prop = 'border-radius') => {
    const convertvalue = unitConverter(unit, value, prvUnit)
    const v = `${convertvalue}${unit}`
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      const fld = prvStyle.fields[fieldKey]
      let elemntKey
      switch (fld.fieldType) {
        case 'text':
        case 'date':
        case 'html-select':
        case 'number':
        case 'password':
        case 'username':
        case 'email':
        case 'url':
        case 'time':
        case 'datetime-local':
        case 'month':
        case 'week':
        case 'color':
        case 'textarea':
          elemntKey = 'fld'
          break

        case 'check':
          elemntKey = 'ck'
          break

        case 'radio':
          elemntKey = 'rdo'
          break

        case 'button':
          elemntKey = 'btn'
          break

        case 'currency':
        case 'country':
          elemntKey = `${fld.fieldType}-fld-wrp`
          break

        case 'image':
          elemntKey = 'fld-wrp'
          break

        case 'phone-number':
          elemntKey = 'phone-fld-wrp'
          break

        case 'paypal':
          elemntKey = 'paypal-wrp'
          break

        case 'select':
          elemntKey = 'dpd-fld-wrp'
          break

        default:
          break
      }
      assignNestedObj(drftStyle, propertyPath(elemntKey, prop), v)
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, prop, v, { styles: getLatestState('styles') }))
  }
  const getPropValue = (prop = 'border-radius') => {
    const fldType = styles.fields[fieldKey].fieldType
    let elementKey = ''
    switch (fldType) {
      case 'text':
      case 'date':
      case 'html-select':
      case 'number':
      case 'password':
      case 'username':
      case 'email':
      case 'url':
      case 'time':
      case 'datetime-local':
      case 'month':
      case 'week':
      case 'color':
      case 'textarea':
        elementKey = 'fld'
        break

      case 'check':
        elementKey = 'ck'
        break

      case 'radio':
        elementKey = 'rdo'
        break

      case 'button':
        elementKey = 'btn'
        break

      case 'currency':
      case 'country':
        elementKey = `${fldType}-fld-wrp`
        break

      case 'image':
        elementKey = 'fld-wrp'
        break

      case 'phone-number':
        elementKey = 'phone-fld-wrp'
        break

      case 'paypal':
        elementKey = 'paypal-wrp'
        break

      case 'select':
        elementKey = 'dpd-fld-wrp'
        break

      default:
        break
    }
    let brsValue = getValueByObjPath(styles, propertyPath(elementKey, prop))
    brsValue = getValueFromStateVar(themeVars, brsValue)
    if (!brsValue) brsValue = '0px'
    return [getNumFromStr(brsValue), getStrFromStr(brsValue)]
  }

  const [borderRadVal, borderRadUnit] = getPropValue()

  const fldTypWiseAccentColorObjName = () => {
    let objName = ''
    let objPath = ''
    switch (fieldType) {
      case 'check':
      case 'radio':
        objName = 'styles'
        objPath = [
          `fields->${fieldKey}->classes->.${fieldKey}-ci:checked ~ .${fieldKey}-cl .${fieldKey}-bx->border-color`,
          `fields->${fieldKey}->classes->.${fieldKey}-ci:checked ~ .${fieldKey}-cl .${fieldKey}-bx->background`,
          `fields->${fieldKey}->classes->.${fieldKey}-ci:focus ~ .${fieldKey}-cl .${fieldKey}-bx->box-shadow`,
        ]
        break
      case 'text':
      case 'date':
      case 'html-select':
      case 'number':
      case 'password':
      case 'username':
      case 'email':
      case 'url':
      case 'datetime-local':
      case 'time':
      case 'month':
      case 'week':
      case 'color':
      case 'textarea':
        objName = 'styles'
        objPath = [
          `fields->${fieldKey}->classes->.${fieldKey}-fld:focus->border-color`,
          `fields->${fieldKey}->classes->.${fieldKey}-fld:focus->box-shadow`,
          `fields->${fieldKey}->classes->.${fieldKey}-fld:hover->border-color`,
          `fields->${fieldKey}->classes->.${fieldKey}-fld:focus ~ .${fieldKey}-pre-i->filter`,
          `fields->${fieldKey}->classes->.${fieldKey}-fld:focus ~ .${fieldKey}-suf-i->filter`,
        ]
        break
      default:
        // objName = 'field-accent-color'
        // objPath = '--global-accent-color'
        break
    }
    return [objName, objPath]
  }

  const [objName, objPath] = fldTypWiseAccentColorObjName()

  const handleDir = () => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      const fldType = prvStyle.fields[fieldKey].fieldType
      const clsName = fldType === 'phone-number' ? 'phone' : fldType
      const { classes: clss } = drft.fields[fieldKey]
      if (!rtlCurrencyFldCheck()) {
        clss[`.${fieldKey}-${clsName}-inner-wrp`].direction = 'rtl'
        clss[`.${fieldKey}-input-clear-btn`].left = '6px'
        delete clss[`.${fieldKey}-input-clear-btn`].right
        clss[`.${fieldKey}-opt-search-input`].direction = 'rtl'
        clss[`.${fieldKey}-opt-search-icn`].right = '13px'
        clss[`.${fieldKey}-option-inner-wrp`].direction = 'rtl'
        clss[`.${fieldKey}-opt-search-input`]['padding-right'] = '30px'
        clss[`.${fieldKey}-search-clear-btn`].left = '16px'
        delete clss[`.${fieldKey}-search-clear-btn`].right
        clss[`.${fieldKey}-opt-lbl`]['margin-left'] = '10px'
      } else {
        delete clss[`.${fieldKey}-${clsName}-inner-wrp`].direction
        clss[`.${fieldKey}-input-clear-btn`].right = '6px'
        delete clss[`.${fieldKey}-input-clear-btn`].left
        delete clss[`.${fieldKey}-opt-search-input`].direction
        clss[`.${fieldKey}-opt-search-icn`].left = '13px'
        delete clss[`.${fieldKey}-opt-search-icn`].right
        delete clss[`.${fieldKey}-option-inner-wrp`].direction
        delete clss[`.${fieldKey}-search-clear-btn`].left
        delete clss[`.${fieldKey}-opt-lbl`]['margin-left']
        clss[`.${fieldKey}-search-clear-btn`].right = '6px'
      }
    }))
    addToBuilderHistory(generateHistoryData(element, fieldKey, 'Direction', rtlCurrencyFldCheck(), { styles: getLatestState('styles') }))
  }

  return (
    <>
      {fieldType.match(/^(text|number|password|username|email|url|date|time|datetime-local|month|week|color|textarea|html-select|)$/gi) && (
        <SimpleColorPicker
          title="Accent Color"
          subtitle="Accent Color"
          value={getValueByObjPath(styles, objPath[0])}
          stateObjName={objName}
          propertyPath={objPath}
          modalId="accent-color"
          fldKey={fieldKey}
        // hslaPaths={{ h: '--gah', s: '--gas', l: '--gal', a: '--gaa' }}
        />
      )}
      {fieldType.match(/^(text|number|password|username|email|url|date|time|datetime-local|month|week|color|textarea|html-select|currency|phone-number|country|radio|check|decision-box|file-up)$/gi) && (
        <div className={css(ut.flxcb, ut.mt2)}>
          <span className={css(ut.fw500)}>Fields Size</span>
          <span className={css(ut.flxc)}>
            <ThemeStyleReset id="field-theme" fk={fieldKey} />
            <select
              data-testid="field-size-ctrl"
              value={fieldSize}
              onChange={setSizes}
              className={css(sc.select)}
            >
              {Object.keys(sizes).map((key) => <option key={key} value={key}>{sizes[key]}</option>)}
            </select>
          </span>
        </div>
      )}
      {fieldType.match(/^(text|number|password|username|email|url|date|time|datetime-local|month|week|color|textarea|html-select|currency|phone-number|country|radio|check)$/gi) && (
        <div className={css(ut.flxcb, ut.mt2)}>
          <span className={css(ut.fw500)}>Theme</span>
          <ThemeControl fldKey={fieldKey} />
        </div>
      )}

      {fieldType === 'button' && (
        <ButtonQuickTweaks />
      )}

      {fieldType === 'title' && (
        <TitleFieldQuickTweaks />
      )}

      {(fieldType === 'currency' || fieldType === 'phone-number') && (
        <div className={css(ut.flxcb, ut.mt3)}>
          <span className={css(ut.fw500)}>Direction Right To Left (RTL)</span>
          <SingleToggle id="curnc-phone-rtl" isChecked={rtlCurrencyFldCheck()} action={handleDir} />
        </div>
      )}
      {!(fieldType === 'paypal' || fieldType === 'razorpay' || fieldType === 'title') && (
        <div className={css(ut.flxcb, ut.mt2)}>
          <span className={css(ut.fw500)}>Border Radius</span>
          <div className={css(ut.flxc)}>
            <SizeControl
              min={0}
              max={50}
              inputHandler={({ unit, value }) => onchangeHandler({ unit, value }, borderRadUnit)}
              sizeHandler={({ unitKey, unitValue }) => onchangeHandler({ unit: unitKey, value: unitValue }, borderRadUnit)}
              value={borderRadVal || 0}
              unit={borderRadUnit || 'px'}
              width="128px"
              options={['px', 'em', 'rem', '%']}
              dataTestId="bdr-reds"
            />
          </div>
        </div>
      )}
      {(fieldType === 'paypal') && (
        <PaypalFieldQuickTweaks />
      )}
      {fieldType === 'razorpay' && (
        <RazorpayFieldQuickTweaks />
      )}
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
