/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $fields } from '../../GlobalStates/GlobalStates'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import TxtAlignCntrIcn from '../../Icons/TxtAlignCntrIcn'
import TxtAlignLeftIcn from '../../Icons/TxtAlignLeftIcn'
import TxtAlignRightIcn from '../../Icons/TxtAlignRightIcn'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import { deepCopy } from '../../Utils/Helpers'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SingleToggle from '../Utilities/SingleToggle'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import SimpleColorPicker from './SimpleColorPicker'
import { commonStyle, getNumFromStr, getStrFromStr, getValueByObjPath, getValueFromStateVar, unitConverter } from './styleHelpers'
import ThemeControl from './ThemeControl'

export default function FieldQuickTweaks({ fieldKey }) {
  const { css } = useFela()
  const themeVars = useRecoilValue($themeVars)
  const [styles, setStyles] = useRecoilState($styles)
  const [fields, setFields] = useRecoilState($fields)
  const fieldData = deepCopy(fields[fieldKey])
  const fldStyleObj = styles?.fields?.[fieldKey]
  const { fieldType, classes } = fldStyleObj
  const wrpCLass = `.${fieldKey}-fld-wrp`
  const { 'align-items': position, 'flex-direction': flex } = classes[wrpCLass] || ''
  const propertyPath = (elemnKey, property) => `fields->${fieldKey}->classes->.${fieldKey}-${elemnKey}->${property}`

  const rtlCurrencyFldCheck = () => {
    const fldType = styles.fields[fieldKey].fieldType
    const clsName = fldType === 'phone-number' ? 'phone' : fldType
    const path = propertyPath(`${clsName}-inner-wrp`, 'direction')
    const value = getValueByObjPath(styles, path)
    return value === 'rtl'
  }

  const setSizes = ({ target: { value } }) => {
    const commonStyleClasses = commonStyle(fieldKey, value, fieldData.typ)
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

  const setMuptipleProperty = (propertyPaths, values) => {
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      propertyPaths.map((path, index) => {
        assignNestedObj(drftStyle, path, values[index])
      })
    }))
  }

  const setBtnSize = (elementKey, value) => {
    switch (value) {
      case 'small-2':
        setMuptipleProperty(
          [
            propertyPath(elementKey, 'font-size'),
            propertyPath(elementKey, 'padding'),
          ],
          ['12px', '7px 10px'],
        )
        break
      case 'small-1':
        setMuptipleProperty(
          [
            propertyPath(elementKey, 'font-size'),
            propertyPath(elementKey, 'padding')],
          ['14px', '9px 15px'],
        )
        break
      case 'medium':
        setMuptipleProperty(
          [
            propertyPath(elementKey, 'font-size'),
            propertyPath(elementKey, 'padding'),
          ],
          ['16px', '11px 20px'],
        )
        break
      case 'large-1':
        setMuptipleProperty(
          [
            propertyPath(elementKey, 'font-size'),
            propertyPath(elementKey, 'padding'),
          ],
          ['18px', '12px 22px'],
        )
        break
      case 'large-2':
        setMuptipleProperty(
          [
            propertyPath(elementKey, 'font-size'),
            propertyPath(elementKey, 'padding'),
          ],
          ['21px', '14px 24px'],
        )
        break
      default:
        setMuptipleProperty(
          [
            propertyPath(elementKey, 'font-size'),
            propertyPath(elementKey, 'padding'),
          ],
          ['16px', '11px 20px'],
        )
        break
    }
  }

  const onchangeHandler = ({ value, unit }, prvUnit, prop = 'border-radius') => {
    const convertvalue = unitConverter(unit, value, prvUnit)
    const v = `${convertvalue}${unit}`
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      const fld = prvStyle.fields[fieldKey]
      if (fld.theme === 'bitformDefault') {
        let elemntKey
        switch (fld.fieldType) {
          case 'text':
          case 'date':
          case 'html-select':
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

          default:
            break
        }
        assignNestedObj(drftStyle, propertyPath(elemntKey, prop), v)
      }
    }))
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

      default:
        break
    }
    let brsValue = getValueByObjPath(styles, propertyPath(elementKey, prop))
    brsValue = getValueFromStateVar(themeVars, brsValue)
    if (!brsValue) brsValue = '0px'
    return [getNumFromStr(brsValue), getStrFromStr(brsValue)]
  }

  const [borderRadVal, borderRadUnit] = getPropValue()
  const [fldWidthVal, fldWidthUnit] = getPropValue('width')
  const [fldHeightVal, fldHeightUnit] = getPropValue('height')

  const positionHandle = (val, type) => {
    let justifyContent = 'left'
    if (val === 'center') justifyContent = 'center'
    else if (val === 'flex-end') justifyContent = 'right'

    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fieldKey].classes[wrpCLass][type] = val
      drftStyle.fields[fieldKey].classes[wrpCLass]['justify-content'] = justifyContent
    }))
  }

  const flexDirectionHandle = (val, type) => {
    setStyles(preStyle => produce(preStyle, drftStyle => {
      drftStyle.fields[fieldKey].classes[wrpCLass][type] = val
    }))
  }

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
  }

  const razorpayBtnThemeHandler = (e) => {
    const themeValue = e.target.value
    fieldData.btnTheme = themeValue
    // eslint-disable-next-line no-param-reassign
    setFields(allFields => produce(allFields, draft => { draft[fieldKey] = fieldData }))
    setStyles(prvStyle => produce(prvStyle, drft => {
      let btnBg
      let border
      let color
      let btnBeforeBg
      switch (themeValue) {
        case 'dark':
          btnBg = 'hsla(216, 85%, 18%, 100%)'
          border = 'solid hsla(216, 85%, 18%, 100%)'
          color = 'hsla(0, 0%, 100%, 100%)'
          btnBeforeBg = 'hsla(224, 68%, 37%, 100%)'
          break

        case 'light':
          btnBg = 'hsla(0, 0%, 100%, 100%)'
          border = 'solid hsla(0, 0%, 100%, 100%)'
          color = 'hsla(224, 68%, 37%, 100%)'
          btnBeforeBg = 'hsla(224, 68%, 37%, 100%)'
          break

        case 'outline':
          btnBg = 'hsla(216, 91%, 96%, 100%)'
          border = 'solid hsla(216, 85%, 18%, 100%)'
          color = 'hsla(216, 85%, 18%, 100%)'
          btnBeforeBg = 'hsla(224, 68%, 37%, 100%)'
          break

        case 'brand':
          btnBg = 'hsla(241, 100%, 50%, 100%)'
          border = 'solid hsla(241, 100%, 50%, 100%)'
          color = 'hsla(0, 0%, 100%, 100%)'
          btnBeforeBg = 'hsla(241, 100%, 50%, 100%)'
          break

        default:
          break
      }
      assignNestedObj(drft, propertyPath('razorpay-btn', 'background-color'), btnBg)
      assignNestedObj(drft, propertyPath('razorpay-btn', 'border'), border)
      assignNestedObj(drft, propertyPath('razorpay-btn-text', 'color'), color)
      assignNestedObj(drft, propertyPath('razorpay-btn::before', 'background-color'), btnBeforeBg)
    }))
  }
  console.log(fieldType)
  return (
    <>
      {fieldType.match(/^(text|number|password|username|email|url|date|time|datetime-local|month|week|color|textarea|html-select|)$/gi) && (
        <>
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
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Size</span>
            <select onChange={setSizes} className={css(sc.select)}>
              <option value="">Select Size</option>
              {Object.keys(sizes).map((key) => <option value={key}>{sizes[key]}</option>)}
            </select>
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Theme</span>
            <ThemeControl fldKey={fieldKey} />
          </div>
        </>
      )}

      {fieldType === 'button' && (
        <>
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Size</span>
            <select onChange={e => setBtnSize('btn', e.target.value)} className={css(sc.select)}>
              {Object.keys(sizes).map((key) => <option value={key}>{sizes[key]}</option>)}
            </select>
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Width</span>
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
              />
            </div>
          </div>
          <div className={css(ut.flxcb, ut.mt2)}>
            <span className={css(ut.fw500)}>Height</span>
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
              />
            </div>
          </div>
        </>
      )}

      {fieldType === 'title' && (
        <>
          <div className={css(style.main, ut.mt2)}>
            <span className={css(style.label)}>Label Alignment</span>
            <StyleSegmentControl
              show={['icn']}
              tipPlace="bottom"
              className={css(style.segment)}
              options={[
                { icn: <TxtAlignLeftIcn size="17" />, label: 'flex-start', tip: 'Left' },
                { icn: <TxtAlignCntrIcn size="17" />, label: 'center', tip: 'Center' },
                { icn: <TxtAlignRightIcn size="17" />, label: 'flex-end', tip: 'Right' },
              ]}
              onChange={val => positionHandle(val, 'align-items')}
              activeValue={position}
            />
          </div>
          <div className={css(style.main, ut.mt2)}>
            <span className={css(style.label)}>Flex Direction</span>
            <StyleSegmentControl
              show={['icn']}
              tipPlace="bottom"
              className={css(style.segment)}
              options={[
                { icn: <TxtAlignLeftIcn size="17" />, label: 'column', tip: 'Vertical' },
                { icn: <TxtAlignCntrIcn size="17" />, label: 'column-reverse', tip: 'Vertical  Reverse' },
                { icn: <TxtAlignRightIcn size="17" />, label: 'row', tip: 'Horizontal' },
                { icn: <TxtAlignRightIcn size="17" />, label: 'row-reverse', tip: 'Horizontal Reverse' },
              ]}
              onChange={val => flexDirectionHandle(val, 'flex-direction')}
              activeValue={flex}
            />
          </div>
        </>
      )}

      {(fieldType === 'currency' || fieldType === 'phone-number') && (
        <div className={css(ut.flxcb, ut.mt3)}>
          <span className={css(ut.fw500)}>Direction Right To Left (RTL)</span>
          <SingleToggle isChecked={rtlCurrencyFldCheck()} action={handleDir} />
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
            />
          </div>
        </div>
      )}
      {(fieldType === 'paypal') && (
        <div className={css(ut.flxcb, ut.mt2)}>
          <span className={css(ut.fw500)}>Width</span>
          <div className={css(ut.flxc)}>
            <SizeControl
              min={150}
              max={750}
              inputHandler={({ unit, value }) => onchangeHandler({ unit, value }, fldWidthUnit, 'width')}
              sizeHandler={({ unitKey, unitValue }) => onchangeHandler({ unit: unitKey, value: unitValue }, fldWidthUnit, 'width')}
              value={fldWidthVal || 0}
              unit={fldWidthUnit || 'px'}
              width="128px"
              options={['px', 'em', 'rem', '%']}
            />
          </div>
        </div>
      )}
      {fieldType === 'razorpay' && (
        <div className={css(ut.flxcb, ut.mt2)}>
          <span className={css(ut.fw500)}>Button Theme</span>
          <select onChange={razorpayBtnThemeHandler} className={css(sc.select)} value={fieldData.btnTheme}>
            <option value="dark">Razorpay Dark</option>
            <option value="light">Razorpay Light</option>
            <option value="outline">Razorpay Outline</option>
            <option value="brand">Brand Color</option>
          </select>
        </div>
      )}
    </>
  )
}

const style = {
  main: { flx: 'center-between' },
  label: { fw: 500 },
  segment: {
    mr: 7,
    mt: 4,
  },
}
const sizes = {
  'small-2': 'Extra Small',
  'small-1': 'Small',
  medium: 'Medium',
  // large: 'Large',
  'large-1': 'Large',
  'large-2': 'Extra Large',
}
