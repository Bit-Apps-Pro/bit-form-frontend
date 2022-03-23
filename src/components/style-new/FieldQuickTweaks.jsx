/* eslint-disable no-param-reassign */
import produce from 'immer'
import { useFela } from 'react-fela'
import { useRecoilState, useRecoilValue } from 'recoil'
import { $styles } from '../../GlobalStates/StylesState'
import { $themeColors } from '../../GlobalStates/ThemeColorsState'
import { $themeVars } from '../../GlobalStates/ThemeVarsState'
import TxtAlignCntrIcn from '../../Icons/TxtAlignCntrIcn'
import TxtAlignLeftIcn from '../../Icons/TxtAlignLeftIcn'
import TxtAlignRightIcn from '../../Icons/TxtAlignRightIcn'
import ut from '../../styles/2.utilities'
import sc from '../../styles/commonStyleEditorStyle'
import { assignNestedObj } from '../../Utils/FormBuilderHelper'
import SizeControl from '../CompSettings/StyleCustomize/ChildComp/SizeControl'
import SingleToggle from '../Utilities/SingleToggle'
import StyleSegmentControl from '../Utilities/StyleSegmentControl'
import SimpleColorPicker from './SimpleColorPicker'
import { commonStyle, getNumFromStr, getStrFromStr, getValueByObjPath, getValueFromStateVar, unitConverter } from './styleHelpers'
import ThemeControl from './ThemeControl'

export default function FieldQuickTweaks({ fieldKey }) {
  const { css } = useFela()
  const themeColors = useRecoilValue($themeColors)
  const themeVars = useRecoilValue($themeVars)
  const { '--global-accent-color': accentColor } = themeColors
  const [styles, setStyles] = useRecoilState($styles)
  const fldStyleObj = styles?.fields?.[fieldKey]
  const { fieldType, classes } = fldStyleObj
  const wrpCLass = `.${fieldKey}-fld-wrp`
  const { 'align-items': position, 'flex-direction': flex } = classes[wrpCLass] || ''
  const propertyPath = (elemnKey, property) => `fields->${fieldKey}->classes->.${fieldKey}-${elemnKey}->${property}`

  const rtrCurrencyFld = () => {
    const fldType = styles.fields[fieldKey].fieldType
    const clsName = fldType === 'phone-number' ? 'phone' : fldType
    const path = propertyPath(`${clsName}-inner-wrp`, 'direction')
    const value = getValueByObjPath(styles, path)
    return value === 'rtl'
  }

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
      case 'large':
        setMuptipleProperty(
          [
            propertyPath(elementKey, 'font-size'),
            propertyPath(elementKey, 'padding'),
          ],
          ['18px', '12px 22px'],
        )
        break
      case 'large-1':
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

  const borderRadHandler = ({ value, unit }, prvUnit) => {
    const convertvalue = unitConverter(unit, value, prvUnit)
    const v = `${convertvalue}${unit}`
    setStyles(prvStyle => produce(prvStyle, drftStyle => {
      const fld = prvStyle.fields[fieldKey]
      if (fld.theme === 'bitformDefault') {
        switch (fld.fieldType) {
          case 'text':
          case 'date':
          case 'html-select':
            assignNestedObj(drftStyle, propertyPath('fld', 'border-radius'), v)
            break
          case 'check':
            assignNestedObj(drftStyle, propertyPath('ck', 'border-radius'), v)
            break
          case 'radio':
            assignNestedObj(drftStyle, propertyPath('rdo', 'border-radius'), v)
            break
          case 'button':
            assignNestedObj(drftStyle, propertyPath('btn', 'border-radius'), v)
            break
          case 'currency':
          case 'country':
            assignNestedObj(drftStyle, propertyPath(`${fld.fieldType}-fld-wrp`, 'border-radius'), v)
            break
          case 'phone-number':
            assignNestedObj(drftStyle, propertyPath('phone-fld-wrp', 'border-radius'), v)
            break
          default:
            break
        }
      }
    }))
  }
  const getBorderRadius = () => {
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
      case 'phone-number':
        elementKey = 'phone-fld-wrp'
        break
      default:
        break
    }
    let brsValue = getValueByObjPath(styles, propertyPath(elementKey, 'border-radius'))
    brsValue = getValueFromStateVar(themeVars, brsValue)
    if (!brsValue) brsValue = '0px'
    return [getNumFromStr(brsValue), getStrFromStr(brsValue)]
  }

  const [borderRadVal, borderRadUnit] = getBorderRadius()

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
  //   case 'text':
  //   case 'number':
  //   case 'password':
  //   case 'username':
  //   case 'email':
  //   case 'url':
  //   case 'date':
  //   case 'datetime-local':
  //   case 'time':
  //   case 'month':
  //   case 'week':
  //   case 'color':
  //   case 'textarea':
  const [objName, objPath] = fldTypWiseAccentColorObjName()
  const handleDir = () => {
    setStyles(prvStyle => produce(prvStyle, drft => {
      const fldType = prvStyle.fields[fieldKey].fieldType
      const clsName = fldType === 'phone-number' ? 'phone' : fldType
      if (!rtrCurrencyFld()) {
        drft.fields[fieldKey].classes[`.${fieldKey}-${clsName}-inner-wrp`].direction = 'rtl'
        drft.fields[fieldKey].classes[`.${fieldKey}-input-clear-btn`].left = '6px'
        delete drft.fields[fieldKey].classes[`.${fieldKey}-input-clear-btn`].right
        drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-input`].direction = 'rtl'
        drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-icn`].right = '13px'
        drft.fields[fieldKey].classes[`.${fieldKey}-option-inner-wrp`].direction = 'rtl'
        drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-input`]['padding-right'] = '30px'
        drft.fields[fieldKey].classes[`.${fieldKey}-search-clear-btn`].left = '16px'
        delete drft.fields[fieldKey].classes[`.${fieldKey}-search-clear-btn`].right
        drft.fields[fieldKey].classes[`.${fieldKey}-opt-lbl`]['margin-left'] = '10px'
      } else {
        delete drft.fields[fieldKey].classes[`.${fieldKey}-${clsName}-inner-wrp`].direction
        drft.fields[fieldKey].classes[`.${fieldKey}-input-clear-btn`].right = '6px'
        delete drft.fields[fieldKey].classes[`.${fieldKey}-input-clear-btn`].left
        delete drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-input`].direction
        drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-icn`].left = '13px'
        delete drft.fields[fieldKey].classes[`.${fieldKey}-opt-search-icn`].right
        delete drft.fields[fieldKey].classes[`.${fieldKey}-option-inner-wrp`].direction
        delete drft.fields[fieldKey].classes[`.${fieldKey}-search-clear-btn`].left
        delete drft.fields[fieldKey].classes[`.${fieldKey}-opt-lbl`]['margin-left']
        drft.fields[fieldKey].classes[`.${fieldKey}-search-clear-btn`].right = '6px'
      }
    }))
  }
  return (
    <>
      {fieldType.match(/^(text|number|password|username|email|url|date|time|month|week|color|textarea|html-select|)$/gi) && (
        <>
          <SimpleColorPicker
            title="Accent Color"
            subtitle="Accent Color"
            value={getValueByObjPath(styles, objPath[0]) || accentColor}
            stateObjName={objName}
            propertyPath={objPath}
            modalId="global-primary-clr"
            fldKey={fieldKey}
          // hslaPaths={{ h: '--gah', s: '--gas', l: '--gal', a: '--gaa' }}
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
        </>
      )}

      {fieldType === 'button' && (
        <div className={css(ut.flxcb, ut.mt2)}>
          <span className={css(ut.fw500)}>Size</span>
          <select onChange={e => setBtnSize('btn', e.target.value)} className={css(sc.select)}>
            {Object.keys(sizes).map((key) => <option value={key}>{sizes[key]}</option>)}
          </select>
        </div>
      )}

      {fieldType === 'title' && (
        <>
          <div className={css(style.main)}>
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
          <div className={css(style.main)}>
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
          <SingleToggle isChecked={rtrCurrencyFld()} action={handleDir} />
        </div>
      )}

      <div className={css(ut.flxcb, ut.mt2)}>
        <span className={css(ut.fw500)}>Border Radius</span>
        <div className={css(ut.flxc)}>
          <SizeControl
            min={0}
            max={50}
            inputHandler={({ unit, value }) => borderRadHandler({ unit, value }, borderRadUnit)}
            sizeHandler={({ unitKey, unitValue }) => borderRadHandler({ unit: unitKey, value: unitValue }, borderRadUnit)}
            value={borderRadVal || 0}
            unit={borderRadUnit || 'px'}
            width="128px"
            options={['px', 'em', 'rem', '%']}
          />
        </div>
      </div>
    </>
  )
}

const style = {
  main: { flx: 'center-between' },
  label: {
    fw: 500,
    ml: 10,
    mt: 5,
  },
  segment: {
    mr: 7,
    mt: 4,
  },
}
const sizes = {
  'small-2': 'Small-2',
  'small-1': 'Small-1',
  medium: 'Medium',
  // large: 'Large',
  'large-1': 'Large-1',
  'large-2': 'Large-2',
}
